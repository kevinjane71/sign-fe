'use client'

import React, { useState } from 'react'
import { X, Plus, Trash2, Send, Loader2, User, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

const SignerModal = ({ 
  signers = [], 
  onAddSigner, 
  onRemoveSigner, 
  onClose, 
  onSend, 
  uploading = false 
}) => {
  const [newSigner, setNewSigner] = useState({ name: '', email: '' })

  const handleAddSigner = () => {
    if (!newSigner.name.trim() || !newSigner.email.trim()) {
      toast.error('Please enter both name and email')
      return
    }

    if (signers.some(s => s.email === newSigner.email)) {
      toast.error('Signer with this email already exists')
      return
    }

    onAddSigner(newSigner)
    setNewSigner({ name: '', email: '' })
  }

  const handleSend = () => {
    if (signers.length === 0) {
      toast.error('Please add at least one signer')
      return
    }

    if (signers.some(s => !s.name || !s.email)) {
      toast.error('Please fill in all signer details')
      return
    }

    onSend()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {signers.length === 0 ? 'Add Signers' : 'Manage Signers'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add New Signer */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={newSigner.name}
              onChange={(e) => setNewSigner(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter signer's name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={newSigner.email}
              onChange={(e) => setNewSigner(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter signer's email"
            />
          </div>
          
          <button 
            onClick={handleAddSigner} 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Signer</span>
          </button>
        </div>

        {/* Existing Signers */}
        {signers.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Current Signers</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {signers.map((signer, index) => (
                <div key={signer.email || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900 truncate">{signer.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <p className="text-xs text-gray-500 truncate">{signer.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveSigner(index)} 
                    className="ml-2 p-1 hover:bg-gray-200 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
          <button 
            onClick={onClose} 
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continue Editing
          </button>
          <button
            onClick={handleSend}
            disabled={signers.length === 0 || uploading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{uploading ? 'Sending...' : 'Send Document'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignerModal 