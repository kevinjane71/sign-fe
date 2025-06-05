'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { 
  Upload, 
  Type, 
  PenTool, 
  CheckSquare, 
  Calendar,
  Save,
  Send, 
  Eye,
  Trash2,
  Plus,
  X,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Menu,
  ZoomIn,
  ZoomOut,
  Users,
  Settings,
  Clock,
  Shield,
  Mail,
  MessageSquare,
  Bell,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  FolderOpen,
  File,
  ChevronDown
} from 'lucide-react'
import { useToast } from '../../components/LayoutWrapper'
import { getDocument, updateDocument, sendDocument, getDocumentFile, uploadDocument } from '../../utils/api'
import LoadingSpinner from '../../components/LoadingSpinner'

// Field type configurations
const FIELD_TYPES = {
  TEXT: 'text',
  NAME: 'name',
  SIGNATURE: 'signature',
  CHECKBOX: 'checkbox',
  DATE: 'date',
  STAMP: 'stamp',
  EMAIL: 'email',
  PHONE: 'phone',
  DROPDOWN: 'dropdown'  // Added dropdown type
}

const FIELD_CONFIGS = {
  [FIELD_TYPES.SIGNATURE]: {
    icon: PenTool,
    label: 'Signature',
    color: '#4F46E5',
    bgColor: '#EEF2FF',
    borderColor: '#4F46E5',
    minWidth: 100,
    minHeight: 40,
    defaultWidth: 160,
    defaultHeight: 50,
    category: 'signature'
  },
  [FIELD_TYPES.TEXT]: {
    icon: Type,
    label: 'Text Field',
    color: '#D97706',
    bgColor: '#FEF3C7',
    borderColor: '#D97706',
    minWidth: 80,
    minHeight: 28,
    defaultWidth: 140,
    defaultHeight: 32,
    category: 'input'
  },
  [FIELD_TYPES.DATE]: {
    icon: Calendar,
    label: 'Date',
    color: '#059669',
    bgColor: '#D1FAE5',
    borderColor: '#059669',
    minWidth: 90,
    minHeight: 28,
    defaultWidth: 120,
    defaultHeight: 32,
    category: 'input'
  },
  [FIELD_TYPES.CHECKBOX]: {
    icon: CheckSquare,
    label: 'Checkbox',
    color: '#4B5563',
    bgColor: '#F3F4F6',
    borderColor: '#4B5563',
    minWidth: 20,
    minHeight: 20,
    defaultWidth: 24,
    defaultHeight: 24,
    category: 'selection'
  },
  [FIELD_TYPES.STAMP]: {
    icon: Shield,
    label: 'Initial',
    color: '#7C3AED',
    bgColor: '#F3E8FF',
    borderColor: '#7C3AED',
    minWidth: 60,
    minHeight: 60,
    defaultWidth: 80,
    defaultHeight: 80,
    category: 'signature'
  },
  [FIELD_TYPES.NAME]: {
    icon: Users,
    label: 'Name Field',
    color: '#10b981',
    bgColor: '#f0fdf4',
    borderColor: '#10b981',
    minWidth: 100,
    minHeight: 28,
    defaultWidth: 160,
    defaultHeight: 32,
    category: 'input'
  },
  [FIELD_TYPES.EMAIL]: {
    icon: Mail,
    label: 'Email Field',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    borderColor: '#f59e0b',
    minWidth: 120,
    minHeight: 28,
    defaultWidth: 180,
    defaultHeight: 32,
    category: 'input'
  },
  [FIELD_TYPES.PHONE]: {
    icon: MessageSquare,
    label: 'Phone Field',
    color: '#06b6d4',
    bgColor: '#f0f9ff',
    borderColor: '#06b6d4',
    minWidth: 100,
    minHeight: 28,
    defaultWidth: 140,
    defaultHeight: 32,
    category: 'input'
  },
  [FIELD_TYPES.DROPDOWN]: {
    icon: Menu,
    label: 'Dropdown',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#8B5CF6',
    minWidth: 120,
    minHeight: 32,
    defaultWidth: 160,
    defaultHeight: 32,
    category: 'input'
  }
}

