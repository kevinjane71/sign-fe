'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { 
  ArrowLeft, 
  ArrowRight,
  Menu, 
  X, 
  Type, 
  CheckSquare, 
  Calendar, 
  PenTool, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Send, 
  Loader2,
  Plus,
  Trash2,
  User,
  Mail,
  Settings,
  Shield,
  Users
} from 'lucide-react'
import toast from 'react-hot-toast'

// Field type configurations
const FIELD_TYPES = {
  TEXT: 'text',
  SIGNATURE: 'signature',
  CHECKBOX: 'checkbox',
  DATE: 'date'
}

const FIELD_CONFIGS = {
  [FIELD_TYPES.TEXT]: {
    icon: Type,
    label: 'Text Field',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    minWidth: 80,
    minHeight: 28,
    defaultWidth: 140,
    defaultHeight: 32
  },
  [FIELD_TYPES.SIGNATURE]: {
    icon: PenTool,
    label: 'Signature',
    color: '#10b981',
    bgColor: '#f0fdf4',
    minWidth: 100,
    minHeight: 40,
    defaultWidth: 160,
    defaultHeight: 50
  },
  [FIELD_TYPES.CHECKBOX]: {
    icon: CheckSquare,
    label: 'Checkbox',
    color: '#8b5cf6',
    bgColor: '#faf5ff',
    minWidth: 20,
    minHeight: 20,
    defaultWidth: 24,
    defaultHeight: 24
  },
  [FIELD_TYPES.DATE]: {
    icon: Calendar,
    label: 'Date Field',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    minWidth: 90,
    minHeight: 28,
    defaultWidth: 120,
    defaultHeight: 32
  }
}

