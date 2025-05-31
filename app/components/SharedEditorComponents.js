'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Upload, 
  Users,
  Mail,
  Shield,
  ArrowRight,
  ArrowLeft,
  Plus,
  X,
  Loader2,
  Trash2,
  FileText,
  Image,
  File
} from 'lucide-react'
import toast from 'react-hot-toast'

// Document Preview Component
export const DocumentPreview = ({ document, onRemove, canRemove = true }) => {
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const generatePreview = async () => {
      try {
        if (document.type === 'application/pdf') {
          // Generate PDF preview using PDF.js
          const pdfjsLib = await import('pdfjs-dist')
          pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
          
          const pdf = await pdfjsLib.getDocument(document.data || document.url).promise
          const page = await pdf.getPage(1)
          
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          const viewport = page.getViewport({ scale: 0.5 })
          
          canvas.width = viewport.width
          canvas.height = viewport.height
          
          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise
          
          setPreviewUrl(canvas.toDataURL())
        } else if (document.type.startsWith('image/')) {
          // For images, use the data directly
          setPreviewUrl(document.data || document.url)
        } else {
          // For other document types, show file icon
          setPreviewUrl(null)
        }
      } catch (err) {
        console.error('Error generating preview:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    generatePreview()
  }, [document])

  const getFileIcon = () => {
    if (document.type === 'application/pdf') return FileText
    if (document.type.startsWith('image/')) return Image
    if (document.type.includes('word')) return FileText
    return File
  }

  const getFileTypeColor = () => {
    if (document.type === 'application/pdf') return 'text-red-600 bg-red-50'
    if (document.type.startsWith('image/')) return 'text-green-600 bg-green-50'
    if (document.type.includes('word')) return 'text-blue-600 bg-blue-50'
    return 'text-gray-600 bg-gray-50'
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const FileIcon = getFileIcon()

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Preview Area */}
      <div className="aspect-[3/4] bg-gray-50 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : error || !previewUrl ? (
          <div className={`absolute inset-0 flex flex-col items-center justify-center ${getFileTypeColor()}`}>
            <FileIcon className="w-12 h-12 mb-2" />
            <span className="text-xs font-medium">{document.type.split('/')[1]?.toUpperCase()}</span>
          </div>
        ) : (
          <img 
            src={previewUrl} 
            alt={document.name}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Remove Button */}
        {canRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      
      {/* File Info */}
      <div className="p-3">
        <h3 className="font-medium text-sm text-gray-900 truncate" title={document.name}>
          {document.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {formatFileSize(document.size)}
        </p>
      </div>
    </div>
  )
}

// Document Configuration Component for Step 1 in edit mode
export const DocumentConfigurationStep = ({ 
  config = {}, 
  onComplete, 
  isEditing = false 
}) => {
  const [signers, setSigners] = useState(config.signers || [])
  const [subject, setSubject] = useState(config.subject || '')
  const [message, setMessage] = useState(config.message || '')
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  // Advanced settings
  const [requireAuthentication, setRequireAuthentication] = useState(config.requireAuthentication || false)
  const [allowDelegation, setAllowDelegation] = useState(config.allowDelegation !== false)
  const [allowComments, setAllowComments] = useState(config.allowComments !== false)
  const [sendReminders, setSendReminders] = useState(config.sendReminders !== false)
  const [reminderFrequency, setReminderFrequency] = useState(config.reminderFrequency || 3)
  const [expirationEnabled, setExpirationEnabled] = useState(config.expirationEnabled || false)
  const [expirationDays, setExpirationDays] = useState(config.expirationDays || 30)
  const [signingOrder, setSigningOrder] = useState(config.signingOrder || 'any')
  const [requireAllSigners, setRequireAllSigners] = useState(config.requireAllSigners !== false)
  const [allowPrinting, setAllowPrinting] = useState(config.allowPrinting !== false)
  const [allowDownload, setAllowDownload] = useState(config.allowDownload !== false)

  // Initialize with default values
  useEffect(() => {
    if (!subject && config.documents && config.documents.length > 0) {
      const documentName = config.documents.length > 1 
        ? `${config.documents.length} Documents` 
        : config.documents[0]?.name || 'Document'
      
      setSubject(`Please sign: ${documentName}`)
    }
    
    if (!message) {
      setMessage('Please review and sign this document at your earliest convenience.')
    }
    
    // Add a default signer if none exist
    if (signers.length === 0) {
      setSigners([{
        id: Date.now(),
        name: '',
        email: '',
        role: 'Signer'
      }])
    }
  }, [config, subject, message, signers.length])

  const addSigner = () => {
    const newSigner = {
      id: Date.now(),
      name: '',
      email: '',
      role: 'Signer'
    }
    setSigners(prev => [...prev, newSigner])
  }

  const updateSigner = (id, field, value) => {
    setSigners(prev => prev.map(signer => 
      signer.id === id ? { ...signer, [field]: value } : signer
    ))
  }

  const removeSigner = (id) => {
    if (signers.length > 1) {
      setSigners(prev => prev.filter(signer => signer.id !== id))
    } else {
      toast.error('At least one signer is required')
    }
  }

  const handleComplete = () => {
    // Validation
    for (const signer of signers) {
      if (!signer.name.trim()) {
        toast.error('All signers must have a name')
        return
      }
      if (!signer.email.trim()) {
        toast.error('All signers must have an email')
        return
      }
      if (!/\S+@\S+\.\S+/.test(signer.email)) {
        toast.error('Please enter valid email addresses')
        return
      }
    }

    if (!subject.trim()) {
      toast.error('Subject is required')
      return
    }

    // Prepare configuration
    const updatedConfig = {
      ...config,
      signers,
      subject,
      message,
      requireAuthentication,
      allowDelegation,
      allowComments,
      sendReminders,
      reminderFrequency,
      expirationEnabled,
      expirationDays,
      signingOrder,
      requireAllSigners,
      allowPrinting,
      allowDownload
    }

    onComplete(updatedConfig)
  }

  return (
    <div className="p-4 space-y-6">
      {/* Document Preview Section */}
      {config.documents && config.documents.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Documents</h3>
          <div className="grid grid-cols-2 gap-3">
            {config.documents.map((doc, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {doc.name}
                </div>
                <div className="text-xs text-gray-600">
                  {doc.type} • {Math.round(doc.size / 1024)} KB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signers Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-900">Signers</h3>
          <button
            onClick={addSigner}
            className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-3 h-3 inline mr-1" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {signers.map((signer, index) => (
            <div key={signer.id} className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Signer {index + 1}</span>
                {signers.length > 1 && (
                  <button
                    onClick={() => removeSigner(signer.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                <div>
                  <input
                    type="text"
                    value={signer.name}
                    onChange={(e) => updateSigner(signer.id, 'name', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    value={signer.email}
                    onChange={(e) => updateSigner(signer.id, 'email', e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email address"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Configuration */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Email Configuration</h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email subject"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter a message for the signers"
            />
          </div>
        </div>
      </div>

      {/* Advanced Settings */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between text-sm font-medium text-gray-900 mb-3"
        >
          <span className="flex items-center">
            <Shield className="w-4 h-4 mr-1" />
            Advanced Settings
          </span>
          <ArrowRight className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
        </button>

        {showAdvanced && (
          <div className="space-y-4 pt-3 border-t">
            {/* Security Settings */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Security & Authentication</h4>
              <div className="space-y-2">
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={requireAuthentication}
                    onChange={(e) => setRequireAuthentication(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Require authentication to sign
                </label>
                
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={allowDelegation}
                    onChange={(e) => setAllowDelegation(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Allow signers to delegate to others
                </label>
              </div>
            </div>

            {/* Signing Settings */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Signing Process</h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Signing Order
                  </label>
                  <select
                    value={signingOrder}
                    onChange={(e) => setSigningOrder(e.target.value)}
                    className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="any">Any order</option>
                    <option value="sequential">Sequential order</option>
                  </select>
                </div>
                
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={requireAllSigners}
                    onChange={(e) => setRequireAllSigners(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Require all signers to complete
                </label>
                
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={allowComments}
                    onChange={(e) => setAllowComments(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Allow comments and notes
                </label>
              </div>
            </div>

            {/* Reminders & Expiration */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Reminders & Expiration</h4>
              <div className="space-y-2">
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={sendReminders}
                    onChange={(e) => setSendReminders(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Send automatic reminders
                </label>
                
                {sendReminders && (
                  <div className="ml-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Reminder frequency (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={reminderFrequency}
                      onChange={(e) => setReminderFrequency(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
                
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={expirationEnabled}
                    onChange={(e) => setExpirationEnabled(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Set expiration date
                </label>
                
                {expirationEnabled && (
                  <div className="ml-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Expires after (days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      value={expirationDays}
                      onChange={(e) => setExpirationDays(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Document Permissions */}
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-2">Document Permissions</h4>
              <div className="space-y-2">
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={allowPrinting}
                    onChange={(e) => setAllowPrinting(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Allow printing
                </label>
                
                <label className="flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={allowDownload}
                    onChange={(e) => setAllowDownload(e.target.checked)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Allow download
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Complete Button */}
      <div className="pt-4 border-t">
        <button
          onClick={handleComplete}
          className="w-full px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Update Configuration
        </button>
      </div>
    </div>
  )
} 