'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { 
  Loader2, 
  CheckCircle, 
  AlertCircle, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Download,
  FileText,
  User,
  Mail,
  Calendar,
  Signature,
  X,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import toast from 'react-hot-toast'
import SignatureModal from '../../components/SignatureModal'

// Load PDF.js
import * as pdfjsLib from 'pdfjs-dist'

// Configure PDF.js worker - Use the CDN version that matches our version
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
}

// Add CSS animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
    }
    
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translate3d(0,0,0);
      }
      40%, 43% {
        transform: translate3d(0, -5px, 0);
      }
      70% {
        transform: translate3d(0, -3px, 0);
      }
      90% {
        transform: translate3d(0, -1px, 0);
      }
    }
  `
  if (!document.head.querySelector('style[data-signing-animations]')) {
    style.setAttribute('data-signing-animations', 'true')
    document.head.appendChild(style)
  }
}

// Field Types - Same as editor
const FIELD_TYPES = {
  TEXT: 'text',
  SIGNATURE: 'signature', 
  CHECKBOX: 'checkbox',
  DATE: 'date',
  NAME: 'name',
  EMAIL: 'email', 
  PHONE: 'phone',
  INITIAL: 'initial'
}

// Field configurations - Same as editor
const FIELD_CONFIGS = {
  [FIELD_TYPES.TEXT]: {
    icon: FileText,
    label: 'Text Field',
    color: '#ea580c',
    bgColor: '#fff7ed',
    borderColor: '#ea580c',
    defaultWidth: 120,
    defaultHeight: 32,
    minWidth: 60,
    minHeight: 20
  },
  [FIELD_TYPES.SIGNATURE]: {
    icon: Signature,
    label: 'Signature',
    color: '#3b82f6',
    bgColor: '#eff6ff',
    borderColor: '#3b82f6',
    defaultWidth: 180,
    defaultHeight: 60,
    minWidth: 120,
    minHeight: 40
  },
  [FIELD_TYPES.CHECKBOX]: {
    icon: CheckCircle,
    label: 'Checkbox',
    color: '#8b5cf6',
    bgColor: '#f3f4f6',
    borderColor: '#8b5cf6',
    defaultWidth: 24,
    defaultHeight: 24,
    minWidth: 20,
    minHeight: 20
  },
  [FIELD_TYPES.DATE]: {
    icon: Calendar,
    label: 'Date Field',
    color: '#10b981',
    bgColor: '#ecfdf5',
    borderColor: '#10b981',
    defaultWidth: 120,
    defaultHeight: 32,
    minWidth: 80,
    minHeight: 20
  },
  [FIELD_TYPES.NAME]: {
    icon: User,
    label: 'Name Field',
    color: '#10b981',
    bgColor: '#ecfdf5',
    borderColor: '#10b981',
    defaultWidth: 150,
    defaultHeight: 32,
    minWidth: 100,
    minHeight: 20
  },
  [FIELD_TYPES.EMAIL]: {
    icon: Mail,
    label: 'Email Field',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    borderColor: '#f59e0b',
    defaultWidth: 180,
    defaultHeight: 32,
    minWidth: 120,
    minHeight: 20
  },
  [FIELD_TYPES.PHONE]: {
    icon: User,
    label: 'Phone Field',
    color: '#06b6d4',
    bgColor: '#cffafe',
    borderColor: '#06b6d4',
    defaultWidth: 140,
    defaultHeight: 32,
    minWidth: 100,
    minHeight: 20
  },
  [FIELD_TYPES.INITIAL]: {
    icon: User,
    label: 'Initial',
    color: '#7c3aed',
    bgColor: '#faf5ff',
    borderColor: '#7c3aed',
    defaultWidth: 60,
    defaultHeight: 60,
    minWidth: 40,
    minHeight: 40
  }
}

// Document Viewer Component - Same as editor but optimized for signing
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
      style={{ 
        scrollBehavior: 'smooth',
        width: typeof window !== 'undefined' && window.innerWidth < 768 ? '100vw' : undefined,
        padding: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : undefined
      }}
    >
      {allPages.map((page, globalPageIndex) => {
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
        let availableWidth = isMobile ? window.innerWidth : window.innerWidth - 32
        const baseWidth = Math.min(page.originalWidth * 1.2, (availableWidth * 0.9) / zoom)
        const displayWidth = baseWidth * zoom
        const displayHeight = (page.originalHeight / page.originalWidth) * displayWidth
        return (
          <div key={`${page.documentIndex}-${page.pageNumber}`} className="relative">
            {/* Document Page */}
            <div
              data-page-number={page.pageNumber}
              data-document-index={page.documentIndex}
              className={`relative bg-white shadow-lg my-4${isMobile ? '' : ' mx-auto'}`}
              style={{
                width: isMobile ? '100vw' : displayWidth,
                height: displayHeight,
                maxWidth: isMobile ? '100vw' : 'none',
                margin: isMobile ? '0 auto' : undefined
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

// Signing Field Component - Based on editor's FieldComponent but optimized for signing
const SigningFieldComponent = ({ 
  field, 
  pageNumber, 
  documentIndex, 
  containerWidth, 
  containerHeight,
  fieldValue,
  onFieldUpdate,
  onFieldClick,
  isRequired = false
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(fieldValue || field.defaultValue || '')
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const fieldRef = useRef(null)
  
  const fieldConfig = FIELD_CONFIGS[field.type] || FIELD_CONFIGS[FIELD_TYPES.TEXT]
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false
  const Icon = fieldConfig.icon || FileText // Fallback to FileText if icon is undefined

  // Update local value when fieldValue prop changes
  useEffect(() => {
    setLocalValue(fieldValue || field.defaultValue || '')
  }, [fieldValue, field.defaultValue])

  // Use the exact same positioning logic as editor - no fallback conversion
  const fieldStyle = {
    position: 'absolute',
    left: `${field.leftPercent || 0}%`,
    top: `${field.topPercent || 0}%`, 
    width: `${field.widthPercent || 10}%`,
    height: `${field.heightPercent || 5}%`,
    minWidth: `${fieldConfig.minWidth || 40}px`,
    minHeight: `${fieldConfig.minHeight || 20}px`,
    backgroundColor: fieldConfig.bgColor,
    border: `2px solid ${isRequired && !localValue ? '#ef4444' : fieldConfig.borderColor}`,
    borderRadius: '4px',
    cursor: 'pointer',
    pointerEvents: 'auto',
    zIndex: 20,
    transition: 'all 0.3s ease',
    boxShadow: isRequired && !localValue 
      ? '0 0 12px rgba(239, 68, 68, 0.4), 0 0 0 3px rgba(239, 68, 68, 0.1)' 
      : '0 1px 3px rgba(0,0,0,0.1)',
    animation: isRequired && !localValue ? 'pulse 2s infinite' : 'none'
  }

  // Calculate responsive font size based on field size - same as editor
  const fieldWidth = containerWidth ? (containerWidth * (field.widthPercent || 10)) / 100 : 100
  const fieldHeight = containerHeight ? (containerHeight * (field.heightPercent || 5)) / 100 : 30
  const baseFontSize = Math.max(10, Math.min(14, fieldHeight * 0.4))
  const fontSize = isMobile ? Math.max(10, baseFontSize * 0.9) : baseFontSize

  // Get appropriate placeholder text
  const getPlaceholder = () => {
    switch (field.type) {
      case FIELD_TYPES.TEXT: return 'Text'
      case FIELD_TYPES.NAME: return 'Name'
      case FIELD_TYPES.EMAIL: return 'Email'
      case FIELD_TYPES.PHONE: return 'Phone'
      case FIELD_TYPES.DATE: return 'Date'
      case FIELD_TYPES.SIGNATURE: return 'Signature'
      case FIELD_TYPES.INITIAL: return 'Initial'
      default: return 'Field'
    }
  }

  const handleFieldClick = (e) => {
    e.stopPropagation()
    if (field.type === FIELD_TYPES.SIGNATURE) {
      setShowSignatureModal(true)
    } else if (field.type === FIELD_TYPES.CHECKBOX) {
      const newValue = !localValue
      setLocalValue(newValue)
      onFieldUpdate(field.id, newValue)
    } else {
      // For text, date, name, email, phone fields - just enter edit mode
      setIsEditing(true)
      // Focus the input after a short delay to ensure it's rendered
      setTimeout(() => {
        if (fieldRef.current) {
          fieldRef.current.focus()
        }
      }, 100)
    }
    onFieldClick && onFieldClick(field)
  }

  const handleValueChange = (newValue) => {
    setLocalValue(newValue)
    onFieldUpdate(field.id, newValue)
    if (field.type !== FIELD_TYPES.TEXT) {
      setIsEditing(false)
    }
  }

  const isCompleted = Boolean(localValue)

  return (
    <>
      <div
        data-field-id={field.id}
        style={fieldStyle}
        onClick={handleFieldClick}
        className={`flex items-center justify-center transition-all duration-300 hover:shadow-lg ${
          isCompleted ? 'opacity-100' : 'opacity-90'
        } ${isRequired && !isCompleted ? 'animate-pulse' : ''}`}
        title={`${fieldConfig.label}${isRequired ? ' (Required)' : ''}`}
      >
        {/* Required indicator */}
        {isRequired && !isCompleted && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
            !
          </div>
        )}

        {/* Completed indicator */}
        {isCompleted && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs z-10">
            ✓
          </div>
        )}

        {/* Field Content */}
        <div className="w-full h-full flex items-center justify-center p-1">
          {(field.type === FIELD_TYPES.TEXT || field.type === FIELD_TYPES.NAME || field.type === FIELD_TYPES.EMAIL || field.type === FIELD_TYPES.PHONE) && (
            isEditing ? (
              <div className="w-full h-full flex flex-col">
                <input
                  ref={fieldRef}
                  type={field.type === FIELD_TYPES.EMAIL ? 'email' : field.type === FIELD_TYPES.PHONE ? 'tel' : 'text'}
                  value={localValue}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) handleValueChange(e.target.value)
                  }}
                  onBlur={() => {
                    setIsEditing(false)
                    // On blur, scroll back to previous position if needed (mobile)
                    if (typeof window !== 'undefined' && window.innerWidth < 768) {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      // Find next empty field and focus it
                      const allInputs = Array.from(document.querySelectorAll('input[data-signing-field]'))
                      const currentIdx = allInputs.findIndex(inp => inp === fieldRef.current)
                      for (let i = currentIdx + 1; i < allInputs.length; i++) {
                        if (!allInputs[i].value) {
                          allInputs[i].focus()
                          return
                        }
                      }
                      setIsEditing(false)
                    }
                  }}
                  className="w-full h-full bg-transparent border-none outline-none text-gray-700"
                  style={{ fontSize: `${fontSize}px`, padding: '2px 4px' }}
                  maxLength={200}
                  autoFocus
                  data-signing-field
                  inputMode={field.type === FIELD_TYPES.PHONE ? 'tel' : 'text'}
                  pattern={field.type === FIELD_TYPES.PHONE ? '[0-9]*' : undefined}
                />
                <div className="text-xs text-gray-400 text-right pr-1">{localValue.length}/200</div>
              </div>
            ) : (
              <div 
                className="w-full h-full flex items-center justify-start px-2 text-gray-700"
                style={{ fontSize: `${fontSize}px` }}
              >
                {localValue || (
                  <span className="text-gray-400 italic">{getPlaceholder()}</span>
                )}
              </div>
            )
          )}

          {field.type === FIELD_TYPES.CHECKBOX && (
            <input
              type="checkbox"
              checked={localValue === 'true' || localValue === true}
              onChange={(e) => handleValueChange(e.target.checked)}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                width: `${Math.min(fieldWidth * 0.8, fieldHeight * 0.8)}px`,
                height: `${Math.min(fieldWidth * 0.8, fieldHeight * 0.8)}px`,
                minWidth: '16px',
                minHeight: '16px',
                accentColor: fieldConfig.color
              }}
            />
          )}

          {field.type === FIELD_TYPES.DATE && (
            isEditing ? (
              <input
                ref={fieldRef}
                type="date"
                value={localValue}
                onChange={(e) => handleValueChange(e.target.value)}
                onBlur={() => setIsEditing(false)}
                className="w-full h-full bg-transparent border-none outline-none text-gray-700"
                style={{ 
                  fontSize: `${fontSize}px`,
                  padding: '2px 4px'
                }}
                autoFocus
              />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-start px-2 text-gray-700"
                style={{ fontSize: `${fontSize}px` }}
              >
                {localValue || (
                  <span className="text-gray-400 italic">Date</span>
                )}
              </div>
            )
          )}

          {field.type === FIELD_TYPES.SIGNATURE && (
            <div className="flex flex-col items-center justify-center text-gray-600 w-full h-full cursor-pointer">
              {localValue && localValue.startsWith('data:image') ? (
                <img
                  src={localValue}
                  alt="Signature"
                  className="w-full h-full object-contain"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
              ) : localValue ? (
                <span style={{ 
                  fontSize: `${fontSize}px`,
                  fontFamily: 'cursive',
                  fontStyle: 'italic',
                  fontWeight: '500',
                  color: '#1f2937'
                }}>
                  {localValue}
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
                    Signature
                  </span>
                </>
              )}
            </div>
          )}

          {field.type === FIELD_TYPES.INITIAL && (
            <div className="flex flex-col items-center justify-center text-gray-600 w-full h-full cursor-pointer">
              {localValue ? (
                <span style={{ 
                  fontSize: `${fontSize}px`,
                  fontFamily: 'cursive',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {localValue}
                </span>
              ) : (
                <>
                  <Icon 
                    style={{ 
                      width: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.6)}px`,
                      height: `${Math.min(fieldWidth * 0.4, fieldHeight * 0.6)}px`,
                      minWidth: '12px',
                      minHeight: '12px'
                    }} 
                  />
                  <span style={{ fontSize: `${Math.max(8, fontSize * 0.7)}px` }}>
                    Initial
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <SignatureModal 
          onClose={() => setShowSignatureModal(false)}
          onSave={(signature) => {
            handleValueChange(signature)
            setShowSignatureModal(false)
          }}
          maxSizeMB={20}
        />
      )}
    </>
  )
}

