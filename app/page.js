'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Zap, Shield, Users, ArrowRight, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HomePage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Handle file drop - directly navigate to editor
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
      
      const selectedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: fileData
      }

      // Store file in sessionStorage
      sessionStorage.setItem('pendingDocument', JSON.stringify(selectedFile))
      
      toast.success('Document loaded successfully!')
      
      // Navigate directly to editor
      router.push('/editor/new')
    }

    reader.onerror = () => {
      toast.error('Error reading file')
      setIsProcessing(false)
    }

    reader.readAsDataURL(file)
  }, [router])

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onDrop(files)
    }
  }

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      onDrop(files)
    }
  }

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Upload and start editing documents in seconds'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'Bank-level security with legal compliance'
    },
    {
      icon: Users,
      title: 'Multi-Signer Support',
      description: 'Add multiple signers with custom workflows'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional Document
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Signing Made Simple
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Upload any document and transform it into a professional signing experience. 
              Add fields, manage signers, and track progress all in one place.
            </p>

            {/* Upload Area */}
            <div className="max-w-2xl mx-auto mb-16">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative group"
              >
                <label
                  htmlFor="file-upload"
                  className="block w-full p-16 border-2 border-dashed border-gray-300 rounded-2xl hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]"
                >
                  <div className="text-center">
                    {isProcessing ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                        <span className="text-xl font-medium text-blue-600">Processing document...</span>
                        <p className="text-gray-500 mt-2">Please wait while we prepare your document</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-16 h-16 text-gray-400 group-hover:text-blue-500 mx-auto mb-6 transition-colors" />
                        <span className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors block mb-2">
                          Drop your document here
                        </span>
                        <span className="text-lg text-gray-600 block mb-4">
                          or click to browse files
                        </span>
                        <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                          <FileText className="w-4 h-4" />
                          <span>PDF, Images, Word, Text files up to 50MB</span>
                        </div>
                      </>
                    )}
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
              </div>
            </div>

            {/* Quick Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                <span>View existing documents</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SignFlow?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for professionals who need reliable, secure, and efficient document signing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to streamline your document workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust SignFlow for their document signing needs
          </p>
          <label
            htmlFor="cta-file-upload"
            className="inline-flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Your First Document</span>
            <input
              id="cta-file-upload"
              type="file"
              className="sr-only"
              accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt,.rtf"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </label>
        </div>
      </div>
    </div>
  )
} 