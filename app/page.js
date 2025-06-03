'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Zap, Shield, Users, ArrowRight, Loader2, CheckCircle, Clock, Star } from 'lucide-react'
import toast from 'react-hot-toast'

export default function HomePage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  // Handle file drop - support multiple files
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return

    // Validate each file
    const validFiles = []
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

    for (const file of acceptedFiles) {
      // Validate file size (50MB limit)
      if (file.size > 50 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (max 50MB)`)
        continue
      }

      if (!allowedTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported file type`)
        continue
      }

      validFiles.push(file)
    }

    if (validFiles.length === 0) {
      return
    }

    setIsProcessing(true)

    // Process all valid files
    const processedFiles = []
    let processedCount = 0

    validFiles.forEach((file, index) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const fileData = e.target.result
        
        const selectedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: fileData
        }

        processedFiles[index] = selectedFile
        processedCount++

        // When all files are processed
        if (processedCount === validFiles.length) {
          // Filter out any undefined entries and store in sessionStorage
          const finalFiles = processedFiles.filter(Boolean)
          
          if (finalFiles.length === 1) {
            // Single file - use old format for backward compatibility
            sessionStorage.setItem('pendingDocument', JSON.stringify(finalFiles[0]))
          } else {
            // Multiple files - use new format
            sessionStorage.setItem('pendingDocuments', JSON.stringify(finalFiles))
          }
          
          toast.success(`${finalFiles.length} document(s) loaded successfully!`)
          
          // Navigate directly to editor
          router.push('/editor/new')
        }
      }

      reader.onerror = () => {
        toast.error(`Error reading ${file.name}`)
        processedCount++
        
        // Check if all files are processed (including errors)
        if (processedCount === validFiles.length) {
          const finalFiles = processedFiles.filter(Boolean)
          if (finalFiles.length > 0) {
            if (finalFiles.length === 1) {
              sessionStorage.setItem('pendingDocument', JSON.stringify(finalFiles[0]))
            } else {
              sessionStorage.setItem('pendingDocuments', JSON.stringify(finalFiles))
            }
            
            toast.success(`${finalFiles.length} document(s) loaded successfully!`)
            router.push('/editor/new')
          } else {
            setIsProcessing(false)
          }
        }
      }

      reader.readAsDataURL(file)
    })
  }, [router])

  // Handle file input change - support multiple files
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Minimalist Design */}
      <div className="relative bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
          {/* Main Content */}
          <div className="text-center space-y-10 sm:space-y-16">
            {/* Headline */}
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Document Signing
                <span className="block text-indigo-600">Made Simple</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Upload, add fields, send for signatures. Professional document workflows in minutes.
              </p>
            </div>

            {/* Upload Area - Enhanced Prominence */}
            <div className="max-w-2xl mx-auto">
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative group"
              >
                <label
                  htmlFor="file-upload"
                  className="block w-full p-12 sm:p-16 border-3 border-dashed border-indigo-200 bg-white rounded-3xl hover:border-indigo-400 hover:bg-indigo-50/50 transition-all duration-300 cursor-pointer group-hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  <div className="text-center">
                    {isProcessing ? (
                      <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-500 animate-spin" />
                        <span className="text-xl sm:text-2xl font-semibold text-indigo-600">Processing...</span>
                        <p className="text-indigo-500">Preparing your documents</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-indigo-200 transition-colors">
                          <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-600" />
                        </div>
                        <div className="space-y-3">
                          <span className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors block">
                            Drop files or click to upload
                          </span>
                          <p className="text-lg text-gray-600">
                            PDF, Images, Word • Up to 50MB • Multiple files supported
                          </p>
                        </div>
                        <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full group-hover:bg-indigo-200 transition-colors">
                          <FileText className="w-5 h-5 text-indigo-600" />
                          <span className="text-indigo-700 font-medium">Start your workflow now</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt,.rtf"
                    onChange={handleFileChange}
                    disabled={isProcessing}
                  />
                </label>
              </div>
            </div>

            {/* Quick Access */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
              <button
                onClick={() => router.push('/dashboard')}
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-indigo-600 font-semibold transition-colors text-base sm:text-lg"
              >
                <span>View existing documents</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Light Border Cards */}
      <div className="py-20 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            
            {/* Speed Feature */}
            <div className="bg-white border-2 border-orange-200 p-8 sm:p-10 rounded-3xl hover:border-orange-400 hover:bg-orange-50/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-7 h-7 text-orange-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Lightning Fast</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Upload and configure documents in minutes. No complex setup required.
              </p>
            </div>

            {/* Security Feature */}
            <div className="bg-white border-2 border-teal-200 p-8 sm:p-10 rounded-3xl hover:border-teal-400 hover:bg-teal-50/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Bank-Level Security</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Enterprise-grade security with audit trails and compliance features.
              </p>
            </div>

            {/* Collaboration Feature */}
            <div className="bg-white border-2 border-rose-200 p-8 sm:p-10 rounded-3xl hover:border-rose-400 hover:bg-rose-50/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-rose-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Multi-Signer</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Manage multiple signers with custom workflows and real-time tracking.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Social Proof - Clean */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">10K+</div>
                <div className="text-base sm:text-lg text-gray-600 font-medium">Documents Signed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">99.9%</div>
                <div className="text-base sm:text-lg text-gray-600 font-medium">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900">5min</div>
                <div className="text-base sm:text-lg text-gray-600 font-medium">Average Setup</div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12 text-base text-gray-600">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-500" />
                <span className="font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-purple-500" />
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA Section - Vibrant & Powerful */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-20 sm:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 sm:space-y-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to streamline your workflow?
            </h2>
            <p className="text-xl sm:text-2xl text-violet-100 leading-relaxed max-w-2xl mx-auto">
              Join professionals who trust SignFlow for their document signing needs
            </p>
            <label
              htmlFor="cta-file-upload"
              className="inline-flex items-center space-x-4 bg-white text-purple-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all cursor-pointer shadow-2xl hover:shadow-3xl transform hover:scale-105 text-lg sm:text-xl"
            >
              <Upload className="w-6 h-6" />
              <span>Start with your first document</span>
              <input
                id="cta-file-upload"
                type="file"
                multiple
                className="sr-only"
                accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.txt,.rtf"
                onChange={handleFileChange}
                disabled={isProcessing}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  )
} 