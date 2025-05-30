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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="px-4 md:px-8 py-4 md:py-5">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-3 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 rounded-2xl transition-all duration-300 group shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
              </button>
              
              <div>
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Configure & Send
                </h1>
                <p className="text-sm md:text-base text-gray-600 font-medium">Step 2 of 2 - Add signers and configure settings</p>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Stats Pills */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl border border-blue-200">
                  <span className="text-sm font-bold text-blue-700">
                    {fields.length} {fields.length === 1 ? 'Field' : 'Fields'}
                  </span>
                </div>
                
                <div className="px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl border border-green-200">
                  <span className="text-sm font-bold text-green-700">
                    {signers.length} {signers.length === 1 ? 'Signer' : 'Signers'}
                  </span>
                </div>
              </div>
              
              {/* Send Button */}
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-2xl font-bold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Send Document</span>
                <span className="sm:hidden">Send</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Stats Bar */}
      <div className="md:hidden bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100 px-4 py-3">
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-bold">{fields.length} fields</span>
          </div>
          <div className="px-3 py-1 bg-green-100 rounded-full">
            <span className="text-green-700 font-bold">{signers.length} signers</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        {/* Document Summary Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Document Summary</h2>
              <p className="text-gray-600">Overview of your document configuration</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
              <div className="text-sm text-blue-600 font-medium mb-1">Document Name</div>
              <p className="font-bold text-blue-900 truncate">{documentFile?.name}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <div className="text-sm text-green-600 font-medium mb-1">Fields Added</div>
              <p className="font-bold text-green-900">{fields.length} interactive fields</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
              <div className="text-sm text-purple-600 font-medium mb-1">File Type</div>
              <p className="font-bold text-purple-900">{documentFile?.type}</p>
            </div>
          </div>
        </div>

        {/* Signers Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Document Signers</h2>
                <p className="text-gray-600">Add people who need to sign this document</p>
              </div>
            </div>
            
            <button
              onClick={addSigner}
              className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Signer</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>

          <div className="space-y-4">
            {signers.map((signer, index) => (
              <div key={signer.id} className="border-2 border-gray-200 rounded-2xl p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h3 className="font-bold text-gray-900">Signer {index + 1}</h3>
                  </div>
                  
                  {signers.length > 1 && (
                    <button
                      onClick={() => removeSigner(signer.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={signer.name}
                      onChange={(e) => updateSigner(signer.id, 'name', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white font-medium"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={signer.email}
                      onChange={(e) => updateSigner(signer.id, 'email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white font-medium"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Email Configuration */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Email Configuration</h2>
              <p className="text-gray-600">Customize the email sent to signers</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white font-medium"
                placeholder="Enter email subject"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Personal Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 bg-white font-medium resize-none"
                placeholder="Enter a personal message for the signers"
              />
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-2xl transition-all duration-300 group"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-bold text-gray-900">Advanced Settings</h2>
                <p className="text-gray-600">Configure security and signing options</p>
              </div>
            </div>
            <ArrowRight className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${showAdvanced ? 'rotate-90' : ''} group-hover:text-gray-600`} />
          </button>

          {showAdvanced && (
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-8">
              {/* Security Settings */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <h3 className="font-bold text-lg text-blue-900 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                  Security & Authentication
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center p-3 hover:bg-white rounded-xl transition-all duration-200 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={requireAuthentication}
                      onChange={(e) => setRequireAuthentication(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-4"
                    />
                    <span className="ml-3 text-sm font-medium text-blue-800 group-hover:text-blue-900">Require authentication to sign</span>
                  </label>
                  
                  <label className="flex items-center p-3 hover:bg-white rounded-xl transition-all duration-200 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={allowDelegation}
                      onChange={(e) => setAllowDelegation(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-blue-300 text-blue-600 focus:ring-blue-500 focus:ring-4"
                    />
                    <span className="ml-3 text-sm font-medium text-blue-800 group-hover:text-blue-900">Allow signers to delegate to others</span>
                  </label>
                </div>
              </div>

              {/* Signing Settings */}
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <h3 className="font-bold text-lg text-green-900 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full mr-3"></div>
                  Signing Process
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-green-800 mb-2">
                      Signing Order
                    </label>
                    <select
                      value={signingOrder}
                      onChange={(e) => setSigningOrder(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 bg-white font-medium"
                    >
                      <option value="any">Any order</option>
                      <option value="sequential">Sequential order</option>
                    </select>
                  </div>
                  
                  <label className="flex items-center p-3 hover:bg-white rounded-xl transition-all duration-200 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={requireAllSigners}
                      onChange={(e) => setRequireAllSigners(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-green-300 text-green-600 focus:ring-green-500 focus:ring-4"
                    />
                    <span className="ml-3 text-sm font-medium text-green-800 group-hover:text-green-900">Require all signers to complete</span>
                  </label>
                  
                  <label className="flex items-center p-3 hover:bg-white rounded-xl transition-all duration-200 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={allowComments}
                      onChange={(e) => setAllowComments(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-green-300 text-green-600 focus:ring-green-500 focus:ring-4"
                    />
                    <span className="ml-3 text-sm font-medium text-green-800 group-hover:text-green-900">Allow comments and notes</span>
                  </label>
                </div>
              </div>

              {/* Document Permissions */}
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                <h3 className="font-bold text-lg text-purple-900 mb-4 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                  Document Permissions
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center p-3 hover:bg-white rounded-xl transition-all duration-200 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={allowPrinting}
                      onChange={(e) => setAllowPrinting(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-4"
                    />
                    <span className="ml-3 text-sm font-medium text-purple-800 group-hover:text-purple-900">Allow printing</span>
                  </label>
                  
                  <label className="flex items-center p-3 hover:bg-white rounded-xl transition-all duration-200 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={allowDownload}
                      onChange={(e) => setAllowDownload(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-2 border-purple-300 text-purple-600 focus:ring-purple-500 focus:ring-4"
                    />
                    <span className="ml-3 text-sm font-medium text-purple-800 group-hover:text-purple-900">Allow download</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
          <button
            onClick={onBack}
            className="px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Editor</span>
          </button>
          
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>Send Document</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export { FIELD_CONFIGS, FIELD_TYPES } 