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
  Info
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
function DocumentConfiguration({ documentFile, fields, onBack, onSend, isLoading }) {
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
    setSubject(`Please sign: ${documentFile?.name || 'Document'}`)
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
  }, [documentFile?.name, signers.length])

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

// Document Viewer Component
const DocumentViewer = ({ documentFile, zoom, onZoomChange, children, onDocumentClick }) => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [originalPages, setOriginalPages] = useState([]) // Store original high-quality renders
  const containerRef = useRef(null)

  // Load document based on type - render at high quality once
  const loadDocument = useCallback(async () => {
    if (!documentFile) return

    setLoading(true)
    setError(null)

    try {
      if (documentFile.type === 'application/pdf') {
        await loadPdfDocument()
      } else if (documentFile.type.startsWith('image/')) {
        await loadImageDocument()
          } else {
        setError('Unsupported file type')
      }
    } catch (err) {
      console.error('Error loading document:', err)
      setError('Failed to load document')
      } finally {
        setLoading(false)
      }
  }, [documentFile])

  // Load PDF using PDF.js - render at high quality
  const loadPdfDocument = async () => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      const pdf = await pdfjsLib.getDocument(documentFile.data || documentFile.url).promise
      const pagePromises = []
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pagePromises.push(renderPdfPage(pdf, pageNum))
      }
      
      const renderedPages = await Promise.all(pagePromises)
      setOriginalPages(renderedPages)
      setPages(renderedPages)
    } catch (error) {
      throw new Error('Failed to load PDF')
    }
  }

  // Render PDF page to canvas at high quality
  const renderPdfPage = async (pdf, pageNum) => {
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
      canvas,
          width: viewport.width,
      height: viewport.height,
      originalWidth: viewport.width / scale, // Store original dimensions
      originalHeight: viewport.height / scale
    }
  }

  // Load image document at high quality
  const loadImageDocument = async () => {
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
        
        const pageData = [{
          pageNumber: 1,
          canvas,
          width: canvas.width,
          height: canvas.height,
          originalWidth: img.width,
          originalHeight: img.height
        }]
        
        setOriginalPages(pageData)
        setPages(pageData)
        resolve()
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = documentFile.data || documentFile.url
    })
  }

  useEffect(() => {
    loadDocument()
  }, [loadDocument])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading document...</p>
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
      {pages.map((page) => {
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
          <div
            key={page.pageNumber}
            data-page-number={page.pageNumber}
            className="relative bg-white shadow-lg mx-auto my-4"
            style={{
              width: displayWidth,
              height: displayHeight,
              maxWidth: 'none' // Allow full width usage
            }}
          >
            {/* Document Canvas */}
            <canvas
              width={page.width}
              height={page.height}
              className="w-full h-full block"
              style={{
                width: '100%',
                height: '100%',
                imageRendering: 'crisp-edges' // Maintain sharpness
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
                if (React.isValidElement(child) && child.props.pageNumber === page.pageNumber) {
                  return React.cloneElement(child, { 
                    containerWidth: displayWidth,
                    containerHeight: displayHeight
                  })
                }
                return null
              })}
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

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      {/* Field Type Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-xl border p-2 space-y-2 min-w-[200px]">
          {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
            const Icon = config.icon
            const isActive = selectedFieldType === type
            
            return (
            <button
                key={type}
                onClick={() => {
                  onFieldTypeSelect(isActive ? null : type)
                  setIsOpen(false)
                  if (!isActive) {
                    toast.info(`Tap on document to place ${config.label}`)
                  }
                }}
                className={`
                  w-full p-3 rounded-xl transition-all text-left flex items-center space-x-3
                  ${isActive 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <div 
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${isActive ? 'bg-white/20' : 'bg-gray-100'}
                  `}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
            </div>
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-900'}`}>
                  {config.label}
                </span>
              </button>
            )
          })}
          </div>
        )}

      {/* Main FAB */}
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
    )
}

