'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  Upload, 
  Type, 
  PenTool, 
  CheckSquare, 
  Calendar,
  Plus,
  Trash2,
  Users,
  Send,
  Eye,
  Save,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Loader2,
  AlertCircle,
  X,
  Menu,
  FileText
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import DocumentViewer from '../../components/DocumentViewer'
import SignerModal from '../../components/SignerModal'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

const FIELD_TYPES = {
  text: { label: 'Text Field', icon: Type, color: 'blue' },
  signature: { label: 'Signature', icon: PenTool, color: 'purple' },
  checkbox: { label: 'Checkbox', icon: CheckSquare, color: 'green' },
  date: { label: 'Date', icon: Calendar, color: 'orange' }
}

export default function DocumentEditor() {
  const router = useRouter()
  const params = useParams()
  const documentId = params.documentId
  
  const [document, setDocument] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedFieldType, setSelectedFieldType] = useState('text')
  const [fields, setFields] = useState([])
  const [signers, setSigners] = useState([])
  const [zoom, setZoom] = useState(1)
  const [draggedField, setDraggedField] = useState(null)
  const [resizingField, setResizingField] = useState(null)
  const [showSignerModal, setShowSignerModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)
  const [pageOffsets, setPageOffsets] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [documentDimensions, setDocumentDimensions] = useState({ width: 0, height: 0 })
  const [totalPages, setTotalPages] = useState(1)
  
  const documentRef = useRef(null)
  const pageRefs = useRef([])
  const documentContainerRef = useRef(null)

  // Load document data
  useEffect(() => {
    if (documentId && documentId !== 'new') {
      loadDocument()
    } else {
      setLoading(false)
    }
  }, [documentId])

  // Calculate page offsets when document loads
  useEffect(() => {
    if (document && document.pages) {
      calculatePageOffsets()
    }
  }, [document, zoom])

  const loadDocument = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/api/documents/${documentId}`)
      
      if (response.data.success) {
        const docData = response.data.document
        setDocument(docData)
        setFields(docData.fields || [])
        setSigners(docData.signers || [])
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

  // Save document
  const saveDocument = async () => {
    if (!document) return

    try {
      setSaving(true)
      
      // Update fields
      await axios.put(`${API_BASE_URL}/api/documents/${documentId}/fields`, {
        fields: fields
      })

      // Update signers
      await axios.put(`${API_BASE_URL}/api/documents/${documentId}/signers`, {
        signers: signers
      })

      toast.success('Document saved successfully')
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save document')
    } finally {
      setSaving(false)
    }
  }

  // Add field to document
  const addField = (e) => {
    if (!document) return

    // Get the page container that was clicked
    const pageElement = e.target.closest('[data-page-number]')
    if (!pageElement) return

    const pageNumber = parseInt(pageElement.getAttribute('data-page-number'))
    const pageRect = pageElement.getBoundingClientRect()
    
    const x = e.clientX - pageRect.left
    const y = e.clientY - pageRect.top

    const newField = {
      id: Date.now().toString(),
      type: selectedFieldType,
      x: Math.max(0, x - 50),
      y: Math.max(0, y - 15),
      width: 100,
      height: 30,
      pageNumber: pageNumber,
      required: true,
      placeholder: `${FIELD_TYPES[selectedFieldType].label}`,
      assignedTo: signers.length > 0 ? signers[0].id : null
    }

    setFields([...fields, newField])
  }

  // Delete field
  const deleteField = (fieldId) => {
    setFields(fields.filter(f => f.id !== fieldId))
  }

  // Update field
  const updateField = (fieldId, updates) => {
    setFields(fields.map(f => f.id === fieldId ? { ...f, ...updates } : f))
  }

  // Handle field drag
  const handleFieldMouseDown = (e, field) => {
    e.stopPropagation()
    setDraggedField({
      ...field,
      startX: e.clientX - field.x,
      startY: e.clientY - field.y
    })
  }

  const handleMouseMove = (e) => {
    if (draggedField) {
      // Get the page container
      const pageElement = e.target.closest('[data-page-number]')
      if (!pageElement) return

      const pageNumber = parseInt(pageElement.getAttribute('data-page-number'))
      const pageRect = pageElement.getBoundingClientRect()
      
      const newX = e.clientX - draggedField.startX
      const newY = e.clientY - draggedField.startY

      updateField(draggedField.id, {
        x: Math.max(0, newX - pageRect.left),
        y: Math.max(0, newY - pageRect.top),
        pageNumber: pageNumber
      })
    }
  }

  const handleMouseUp = () => {
    setDraggedField(null)
    setResizingField(null)
  }

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

    const newSigner = {
      id: Date.now().toString(),
      name: signerData.name,
      email: signerData.email,
      role: 'signer',
      order: signers.length + 1,
      signed: false
    }
    setSigners([...signers, newSigner])
    toast.success('Signer added')
  }

  // Update signer
  const updateSigner = (signerId, updates) => {
    setSigners(signers.map(s => s.id === signerId ? { ...s, ...updates } : s))
  }

  // Delete signer
  const deleteSigner = (index) => {
    const signerToDelete = signers[index]
    if (!signerToDelete) return

    setSigners(signers.filter((_, i) => i !== index))
    // Remove field assignments for this signer
    setFields(fields.map(f => f.assignedTo === signerToDelete.id ? { ...f, assignedTo: null } : f))
    toast.success('Signer removed')
  }

  // Send document
  const sendDocument = async () => {
    if (signers.length === 0) {
      toast.error('Please add at least one signer')
      return
    }

    if (signers.some(s => !s.name || !s.email)) {
      toast.error('Please fill in all signer details')
      return
    }

    try {
      await saveDocument()
      
      const response = await axios.post(`${API_BASE_URL}/api/documents/${documentId}/send`, {
        signers: signers
      })

      if (response.data.success) {
        toast.success('Document sent successfully!')
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Send error:', error)
      toast.error('Failed to send document')
    }
  }

  // Render field on document
  const renderField = (field) => {
    const fieldConfig = FIELD_TYPES[field.type]
    const signer = signers.find(s => s.id === field.assignedTo)
    const pageOffset = pageOffsets[field.page] || 0

    return (
      <div
        key={field.id}
        className={`absolute border-2 border-dashed border-${fieldConfig.color}-400 bg-${fieldConfig.color}-50 cursor-move flex items-center justify-center text-xs font-medium text-${fieldConfig.color}-700 hover:bg-${fieldConfig.color}-100 group`}
        style={{
          left: field.x,
          top: field.y + pageOffset,
          width: field.width,
          height: field.height,
          zIndex: 10
        }}
        onMouseDown={(e) => handleFieldMouseDown(e, field)}
      >
        <div className="flex items-center space-x-1">
          <fieldConfig.icon className="w-3 h-3" />
          <span className="truncate">{field.placeholder}</span>
        </div>
        
        {/* Field controls */}
        <div className="absolute -top-8 left-0 bg-white border rounded shadow-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
          <select
            value={field.assignedTo || ''}
            onChange={(e) => updateField(field.id, { assignedTo: e.target.value || null })}
            className="text-xs border rounded px-1"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">Unassigned</option>
            {signers.map((signer, index) => (
              <option key={index} value={signer.email}>
                {signer.name || signer.email || 'Unnamed'}
              </option>
            ))}
          </select>
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteField(field.id)
            }}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>

        {/* Resize handle */}
        <div
          className="absolute bottom-0 right-0 w-3 h-3 bg-blue-600 cursor-se-resize opacity-0 group-hover:opacity-100"
          onMouseDown={(e) => {
            e.stopPropagation()
            setResizingField(field)
          }}
        />
      </div>
    )
  }

  const handleDocumentLoad = ({ numPages }) => {
    setTotalPages(numPages)
    console.log(`Document loaded with ${numPages} pages`)
  }

  const handlePageLoad = ({ pageNumber, width, height, scale }) => {
    setDocumentDimensions({ width: width * scale, height: height * scale })
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
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
                {document?.name || 'Loading...'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="hidden sm:inline text-sm text-gray-500">
                {fields.length} fields, {signers.length} signers
              </span>
              <button
                onClick={saveDocument}
                disabled={saving}
                className="btn-secondary flex items-center space-x-2 text-sm md:text-base px-3 md:px-4 py-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={() => setShowSignerModal(true)}
                disabled={saving}
                className="btn-primary flex items-center space-x-2 text-sm md:text-base px-3 md:px-4 py-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send for Signing</span>
                <span className="sm:hidden">Send</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:relative z-30 w-64 bg-white border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out h-full overflow-y-auto
        `}>
          <div className="flex justify-between items-center mb-4 md:hidden">
            <h3 className="text-lg font-semibold text-gray-900">Tools</h3>
            <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-4 hidden md:block">Add Fields</h3>
          
          <div className="space-y-2 mb-6">
            {Object.entries(FIELD_TYPES).map(([type, config]) => {
              const Icon = config.icon
              return (
                <button
                  key={type}
                  onClick={() => setSelectedFieldType(type)}
                  className={`
                    field-type-selector w-full text-left
                    ${selectedFieldType === type ? 'active' : ''}
                  `}
                >
                  <Icon className="field-icon" />
                  <span className="field-label">{config.label}</span>
                </button>
              )
            })}
          </div>

          {/* Signers Section */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Signers</h3>
              <button
                onClick={() => setShowSignerModal(true)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              {signers.map((signer, index) => (
                <div key={index} className="signer-item">
                  <div className="signer-info">
                    <div className="signer-name">{signer.name}</div>
                    <div className="signer-email">{signer.email}</div>
                  </div>
                  <button
                    onClick={() => deleteSigner(index)}
                    className="signer-remove-btn"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              
              {signers.length === 0 && (
                <p className="text-sm text-gray-500 italic">No signers added yet</p>
              )}
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main Content - Document Viewer */}
        <div className="flex-1 flex flex-col overflow-hidden">
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
          <div className="flex-1 overflow-hidden">
            {document ? (
              <div 
                className="h-full"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={addField}
              >
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
                  {fields.map((field) => {
                    const config = FIELD_TYPES[field.type]
                    const Icon = config.icon
                    const isSelected = draggedField?.id === field.id
                    
                    return (
                      <div
                        key={field.id}
                        pageNumber={field.pageNumber}
                        className={`
                          absolute border-2 bg-white bg-opacity-90 cursor-pointer transition-all duration-200 z-20
                          ${isSelected ? 'border-blue-500 shadow-lg z-30' : `border-${config.color}-300`}
                          ${field.type === 'signature' ? 'border-green-300' : ''}
                          ${field.type === 'text' ? 'border-blue-300' : ''}
                          ${field.type === 'checkbox' ? 'border-purple-300' : ''}
                          ${field.type === 'date' ? 'border-yellow-300' : ''}
                        `}
                        style={{
                          left: `${field.x}px`,
                          top: `${field.y}px`,
                          width: `${field.width}px`,
                          height: `${field.height}px`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setDraggedField(field)
                        }}
                        onMouseDown={(e) => handleFieldMouseDown(e, field)}
                      >
                        {isSelected && (
                          <div className="absolute -top-6 left-0 right-0 h-6 bg-gray-800 text-white text-xs px-2 py-1 rounded-t flex items-center justify-between z-60">
                            <span className="flex items-center space-x-1">
                              <Icon className="w-3 h-3" />
                              <span>{config.label}</span>
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteField(field.id)
                              }}
                              className="hover:bg-red-600 p-1 rounded"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}

                        {/* Form Element */}
                        <div className="w-full h-full p-1">
                          {renderField(field)}
                        </div>

                        {/* Resize Handle (only when selected) */}
                        {isSelected && (
                          <div
                            className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 cursor-se-resize z-50"
                            onMouseDown={(e) => {
                              e.stopPropagation()
                              setResizingField(field)
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </DocumentViewer>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Document...</h3>
                  <p className="text-gray-600">Please wait while we load your document</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Signer Modal */}
      {showSignerModal && (
        <SignerModal
          signers={signers}
          onAddSigner={addSigner}
          onRemoveSigner={deleteSigner}
          onClose={() => setShowSignerModal(false)}
          onSend={sendDocument}
          uploading={saving}
        />
      )}
    </div>
  )
} 