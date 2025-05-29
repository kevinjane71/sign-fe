'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Document, Page, pdfjs } from 'react-pdf'
import { toast } from 'react-hot-toast'
import { CheckCircle, AlertCircle, FileText, User, Calendar, PenTool, Loader2, ArrowLeft } from 'lucide-react'
import '../[id]/page.css'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

export default function LiveViewPreview() {
  const router = useRouter()
  
  const [document, setDocument] = useState(null)
  const [fields, setFields] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)
  const [fieldValues, setFieldValues] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})
  const [documentDimensions, setDocumentDimensions] = useState({ width: 0, height: 0 })
  const [zoom, setZoom] = useState(1)
  const [signingStarted, setSigningStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const fieldRefs = useRef({})

  // Field type configurations
  const FIELD_CONFIGS = {
    signature: { icon: PenTool, label: 'Signature', color: '#8b5cf6' },
    text: { icon: FileText, label: 'Text', color: '#3b82f6' },
    checkbox: { icon: CheckCircle, label: 'Checkbox', color: '#10b981' },
    date: { icon: Calendar, label: 'Date', color: '#f59e0b' }
  }

  useEffect(() => {
    loadPreviewDocument()
  }, [])

  useEffect(() => {
    if (signingStarted && fields.length > 0) {
      focusCurrentField()
    }
  }, [currentFieldIndex, signingStarted])

  const loadPreviewDocument = () => {
    try {
      const liveViewDoc = sessionStorage.getItem('liveViewDocument')
      if (liveViewDoc) {
        const docData = JSON.parse(liveViewDoc)
        setDocument(docData)
        setFields(docData.fields || [])
        
        // Initialize field values
        const initialValues = {}
        docData.fields?.forEach(field => {
          initialValues[field.id] = field.value || ''
        })
        setFieldValues(initialValues)
      } else {
        toast.error('No preview document found')
        window.close()
      }
    } catch (error) {
      console.error('Error loading preview document:', error)
      toast.error('Failed to load preview document')
      window.close()
    } finally {
      setLoading(false)
    }
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
      return 'This field is required'
    }
    
    if (field.type === 'date' && value) {
      const date = new Date(value)
      if (isNaN(date.getTime())) {
        return 'Please enter a valid date'
      }
    }
    
    return null
  }

  const handleFieldChange = (fieldId, value) => {
    setFieldValues(prev => ({ ...prev, [fieldId]: value }))
    
    // Clear error when user starts typing
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
    
    // Move to next field
    const currentIndex = fields.findIndex(f => f.id === fieldId)
    if (currentIndex < fields.length - 1) {
      setCurrentFieldIndex(currentIndex + 1)
    }
  }

  const startSigning = () => {
    setSigningStarted(true)
    setCurrentFieldIndex(0)
    toast.success('Let\'s start signing! Fill in each field.')
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
    
    // Simulate submission for preview
    setTimeout(() => {
      setIsComplete(true)
      toast.success('Preview completed! This is how the signing process works.')
      setSubmitting(false)
    }, 1500)
  }

  const handleDocumentLoad = ({ numPages }) => {
    console.log(`Document loaded with ${numPages} pages`)
  }

  const handlePageLoad = ({ pageNumber, width, height, scale }) => {
    setDocumentDimensions({ width: width * scale, height: height * scale })
  }

  const getFieldProgress = () => {
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
      <div className="live-view-container">
        <div className="loading-state">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p>Loading preview...</p>
        </div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="live-view-container">
        <div className="error-state">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2>Preview Not Available</h2>
          <p>Unable to load the document preview.</p>
          <button onClick={() => window.close()} className="btn-primary mt-4">
            Close
          </button>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="live-view-container">
        <div className="success-state">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2>Preview Completed!</h2>
          <p>This is how the signing process works for your signers. You can now close this preview.</p>
          <button 
            onClick={() => window.close()}
            className="btn-primary mt-6"
          >
            Close Preview
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="live-view-container">
      {/* Preview Header */}
      <header className="live-header">
        <div className="header-content">
          <div className="document-info">
            <button 
              onClick={() => window.close()}
              className="mr-3 p-1 hover:bg-gray-100 rounded"
              title="Close preview"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="document-title">{document.name} (Preview)</span>
          </div>
          {signingStarted && (
            <div className="progress-info">
              <span className="progress-text">{getFieldProgress()}% Complete</span>
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
        {!signingStarted ? (
          <div className="start-screen">
            <div className="start-content">
              <div className="document-preview">
                <FileText className="w-16 h-16 text-blue-600 mb-4" />
                <h1>Live View Preview</h1>
                <p className="document-description">
                  This is how "{document.name}" will appear to your signers. This document contains {fields.length} field{fields.length !== 1 ? 's' : ''} that need to be completed.
                </p>
                
                <div className="field-summary">
                  <h3>Fields to complete:</h3>
                  <div className="field-list">
                    {fields.map((field, index) => {
                      const config = FIELD_CONFIGS[field.type]
                      const Icon = config.icon
                      return (
                        <div key={field.id} className="field-item">
                          <Icon className="w-4 h-4" style={{ color: config.color }} />
                          <span>{config.label}</span>
                          {field.required && <span className="required-indicator">*</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <button 
                  onClick={startSigning}
                  className="btn-primary btn-large"
                >
                  Start Preview
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="signing-view">
            {/* Document Viewer */}
            <div className="document-viewer">
              {document.data && document.data.startsWith('data:application/pdf') ? (
                <Document
                  file={document.data}
                  onLoadSuccess={handleDocumentLoad}
                  loading={
                    <div className="pdf-loading">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Loading PDF...</span>
                    </div>
                  }
                >
                  <Page
                    pageNumber={1}
                    scale={zoom}
                    onLoadSuccess={handlePageLoad}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              ) : (
                <div className="document-placeholder">
                  <FileText className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-600">Document Preview</p>
                  <p className="text-sm text-gray-500">{document.name}</p>
                </div>
              )}

              {/* Field Overlays */}
              <div className="field-overlays">
                {fields.map((field, index) => {
                  const config = FIELD_CONFIGS[field.type]
                  const Icon = config.icon
                  const isCurrentField = index === currentFieldIndex
                  const hasError = fieldErrors[field.id]
                  const isCompleted = isFieldComplete(field.id)
                  
                  return (
                    <div
                      key={field.id}
                      className={`field-overlay ${isCurrentField ? 'current' : ''} ${hasError ? 'error' : ''} ${isCompleted ? 'completed' : ''}`}
                      style={{
                        left: `${field.x * zoom}px`,
                        top: `${field.y * zoom}px`,
                        width: `${field.width * zoom}px`,
                        height: `${field.height * zoom}px`,
                      }}
                    >
                      {field.required && (
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
                          placeholder={field.placeholder || 'Enter text...'}
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
                        <label className="checkbox-label">
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
                          <span className="checkmark"></span>
                        </label>
                      )}
                      
                      {field.type === 'signature' && (
                        <div 
                          ref={el => fieldRefs.current[field.id] = el}
                          className="signature-field"
                          onClick={() => {
                            // Simplified signature for preview
                            const signature = 'John Doe'
                            handleFieldChange(field.id, signature)
                            handleFieldComplete(field.id)
                          }}
                        >
                          {fieldValues[field.id] ? (
                            <span className="signature-text">{fieldValues[field.id]}</span>
                          ) : (
                            <div className="signature-placeholder">
                              <PenTool className="w-4 h-4" />
                              <span>Click to sign</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {hasError && (
                        <div className="field-error">
                          {fieldErrors[field.id]}
                        </div>
                      )}
                      
                      {isCompleted && (
                        <div className="completion-indicator">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-section">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit() || submitting}
                className={`btn-submit ${canSubmit() ? 'enabled' : 'disabled'}`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Complete Preview'
                )}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="live-footer">
        <p>Live View Preview - Powered by SignFlow</p>
      </footer>
    </div>
  )
} 