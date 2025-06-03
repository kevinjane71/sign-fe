'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Plus, 
  X, 
  Mail, 
  User, 
  Eye, 
  PenTool, 
  Settings, 
  Send, 
  Clock,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Info,
  FileText,
  Calendar,
  Trash2,
  CheckCircle,
  AlertCircle,
  UserCheck
} from 'lucide-react'
import toast from 'react-hot-toast'
import './page.css'
import { shareDocument, sendDocumentWorkflow } from '../../utils/api'
import LoadingSpinner from '../../components/LoadingSpinner'

export default function SharePage() {
  const router = useRouter()
  const params = useParams()
  const [document, setDocument] = useState(null)
  const [signers, setSigners] = useState([])
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [workflowType, setWorkflowType] = useState('parallel')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')

  // Load document data
  useEffect(() => {
    // In a real app, this would fetch from API
    const mockDocument = {
      id: params.id,
      name: 'Contract Agreement.pdf',
      pages: 5,
      fields: 12,
      createdAt: new Date().toISOString()
    }
    setDocument(mockDocument)
  }, [params.id])

  // Add new signer
  const addSigner = () => {
    const newSigner = {
      id: Date.now(),
      name: '',
      email: '',
      role: 'sign',
      order: signers.length + 1
    }
    setSigners([...signers, newSigner])
  }

  // Update signer
  const updateSigner = (id, field, value) => {
    setSigners(signers.map(signer => 
      signer.id === id ? { ...signer, [field]: value } : signer
    ))
  }

  // Remove signer
  const removeSigner = (id) => {
    setSigners(signers.filter(signer => signer.id !== id))
  }

  // Send document
  const sendDocument = async () => {
    if (signers.length === 0) {
      toast.error('Please add at least one signer')
      return
    }

    const invalidSigners = signers.filter(s => !s.name || !s.email)
    if (invalidSigners.length > 0) {
      toast.error('Please fill in all signer details')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Document sent successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to send document')
    } finally {
      setIsLoading(false)
    }
  }

  const workflowTypes = [
    {
      id: 'parallel',
      name: 'Parallel Signing',
      description: 'All signers receive the document simultaneously',
      icon: Users
    },
    {
      id: 'sequential',
      name: 'Sequential Signing',
      description: 'Signers receive the document in order',
      icon: ArrowRight
    },
    {
      id: 'custom',
      name: 'Custom Workflow',
      description: 'Define custom signing order and conditions',
      icon: Settings
    }
  ]

  const validateForm = () => {
    if (!senderName.trim()) {
      setError('Sender name is required')
      return false
    }
    if (!senderEmail.trim()) {
      setError('Sender email is required')
      return false
    }
    
    for (const signer of signers) {
      if (!signer.name.trim() || !signer.email.trim()) {
        setError('All signers must have a name and email')
        return false
      }
      if (!/\S+@\S+\.\S+/.test(signer.email)) {
        setError('Please enter valid email addresses for all signers')
        return false
      }
    }
    
    return true
  }

  const saveConfiguration = async () => {
    if (!validateForm()) return
    
    try {
      setSaving(true)
      setError('')
      
      const result = await shareDocument(params.id, {
        signers,
        workflowType,
        message,
        senderName,
        senderEmail
      })

      setSuccess('Configuration saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to save configuration. Please try again.')
      console.error('Save configuration error:', err)
    } finally {
      setSaving(false)
    }
  }

  const sendDocumentWithConfiguration = async () => {
    if (!validateForm()) return
    
    try {
      setSending(true)
      setError('')
      
      // First save the configuration
      await saveConfiguration()
      
      // Then send the document
      const data = await sendDocumentWorkflow(params.id)

      setSuccess(`Document sent successfully to ${data.notifiedSigners} signers!`)
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err) {
      setError('Failed to send document. Please try again.')
      console.error('Send document error:', err)
    } finally {
      setSending(false)
    }
  }

  // Show loading overlay when sending
  if (sending) {
    return <LoadingSpinner type="submit" />
  }

  return (
    <div className="share-container">
      <div className="share-content">
        <div className="share-header">
          <h1>Share Document</h1>
          <p>Configure signers and workflow for your document</p>
        </div>

        <div className="share-body">
          {error && (
            <div className="error-message">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <CheckCircle size={20} />
              {success}
            </div>
          )}

          {/* Document Information */}
          <div className="document-info">
            <h2>Document Information</h2>
            <div className="document-meta">
              <div className="meta-item">
                <FileText className="icon" />
                <span>{document?.name}</span>
              </div>
              <div className="meta-item">
                <Users className="icon" />
                <span>{document?.fields?.length || 0} fields</span>
              </div>
              <div className="meta-item">
                <Calendar className="icon" />
                <span>{document?.pages} page{document?.pages !== 1 ? 's' : ''}</span>
              </div>
              <div className="meta-item">
                <Clock className="icon" />
                <span>Status: {document?.status}</span>
              </div>
            </div>
          </div>

          {/* Sender Information */}
          <div className="workflow-section">
            <h2 className="section-title">
              <Mail size={20} />
              Sender Information
            </h2>
            <div className="signer-form" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Workflow Type Selection */}
          <div className="workflow-section">
            <h2 className="section-title">
              <UserCheck size={20} />
              Signing Workflow
            </h2>
            <div className="workflow-types">
              <div 
                className={`workflow-option ${workflowType === 'parallel' ? 'selected' : ''}`}
                onClick={() => setWorkflowType('parallel')}
              >
                <h3>Parallel Signing</h3>
                <p>All signers receive the document simultaneously and can sign in any order.</p>
              </div>
              <div 
                className={`workflow-option ${workflowType === 'sequential' ? 'selected' : ''}`}
                onClick={() => setWorkflowType('sequential')}
              >
                <h3>Sequential Signing</h3>
                <p>Signers receive the document one by one in the order you specify.</p>
              </div>
              <div 
                className={`workflow-option ${workflowType === 'custom' ? 'selected' : ''}`}
                onClick={() => setWorkflowType('custom')}
              >
                <h3>Custom Workflow</h3>
                <p>Advanced workflow with custom rules and conditions (coming soon).</p>
              </div>
            </div>
          </div>

          {/* Signers Management */}
          <div className="signers-section">
            <h2 className="section-title">
              <Users size={20} />
              Signers ({signers.length})
            </h2>
            <div className="signers-list">
              {signers.map((signer, index) => (
                <div key={signer.id} className="signer-item">
                  <div className="signer-form">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={signer.name}
                        onChange={(e) => updateSigner(signer.id, 'name', e.target.value)}
                        placeholder="Signer name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={signer.email}
                        onChange={(e) => updateSigner(signer.id, 'email', e.target.value)}
                        placeholder="signer@example.com"
                      />
                    </div>
                    <div className="form-group">
                      <label>Role</label>
                      <select
                        value={signer.role}
                        onChange={(e) => updateSigner(signer.id, 'role', e.target.value)}
                        className={`role-select role-${signer.role}`}
                      >
                        <option value="sign">Sign</option>
                        <option value="review">Review</option>
                      </select>
                    </div>
                    {workflowType === 'sequential' && (
                      <div className="form-group">
                        <label>Order</label>
                        <span style={{ 
                          padding: '12px 16px', 
                          background: '#f7fafc', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '8px',
                          fontWeight: '600',
                          color: '#4a5568'
                        }}>
                          #{index + 1}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => removeSigner(signer.id)}
                      className="btn btn-danger"
                      disabled={signers.length === 1}
                      style={{ opacity: signers.length === 1 ? 0.5 : 1 }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addSigner} className="add-signer-btn">
                <Plus size={20} />
                Add Another Signer
              </button>
            </div>
          </div>

          {/* Message Section */}
          <div className="message-section">
            <h2 className="section-title">
              <Mail size={20} />
              Message to Signers (Optional)
            </h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message that will be included in the signing invitation..."
              className="message-textarea"
            />
          </div>

          {/* Actions */}
          <div className="actions-section">
            <button 
              onClick={() => router.push(`/editor/new?id=${params.id}`)}
              className="btn btn-secondary"
            >
              <ArrowLeft size={16} />
              Back to Editor
            </button>
            <button 
              onClick={saveConfiguration}
              disabled={saving}
              className="btn btn-secondary"
            >
              {saving ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px', margin: '0' }}></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Configuration
                </>
              )}
            </button>
            <button 
              onClick={sendDocumentWithConfiguration}
              disabled={sending || saving}
              className="btn btn-primary"
            >
              {sending ? (
                <>
                  <div className="spinner" style={{ width: '16px', height: '16px', margin: '0' }}></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Document
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 