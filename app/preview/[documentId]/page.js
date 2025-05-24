'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  PenTool,
  Type,
  CheckSquare,
  Calendar,
  User,
  Mail,
  Clock,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import DocumentViewer from '../../components/DocumentViewer'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

const FIELD_TYPES = {
  text: { label: 'Text Field', icon: Type, color: 'blue' },
  signature: { label: 'Signature', icon: PenTool, color: 'purple' },
  checkbox: { label: 'Checkbox', icon: CheckSquare, color: 'green' },
  date: { label: 'Date', icon: Calendar, color: 'orange' }
}

export default function DocumentPreview() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const documentId = params.documentId
  const signerEmail = searchParams.get('signer')
  
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentSigner, setCurrentSigner] = useState(null)
  const [fieldValues, setFieldValues] = useState({})
  const [signatureData, setSignatureData] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [documentDimensions, setDocumentDimensions] = useState({ width: 0, height: 0 })
  const [showFieldsOnly, setShowFieldsOnly] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [pageOffsets, setPageOffsets] = useState([])
  
  const documentRef = useRef(null)
  const pageRefs = useRef([])
  const signatureCanvasRef = useRef(null)

  // Load document data
  useEffect(() => {
    loadDocument()
  }, [documentId])

  // Calculate page offsets when document loads
  useEffect(() => {
    if (document && document.pages) {
      calculatePageOffsets()
    }
  }, [document])

  const loadDocument = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/documents/${documentId}`)
      
      if (response.data.success) {
        const docData = response.data.document
        setDocument(docData)
        
        // Initialize field values
        const initialValues = {}
        docData.fields?.forEach(field => {
          initialValues[field.id] = field.value || ''
        })
        setFieldValues(initialValues)
        
        // Set current signer (for demo, using first signer)
        if (docData.signers?.length > 0) {
          setCurrentSigner(docData.signers[0])
        }
      } else {
        toast.error('Document not found')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Load document error:', error)
      toast.error('Failed to load document')
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  // Calculate page offsets for field positioning
  const calculatePageOffsets = () => {
    if (!pageRefs.current.length) return

    const offsets = []
    let currentOffset = 0

    pageRefs.current.forEach((pageRef, index) => {
      offsets[index] = currentOffset
      if (pageRef) {
        const rect = pageRef.getBoundingClientRect()
        currentOffset += rect.height + 20 // 20px gap between pages
      }
    })

    setPageOffsets(offsets)
  }

  // Update field value
  const updateFieldValue = (fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }))
    
    // Clear validation error when user starts typing
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldId]
        return newErrors
      })
    }
  }

  // Validate required fields
  const validateFields = () => {
    const errors = {}
    const requiredFields = document.fields?.filter(field => 
      field.required && 
      (!field.assignedTo || field.assignedTo === currentSigner?.id)
    ) || []

    requiredFields.forEach(field => {
      const value = fieldValues[field.id]
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[field.id] = `${FIELD_TYPES[field.type]?.label || 'Field'} is required`
      }
    })

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Submit signature
  const submitSignature = async () => {
    if (!validateFields()) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      setSubmitting(true)
      
      // Update field values
      await axios.put(`${API_BASE_URL}/api/documents/${documentId}/fields`, {
        fields: document.fields.map(field => ({
          ...field,
          value: fieldValues[field.id] || field.value
        }))
      })

      // Mark as signed by current signer
      if (currentSigner) {
        const updatedSigners = document.signers.map(signer => 
          signer.id === currentSigner.id 
            ? { ...signer, signed: true, signedAt: new Date().toISOString() }
            : signer
        )

        await axios.put(`${API_BASE_URL}/api/documents/${documentId}/signers`, {
          signers: updatedSigners
        })

        // Check if all signers have signed
        const allSigned = updatedSigners.every(s => s.signed)
        if (allSigned) {
          await axios.put(`${API_BASE_URL}/api/documents/${documentId}/status`, {
            status: 'completed'
          })
        } else {
          await axios.put(`${API_BASE_URL}/api/documents/${documentId}/status`, {
            status: 'partially_signed'
          })
        }
      }

      toast.success('Document signed successfully!')
      router.push('/dashboard')
    } catch (error) {
      console.error('Submit error:', error)
      toast.error('Failed to submit signature')
    } finally {
      setSubmitting(false)
    }
  }

  // Render field for preview/filling
  const renderField = (field) => {
    const fieldConfig = FIELD_TYPES[field.type]
    const value = fieldValues[field.id] || ''
    const hasError = validationErrors[field.id]
    const isAssignedToCurrentSigner = !field.assignedTo || field.assignedTo === currentSigner?.id
    const isReadOnly = !isAssignedToCurrentSigner || document.status === 'completed'

    if (showFieldsOnly && !isAssignedToCurrentSigner) {
      return null
    }

    return (
      <div
        key={field.id}
        pageNumber={field.pageNumber}
        className={`absolute ${hasError ? 'ring-2 ring-red-500' : ''}`}
        style={{
          left: field.x,
          top: field.y,
          width: field.width,
          height: field.height,
          zIndex: 10
        }}
      >
        {field.type === 'text' && (
          <input
            type="text"
            value={value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            placeholder={field.placeholder}
            readOnly={isReadOnly}
            className={`w-full h-full px-2 py-1 text-sm border-2 rounded ${
              hasError 
                ? 'border-red-500 bg-red-50' 
                : isReadOnly 
                  ? 'border-gray-300 bg-gray-50' 
                  : 'border-blue-400 bg-blue-50 focus:border-blue-600 focus:bg-white'
            } ${isReadOnly ? 'cursor-not-allowed' : ''}`}
          />
        )}

        {field.type === 'signature' && (
          <div className={`w-full h-full border-2 rounded flex items-center justify-center ${
            hasError 
              ? 'border-red-500 bg-red-50' 
              : isReadOnly 
                ? 'border-gray-300 bg-gray-50' 
                : 'border-purple-400 bg-purple-50'
          }`}>
            {value ? (
              <div className="text-purple-700 font-signature text-lg">
                {value}
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-purple-600">
                <PenTool className="w-4 h-4" />
                <span className="text-xs">
                  {isReadOnly ? 'Signature Required' : 'Click to Sign'}
                </span>
              </div>
            )}
            {!isReadOnly && (
              <input
                type="text"
                value={value}
                onChange={(e) => updateFieldValue(field.id, e.target.value)}
                placeholder="Type your signature"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            )}
          </div>
        )}

        {field.type === 'checkbox' && (
          <label className={`flex items-center justify-center w-full h-full cursor-pointer ${
            isReadOnly ? 'cursor-not-allowed' : ''
          }`}>
            <input
              type="checkbox"
              checked={value === 'true' || value === true}
              onChange={(e) => updateFieldValue(field.id, e.target.checked)}
              disabled={isReadOnly}
              className={`w-5 h-5 text-green-600 border-2 rounded ${
                hasError ? 'border-red-500' : 'border-green-400'
              } ${isReadOnly ? 'opacity-50' : ''}`}
            />
          </label>
        )}

        {field.type === 'date' && (
          <input
            type="date"
            value={value}
            onChange={(e) => updateFieldValue(field.id, e.target.value)}
            readOnly={isReadOnly}
            className={`w-full h-full px-2 py-1 text-sm border-2 rounded ${
              hasError 
                ? 'border-red-500 bg-red-50' 
                : isReadOnly 
                  ? 'border-gray-300 bg-gray-50' 
                  : 'border-orange-400 bg-orange-50 focus:border-orange-600 focus:bg-white'
            } ${isReadOnly ? 'cursor-not-allowed' : ''}`}
          />
        )}

        {/* Field label */}
        <div className={`absolute -top-6 left-0 text-xs font-medium ${
          hasError ? 'text-red-600' : `text-${fieldConfig.color}-600`
        }`}>
          {field.placeholder}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </div>

        {/* Error message */}
        {hasError && (
          <div className="absolute -bottom-6 left-0 text-xs text-red-600">
            {validationErrors[field.id]}
          </div>
        )}
      </div>
    )
  }

  // Get signing progress
  const getSigningProgress = () => {
    if (!document.signers || document.signers.length === 0) {
      return { signed: 0, total: 0, percentage: 0 }
    }
    
    const signed = document.signers.filter(s => s.signed).length
    const total = document.signers.length
    const percentage = Math.round((signed / total) * 100)
    
    return { signed, total, percentage }
  }

  const handleDocumentLoad = ({ numPages }) => {
    console.log(`Document loaded with ${numPages} pages`)
  }

  const handlePageLoad = ({ pageNumber, width, height, scale }) => {
    setDocumentDimensions({ width: width * scale, height: height * scale })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Document</h2>
          <p className="text-gray-600">Please wait while we load your document...</p>
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
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Document Not Found</h2>
          <p className="text-gray-600 mb-4">The document you're looking for doesn't exist or has been deleted.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const progress = getSigningProgress()
  const isCompleted = document.status === 'completed'
  const canSign = currentSigner && !currentSigner.signed && !isCompleted

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {document.originalName}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    {document.fields?.length || 0} fields
                  </span>
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {progress.signed}/{progress.total} signed
                  </span>
                  {isCompleted && (
                    <span className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFieldsOnly(!showFieldsOnly)}
                className="btn-secondary flex items-center space-x-2"
              >
                {showFieldsOnly ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{showFieldsOnly ? 'Show All Fields' : 'Show My Fields Only'}</span>
              </button>
              
              {canSign && (
                <button
                  onClick={submitSignature}
                  disabled={submitting}
                  className="btn-primary flex items-center space-x-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <PenTool className="w-4 h-4" />
                  )}
                  <span>{submitting ? 'Signing...' : 'Sign Document'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Document Info */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Document Status */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Document Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">
                  {progress.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                {progress.signed} of {progress.total} signers completed
              </div>
            </div>
          </div>

          {/* Current Signer */}
          {currentSigner && (
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Current Signer</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{currentSigner.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{currentSigner.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {currentSigner.signed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">Signed</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-orange-600">Pending</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* All Signers */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-900 mb-3">All Signers</h3>
            <div className="space-y-3">
              {document.signers?.map((signer, index) => (
                <div key={signer.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Signer {index + 1}
                    </span>
                    {signer.signed ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">{signer.name}</div>
                    <div className="text-xs text-gray-500">{signer.email}</div>
                    {signer.signedAt && (
                      <div className="text-xs text-gray-500">
                        Signed: {new Date(signer.signedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Fields Summary */}
          {canSign && (
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Required Fields</h3>
              <div className="space-y-2">
                {document.fields?.filter(field => 
                  field.required && 
                  (!field.assignedTo || field.assignedTo === currentSigner?.id)
                ).map(field => {
                  const fieldConfig = FIELD_TYPES[field.type]
                  const isFilled = fieldValues[field.id] && fieldValues[field.id].toString().trim() !== ''
                  
                  return (
                    <div key={field.id} className="flex items-center space-x-2">
                      {isFilled ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <fieldConfig.icon className={`w-4 h-4 text-${fieldConfig.color}-500`} />
                      <span className="text-sm text-gray-700">{field.placeholder}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Main Document Viewer */}
        <div className="flex-1 overflow-hidden">
          <DocumentViewer
            fileUrl={`${API_BASE_URL}/api/documents/${documentId}/file`}
            mimeType={document.mimeType}
            onDocumentLoad={handleDocumentLoad}
            onPageLoad={handlePageLoad}
            zoom={zoom}
            onZoomChange={setZoom}
            className="h-full"
          >
            {/* Field Overlays */}
            {document.fields?.map(renderField)}
          </DocumentViewer>
        </div>
      </div>
    </div>
  )
} 