// Main Signing Page Component
export default function SigningPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const documentId = useParams().documentId

  const signerEmail = searchParams.get('signer')
  const token = searchParams.get('token')

  const [documentData, setDocumentData] = useState(null)
  const [documents, setDocuments] = useState([])
  const [fieldValues, setFieldValues] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'

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

  useEffect(() => {
    if (!documentId || !signerEmail || !token) {
      setError('Missing required parameters')
      setLoading(false)
      return
    }

    const loadSigningDocument = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch document data from backend
        const response = await fetch(`${API_BASE_URL}/api/sign/${documentId}?signer=${encodeURIComponent(signerEmail)}&token=${token}`)
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to load document')
        }

        // Check if user has already signed
        if (result.alreadySigned) {
          // Redirect to completion page immediately
          router.push(`/sign-complete?document=${documentId}&signer=${encodeURIComponent(signerEmail)}`)
          return
        }

        setDocumentData(result.document)

        // Convert document data to format expected by DocumentViewer
        const loadedDocuments = []
        const initialFieldValues = {}

        if (result.document.files && result.document.files.length > 0) {
          // Multi-file document
          for (let i = 0; i < result.document.files.length; i++) {
            const file = result.document.files[i]
            
            // Fetch file content with token
            const fileUrl = `${API_BASE_URL}/api/sign/${documentId}/file/${file.fileId}?signer=${encodeURIComponent(signerEmail)}&token=${token}`
            
            const documentObj = {
              name: file.originalName,
              type: file.mimeType,
              size: file.size,
              url: fileUrl,
              fileId: file.fileId,
              title: file.title
            }
            
            loadedDocuments.push(documentObj)

            // Initialize field values
            if (file.fields) {
              file.fields.forEach(field => {
                initialFieldValues[field.id] = field.defaultValue || ''
              })
            }
          }
        } else {
          // Legacy single file document
          const fileUrl = `${API_BASE_URL}/api/sign/${documentId}/file/main?signer=${encodeURIComponent(signerEmail)}&token=${token}`
          
          const documentObj = {
            name: result.document.originalName,
            type: result.document.mimeType,
            url: fileUrl
          }
          
          loadedDocuments.push(documentObj)

          // Initialize field values for legacy fields
          if (result.document.fields) {
            result.document.fields.forEach(field => {
              initialFieldValues[field.id] = field.defaultValue || ''
            })
          }
        }

        setDocuments(loadedDocuments)
        setFieldValues(initialFieldValues)

      } catch (err) {
        console.error('Error loading document:', err)
        setError(err.message || 'Failed to load document')
      } finally {
        setLoading(false)
      }
    }

    loadSigningDocument()
  }, [documentId, signerEmail, token, router])

  // Get all fields from all files
  const getAllFields = () => {
    if (!documentData) return []
    const allFields = []
    if (documentData.files && documentData.files.length > 0) {
      // Multi-file document
      documentData.files.forEach((file, fileIndex) => {
        if (file.fields) {
          file.fields.forEach(field => {
            // Only include fields assigned to this signer or default fields
            if (!field.assignedTo || field.assignedTo === signerEmail) {
              const convertedField = convertFieldToPercentage(field)
              allFields.push({
                ...convertedField,
                documentIndex: fileIndex
              })
            }
          })
        }
      })
    } else {
      // Legacy single file document
      if (documentData.fields) {
        documentData.fields.forEach(field => {
          if (!field.assignedTo || field.assignedTo === signerEmail) {
            const convertedField = convertFieldToPercentage(field)
            allFields.push({
              ...convertedField,
              documentIndex: 0
            })
          }
        })
      }
    }
    return allFields
  }

  // Handle field value updates
  const handleFieldUpdate = (fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  // Check if all required fields are completed
  const areRequiredFieldsCompleted = () => {
    const allFields = getAllFields()
    const requiredFields = allFields.filter(field => field.required)
    
    return requiredFields.every(field => {
      const value = fieldValues[field.id]
      return value && value.toString().trim() !== ''
    })
  }

  // Submit signature
  const handleSubmitSignature = async () => {
    if (!areRequiredFieldsCompleted()) {
      // Focus the first empty required field
      const allInputs = Array.from(document.querySelectorAll('input[data-signing-field]'))
      for (let inp of allInputs) {
        if (!inp.value) {
          inp.focus()
          break
        }
      }
      toast.error('Please fill all required fields before submitting.')
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch(`${API_BASE_URL}/api/sign/${documentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signerEmail: signerEmail,
          fieldValues: fieldValues,
          signatureData: null // Could add overall signature if needed
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit signature')
      }

      toast.success('Document signed successfully!')
      
      // Redirect to completion page
      router.push(`/sign-complete?document=${documentId}&signer=${encodeURIComponent(signerEmail)}`)

    } catch (err) {
      console.error('Error submitting signature:', err)
      toast.error(err.message || 'Failed to submit signature')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading document for signing...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Document</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Mobile Responsive */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="block md:hidden space-y-3">
            {/* Top row - Document title */}
            <div className="flex items-center justify-between">
              <h1 className="text-base font-semibold text-gray-900 truncate flex-1 mr-2">
                {documentData?.title || 'Document Signing'}
              </h1>
              {/* Zoom Controls */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-1.5 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-600 min-w-[2.5rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="p-1.5 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Second row - Signer info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span className="truncate">{signerEmail}</span>
              </div>
              
              {/* Submit Button - Mobile */}
              <button
                onClick={handleSubmitSignature}
                disabled={isSubmitting || !areRequiredFieldsCompleted()}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  areRequiredFieldsCompleted() && !isSubmitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-1">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Signing...</span>
                  </div>
                ) : (
                  'Complete Signing'
                )}
              </button>
            </div>

            {/* Progress indicator for mobile */}
            {getAllFields().length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(Object.keys(fieldValues).filter(key => fieldValues[key]).length / getAllFields().length) * 100}%` 
                    }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">
                  {Object.keys(fieldValues).filter(key => fieldValues[key]).length}/{getAllFields().length}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold text-gray-900">
                {documentData?.title || 'Document Signing'}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{signerEmail}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                  className="p-2 text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Submit Button - Desktop */}
              <button
                onClick={handleSubmitSignature}
                disabled={isSubmitting || !areRequiredFieldsCompleted()}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  areRequiredFieldsCompleted() && !isSubmitting
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Complete Signing'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Viewer */}
      <div className="flex-1 overflow-hidden">
        {documents.length > 0 && (
          <div className="h-screen">
            <DocumentViewer
              documents={documents}
              zoom={zoom}
              onZoomChange={setZoom}
            >
              {getAllFields().map((field) => (
                <SigningFieldComponent
                  key={field.id}
                  field={field}
                  pageNumber={field.pageNumber}
                  documentIndex={field.documentIndex}
                  fieldValue={fieldValues[field.id]}
                  onFieldUpdate={handleFieldUpdate}
                  isRequired={field.required}
                />
              ))}
            </DocumentViewer>
          </div>
        )}
      </div>

      {/* Progress Sidebar - Mobile-friendly */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border max-w-xs z-30">
        {/* Mobile - Collapsed view */}
        <div className="block md:hidden">
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                Progress: {Object.keys(fieldValues).filter(key => fieldValues[key]).length}/{getAllFields().length}
              </span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${getAllFields().length > 0 ? (Object.keys(fieldValues).filter(key => fieldValues[key]).length / getAllFields().length) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>
            
            {/* Show validation message if there are incomplete required fields */}
            {!areRequiredFieldsCompleted() && getAllFields().some(field => field.required) && (
              <div className="mt-2 text-xs text-red-600 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                Complete required fields to submit
              </div>
            )}
          </div>
        </div>

        {/* Desktop - Full view */}
        <div className="hidden md:block p-4">
          <h3 className="font-medium text-gray-900 mb-3">Signing Progress</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {getAllFields().map((field) => {
              const isCompleted = Boolean(fieldValues[field.id])
              const fieldConfig = FIELD_CONFIGS[field.type] || FIELD_CONFIGS[FIELD_TYPES.TEXT]
              
              return (
                <div 
                  key={field.id} 
                  className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                    field.required && !isCompleted ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    // Scroll to field and focus it
                    const fieldElement = document.querySelector(`[data-field-id="${field.id}"]`)
                    if (fieldElement) {
                      fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      fieldElement.click()
                    }
                  }}
                >
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-500' : field.required ? 'bg-red-500' : 'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : field.required ? (
                      <span className="text-white text-xs font-bold">!</span>
                    ) : null}
                  </div>
                  <span className={`text-sm flex-1 ${
                    isCompleted ? 'text-green-700' : field.required && !isCompleted ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {fieldConfig.label}
                    {field.required && !isCompleted && ' *'}
                  </span>
                </div>
              )
            })}
          </div>
          
          {getAllFields().length === 0 && (
            <p className="text-sm text-gray-500">No fields to sign</p>
          )}

          {/* Validation summary */}
          {!areRequiredFieldsCompleted() && getAllFields().some(field => field.required) && (
            <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
              <div className="flex items-center">
                <AlertCircle className="w-3 h-3 mr-1" />
                Complete all required fields (marked with *) to submit the document
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 