'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, ArrowRight, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HomePage() {
  const router = useRouter()
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file) return

    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('File size must be less than 50MB')
      return
    }

    // Accept all document types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf'
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid document file (PDF, Image, Word, Text)')
      return
    }

    setIsProcessing(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const fileData = e.target.result
      
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        data: fileData
      })

      // Create preview for images
      if (file.type.startsWith('image/')) {
        setFilePreview(fileData)
      } else {
        setFilePreview(null)
      }

      setIsProcessing(false)
      toast.success('Document loaded successfully!')
    }

    reader.onerror = () => {
      toast.error('Error reading file')
      setIsProcessing(false)
    }

    reader.readAsDataURL(file)
  }, [])

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onDrop(files)
    }
  }

  // Proceed to editor
  const proceedToEditor = () => {
    if (!selectedFile) return

    // Store file in sessionStorage
    sessionStorage.setItem('pendingDocument', JSON.stringify(selectedFile))
    
    // Navigate to editor
    router.push('/editor/new')
  }

  // Clear selection
  const clearSelection = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Get file type display name
  const getFileTypeDisplay = (type) => {
    const typeMap = {
      'application/pdf': 'PDF Document',
      'image/jpeg': 'JPEG Image',
      'image/jpg': 'JPG Image',
      'image/png': 'PNG Image',
      'image/gif': 'GIF Image',
      'image/webp': 'WebP Image',
      'application/msword': 'Word Document',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word Document',
      'text/plain': 'Text Document',
      'application/rtf': 'RTF Document'
    }
    return typeMap[type] || 'Document'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">SignApp</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="btn-secondary flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedFile ? (
          /* File Upload Section */
          <div className="text-center">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upload Your Document
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Upload any document to add signature fields, text boxes, and more. 
                Supports PDF, images, Word documents, and text files.
              </p>
            </div>

            {/* Upload Area */}
            <div className="max-w-xl mx-auto">
              <label
                htmlFor="file-upload"
                className="group relative block w-full p-12 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200 cursor-pointer"
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                  <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    Click to upload or drag and drop
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    PDF, Images, Word, Text files up to 50MB
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="sr-only"
                  accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt,.rtf"
                  onChange={handleFileChange}
                  disabled={isProcessing}
                />
              </label>

              {isProcessing && (
                <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing document...</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Document Preview Section */
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Preview Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Document Ready</h3>
                  <button
                    onClick={clearSelection}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* File Preview */}
              <div className="p-6">
                {filePreview ? (
                  <div className="mb-6">
                    <img
                      src={filePreview}
                      alt="Document preview"
                      className="w-full h-64 object-contain bg-gray-50 rounded-lg border"
                    />
                  </div>
                ) : (
                  <div className="mb-6 h-64 bg-gray-50 rounded-lg border flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">Document Preview</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {getFileTypeDisplay(selectedFile.type)}
                      </p>
                    </div>
                  </div>
                )}

                {/* File Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">File Name:</span>
                    <span className="text-sm text-gray-900 truncate max-w-xs">{selectedFile.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">File Size:</span>
                    <span className="text-sm text-gray-900">{formatFileSize(selectedFile.size)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">File Type:</span>
                    <span className="text-sm text-gray-900">{getFileTypeDisplay(selectedFile.type)}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={proceedToEditor}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Continue to Editor</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 