// Document Configuration Component (Step 1) - Enhanced with pre-filling
function DocumentConfiguration({ documentFile, documents, allFields, fields, onBack, onNext, isLoading, documentData, toast, onAddDocument, onRemoveDocument }) {
  const [signers, setSigners] = useState([])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Advanced settings
  const [requireAuthentication, setRequireAuthentication] = useState(false)
  const [allowDelegation, setAllowDelegation] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [sendReminders, setSendReminders] = useState(true)
  const [reminderFrequency, setReminderFrequency] = useState(3) // days
  const [expirationEnabled, setExpirationEnabled] = useState(false)
  const [expirationDays, setExpirationDays] = useState(30)
  const [signingOrder, setSigningOrder] = useState('any') // 'any' or 'sequential'
  const [requireAllSigners, setRequireAllSigners] = useState(true)
  const [allowPrinting, setAllowPrinting] = useState(true)
  const [allowDownload, setAllowDownload] = useState(true)

  // Enhanced initialization with pre-filling from documentData
  useEffect(() => {
    // Pre-fill from existing document data if available
    if (documentData) {
      // Pre-fill signers if they exist
      if (documentData.signers && documentData.signers.length > 0) {
        const existingSigners = documentData.signers.map((signer, index) => ({
          id: signer.id || Date.now() + index,
          name: signer.name || '',
          email: signer.email || '',
          role: signer.role || 'Signer'
        }))
        setSigners(existingSigners)
      } else if (signers.length === 0) {
        // Add default signer if none exist
        setSigners([{
          id: Date.now(),
          name: '',
          email: '',
          role: 'Signer'
        }])
      }

      // Pre-fill subject and message
      if (documentData.subject) {
        setSubject(documentData.subject)
      } else {
        const documentName = documentData.title || documents?.[0]?.name || 'Document'
    setSubject(`Please sign: ${documentName}`)
      }

      if (documentData.message) {
        setMessage(documentData.message)
      } else {
    setMessage('Please review and sign this document at your earliest convenience.')
      }

      // Pre-fill advanced configuration if it exists
      if (documentData.configuration) {
        const config = documentData.configuration
        setRequireAuthentication(config.requireAuthentication || false)
        setAllowDelegation(config.allowDelegation !== false)
        setAllowComments(config.allowComments !== false)
        setSendReminders(config.sendReminders !== false)
        setReminderFrequency(config.reminderFrequency || 3)
        setExpirationEnabled(config.expirationEnabled || false)
        setExpirationDays(config.expirationDays || 30)
        setSigningOrder(config.signingOrder || 'any')
        setRequireAllSigners(config.requireAllSigners !== false)
        setAllowPrinting(config.allowPrinting !== false)
        setAllowDownload(config.allowDownload !== false)
      }
    } else {
      // Fallback to defaults for new documents
      const documentName = documents?.[0]?.name || 'Document'
      setSubject(`Please sign: ${documentName}`)
      setMessage('Please review and sign this document at your earliest convenience.')
      
    if (signers.length === 0) {
      setSigners([{
        id: Date.now(),
        name: '',
        email: '',
        role: 'Signer'
      }])
    }
    }
  }, [documentData, documents, signers.length])

  // On mount, restore from sessionStorage if available
  useEffect(() => {
    const stored = sessionStorage.getItem('documentConfiguration');
    if (stored) {
      try {
        const config = JSON.parse(stored);
        if (config.signers) setSigners(config.signers);
        if (config.subject) setSubject(config.subject);
        if (config.message) setMessage(config.message);
        if (config.requireAuthentication !== undefined) setRequireAuthentication(config.requireAuthentication);
        if (config.allowDelegation !== undefined) setAllowDelegation(config.allowDelegation);
        if (config.allowComments !== undefined) setAllowComments(config.allowComments);
        if (config.sendReminders !== undefined) setSendReminders(config.sendReminders);
        if (config.reminderFrequency !== undefined) setReminderFrequency(config.reminderFrequency);
        if (config.expirationEnabled !== undefined) setExpirationEnabled(config.expirationEnabled);
        if (config.expirationDays !== undefined) setExpirationDays(config.expirationDays);
        if (config.signingOrder) setSigningOrder(config.signingOrder);
        if (config.requireAllSigners !== undefined) setRequireAllSigners(config.requireAllSigners);
        if (config.allowPrinting !== undefined) setAllowPrinting(config.allowPrinting);
        if (config.allowDownload !== undefined) setAllowDownload(config.allowDownload);
      } catch {}
    }
  }, []);

  // On any change, persist to sessionStorage
  useEffect(() => {
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
    };
    sessionStorage.setItem('documentConfiguration', JSON.stringify(config));
  }, [signers, subject, message, requireAuthentication, allowDelegation, allowComments, sendReminders, reminderFrequency, expirationEnabled, expirationDays, signingOrder, requireAllSigners, allowPrinting, allowDownload]);

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

    // Store configuration in sessionStorage for step 2
    sessionStorage.setItem('documentConfiguration', JSON.stringify(config))

    // Just navigate to step 2, don't call API yet
    onNext()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Compact Header */}
      <header className="bg-white border-b border-gray-200 z-50 shadow-sm md:ml-72 sticky top-0 md:fixed md:top-20 left-0 right-0">
        <div className="px-3 py-2 md:px-4 md:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-3">
              <button 
                onClick={onBack}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div className="flex items-center space-x-1 md:space-x-2">
                <div className="w-6 h-6 md:w-7 md:h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xs md:text-sm font-bold text-gray-900 truncate max-w-[120px] md:max-w-[200px]">Configure Document</h1>
                  <div className="flex items-center space-x-1 md:space-x-2 text-[11px] md:text-xs text-gray-500">
                    <span>Step 1 of 2</span>
                    <span>•</span>
                    <span className="truncate max-w-[60px] md:max-w-[120px]">{fields.length} fields</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-xs font-semibold shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>Add Fields</span>
            </button>
          </div>
        </div>
      </header>

      {/* Compact Content */}
      <div className="pt-24 px-4 pb-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Document Summary - Compact */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Document Summary</h2>
            
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Document</span>
                <p className="font-medium text-gray-900 truncate">{documentData?.title || 'Document'}</p>
              </div>
              <div>
                <span className="text-gray-500">Fields</span>
                <p className="font-medium text-gray-900">{fields.length}</p>
              </div>
              <div>
                <span className="text-gray-500">Status</span>
                <p className="font-medium text-green-600">Ready</p>
              </div>
            </div>
          </div>

          {/* Document Preview Grid */}
          <DocumentPreviewGrid
            documents={documents}
            allFields={allFields}
            onAddDocument={onAddDocument}
            onRemoveDocument={onRemoveDocument}
            toast={toast}
          />

          {/* Signers - Compact */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">Signers</h2>
              <button
                onClick={addSigner}
                className="flex items-center space-x-1 px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>

            <div className="space-y-3">
              {signers.map((signer, index) => (
                <div key={signer.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-700">Signer {index + 1}</span>
                    {signers.length > 1 && (
                      <button
                        onClick={() => removeSigner(signer.id)}
                        className="text-red-500 hover:text-red-600 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={signer.name}
                        onChange={(e) => updateSigner(signer.id, 'name', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={signer.email}
                        onChange={(e) => updateSigner(signer.id, 'email', e.target.value)}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Configuration - Compact */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Email Configuration</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email subject"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a message for the signers"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings - Compact */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full flex items-center justify-between text-sm font-semibold text-gray-900 mb-3"
            >
              <span>Advanced Settings</span>
              <ArrowRight className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
            </button>

            {showAdvanced && (
              <div className="space-y-4 pt-3 border-t border-gray-200">
                {/* Security Settings */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2">Security & Authentication</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={requireAuthentication}
                        onChange={(e) => setRequireAuthentication(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Require authentication to sign</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={allowDelegation}
                        onChange={(e) => setAllowDelegation(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Allow signers to delegate to others</span>
                    </label>
                  </div>
                </div>

                {/* Signing Settings */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2">Signing Process</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Signing Order
                      </label>
                      <select
                        value={signingOrder}
                        onChange={(e) => setSigningOrder(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Require all signers to complete</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={allowComments}
                        onChange={(e) => setAllowComments(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Allow comments and notes</span>
                    </label>
                  </div>
                </div>

                {/* Reminders & Expiration */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2">Reminders & Expiration</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sendReminders}
                        onChange={(e) => setSendReminders(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Send automatic reminders</span>
                    </label>
                    
                    {sendReminders && (
                      <div className="ml-5">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Reminder frequency (days)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={reminderFrequency}
                          onChange={(e) => setReminderFrequency(parseInt(e.target.value))}
                          className="w-20 px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={expirationEnabled}
                        onChange={(e) => setExpirationEnabled(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Set expiration date</span>
                    </label>
                    
                    {expirationEnabled && (
                      <div className="ml-5">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Expires after (days)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="365"
                          value={expirationDays}
                          onChange={(e) => setExpirationDays(parseInt(e.target.value))}
                          className="w-20 px-2 py-1 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Document Permissions */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-700 mb-2">Document Permissions</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={allowPrinting}
                        onChange={(e) => setAllowPrinting(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Allow printing</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={allowDownload}
                        onChange={(e) => setAllowDownload(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
                      />
                      <span className="ml-2 text-xs text-gray-700">Allow download</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons - Compact */}
          <div className="flex justify-between pt-2">
            <button
              onClick={onBack}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors text-xs font-semibold text-gray-700"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back to Editor</span>
            </button>
            
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-xs font-semibold shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <ArrowRight className="w-3 h-3" />
              )}
              <span>Add Fields</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Document Viewer Component - Modified to show all documents in continuous scroll
const DocumentViewer = ({ documents, zoom, onZoomChange, children, onDocumentClick, signers }) => {
  const [allPages, setAllPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)

  // Load all documents and create a continuous page list
  const loadAllDocuments = useCallback(async () => {
    if (!documents || documents.length === 0) return

    setLoading(true)
    setError(null)

    try {
      const allDocumentPages = []
      
      for (let docIndex = 0; docIndex < documents.length; docIndex++) {
        const document = documents[docIndex]
        
        if (document.type === 'application/pdf') {
          const pdfPages = await loadPdfDocument(document, docIndex)
          allDocumentPages.push(...pdfPages)
        } else if (document.type.startsWith('image/')) {
          const imagePage = await loadImageDocument(document, docIndex)
          allDocumentPages.push(imagePage)
      } else {
          console.warn(`Unsupported file type: ${document.type}`)
      }
      }
      
      setAllPages(allDocumentPages)
    } catch (err) {
      console.error('Error loading documents:', err)
      setError('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }, [documents])

  // Load PDF using PDF.js - render at high quality
  const loadPdfDocument = async (documentFile, docIndex) => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      const pdf = await pdfjsLib.getDocument(documentFile.data || documentFile.url).promise
      const pagePromises = []
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pagePromises.push(renderPdfPage(pdf, pageNum, docIndex, documentFile.name))
      }
      
      const renderedPages = await Promise.all(pagePromises)
      return renderedPages
    } catch (error) {
      throw new Error(`Failed to load PDF: ${documentFile.name}`)
    }
  }

  // Render PDF page to canvas at high quality
  const renderPdfPage = async (pdf, pageNum, docIndex, docName) => {
    const page = await pdf.getPage(pageNum)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    // Render at high DPI for crisp quality
    const scale = 3.0 // High quality base scale
    const viewport = page.getViewport({ scale })
    
    canvas.width = viewport.width
    canvas.height = viewport.height
    
    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise
    
    return {
      pageNumber: pageNum,
      documentIndex: docIndex,
      documentName: docName,
      canvas,
      width: viewport.width,
      height: viewport.height,
      originalWidth: viewport.width / scale,
      originalHeight: viewport.height / scale
    }
  }

  // Load image document at high quality
  const loadImageDocument = async (documentFile, docIndex) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        // Render at original size for maximum quality
        const scale = 2.0 // High quality scale
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        const pageData = {
          pageNumber: 1,
          documentIndex: docIndex,
          documentName: documentFile.name,
          canvas,
          width: canvas.width,
          height: canvas.height,
          originalWidth: img.width,
          originalHeight: img.height
        }
        
        resolve(pageData)
      }
      
      img.onerror = () => reject(new Error(`Failed to load image: ${documentFile.name}`))
        img.src = documentFile.data || documentFile.url
    })
  }

  useEffect(() => {
    loadAllDocuments()
  }, [loadAllDocuments])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-auto bg-gray-100"
      onClick={onDocumentClick}
      style={{ scrollBehavior: 'smooth' }}
    >
      {allPages.map((page, globalPageIndex) => {
          // Calculate display dimensions to use full available width when zoomed
          const isMobile = window.innerWidth < 768
          
          // Use full available width, accounting for sidebar
          let availableWidth
          if (isMobile) {
            availableWidth = window.innerWidth - 16 // Small margin
          } else {
            availableWidth = window.innerWidth - 320 - 16 // Sidebar + small margin
          }
          
          // Calculate display width based on zoom and available space
          const baseWidth = Math.min(page.originalWidth * 1.2, (availableWidth * 0.9) / zoom) // Increased base size
          const displayWidth = baseWidth * zoom
          const displayHeight = (page.originalHeight / page.originalWidth) * displayWidth

          return (
          <div key={`${page.documentIndex}-${page.pageNumber}`} className="relative">
            {/* Document Page */}
            <div
              data-page-number={page.pageNumber}
              data-document-index={page.documentIndex}
              className="relative bg-white shadow-lg mx-auto my-4"
              style={{
                width: displayWidth,
                height: displayHeight,
                maxWidth: 'none'
              }}
            >
              {/* Page Number - Top Right */}
              <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full z-10 shadow-sm">
                {globalPageIndex + 1}
              </div>

              {/* Document Canvas */}
              <canvas
                width={page.width}
                height={page.height}
                className="w-full h-full block"
                style={{
                  width: '100%',
                  height: '100%',
                  imageRendering: 'crisp-edges'
                }}
                ref={(canvas) => {
                  if (canvas && page.canvas) {
                    const ctx = canvas.getContext('2d')
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    ctx.drawImage(page.canvas, 0, 0)
                  }
                }}
              />
              
              {/* Field Overlay Container */}
              <div className="absolute inset-0 pointer-events-none">
                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child) && 
                      child.props.pageNumber === page.pageNumber &&
                      child.props.documentIndex === page.documentIndex) {
                    return React.cloneElement(child, { 
                      containerWidth: displayWidth,
                      containerHeight: displayHeight,
                      signers: signers // Pass signers to FieldComponent
                    })
                  }
                  return null
                })}
              </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

// Field Component
const FieldComponent = ({ 
  field, 
  isSelected, 
  isDragging, 
  onSelect, 
  onDragStart, 
  onDelete, 
  onValueChange,
  containerWidth,
  containerHeight,
  signers // Add signers prop
}) => {
  const config = FIELD_CONFIGS[field.type]
  const Icon = config.icon
  const isMobile = window.innerWidth < 768
  
  // Get signer color if assigned
  const userColors = [
    { bg: '#FF6B6B', border: '#FF4757', text: '#FFFFFF' },
    { bg: '#4ECDC4', border: '#45B7AF', text: '#FFFFFF' },
    { bg: '#45B7D1', border: '#3A9DB8', text: '#FFFFFF' },
    { bg: '#96CEB4', border: '#7DBFA0', text: '#FFFFFF' },
    { bg: '#FFEEAD', border: '#FFE082', text: '#000000' },
    { bg: '#D4A5A5', border: '#C49292', text: '#FFFFFF' },
    { bg: '#9B59B6', border: '#8E44AD', text: '#FFFFFF' },
    { bg: '#3498DB', border: '#2980B9', text: '#FFFFFF' },
    { bg: '#E67E22', border: '#D35400', text: '#FFFFFF' },
    { bg: '#2ECC71', border: '#27AE60', text: '#FFFFFF' },
    { bg: '#F1C40F', border: '#F39C12', text: '#000000' },
    { bg: '#1ABC9C', border: '#16A085', text: '#FFFFFF' },
    { bg: '#E74C3C', border: '#C0392B', text: '#FFFFFF' },
    { bg: '#34495E', border: '#2C3E50', text: '#FFFFFF' },
    { bg: '#16A085', border: '#138D75', text: '#FFFFFF' }
  ];
  let signersWithColors = [];
  if (typeof window !== 'undefined' && window.location.pathname.includes('/editor/local-new')) {
    try {
      const config = JSON.parse(sessionStorage.getItem('documentConfiguration') || '{}');
      signersWithColors = (config.signers || []).map((signer, index) => ({ ...signer, color: userColors[index % userColors.length] }));
    } catch { signersWithColors = []; }
  } else {
    signersWithColors = (signers || []).map((signer, index) => ({ ...signer, color: userColors[index % userColors.length] }));
  }
  const assignedSigner = signersWithColors.find(s => s.id === field.assignedSigner);
  const signerColor = assignedSigner?.color;
  
  // Calculate responsive position and size
  const fieldStyle = {
    position: 'absolute',
    left: `${field.leftPercent}%`,
    top: `${field.topPercent}%`,
    width: `${field.widthPercent}%`,
    height: `${field.heightPercent}%`,
    minWidth: `${config.minWidth}px`,
    minHeight: `${config.minHeight}px`,
    backgroundColor: signerColor ? `${signerColor.bg}22` : config.bgColor, // 13% opacity
    border: `2px solid ${signerColor ? signerColor.border : isSelected ? config.color : '#e5e7eb'}`,
    borderRadius: '4px',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: 10, // Always below header (z-50) and modal (z-40)
    pointerEvents: 'auto',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    transform: isDragging ? 'scale(1.03)' : isSelected ? 'scale(1.01)' : 'scale(1)',
    boxShadow: isDragging 
      ? '0 4px 12px rgba(0,0,0,0.15)' 
      : isSelected 
        ? '0 2px 8px rgba(0,0,0,0.1)' 
        : '0 1px 3px rgba(0,0,0,0.05)'
  }

  // Calculate responsive font size based on field size
  const fieldWidth = (containerWidth * field.widthPercent) / 100
  const fieldHeight = (containerHeight * field.heightPercent) / 100
  const baseFontSize = field.fontSize || Math.max(10, Math.min(14, fieldHeight * 0.4))
  const fontSize = isMobile ? Math.max(10, baseFontSize * 0.9) : baseFontSize

  const handleMouseDown = (e) => {
    e.stopPropagation()
    onSelect(field.id)
    onDragStart(e, field)
  }

  const handleTouchStart = (e) => {
    e.stopPropagation()
    onSelect(field.id)
    onDragStart(e, field)
  }
    
  return (
    <div
      data-field-id={field.id}
      style={fieldStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(field.id)
      }}
    >
      {/* Field Content */}
      <div className="w-full h-full flex items-center justify-center p-1 relative">
        {/* Required Indicator */}
        {field.required && (
          <div className="absolute -top-1 -right-1 text-red-500 text-xs">*</div>
        )}
        
        {field.type === FIELD_TYPES.TEXT && (
          <input
            type="text"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none"
            placeholder={field.placeholder || "Enter text..."}
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px',
              color: field.textColor || '#000000'
              }}
            />
        )}

        {field.type === FIELD_TYPES.NAME && (
          <input
            type="text"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none font-medium"
            placeholder={field.placeholder || "Full Name"}
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px',
              color: field.textColor || '#000000'
            }}
          />
        )}

        {field.type === FIELD_TYPES.EMAIL && (
          <input
            type="email"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none"
            placeholder={field.placeholder || "email@example.com"}
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px',
              color: field.textColor || '#000000'
            }}
          />
        )}

        {field.type === FIELD_TYPES.PHONE && (
          <input
            type="tel"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none"
            placeholder={field.placeholder || "(555) 123-4567"}
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px',
              color: field.textColor || '#000000'
            }}
          />
        )}
        
        {field.type === FIELD_TYPES.CHECKBOX && (
          <input
            type="checkbox"
            checked={field.value || false}
            onChange={(e) => onValueChange(field.id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            style={{ 
              width: `${Math.min(fieldWidth * 0.8, fieldHeight * 0.8)}px`,
              height: `${Math.min(fieldWidth * 0.8, fieldHeight * 0.8)}px`,
              minWidth: '16px',
              minHeight: '16px',
              borderColor: field.borderColor || config.borderColor
            }}
          />
        )}
        
        {field.type === FIELD_TYPES.DATE && (
          <input
            type="date"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none"
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px',
              color: field.textColor || '#000000'
            }}
          />
        )}
        
        {field.type === FIELD_TYPES.SIGNATURE && (
          <div className="flex flex-col items-center justify-center" style={{ color: field.textColor || '#6B7280' }}>
            <Icon 
              style={{ 
                width: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5)}px`,
                height: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5)}px`,
                minWidth: '12px',
                minHeight: '12px'
              }} 
            />
            <span style={{ fontSize: `${Math.max(8, fontSize * 0.7)}px` }}>
              {field.placeholder || "Sign here"}
            </span>
          </div>
        )}

        {field.type === FIELD_TYPES.STAMP && (
          <div className="flex flex-col items-center justify-center" style={{ color: field.textColor || '#6B7280' }}>
            <Icon 
              style={{ 
                width: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.6)}px`,
                height: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.6)}px`,
                minWidth: '16px',
                minHeight: '16px'
              }} 
            />
            <span style={{ fontSize: `${Math.max(8, fontSize * 0.6)}px` }}>
              {field.placeholder || "Stamp"}
            </span>
          </div>
        )}

        {field.type === FIELD_TYPES.DROPDOWN && (
          <select
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none"
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px',
              color: field.textColor || '#000000'
            }}
          >
            <option value="" disabled>{field.placeholder || "Select an option..."}</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>

      {/* Field Toolbar */}
      {isSelected && (
        <div className="absolute -top-8 left-0 bg-gray-900 text-white px-2 py-1 rounded text-xs flex items-center space-x-1 z-60">
          <Icon className="w-3 h-3" />
          <span className="text-xs">{config.label}</span>
          {field.required && (
            <span className="text-red-400 ml-1">*</span>
          )}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(field.id)
          }}
            className="text-red-400 hover:text-red-300 ml-1"
        >
            <Trash2 className="w-3 h-3" />
        </button>
        </div>
      )}
    </div>
  )
}

// Mobile Floating Action Button
const BottomSheetFloatingButton = ({ onFieldTypeSelect, selectedFieldType, toast }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleToggle = () => {
    if (isOpen) {
      setAnimating(true)
      setTimeout(() => {
        setIsOpen(false)
        setAnimating(false)
      }, 350)
    } else {
      setIsOpen(true)
    }
  }

  const handleFieldSelect = (type) => {
    onFieldTypeSelect(type)
    setAnimating(true)
    setTimeout(() => {
      setIsOpen(false)
      setAnimating(false)
    }, 350)
    if (toast) toast.info(`Tap on document to place ${FIELD_CONFIGS[type].label}`)
  }

  return (
    <>
      {/* Floating + Button */}
      {!isOpen && !animating && (
        <button
          onClick={handleToggle}
          className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-blue-600 shadow-xl flex items-center justify-center transition-transform duration-300 md:hidden"
          aria-label="Show Add Field Bar"
        >
          <Plus className="w-6 h-6 text-white transition-transform duration-300" />
        </button>
      )}
      {/* Bottom Sheet - Compact, no heading */}
      {(isOpen || animating) && (
        <div
          className={`fixed inset-x-0 bottom-0 z-50 md:hidden pointer-events-auto transition-transform duration-350 ease-in-out
            ${isOpen && !animating ? 'translate-x-0' : 'translate-x-full'}
          `}
          style={{ willChange: 'transform' }}
        >
          <div className="bg-white rounded-t-xl shadow-2xl border-t border-gray-200 px-2 pt-2 pb-4 flex flex-col">
            <div className="flex justify-end mb-1">
              <button
                onClick={handleToggle}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-transform duration-300"
                aria-label="Close Add Field Bar"
              >
                <Plus className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="flex items-center space-x-1 overflow-x-auto pb-1">
              {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
                const Icon = config.icon
                return (
                  <button
                    key={type}
                    onClick={() => handleFieldSelect(type)}
                    className="flex flex-col items-center justify-center min-w-[48px] p-1 rounded-lg bg-gray-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-0.5 bg-white border border-gray-200">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[11px] font-medium text-gray-700 truncate w-full text-center">{config.label.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Document Manager Component - Compact chip-style design
function DocumentManager({ documents, allFields, onAddDocument, onRemoveDocument, toast }) {
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      files.forEach(file => {
        // Validate file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 50MB)`)
          return
        }

        // Accept all document types
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'image/webp',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'application/rtf'
        ]

        if (!allowedTypes.includes(file.type)) {
          toast.error(`${file.name} is not a supported file type`)
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const fileData = e.target.result
          
          const selectedFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: fileData
          }

          onAddDocument(selectedFile)
          toast.success(`${file.name} added successfully!`)
        }

        reader.onerror = () => {
          toast.error(`Error reading ${file.name}`)
        }

        reader.readAsDataURL(file)
      })
    }
    // Reset input
    e.target.value = ''
  }

  const scrollToDocument = (docIndex) => {
    const documentElement = document.querySelector(`[data-document-index="${docIndex}"]`)
    if (documentElement) {
      documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Get file type color
  const getFileTypeColor = (type) => {
    if (type === 'application/pdf') return 'bg-red-100 text-red-700 border-red-200'
    if (type.startsWith('image/')) return 'bg-green-100 text-green-700 border-green-200'
    if (type.includes('word')) return 'bg-blue-100 text-blue-700 border-blue-200'
    return 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="bg-white p-2">
      {/* Document Chips */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {documents.map((doc, index) => {
          const fieldCount = allFields[index]?.length || 0
          const colorClass = getFileTypeColor(doc.type)
          
          return (
            <div
              key={index}
              className={`
                relative flex items-center space-x-1.5 px-2 py-1 rounded-full border text-xs font-medium cursor-pointer
                transition-all hover:shadow-sm ${colorClass}
              `}
              onClick={() => scrollToDocument(index)}
            >
              {/* Document Number */}
              <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
          </div>
              
              {/* Document Name */}
              <span className="truncate max-w-[80px]">{doc.name.split('.')[0]}</span>
              
              {/* Field Count */}
              <div className="flex items-center space-x-1">
                <div className={`w-1.5 h-1.5 rounded-full ${fieldCount > 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-xs">{fieldCount}</span>
              </div>
              
              {/* Remove Button */}
              {documents.length > 1 && (
            <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveDocument(index)
                  }}
                  className="w-3 h-3 flex items-center justify-center hover:bg-red-200 rounded-full transition-colors"
                >
                  <X className="w-2 h-2" />
            </button>
        )}
      </div>
          )
        })}

        {/* Add Document Chip */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-1 px-2 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-200 transition-colors text-xs font-medium"
        >
          <Plus className="w-3 h-3" />
          <span>Add</span>
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt,.rtf"
          onChange={handleFileSelect}
          className="hidden"
        />
          </div>
      
      {/* Summary */}
      <div className="text-xs text-gray-500 px-1">
        {documents.length} docs • {Object.values(allFields).reduce((total, fields) => total + fields.length, 0)} fields
      </div>
    </div>
  )
}

// Document Preview Grid Component - Google Drive style
function DocumentPreviewGrid({ documents, allFields, onAddDocument, onRemoveDocument, toast }) {
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      files.forEach(file => {
        // Validate file size (50MB limit)
        if (file.size > 50 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 50MB)`)
          return
        }

        // Accept all document types
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/jpg', 
          'image/png',
          'image/gif',
          'image/webp',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'text/plain',
          'application/rtf'
        ]

        if (!allowedTypes.includes(file.type)) {
          toast.error(`${file.name} is not a supported file type`)
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          const fileData = e.target.result
          
          const selectedFile = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: fileData
          }

          onAddDocument(selectedFile)
          toast.success(`${file.name} added successfully!`)
        }

        reader.onerror = () => {
          toast.error(`Error reading ${file.name}`)
        }

        reader.readAsDataURL(file)
      })
    }
    // Reset input
    e.target.value = ''
  }

  const getFileIcon = (type) => {
    if (type === 'application/pdf') return '📄'
    if (type.startsWith('image/')) return '🖼️'
    if (type.includes('word')) return '📝'
    return '📄'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add Document</span>
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt,.rtf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => {
          const fieldCount = allFields[index]?.length || 0
          
          return (
            <div
              key={index}
              className="relative group border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              {/* Remove Button - Disabled for existing documents */}
              {documents.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toast.info('Cannot remove documents from existing document editor')
                  }}
                  className="absolute top-2 right-2 w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-not-allowed"
                  disabled
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Document Preview */}
              <div className="flex flex-col items-center text-center">
                {/* File Icon */}
                <div className="text-4xl mb-3">
                  {getFileIcon(doc.type)}
                </div>

                {/* Document Info */}
                <div className="w-full">
                  <h3 className="font-medium text-gray-900 truncate mb-1" title={doc.name}>
                    {doc.name}
                  </h3>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>{formatFileSize(doc.size)}</div>
                    <div className="flex items-center justify-center space-x-2">
                      <span>{doc.type.split('/')[1]?.toUpperCase()}</span>
                      <span>•</span>
                      <span className={`${fieldCount > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                        {fieldCount} fields
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-3 w-full">
                  <div className={`w-full h-1 rounded-full ${fieldCount > 0 ? 'bg-green-200' : 'bg-gray-200'}`}>
                    <div 
                      className={`h-full rounded-full transition-all ${fieldCount > 0 ? 'bg-green-500' : 'bg-gray-400'}`}
                      style={{ width: fieldCount > 0 ? '100%' : '20%' }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {fieldCount > 0 ? 'Ready' : 'Needs fields'}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{documents.length} document{documents.length !== 1 ? 's' : ''}</span>
          <span>{Object.values(allFields).reduce((total, fields) => total + fields.length, 0)} total fields</span>
        </div>
      </div>
    </div>
  )
}

// Field Configuration Panel Component
function FieldConfigurationPanel({ field, onUpdate, onClose, signers, panelClassName }) {
  if (!field) return null;

  const userColors = [
    { bg: '#FF6B6B', border: '#FF4757', text: '#FFFFFF' },
    { bg: '#4ECDC4', border: '#45B7AF', text: '#FFFFFF' },
    { bg: '#45B7D1', border: '#3A9DB8', text: '#FFFFFF' },
    { bg: '#96CEB4', border: '#7DBFA0', text: '#FFFFFF' },
    { bg: '#FFEEAD', border: '#FFE082', text: '#000000' },
    { bg: '#D4A5A5', border: '#C49292', text: '#FFFFFF' },
    { bg: '#9B59B6', border: '#8E44AD', text: '#FFFFFF' },
    { bg: '#3498DB', border: '#2980B9', text: '#FFFFFF' },
    { bg: '#E67E22', border: '#D35400', text: '#FFFFFF' },
    { bg: '#2ECC71', border: '#27AE60', text: '#FFFFFF' },
    { bg: '#F1C40F', border: '#F39C12', text: '#000000' },
    { bg: '#1ABC9C', border: '#16A085', text: '#FFFFFF' },
    { bg: '#E74C3C', border: '#C0392B', text: '#FFFFFF' },
    { bg: '#34495E', border: '#2C3E50', text: '#FFFFFF' },
    { bg: '#16A085', border: '#138D75', text: '#FFFFFF' }
  ]

  const signersWithColors = signers.map((signer, index) => ({
    ...signer,
    color: userColors[index % userColors.length]
  }))

  const [config, setConfig] = React.useState({
    placeholder: field.placeholder || '',
    required: field.required || false,
    assignedSigner: field.assignedSigner || null,
    options: field.options || ['Option 1', 'Option 2', 'Option 3']
  })

  React.useEffect(() => {
    setConfig({
      placeholder: field.placeholder || '',
      required: field.required || false,
      assignedSigner: field.assignedSigner || null,
      options: field.options || ['Option 1', 'Option 2', 'Option 3']
    })
  }, [field])

  const handleChange = (key, value) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    onUpdate(field.id, newConfig)
  }

  const handleOptionsChange = (index, value) => {
    const newOptions = [...config.options]
    newOptions[index] = value
    handleChange('options', newOptions)
  }

  const addOption = () => {
    handleChange('options', [...config.options, `Option ${config.options.length + 1}`])
  }

  const removeOption = (index) => {
    const newOptions = config.options.filter((_, i) => i !== index)
    handleChange('options', newOptions)
  }

  const selectedSigner = signersWithColors.find(s => s.id === config.assignedSigner)

  // Custom dropdown for signer assignment
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef(null)

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`w-60 min-w-[240px] bg-white border-l border-gray-200 h-full overflow-y-auto `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Large color preview for selected signer */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedSigner ? '' : 'bg-gray-100'}`}
              style={{ backgroundColor: selectedSigner ? selectedSigner.color.bg : undefined, border: selectedSigner ? `2px solid ${selectedSigner.color.border}` : undefined }}>
              <FileText className={`w-4 h-4 ${selectedSigner ? 'text-white' : 'text-gray-500'}`} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Field Settings</h3>
              <p className="text-xs text-gray-500">{FIELD_CONFIGS[field.type].label}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Placeholder */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Placeholder Text</label>
          <input
            type="text"
            value={config.placeholder}
            onChange={(e) => handleChange('placeholder', e.target.value)}
            className="w-full px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter placeholder text..."
          />
        </div>

        {/* Required Field */}
        <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="required"
            checked={config.required}
            onChange={(e) => handleChange('required', e.target.checked)}
            className="h-3.5 w-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="required" className="text-sm text-gray-700">
            Required Field
          </label>
        </div>

        {/* Custom Signer Assignment Dropdown */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">Assign to Signer</label>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              className="w-full flex items-center justify-between px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              style={{
                borderColor: selectedSigner ? selectedSigner.color.border : undefined,
                backgroundColor: selectedSigner ? selectedSigner.color.bg : undefined,
                color: selectedSigner ? '#111827' : undefined // Always use dark text for visibility
              }}
              onClick={() => setDropdownOpen((open) => !open)}
            >
              <span className="flex items-center">
                {selectedSigner && (
                  <span className="w-4 h-4 rounded-full mr-2 border border-white" style={{ backgroundColor: selectedSigner.color.bg, borderColor: selectedSigner.color.border }} />
                )}
                <span className="font-semibold text-gray-900">{selectedSigner ? (selectedSigner.name || selectedSigner.email) : 'Select a signer...'}</span>
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                {signersWithColors.map((signer) => (
                  <button
                    key={signer.id}
                    type="button"
                    className={`w-full flex items-center px-3 py-2 text-sm hover:bg-gray-100 ${config.assignedSigner === signer.id ? 'bg-gray-50 font-semibold' : ''}`}
                    style={{ color: '#111827' }} // Always use dark text for visibility
                    onClick={() => { handleChange('assignedSigner', signer.id); setDropdownOpen(false); }}
                  >
                    <span className="w-4 h-4 rounded-full mr-2 border" style={{ backgroundColor: signer.color.bg, borderColor: signer.color.border }} />
                    <span className="font-semibold text-gray-900">{signer.name || signer.email}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Color indicator for selected signer */}
        {selectedSigner && (
          <div className="mt-2 flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
            <div 
              className="w-5 h-5 rounded-full border-2" 
              style={{ backgroundColor: selectedSigner.color.bg, borderColor: selectedSigner.color.border }}
            />
            <span className="text-sm text-gray-600">
              {selectedSigner.name || selectedSigner.email}
            </span>
          </div>
        )}

        {/* Dropdown Options */}
        {field.type === FIELD_TYPES.DROPDOWN && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-gray-700">Dropdown Options</label>
              <button
                onClick={addOption}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {config.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionsChange(index, e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Option ${index + 1}`}
                  />
                  <button
                    onClick={() => removeOption(index)}
                    className="p-1 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Main Editor Component with step persistence
export default function EditDocumentEditor() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const documentId = params.documentId
  const toast = useToast()
  
  // Get step from URL parameter, default to 1
  const urlStep = searchParams.get('step')
  const initialStep = urlStep ? parseInt(urlStep) : 1
  
  // State - Modified to support multiple documents in continuous view
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [allFields, setAllFields] = useState({}) // Fields organized by document index
  const [selectedField, setSelectedField] = useState(null)
  const [selectedFieldType, setSelectedFieldType] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // 2-Step Process State with URL persistence
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [isStepLoading, setIsStepLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Document data for pre-filling configuration
  const [documentData, setDocumentData] = useState(null)
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [draggedField, setDraggedField] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })

  // Update URL when step changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('step', currentStep.toString())
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`
    window.history.replaceState({}, '', newUrl)
  }, [currentStep, searchParams])

  // Get all fields from all documents
  const getAllFields = () => {
    return Object.values(allFields).flat()
  }

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load documents from API or sessionStorage
  useEffect(() => {
    const loadDocument = async () => {
      if (!documentId) {
        toast.error('No document ID provided')
        router.push('/')
        return
      }

      if (documentId === 'local-new') {
        // Load from sessionStorage
        setLoading(true)
        try {
          let docs = []
          let fieldsData = {}
          const pendingDocs = sessionStorage.getItem('pendingDocuments')
          const pendingDoc = sessionStorage.getItem('pendingDocument')
          if (pendingDocs) {
            docs = JSON.parse(pendingDocs)
          } else if (pendingDoc) {
            docs = [JSON.parse(pendingDoc)]
          }
          if (docs.length === 0) {
            toast.error('No local file found. Please upload again.')
            router.push('/dashboard')
            return
          }
          // No fields for local files initially
          docs.forEach((_, idx) => { fieldsData[idx] = [] })
          setDocuments(docs)
          setAllFields(fieldsData)
          setDocumentData(null)
          toast.success(`Loaded ${docs.length} local document(s)`)
        } catch (err) {
          toast.error('Failed to load local file')
          router.push('/dashboard')
        } finally {
          setLoading(false)
        }
        return
      }

      // Default: load from API
      try {
        setLoading(true)
        // Fetch document data from API using authenticated function
        const result = await getDocument(documentId)
        const docData = result.document
        setDocumentData(docData)
        // Convert API files to document format for the viewer
        const loadedDocuments = []
        const fieldsData = {}
        for (let i = 0; i < docData.files.length; i++) {
          const file = docData.files[i]
          try {
            // Fetch the actual file content using authenticated function
            const fileBlob = await getDocumentFile(documentId, file.fileId)
            // Convert blob to base64 data URL for the viewer
            const reader = new FileReader()
            const dataUrl = await new Promise((resolve) => {
              reader.onload = () => resolve(reader.result)
              reader.readAsDataURL(fileBlob)
            })
            // Create document object compatible with the viewer
            const documentObj = {
              name: file.originalName,
              type: file.mimeType,
              size: file.size,
              data: dataUrl,
              fileId: file.fileId,
              title: file.title
            }
            loadedDocuments.push(documentObj)
            // Convert fields from API format to editor format
            const convertedFields = (file.fields || []).map(field => ({
              ...field,
              documentIndex: i // Ensure document index is set
            }))
            fieldsData[i] = convertedFields
          } catch (fileError) {
            console.error(`Error loading file ${file.originalName}:`, fileError)
            toast.error(`Failed to load ${file.originalName}`)
          }
        }
        setDocuments(loadedDocuments)
        setAllFields(fieldsData)
        // If URL has step parameter, ensure it's valid
        const urlStep = searchParams.get('step')
        if (urlStep) {
          const step = parseInt(urlStep)
          if (step >= 1 && step <= 2) {
            setCurrentStep(step)
          } else {
            // Invalid step, redirect to step 1
            const newSearchParams = new URLSearchParams(searchParams)
            newSearchParams.set('step', '1')
            router.replace(`${window.location.pathname}?${newSearchParams.toString()}`)
            setCurrentStep(1)
          }
        }
        toast.success(`Loaded ${loadedDocuments.length} document(s)`)
      } catch (error) {
        console.error('Error loading document:', error)
        toast.error('Failed to load document')
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    loadDocument()
  }, [documentId, router, searchParams])

  // Document management functions
  const handleAddDocument = (newDocument) => {
    const newIndex = documents.length
    setDocuments(prev => [...prev, newDocument])
    setAllFields(prev => ({
      ...prev,
      [newIndex]: []
    }))
    
    // Update sessionStorage
    const updatedDocs = [...documents, newDocument]
    sessionStorage.setItem('pendingDocuments', JSON.stringify(updatedDocs))
  }

  const handleRemoveDocument = (index) => {
    if (documents.length <= 1) {
      toast.error('At least one document is required')
      return
    }

    const updatedDocs = documents.filter((_, i) => i !== index)
    const updatedFields = {}
    
    // Reindex fields
    Object.keys(allFields).forEach(key => {
      const keyIndex = parseInt(key)
      if (keyIndex < index) {
        updatedFields[keyIndex] = allFields[keyIndex]
      } else if (keyIndex > index) {
        updatedFields[keyIndex - 1] = allFields[keyIndex]
      }
    })

    setDocuments(updatedDocs)
    setAllFields(updatedFields)
    
    // Update sessionStorage
    sessionStorage.setItem('pendingDocuments', JSON.stringify(updatedDocs))
    toast.success('Document removed')
  }

  // Add field to specific document based on click position
  const addField = useCallback((type, position, pageNumber, documentIndex) => {
    const config = FIELD_CONFIGS[type]
    const fieldId = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Get actual container dimensions
    const pageElement = document.querySelector(`[data-page-number="${pageNumber || 1}"][data-document-index="${documentIndex}"]`)
    if (!pageElement) return
    
    const containerWidth = pageElement.offsetWidth
    const containerHeight = pageElement.offsetHeight
    const isMobile = window.innerWidth < 768
    
    // Calculate responsive field dimensions based on container and screen size
    let width = config.defaultWidth
    let height = config.defaultHeight
    
    // Scale factor based on document size and screen
    const documentScale = Math.min(containerWidth / 800, containerHeight / 1000)
    const responsiveScale = isMobile ? 0.7 : 1.0
    const zoomScale = 1 / zoom
    
    const finalScale = documentScale * responsiveScale * zoomScale
    
    // Apply scaling with bounds
    width = Math.max(config.minWidth, Math.min(width * finalScale, containerWidth * 0.4))
    height = Math.max(config.minHeight, Math.min(height * finalScale, containerHeight * 0.15))
    
    // Convert to percentages for responsive positioning
    const leftPercent = Math.max(0, Math.min(95, (position.x / containerWidth) * 100))
    const topPercent = Math.max(0, Math.min(95, (position.y / containerHeight) * 100))
    const widthPercent = Math.max(2, Math.min(40, (width / containerWidth) * 100))
    const heightPercent = Math.max(1.5, Math.min(20, (height / containerHeight) * 100))
    
    const newField = {
      id: fieldId,
      type,
      leftPercent,
      topPercent,
      widthPercent,
      heightPercent,
      pageNumber: pageNumber || 1,
      documentIndex: documentIndex,
      value: '',
      required: false
    }

    // Add field to the specific document
    setAllFields(prev => ({
      ...prev,
      [documentIndex]: [...(prev[documentIndex] || []), newField]
    }))
    
    setSelectedField(fieldId)
    setSelectedFieldType(null)
    
    toast.success(`${config.label} added to ${documents[documentIndex]?.name}`)
  }, [zoom, documents])

  // Handle document click to add field - Modified to detect document index
  const handleDocumentClick = useCallback((e) => {
    if (!selectedFieldType || isDragging) return
    
    const pageElement = e.target.closest('[data-page-number][data-document-index]')
    if (!pageElement) return

    const pageNumber = parseInt(pageElement.getAttribute('data-page-number'))
    const documentIndex = parseInt(pageElement.getAttribute('data-document-index'))
    const rect = pageElement.getBoundingClientRect()
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    addField(selectedFieldType, { x, y }, pageNumber, documentIndex)
  }, [selectedFieldType, isDragging, addField])

  // Field deletion handler - Modified to work with document index
  const handleFieldDelete = useCallback((fieldId) => {
    // Find which document contains this field
    for (const [docIndex, fields] of Object.entries(allFields)) {
      const fieldIndex = fields.findIndex(field => field.id === fieldId)
      if (fieldIndex !== -1) {
        setAllFields(prev => ({
          ...prev,
          [docIndex]: prev[docIndex].filter(field => field.id !== fieldId)
        }))
        setSelectedField(null)
        toast.success('Field deleted')
        break
      }
    }
  }, [allFields])

  // Field value change handler - Modified to work with document index
  const handleFieldValueChange = useCallback((fieldId, value) => {
    // Find which document contains this field and update it
    for (const [docIndex, fields] of Object.entries(allFields)) {
      const fieldIndex = fields.findIndex(field => field.id === fieldId)
      if (fieldIndex !== -1) {
        setAllFields(prev => ({
          ...prev,
          [docIndex]: prev[docIndex].map(field => 
            field.id === fieldId ? { ...field, value } : field
          )
        }))
        break
      }
    }
  }, [allFields])

  // Drag handlers - Modified to work with document index
  const handleDragStart = useCallback((e, field) => {
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY
    
    setIsDragging(true)
    setDraggedField(field)
    setDragStartPos({ x: clientX, y: clientY })
    
    // Calculate offset from field's top-left corner
    const fieldElement = e.target.closest('[data-field-id]')
    if (fieldElement) {
      const rect = fieldElement.getBoundingClientRect()
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top
      })
    }
  }, [])

  const handleDragMove = useCallback((e) => {
    if (!isDragging || !draggedField) return

    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY

    // Find the page element under the cursor
    const pageElement = document.elementFromPoint(clientX, clientY)?.closest('[data-page-number][data-document-index]')
    if (!pageElement) return

    const pageRect = pageElement.getBoundingClientRect()
    const newX = clientX - pageRect.left - dragOffset.x
    const newY = clientY - pageRect.top - dragOffset.y
    
    // Convert to percentages
    const leftPercent = Math.max(0, Math.min(95, (newX / pageRect.width) * 100))
    const topPercent = Math.max(0, Math.min(95, (newY / pageRect.height) * 100))
    
    // Update field position in the correct document
    const docIndex = draggedField.documentIndex
    setAllFields(prev => ({
      ...prev,
      [docIndex]: prev[docIndex].map(field => 
      field.id === draggedField.id 
        ? { ...field, leftPercent, topPercent }
        : field
      )
    }))
  }, [isDragging, draggedField, dragOffset])

  // Field selection handler
  const handleFieldSelect = useCallback((fieldId) => {
    setSelectedField(fieldId)
  }, [])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setDraggedField(null)
    setDragOffset({ x: 0, y: 0 })
  }, [])

  // Global drag event listeners
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e)
      const handleMouseUp = () => handleDragEnd()
      const handleTouchMove = (e) => {
        e.preventDefault()
        handleDragMove(e)
      }
      const handleTouchEnd = () => handleDragEnd()

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }

  // Preview handler - Updated for continuous view
  const handlePreview = () => {
    if (documents.length === 0) {
      toast.error('Please upload at least one document first')
      return
    }

    const totalFields = Object.values(allFields).reduce((total, fields) => total + fields.length, 0)
    if (totalFields === 0) {
      toast.error('Please add at least one field to preview')
      return
    }

    // Store preview data for all documents
    const previewData = {
      documents: documents.map((doc, index) => ({
        title: doc.name,
        document: {
          name: doc.name,
          type: doc.type,
          size: doc.size,
          data: doc.data,
          url: doc.url
        },
        fields: allFields[index] || []
      }))
    }

    sessionStorage.setItem('previewDocuments', JSON.stringify(previewData))
    
    // Open preview in new tab
    window.open('/live/preview', '_blank')
  }

  // Step navigation functions
  const handleNextStep = async () => {
    if (currentStep === 1) {
      // Moving from configuration to editor
      if (documents.length === 0) {
        toast.error('Please load documents first')
        return
      }
      
      setIsStepLoading(true)
      
      // Update URL first
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set('step', '2')
      router.replace(`${window.location.pathname}?${newSearchParams.toString()}`)
      
      // Smooth transition delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setCurrentStep(2)
      setIsStepLoading(false)
    } else {
      // From step 2, get configuration and send
      const storedConfig = sessionStorage.getItem('documentConfiguration')
      if (!storedConfig) {
        toast.error('Configuration missing. Please go back to step 1.')
        const newSearchParams = new URLSearchParams(searchParams)
        newSearchParams.set('step', '1')
        router.replace(`${window.location.pathname}?${newSearchParams.toString()}`)
        setCurrentStep(1)
        return
      }
      
      // Parse config and call the API to update and send document
      const config = JSON.parse(storedConfig)
      handleSend(config)
    }
  }

  const handleBackToConfiguration = async () => {
    if (currentStep === 1) {
      // From step 1, go back to dashboard
      router.push('/dashboard')
      return
    }
    
    // From step 2, go back to step 1 with smooth transition
    setIsStepLoading(true)
    
    // Update URL first
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('step', '1')
    router.replace(`${window.location.pathname}?${newSearchParams.toString()}`)
    
    // Smooth transition delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    setCurrentStep(1)
    setIsStepLoading(false)
  }

  // Send handler (final step) - Modified for updating existing document and local-new flow
  const handleSend = useCallback(async (config) => {
    if (documents.length === 0) {
      toast.error('Please load documents first')
      return
    }

    try {
      setIsSubmitting(true)

      if (documentId === 'local-new') {
        // 1. Upload the document(s) to get a real documentId
        const formData = new FormData()
        documents.forEach((document, index) => {
          if (document.data) {
            const base64Data = document.data.split(',')[1]
            const byteCharacters = atob(base64Data)
            const byteNumbers = new Array(byteCharacters.length)
            for (let j = 0; j < byteCharacters.length; j++) {
              byteNumbers[j] = byteCharacters.charCodeAt(j)
            }
            const byteArray = new Uint8Array(byteNumbers)
            const blob = new Blob([byteArray], { type: document.type })
            formData.append('documents', blob, document.name)
            formData.append(`title_${index}`, document.name || `Untitled Document ${index + 1}`)
            formData.append(`mimeType_${index}`, document.type)
            formData.append(`fields_${index}`, JSON.stringify(allFields[index] || []))
          }
        })
        formData.append('signers', JSON.stringify(config.signers))
        formData.append('subject', config.subject)
        formData.append('message', config.message)
        formData.append('configuration', JSON.stringify({
          requireAuthentication: config.requireAuthentication,
          allowDelegation: config.allowDelegation,
          allowComments: config.allowComments,
          sendReminders: config.sendReminders,
          reminderFrequency: config.reminderFrequency,
          expirationEnabled: config.expirationEnabled,
          expirationDays: config.expirationDays,
          signingOrder: config.signingOrder,
          requireAllSigners: config.requireAllSigners,
          allowPrinting: config.allowPrinting,
          allowDownload: config.allowDownload
        }))
        // Use authenticated upload function
        const result = await uploadDocument(formData)
        const newDocumentId = result.documentId
        // Now update and send using the new documentId
        const fileFields = result.document.files.map((file, index) => ({
          fileId: file.fileId,
          fields: allFields[index] || []
        }))
        // Update document
        await updateDocument(newDocumentId, {
          fileFields: fileFields,
          signers: config.signers,
          subject: config.subject,
          message: config.message,
          configuration: {
            requireAuthentication: config.requireAuthentication,
            allowDelegation: config.allowDelegation,
            allowComments: config.allowComments,
            sendReminders: config.sendReminders,
            reminderFrequency: config.reminderFrequency,
            expirationEnabled: config.expirationEnabled,
            expirationDays: config.expirationDays,
            signingOrder: config.signingOrder,
            requireAllSigners: config.requireAllSigners,
            allowPrinting: config.allowPrinting,
            allowDownload: config.allowDownload
          }
        })
        // Send document
        await sendDocument(newDocumentId, {
          fileFields: fileFields,
          signers: config.signers,
          subject: config.subject,
          message: config.message,
          configuration: {
            requireAuthentication: config.requireAuthentication,
            allowDelegation: config.allowDelegation,
            allowComments: config.allowComments,
            sendReminders: config.sendReminders,
            reminderFrequency: config.reminderFrequency,
            expirationEnabled: config.expirationEnabled,
            expirationDays: config.expirationDays,
            signingOrder: config.signingOrder,
            requireAllSigners: config.requireAllSigners,
            allowPrinting: config.allowPrinting,
            allowDownload: config.allowDownload
          }
        })
        toast.success('Document shared successfully!')
        // Clear session storage
        sessionStorage.removeItem('pendingDocument')
        sessionStorage.removeItem('pendingDocuments')
        // Redirect to dashboard
        router.push('/dashboard')
        return
      }

      // Existing document flow
      // Prepare fileFields data for the API
      const fileFields = documents.map((document, index) => ({
        fileId: document.fileId,
        fields: allFields[index] || []
      }))
      // Prepare update data
      const updateData = {
        fileFields: fileFields,
        signers: config.signers,
        subject: config.subject,
        message: config.message,
        configuration: {
          requireAuthentication: config.requireAuthentication,
          allowDelegation: config.allowDelegation,
          allowComments: config.allowComments,
          sendReminders: config.sendReminders,
          reminderFrequency: config.reminderFrequency,
          expirationEnabled: config.expirationEnabled,
          expirationDays: config.expirationDays,
          signingOrder: config.signingOrder,
          requireAllSigners: config.requireAllSigners,
          allowPrinting: config.allowPrinting,
          allowDownload: config.allowDownload
        }
      }
      // Update the existing document using authenticated function
      await updateDocument(documentId, updateData)
      // Send the document using authenticated function
      await sendDocument(documentId, {
        fileFields: fileFields,
        signers: config.signers,
        subject: config.subject,
        message: config.message,
        configuration: updateData.configuration
      })
      toast.success('Document shared successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error updating document:', error)
      toast.error('Failed to share document. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [documents, allFields, documentId, router])

  // Update field configuration
  const handleFieldConfigUpdate = (fieldId, updatedConfig) => {
    // Find which document contains this field
    for (const [docIndex, fields] of Object.entries(allFields)) {
      const fieldIndex = fields.findIndex(field => field.id === fieldId)
      if (fieldIndex !== -1) {
        setAllFields(prev => ({
          ...prev,
          [docIndex]: prev[docIndex].map(field => 
            field.id === fieldId 
              ? { 
                  ...field,
                  ...updatedConfig,
                  documentIndex: parseInt(docIndex) // Ensure documentIndex is preserved
                } 
              : field
          )
        }))
        break
      }
    }
    setSelectedField(fieldId)
  }

  if (loading) {
    return <LoadingSpinner message="Loading document..." />
  }

  // Show loading overlay when submitting
  if (isSubmitting) {
    return <LoadingSpinner type="submit" />
  }

  // Show step loading overlay
  if (isStepLoading) {
    return <LoadingSpinner message="Loading..." />
  }

  // Step 1: Document Configuration
  if (currentStep === 1) {
    return (
      <DocumentConfiguration
        documentFile={documents[0]}
        documents={documents}
        allFields={allFields}
        fields={getAllFields()}
        onBack={handleBackToConfiguration}
        onNext={handleNextStep}
        isLoading={isStepLoading}
        documentData={documentData}
        toast={toast}
        onAddDocument={handleAddDocument}
        onRemoveDocument={handleRemoveDocument}
      />
    )
  }

  // Step 2: Document Editor - Modified for continuous view
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Compact Professional Header */}
      <header className="bg-white border-b border-gray-200 fixed top-20 left-0 right-0 z-50 shadow-sm md:ml-72">
        <div className="px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
          {/* Left Section */}
            <div className="flex items-center space-x-3">
              {/* Document Info */}
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-gray-900 truncate max-w-[200px] md:max-w-none">
                    {documentData?.title || 'Document Editor'}
                  </h1>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Step 2 of 2</span>
                    <span>•</span>
                    <span>{getAllFields().length} fields</span>
                  </div>
                </div>
              </div>
              
              {/* Progress Dots */}
              <div className="hidden sm:flex items-center space-x-1 ml-4">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-0.5 bg-blue-500"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* Zoom Controls */}
              <div className="hidden md:flex items-center bg-gray-50 rounded-md border border-gray-300 overflow-hidden">
                <button
                  onClick={handleZoomOut}
                  className="px-2 py-1.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border-r border-gray-300"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="w-4 h-4 text-gray-700" />
                </button>
                <div className="px-3 py-1.5 text-xs font-bold text-gray-800 bg-white min-w-[50px] text-center border-r border-gray-300">
                  {Math.round(zoom * 100)}%
                </div>
                <button
                  onClick={handleZoomIn}
                  className="px-2 py-1.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="w-4 h-4 text-gray-700" />
                </button>
              </div>
              
              {/* Reset Button */}
              <button
                onClick={() => setZoom(1)}
                className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors text-xs font-semibold text-gray-700"
              >
                <span>Reset</span>
              </button>
              
              <button
                onClick={handlePreview}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors text-xs font-semibold text-gray-700 shadow-sm"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              
              <button
                onClick={handleBackToConfiguration}
                disabled={isStepLoading}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors text-xs font-semibold text-gray-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStepLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Settings className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {isStepLoading ? 'Loading...' : 'Configure'}
                </span>
              </button>
              
              <button
                onClick={handleNextStep}
                disabled={isStepLoading}
                className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-xs font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">
                  {isStepLoading ? 'Loading...' : 'Share Document'}
                </span>
                <span className="sm:hidden">
                  {isStepLoading ? 'Loading...' : 'Share'}
                </span>
                {isStepLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden pt-16">
        {/* Compact Desktop Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:fixed z-30 w-72 md:w-72 bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out h-full md:h-[calc(100vh-112px)] overflow-y-auto
          top-28 left-0 pt-4 flex flex-col shadow-lg
        `}>
          
          {/* Field Palette - Top */}
          <div className="p-4 flex-1">
            {/* Back Button */}
            <button 
              onClick={handleBackToConfiguration}
              disabled={isStepLoading}
              className="w-full flex items-center space-x-2 p-2.5 mb-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isStepLoading ? (
                <Loader2 className="w-4 h-4 text-gray-600 animate-spin" />
              ) : (
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              )}
              <span className="text-sm font-medium text-gray-900">
                {currentStep === 1 ? 'Back to Dashboard' : 'Back to Configure'}
              </span>
            </button>

            {/* Mobile Close Button */}
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h3 className="text-lg font-semibold text-gray-900">Add Fields</h3>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            {/* Field List - Updated to match design */}
            <div className="space-y-2">
              {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
                const Icon = config.icon
                const isActive = selectedFieldType === type
                
                // Define light background colors that match the icons
                const getLightBgColor = (fieldType) => {
                  switch(fieldType) {
                    case FIELD_TYPES.SIGNATURE: return 'bg-blue-50'
                    case FIELD_TYPES.TEXT: return 'bg-orange-50'
                    case FIELD_TYPES.DATE: return 'bg-green-50'
                    case FIELD_TYPES.CHECKBOX: return 'bg-gray-50'
                    case FIELD_TYPES.STAMP: return 'bg-purple-50'
                    case FIELD_TYPES.NAME: return 'bg-emerald-50'
                    case FIELD_TYPES.EMAIL: return 'bg-amber-50'
                    case FIELD_TYPES.PHONE: return 'bg-cyan-50'
                    default: return 'bg-gray-50'
                  }
                }
                
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedFieldType(isActive ? null : type)
                      if (!isActive) {
                        toast.info(`Click on document to place ${config.label}`)
                      }
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false)
                      }
                    }}
                    className={`
                      w-full flex items-center space-x-2.5 p-2.5 rounded-lg transition-all duration-200 border
                      ${isActive 
                        ? `${getLightBgColor(type)} border-blue-200 shadow-sm` 
                        : `${getLightBgColor(type)} hover:shadow-sm border-gray-200`
                      }
                    `}
                  >
                    <div 
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        type === FIELD_TYPES.SIGNATURE ? 'bg-blue-500' :
                        type === FIELD_TYPES.TEXT ? 'bg-orange-500' :
                        type === FIELD_TYPES.DATE ? 'bg-green-500' :
                        type === FIELD_TYPES.CHECKBOX ? 'bg-gray-500' :
                        type === FIELD_TYPES.STAMP ? 'bg-purple-500' :
                        type === FIELD_TYPES.NAME ? 'bg-emerald-500' :
                        type === FIELD_TYPES.EMAIL ? 'bg-amber-500' :
                        type === FIELD_TYPES.PHONE ? 'bg-cyan-500' : 'bg-gray-500'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 flex-1 text-left">
                      {config.label}
                    </span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isActive ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                      <Plus className={`w-2.5 h-2.5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                  </button>
                )
              })}
            </div>
            
            {/* Quick Tip Section */}
            {/* <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-2">
                <div className="text-lg">💡</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Quick Tip</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Click a field type to add it to your document. Double-click any field to edit its content.
                  </p>
                </div>
              </div>
            </div> */}
          </div>

          {/* Document Manager - Bottom - Disabled in edit mode */}
          <DocumentManager
            documents={documents}
            allFields={allFields}
            onAddDocument={handleAddDocument}
            onRemoveDocument={handleRemoveDocument}
            toast={toast}
          />
          
          {/* Compact Zoom Controls - Very Bottom */}
          <div className="p-3 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-900 mb-2">Zoom</h4>
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-white rounded transition-colors disabled:opacity-50"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="w-3 h-3 text-gray-600" />
              </button>
              
              <div className="flex-1 text-center">
                <div className="text-sm font-bold text-gray-900">{Math.round(zoom * 100)}%</div>
              </div>
              
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-white rounded transition-colors disabled:opacity-50"
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content - Adjusted for right panel */}
        <div className="flex-1 overflow-hidden md:ml-72 bg-gray-100">
          {documents.length > 0 && (
            <div className="h-full p-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden flex">
                <div className="flex-1">
                <DocumentViewer
                  documents={documents}
                  zoom={zoom}
                  onZoomChange={setZoom}
                  onDocumentClick={handleDocumentClick}
                    signers={documentData?.signers || []} // Pass signers to DocumentViewer
                >
                  {getAllFields().map((field) => (
                    <FieldComponent
                      key={field.id}
                      field={field}
                      pageNumber={field.pageNumber}
                      documentIndex={field.documentIndex}
                      isSelected={selectedField === field.id}
                      isDragging={isDragging && draggedField?.id === field.id}
                      onSelect={handleFieldSelect}
                      onDragStart={handleDragStart}
                      onDelete={handleFieldDelete}
                      onValueChange={handleFieldValueChange}
                        signers={documentData?.signers || []} // Pass signers to FieldComponent
                    />
                  ))}
                </DocumentViewer>
              </div>

                {/* Right Panel for Field Configuration */}
                {selectedField && (
                  <>
                    {/* Desktop: fixed right panel */}
                    <div className="hidden md:block fixed top-40 right-0 h-[calc(100vh-112px)] w-50 min-w-[200px] bg-white border-l border-gray-200 shadow-lg overflow-y-auto z-40">
                      <FieldConfigurationPanel
                        field={getAllFields().find(f => f.id === selectedField)}
                        onUpdate={handleFieldConfigUpdate}
                        onClose={() => setSelectedField(null)}
                        signers={
                          documentId === 'local-new'
                            ? (() => {
                                try {
                                  const config = JSON.parse(sessionStorage.getItem('documentConfiguration') || '{}');
                                  return config.signers || [];
                                } catch { return []; }
                              })()
                            : documentData?.signers || []
                        }
                        panelClassName="w-96 min-w-[380px]"
                      />
                    </div>
                    {/* Mobile: bottom sheet/modal */}
                    <div className="fixed md:hidden inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slideUp">
                      <div className="flex justify-between items-center p-4 border-b border-gray-100">
                        <h3 className="text-base font-semibold text-gray-900">Field Settings</h3>
                        <button onClick={() => setSelectedField(null)} className="p-2 rounded-full hover:bg-gray-100">
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                      <FieldConfigurationPanel
                        field={getAllFields().find(f => f.id === selectedField)}
                        onUpdate={handleFieldConfigUpdate}
                        onClose={() => setSelectedField(null)}
                        signers={
                          documentId === 'local-new'
                            ? (() => {
                                try {
                                  const config = JSON.parse(sessionStorage.getItem('documentConfiguration') || '{}');
                                  return config.signers || [];
                                } catch { return []; }
                              })()
                            : documentData?.signers || []
                        }
                        panelClassName="w-full min-w-0 px-2"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: integrated bottom sheet for palette and field config */}
      {typeof window !== 'undefined' && window.innerWidth < 768 && (
        <div className="fixed md:hidden inset-x-0 bottom-0 z-40 bg-white border-t border-gray-200 rounded-t-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-slideUp">
          {selectedField ? (
            <>
              <div className="flex justify-between items-center p-4 border-b border-gray-100">
                <button onClick={() => setSelectedField(null)} className="p-2 rounded-full hover:bg-gray-100">
                  <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h3 className="text-base font-semibold text-gray-900 flex-1 text-center">Field Settings</h3>
                <button onClick={() => setSelectedField(null)} className="p-2 rounded-full hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <FieldConfigurationPanel
                field={getAllFields().find(f => f.id === selectedField)}
                onUpdate={handleFieldConfigUpdate}
                onClose={() => setSelectedField(null)}
                signers={
                  documentId === 'local-new'
                    ? (() => {
                        try {
                          const config = JSON.parse(sessionStorage.getItem('documentConfiguration') || '{}');
                          return config.signers || [];
                        } catch { return []; }
                      })()
                    : documentData?.signers || []
                }
                panelClassName="w-full min-w-0 px-2"
              />
            </>
          ) : (
            <></>
          )}
        </div>
      )}
      <BottomSheetFloatingButton
        onFieldTypeSelect={setSelectedFieldType}
        selectedFieldType={selectedFieldType}
        toast={toast}
      />
    </div>
  )
} 

