"use client"

import React, { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "../components/LayoutWrapper";
import { isAuthenticated } from "../utils/api";
import { getAuthHeaders } from '../utils/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';
const API_URL = `${API_BASE_URL}/api/user/contacts`;

async function fetchContacts(page = 1, limit = 1000) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    };
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: headers
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Fetch contacts error:', error);
    throw error;
  }
}

async function createContact(data) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    };
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Create contact error:', error);
    throw error;
  }
}

async function updateContact(id, data) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    };
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Update contact error:', error);
    throw error;
  }
}

async function deleteContact(id) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    };
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: headers
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Delete contact error:', error);
    throw error;
  }
}

export default function ContactsPage() {
  const toast = useToast();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allContacts, setAllContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    comment: ""
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const loadContacts = async () => {
    setLoading(true);
    setError("");
    if (!isAuthenticated()) {
      setError("Please login first to view your contacts.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetchContacts(1, 1000); // Always fetch all contacts
      if (res.success) {
        setAllContacts(res.contacts);
        setContacts(res.contacts);
        setTotalPages(1); // Only one page, all contacts loaded
      } else {
        setError(res.error || "Failed to load contacts");
      }
    } catch (error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        setError("Authentication failed. Please login again.");
      } else {
        setError(error.message || "Failed to connect to server. Please try again.");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  useEffect(() => {
    if (!search) {
      setContacts(allContacts);
    } else {
      const s = search.toLowerCase();
      setContacts(
        allContacts.filter(c =>
          (c.name && c.name.toLowerCase().includes(s)) ||
          (c.email && c.email.toLowerCase().includes(s)) ||
          (c.phone && c.phone.toLowerCase().includes(s)) ||
          (c.company && c.company.toLowerCase().includes(s)) ||
          (c.comment && c.comment.toLowerCase().includes(s))
        )
      );
    }
  }, [search, allContacts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      let res;
      if (editContact) {
        res = await updateContact(editContact.id, formData);
      } else {
        res = await createContact(formData);
      }
      
      if (res.success) {
        setShowModal(false);
        setEditContact(null);
        setFormData({ name: "", email: "", phone: "", company: "", comment: "" });
        loadContacts();
        toast.success(editContact ? "Contact updated successfully!" : "Contact added successfully!");
      } else {
        setError(res.error || "Failed to save contact");
      }
    } catch (error) {
      setError(error.message || "Failed to save contact. Please try again.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setShowDeleteModal(false);
    setLoading(true);
    setError("");
    try {
      const res = await deleteContact(id);
      if (res.success) {
        loadContacts();
        toast.success("Contact deleted successfully!");
      } else {
        setError(res.error || "Failed to delete contact");
      }
    } catch (error) {
      setError(error.message || "Failed to delete contact. Please try again.");
    }
    setLoading(false);
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      company: contact.company || "",
      comment: contact.comment || ""
    });
    setShowModal(true);
  };

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please login to manage your contacts.</p>
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
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <div className="ml-3 sm:ml-4">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Your Contacts</h1>
                <p className="text-xs sm:text-sm text-gray-500">Manage your contact list</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-8">
          <div className="w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
            </div>
          </div>
          
          <button
            onClick={() => { setShowModal(true); setEditContact(null); setFormData({ name: "", email: "", phone: "", company: "", comment: "" }); }}
            className="w-full sm:w-auto flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </button>
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
                <p className="text-red-800 font-medium text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Contacts Table or Cards */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Mobile: Cards */}
          <div className="sm:hidden">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading contacts...</div>
            ) : contacts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No contacts found. Add your first contact!</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {contacts.map((contact) => (
                  <div key={contact.id} className="p-4 flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold text-gray-900 text-base">{contact.name}</div>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(contact)} className="text-blue-600 hover:text-blue-900"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => { setContactToDelete(contact); setShowDeleteModal(true); }} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">{contact.email}</div>
                    <div className="text-xs text-gray-500">{contact.phone || '-'}</div>
                    <div className="text-xs text-gray-500">{contact.company || '-'}</div>
                    <div className="text-xs text-gray-400">{contact.comment || '-'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Desktop: Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        <span className="ml-2 text-gray-600">Loading contacts...</span>
                      </div>
                    </td>
                  </tr>
                ) : contacts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                      No contacts found. Add your first contact!
                    </td>
                  </tr>
                ) : (
                  contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contact.email}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contact.phone || '-'}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{contact.company || '-'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-500 max-w-xs truncate">{contact.comment || '-'}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleEdit(contact)} className="text-blue-600 hover:text-blue-900 mr-3"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => { setContactToDelete(contact); setShowDeleteModal(true); }} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
              {editContact ? 'Edit Contact' : 'Add Contact'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div className="flex justify-end space-x-2 sm:space-x-3 pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditContact(null); }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Saving...
                    </div>
                  ) : (
                    'Save Contact'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Delete Modal */}
      {showDeleteModal && contactToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Contact</h3>
            <p className="text-gray-700 mb-4">Are you sure you want to delete <span className="font-semibold">{contactToDelete.name}</span>? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setContactToDelete(null); }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleDelete(contactToDelete.id); setContactToDelete(null); }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 