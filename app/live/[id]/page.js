'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { CheckCircle, AlertCircle, FileText, User, Calendar, PenTool, Loader2, ArrowLeft, Send, ArrowRight, Play } from 'lucide-react'
import axios from 'axios'
import DocumentViewer from '../../components/DocumentViewer'
import './page.css'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

export default function LiveView() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.id
  
  const [document, setDocument] = useState(null)
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)
  const [fieldValues, setFieldValues] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})
  const [zoom, setZoom] = useState(1)
  const [signingStarted, setSigningStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [signerInfo, setSignerInfo] = useState(null)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)
  
  const fieldRefs = useRef({})

  // Field type configurations
  const FIELD_CONFIGS = {
    signature: { icon: PenTool, label: 'Signature', color: '#8b5cf6' },
    text: { icon: FileText, label: 'Text', color: '#3b82f6' },
    checkbox: { icon: CheckCircle, label: 'Checkbox', color: '#10b981' },
    date: { icon: Calendar, label: 'Date', color: '#f59e0b' }
  }

  useEffect(() => {
    if (documentId) {
      loadDocument()
    }
  }, [documentId])

  useEffect(() => {
    if (signingStarted && fields.length > 0) {
      focusCurrentField()
    }
  }, [currentFieldIndex, signingStarted])

  const loadDocument = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Add better error handling for the API call
      const response = await axios.get(`${API_BASE_URL}/api/documents/${documentId}`, {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if (response.data && response.data.success && response.data.document) {
        const docData = response.data.document
        setDocument(docData)
        setFields(docData.fields || [])
        
        // Initialize field values
        const initialValues = {}
        if (docData.fields && Array.isArray(docData.fields)) {
          docData.fields.forEach(field => {
            initialValues[field.id] = field.value || ''
          })
        }
        setFieldValues(initialValues)
        
        // Set demo signer info
        if (docData.signers?.length > 0) {
          setSignerInfo(docData.signers[0])
        } else {
          setSignerInfo({
            name: 'Demo Signer',
            email: 'demo@example.com',
            role: 'sign'
          })
        }
      } else {
        throw new Error('Invalid document response')
      }
    } catch (error) {
      console.error('Error loading document:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to load document'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentLoad = ({ numPages }) => {
    setTotalPages(numPages)
  }

  const focusCurrentField = () => {
    const currentField = fields[currentFieldIndex]
    if (currentField && fieldRefs.current[currentField.id]) {
      fieldRefs.current[currentField.id].focus()
      fieldRefs.current[currentField.id].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  }

  const validateField = (field) => {
    const value = fieldValues[field.id]
    
    if (field.required && (!value || value.toString().trim() === '')) {
      return 'Required'
    }
    
    if (field.type === 'date' && value) {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        return 'Invalid date'
      }
    }
    
    return null
  }

  const handleFieldChange = (fieldId, value) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }))
    
    if (fieldErrors[fieldId]) {
      setFieldErrors(prev => ({ ...prev, [fieldId]: null }))
    }
  }

  const handleFieldComplete = (fieldId) => {
    const field = fields.find(f => f.id === fieldId)
    const error = validateField(field)
    
    if (error) {
      setFieldErrors(prev => ({ ...prev, [fieldId]: error }))
      return
    }
    
    const currentIndex = fields.findIndex(f => f.id === fieldId)
    if (currentIndex < fields.length - 1) {
      setCurrentFieldIndex(currentIndex + 1)
    }
  }

  const startSigning = () => {
    setSigningStarted(true)
    setCurrentFieldIndex(0)
    toast.success('Click on the highlighted fields to fill them out')
  }

  const goToField = (index) => {
    setCurrentFieldIndex(index)
    setSigningStarted(true)
  }

  const validateAllFields = () => {
    const errors = {}
    let hasErrors = false
    
    fields.forEach(field => {
      const error = validateField(field)
      if (error) {
        errors[field.id] = error
        hasErrors = true
      }
    })
    
    setFieldErrors(errors)
    return !hasErrors
  }

  const handleSubmit = async () => {
    if (!validateAllFields()) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setSubmitting(true)
    
    try {
      await axios.put(`${API_BASE_URL}/api/documents/${documentId}/fields`, {
        fields: fields.map(field => ({
          ...field,
          value: fieldValues[field.id] || field.value
        }))
      })
      
      setIsComplete(true)
      toast.success('Document signed successfully!')
      
    } catch (error) {
      console.error('Error submitting document:', error)
      toast.error('Failed to submit document')
    } finally {
      setSubmitting(false)
    }
  }

  const getFieldProgress = () => {
    if (fields.length === 0) return 0
    const completedFields = fields.filter(field => {
      const value = fieldValues[field.id]
      return value && value.toString().trim() !== ''
    }).length
    
    return Math.round((completedFields / fields.length) * 100)
  }

  const isFieldComplete = (fieldId) => {
    const value = fieldValues[fieldId]
    return value && value.toString().trim() !== ''
  }

  const canSubmit = () => {
    return fields.every(field => {
      if (!field.required) return true
      const value = fieldValues[field.id]
      return value && value.toString().trim() !== ''
    })
  }

  if (loading) {
    return (
      <div className="live-container">
        <div className="loading-state">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p>Loading document...</p>
        </div>
      </div>
    )
  }

  if (error || !document) {
    return (
      <div className="live-container">
        <div className="error-state">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2>Document Not Available</h2>
          <p>{error || 'Unable to load the document.'}</p>
          <button onClick={() => router.push('/dashboard')} className="btn-primary mt-4">
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="live-container">
        <div className="success-state">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2>Document Signed!</h2>
          <p>Thank you for signing "{document.originalName}"</p>
          <div className="completion-details">
            <p><strong>Signed by:</strong> {signerInfo?.name}</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
          <button 
            onClick={() => router.push('/dashboard')}
            className="btn-primary mt-4"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="live-container">
      {/* Compact Header */}
      <header className="live-header">
        <div className="header-content">
          <div className="doc-info">
            <FileText className="w-4 h-4 text-gray-600" />
            <span className="doc-title">{document.originalName}</span>
          </div>
          {signingStarted && fields.length > 0 && (
            <div className="progress-info">
              <span className="progress-text">{getFieldProgress()}%</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getFieldProgress()}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="live-main">
        {/* Left Panel - Start Button & Field List */}
        <div className="left-panel">
          {!signingStarted ? (
            <div className="start-section">
              <button 
                onClick={startSigning}
                className="start-btn"
              >
                <Play className="w-4 h-4" />
                Start
              </button>
              <div className="field-count">
                {fields.length} field{fields.length !== 1 ? 's' : ''}
              </div>
            </div>
          ) : (
            <div className="field-nav">
              <div className="field-list">
                {fields.map((field, index) => {
                  const config = FIELD_CONFIGS[field.type]
                  const Icon = config.icon
                  const isCurrentField = index === currentFieldIndex
                  const isCompleted = isFieldComplete(field.id)
                  const hasError = fieldErrors[field.id]
                  
                  return (
                    <button
                      key={field.id}
                      onClick={() => goToField(index)}
                      className={`field-nav-item ${isCurrentField ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${hasError ? 'error' : ''}`}
                    >
                      <Icon className="w-3 h-3" style={{ color: config.color }} />
                      <span className="field-label">{config.label}</span>
                      {field.required && <span className="required">*</span>}
                      {isCompleted && <CheckCircle className="w-3 h-3 text-green-500" />}
                      {isCurrentField && <ArrowRight className="w-3 h-3 text-blue-500" />}
                    </button>
                  )
                })}
              </div>
              
              {canSubmit() && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="submit-btn"
                >
                  {submitting ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Send className="w-3 h-3" />
                  )}
                  Submit
                </button>
              )}
            </div>
          )}
        </div>

        {/* Document Viewer */}
        <div className="document-section">
          <DocumentViewer
            fileUrl={`${API_BASE_URL}/api/documents/${documentId}/file`}
            mimeType={document.mimeType}
            onDocumentLoad={handleDocumentLoad}
            zoom={zoom}
            onZoomChange={setZoom}
            className="document-viewer"
          >
            {/* Field Overlays */}
            {signingStarted && fields.map((field, index) => {
              const isCurrentField = index === currentFieldIndex
              const hasError = fieldErrors[field.id]
              const isCompleted = isFieldComplete(field.id)
              
              return (
                <div
                  key={field.id}
                  pageNumber={field.pageNumber || 1}
                  className={`field-overlay ${isCurrentField ? 'current' : ''} ${hasError ? 'error' : ''} ${isCompleted ? 'completed' : ''}`}
                  style={{
                    left: `${field.x}px`,
                    top: `${field.y}px`,
                    width: `${field.width}px`,
                    height: `${field.height}px`,
                  }}
                >
                  {field.required && !isCompleted && (
                    <div className="required-indicator">*</div>
                  )}
                  
                  {field.type === 'text' && (
                    <input
                      ref={el => fieldRefs.current[field.id] = el}
                      type="text"
                      value={fieldValues[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      onBlur={() => handleFieldComplete(field.id)}
                      onKeyPress={(e) => e.key === 'Enter' && handleFieldComplete(field.id)}
                      className="field-input"
                      placeholder="Enter text..."
                    />
                  )}
                  
                  {field.type === 'date' && (
                    <input
                      ref={el => fieldRefs.current[field.id] = el}
                      type="date"
                      value={fieldValues[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      onBlur={() => handleFieldComplete(field.id)}
                      className="field-input"
                    />
                  )}
                  
                  {field.type === 'checkbox' && (
                    <label className="checkbox-container">
                      <input
                        ref={el => fieldRefs.current[field.id] = el}
                        type="checkbox"
                        checked={fieldValues[field.id] || false}
                        onChange={(e) => {
                          handleFieldChange(field.id, e.target.checked)
                          handleFieldComplete(field.id)
                        }}
                        className="field-checkbox"
                      />
                    </label>
                  )}
                  
                  {field.type === 'signature' && (
                    <div 
                      ref={el => fieldRefs.current[field.id] = el}
                      className="signature-field"
                      onClick={() => {
                        const signature = signerInfo?.name || 'Signature'
                        handleFieldChange(field.id, signature)
                        handleFieldComplete(field.id)
                      }}
                    >
                      {fieldValues[field.id] ? (
                        <span className="signature-text">
                          {fieldValues[field.id]}
                        </span>
                      ) : (
                        <div className="signature-placeholder">
                          <PenTool className="w-3 h-3" />
                          <span>Sign</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {hasError && (
                    <div className="field-error">{fieldErrors[field.id]}</div>
                  )}
                  
                  {isCompleted && (
                    <div className="completion-indicator">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  )}
                </div>
              )
            })}
          </DocumentViewer>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="live-footer">
        <p>Secure Document Signing</p>
      </footer>
    </div>
  )
} 