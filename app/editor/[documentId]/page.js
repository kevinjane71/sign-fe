'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
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
  Menu,
  ZoomIn,
  ZoomOut,
  Move,
  RotateCw
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

// Document Viewer Component
const DocumentViewer = ({ documentFile, zoom, onZoomChange, children, onDocumentClick, documentId }) => {
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
        await loadPdfDocument(documentFile.url)
      } else if (documentFile.type.startsWith('image/')) {
        await loadImageDocument(documentFile.url)
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

  // Load PDF document
  const loadPdfDocument = async (url) => {
    try {
      setLoading(true);
      
      // Use backend file serving endpoint directly
      const documentUrl = `http://localhost:5002/api/documents/${documentId}/file`;
      
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      const loadingTask = pdfjsLib.getDocument(documentUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      const viewport = page.getViewport({ scale: zoom })
      canvas.height = viewport.height
      canvas.width = viewport.width
      
      setOriginalPages([{
        pageNumber: 1,
        canvas,
        width: viewport.width,
        height: viewport.height,
        originalWidth: viewport.width,
        originalHeight: viewport.height
      }])
      setPages([{
        pageNumber: 1,
        canvas,
        width: viewport.width,
        height: viewport.height,
        originalWidth: viewport.width,
        originalHeight: viewport.height
      }])
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading PDF:', error);
      setLoading(false);
    }
  };

  // Load image document
  const loadImageDocument = async (url) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      setOriginalPages([{
        pageNumber: 1,
        canvas,
        width: img.width,
        height: img.height,
        originalWidth: img.width,
        originalHeight: img.height
      }])
      setPages([{
        pageNumber: 1,
        canvas,
        width: img.width,
        height: img.height,
        originalWidth: img.width,
        originalHeight: img.height
      }])
      
      context.drawImage(img, 0, 0);
      setLoading(false);
    };
    
    img.onerror = (error) => {
      console.error('Error loading image:', error);
      setLoading(false);
    };
    
    // Use backend file serving endpoint directly
    const documentUrl = `http://localhost:5002/api/documents/${documentId}/file`;
    
    img.src = documentUrl;
  };

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
              width: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.4, 20)}px`,
              height: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.4, 20)}px`,
              minWidth: '14px',
              minHeight: '14px',
              maxWidth: '20px',
              maxHeight: '20px'
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
export default function ExistingDocumentEditor() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.documentId
  
  // State
  const [documentFile, setDocumentFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fields, setFields] = useState([])
  const [selectedField, setSelectedField] = useState(null)
  const [selectedFieldType, setSelectedFieldType] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
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

  // Load existing document from backend
  useEffect(() => {
    const loadExistingDocument = async () => {
      if (!documentId) {
        toast.error('No document ID provided')
        router.push('/')
        return
      }

    try {
      setLoading(true)
        
        // Fetch document data from backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/documents/${documentId}`)
        
        if (!response.ok) {
          throw new Error('Failed to load document')
        }
        
        const result = await response.json()
        
        if (result.success && result.document) {
          const doc = result.document
          
          // Set document file data
          setDocumentFile({
            name: doc.title || doc.name || 'Document',
            type: doc.mimeType || 'application/pdf',
            size: doc.size || 0,
            data: doc.fileData || doc.data, // Base64 data
            url: doc.fileUrl || doc.url // Fallback URL
          })
          
          // Set existing fields (convert from backend format to frontend format)
          if (doc.fields && Array.isArray(doc.fields)) {
            const convertedFields = doc.fields.map(field => ({
              id: field.id || `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              type: field.type,
              leftPercent: field.leftPercent || field.x || 0,
              topPercent: field.topPercent || field.y || 0,
              widthPercent: field.widthPercent || field.width || 10,
              heightPercent: field.heightPercent || field.height || 5,
              pageNumber: field.pageNumber || 1,
              value: field.value || '',
              required: field.required || false
            }))
            setFields(convertedFields)
          }
          
          toast.success('Document loaded successfully')
      } else {
          throw new Error('Document not found')
      }
    } catch (error) {
        console.error('Error loading document:', error)
      toast.error('Failed to load document')
        router.push('/')
    } finally {
      setLoading(false)
    }
  }

    loadExistingDocument()
  }, [documentId, router])

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

  // Save handler (update existing document)
  const handleSave = useCallback(async () => {
    if (!documentFile || !documentId) {
      toast.error('No document to save')
      return
    }

    try {
      toast.loading('Saving document...', { id: 'saving' })

      // Update document fields via API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/documents/${documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: documentFile.name,
          fields: fields,
          mimeType: documentFile.type
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save document')
      }

      const result = await response.json()
      
      toast.success('Document saved successfully!', { id: 'saving' })
      
    } catch (error) {
      console.error('Error saving document:', error)
      toast.error('Failed to save document', { id: 'saving' })
    }
  }, [documentFile, documentId, fields])

  // Send handler (redirect to live view)
  const handleSend = useCallback(async () => {
    // First save the document
    await handleSave()
    
    // Then redirect to live view
    router.push(`/live/${documentId}`)
  }, [handleSave, documentId, router])

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
            
            <h1 className="text-lg font-semibold text-gray-900 truncate">
              {documentFile?.name || 'Document Editor'}
              </h1>
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
              onClick={handleSave}
              className="btn-secondary flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>
            
            <button 
              onClick={handleSend}
              className="btn-primary flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
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
              documentId={documentId}
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