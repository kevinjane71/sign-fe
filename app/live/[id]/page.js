'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  User, 
  Calendar, 
  PenTool, 
  Loader2, 
  ArrowLeft, 
  Send, 
  ArrowRight, 
  Play,
  Type,
  CheckSquare,
  ZoomIn,
  ZoomOut,
  Save,
  Eye,
  Trash2,
  Plus,
  X,
  Menu,
  Move,
  RotateCw
} from 'lucide-react'
import axios from 'axios'
import './page.css'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'

// Field type configurations - exact same as new editor
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

// Document Viewer Component - exact same as new editor
const DocumentViewer = ({ documentFile, documentId, zoom, onZoomChange, children, onDocumentClick }) => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [originalPages, setOriginalPages] = useState([]) // Store original high-quality renders
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load document based on type - render at high quality once
  const loadDocument = useCallback(async () => {
    if (!documentFile || !documentId) return

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
  }, [documentFile, documentId])

  // Load PDF using PDF.js - render at high quality
  const loadPdfDocument = async () => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      // Use API endpoint to get document content instead of direct URL
      const documentUrl = `${API_BASE_URL}/api/documents/${documentId}/file`
      const pdf = await pdfjsLib.getDocument(documentUrl).promise
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
      // Use API endpoint to get document content instead of direct URL
      img.src = `${API_BASE_URL}/api/documents/${documentId}/file`
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
        // Use full available width, accounting for sidebar
        let availableWidth
        if (typeof window !== 'undefined') {
          if (isMobile) {
            availableWidth = window.innerWidth - 16 // Small margin
          } else {
            availableWidth = window.innerWidth - 320 - 16 // Sidebar + small margin
          }
        } else {
          // Fallback for SSR
          availableWidth = 800
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

// Field Component - Same as working editor implementation
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
  fieldRefs,
  signerInfo,
  isCompleted,
  hasError,
  fieldValues,
  setFieldValues,
  setCompletedFields
}) => {
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const config = FIELD_CONFIGS[field.type] || FIELD_CONFIGS[FIELD_TYPES.TEXT]
  const Icon = config.icon
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  
  const currentValue = fieldValues[field.id] || field.value || ''
  const isEmpty = !currentValue || currentValue === ''
  const isRequired = field.required
  const showError = hasError && isEmpty

  // Get background color based on field type
  const getBackgroundColor = (fieldType) => {
    switch (fieldType) {
      case 'text':
        return 'rgba(59, 130, 246, 0.1)' // Light blue
      case 'signature':
        return 'rgba(16, 185, 129, 0.1)' // Light green
      case 'checkbox':
        return 'rgba(139, 92, 246, 0.1)' // Light purple
      case 'date':
        return 'rgba(245, 158, 11, 0.1)' // Light orange
      default:
        return 'rgba(107, 114, 128, 0.1)' // Light gray
    }
  }

  // Calculate responsive position and size - same as editor
  const fieldStyle = {
    position: 'absolute',
    left: `${field.leftPercent || 0}%`,
    top: `${field.topPercent || 0}%`,
    width: `${field.widthPercent || 10}%`,
    height: `${field.heightPercent || 5}%`,
    minWidth: `${config.minWidth}px`,
    minHeight: `${config.minHeight}px`,
    backgroundColor: showError ? 'rgba(239, 68, 68, 0.1)' : getBackgroundColor(field.type),
    border: showError ? '2px solid #ef4444' : isCompleted ? '2px solid #10b981' : `1px solid ${isSelected ? config.color : '#e5e7eb'}`,
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
  const fieldWidth = containerWidth ? (containerWidth * (field.widthPercent || 10)) / 100 : 100
  const fieldHeight = containerHeight ? (containerHeight * (field.heightPercent || 5)) / 100 : 30
  const baseFontSize = Math.max(10, Math.min(14, fieldHeight * 0.4))
  const fontSize = isMobile ? Math.max(10, baseFontSize * 0.9) : baseFontSize

  const handleValueChange = (newValue) => {
    setFieldValues(prev => ({ ...prev, [field.id]: newValue }))
    
    // Update completion status
    if (newValue && newValue.toString().trim()) {
      setCompletedFields(prev => new Set([...prev, field.id]))
    } else {
      setCompletedFields(prev => {
        const newSet = new Set(prev)
        newSet.delete(field.id)
        return newSet
      })
    }

    // Call parent handler if provided
    if (onValueChange) {
      onValueChange(field.id, newValue)
    }
  }

  const handleSignatureClick = () => {
    if (signerInfo?.name) {
      handleValueChange(signerInfo.name)
    } else {
      setShowSignatureModal(true)
    }
  }

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
    <>
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
              ref={el => fieldRefs.current[field.id] = el}
              type="text"
              value={currentValue}
              onChange={(e) => handleValueChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={() => onSelect(field.id)}
              className="w-full h-full bg-transparent border-none outline-none text-gray-700"
              placeholder={field.label || field.placeholder || "Enter text..."}
              style={{ 
                fontSize: `${fontSize}px`,
                padding: '2px 4px'
              }}
            />
          )}
          
          {field.type === FIELD_TYPES.CHECKBOX && (
            <input
              ref={el => fieldRefs.current[field.id] = el}
              type="checkbox"
              checked={currentValue === 'true' || currentValue === true}
              onChange={(e) => handleValueChange(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              onFocus={() => onSelect(field.id)}
              style={{ 
                width: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.4, 20)}px`,
                height: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.4, 20)}px`,
                minWidth: '14px',
                minHeight: '14px',
                maxWidth: '20px',
                maxHeight: '20px',
                accentColor: '#8b5cf6'
              }}
            />
          )}
          
          {field.type === FIELD_TYPES.DATE && (
            <input
              ref={el => fieldRefs.current[field.id] = el}
              type="date"
              value={currentValue}
              onChange={(e) => handleValueChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              onFocus={() => onSelect(field.id)}
              className="w-full h-full bg-transparent border-none outline-none text-gray-700"
              style={{ 
                fontSize: `${fontSize}px`,
                padding: '2px 4px'
              }}
            />
          )}
          
          {field.type === FIELD_TYPES.SIGNATURE && (
            <div 
              className="flex flex-col items-center justify-center text-gray-600 w-full h-full cursor-pointer"
              onClick={handleSignatureClick}
            >
              {currentValue ? (
                <span style={{ 
                  fontSize: `${fontSize}px`,
                  fontFamily: 'cursive',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  color: '#1f2937'
                }}>
                  {currentValue}
                </span>
              ) : (
                <>
                  <Icon 
                    style={{ 
                      width: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5)}px`,
                      height: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5)}px`,
                      minWidth: '12px',
                      minHeight: '12px'
                    }} 
                  />
                  <span style={{ fontSize: `${Math.max(8, fontSize * 0.7)}px` }}>
                    Click to sign
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Error indicator - small red dot */}
        {showError && (
          <div style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            width: '12px',
            height: '12px',
            backgroundColor: '#ef4444',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }} />
        )}

        {/* Completion indicator - small green checkmark */}
        {isCompleted && !showError && (
          <div style={{
            position: 'absolute',
            top: '-6px',
            right: '-6px',
            width: '12px',
            height: '12px',
            backgroundColor: '#10b981',
            borderRadius: '50%',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '8px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            ✓
          </div>
        )}
      </div>

      {/* Simple signature modal */}
      {showSignatureModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>Add Your Signature</h3>
            <input
              type="text"
              placeholder="Enter your full name"
              autoFocus
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                marginBottom: '20px',
                outline: 'none',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleValueChange(e.target.value)
                  setShowSignatureModal(false)
                }
              }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSignatureModal(false)}
                style={{
                  padding: '10px 20px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Enter your full name"]')
                  if (input?.value) {
                    handleValueChange(input.value)
                  }
                  setShowSignatureModal(false)
                }}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Add Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Main LiveView Component
