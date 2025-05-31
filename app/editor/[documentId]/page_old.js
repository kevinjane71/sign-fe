'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Menu, 
  X, 
  Type, 
  CheckSquare, 
  Calendar,
  PenTool, 
  ZoomIn,
  ZoomOut,
  Eye, 
  Save,
  Send, 
  ArrowRight,
  Loader2,
  Plus,
  Trash2,
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
  Image,
  Download
} from 'lucide-react'
import toast from 'react-hot-toast'
import { DocumentConfigurationStep } from '../../components/SharedEditorComponents'

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
  [FIELD_TYPES.TEXT]: {
    icon: Type,
    label: 'Text Field',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#3b82f6',
    minWidth: 80,
    minHeight: 28,
    defaultWidth: 140,
    defaultHeight: 32,
    category: 'input'
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
  [FIELD_TYPES.SIGNATURE]: {
    icon: PenTool,
    label: 'Signature',
    color: '#8b5cf6',
    bgColor: '#faf5ff',
    borderColor: '#8b5cf6',
    minWidth: 100,
    minHeight: 40,
    defaultWidth: 160,
    defaultHeight: 50,
    category: 'signature'
  },
  [FIELD_TYPES.STAMP]: {
    icon: Shield,
    label: 'Stamp/Seal',
    color: '#dc2626',
    bgColor: '#fef2f2',
    borderColor: '#dc2626',
    minWidth: 60,
    minHeight: 60,
    defaultWidth: 80,
    defaultHeight: 80,
    category: 'signature'
  },
  [FIELD_TYPES.CHECKBOX]: {
    icon: CheckSquare,
    label: 'Checkbox',
    color: '#7c3aed',
    bgColor: '#f5f3ff',
    borderColor: '#7c3aed',
    minWidth: 20,
    minHeight: 20,
    defaultWidth: 24,
    defaultHeight: 24,
    category: 'selection'
  },
  [FIELD_TYPES.DATE]: {
    icon: Calendar,
    label: 'Date Field',
    color: '#ea580c',
    bgColor: '#fff7ed',
    borderColor: '#ea580c',
    minWidth: 90,
    minHeight: 28,
    defaultWidth: 120,
    defaultHeight: 32,
    category: 'input'
  }
}

