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
  MoreHorizontal,
  Settings
} from 'lucide-react'
import toast from 'react-hot-toast'
import { DocumentConfiguration, FIELD_CONFIGS, FIELD_TYPES } from '../../components/DocumentEditor'

// Document Viewer Component - Restored original functionality
const DocumentViewer = ({ documentFile, zoom, onZoomChange, children, onDocumentClick, documentId }) => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [originalPages, setOriginalPages] = useState([]) // Store original high-quality renders
  const containerRef = useRef(null)

  // Load document based on type - render at high quality once (RESTORED ORIGINAL)
  const loadDocument = useCallback(async () => {
    if (!documentFile && !documentId) return

    setLoading(true)
    setError(null)

    try {
      if (documentFile?.type === 'application/pdf' || !documentFile?.type) {
        await loadPdfDocument()
      } else if (documentFile?.type.startsWith('image/')) {
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
  }, [documentFile, documentId])

  // Load PDF using PDF.js - render at high quality (RESTORED ORIGINAL)
  const loadPdfDocument = async () => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      // Use API endpoint to get document content when we have documentId
      let pdfSource
      if (documentId) {
        pdfSource = `http://localhost:5002/api/documents/${documentId}/file`
      } else {
        pdfSource = documentFile.data || documentFile.url
      }
      
      const pdf = await pdfjsLib.getDocument(pdfSource).promise
      const pagePromises = []
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pagePromises.push(renderPdfPage(pdf, pageNum))
      }
      
      const renderedPages = await Promise.all(pagePromises)
      setOriginalPages(renderedPages)
      setPages(renderedPages)
    } catch (error) {
      console.error('Error loading PDF:', error)
      throw error
    }
  }

  // Render PDF page to canvas at high quality (RESTORED ORIGINAL)
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

  // Load image document at high quality (RESTORED ORIGINAL)
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
      
      // Use API endpoint to get document content when we have documentId
      if (documentId) {
        img.src = `http://localhost:5002/api/documents/${documentId}/file`
      } else {
        img.src = documentFile.data || documentFile.url
      }
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
      className="w-full h-full overflow-auto bg-gradient-to-br from-gray-50 to-gray-100"
      onClick={onDocumentClick}
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="flex flex-col items-center py-4 md:py-8 space-y-4 md:space-y-8">
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
              className="relative bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
              style={{
                width: displayWidth,
                height: displayHeight,
                maxWidth: 'none' // Allow full width usage
              }}
            >
              {/* Document Canvas - RESTORED ORIGINAL */}
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
              
              {/* Page number indicator */}
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                Page {page.pageNumber}
              </div>
              
              {/* Field overlay container */}
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
    border: `2px solid ${isSelected ? config.color : '#e5e7eb'}`,
    borderRadius: '8px',
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex: isSelected ? 50 : 10,
    pointerEvents: 'auto',
    transition: isDragging ? 'none' : 'all 0.2s ease',
    transform: isDragging ? 'scale(1.05)' : isSelected ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isDragging 
      ? '0 8px 25px rgba(0,0,0,0.2)' 
      : isSelected 
        ? `0 4px 15px ${config.color}20` 
        : '0 2px 8px rgba(0,0,0,0.1)'
  }

  // Calculate responsive font size based on field size
  const fieldWidth = (containerWidth * field.widthPercent) / 100
  const fieldHeight = (containerHeight * field.heightPercent) / 100
  const baseFontSize = Math.max(10, Math.min(16, fieldHeight * 0.4))
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
            className="w-full h-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
            placeholder="Enter text..."
            style={{ 
              fontSize: `${fontSize}px`,
              padding: '4px 6px'
            }}
          />
        )}
        
        {field.type === FIELD_TYPES.CHECKBOX && (
          <input
            type="checkbox"
            checked={field.value || false}
            onChange={(e) => onValueChange(field.id, e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
              padding: '4px 6px'
            }}
          />
        )}
        
        {field.type === FIELD_TYPES.SIGNATURE && (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <PenTool className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Delete button for selected field */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(field.id)
          }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  )
}

