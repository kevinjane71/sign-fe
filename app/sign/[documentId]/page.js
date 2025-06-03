'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Document, Page, pdfjs } from 'react-pdf'
import { 
  CheckCircle,
  PenTool,
  Type,
  Calendar,
  CheckSquare,
  Save,
  Loader2,
  FileText,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react'
import toast from 'react-hot-toast'
import SignatureCanvas from 'react-signature-canvas'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function SignDocumentPage({ params }) {
  const { documentId } = params
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const signer = searchParams.get('signer')
  const token = searchParams.get('token')
  
  const signatureCanvasRef = useRef(null)
  
  // State management
  const [document, setDocument] = useState(null)
  const [signerInfo, setSignerInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [currentSignatureField, setCurrentSignatureField] = useState(null)
  const [fieldValues, setFieldValues] = useState({})
  const [scale, setScale] = useState(1.2)
  const [pageSize, setPageSize] = useState({ width: 0, height: 0 })

  // Check for required parameters
  useEffect(() => {
    if (!signer || !token) {
      setError('Missing required access parameters. Please use the link from your email.')
      setLoading(false)
      return
    }
    
    loadDocument()
  }, [documentId, signer, token])

  const loadDocument = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('🔍 Loading document:', documentId)
      console.log('�� Signer:', signer)
      console.log('🔐 Token provided:', !!token)

      const response = await fetch(
        `http://localhost:5002/api/sign/${documentId}?signer=${encodeURIComponent(signer)}&token=${encodeURIComponent(token)}`, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || errorData.error || 'Failed to load document')
      }

      const data = await response.json()
      console.log('✅ Document loaded:', data)

      setDocument(data.document)
      setSignerInfo(data.signer)
      
      // Initialize field values from existing signatures
      if (data.signer.fieldValues) {
        setFieldValues(data.signer.fieldValues)
      }

    } catch (err) {
      console.error('❌ Load document error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getCurrentFile = () => {
    if (!document?.files || document.files.length === 0) {
      // Legacy single file support
      return {
        fileId: 'main',
        originalName: document?.originalName || 'Document',
        title: document?.title || 'Document',
        mimeType: document?.mimeType || 'application/pdf',
        fields: document?.fields || []
      }
    }
    
    return document.files[currentFileIndex] || null
  }

  const getCurrentFileUrl = () => {
    const currentFile = getCurrentFile()
    if (!currentFile) return null
    
    // Use public signing endpoint with token
    return `http://localhost:5002/api/sign/${documentId}/file/${currentFile.fileId}?signer=${encodeURIComponent(signer)}&token=${encodeURIComponent(token)}`
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('📄 PDF loaded with', numPages, 'pages')
    setNumPages(numPages)
    setCurrentPageIndex(0)
  }

  const onPageLoadSuccess = (page) => {
    const { width, height } = page
    setPageSize({ width, height })
    console.log('📏 Page size:', width, 'x', height)
  }

  const getFieldsForCurrentPage = () => {
    const currentFile = getCurrentFile()
    if (!currentFile?.fields) return []
    
    return currentFile.fields.filter(field => field.page === currentPageIndex + 1)
  }

  const handleFieldChange = (fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const handleSignatureClick = (field) => {
    setCurrentSignatureField(field)
    setShowSignatureModal(true)
  }

  const saveSignature = () => {
    if (!signatureCanvasRef.current || !currentSignatureField) return

    const signatureDataURL = signatureCanvasRef.current.toDataURL()
    handleFieldChange(currentSignatureField.id, signatureDataURL)
    setShowSignatureModal(false)
    setCurrentSignatureField(null)
    signatureCanvasRef.current.clear()
  }

  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear()
    }
  }

  const renderField = (field) => {
    const fieldValue = fieldValues[field.id] || ''
    
    // Calculate position based on page size and scale
    const left = (field.x / 100) * pageSize.width * scale
    const top = (field.y / 100) * pageSize.height * scale
    const width = (field.width / 100) * pageSize.width * scale
    const height = (field.height / 100) * pageSize.height * scale

    const baseStyle = {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      zIndex: 10,
      border: '2px solid #4F46E5',
      borderRadius: '4px',
      background: 'rgba(79, 70, 229, 0.1)',
    }

    switch (field.type) {
      case 'text':
        return (
          <input
            key={field.id}
            type="text"
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder || 'Enter text'}
            style={{
              ...baseStyle,
              padding: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        )

      case 'signature':
        return (
          <div
            key={field.id}
            onClick={() => handleSignatureClick(field)}
            style={{
              ...baseStyle,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: '#4F46E5',
              fontWeight: 'bold',
              textAlign: 'center',
              background: fieldValue ? 'rgba(34, 197, 94, 0.1)' : 'rgba(79, 70, 229, 0.1)',
              border: fieldValue ? '2px solid #22C55E' : '2px solid #4F46E5',
            }}
          >
            {fieldValue ? (
              <img
                src={fieldValue}
                alt="Signature"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              'Click to Sign'
            )}
          </div>
        )

      case 'checkbox':
        return (
          <input
            key={field.id}
            type="checkbox"
            checked={fieldValue === 'true'}
            onChange={(e) => handleFieldChange(field.id, e.target.checked.toString())}
            style={{
              ...baseStyle,
              width: '20px',
              height: '20px',
              margin: 'auto',
            }}
          />
        )

      case 'date':
        return (
          <input
            key={field.id}
            type="date"
            value={fieldValue}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            style={{
              ...baseStyle,
              padding: '8px',
              fontSize: '14px',
              outline: 'none',
            }}
          />
        )

      default:
        return null
    }
  }

  const validateFields = () => {
    const currentFile = getCurrentFile()
    if (!currentFile?.fields) return true

    const requiredFields = currentFile.fields.filter(field => field.required)
    const missingFields = requiredFields.filter(field => !fieldValues[field.id])

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.map(f => f.placeholder || f.type).join(', ')}`)
      return false
    }

    return true
  }

  const submitSignature = async () => {
    if (!validateFields()) return

    try {
      setIsSubmitting(true)

      // Get signature data - use the first signature field value as the main signature
      const signatureField = getCurrentFile()?.fields?.find(f => f.type === 'signature')
      const signatureData = signatureField ? fieldValues[signatureField.id] : null

      if (!signatureData) {
        toast.error('Please provide your signature before submitting')
        return
      }

      const response = await fetch(`http://localhost:5002/api/sign/${documentId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signerEmail: signer,
          signatureData: signatureData,
          fieldValues: fieldValues,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit signature')
      }

      const result = await response.json()
      console.log('✅ Signature submitted:', result)

      toast.success('Signature submitted successfully!')
      
      // Redirect to completion page
      setTimeout(() => {
        router.push('/sign-complete')
      }, 2000)

    } catch (err) {
      console.error('❌ Submit signature error:', err)
      toast.error(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigateFile = (direction) => {
    if (!document?.files) return
    
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentFileIndex - 1)
      : Math.min(document.files.length - 1, currentFileIndex + 1)
    
    setCurrentFileIndex(newIndex)
    setCurrentPageIndex(0) // Reset to first page of new file
  }

  const navigatePage = (direction) => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, currentPageIndex - 1)
      : Math.min(numPages - 1, currentPageIndex + 1)
    
    setCurrentPageIndex(newIndex)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading document...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Access Error</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <p className="text-sm text-red-500">
              Please check your email for the correct signing link or contact the document sender.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Document not found</p>
        </div>
      </div>
    )
  }

  const currentFile = getCurrentFile()
  const fileUrl = getCurrentFileUrl()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                {document.title || 'Document Signing'}
              </h1>
              <p className="text-sm text-gray-500">
                Signing as: {signer}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {document.files && document.files.length > 1 && (
                <span className="text-sm text-gray-500">
                  File {currentFileIndex + 1} of {document.files.length}
                </span>
              )}
              {numPages > 1 && (
                <span className="text-sm text-gray-500">
                  Page {currentPageIndex + 1} of {numPages}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Document Viewer */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Navigation Controls */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-4">
                  {document.files && document.files.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateFile('prev')}
                        disabled={currentFileIndex === 0}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                      >
                        ← Previous File
                      </button>
                      <button
                        onClick={() => navigateFile('next')}
                        disabled={currentFileIndex === document.files.length - 1}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                      >
                        Next File →
                      </button>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  {numPages > 1 && (
                    <>
                      <button
                        onClick={() => navigatePage('prev')}
                        disabled={currentPageIndex === 0}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                      >
                        ← Previous Page
                      </button>
                      <button
                        onClick={() => navigatePage('next')}
                        disabled={currentPageIndex === numPages - 1}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
                      >
                        Next Page →
                      </button>
                    </>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                      className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="text-sm text-gray-600">
                      {Math.round(scale * 100)}%
                    </span>
                    <button
                      onClick={() => setScale(Math.min(2, scale + 0.1))}
                      className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Document Display */}
              <div className="p-4">
                <div className="flex justify-center">
                  <div className="relative">
                    {currentFile?.mimeType?.includes('pdf') ? (
                      <Document
                        file={fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) => {
                          console.error('PDF load error:', error)
                          toast.error('Failed to load PDF')
                        }}
                      >
                        <Page
                          pageNumber={currentPageIndex + 1}
                          scale={scale}
                          onLoadSuccess={onPageLoadSuccess}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                        
                        {/* Render form fields on top of PDF */}
                        {getFieldsForCurrentPage().map(renderField)}
                      </Document>
                    ) : (
                      <div className="relative">
                        <img
                          src={fileUrl}
                          alt={currentFile?.originalName}
                          style={{ 
                            width: `${pageSize.width * scale}px`,
                            height: 'auto'
                          }}
                          onLoad={(e) => {
                            setPageSize({ 
                              width: e.target.naturalWidth, 
                              height: e.target.naturalHeight 
                            })
                            setNumPages(1)
                          }}
                        />
                        
                        {/* Render form fields on top of image */}
                        {getFieldsForCurrentPage().map(renderField)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Signing Progress
              </h3>
              
              {currentFile && (
                <>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Current File: {currentFile.title || currentFile.originalName}
                    </h4>
                    <div className="text-sm text-gray-500">
                      {getFieldsForCurrentPage().length} fields on this page
                    </div>
                  </div>

                  {/* Field Summary */}
                  <div className="space-y-2 mb-6">
                    {currentFile.fields?.map(field => {
                      const isCompleted = fieldValues[field.id]
                      return (
                        <div key={field.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {field.placeholder || field.type} {field.required && '*'}
                          </span>
                          <span className={isCompleted ? 'text-green-600' : 'text-gray-400'}>
                            {isCompleted ? '✓' : '○'}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                onClick={submitSignature}
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Signature'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add Your Signature</h3>
            
            <div className="border border-gray-300 rounded mb-4">
              <SignatureCanvas
                ref={signatureCanvasRef}
                canvasProps={{
                  width: 400,
                  height: 200,
                  className: 'signature-canvas'
                }}
              />
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={clearSignature}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
              >
                Clear
              </button>
              <div className="space-x-2">
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSignature}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Signature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 