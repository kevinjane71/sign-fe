"use client"

import React, { useState, useEffect } from "react";
import SignatureModal from "../components/SignatureModal";
import { Plus, Trash2, Edit2, Loader2, PenTool, Stamp, MoreVertical, Copy, Download, Grid, List } from "lucide-react";
import { useToast } from "../components/LayoutWrapper";
import { isAuthenticated } from "../utils/api";
import SecureImage from '../components/SecureImage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
const API_URL = `${API_BASE_URL}/api/user/signatures`;
const MAX_SIGNS = 10;
const MAX_SIZE_MB = 30;

function getAuthHeaders() {
  if (typeof window !== 'undefined') {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const token = user?.accessToken;
        if (token) {
          console.log('🔐 Auth token found in user data');
          return { Authorization: `Bearer ${token}` };
        } else {
          console.log('❌ No accessToken found in user data');
        }
      } else {
        console.log('❌ No user data found in localStorage');
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }
  return {};
}

// Generate default alias names
function generateDefaultAlias(type, index) {
  const signatures = [
    "Professional Signature", "Business Signature", "Formal Signature", 
    "Executive Signature", "Primary Signature", "Standard Signature",
    "Corporate Signature", "Official Signature", "Main Signature", "Personal Signature"
  ];
  
  const stamps = [
    "Company Stamp", "Official Stamp", "Business Stamp", 
    "Approval Stamp", "Certified Stamp", "Authorized Stamp",
    "Verified Stamp", "Executive Stamp", "Department Stamp", "Custom Stamp"
  ];
  
  const list = type === "sign" ? signatures : stamps;
  return list[index] || `${type === "sign" ? "Signature" : "Stamp"} ${index + 1}`;
}

async function fetchSignatures(type) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    };
    
    const response = await fetch(`${API_URL}?type=${type}`, {
      method: 'GET',
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch signatures error:', error);
    throw error;
  }
}

async function uploadSignature({ alias, type, imageDataUrl, file }) {
  try {
    const form = new FormData();
    form.append("alias", alias);
    form.append("type", type);
    if (file) form.append("image", file);
    if (imageDataUrl) form.append("imageDataUrl", imageDataUrl);
    
    const headers = {
      ...getAuthHeaders()
    };
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: form
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Upload signature error:', error);
    throw error;
  }
}

async function updateSignature(id, { alias, imageDataUrl, file }) {
  try {
    const form = new FormData();
    if (alias) form.append("alias", alias);
    if (file) form.append("image", file);
    if (imageDataUrl) form.append("imageDataUrl", imageDataUrl);
    
    const headers = {
      ...getAuthHeaders()
    };
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: headers,
      body: form
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update signature error:', error);
    throw error;
  }
}

async function deleteSignature(id) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    };
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Delete signature error:', error);
    throw error;
  }
}