// Mobile Bottom Navigation
const MobileBottomNav = ({ 
  onFieldTypeSelect, 
  selectedFieldType, 
  zoom, 
  onZoomIn, 
  onZoomOut, 
  onPreview, 
  onSave, 
  onNext,
  isSaving,
  fieldsCount 
}) => {
  const [activeTab, setActiveTab] = useState('fields')

  const fieldTypes = Object.entries(FIELD_CONFIGS)

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      {/* Tab Content */}
      <div className="px-4 py-3 max-h-48 overflow-y-auto">
        {activeTab === 'fields' && (
          <div className="grid grid-cols-2 gap-2">
            {fieldTypes.map(([type, config]) => {
              const Icon = config.icon
              const isActive = selectedFieldType === type
              
              return (
                <button
                  key={type}
                  onClick={() => {
                    onFieldTypeSelect(isActive ? null : type)
                    if (!isActive) {
                      toast.info(`Tap document to place ${config.label}`)
                    }
                  }}
                  className={`
                    p-3 rounded-xl transition-all flex items-center space-x-2 text-sm font-medium
                    ${isActive 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{config.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {activeTab === 'zoom' && (
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={onZoomOut}
              disabled={zoom <= 0.5}
              className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <div className="px-4 py-2 bg-blue-50 rounded-xl min-w-[80px] text-center">
              <span className="text-blue-600 font-semibold">{Math.round(zoom * 100)}%</span>
            </div>
            
            <button
              onClick={onZoomIn}
              disabled={zoom >= 3}
              className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onPreview}
              className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </button>
            
            <button
              onClick={onSave}
              disabled={isSaving}
              className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">Save</span>
            </button>
            
            <button
              onClick={onNext}
              className="col-span-2 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center justify-center space-x-2"
            >
              <span className="font-medium">Next: Configure</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex border-t border-gray-100">
        <button
          onClick={() => setActiveTab('fields')}
          className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
            activeTab === 'fields' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex flex-col items-center space-y-1">
            <Type className="w-4 h-4" />
            <span>Fields</span>
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('zoom')}
          className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
            activeTab === 'zoom' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex flex-col items-center space-y-1">
            <ZoomIn className="w-4 h-4" />
            <span>Zoom</span>
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('actions')}
          className={`flex-1 py-3 px-2 text-xs font-medium transition-colors ${
            activeTab === 'actions' 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex flex-col items-center space-y-1">
            <Settings className="w-4 h-4" />
            <span>Actions</span>
          </div>
        </button>
      </div>
    </div>
  )
}

// Main Editor Component
export default function ExistingDocumentEditor() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.documentId
  
  // State
  const [documentFile, setDocumentFile] = useState(null)
  const [documentData, setDocumentData] = useState(null)
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
  const [isSaving, setIsSaving] = useState(false)
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false)
  const [draggedField, setDraggedField] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load existing document data
  useEffect(() => {
    const loadDocumentData = async () => {
      try {
        setLoading(true)
        console.log('Loading document data for ID:', documentId)
        
        // Fetch document metadata
        const response = await fetch(`http://localhost:5002/api/documents/${documentId}`)
        console.log('API response status:', response.status)
        
        if (!response.ok) {
          throw new Error('Failed to load document')
        }
        
        const apiResponse = await response.json()
        console.log('API response data:', apiResponse)
        
        // Extract document data from the API response structure
        const data = apiResponse.success ? apiResponse.document : apiResponse
        setDocumentData(data)
        console.log('Document data set:', data)
        
        // Set document file info for viewer (just metadata for UI display)
        setDocumentFile({
          name: data.title || data.originalName,
          type: data.mimeType,
          size: data.size
        })
        
        // Load existing fields - ensure we have the correct structure
        if (data.fields && Array.isArray(data.fields)) {
          console.log('Loading existing fields:', data.fields)
          setFields(data.fields)
        } else {
          console.log('No fields found in document data')
          setFields([])
        }
        
      } catch (error) {
        console.error('Error loading document:', error)
        toast.error('Failed to load document')
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    if (documentId) {
      loadDocumentData()
    }
  }, [documentId, router])

  // Add field to document
  const addField = useCallback((type, position, pageNumber) => {
    const config = FIELD_CONFIGS[type]
    const fieldId = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const pageElement = document.querySelector(`[data-page-number="${pageNumber || 1}"]`)
    if (!pageElement) return
    
    const containerWidth = pageElement.offsetWidth
    const containerHeight = pageElement.offsetHeight
    const isMobile = window.innerWidth < 768
    
    let width = config.defaultWidth
    let height = config.defaultHeight
    
    const documentScale = Math.min(containerWidth / 800, containerHeight / 1000)
    const responsiveScale = isMobile ? 0.7 : 1.0
    const zoomScale = 1 / zoom
    
    const finalScale = documentScale * responsiveScale * zoomScale
    
    width = Math.max(config.minWidth, Math.min(width * finalScale, containerWidth * 0.4))
    height = Math.max(config.minHeight, Math.min(height * finalScale, containerHeight * 0.15))
    
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

    const pageElement = document.querySelector(`[data-page-number="${draggedField.pageNumber}"]`)
    if (!pageElement) return

    const rect = pageElement.getBoundingClientRect()
    const x = clientX - rect.left - dragOffset.x
    const y = clientY - rect.top - dragOffset.y

    const leftPercent = Math.max(0, Math.min(95, (x / pageElement.offsetWidth) * 100))
    const topPercent = Math.max(0, Math.min(95, (y / pageElement.offsetHeight) * 100))

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

  // Event listeners for drag
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e)
      const handleMouseUp = () => handleDragEnd()
      const handleTouchMove = (e) => handleDragMove(e)
      const handleTouchEnd = () => handleDragEnd()

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  // Field handlers
  const handleFieldSelect = useCallback((fieldId) => {
    setSelectedField(fieldId)
  }, [])

  const handleFieldDelete = useCallback((fieldId) => {
    setFields(prev => prev.filter(field => field.id !== fieldId))
    setSelectedField(null)
    toast.success('Field deleted')
  }, [])

  const handleFieldValueChange = useCallback((fieldId, value) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, value } : field
    ))
  }, [])

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.25, 3))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }, [])

  // Action handlers
  const handlePreview = useCallback(() => {
    window.open(`/preview/${documentId}`, '_blank')
  }, [documentId])

  const handleSave = useCallback(async () => {
    try {
      setIsSaving(true)
      
      const response = await fetch(`http://localhost:5002/api/documents/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: fields,
          lastModified: new Date().toISOString()
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save document')
      }

      toast.success('Document saved successfully')
    } catch (error) {
      console.error('Error saving document:', error)
      toast.error('Failed to save document')
    } finally {
      setIsSaving(false)
    }
  }, [documentId, fields])

  const handleNextStep = useCallback(() => {
    if (fields.length === 0) {
      toast.error('Please add at least one field before proceeding')
      return
    }
    setCurrentStep(2)
  }, [fields.length])

  const handleBackToEditor = useCallback(() => {
    setCurrentStep(1)
  }, [])

  const handleSend = useCallback(async (config) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch(`http://localhost:5002/api/documents/${documentId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: fields,
          signers: config.signers,
          subject: config.subject,
          message: config.message,
          configuration: {
            requireAllSigners: config.requireAllSigners,
            expirationDays: config.expirationDays,
            reminderDays: config.reminderDays
          }
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send document')
      }

      const result = await response.json()
      toast.success('Document sent successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Error sending document:', error)
      toast.error(error.message || 'Failed to send document')
    } finally {
      setIsSubmitting(false)
    }
  }, [documentId, fields, router])

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

  // Step 2: Document Configuration
  if (currentStep === 2) {
    return (
      <DocumentConfiguration
        documentFile={documentFile}
        fields={fields}
        onBack={handleBackToEditor}
        onSend={handleSend}
        isLoading={isSubmitting}
        initialConfig={{
          signers: documentData?.signers || [],
          subject: documentData?.subject || '',
          message: documentData?.message || '',
          ...documentData?.configuration
        }}
      />
    )
  }

  // Step 1: Document Editor
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Compact Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-3 md:px-6 py-2 md:py-3 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2 md:space-x-4 min-w-0 flex-1">
            <button 
              onClick={() => router.push('/dashboard')}
              className="p-2 md:p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 flex-shrink-0 group"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
            
            <div className="min-w-0 flex-1">
              <h1 className="text-sm md:text-xl font-bold text-gray-900 truncate bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {documentFile?.name || 'Document Editor'}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block font-medium">
                Step 1 of 2 - Design your document fields
              </p>
            </div>
          </div>
          
          {/* Right Section - Desktop Only */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-1.5 border border-gray-200">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              
              <div className="px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100">
                <span className="text-sm font-bold text-gray-700 min-w-[60px] text-center block">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                disabled={zoom >= 3}
              >
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            {/* Fields Counter */}
            <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <span className="text-sm font-bold text-blue-700">
                {fields.length} {fields.length === 1 ? 'Field' : 'Fields'}
              </span>
            </div>
            
            {/* Action Buttons */}
            <button
              onClick={handlePreview}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save</span>
            </button>
            
            <button
              onClick={handleNextStep}
              className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Configure & Send</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Sub Header - Mobile Only */}
      <div className="md:hidden bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100 px-3 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 font-medium">Step 1 of 2 - Design fields</span>
          <div className="px-3 py-1 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-bold">{fields.length} fields</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative z-30 w-80 bg-gradient-to-b from-slate-50 to-gray-100 border-r border-gray-200
          transition-transform duration-300 ease-in-out h-full overflow-y-auto
        `}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h3 className="text-xl font-bold text-gray-800">Design Tools</h3>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Field Types */}
            <div className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
                  <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></div>
                  Field Library
                </h3>
                <p className="text-sm text-gray-600">Drag and drop or click to add fields</p>
              </div>
              
              {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
                const Icon = config.icon
                const isActive = selectedFieldType === type
                
                // Define color schemes for each field type
                const colorSchemes = {
                  [FIELD_TYPES.TEXT]: 'from-blue-500 to-cyan-500',
                  [FIELD_TYPES.SIGNATURE]: 'from-purple-500 to-pink-500', 
                  [FIELD_TYPES.CHECKBOX]: 'from-green-500 to-emerald-500',
                  [FIELD_TYPES.DATE]: 'from-orange-500 to-red-500'
                }
                
                const gradientClass = colorSchemes[type] || 'from-gray-500 to-gray-600'
                
                return (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedFieldType(isActive ? null : type)
                      if (!isActive) {
                        toast.success(`${config.label} selected! Click on document to place it`, {
                          icon: '🎯',
                          style: {
                            borderRadius: '12px',
                            background: '#f8fafc',
                            color: '#1e293b',
                            border: '1px solid #e2e8f0'
                          }
                        })
                      }
                    }}
                    className={`
                      w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left group hover:shadow-xl transform hover:-translate-y-1
                      ${isActive 
                        ? 'border-transparent bg-white shadow-2xl scale-105' 
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className={`
                          w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
                          ${isActive 
                            ? `bg-gradient-to-br ${gradientClass} text-white shadow-2xl` 
                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                          }
                        `}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-lg ${isActive ? 'text-gray-900' : 'text-gray-800'}`}>
                          {config.label}
                        </div>
                        <div className={`text-sm mt-1 ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
                          {isActive ? 'Click document to place' : 'Click to select this field'}
                        </div>
                      </div>
                      {isActive && (
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Selected Field Info */}
            {selectedField && (
              <div className="mt-8 p-5 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3 animate-pulse"></div>
                  <h4 className="font-bold text-indigo-900">Selected Field</h4>
                </div>
                <div className="text-sm text-indigo-700 space-y-2">
                  <p className="font-medium">ID: <span className="font-mono bg-white px-2 py-1 rounded">{selectedField}</span></p>
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Drag to move</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Click X to delete</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{fields.length}</div>
                <div className="text-sm text-blue-600 font-medium">Total Fields</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="text-2xl font-bold text-green-700">{Math.round(zoom * 100)}%</div>
                <div className="text-sm text-green-600 font-medium">Zoom Level</div>
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
        <div className={`flex-1 overflow-hidden ${isMobile ? 'pb-48' : ''}`}>
          <DocumentViewer
            documentFile={documentFile}
            documentId={documentId}
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
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav
          onFieldTypeSelect={setSelectedFieldType}
          selectedFieldType={selectedFieldType}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onPreview={handlePreview}
          onSave={handleSave}
          onNext={handleNextStep}
          isSaving={isSaving}
          fieldsCount={fields.length}
        />
      )}
    </div>
  )
} 