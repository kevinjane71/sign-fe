'use client'

import React ,{ useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Draggable from 'react-draggable'
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
  Upload,
  Menu,
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  User,
  Mail,
  Users
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import DocumentViewer from '../../components/DocumentViewer'
import SignerModal from '../../components/SignerModal'
import SignatureModal from '../../components/SignatureModal'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

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
    color: 'blue',
    bgColor: '#f8fafc',
    borderColor: '#3b82f6',
    defaultSize: { width: 180, height: 40 }
  },
  [FIELD_TYPES.SIGNATURE]: {
    icon: PenTool,
    label: 'Signature',
    color: 'green',
    bgColor: '#f0fdf4',
    borderColor: '#10b981',
    defaultSize: { width: 220, height: 80 }
  },
  [FIELD_TYPES.CHECKBOX]: {
    icon: CheckSquare,
    label: 'Checkbox',
    color: 'purple',
    bgColor: '#faf5ff',
    borderColor: '#8b5cf6',
    defaultSize: { width: 24, height: 24 }
  },
  [FIELD_TYPES.DATE]: {
    icon: Calendar,
    label: 'Date',
    color: 'orange',
    bgColor: '#fffbeb',
    borderColor: '#f59e0b',
    defaultSize: { width: 160, height: 40 }
  }
}

