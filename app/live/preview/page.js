'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, X, Eye, CheckCircle, FileText, User, Calendar, PenTool, Loader2 } from 'lucide-react'

// Field type configurations (same as editor)
const FIELD_CONFIGS = {
  text: {
    icon: FileText,
    label: 'Text Field',
    color: '#3b82f6',
    bgColor: '#eff6ff'
  },
  signature: {
    icon: PenTool,
    label: 'Signature',
    color: '#10b981',
    bgColor: '#f0fdf4'
  },
  checkbox: {
    icon: CheckCircle,
    label: 'Checkbox',
    color: '#8b5cf6',
    bgColor: '#faf5ff'
  },
  date: {
    icon: Calendar,
    label: 'Date Field',
    color: '#f59e0b',
    bgColor: '#fffbeb'
  }
}

// Document Viewer Component (simplified for preview)
const DocumentViewer = ({ documentFile, children }) => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load document based on type
  const loadDocument = React.useCallback(async () => {
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

  // Load PDF using PDF.js
  const loadPdfDocument = async () => {
    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
      
      // Use backend file serving endpoint if we have document data with URL, otherwise use direct data
      let pdfSource
      if (documentFile.url && documentFile.url.includes('/api/documents/')) {
        // Already a backend URL
        pdfSource = documentFile.url
      } else if (documentFile.data) {
        // Use base64 data directly
        pdfSource = documentFile.data
      } else {
        // Use URL directly
        pdfSource = documentFile.url
      }
      
      const pdf = await pdfjsLib.getDocument(pdfSource).promise
      const pagePromises = []
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pagePromises.push(renderPdfPage(pdf, pageNum))
      }
      
      const renderedPages = await Promise.all(pagePromises)
      setPages(renderedPages)
    } catch (error) {
      throw new Error('Failed to load PDF')
    }
  }

  // Render PDF page to canvas
  const renderPdfPage = async (pdf, pageNum) => {
    const page = await pdf.getPage(pageNum)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    const scale = 2.0 // High quality scale
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
      originalWidth: viewport.width / scale,
      originalHeight: viewport.height / scale
    }
  }

  // Load image document
  const loadImageDocument = async () => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        
        const scale = 2.0
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
        
        setPages(pageData)
        resolve()
      }
      
      img.onerror = () => reject(new Error('Failed to load image'))
      
      // Use backend file serving endpoint if available, otherwise use direct data/url
      if (documentFile.url && documentFile.url.includes('/api/documents/')) {
        img.src = documentFile.url
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
    <div className="w-full h-full overflow-auto bg-gray-100">
      {pages.map((page) => {
        // Calculate display dimensions
        const availableWidth = Math.min(800, window.innerWidth - 32)
        const displayWidth = Math.min(page.originalWidth, availableWidth)
        const displayHeight = (page.originalHeight / page.originalWidth) * displayWidth
        
        return (
          <div
            key={page.pageNumber}
            data-page-number={page.pageNumber}
            className="relative bg-white shadow-lg mx-auto my-4"
            style={{
              width: displayWidth,
              height: displayHeight
            }}
          >
            {/* Document Canvas */}
            <canvas
              width={page.width}
              height={page.height}
              className="w-full h-full block"
              style={{
                width: '100%',
                height: '100%'
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

// Interactive Field Component for Preview (same as live view)
const FieldComponent = ({ 
  field, 
  containerWidth,
  containerHeight,
  onValueChange
}) => {
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const config = FIELD_CONFIGS[field.type]
  const Icon = config.icon
  
  const getBackgroundColor = (fieldType) => {
    switch (fieldType) {
      case 'text': return '#e0f2fe'
      case 'signature': return '#e8f5e8'
      case 'checkbox': return '#f3e8ff'
      case 'date': return '#fff7ed'
      default: return '#f5f5f5'
    }
  }

  // Calculate responsive position and size
  const fieldStyle = {
    position: 'absolute',
    left: `${field.leftPercent}%`,
    top: `${field.topPercent}%`,
    width: `${field.widthPercent}%`,
    height: `${field.heightPercent}%`,
    backgroundColor: getBackgroundColor(field.type),
    border: `2px solid ${config.color}`,
    borderRadius: '4px',
    zIndex: 10,
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  // Calculate responsive font size
  const fieldWidth = (containerWidth * field.widthPercent) / 100
  const fieldHeight = (containerHeight * field.heightPercent) / 100
  const fontSize = Math.max(10, Math.min(14, fieldHeight * 0.4))

  const handleSignatureClick = () => {
    setShowSignatureModal(true)
  }

  const handleSignatureSubmit = (name) => {
    onValueChange(field.id, name)
    setShowSignatureModal(false)
  }

  return (
    <>
      <div style={fieldStyle}>
        {field.type === 'text' && (
          <input
            type="text"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none text-gray-700 px-2"
            placeholder="Enter text..."
            style={{ fontSize: `${fontSize}px` }}
          />
        )}
        
        {field.type === 'checkbox' && (
          <input
            type="checkbox"
            checked={field.value || false}
            onChange={(e) => onValueChange(field.id, e.target.checked)}
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
        
        {field.type === 'date' && (
          <input
            type="date"
            value={field.value || ''}
            onChange={(e) => onValueChange(field.id, e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none text-gray-700 px-2"
            style={{ fontSize: `${fontSize}px` }}
          />
        )}
        
        {field.type === 'signature' && (
          <div 
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={handleSignatureClick}
          >
            {field.value ? (
              <div className="text-center">
                <div className="text-green-600 font-medium" style={{ fontSize: `${fontSize}px` }}>
                  ✓ {field.value}
                </div>
                <div className="text-xs text-gray-500">Click to change</div>
              </div>
            ) : (
              <>
                <Icon 
                  style={{ 
                    width: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5, 16)}px`,
                    height: `${Math.min(fieldWidth * 0.3, fieldHeight * 0.5, 16)}px`
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

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Add Your Signature</h3>
            <input
              type="text"
              placeholder="Type your full name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleSignatureSubmit(e.target.value.trim())
                }
              }}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSignatureModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  const input = e.target.closest('.bg-white').querySelector('input')
                  if (input.value.trim()) {
                    handleSignatureSubmit(input.value.trim())
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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

export default function PreviewPage() {
  const router = useRouter()
  const [previewData, setPreviewData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fieldValues, setFieldValues] = useState({})

  useEffect(() => {
    try {
      const data = sessionStorage.getItem('previewDocument')
      if (data) {
        const parsedData = JSON.parse(data)
        setPreviewData(parsedData)
        
        // Initialize field values
        const initialValues = {}
        parsedData.fields?.forEach(field => {
          initialValues[field.id] = field.value || ''
        })
        setFieldValues(initialValues)
      } else {
        // If no preview data, close the window/tab
        window.close()
      }
    } catch (error) {
      console.error('Error loading preview data:', error)
      window.close()
    } finally {
      setLoading(false)
    }
  }, [])

  const handleFieldValueChange = (fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No preview data found</p>
          <button
            onClick={() => window.close()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

    return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <Eye className="w-5 h-5 text-blue-600" />
          <h1 className="text-lg font-semibold text-gray-900">
            Preview: {previewData.title}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {previewData.fields?.length || 0} interactive fields
          </span>
          <button 
            onClick={() => window.close()}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {previewData.document && (
          <DocumentViewer documentFile={previewData.document}>
            {previewData.fields?.map((field) => (
              <FieldComponent
                key={field.id}
                field={{ ...field, value: fieldValues[field.id] || field.value }}
                pageNumber={field.pageNumber || 1}
                onValueChange={handleFieldValueChange}
              />
            ))}
          </DocumentViewer>
        )}
      </div>

      {/* Footer with Actions */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-600">
            This is how your document will appear to signers with {previewData.fields?.length || 0} interactive fields. Try filling them out!
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => window.close()}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close Preview
            </button>
                <button 
              onClick={() => {
                window.close()
                // The parent window should handle the send action
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Looks Good!
                </button>
              </div>
            </div>
          </div>
    </div>
  )
} 