// Document Configuration Component (Step 2)
export function DocumentConfiguration({ documentFile, fields, onBack, onSend, isLoading, initialConfig = {} }) {
  const [signers, setSigners] = useState(initialConfig.signers || [])
  const [subject, setSubject] = useState(initialConfig.subject || '')
  const [message, setMessage] = useState(initialConfig.message || '')
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Advanced settings with initial values
  const [requireAuthentication, setRequireAuthentication] = useState(initialConfig.requireAuthentication || false)
  const [allowDelegation, setAllowDelegation] = useState(initialConfig.allowDelegation !== undefined ? initialConfig.allowDelegation : true)
  const [allowComments, setAllowComments] = useState(initialConfig.allowComments !== undefined ? initialConfig.allowComments : true)
  const [sendReminders, setSendReminders] = useState(initialConfig.sendReminders !== undefined ? initialConfig.sendReminders : true)
  const [reminderFrequency, setReminderFrequency] = useState(initialConfig.reminderFrequency || 3)
  const [expirationEnabled, setExpirationEnabled] = useState(initialConfig.expirationEnabled || false)
  const [expirationDays, setExpirationDays] = useState(initialConfig.expirationDays || 30)
  const [signingOrder, setSigningOrder] = useState(initialConfig.signingOrder || 'any')
  const [requireAllSigners, setRequireAllSigners] = useState(initialConfig.requireAllSigners !== undefined ? initialConfig.requireAllSigners : true)
  const [allowPrinting, setAllowPrinting] = useState(initialConfig.allowPrinting !== undefined ? initialConfig.allowPrinting : true)
  const [allowDownload, setAllowDownload] = useState(initialConfig.allowDownload !== undefined ? initialConfig.allowDownload : true)

  // Initialize with default values
  useEffect(() => {
    if (!subject) {
      setSubject(`Please sign: ${documentFile?.name || 'Document'}`)
    }
    if (!message) {
      setMessage('Please review and sign this document at your earliest convenience.')
    }
    
    // Add a default signer if none exist
    if (signers.length === 0) {
      setSigners([{
        id: Date.now(),
        name: '',
        email: '',
        role: 'Signer'
      }])
    }
  }, [documentFile?.name, subject, message, signers.length])

  const addSigner = () => {
    const newSigner = {
      id: Date.now(),
      name: '',
      email: '',
      role: 'Signer'
    }
    setSigners(prev => [...prev, newSigner])
  }

  const updateSigner = (id, field, value) => {
    setSigners(prev => prev.map(signer => 
      signer.id === id ? { ...signer, [field]: value } : signer
    ))
  }

  const removeSigner = (id) => {
    if (signers.length > 1) {
      setSigners(prev => prev.filter(signer => signer.id !== id))
    } else {
      toast.error('At least one signer is required')
    }
  }

  const handleSend = () => {
    // Validation
    if (signers.length === 0) {
      toast.error('At least one signer is required')
      return
    }

    for (const signer of signers) {
      if (!signer.name.trim()) {
        toast.error('All signers must have a name')
        return
      }
      if (!signer.email.trim()) {
        toast.error('All signers must have an email')
        return
      }
      if (!/\S+@\S+\.\S+/.test(signer.email)) {
        toast.error('Please enter valid email addresses')
        return
      }
    }

    if (!subject.trim()) {
      toast.error('Subject is required')
      return
    }

    // Prepare configuration
    const config = {
      signers,
      subject,
      message,
      requireAuthentication,
      allowDelegation,
      allowComments,
      sendReminders,
      reminderFrequency,
      expirationEnabled,
      expirationDays,
      signingOrder,
      requireAllSigners,
      allowPrinting,
      allowDownload
    }

    onSend(config)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Configure Document
              </h1>
              <p className="text-sm text-gray-500">Step 2 of 2 - Add signers and configure settings</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {fields.length} fields • {signers.length} signers
            </span>
            
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="btn-primary flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Send Document</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Document Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Document Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Document:</span>
              <p className="font-medium">{documentFile?.name}</p>
            </div>
            <div>
              <span className="text-gray-500">Fields:</span>
              <p className="font-medium">{fields.length} fields added</p>
            </div>
            <div>
              <span className="text-gray-500">Type:</span>
              <p className="font-medium">{documentFile?.type}</p>
            </div>
          </div>
        </div>

        {/* Signers */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Signers
            </h2>
            <button
              onClick={addSigner}
              className="btn-secondary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Signer</span>
            </button>
          </div>

          <div className="space-y-4">
            {signers.map((signer, index) => (
              <div key={signer.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Signer {index + 1}</h3>
                  {signers.length > 1 && (
                    <button
                      onClick={() => removeSigner(signer.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={signer.name}
                      onChange={(e) => updateSigner(signer.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={signer.email}
                      onChange={(e) => updateSigner(signer.id, 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Configuration */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Configuration
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a message for the signers"
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between text-lg font-semibold mb-4"
          >
            <span className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Advanced Settings
            </span>
            <ArrowRight className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
          </button>

          {showAdvanced && (
            <div className="space-y-6 pt-4 border-t">
              {/* Security Settings */}
              <div>
                <h3 className="font-medium mb-3">Security & Authentication</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={requireAuthentication}
                      onChange={(e) => setRequireAuthentication(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Require authentication to sign</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allowDelegation}
                      onChange={(e) => setAllowDelegation(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Allow signers to delegate to others</span>
                  </label>
                </div>
              </div>

              {/* Signing Settings */}
              <div>
                <h3 className="font-medium mb-3">Signing Process</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Signing Order
                    </label>
                    <select
                      value={signingOrder}
                      onChange={(e) => setSigningOrder(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="any">Any order</option>
                      <option value="sequential">Sequential order</option>
                    </select>
                  </div>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={requireAllSigners}
                      onChange={(e) => setRequireAllSigners(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Require all signers to complete</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allowComments}
                      onChange={(e) => setAllowComments(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Allow comments and notes</span>
                  </label>
                </div>
              </div>

              {/* Document Permissions */}
              <div>
                <h3 className="font-medium mb-3">Document Permissions</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allowPrinting}
                      onChange={(e) => setAllowPrinting(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Allow printing</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={allowDownload}
                      onChange={(e) => setAllowDownload(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Allow download</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>
          
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="btn-primary flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Send Document</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export { FIELD_CONFIGS, FIELD_TYPES } 