// Multi-Document Viewer Component
const MultiDocumentViewer = ({ documentFiles, zoom, onZoomChange, fields, selectedField, onFieldSelect, onFieldUpdate, onFieldDelete, onDocumentClick, documentId }) => {
  const [loadedDocuments, setLoadedDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)

  // Load all documents
  const loadDocuments = useCallback(async () => {
    if (!documentFiles || documentFiles.length === 0) return

    setLoading(true)
    setError(null)

    try {
      const loadedDocs = []
      
      for (let i = 0; i < documentFiles.length; i++) {
        const file = documentFiles[i]
        const pages = await loadSingleDocument(file, i)
        loadedDocs.push({
          ...file,
          pages: pages,
          documentIndex: i
        })
      }
      
      setLoadedDocuments(loadedDocs)
    } catch (err) {
      console.error('Error loading documents:', err)
      setError('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }, [documentFiles])

  // Load a single document
  const loadSingleDocument = async (file, documentIndex) => {
    try {
      if (file.mimeType === 'application/pdf') {
        return await loadPdfDocument(file, documentIndex)
      } else if (file.mimeType.startsWith('image/')) {
        return await loadImageDocument(file, documentIndex)
      } else {
        throw new Error('Unsupported file type')
      }
    } catch (error) {
      console.error(`Error loading document ${file.originalName}:`, error)
      return []
    }
  }

  // Load PDF using PDF.js
  const loadPdfDocument = async (file, documentIndex) => {
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
    
    const pdfSource = `http://localhost:5002/api/documents/${documentId}/file/${file.fileId}`
    const pdf = await pdfjsLib.getDocument(pdfSource).promise
    const pagePromises = []
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      pagePromises.push(renderPdfPage(pdf, pageNum, documentIndex))
    }
    
    return await Promise.all(pagePromises)
  }

  // Render PDF page to canvas
  const renderPdfPage = async (pdf, pageNum, documentIndex) => {
    const page = await pdf.getPage(pageNum)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
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
      documentIndex: documentIndex,
      canvas,
      width: viewport.width,
      height: viewport.height,
      originalWidth: viewport.width / scale,
      originalHeight: viewport.height / scale
    }
  }

  // Load image document
  const loadImageDocument = async (file, documentIndex) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        const scale = 2.0
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        
        const pageData = [{
          pageNumber: 1,
          documentIndex: documentIndex,
          canvas,
          width: canvas.width,
          height: canvas.height,
          originalWidth: img.width,
          originalHeight: img.height
        }]
        
        resolve(pageData)
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = `http://localhost:5002/api/documents/${documentId}/file/${file.fileId}`
    })
  }

  useEffect(() => {
    loadDocuments()
  }, [loadDocuments])

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
      className="w-full h-full overflow-auto bg-gradient-to-br from-gray-50 to-gray-100"
      onClick={onDocumentClick}
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="flex flex-col items-center py-4 md:py-8 space-y-8">
        {loadedDocuments.map((doc, docIndex) => (
          <div key={doc.fileId} className="w-full">
            {/* Document Header */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm inline-block">
                {doc.title || doc.originalName} ({doc.pages.length} pages)
              </h3>
            </div>
            
            {/* Document Pages */}
            <div className="space-y-8">
              {doc.pages.map((page) => {
                const isMobile = window.innerWidth < 768
                let availableWidth
                
                if (isMobile) {
                  availableWidth = window.innerWidth - 16
                } else {
                  availableWidth = window.innerWidth - 320 - 32
                }
                
                const maxWidth = Math.min(availableWidth * 0.9, 800)
                const aspectRatio = page.originalHeight / page.originalWidth
                const displayWidth = maxWidth * zoom
                const displayHeight = displayWidth * aspectRatio

                // Filter fields for this specific page and document
                const pageFields = fields.filter(field => 
                  field.fileId === doc.fileId && 
                  field.pageNumber === page.pageNumber &&
                  field.documentIndex === page.documentIndex
                )
                
                return (
                  <div 
                    key={`${doc.fileId}-${page.pageNumber}`}
                    className="relative bg-white rounded-lg shadow-lg mx-auto"
                    style={{ 
                      width: displayWidth,
                      height: displayHeight,
                      maxWidth: '95vw'
                    }}
                    data-page-number={page.pageNumber}
                    data-document-index={page.documentIndex}
                    data-file-id={doc.fileId}
                  >
                    <canvas
                      ref={(canvas) => {
                        if (canvas && page.canvas) {
                          const ctx = canvas.getContext('2d')
                          canvas.width = displayWidth
                          canvas.height = displayHeight
                          ctx.drawImage(page.canvas, 0, 0, displayWidth, displayHeight)
                        }
                      }}
                      className="w-full h-full rounded-lg"
                      style={{ 
                        width: displayWidth,
                        height: displayHeight
                      }}
                    />
                    
                    {/* Page number indicator */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                      Page {page.pageNumber}
                    </div>
                    
                    {/* Render fields for this specific page and document */}
                    {pageFields.map((field) => {
                      const config = FIELD_CONFIGS[field.type]
                      const isSelected = selectedField?.id === field.id
                      
                      return (
                        <div
                          key={field.id}
                          className={`absolute cursor-pointer border-2 transition-all duration-200 ${
                            isSelected 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-300 bg-white hover:border-gray-400'
                          }`}
                          style={{
                            left: field.x,
                            top: field.y,
                            width: field.width,
                            height: field.height,
                            backgroundColor: config.bgColor,
                            borderColor: isSelected ? '#3b82f6' : config.borderColor
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            onFieldSelect(field)
                          }}
                        >
                          <div className="flex items-center justify-center h-full text-xs font-medium" style={{ color: config.color }}>
                            {config.label}
                          </div>
                          
                          {/* Resize handles */}
                          {isSelected && (
                            <>
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white rounded-sm cursor-se-resize"></div>
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border border-white rounded-sm cursor-pointer"
                                   onClick={(e) => {
                                     e.stopPropagation()
                                     onFieldDelete(field.id)
                                   }}>
                                <X className="w-2 h-2 text-white" />
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 

// Main Editor Component
export default function DocumentEditor() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.documentId

  // State management
  const [currentStep, setCurrentStep] = useState(1)
  const [document, setDocument] = useState(null)
  const [documentFiles, setDocumentFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Editor state
  const [zoom, setZoom] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedFieldType, setSelectedFieldType] = useState(null)
  const [fields, setFields] = useState([])
  const [selectedField, setSelectedField] = useState(null)
  const [draggedField, setDraggedField] = useState(null)
  const [isPlacingField, setIsPlacingField] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  // Configuration state (for step 1)
  const [documentConfig, setDocumentConfig] = useState(null)

  // Load document data
  const loadDocument = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/documents/${documentId}`)
      
      if (!response.ok) {
        throw new Error('Failed to load document')
      }

      const result = await response.json()
      const docData = result.document

      setDocument(docData)
      setDocumentFiles(docData.files || [])
      
      // Load existing fields from all files
      const allFields = []
      if (docData.files) {
        docData.files.forEach((file, fileIndex) => {
          if (file.fields) {
            file.fields.forEach(field => {
              allFields.push({
                ...field,
                fileId: file.fileId,
                documentIndex: fileIndex
              })
            })
          }
        })
      }
      setFields(allFields)

      // Set up configuration for step 1
      setDocumentConfig({
        documents: docData.files.map(file => ({
          name: file.originalName,
          type: file.mimeType,
          size: file.size,
          data: null, // We don't need the data for editing
          preview: file.fileUrl
        })),
        signers: docData.signers || [],
        subject: docData.subject || '',
        message: docData.message || '',
        requireAuthentication: docData.configuration?.requireAuthentication || false,
        allowDelegation: docData.configuration?.allowDelegation || true,
        allowComments: docData.configuration?.allowComments || true,
        sendReminders: docData.configuration?.sendReminders || true,
        reminderFrequency: docData.configuration?.reminderFrequency || 'daily',
        expirationEnabled: docData.configuration?.expirationEnabled || false,
        expirationDays: docData.configuration?.expirationDays || 30,
        signingOrder: docData.configuration?.signingOrder || 'any',
        requireAllSigners: docData.configuration?.requireAllSigners || true,
        allowPrinting: docData.configuration?.allowPrinting || true,
        allowDownload: docData.configuration?.allowDownload || true
      })

      // If document has fields, go directly to step 2 (field editor)
      if (allFields.length > 0) {
        setCurrentStep(2)
      }

    } catch (err) {
      console.error('Error loading document:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [documentId])

  useEffect(() => {
    if (documentId) {
      loadDocument()
    }
  }, [documentId, loadDocument])

  // Field management functions
  const handleFieldClick = useCallback((fieldType) => {
    setSelectedFieldType(fieldType)
    setIsPlacingField(true)
    setSelectedField(null)
  }, [])

  const handleDocumentClick = useCallback((e) => {
    if (!isPlacingField || !selectedFieldType) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Get page and document info from the clicked element
    const pageElement = e.target.closest('[data-page-number]')
    if (!pageElement) return

    const pageNumber = parseInt(pageElement.dataset.pageNumber)
    const documentIndex = parseInt(pageElement.dataset.documentIndex)
    const fileId = pageElement.dataset.fileId

    const config = FIELD_CONFIGS[selectedFieldType]
    const newField = {
      id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: selectedFieldType,
      x: x,
      y: y,
      width: config.defaultWidth,
      height: config.defaultHeight,
      pageNumber: pageNumber,
      documentIndex: documentIndex,
      fileId: fileId,
      required: true,
      placeholder: `Enter ${config.label.toLowerCase()}`,
      assignedTo: 'signer1'
    }

    setFields(prev => [...prev, newField])
    setSelectedField(newField)
    setIsPlacingField(false)
    setSelectedFieldType(null)
  }, [isPlacingField, selectedFieldType])

  const handleFieldSelect = useCallback((field) => {
    setSelectedField(field)
  }, [])

  const handleFieldUpdate = useCallback((fieldId, updates) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ))
  }, [])

  const handleFieldDelete = useCallback((fieldId) => {
    setFields(prev => prev.filter(field => field.id !== fieldId))
    setSelectedField(null)
  }, [])

  // Save fields to backend
  const saveFields = useCallback(async () => {
    try {
      setIsSaving(true)

      // Group fields by file
      const fileFields = {}
      fields.forEach(field => {
        if (!fileFields[field.fileId]) {
          fileFields[field.fileId] = []
        }
        fileFields[field.fileId].push({
          ...field,
          // Remove fileId and documentIndex from the field data when saving
          fileId: undefined,
          documentIndex: undefined
        })
      })

      // Convert to array format expected by API
      const fileFieldsArray = Object.keys(fileFields).map(fileId => ({
        fileId: fileId,
        fields: fileFields[fileId]
      }))

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/documents/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileFields: fileFieldsArray
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save fields')
      }

      setLastSaved(new Date())
      toast.success('Fields saved successfully')
    } catch (error) {
      console.error('Error saving fields:', error)
      toast.error('Failed to save fields')
    } finally {
      setIsSaving(false)
    }
  }, [fields, documentId])

  // Send document
  const sendDocument = useCallback(async () => {
    try {
      setIsSending(true)

      // Group fields by file
      const fileFields = {}
      fields.forEach(field => {
        if (!fileFields[field.fileId]) {
          fileFields[field.fileId] = []
        }
        fileFields[field.fileId].push({
          ...field,
          fileId: undefined,
          documentIndex: undefined
        })
      })

      const fileFieldsArray = Object.keys(fileFields).map(fileId => ({
        fileId: fileId,
        fields: fileFields[fileId]
      }))

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/documents/${documentId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileFields: fileFieldsArray,
          signers: documentConfig?.signers || [],
          subject: documentConfig?.subject || '',
          message: documentConfig?.message || '',
          configuration: {
            requireAuthentication: documentConfig?.requireAuthentication || false,
            allowDelegation: documentConfig?.allowDelegation || true,
            allowComments: documentConfig?.allowComments || true,
            sendReminders: documentConfig?.sendReminders || true,
            reminderFrequency: documentConfig?.reminderFrequency || 'daily',
            expirationEnabled: documentConfig?.expirationEnabled || false,
            expirationDays: documentConfig?.expirationDays || 30,
            signingOrder: documentConfig?.signingOrder || 'any',
            requireAllSigners: documentConfig?.requireAllSigners || true,
            allowPrinting: documentConfig?.allowPrinting || true,
            allowDownload: documentConfig?.allowDownload || true
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send document')
      }

      toast.success('Document sent successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error sending document:', error)
      toast.error('Failed to send document')
    } finally {
      setIsSending(false)
    }
  }, [fields, documentConfig, documentId, router])

  // Auto-save fields
  useEffect(() => {
    if (fields.length > 0 && currentStep === 2) {
      const timeoutId = setTimeout(() => {
        saveFields()
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [fields, currentStep, saveFields])

  // Handle step navigation
  const handleStepChange = (step) => {
    setCurrentStep(step)
  }

  const handleConfigurationComplete = (config) => {
    setDocumentConfig(config)
    setCurrentStep(2)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Document</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            {sidebarOpen && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-semibold">Document Editor</h1>
              </div>
            )}
          </div>
        </div>

        {sidebarOpen && (
          <>
            {/* Step Navigation */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentStep(1)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  1. Configure
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    currentStep === 2
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  2. Fields
                </button>
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto">
              {currentStep === 1 && documentConfig && (
                <DocumentConfigurationStep
                  config={documentConfig}
                  onComplete={handleConfigurationComplete}
                  isEditing={true}
                />
              )}

              {currentStep === 2 && (
                <div className="p-4 space-y-6">
                  {/* Field Types */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Field Types</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
                        const Icon = config.icon
                        return (
                          <button
                            key={type}
                            onClick={() => handleFieldClick(type)}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                              selectedFieldType === type
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <Icon 
                              className="w-5 h-5 mx-auto mb-1" 
                              style={{ color: config.color }}
                            />
                            <div className="text-xs font-medium text-gray-700">
                              {config.label}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Field Properties */}
                  {selectedField && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Field Properties</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Field Type
                          </label>
                          <div className="text-sm text-gray-600">
                            {FIELD_CONFIGS[selectedField.type]?.label}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Placeholder
                          </label>
                          <input
                            type="text"
                            value={selectedField.placeholder || ''}
                            onChange={(e) => handleFieldUpdate(selectedField.id, { placeholder: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Assigned To
                          </label>
                          <select
                            value={selectedField.assignedTo || 'signer1'}
                            onChange={(e) => handleFieldUpdate(selectedField.id, { assignedTo: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          >
                            {documentConfig?.signers?.map((signer, index) => (
                              <option key={index} value={`signer${index + 1}`}>
                                {signer.name} ({signer.email})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="required"
                            checked={selectedField.required || false}
                            onChange={(e) => handleFieldUpdate(selectedField.id, { required: e.target.checked })}
                            className="mr-2"
                          />
                          <label htmlFor="required" className="text-xs font-medium text-gray-700">
                            Required field
                          </label>
                        </div>

                        <button
                          onClick={() => handleFieldDelete(selectedField.id)}
                          className="w-full px-3 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
                        >
                          Delete Field
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Document Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Documents</h3>
                    <div className="space-y-2">
                      {documentFiles.map((file, index) => (
                        <div key={file.fileId} className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-900">
                            {file.title || file.originalName}
                          </div>
                          <div className="text-xs text-gray-600">
                            {file.mimeType} • {Math.round(file.size / 1024)} KB
                          </div>
                          <div className="text-xs text-gray-600">
                            Fields: {fields.filter(f => f.fileId === file.fileId).length}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              {currentStep === 2 && (
                <>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Fields: {fields.length}</span>
                    {lastSaved && (
                      <span>Saved: {lastSaved.toLocaleTimeString()}</span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={saveFields}
                      disabled={isSaving}
                      className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save'}
                    </button>
                    
                    <button
                      onClick={sendDocument}
                      disabled={isSending || fields.length === 0}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSending ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Send'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {document?.title || 'Document Editor'}
              </h2>
              {isPlacingField && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  Click to place {FIELD_CONFIGS[selectedFieldType]?.label}
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Document Viewer */}
        <div className="flex-1 overflow-hidden">
          <MultiDocumentViewer
            documentFiles={documentFiles}
            zoom={zoom}
            onZoomChange={setZoom}
            fields={fields}
            selectedField={selectedField}
            onFieldSelect={handleFieldSelect}
            onFieldUpdate={handleFieldUpdate}
            onFieldDelete={handleFieldDelete}
            onDocumentClick={handleDocumentClick}
            documentId={documentId}
          />
        </div>
      </main>
    </div>
  )
} 