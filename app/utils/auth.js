export function getAuthHeaders() {
  if (typeof window !== 'undefined') {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const token = user?.accessToken;
        if (token) return { Authorization: `Bearer ${token}` };
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
  return {};
} 