export default function LiveView() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.id
  
  // State management - same as new editor
  const [documentData, setDocumentData] = useState(null)
  const [fields, setFields] = useState([])
  const [fieldValues, setFieldValues] = useState({})
  const [completedFields, setCompletedFields] = useState(new Set())
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [documentFile, setDocumentFile] = useState(null)
  const [selectedFieldId, setSelectedFieldId] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [signerInfo, setSignerInfo] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const fieldRefs = useRef({})

  // Convert pixel-based fields to percentage-based fields
  const convertFieldToPercentage = useCallback((field, containerWidth = 800, containerHeight = 1000) => {
    // If field already has percentage values, return as is
    if (field.leftPercent !== undefined && field.topPercent !== undefined) {
      return field
    }
    
    // Convert pixel values to percentages
    const leftPercent = field.x ? (field.x / containerWidth) * 100 : 0
    const topPercent = field.y ? (field.y / containerHeight) * 100 : 0
    const widthPercent = field.width ? (field.width / containerWidth) * 100 : 10
    const heightPercent = field.height ? (field.height / containerHeight) * 100 : 5
    
    return {
      ...field,
      leftPercent: Math.max(0, Math.min(95, leftPercent)),
      topPercent: Math.max(0, Math.min(95, topPercent)),
      widthPercent: Math.max(2, Math.min(40, widthPercent)),
      heightPercent: Math.max(1.5, Math.min(20, heightPercent))
    }
  }, [])

  // Load document and fields - render immediately
  const loadDocument = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await axios.get(`${API_BASE_URL}/api/documents/${documentId}`)
      
      // Check if the response has the expected structure
      let docData
      if (response.data.success && response.data.document) {
        // Backend returns { success: true, document: {...} }
        docData = response.data.document
      } else if (response.data.id || response.data.originalName) {
        // Backend returns document data directly
        docData = response.data
      } else {
        throw new Error('Invalid response structure')
      }

      setDocumentData(docData)
      
      // Convert fields to percentage-based coordinates if needed
      const convertedFields = (docData.fields || []).map(field => 
        convertFieldToPercentage(field, 800, 1000) // Assume standard document size
      )
      setFields(convertedFields)
      
      setSignerInfo(docData.signerInfo || docData.signers?.[0] || { name: 'Demo Signer', email: 'demo@example.com' })
        
        // Initialize field values
        const initialValues = {}
      const initialCompleted = new Set()
      
      convertedFields.forEach(field => {
        if (field.value !== undefined && field.value !== null && field.value !== '') {
          initialValues[field.id] = field.value
          initialCompleted.add(field.id)
        }
      })
      
        setFieldValues(initialValues)
      setCompletedFields(initialCompleted)

      // Set document file info for DocumentViewer (just metadata, not the actual file)
      const documentFileObj = {
        type: docData.mimeType,
        // Don't set URL since we'll use API endpoint
      }
      setDocumentFile(documentFileObj)

    } catch (err) {
      console.error('Error loading document:', err)
      const errorMessage = err.response?.data?.error || err.message || 'Failed to load document'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [documentId, convertFieldToPercentage])

  useEffect(() => {
    if (documentId) {
      loadDocument()
    }
  }, [documentId, loadDocument])

  // Field value change handler
  const handleFieldValueChange = useCallback((fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }))

    // Mark as completed if value is provided
    if (value !== undefined && value !== null && value !== '') {
      setCompletedFields(prev => new Set([...prev, fieldId]))
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    } else {
      setCompletedFields(prev => {
        const newSet = new Set(prev)
        newSet.delete(fieldId)
        return newSet
      })
    }
  }, [])

  // Field selection handler
  const handleFieldSelect = useCallback((fieldId) => {
    setSelectedFieldId(fieldId)
  }, [])

  // Drag handlers - same as new editor
  const handleDragStart = useCallback((e, field) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY
    
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top
    })
    setIsDragging(true)
    setSelectedFieldId(field.id)
  }, [])

  const handleDragMove = useCallback((e) => {
    if (!isDragging || !selectedFieldId) return

    const documentElement = globalThis.document.querySelector(`[data-page-number="1"]`)
    if (!documentElement) return

    const rect = documentElement.getBoundingClientRect()
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY

    const x = clientX - rect.left - dragOffset.x
    const y = clientY - rect.top - dragOffset.y

    const leftPercent = Math.max(0, Math.min(95, (x / rect.width) * 100))
    const topPercent = Math.max(0, Math.min(95, (y / rect.height) * 100))

    setFields(prev => prev.map(field => 
      field.id === selectedFieldId 
        ? { ...field, leftPercent, topPercent }
        : field
    ))
  }, [isDragging, selectedFieldId, dragOffset])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
  }, [])

  // Mouse and touch event handlers
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => handleDragMove(e)
      const handleMouseUp = () => handleDragEnd()
      const handleTouchMove = (e) => {
        e.preventDefault()
        handleDragMove(e)
      }
      const handleTouchEnd = () => handleDragEnd()

      globalThis.document.addEventListener('mousemove', handleMouseMove)
      globalThis.document.addEventListener('mouseup', handleMouseUp)
      globalThis.document.addEventListener('touchmove', handleTouchMove, { passive: false })
      globalThis.document.addEventListener('touchend', handleTouchEnd)

      return () => {
        globalThis.document.removeEventListener('mousemove', handleMouseMove)
        globalThis.document.removeEventListener('mouseup', handleMouseUp)
        globalThis.document.removeEventListener('touchmove', handleTouchMove)
        globalThis.document.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isDragging, handleDragMove, handleDragEnd])

  // Zoom handlers
  const handleZoomIn = () => setZoom(prev => Math.min(3, prev + 0.25))
  const handleZoomOut = () => setZoom(prev => Math.max(0.5, prev - 0.25))

  // Submit handler with enhanced validation and error handling
  const handleSubmit = async () => {
    try {
      setSubmitting(true)
      
      // Clear previous errors
      setFieldErrors({})
      
      // Validate required fields
    const errors = {}
      const emptyRequiredFields = []
    
    fields.forEach(field => {
        if (field.required) {
          const value = fieldValues[field.id]
          const isEmpty = !value || value === '' || value === false
          
          if (isEmpty) {
            errors[field.id] = 'This field is required'
            emptyRequiredFields.push(field)
          }
        }
      })

      if (Object.keys(errors).length > 0) {
    setFieldErrors(errors)
        
        // Focus on the first empty required field
        if (emptyRequiredFields.length > 0) {
          const firstEmptyField = emptyRequiredFields[0]
          
          // Scroll to the field
          setTimeout(() => {
            const fieldElement = fieldRefs.current[firstEmptyField.id]
            if (fieldElement) {
              fieldElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
              })
              
              // Focus the input if it exists
              const input = fieldElement.querySelector('input')
              if (input) {
                input.focus()
              }
            }
          }, 100)
        }
        
        toast.error(`Please complete ${emptyRequiredFields.length} required field${emptyRequiredFields.length > 1 ? 's' : ''}`)
      return
    }
    
      // All validations passed, submit the document
      const response = await axios.post(`${API_BASE_URL}/api/documents/${documentId}/submit`, {
        fieldValues,
        signerInfo
      })

      setSubmitted(true)
      toast.success('Document submitted successfully!')
      
    } catch (err) {
      console.error('Error submitting document:', err)
      const errorMessage = err.response?.data?.error || err.message || 'Failed to submit document'
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  // Calculate completion progress
  const requiredFields = fields.filter(field => field.required)
  const completedRequiredFields = requiredFields.filter(field => completedFields.has(field.id))
  const progress = requiredFields.length > 0 ? (completedRequiredFields.length / requiredFields.length) * 100 : 100

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
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Document</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Document Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your document has been successfully submitted and signed.
          </p>
          <button 
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {documentData?.title || 'Document Signing'}
            </h1>
            <p className="text-sm text-gray-600">
              {signerInfo?.name && `Signing as: ${signerInfo.name}`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Progress */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Progress: {Math.round(progress)}%
            </span>
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button 
              onClick={handleZoomOut}
              className="p-1 hover:bg-white rounded"
              disabled={zoom <= 0.5}
              >
              <ZoomOut className="w-4 h-4" />
              </button>
            <span className="text-sm font-medium px-2 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
                    <button
              onClick={handleZoomIn}
              className="p-1 hover:bg-white rounded"
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-4 h-4" />
                    </button>
              </div>
              
          {/* Submit Button */}
                <button
                  onClick={handleSubmit}
            disabled={submitting || progress < 100}
            className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
              progress >= 100 && !submitting
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
                >
                  {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting...</span>
              </>
                  ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit</span>
              </>
                  )}
                </button>
        </div>
        </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
          <DocumentViewer
          documentFile={documentFile}
          documentId={documentId}
            zoom={zoom}
            onZoomChange={setZoom}
        >
          {fields.map((field) => (
            <FieldComponent
                  key={field.id}
              field={{
                ...field,
                value: fieldValues[field.id]
              }}
                  pageNumber={field.pageNumber || 1}
              isSelected={selectedFieldId === field.id}
              isDragging={isDragging && selectedFieldId === field.id}
              onSelect={handleFieldSelect}
              onDragStart={handleDragStart}
              onValueChange={handleFieldValueChange}
              fieldRefs={fieldRefs}
              signerInfo={signerInfo}
              isCompleted={completedFields.has(field.id)}
              hasError={fieldErrors[field.id]}
              fieldValues={fieldValues}
              setFieldValues={setFieldValues}
              setCompletedFields={setCompletedFields}
            />
          ))}
        </DocumentViewer>
      </div>

      {/* Mobile Progress Bar */}
      <div className="sm:hidden bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Progress: {Math.round(progress)}%
          </span>
          <span className="text-sm text-gray-600">
            {completedRequiredFields.length} of {requiredFields.length} required
                        </span>
                        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
} 