export default function NewDocumentEditor() {
  const router = useRouter()
  
  const [documentFile, setDocumentFile] = useState(null)
  const [documentPages, setDocumentPages] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [fields, setFields] = useState([])
  const [selectedField, setSelectedField] = useState(null)
  const [draggedFieldType, setDraggedFieldType] = useState(null)
  const [showSignerModal, setShowSignerModal] = useState(false)
  const [signers, setSigners] = useState([])
  const [newSigner, setNewSigner] = useState({ name: '', email: '' })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pageOffsets, setPageOffsets] = useState([])
  const [documentDimensions, setDocumentDimensions] = useState({ width: 0, height: 0 })
  const [draggedField, setDraggedField] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [fieldColors, setFieldColors] = useState({}) // Store custom colors for fields
  const [showColorPicker, setShowColorPicker] = useState(null) // Field ID for color picker
  const [cursorPreview, setCursorPreview] = useState({ visible: false, x: 0, y: 0, type: null })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [signatureModalOpen, setSignatureModalOpen] = useState(false)
  const [signatureFieldId, setSignatureFieldId] = useState(null)
  const [fieldSignatures, setFieldSignatures] = useState({})
  
  const documentContainerRef = useRef(null)
  const pageRefs = useRef([])

  // Predefined color palette for fields
  const colorPalette = [
    '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', // Grays
    '#fef2f2', '#fee2e2', '#fecaca', '#f87171', // Reds
    '#f0fdf4', '#dcfce7', '#bbf7d0', '#4ade80', // Greens
    '#eff6ff', '#dbeafe', '#93c5fd', '#3b82f6', // Blues
    '#fefce8', '#fef3c7', '#fde68a', '#f59e0b', // Yellows
    '#faf5ff', '#f3e8ff', '#c4b5fd', '#8b5cf6', // Purples
  ]

  // Track mouse position for cursor preview
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (draggedFieldType) {
      document.addEventListener('mousemove', handleMouseMove)
      return () => document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [draggedFieldType])

  // Set cursor preview when field type is selected
  useEffect(() => {
    if (draggedFieldType) {
      setCursorPreview(draggedFieldType)
    } else {
      setCursorPreview(null)
    }
  }, [draggedFieldType])

  // Load document from sessionStorage
  useEffect(() => {
    const loadPendingDocument = async () => {
      try {
        console.log('Loading pending document from sessionStorage...')
        const pendingDoc = sessionStorage.getItem('pendingDocument')
        if (pendingDoc) {
          const docData = JSON.parse(pendingDoc)
          console.log('Parsed document data:', { name: docData.name, type: docData.type, hasData: !!docData.data })
          
          // Convert data URL back to blob for proper handling
          if (docData.data && docData.data.startsWith('data:')) {
            console.log('Converting data URL to blob...')
            const response = await fetch(docData.data)
            const blob = await response.blob()
            const fileUrl = URL.createObjectURL(blob)
            console.log('Created blob URL:', fileUrl)
            
            setDocumentFile({
              ...docData,
              blob: blob,
              url: fileUrl
            })
          } else {
            console.log('Using document data as-is')
            setDocumentFile(docData)
          }
          
          // Handle different file types
          if (docData.type === 'application/pdf') {
            console.log('Loading PDF pages...')
            await loadPdfPages(docData.data)
          } else if (docData.type.startsWith('image/')) {
            console.log('Setting up image document...')
            setDocumentPages([{ pageNumber: 1, imageData: docData.data }])
            setTotalPages(1)
          } else {
            console.log('Setting up other document type...')
            // For other document types, create a placeholder
            setDocumentPages([{ pageNumber: 1, imageData: null, content: 'Document content not previewable' }])
            setTotalPages(1)
          }
        } else {
          console.log('No pending document found in sessionStorage')
          toast.error('No document found. Please upload a document first.')
          router.push('/')
        }
      } catch (error) {
        console.error('Error loading document:', error)
        toast.error('Error loading document')
        router.push('/')
      } finally {
        console.log('Document loading complete, setting loading to false')
        setLoading(false)
      }
    }

    loadPendingDocument()
  }, [router])

  // Calculate page offsets when pages load
  useEffect(() => {
    if (documentPages.length > 0) {
      const calculateOffsets = () => {
        const offsets = []
        let currentOffset = 0
        
        pageRefs.current.forEach((pageRef, index) => {
          if (pageRef) {
            offsets.push(currentOffset)
            const pageHeight = pageRef.offsetHeight
            currentOffset += pageHeight + 32 // 32px for page separator
          }
        })
        
        setPageOffsets(offsets)
      }
      
      // Calculate offsets after a short delay to ensure DOM is updated
      setTimeout(calculateOffsets, 100)
      
      // Recalculate on window resize
      window.addEventListener('resize', calculateOffsets)
      return () => window.removeEventListener('resize', calculateOffsets)
    }
  }, [documentPages, zoom])

  // Load PDF pages using PDF.js
  const loadPdfPages = async (pdfData) => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      const pdf = await pdfjsLib.getDocument(pdfData).promise
      const numPages = pdf.numPages
      setTotalPages(numPages)
      
      const pages = []
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        canvas.height = viewport.height
        canvas.width = viewport.width
        
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise
        
        pages.push({
          pageNumber: pageNum,
          imageData: canvas.toDataURL(),
          width: viewport.width,
          height: viewport.height
        })
      }
      
      setDocumentPages(pages)
    } catch (error) {
      console.error('Error loading PDF:', error)
      toast.error('Error loading PDF. Some features may not work.')
      setDocumentPages([{ pageNumber: 1, imageData: null, content: 'PDF preview failed' }])
      setTotalPages(1)
    }
  }

  // Get page number from Y coordinate
  const getPageFromCoordinate = (y) => {
    for (let i = pageOffsets.length - 1; i >= 0; i--) {
      if (y >= pageOffsets[i]) {
        return i
      }
    }
    return 0
  }

  // Handle field type selection
  const handleFieldTypeSelect = (type) => {
    if (draggedFieldType === type) {
      // If already selected, deselect
      setDraggedFieldType(null)
      toast('Field placement cancelled')
    } else {
      // Select new field type
      setDraggedFieldType(type)
      toast(`Click on document to place ${FIELD_CONFIGS[type].label}`)
    }
  }

  // Handle resize start
  const handleResizeStart = (e, fieldId) => {
    e.stopPropagation()
    e.preventDefault()
    
    const field = fields.find(f => f.id === fieldId)
    if (!field) return
    
    const startX = e.clientX
    const startY = e.clientY
    const startWidth = field.width
    const startHeight = field.height
    
    const handleMouseMove = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX)
      const newHeight = startHeight + (moveEvent.clientY - startY)
      
      handleFieldResize(fieldId, {
        width: Math.max(newWidth, 60),
        height: Math.max(newHeight, 30)
      })
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Add field to document
  const addField = (type, position = null, pageNumber = null) => {
    const config = FIELD_CONFIGS[type]
    let targetPage = 0
    let x = 50
    let y = 50
    
    if (position && pageNumber !== null) {
      targetPage = pageNumber
      x = position.x
      y = position.y
    } else if (position) {
      // Calculate which page based on Y coordinate
      targetPage = getPageFromCoordinate(position.y)
      x = position.x
      y = position.y
    } else {
      // Default positioning - find a good spot on the first page
      const pageFields = fields.filter(f => f.page === targetPage)
      const existingPositions = pageFields.map(f => ({ x: f.x, y: f.y }))
      let attempts = 0
      while (attempts < 20) {
        const overlapping = existingPositions.some(pos => 
          Math.abs(pos.x - x) < 100 && Math.abs(pos.y - y) < 50
        )
        if (!overlapping) break
        
        x += 120
        if (x > 400) {
          x = 50
          y += 80
        }
        attempts++
      }
    }
    
    const fieldId = `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const newField = {
      id: fieldId,
      type,
      x: x,
      y: y,
      width: config.defaultSize.width,
      height: config.defaultSize.height,
      page: targetPage,
      value: '',
      placeholder: `Enter ${config.label.toLowerCase()}`,
      required: false,
      signerId: null,
      backgroundColor: config.bgColor,
      borderColor: config.borderColor,
      fontSize: type === FIELD_TYPES.CHECKBOX ? 12 : 14
    }

    setFields(prev => [...prev, newField])
    setSelectedField(newField.id)
    
    // Store default color for this field
    setFieldColors(prev => ({
      ...prev,
      [fieldId]: config.bgColor
    }))
    
    toast.success(`${config.label} added to page ${targetPage + 1}`)
  }

  // Handle click on document to add field
  const handleDocumentClick = useCallback((e) => {
    // Don't add field if no field type is dragged or if we're currently dragging a field
    if (!draggedFieldType || isDragging) return
    
    // Check if click is directly on document container (not on a field)
    if (e.target.closest('[data-field-id]')) return
    
    // Prevent default and stop propagation
    e.preventDefault()
    e.stopPropagation()
    
    // Get the page element
    const pageElement = e.target.closest('[data-page-number]')
    if (!pageElement) return
    
    const pageNumber = parseInt(pageElement.getAttribute('data-page-number')) - 1 // Convert to 0-based
    const pageRect = pageElement.getBoundingClientRect()
    
    const x = Math.max(10, (e.clientX - pageRect.left) / zoom)
    const y = Math.max(10, (e.clientY - pageRect.top) / zoom)
    
    // Add the field
    addField(draggedFieldType, { x, y }, pageNumber)
    
    // Clear the dragged field type to prevent multiple additions
    setDraggedFieldType(null)
  }, [draggedFieldType, isDragging, zoom, addField])

  // Update field size
  const handleFieldResize = (fieldId, newSize) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId 
        ? { ...field, width: Math.max(newSize.width, 60), height: Math.max(newSize.height, 30) }
        : field
    ))
  }

  // Update field value
  const handleFieldValueChange = (fieldId, newValue) => {
    setFields(prevFields => 
      prevFields.map(field => 
        field.id === fieldId ? { ...field, value: newValue } : field
      )
    )
  }

  // Toggle field mandatory status
  const toggleFieldMandatory = (fieldId) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId 
        ? { ...field, required: !field.required }
        : field
    ))
    const field = fields.find(f => f.id === fieldId)
    toast.success(`Field marked as ${field?.required ? 'optional' : 'mandatory'}`)
  }

  const handleSignatureSave = (fieldId, signatureDataUrl) => {
    setFieldSignatures(prev => ({
      ...prev,
      [fieldId]: signatureDataUrl
    }))
    
    // Also update the field value
    handleFieldValueChange(fieldId, signatureDataUrl)
  }

  // Delete field
  const deleteField = (fieldId) => {
    setFields(prev => prev.filter(field => field.id !== fieldId))
    setSelectedField(null)
    toast.success('Field deleted')
  }

  // Memoize field overlays to prevent unnecessary re-renders
  const fieldOverlays = useMemo(() => fields.map((field) => {
    const config = FIELD_CONFIGS[field.type]
    const Icon = config.icon
    const isSelected = selectedField === field.id
    const isDraggedField = draggedField?.id === field.id
    
    // Enhanced styling based on field type
    const getFieldStyles = () => {
      const baseStyles = {
        transition: isDraggedField ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isDraggedField ? `scale(1.05)` : 'scale(1)',
        opacity: isDraggedField ? 0.9 : 1,
        willChange: isDraggedField ? 'transform' : 'auto',
        boxShadow: isDraggedField 
          ? '0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)' 
          : isSelected 
            ? '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
            : '0 2px 4px rgba(0, 0, 0, 0.05)',
      }

      switch (field.type) {
        case 'signature':
          return {
            ...baseStyles,
            background: fieldColors[field.id] || field.backgroundColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: `2px solid ${isSelected ? '#667eea' : isDraggedField ? '#5a67d8' : field.required ? '#ef4444' : '#e2e8f0'}`,
            borderRadius: '8px',
          }
        case 'text':
          return {
            ...baseStyles,
            background: fieldColors[field.id] || field.backgroundColor || '#ffffff',
            border: `2px solid ${isSelected ? '#3b82f6' : isDraggedField ? '#2563eb' : field.required ? '#ef4444' : '#e2e8f0'}`,
            borderRadius: '6px',
          }
        case 'checkbox':
          return {
            ...baseStyles,
            background: fieldColors[field.id] || field.backgroundColor || '#f8fafc',
            border: `2px solid ${isSelected ? '#10b981' : isDraggedField ? '#059669' : field.required ? '#ef4444' : '#e2e8f0'}`,
            borderRadius: '6px',
          }
        case 'date':
          return {
            ...baseStyles,
            background: fieldColors[field.id] || field.backgroundColor || '#fefefe',
            border: `2px solid ${isSelected ? '#f59e0b' : isDraggedField ? '#d97706' : field.required ? '#ef4444' : '#e2e8f0'}`,
            borderRadius: '6px',
          }
        default:
          return baseStyles
      }
    }

    const fieldStyles = getFieldStyles()
    
    return (
      <div
        key={field.id}
        pageNumber={field.page + 1}
        data-field-id={field.id}
        className={`
          absolute group field-overlay cursor-grab hover:cursor-grab active:cursor-grabbing
          ${isDraggedField ? 'z-50 field-dragging' : isSelected ? 'z-40' : 'z-30'}
          field-hover
        `}
        style={{
          left: `${field.x}px`,
          top: `${field.y}px`,
          width: `${field.width}px`,
          height: `${field.height}px`,
          ...fieldStyles,
        }}
        onMouseDown={(e) => handleFieldMouseDown(e, field)}
        onClick={(e) => {
          e.stopPropagation()
          setSelectedField(field.id)
          
          // Open signature modal for signature fields
          if (field.type === 'signature') {
            setSignatureFieldId(field.id)
            setSignatureModalOpen(true)
          }
        }}
      >
        {/* Field Content */}
        <div className="w-full h-full flex items-center justify-center p-2 relative overflow-hidden">
          {field.type === 'signature' ? (
            fieldSignatures[field.id] ? (
              <img 
                src={fieldSignatures[field.id]} 
                alt="Signature" 
                className="max-w-full max-h-full object-contain"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white text-center">
                <Icon className="w-6 h-6 mb-1 opacity-90" />
                <span className="text-xs font-medium opacity-90">Click to Sign</span>
              </div>
            )
          ) : field.type === 'text' ? (
            <input
              type="text"
              value={field.value || ''}
              onChange={(e) => {
                e.stopPropagation()
                handleFieldValueChange(field.id, e.target.value)
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full bg-transparent border-none outline-none text-sm text-gray-800 placeholder-gray-400 px-2"
              placeholder="Enter text..."
              style={{ 
                fontSize: `${Math.max(12, field.height * 0.4)}px`,
                lineHeight: '1.2'
              }}
            />
          ) : field.type === 'checkbox' ? (
            <div className="flex items-center justify-center w-full h-full">
              <input
                type="checkbox"
                checked={field.value || false}
                onChange={(e) => {
                  e.stopPropagation()
                  handleFieldValueChange(field.id, e.target.checked)
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-6 h-6 text-green-600 bg-white border-2 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
            </div>
          ) : field.type === 'date' ? (
            <input
              type="date"
              value={field.value || ''}
              onChange={(e) => {
                e.stopPropagation()
                handleFieldValueChange(field.id, e.target.value)
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full bg-transparent border-none outline-none text-sm text-gray-800 px-2"
              style={{ 
                fontSize: `${Math.max(10, field.height * 0.35)}px`
              }}
            />
          ) : (
            <div className="flex items-center justify-center text-gray-600">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Enhanced Field Controls */}
        {isSelected && (
          <div className="absolute -top-12 left-0 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl flex items-center space-x-2 z-50 field-toolbar">
            <div className="flex items-center space-x-1">
              <Icon className="w-4 h-4" />
              <span className="text-xs font-medium capitalize">{field.type}</span>
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            <div className="text-xs text-gray-300">
              {Math.round(field.width)}×{Math.round(field.height)}
            </div>
            <div className="w-px h-4 bg-gray-600"></div>
            
            {/* Enhanced Color Picker */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowColorPicker(showColorPicker === field.id ? null : field.id)
                }}
                className="w-4 h-4 rounded border border-gray-600 hover:border-gray-400 transition-colors relative"
                style={{ backgroundColor: fieldColors[field.id] || field.backgroundColor }}
                title="Change background color"
              />
              {showColorPicker === field.id && (
                <div className="absolute top-8 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-60 min-w-48">
                  <div className="text-xs font-medium text-gray-700 mb-2">Background Color</div>
                  <div className="grid grid-cols-4 gap-2">
                    {colorPalette.map((color, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation()
                          changeFieldColor(field.id, color)
                        }}
                        className="w-8 h-8 rounded-md border-2 border-gray-200 hover:border-gray-400 transition-colors"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteField(field.id)
              }}
              className="hover:bg-red-600 p-1 rounded transition-colors"
              title="Delete field"
            >
              <X className="w-3 h-3" />
            </button>
            
            <div className="w-px h-4 bg-gray-600"></div>
            
            {/* Mandatory Toggle Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFieldMandatory(field.id)
              }}
              className={`p-1 rounded transition-colors text-xs font-medium ${
                field.required 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
              title={field.required ? 'Mark as optional' : 'Mark as mandatory'}
            >
              {field.required ? 'REQ' : 'OPT'}
            </button>
          </div>
        )}

        {/* Enhanced Resize Handle */}
        {isSelected && (
          <div
            className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-white rounded-full cursor-se-resize z-50 hover:bg-blue-600 transition-colors shadow-lg"
            onMouseDown={(e) => handleResizeStart(e, field.id)}
            title="Resize field"
          />
        )}

        {/* Enhanced Field Type Indicator */}
        {!isSelected && (
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
              <Icon className="w-3 h-3 text-gray-600" />
            </div>
          </div>
        )}

        {/* Mandatory Field Indicator */}
        {field.required && (
          <div className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg z-10">
            *
          </div>
        )}

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-inherit pointer-events-none" />
      </div>
    )
  }), [fields, selectedField, isDragging, draggedField, fieldColors, showColorPicker, fieldSignatures])

  // Change field background color
  const changeFieldColor = (fieldId, color) => {
    setFieldColors(prev => ({
      ...prev,
      [fieldId]: color
    }))
    setFields(prev => prev.map(field => 
      field.id === fieldId 
        ? { ...field, backgroundColor: color }
        : field
    ))
    setShowColorPicker(null)
  }

  // Handle field drag start
  const handleFieldMouseDown = (e, field) => {
    e.stopPropagation()
    e.preventDefault()
    
    const rect = e.target.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top
    
    setDraggedField(field)
    setDragOffset({ x: offsetX, y: offsetY })
    setIsDragging(true)
    setSelectedField(field.id)
    
    console.log('Started dragging field:', field.id)
  }

  // Handle mouse move for dragging - Optimized for immediate response
  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !draggedField) return
    
    // Direct update without requestAnimationFrame for immediate response
    const pageElement = document.elementFromPoint(e.clientX, e.clientY)?.closest('[data-page-number]')
    if (!pageElement) return
    
    const pageNumber = parseInt(pageElement.getAttribute('data-page-number')) - 1 // Convert to 0-based
    const pageRect = pageElement.getBoundingClientRect()
    
    const newX = (e.clientX - pageRect.left - dragOffset.x) / zoom
    const newY = (e.clientY - pageRect.top - dragOffset.y) / zoom
    
    // Ensure field stays within page boundaries
    const maxX = (pageRect.width / zoom) - draggedField.width
    const maxY = (pageRect.height / zoom) - draggedField.height
    
    const clampedX = Math.max(0, Math.min(newX, maxX))
    const clampedY = Math.max(0, Math.min(newY, maxY))
    
    // Immediate state update for smooth dragging
    setFields(prev => prev.map(f => 
      f.id === draggedField.id 
        ? { 
            ...f, 
            x: clampedX, 
            y: clampedY,
            page: pageNumber
          }
        : f
    ))
  }, [isDragging, draggedField, dragOffset, zoom])

  // Handle mouse up to end dragging
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      console.log('Stopped dragging field')
      setIsDragging(false)
      setDraggedField(null)
      setDragOffset({ x: 0, y: 0 })
    }
  }, [isDragging])

  // Add global mouse event listeners - removed passive for immediate response
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Zoom functions
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3))
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5))

  // Add signer
  const addSigner = (signerData) => {
    if (!signerData.name.trim() || !signerData.email.trim()) {
      toast.error('Please enter both name and email')
      return
    }

    if (signers.some(s => s.email === signerData.email)) {
      toast.error('Signer with this email already exists')
      return
    }

    setSigners(prev => [...prev, { ...signerData, signed: false }])
    toast.success('Signer added')
  }

  // Remove signer
  const removeSigner = (index) => {
    setSigners(prev => prev.filter((_, i) => i !== index))
    toast.success('Signer removed')
  }

  // Upload document and send for signing
  const handleUploadAndSend = async () => {
    if (signers.length === 0) {
      toast.error('Please add at least one signer')
      return
    }

    if (fields.length === 0) {
      toast.error('Please add at least one field to the document')
      return
    }

    setUploading(true)

    try {
      let blob
      if (documentFile.blob) {
        blob = documentFile.blob
      } else if (documentFile.data) {
        const response = await fetch(documentFile.data)
        blob = await response.blob()
      } else {
        throw new Error('No document data available')
      }
      
      const formData = new FormData()
      formData.append('document', blob, documentFile.name)

      const uploadResponse = await axios.post(`${API_BASE_URL}/api/documents/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      if (!uploadResponse.data.success) {
        throw new Error('Failed to upload document')
      }

      const documentId = uploadResponse.data.documentId

      await axios.put(`${API_BASE_URL}/api/documents/${documentId}/fields`, { fields })
      await axios.put(`${API_BASE_URL}/api/documents/${documentId}/signers`, { signers })
      await axios.post(`${API_BASE_URL}/api/documents/${documentId}/send`, {
        message: 'Please review and sign this document.',
        senderName: 'Document Sender',
        senderEmail: 'sender@example.com'
      })

      sessionStorage.removeItem('pendingDocument')
      toast.success('Document uploaded and sent successfully!')
      router.push(`/preview/${documentId}`)
    } catch (error) {
      console.error('Upload and send error:', error)
      toast.error('Failed to upload and send document')
    } finally {
      setUploading(false)
    }
  }

  const handleDocumentLoad = ({ numPages }) => {
    console.log('handleDocumentLoad called with numPages:', numPages)
    setTotalPages(numPages)
    console.log(`Document loaded with ${numPages} pages`)
  }

  const handlePageLoad = ({ pageNumber, width, height, scale }) => {
    console.log('handlePageLoad called:', { pageNumber, width, height, scale })
    setDocumentDimensions({ width: width * scale, height: height * scale })
  }

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

  if (!documentFile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">Document not found</p>
          <button onClick={() => router.push('/')} className="mt-4 btn-primary">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        /* Dynamic color classes for field types */
        .border-blue-500 { border-color: #3b82f6 !important; }
        .bg-blue-50 { background-color: #eff6ff !important; }
        .bg-blue-500 { background-color: #3b82f6 !important; }
        .bg-blue-100 { background-color: #dbeafe !important; }
        .bg-blue-200 { background-color: #bfdbfe !important; }
        .text-blue-600 { color: #2563eb !important; }
        .text-blue-900 { color: #1e3a8a !important; }
        .text-blue-700 { color: #1d4ed8 !important; }
        
        .border-green-500 { border-color: #10b981 !important; }
        .bg-green-50 { background-color: #f0fdf4 !important; }
        .bg-green-500 { background-color: #10b981 !important; }
        .bg-green-100 { background-color: #dcfce7 !important; }
        .bg-green-200 { background-color: #bbf7d0 !important; }
        .text-green-600 { color: #059669 !important; }
        .text-green-900 { color: #14532d !important; }
        .text-green-700 { color: #047857 !important; }
        
        .border-purple-500 { border-color: #8b5cf6 !important; }
        .bg-purple-50 { background-color: #faf5ff !important; }
        .bg-purple-500 { background-color: #8b5cf6 !important; }
        .bg-purple-100 { background-color: #f3e8ff !important; }
        .bg-purple-200 { background-color: #e9d5ff !important; }
        .text-purple-600 { color: #9333ea !important; }
        .text-purple-900 { color: #581c87 !important; }
        .text-purple-700 { color: #7c3aed !important; }
        
        .border-orange-500 { border-color: #f59e0b !important; }
        .bg-orange-50 { background-color: #fffbeb !important; }
        .bg-orange-500 { background-color: #f59e0b !important; }
        .bg-orange-100 { background-color: #fef3c7 !important; }
        .bg-orange-200 { background-color: #fde68a !important; }
        .text-orange-600 { color: #d97706 !important; }
        .text-orange-900 { color: #92400e !important; }
        .text-orange-700 { color: #b45309 !important; }
        
        /* Hover effects */
        .hover\\:border-blue-400:hover { border-color: #60a5fa !important; }
        .hover\\:border-green-400:hover { border-color: #4ade80 !important; }
        .hover\\:border-purple-400:hover { border-color: #a78bfa !important; }
        .hover\\:border-orange-400:hover { border-color: #fbbf24 !important; }
        
        .group:hover .group-hover\\:bg-blue-200 { background-color: #bfdbfe !important; }
        .group:hover .group-hover\\:bg-green-200 { background-color: #bbf7d0 !important; }
        .group:hover .group-hover\\:bg-purple-200 { background-color: #e9d5ff !important; }
        .group:hover .group-hover\\:bg-orange-200 { background-color: #fde68a !important; }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .sidebar-overlay {
            backdrop-filter: blur(4px);
          }
          
          /* Hide right toolbar on mobile */
          .right-toolbar {
            display: none;
          }
          
          /* Adjust document viewer padding on mobile */
          .document-viewer {
            padding: 0.5rem;
          }
          
          /* Make field overlays touch-friendly */
          .field-overlay {
            min-width: 44px;
            min-height: 44px;
          }
        }
        
        @media (max-width: 640px) {
          /* Further mobile optimizations */
          .document-viewer {
            padding: 0.25rem;
          }
          
          /* Smaller field controls on mobile */
          .field-toolbar {
            transform: scale(0.9);
            transform-origin: top left;
          }
        }
        
        /* Field animations and performance optimizations */
        .field-hover {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }
        
        .field-hover:hover {
          transform: translateY(-1px);
        }
        
        .field-dragging {
          transition: none;
          will-change: transform;
        }
        
        /* Smooth zoom transitions */
        .document-viewer canvas {
          transition: transform 0.2s ease-out;
        }
        
        /* Cursor preview animations */
        .cursor-preview {
          animation: cursorFloat 2s ease-in-out infinite;
        }
        
        @keyframes cursorFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        /* Right toolbar responsive behavior */
        @media (max-width: 1024px) {
          .right-toolbar {
            right: 0.5rem;
          }
        }
        
        @media (min-width: 1280px) {
          .right-toolbar {
            right: 1rem;
          }
        }
        
        /* Document viewer responsive width */
        .document-viewer-container {
          max-width: calc(100vw - 320px); /* Account for sidebar */
        }
        
        @media (max-width: 768px) {
          .document-viewer-container {
            max-width: 100vw;
          }
        }
        
        /* Improved scrollbar styling */
        .document-viewer::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .document-viewer::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        
        .document-viewer::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        .document-viewer::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Performance optimizations */
        .field-overlay {
          contain: layout style paint;
        }
        
        .document-page {
          contain: layout style paint;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => router.push('/')} className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
                {documentFile.name}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="hidden sm:inline text-sm text-gray-500">
                {fields.length} fields, {signers.length} signers
              </span>
              
              {/* Share Button */}
              <button
                onClick={() => router.push(`/share/${documentFile?.id || 'new'}`)}
                className="btn-secondary flex items-center space-x-2 text-sm md:text-base px-3 md:px-4 py-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
              
              {/* Live View Button */}
              <button
                onClick={() => {
                  // Create a temporary document for live view
                  const tempDoc = {
                    name: documentFile.name,
                    fields: fields,
                    data: documentFile.data || documentFile.url,
                    id: 'preview'
                  }
                  sessionStorage.setItem('liveViewDocument', JSON.stringify(tempDoc))
                  window.open(`/live/preview`, '_blank')
                }}
                className="btn-secondary flex items-center space-x-2 text-sm md:text-base px-3 md:px-4 py-2"
                title="Preview how this document will look to signers"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Live View</span>
              </button>
              
              <button
                onClick={() => setShowSignerModal(true)}
                disabled={uploading}
                className="btn-primary flex items-center space-x-2 text-sm md:text-base px-3 md:px-4 py-2"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">{uploading ? 'Uploading...' : 'Quick Send'}</span>
                <span className="sm:hidden">{uploading ? '...' : 'Send'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative z-30 w-72 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out h-full overflow-y-auto shadow-lg md:shadow-none
        `}>
          {/* Mobile Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-100 md:hidden">
            <h3 className="text-lg font-semibold text-gray-900">Document Editor</h3>
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4 space-y-6">
            {/* Add Fields Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-blue-600" />
                Add Fields
              </h3>
              
              <div className="space-y-3">
                {Object.entries(FIELD_CONFIGS).map(([type, config]) => {
                  const Icon = config.icon
                  const isActive = draggedFieldType === type
                  return (
                    <button
                      key={type}
                      onClick={() => handleFieldTypeSelect(type)}
                      className={`
                        w-full p-4 rounded-xl border-2 transition-all duration-200 text-left group
                        ${isActive 
                          ? `border-${config.color}-500 bg-${config.color}-50 shadow-md` 
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                          ${isActive 
                            ? `bg-${config.color}-500 text-white` 
                            : `bg-${config.color}-100 text-${config.color}-600 group-hover:bg-${config.color}-200`
                          }
                        `}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${isActive ? `text-${config.color}-900` : 'text-gray-900'}`}>
                            {config.label}
                          </div>
                          <div className={`text-sm ${isActive ? `text-${config.color}-700` : 'text-gray-500'}`}>
                            {isActive ? 'Click on document to place' : `${config.defaultSize.width}×${config.defaultSize.height}px`}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
              
              {draggedFieldType && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Click anywhere on the document to place your field</span>
                  </div>
                </div>
              )}
            </div>

            {/* Signers Section */}
            <div className="border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-600" />
                  Signers
                  <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {signers.length}
                  </span>
                </h3>
                <button
                  onClick={() => setShowSignerModal(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                  title="Add signer"
                >
                  <Plus className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                </button>
              </div>
              
              <div className="space-y-3">
                {signers.map((signer, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{signer.name}</div>
                        <div className="text-sm text-gray-500 truncate flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {signer.email}
                        </div>
                      </div>
                      <button
                        onClick={() => removeSigner(index)}
                        className="p-1 hover:bg-red-100 rounded transition-colors opacity-0 group-hover:opacity-100"
                        title="Remove signer"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {signers.length === 0 && (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 mb-3">No signers added yet</p>
                    <button
                      onClick={() => setShowSignerModal(true)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Add your first signer
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Document Stats */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{fields.length}</div>
                  <div className="text-sm text-blue-700">Fields</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{totalPages}</div>
                  <div className="text-sm text-green-700">Pages</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        sidebarOpen && (
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden sidebar-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content - Document Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Document Info Bar */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                {totalPages} {totalPages === 1 ? 'page' : 'pages'}
              </span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">
                {Math.round(zoom * 100)}% zoom
              </span>
            </div>

            <div className="text-sm text-gray-500">
              {fields.length} total fields
            </div>
          </div>

          {/* Document Viewer */}
          <div className="flex-1 overflow-hidden relative">
            {documentFile ? (
              <DocumentViewer
                fileUrl={documentFile.url || documentFile.data}
                mimeType={documentFile.type}
                onDocumentLoad={handleDocumentLoad}
                onPageLoad={handlePageLoad}
                zoom={zoom}
                onZoomChange={setZoom}
                className="h-full w-full"
                onClick={handleDocumentClick}
              >
                {/* Field Overlays */}
                {fieldOverlays}
              </DocumentViewer>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Document Selected</h3>
                  <p className="text-gray-600 mb-4">Please select a document to start editing</p>
                  <button
                    onClick={() => router.push('/')}
                    className="btn-primary"
                  >
                    Select Document
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side Vertical Toolbar */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 right-toolbar hidden md:block">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 space-y-2">
              {/* Zoom In */}
              <button
                onClick={() => setZoom(prev => Math.min(prev * 1.2, 3))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors group"
                title="Zoom In"
                disabled={zoom >= 3}
              >
                <ZoomIn className={`w-5 h-5 ${zoom >= 3 ? 'text-gray-300' : 'text-gray-600 group-hover:text-blue-600'}`} />
              </button>
              
              {/* Zoom Level */}
              <div className="w-10 h-8 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              
              {/* Zoom Out */}
              <button
                onClick={() => setZoom(prev => Math.max(prev / 1.2, 0.5))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors group"
                title="Zoom Out"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className={`w-5 h-5 ${zoom <= 0.5 ? 'text-gray-300' : 'text-gray-600 group-hover:text-blue-600'}`} />
              </button>
              
              {/* Reset Zoom */}
              <button
                onClick={() => setZoom(1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors group text-xs font-medium"
                title="Reset Zoom (100%)"
              >
                <span className="text-gray-600 group-hover:text-blue-600">1:1</span>
              </button>
            </div>
          </div>

          {/* Mobile Zoom Controls */}
          <div className="md:hidden absolute bottom-4 right-4 z-40">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex space-x-2">
              <button
                onClick={() => setZoom(prev => Math.max(prev / 1.2, 0.5))}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                disabled={zoom <= 0.5}
              >
                <ZoomOut className={`w-4 h-4 ${zoom <= 0.5 ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
              <div className="w-12 h-8 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              <button
                onClick={() => setZoom(prev => Math.min(prev * 1.2, 3))}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                disabled={zoom >= 3}
              >
                <ZoomIn className={`w-4 h-4 ${zoom >= 3 ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signer Modal */}
      {showSignerModal && (
        <SignerModal
          signers={signers}
          onAddSigner={addSigner}
          onRemoveSigner={removeSigner}
          onClose={() => setShowSignerModal(false)}
          onSend={handleUploadAndSend}
          uploading={uploading}
        />
      )}

      {/* Signature Modal */}
      {signatureModalOpen && (
        <SignatureModal
          isOpen={signatureModalOpen}
          onClose={() => {
            setSignatureModalOpen(false)
            setSignatureFieldId(null)
          }}
          onSave={handleSignatureSave}
          fieldId={signatureFieldId}
        />
      )}

      {/* Field Preview Cursor */}
      {cursorPreview && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-200 cursor-preview"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 15,
            opacity: draggedFieldType ? 1 : 0,
            transform: draggedFieldType ? 'scale(1)' : 'scale(0.8)'
          }}
        >
          <div className="bg-white rounded-lg shadow-xl border-2 border-blue-500 p-3 flex items-center space-x-3 backdrop-blur-sm bg-white/95">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              {React.createElement(FIELD_CONFIGS[cursorPreview].icon, { 
                className: "w-5 h-5 text-white" 
              })}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900">
                {FIELD_CONFIGS[cursorPreview].label}
              </span>
              <span className="text-xs text-gray-500">
                Click to place
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 