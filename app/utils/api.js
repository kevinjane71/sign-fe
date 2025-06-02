// API utility functions for authenticated requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

// Get stored user data and token
export const getStoredUser = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    return null;
  }
};

// Get authentication token
export const getAuthToken = () => {
  const user = getStoredUser();
  return user?.accessToken || null;
};

// Get refresh token
export const getRefreshToken = () => {
  const user = getStoredUser();
  return user?.refreshToken || null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// Check if token is about to expire (within next 5 minutes)
export const isTokenExpiringSoon = () => {
  const user = getStoredUser();
  if (!user || !user.accessToken) return false;

  try {
    // Decode token to check expiry
    const tokenPayload = JSON.parse(atob(user.accessToken.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = tokenPayload.exp;
    
    // Check if token expires within next 5 minutes (300 seconds)
    return (expiryTime - currentTime) < 300;
  } catch (error) {
    console.error('Error checking token expiry:', error);
    return true; // Assume it's expiring if we can't check
  }
};

// Proactively refresh token if it's about to expire
export const ensureValidToken = async () => {
  if (!isAuthenticated()) {
    throw new Error('Not authenticated');
  }

  if (isTokenExpiringSoon()) {
    console.log('Token expiring soon, refreshing...');
    try {
      await refreshAccessToken();
    } catch (error) {
      console.error('Proactive token refresh failed:', error);
      throw error;
    }
  }
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refreshToken })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Update stored user data with new tokens
      const currentUser = getStoredUser();
      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Dispatch event to notify other components
        window.dispatchEvent(new Event('userStateChanged'));
        
        return data.data.accessToken;
      }
    } else {
      throw new Error(data.error || 'Token refresh failed');
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    // If refresh fails, logout user
    logout();
    throw error;
  }
};

// Logout user and clear stored data
export const logout = async () => {
  const token = getAuthToken();
  
  if (token) {
    try {
      // Call logout endpoint to invalidate token on server
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }
  }
  
  // Clear local storage
  localStorage.removeItem('user');
  
  // Dispatch event to notify other components
  window.dispatchEvent(new Event('userStateChanged'));
  
  // Redirect to login
  window.location.href = '/login';
};

// Make authenticated API request
export const apiRequest = async (endpoint, options = {}) => {
  // Proactively check and refresh token if needed
  try {
    await ensureValidToken();
  } catch (error) {
    // If token validation fails, the user will be logged out by ensureValidToken
    throw new Error('Authentication required');
  }

  const token = getAuthToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle authentication errors (fallback in case proactive refresh failed)
    if (response.status === 401) {
      console.warn('Access token expired, attempting refresh...');
      
      try {
        // Try to refresh the token
        const newToken = await refreshAccessToken();
        
        // Retry the original request with new token
        const retryConfig = {
          ...config,
          headers: {
            ...config.headers,
            'Authorization': `Bearer ${newToken}`
          }
        };
        
        const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, retryConfig);
        
        if (retryResponse.status === 401) {
          // If still 401 after refresh, logout
          console.warn('Authentication failed after token refresh, redirecting to login');
          logout();
          throw new Error('Authentication required');
        }
        
        const retryData = await retryResponse.json();
        
        if (!retryResponse.ok) {
          throw new Error(retryData.message || retryData.error || `HTTP ${retryResponse.status}`);
        }
        
        return retryData;
        
      } catch (refreshError) {
        console.warn('Token refresh failed, redirecting to login');
        logout();
        throw new Error('Authentication required');
      }
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Specific API functions for common operations

// Get user profile
export const getUserProfile = () => {
  return apiRequest('/auth/profile');
};

// Get user's documents
export const getDocuments = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = `/api/documents${queryString ? `?${queryString}` : ''}`;
  return apiRequest(endpoint);
};

// Get document statistics
export const getDocumentStats = () => {
  return apiRequest('/api/documents/stats');
};

// Get specific document
export const getDocument = (documentId) => {
  return apiRequest(`/api/documents/${documentId}`);
};

// Upload document
export const uploadDocument = (formData) => {
  const token = getAuthToken();
  
  return fetch(`${API_BASE_URL}/api/documents/upload`, {
    method: 'POST',
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
      // Don't set Content-Type for FormData, let browser set it with boundary
    },
    body: formData
  }).then(async response => {
    if (response.status === 401) {
      logout();
      throw new Error('Authentication required');
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP ${response.status}`);
    }
    
    return data;
  });
};

// Update document
export const updateDocument = (documentId, updateData) => {
  return apiRequest(`/api/documents/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  });
};

// Delete document
export const deleteDocument = (documentId) => {
  return apiRequest(`/api/documents/${documentId}`, {
    method: 'DELETE'
  });
};

// Send document for signing
export const sendDocument = (documentId, sendData) => {
  return apiRequest(`/api/documents/${documentId}/send`, {
    method: 'POST',
    body: JSON.stringify(sendData)
  });
};

// Update document status
export const updateDocumentStatus = (documentId, status) => {
  return apiRequest(`/api/documents/${documentId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
};

// Duplicate document
export const duplicateDocument = (documentId) => {
  return apiRequest(`/api/documents/${documentId}/duplicate`, {
    method: 'POST'
  });
};

// Get document file
export const getDocumentFile = async (documentId, fileId) => {
  try {
    await ensureValidToken();
  } catch (error) {
    throw new Error('Authentication required');
  }

  const token = getAuthToken();
  
  const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
    headers: {
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  });

  if (response.status === 401) {
    try {
      // Try to refresh the token
      const newToken = await refreshAccessToken();
      
      // Retry the request with new token
      const retryResponse = await fetch(`${API_BASE_URL}/api/documents/${documentId}/file/${fileId}`, {
        headers: {
          'Authorization': `Bearer ${newToken}`
        }
      });
      
      if (retryResponse.status === 401) {
        logout();
        throw new Error('Authentication required');
      }
      
      if (!retryResponse.ok) {
        throw new Error(`Failed to fetch file: ${retryResponse.statusText}`);
      }
      
      return retryResponse.blob();
    } catch (refreshError) {
      logout();
      throw new Error('Authentication required');
    }
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  return response.blob();
};

// Share document configuration
export const shareDocument = (documentId, shareData) => {
  return apiRequest(`/api/documents/${documentId}/share`, {
    method: 'POST',
    body: JSON.stringify(shareData)
  });
};

// Send document workflow
export const sendDocumentWorkflow = (documentId) => {
  return apiRequest(`/api/documents/${documentId}/send-workflow`, {
    method: 'POST'
  });
};

export default {
  getStoredUser,
  getAuthToken,
  getRefreshToken,
  isAuthenticated,
  isTokenExpiringSoon,
  ensureValidToken,
  refreshAccessToken,
  logout,
  apiRequest,
  getUserProfile,
  getDocuments,
  getDocumentStats,
  getDocument,
  uploadDocument,
  updateDocument,
  deleteDocument,
  sendDocument,
  updateDocumentStatus,
  duplicateDocument,
  getDocumentFile,
  shareDocument,
  sendDocumentWorkflow
}; 