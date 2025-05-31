'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
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
function DocumentConfiguration({ documentFile, documents, allFields, fields, onBack, onSend, isLoading }) {
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
    const documentName = documents && documents.length > 1 
      ? `${documents.length} Documents` 
      : documentFile?.name || 'Document'
    
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
  }, [documentFile?.name, documents, signers.length])

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
          
          {documents && documents.length > 1 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Documents:</span>
                  <p className="font-medium">{documents.length} documents</p>
                </div>
                <div>
                  <span className="text-gray-500">Total Fields:</span>
                  <p className="font-medium">{fields.length} fields added</p>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <p className="font-medium">Ready to send</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Document List:</h3>
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">{doc.name}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {allFields[index]?.length || 0} fields
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
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
          )}
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

              {/* Reminders & Expiration */}
              <div>
                <h3 className="font-medium mb-3">Reminders & Expiration</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={sendReminders}
                      onChange={(e) => setSendReminders(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Send automatic reminders</span>
                  </label>
                  
                  {sendReminders && (
                    <div className="ml-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reminder frequency (days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={reminderFrequency}
                        onChange={(e) => setReminderFrequency(parseInt(e.target.value))}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={expirationEnabled}
                      onChange={(e) => setExpirationEnabled(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm">Set expiration date</span>
                  </label>
                  
                  {expirationEnabled && (
                    <div className="ml-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expires after (days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="365"
                        value={expirationDays}
                        onChange={(e) => setExpirationDays(parseInt(e.target.value))}
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
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
        const baseWidth = Math.min(page.originalWidth, availableWidth / zoom)
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
    <div className="fixed bottom-6 left-4 right-4 z-50 md:hidden">
      {/* Horizontal Field Options Bar */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-xl border p-3">
          <div className="flex items-center justify-between space-x-2 overflow-x-auto">
            {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
              const Icon = config.icon
              const isActive = selectedFieldType === type
              
              return (
                <button
                  key={type}
                  onClick={() => handleFieldSelect(type)}
                  className={`
                    flex-shrink-0 flex flex-col items-center justify-center p-3 rounded-xl transition-all min-w-[70px]
                    ${isActive 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }
                  `}
                >
                  <div 
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center mb-1
                      ${isActive ? 'bg-white/20' : 'bg-white'}
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
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

      {/* Toggle Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-14 h-14 rounded-full shadow-lg flex items-center justify-center
            transition-all duration-300 transform
            ${isOpen 
              ? 'bg-red-500 rotate-45' 
              : selectedFieldType 
                ? 'bg-blue-500' 
                : 'bg-gray-900'
            }
          `}
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

// Document Manager Component - Modified to show document overview instead of switching
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

  return (
    <div className="bg-white border-b p-3 md:p-4">
      <div className="flex items-center justify-between mb-2 md:mb-3">
        <h3 className="text-sm font-medium text-gray-700 flex items-center">
          <FolderOpen className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Documents ({documents.length})</span>
          <span className="md:hidden">{documents.length} Docs</span>
        </h3>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-1 px-2 md:px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
      
      <div className="space-y-1 md:space-y-2 max-h-24 md:max-h-32 overflow-y-auto">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-all"
            onClick={() => scrollToDocument(index)}
          >
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <File className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 truncate">{doc.name}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="hidden md:inline">{(doc.size / 1024 / 1024).toFixed(1)} MB</span>
                  <span className="hidden md:inline">•</span>
                  <span>{allFields[index]?.length || 0} fields</span>
                </div>
              </div>
            </div>
            {documents.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemoveDocument(index)
                }}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {documents.length > 1 && (
        <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            <span className="hidden md:inline">Scroll down to view all documents or click on a document above to jump to it</span>
            <span className="md:hidden">Tap document to jump to it</span>
          </p>
        </div>
      )}
    </div>
  )
}

// Main Editor Component
export default function NewDocumentEditor() {
  const router = useRouter()
  
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
  const [currentStep, setCurrentStep] = useState(1) // 1 = Editor, 2 = Configuration
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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

  // Load documents from sessionStorage - Modified to support multiple documents
  useEffect(() => {
    const loadDocuments = () => {
      try {
        // Check for multiple documents first
        const multipleDocsData = sessionStorage.getItem('pendingDocuments')
        if (multipleDocsData) {
          const docs = JSON.parse(multipleDocsData)
          setDocuments(docs)
          // Initialize fields for each document
          const fieldsData = {}
          docs.forEach((_, index) => {
            fieldsData[index] = []
          })
          setAllFields(fieldsData)
        } else {
          // Fallback to single document for backward compatibility
          const singleDocData = sessionStorage.getItem('pendingDocument')
          if (singleDocData) {
            const docData = JSON.parse(singleDocData)
            setDocuments([docData])
            setAllFields({ 0: [] })
          } else {
            toast.error('No documents found')
            router.push('/')
            return
          }
        }
      } catch (error) {
        console.error('Error loading documents:', error)
        toast.error('Error loading documents')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    loadDocuments()
  }, [router])

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
    if (documents.length === 0) {
      toast.error('Please upload at least one document first')
      return
    }
    setCurrentStep(2)
  }

  const handleBackToEditor = () => {
    setCurrentStep(1)
  }

  // Send handler (final step) - Updated for continuous view
  const handleSend = useCallback(async (config) => {
    if (documents.length === 0) {
      toast.error('Please upload at least one document first')
      return
    }

    try {
      setIsSubmitting(true)
      toast.loading('Sending documents...', { id: 'sending' })

      // Process each document
      const documentResults = []
      
      for (let i = 0; i < documents.length; i++) {
        const document = documents[i]
        const fields = allFields[i] || []
        
        // Create FormData for file upload
        const formData = new FormData()
        
        // Convert base64 data to blob and add as file
        if (document.data) {
          // Remove data URL prefix (e.g., "data:application/pdf;base64,")
          const base64Data = document.data.split(',')[1]
          const byteCharacters = atob(base64Data)
          const byteNumbers = new Array(byteCharacters.length)
          for (let j = 0; j < byteCharacters.length; j++) {
            byteNumbers[j] = byteCharacters.charCodeAt(j)
          }
          const byteArray = new Uint8Array(byteNumbers)
          const blob = new Blob([byteArray], { type: document.type })
          
          formData.append('document', blob, document.name)
        }
        
        // Add document metadata and configuration
        formData.append('title', document.name || `Untitled Document ${i + 1}`)
        formData.append('fields', JSON.stringify(fields))
        formData.append('mimeType', document.type)
        formData.append('signers', JSON.stringify(config.signers))
        formData.append('subject', `${config.subject} - Document ${i + 1}`)
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

        // Save to backend using the correct endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/documents/upload`, {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error(`Failed to send document ${i + 1}`)
        }

        const result = await response.json()
        documentResults.push(result)
      }
      
      toast.success(`${documents.length} document(s) sent successfully!`, { id: 'sending' })
      
      // Clear session storage
      sessionStorage.removeItem('pendingDocument')
      sessionStorage.removeItem('pendingDocuments')
      
      // Redirect to dashboard or first document
      if (documentResults.length === 1) {
        router.push(`/live/${documentResults[0].documentId}`)
      } else {
        router.push('/dashboard')
      }
      
    } catch (error) {
      console.error('Error sending documents:', error)
      toast.error('Failed to send documents', { id: 'sending' })
    } finally {
      setIsSubmitting(false)
    }
  }, [documents, allFields, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading documents...</p>
        </div>
      </div>
    )
  }

  // Step 2: Document Configuration
  if (currentStep === 2) {
    return (
      <DocumentConfiguration
        documentFile={documents[0]} // Pass first document for compatibility
        documents={documents}
        allFields={allFields}
        fields={getAllFields()} // All fields from all documents
        onBack={handleBackToEditor}
        onSend={handleSend}
        isLoading={isSubmitting}
      />
    )
  }

  // Step 1: Document Editor - Modified for continuous view
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => router.push('/')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                {documents.length === 1 ? documents[0]?.name : `${documents.length} Documents`}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">
                Step 1 of 2 - Add fields and configure layout • Scroll to view all documents
              </p>
              <p className="text-xs text-gray-500 sm:hidden">
                Step 1 of 2 • {getAllFields().length} fields
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Desktop Zoom Controls */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 hover:bg-white rounded transition-colors"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              
              <span className="text-sm font-medium px-2 py-1 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              
              <button
                onClick={handleZoomIn}
                className="p-1.5 hover:bg-white rounded transition-colors"
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={handlePreview}
              className="btn-secondary flex items-center space-x-2 text-sm px-3 py-2"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            
            <button
              onClick={handleNextStep}
              className="btn-primary flex items-center space-x-2 text-sm px-3 py-2"
            >
              <span className="hidden sm:inline">Next: Configure</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative z-30 w-80 md:w-80 bg-white border-r 
          transition-transform duration-300 ease-in-out h-full overflow-y-auto
        `}>
          {/* Document Manager - Modified for continuous view */}
          <DocumentManager
            documents={documents}
            allFields={allFields}
            onAddDocument={handleAddDocument}
            onRemoveDocument={handleRemoveDocument}
          />
          
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h3 className="text-lg font-semibold">Add Fields</h3>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Field Types - Compact for mobile */}
            <div className="space-y-2 md:space-y-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3 hidden md:block">Add Fields</h3>
              
              {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
                const Icon = config.icon
                const isActive = selectedFieldType === type
                
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedFieldType(isActive ? null : type)
                      if (!isActive) {
                        toast.info(`Tap on document to place ${config.label}`)
                      }
                      // Auto-close sidebar on mobile after selection
                      if (window.innerWidth < 768) {
                        setSidebarOpen(false)
                      }
                    }}
                    className={`
                    w-full p-2 md:p-3 rounded-lg border-2 transition-all text-left
                      ${isActive 
                      ? 'border-blue-500 bg-blue-50 shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                    <div 
                      className={`
                        w-8 h-8 rounded-lg flex items-center justify-center
                        ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}
                      `}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 text-sm md:text-base">{config.label}</div>
                      <div className="text-xs text-gray-500 hidden md:block">
                        {isActive ? 'Tap to place' : 'Tap to select'}
                      </div>
                    </div>
                  </div>
                </button>
                )
              })}
            </div>
            
            {/* Mobile Zoom Controls */}
            <div className="mt-6 pt-4 border-t md:hidden">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Zoom</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                
                <span className="text-sm font-medium px-3 py-1 bg-gray-100 rounded flex-1 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                
                <button
                  onClick={handleZoomIn}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  disabled={zoom >= 3}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
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

        {/* Main Content - Modified to show all documents */}
        <div className="flex-1 overflow-hidden">
          {documents.length > 0 && (
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
          )}
        </div>
      </div>
      
      {/* Mobile Floating Action Button */}
      <MobileFloatingButton 
        onFieldTypeSelect={setSelectedFieldType}
        selectedFieldType={selectedFieldType}
      />
    </div>
  )
} 
