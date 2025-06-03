'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
  File
} from 'lucide-react'
import toast from 'react-hot-toast'
import { getDocument, updateDocument, sendDocument, getDocumentFile } from '../../utils/api'
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
  PHONE: 'phone'
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
  }
}

// Document Configuration Component (Step 2)
function DocumentConfiguration({ documentFile, documents, allFields, fields, onBack, onNext, isLoading, documentData }) {
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

  // Initialize with default values
  useEffect(() => {
    const documentName = documentData?.title || documents?.[0]?.name || 'Document'
    
    setSubject(`Please sign: ${documentName}`)
    setMessage('Please review and sign this document at your earliest convenience.')
    
    // Add a default signer if none exist
    if (signers.length === 0) {
      setSigners([{
        id: Date.now(),
        name: '',
        email: '',
        role: 'Signer'
      }])
    }
  }, [documentData?.title, documents, signers.length])

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
      <header className="bg-white border-b border-gray-200 fixed top-20 left-0 right-0 z-30 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={onBack}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-gray-900">Configure Document</h1>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Step 1 of 2</span>
                    <span>•</span>
                    <span>{fields.length} fields</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-xs font-semibold shadow-sm disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              <span>Next: Add Fields</span>
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
            onAddDocument={() => toast.info('Cannot add documents in configuration step')}
            onRemoveDocument={() => toast.info('Cannot remove documents in configuration step')}
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
              <span>Next: Add Fields</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Document Viewer Component - Modified to show all documents in continuous scroll
const DocumentViewer = ({ documents, zoom, onZoomChange, children, onDocumentClick }) => {
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
                      containerHeight: displayHeight
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
  containerHeight 
}) => {
  const config = FIELD_CONFIGS[field.type]
  const Icon = config.icon
  const isMobile = window.innerWidth < 768
  
  // Calculate responsive position and size
  const fieldStyle = {
    position: 'absolute',
    left: `${field.leftPercent}%`,
    top: `${field.topPercent}%`,
    width: `${field.widthPercent}%`,
    height: `${field.heightPercent}%`,
    minWidth: `${config.minWidth}px`,
    minHeight: `${config.minHeight}px`,
    backgroundColor: config.bgColor,
    border: `1px solid ${isSelected ? config.color : '#e5e7eb'}`,
    borderRadius: '4px',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isSelected ? 50 : 10,
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
  const baseFontSize = Math.max(10, Math.min(14, fieldHeight * 0.4))
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
      <div className="w-full h-full flex items-center justify-center p-1">
        {field.type === FIELD_TYPES.TEXT && (
          <input
            type="text"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none text-gray-700"
            placeholder="Enter text..."
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px'
              }}
            />
        )}

        {field.type === FIELD_TYPES.NAME && (
          <input
            type="text"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none text-gray-700 font-medium"
            placeholder="Full Name"
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px'
            }}
          />
        )}

        {field.type === FIELD_TYPES.EMAIL && (
          <input
            type="email"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none text-gray-700"
            placeholder="email@example.com"
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px'
            }}
          />
        )}

        {field.type === FIELD_TYPES.PHONE && (
          <input
            type="tel"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none text-gray-700"
            placeholder="(555) 123-4567"
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px'
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
              minHeight: '16px'
            }}
          />
        )}
        
        {field.type === FIELD_TYPES.DATE && (
          <input
            type="date"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full h-full bg-transparent border-none outline-none text-gray-700"
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '2px 4px'
            }}
          />
        )}
        
        {field.type === FIELD_TYPES.SIGNATURE && (
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Icon 
              style={{ 
                width: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5)}px`,
                height: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5)}px`,
                minWidth: '12px',
                minHeight: '12px'
              }} 
            />
            <span style={{ fontSize: `${Math.max(8, fontSize * 0.7)}px` }}>
              Sign here
            </span>
          </div>
        )}

        {field.type === FIELD_TYPES.STAMP && (
          <div className="flex flex-col items-center justify-center text-gray-600">
            <Icon 
              style={{ 
                width: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.6)}px`,
                height: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.6)}px`,
                minWidth: '16px',
                minHeight: '16px'
              }} 
            />
            <span style={{ fontSize: `${Math.max(8, fontSize * 0.6)}px` }}>
              Stamp
            </span>
          </div>
        )}
      </div>

      {/* Field Toolbar */}
      {isSelected && (
        <div className="absolute -top-8 left-0 bg-gray-900 text-white px-2 py-1 rounded text-xs flex items-center space-x-1 z-60">
          <Icon className="w-3 h-3" />
          <span className="text-xs">{config.label}</span>
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
const MobileFloatingButton = ({ onFieldTypeSelect, selectedFieldType }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleFieldSelect = (type) => {
    const isActive = selectedFieldType === type
    onFieldTypeSelect(isActive ? null : type)
    if (!isActive) {
      toast.info(`Tap on document to place ${FIELD_CONFIGS[type].label}`)
    }
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      {/* Horizontal Field Options Bar */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-xl shadow-lg border p-2">
          <div className="flex items-center justify-between space-x-1.5 overflow-x-auto">
            {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
              const Icon = config.icon
              const isActive = selectedFieldType === type
              
              return (
                <button
                  key={type}
                  onClick={() => handleFieldSelect(type)}
                  className={`
                    flex-shrink-0 flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px]
                    ${isActive 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  <div 
                    className={`
                      w-6 h-6 rounded flex items-center justify-center mb-1
                      ${isActive ? 'bg-white/20' : 'bg-white'}
                    `}
                  >
                    <Icon className={`w-3 h-3 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <span className={`text-xs font-medium text-center leading-tight ${isActive ? 'text-white' : 'text-gray-700'}`}>
                    {config.label.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
          </div>
        )}

      {/* Compact Toggle Button */}
      <div className="flex justify-center">
            <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-12 h-12 rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300 transform
            ${isOpen 
              ? 'bg-red-500 rotate-45' 
              : selectedFieldType 
                ? 'bg-blue-500' 
                : 'bg-gray-900'
            }
          `}
        >
          <Plus className="w-5 h-5 text-white" />
            </button>
            </div>
    </div>
  )
}

// Document Manager Component - Compact chip-style design
function DocumentManager({ documents, allFields, onAddDocument, onRemoveDocument }) {
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
function DocumentPreviewGrid({ documents, allFields, onAddDocument, onRemoveDocument }) {
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

// Main Editor Component
export default function EditDocumentEditor() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.documentId
  
  // State - Modified to support multiple documents in continuous view
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [allFields, setAllFields] = useState({}) // Fields organized by document index
  const [selectedField, setSelectedField] = useState(null)
  const [selectedFieldType, setSelectedFieldType] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // 2-Step Process State
  const [currentStep, setCurrentStep] = useState(2) // 1 = Configuration, 2 = Editor (start at editor for existing docs)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Document data for pre-filling configuration
  const [documentData, setDocumentData] = useState(null)
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [draggedField, setDraggedField] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })

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

  // Load documents from API - Modified to load existing document
  useEffect(() => {
    const loadDocumentFromAPI = async () => {
      if (!documentId) {
        toast.error('No document ID provided')
        router.push('/')
        return
      }

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
        
        toast.success(`Loaded ${loadedDocuments.length} document(s)`)
        
      } catch (error) {
        console.error('Error loading document:', error)
        toast.error('Failed to load document')
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadDocumentFromAPI()
  }, [documentId, router])

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

  // Step navigation
  const handleNextStep = () => {
    // Get the configuration from step 1 (stored in sessionStorage)
    const storedConfig = sessionStorage.getItem('documentConfiguration')
    if (!storedConfig) {
      toast.error('Configuration missing. Please go back to step 1.')
      setCurrentStep(1)
      return
    }
    
    // Parse config and call the API to update and send document
    const config = JSON.parse(storedConfig)
    handleSend(config)
  }

  const handleBackToConfiguration = () => {
    setCurrentStep(1)
  }

  // Send handler (final step) - Modified for updating existing document
  const handleSend = useCallback(async (config) => {
    if (documents.length === 0) {
      toast.error('Please load documents first')
      return
    }

    try {
      setIsSubmitting(true)

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
      
      // Redirect to dashboard
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error updating document:', error)
      toast.error('Failed to share document. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [documents, allFields, documentId, router])

  if (loading) {
    return <LoadingSpinner message="Loading document..." />
  }

  // Show loading overlay when submitting
  if (isSubmitting) {
    return <LoadingSpinner type="submit" />
  }

  // Step 1: Document Configuration
  if (currentStep === 1) {
    return (
      <DocumentConfiguration
        documentFile={documents[0]} // Pass first document for compatibility
        documents={documents}
        allFields={allFields}
        fields={getAllFields()} // All fields from all documents
        onBack={handleBackToConfiguration}
        onNext={() => setCurrentStep(2)}
        isLoading={isSubmitting}
        documentData={documentData}
      />
    )
  }

  // Step 2: Document Editor - Modified for continuous view
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Compact Professional Header */}
      <header className="bg-white border-b border-gray-200 fixed top-20 left-0 right-0 z-30 shadow-sm md:ml-72">
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
                onClick={() => setCurrentStep(1)}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 rounded-md transition-colors text-xs font-semibold text-gray-700 shadow-sm"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Configure</span>
              </button>
              
              <button
                onClick={handleNextStep}
                className="flex items-center space-x-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-xs font-semibold shadow-sm"
              >
                <span className="hidden sm:inline">Share Document</span>
                <span className="sm:hidden">Share</span>
                <Send className="w-4 h-4" />
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
              onClick={() => router.push('/dashboard')}
              className="w-full flex items-center space-x-2 p-2.5 mb-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Back to Dashboard</span>
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
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-2">
                <div className="text-lg">💡</div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Quick Tip</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Click a field type to add it to your document. Double-click any field to edit its content.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Document Manager - Bottom - Disabled in edit mode */}
          {/* 
          <DocumentManager
            documents={documents}
            allFields={allFields}
            onAddDocument={handleAddDocument}
            onRemoveDocument={handleRemoveDocument}
          />
          */}
          
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

        {/* Main Content - Adjusted for compact sidebar */}
        <div className="flex-1 overflow-hidden md:ml-72 bg-gray-100">
          {documents.length > 0 && (
            <div className="h-full p-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full overflow-hidden">
                <DocumentViewer
                  documents={documents}
                  zoom={zoom}
                  onZoomChange={setZoom}
                  onDocumentClick={handleDocumentClick}
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
                    />
                  ))}
                </DocumentViewer>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compact Mobile Floating Button */}
      <MobileFloatingButton 
          onFieldTypeSelect={setSelectedFieldType}
          selectedFieldType={selectedFieldType}
      />
    </div>
  )
} 