// Main Editor Component
export default function NewDocumentEditor() {
  const router = useRouter()
  
  // State
  const [documentFile, setDocumentFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fields, setFields] = useState([])
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

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load document from sessionStorage
  useEffect(() => {
    const loadDocument = () => {
      try {
        const pendingDoc = sessionStorage.getItem('pendingDocument')
        if (pendingDoc) {
          const docData = JSON.parse(pendingDoc)
          setDocumentFile(docData)
        } else {
          toast.error('No document found')
          router.push('/')
        }
      } catch (error) {
        console.error('Error loading document:', error)
        toast.error('Error loading document')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    loadDocument()
  }, [router])

  // Add field to document
  const addField = useCallback((type, position, pageNumber) => {
    const config = FIELD_CONFIGS[type]
    const fieldId = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Get actual container dimensions
    const pageElement = document.querySelector(`[data-page-number="${pageNumber || 1}"]`)
    if (!pageElement) return
    
    const containerWidth = pageElement.offsetWidth
    const containerHeight = pageElement.offsetHeight
    const isMobile = window.innerWidth < 768
    
    // Calculate responsive field dimensions based on container and screen size
    let width = config.defaultWidth
    let height = config.defaultHeight
    
    // Scale factor based on document size and screen
    const documentScale = Math.min(containerWidth / 800, containerHeight / 1000) // Assume standard doc is 800x1000
    const responsiveScale = isMobile ? 0.7 : 1.0 // Smaller on mobile
    const zoomScale = 1 / zoom // Compensate for zoom level
    
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
      value: '',
      required: false
    }

    setFields(prev => [...prev, newField])
    setSelectedField(fieldId)
    setSelectedFieldType(null)
    
    toast.success(`${config.label} added`)
  }, [zoom])

  // Handle document click to add field
  const handleDocumentClick = useCallback((e) => {
    if (!selectedFieldType || isDragging) return
    
    const pageElement = e.target.closest('[data-page-number]')
    if (!pageElement) return
    
    const pageNumber = parseInt(pageElement.getAttribute('data-page-number'))
    const rect = pageElement.getBoundingClientRect()
    
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    addField(selectedFieldType, { x, y }, pageNumber)
  }, [selectedFieldType, isDragging, addField])

  // Drag handlers
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
    const pageElement = document.elementFromPoint(clientX, clientY)?.closest('[data-page-number]')
    if (!pageElement) return
    
    const pageRect = pageElement.getBoundingClientRect()
    const newX = clientX - pageRect.left - dragOffset.x
    const newY = clientY - pageRect.top - dragOffset.y
    
    // Convert to percentages
    const leftPercent = Math.max(0, Math.min(95, (newX / pageRect.width) * 100))
    const topPercent = Math.max(0, Math.min(95, (newY / pageRect.height) * 100))
    
    // Update field position
    setFields(prev => prev.map(field => 
      field.id === draggedField.id 
        ? { ...field, leftPercent, topPercent }
        : field
    ))
  }, [isDragging, draggedField, dragOffset])

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

  // Field operations
  const handleFieldSelect = useCallback((fieldId) => {
    setSelectedField(fieldId)
  }, [])

  const handleFieldDelete = useCallback((fieldId) => {
    setFields(prev => prev.filter(f => f.id !== fieldId))
    setSelectedField(null)
    toast.success('Field deleted')
  }, [])

  const handleFieldValueChange = useCallback((fieldId, value) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, value } : field
    ))
  }, [])

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.25))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.25))
  }

  // Preview handler
  const handlePreview = () => {
    if (!documentFile) {
      toast.error('Please upload a document first')
      return
    }

    if (fields.length === 0) {
      toast.error('Please add at least one field to preview')
      return
    }

    // Store preview data in sessionStorage
    const previewData = {
      title: documentFile.name,
      document: {
        name: documentFile.name,
        type: documentFile.type,
        size: documentFile.size,
        data: documentFile.data, // Include the actual file data
        url: documentFile.url
      },
      fields: fields
    }

    sessionStorage.setItem('previewDocument', JSON.stringify(previewData))
    
    // Open preview in new tab
    window.open('/live/preview', '_blank')
  }

  // Step navigation
  const handleNextStep = () => {
    if (!documentFile) {
      toast.error('Please upload a document first')
      return
    }
    setCurrentStep(2)
  }

  const handleBackToEditor = () => {
    setCurrentStep(1)
  }

  // Send handler (final step)
  const handleSend = useCallback(async (config) => {
    if (!documentFile) {
      toast.error('Please upload a document first')
      return
    }

    try {
      setIsSubmitting(true)
      toast.loading('Sending document...', { id: 'sending' })

      // Create FormData for file upload
      const formData = new FormData()
      
      // Convert base64 data to blob and add as file
      if (documentFile.data) {
        // Remove data URL prefix (e.g., "data:application/pdf;base64,")
        const base64Data = documentFile.data.split(',')[1]
        const byteCharacters = atob(base64Data)
        const byteNumbers = new Array(byteCharacters.length)
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i)
        }
        const byteArray = new Uint8Array(byteNumbers)
        const blob = new Blob([byteArray], { type: documentFile.type })
        
        formData.append('document', blob, documentFile.name)
      }
      
      // Add document metadata and configuration
      formData.append('title', documentFile.name || 'Untitled Document')
      formData.append('fields', JSON.stringify(fields))
      formData.append('mimeType', documentFile.type)
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

      // Save to backend using the correct endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/documents/upload`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to send document')
      }

      const result = await response.json()
      
      toast.success('Document sent successfully!', { id: 'sending' })
      
      // Clear session storage
      sessionStorage.removeItem('pendingDocument')
      
      // Redirect to live view
      router.push(`/live/${result.documentId}`)
      
    } catch (error) {
      console.error('Error sending document:', error)
      toast.error('Failed to send document', { id: 'sending' })
    } finally {
      setIsSubmitting(false)
    }
  }, [documentFile, fields, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  // Step 2: Document Configuration
  if (currentStep === 2) {
    return (
      <DocumentConfiguration
        documentFile={documentFile}
        fields={fields}
        onBack={handleBackToEditor}
        onSend={handleSend}
        isLoading={isSubmitting}
      />
    )
  }

  // Step 1: Document Editor
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
            
            <div>
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {documentFile?.name || 'Document Editor'}
              </h1>
              <p className="text-sm text-gray-500">Step 1 of 2 - Add fields and configure layout</p>
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
              
            <span className="hidden sm:inline text-sm text-gray-500">
              {fields.length} fields
            </span>
            
              <button
              onClick={handlePreview}
              className="btn-secondary flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
              </button>
              
              <button
              onClick={handleNextStep}
              className="btn-primary flex items-center space-x-2"
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
          md:translate-x-0 fixed md:relative z-30 w-80 bg-white border-r 
          transition-transform duration-300 ease-in-out h-full overflow-y-auto
        `}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h3 className="text-lg font-semibold">Tools</h3>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
              <X className="w-5 h-5" />
            </button>
          </div>
          
            {/* Field Types */}
              <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add Fields</h3>
              
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
                    }}
                      className={`
                      w-full p-3 rounded-lg border-2 transition-all text-left
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
                      <div>
                        <div className="font-medium text-gray-900">{config.label}</div>
                        <div className="text-xs text-gray-500">
                          {isActive ? 'Tap to place' : 'Tap to select'}
                          </div>
                          </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              
            {/* Mobile Zoom Controls */}
            <div className="mt-8 pt-6 border-t md:hidden">
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

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {documentFile && (
            <DocumentViewer
              documentFile={documentFile}
              zoom={zoom}
              onZoomChange={setZoom}
              onDocumentClick={handleDocumentClick}
            >
              {fields.map((field) => (
                <FieldComponent
                  key={field.id}
                  field={field}
                  pageNumber={field.pageNumber}
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
