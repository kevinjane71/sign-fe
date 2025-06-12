"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

function getAuthHeaders() {
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

export default function EmailAutocomplete({ value, onChange, onSelect, className = '', placeholder = 'Enter email...' }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchContacts = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/user/contacts/search?query=${encodeURIComponent(query)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders()
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch suggestions');
      
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
    searchContacts(newValue);
    setShowSuggestions(true);
  };

  const handleSelect = (contact) => {
    onChange(contact.email);
    if (onSelect) onSelect(contact);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    onChange('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (suggestions.length > 0 || loading) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Loading suggestions...</div>
          ) : (
            <ul>
              {suggestions.map((contact) => (
                <li
                  key={contact.id}
                  onClick={() => handleSelect(contact)}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                >
                  <div className="font-medium text-gray-900">{contact.email}</div>
                  {contact.name && (
                    <div className="text-gray-500 text-xs">{contact.name}</div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} 