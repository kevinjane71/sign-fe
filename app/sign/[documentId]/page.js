'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import SignatureCanvas from 'react-signature-canvas'
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
  Mail
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

const FIELD_TYPES = {
  TEXT: 'text',
  SIGNATURE: 'signature',
  CHECKBOX: 'checkbox',
  DATE: 'date'
}

export default function DocumentSigning() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const documentId = params.documentId
  const signerEmail = searchParams.get('signer')
  
  const [document, setDocument] = useState(null)
  const [signer, setSigner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [fieldValues, setFieldValues] = useState({})
  const [documentDimensions, setDocumentDimensions] = useState({ width: 0, height: 0 })
  const [showSignatureModal, setShowSignatureModal] = useState(false)
  const [currentSignatureField, setCurrentSignatureField] = useState(null)
  
  const documentRef = useRef(null)
  const signatureCanvasRef = useRef(null)

  // Load document data
  useEffect(() => {
    const loadDocument = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/sign/${documentId}?signer=${encodeURIComponent(signerEmail)}`)
        if (response.data.success) {
          setDocument(response.data.document)
          setSigner(response.data.signer)
          
          // Initialize field values
          const initialValues = {}
          response.data.document.fields?.forEach(field => {
            if (field.assignedTo === signerEmail) {
              initialValues[field.id] = ''
            }
          })
          setFieldValues(initialValues)
        } else {
          throw new Error('Failed to load document')
        }
      } catch (error) {
        console.error('Load document error:', error)
        toast.error('Failed to load document or unauthorized access')
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    if (documentId && signerEmail) {
      loadDocument()
    } else {
      toast.error('Invalid signing link')
      router.push('/')
    }
  }, [documentId, signerEmail, router])

  // Handle document image load to get dimensions
  const handleDocumentLoad = () => {
    if (documentRef.current) {
      const rect = documentRef.current.getBoundingClientRect()
      setDocumentDimensions({
        width: rect.width,
        height: rect.height
      })
    }
  }

  // Handle field value change
  const handleFieldChange = (fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  // Handle signature field click
  const handleSignatureClick = (field) => {
    setCurrentSignatureField(field)
    setShowSignatureModal(true)
  }

  // Save signature
  const saveSignature = () => {
    if (signatureCanvasRef.current && currentSignatureField) {
      const signatureData = signatureCanvasRef.current.toDataURL()
      handleFieldChange(currentSignatureField.id, signatureData)
      setShowSignatureModal(false)
      setCurrentSignatureField(null)
    }
  }

  // Clear signature
  const clearSignature = () => {
    if (signatureCanvasRef.current) {
      signatureCanvasRef.current.clear()
    }
  }

  // Submit signature
  const submitSignature = async () => {
    // Validate required fields
    const requiredFields = document.fields?.filter(field => 
      field.assignedTo === signerEmail && field.required
    ) || []

    const missingFields = requiredFields.filter(field => 
      !fieldValues[field.id] || fieldValues[field.id].trim() === ''
    )

    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setSubmitting(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/api/sign/${documentId}/submit`, {
        signerEmail: signerEmail,
        signatureData: fieldValues,
        fieldValues: fieldValues
      })

      if (response.data.success) {
        toast.success('Document signed successfully!')
        router.push(`/preview/${documentId}`)
      } else {
        throw new Error('Failed to submit signature')
      }
    } catch (error) {
      console.error('Submit signature error:', error)
      toast.error('Failed to submit signature')
    } finally {
      setSubmitting(false)
    }
  }

  // Get fields assigned to current signer
  const assignedFields = document?.fields?.filter(field => field.assignedTo === signerEmail) || []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading document...</p>
        </div>
      </div>
    )
  }

  if (!document || !signer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Document not found or unauthorized access</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {document.originalName}
                </h1>
                <p className="text-sm text-gray-500">
                  Please review and sign this document
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">{signer.name}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{signer.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Document Viewer */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <div className="relative inline-block">
                  <img
                    ref={documentRef}
                    src={document.fileUrl}
                    alt="Document"
                    className="max-w-full h-auto border border-gray-200 rounded"
                    onLoad={handleDocumentLoad}
                  />
                  
                  {/* Field Overlays */}
                  {assignedFields.map(field => {
                    const scaleX = documentDimensions.width / (document.originalWidth || documentDimensions.width)
                    const scaleY = documentDimensions.height / (document.originalHeight || documentDimensions.height)
                    
                    return (
                      <div
                        key={field.id}
                        className="absolute border-2 border-primary-500 bg-primary-50 bg-opacity-50"
                        style={{
                          left: field.x * scaleX,
                          top: field.y * scaleY,
                          width: field.width * scaleX,
                          height: field.height * scaleY,
                        }}
                      >
                        {field.type === FIELD_TYPES.TEXT && (
                          <input
                            type="text"
                            value={fieldValues[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full h-full px-2 text-sm border-none bg-transparent focus:outline-none focus:bg-white"
                            required={field.required}
                          />
                        )}
                        
                        {field.type === FIELD_TYPES.DATE && (
                          <input
                            type="date"
                            value={fieldValues[field.id] || ''}
                            onChange={(e) => handleFieldChange(field.id, e.target.value)}
                            className="w-full h-full px-2 text-sm border-none bg-transparent focus:outline-none focus:bg-white"
                            required={field.required}
                          />
                        )}
                        
                        {field.type === FIELD_TYPES.CHECKBOX && (
                          <div className="w-full h-full flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={fieldValues[field.id] || false}
                              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                              className="w-4 h-4"
                              required={field.required}
                            />
                          </div>
                        )}
                        
                        {field.type === FIELD_TYPES.SIGNATURE && (
                          <button
                            onClick={() => handleSignatureClick(field)}
                            className="w-full h-full flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors"
                          >
                            {fieldValues[field.id] ? (
                              <img 
                                src={fieldValues[field.id]} 
                                alt="Signature" 
                                className="max-w-full max-h-full object-contain"
                              />
                            ) : (
                              <div className="flex items-center space-x-2">
                                <PenTool className="w-4 h-4" />
                                <span className="text-sm">Click to sign</span>
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Signing Progress
              </h3>
              
              <div className="space-y-4">
                {assignedFields.map(field => {
                  const isCompleted = fieldValues[field.id] && fieldValues[field.id] !== ''
                  const fieldConfig = {
                    [FIELD_TYPES.TEXT]: { icon: Type, label: 'Text Field' },
                    [FIELD_TYPES.SIGNATURE]: { icon: PenTool, label: 'Signature' },
                    [FIELD_TYPES.CHECKBOX]: { icon: CheckSquare, label: 'Checkbox' },
                    [FIELD_TYPES.DATE]: { icon: Calendar, label: 'Date' }
                  }[field.type]
                  
                  const Icon = fieldConfig.icon
                  
                  return (
                    <div key={field.id} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          isCompleted ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {fieldConfig.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        <p className="text-xs text-gray-500">
                          {isCompleted ? 'Completed' : 'Required'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-8">
                <button
                  onClick={submitSignature}
                  disabled={submitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{submitting ? 'Submitting...' : 'Complete Signing'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Your Signature
            </h3>
            
            <div className="border border-gray-300 rounded-lg mb-4">
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
                className="btn-outline"
              >
                Clear
              </button>
              
              <div className="space-x-2">
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSignature}
                  className="btn-primary"
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