export default function YourSignPage() {
  const toast = useToast()
  const [tab, setTab] = useState("sign");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedItems, setSelectedItems] = useState([]);

  const load = async () => {
    setLoading(true);
    setError("");
    
    if (!isAuthenticated()) {
      setError("Please login first to view your signatures.");
      setLoading(false);
      return;
    }
    
    try {
      console.log(`🔄 Loading ${tab}s...`);
      const res = await fetchSignatures(tab);
      if (res.success) {
        setItems(res.items);
        console.log(`✅ Loaded ${res.items.length} ${tab}s`);
      } else {
        setError(res.error || "Failed to load");
      }
    } catch (error) {
      console.error('Load error:', error);
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        setError("Authentication failed. Please login again.");
      } else {
        setError(error.message || "Failed to connect to server. Please try again.");
      }
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [tab]);

  const handleSave = async (alias, imageDataUrl, file) => {
    setLoading(true);
    setError("");
    try {
      // Generate default alias if none provided
      let finalAlias = alias;
      if (!finalAlias || finalAlias.trim() === "") {
        finalAlias = generateDefaultAlias(tab, items.length);
      }

      let res;
      if (editItem) {
        res = await updateSignature(editItem.id, { alias: finalAlias, imageDataUrl, file });
      } else {
        res = await uploadSignature({ alias: finalAlias, type: tab, imageDataUrl, file });
      }
      if (res.success) {
        setShowModal(false);
        setEditItem(null);
        load();
      } else {
        setError(res.error || "Failed to save");
      }
    } catch (error) {
      setError(error.message || "Failed to save. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item? This action cannot be undone.")) return;
    setLoading(true);
    setError("");
    try {
      const res = await deleteSignature(id);
      if (res.success) load();
      else setError(res.error || "Failed to delete");
    } catch (error) {
      setError(error.message || "Failed to delete. Please try again.");
    }
    setLoading(false);
  };

  const handleCopy = async (imageUrl, itemId) => {
    try {
      // Get the authentication token
      const userData = localStorage.getItem('user');
      if (!userData) {
        toast.error("Please login to copy image URLs");
        return;
      }
      
      const user = JSON.parse(userData);
      const token = user?.accessToken;
      
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }
      
      // Construct the full URL with authentication
      const fullImageUrl = `${API_BASE_URL}/api/user/signatures/${itemId}/image`;
      
      // For copy functionality, we'll copy a message explaining how to use the URL
      const copyText = `Image URL: ${fullImageUrl}\n\nNote: This URL requires authentication. Use with Bearer token in Authorization header.`;
      await navigator.clipboard.writeText(copyText);
      toast.success("Image URL and usage instructions copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error("Failed to copy URL");
    }
  };

  const handleDownload = async (imageUrl, alias, itemId) => {
    try {
      // Get the authentication token
      const userData = localStorage.getItem('user');
      if (!userData) {
        toast.error("Please login to download images");
        return;
      }
      
      const user = JSON.parse(userData);
      const token = user?.accessToken;
      
      if (!token) {
        toast.error("Authentication token not found");
        return;
      }
      
      // Construct the full URL
      const fullImageUrl = `${API_BASE_URL}/api/user/signatures/${itemId}/image`;
      
      // Fetch the image with authentication
      const response = await fetch(fullImageUrl, {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      
      // Create blob and download
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${alias}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      URL.revokeObjectURL(url);
      
      toast.success("Download started!");
    } catch (err) {
      console.error('Failed to download: ', err);
      toast.error("Failed to download image");
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PenTool className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please login to manage your signatures and stamps.</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-14 sm:h-16 py-2 sm:py-0">
            <div className="flex items-center w-full sm:w-auto">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <PenTool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h1 className="text-base sm:text-xl font-bold text-gray-900 leading-tight">Your Signatures</h1>
                <p className="text-xs sm:text-sm text-gray-500 leading-tight">Manage your digital signatures and stamps</p>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="sm:hidden mt-2 w-full flex justify-end">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-4 sm:mb-8">
          <div className="flex">
            <button
              className={`flex-1 px-2 py-2 sm:px-6 sm:py-4 text-center font-semibold text-xs sm:text-base transition-all duration-200 ${
                tab === "sign" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => { setTab("sign"); setEditItem(null); setSelectedItems([]); }}
            >
              <div className="flex items-center justify-center">
                <PenTool className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span>Signatures</span>
                <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-black bg-opacity-20 rounded-full">
                  {tab === "sign" ? items.length : 0}
                </span>
              </div>
            </button>
            <button
              className={`flex-1 px-2 py-2 sm:px-6 sm:py-4 text-center font-semibold text-xs sm:text-base transition-all duration-200 ${
                tab === "stamp" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => { setTab("stamp"); setEditItem(null); setSelectedItems([]); }}
            >
              <div className="flex items-center justify-center">
                <Stamp className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                <span>Stamps</span>
                <span className="ml-1 sm:ml-2 px-1 sm:px-2 py-0.5 sm:py-1 text-xs bg-black bg-opacity-20 rounded-full">
                  {tab === "stamp" ? items.length : 0}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="font-medium">{items.length}</span> of <span className="font-medium">{MAX_SIGNS}</span> {tab === "sign" ? "signatures" : "stamps"}
            </div>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              Max size: 30MB
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto mt-2 sm:mt-0">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <div className="w-full sm:w-auto flex justify-end sm:justify-start">
              <button
                className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-auto sm:w-auto"
                onClick={() => { setShowModal(true); setEditItem(null); }}
                disabled={items.length >= MAX_SIGNS || loading}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Add {tab === "sign" ? "Signature" : "Stamp"}</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-800 font-medium text-xs sm:text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-12 sm:py-20">
            <div className="text-center">
              <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 animate-spin text-blue-600 mx-auto mb-2 sm:mb-4" />
              <p className="text-gray-600 text-sm sm:text-base">Loading {tab === "sign" ? "signatures" : "stamps"}...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              {tab === "sign" ? <PenTool className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" /> : <Stamp className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">No {tab === "sign" ? "signatures" : "stamps"} yet</h3>
            <p className="text-gray-600 text-xs sm:text-base mb-4 sm:mb-8 max-w-md mx-auto">
              Create your first {tab === "sign" ? "digital signature" : "stamp"} to get started. You can draw, type, or upload an image.
            </p>
            <button
              onClick={() => { setShowModal(true); setEditItem(null); }}
              className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm sm:text-base rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create {tab === "sign" ? "Signature" : "Stamp"}
            </button>
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className={`group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${viewMode === "list" ? "flex items-center p-2 sm:p-4" : "p-3 sm:p-6"} w-full max-w-xs mx-auto sm:max-w-none`}
              >
                {/* Image Container */}
                <div className={`${viewMode === "list" ? "flex-shrink-0 mr-2 sm:mr-4" : "mb-2 sm:mb-4"}`} style={{ minWidth: 64, minHeight: 40 }}>
                  <SecureImage
                    src={item.imageUrl}
                    alt={item.alias}
                    className="max-w-[96px] max-h-[48px] sm:max-w-full sm:max-h-full object-contain"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                  />
                </div>

                {/* Content */}
                <div className={`${viewMode === "list" ? "flex-1 min-w-0" : ""}`}>
                  <div className={`${viewMode === "list" ? "flex items-center justify-between" : "text-center mb-2 sm:mb-4"}`}>
                    <div className={`${viewMode === "list" ? "min-w-0 flex-1" : ""}`}>
                      <h3 className="font-semibold text-gray-900 truncate text-base sm:text-lg">
                        {item.alias}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                        {tab === "sign" ? "Digital Signature" : "Stamp"} #{index + 1}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className={`flex items-center space-x-1 sm:space-x-2 ${viewMode === "list" ? "flex-shrink-0 ml-2 sm:ml-4" : "justify-center"}`}>
                      <button
                        onClick={() => handleDownload(item.imageUrl, item.alias, item.id)}
                        className="p-1 sm:p-2 bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(item.imageUrl, item.id)}
                        className="p-1 sm:p-2 bg-gray-100 hover:bg-green-100 text-gray-600 hover:text-green-600 rounded-lg transition-colors"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setEditItem(item); setShowModal(true); }}
                        className="p-1 sm:p-2 bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-600 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 sm:p-2 bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={showModal}
        onClose={() => { setShowModal(false); setEditItem(null); }}
        onSave={(imageDataUrl, file) => handleSave(editItem?.alias, imageDataUrl, file)}
        maxSizeMB={MAX_SIZE_MB}
      />
    </div>
  );
} 