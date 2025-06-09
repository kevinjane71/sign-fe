'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Shield, Users, Zap, Star, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuth from './hooks/useAuth'

const logos = [
  'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
  'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
  'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png',
]

export default function HomePage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()

  // Clear document configuration when visiting home page
  useEffect(() => {
    sessionStorage.removeItem('documentConfiguration');
  }, []);

  // Handle file drop - support multiple files
  const onDrop = useCallback((acceptedFiles) => {
    // Check if user is logged in
    if (!user) {
      toast.error('Please login to upload documents')
      router.push('/login')
      return
    }

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
          router.push('/editor/local-new?step=1')
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
            router.push('/editor/local-new?step=1')
          } else {
            setIsProcessing(false)
          }
        }
      }

      reader.readAsDataURL(file)
    })
  }, [router, user])

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-fuchsia-50 to-teal-50 relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-8 sm:pt-16 pb-6 sm:pb-10 px-4 bg-gradient-to-br from-blue-100/80 via-fuchsia-100/80 to-teal-100/80 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-pink-200 opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-40 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-200 opacity-10 rounded-full blur-3xl z-0" />
        <div className="absolute top-1/2 left-1/2 w-32 sm:w-40 h-32 sm:h-40 bg-white/30 rounded-full blur-2xl z-0" style={{transform:'translate(-50%,-50%)'}} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-block bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
            Save up to 40% compared to DocuSign
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-900 via-fuchsia-700 to-blue-900 bg-clip-text text-transparent drop-shadow-sm mb-4 tracking-tight leading-tight">
            The Most Affordable DocuSign Alternative
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-gray-600 mb-8 font-medium leading-relaxed">
            Professional document signing at a fraction of the cost. Get all the features you need without the premium price tag.
          </p>
          {/* Glassmorphic Upload Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-8 flex flex-col items-center mx-auto max-w-md ring-2 ring-fuchsia-200/40">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full bg-gradient-to-br from-fuchsia-50 via-white to-blue-50 border-2 border-dashed border-fuchsia-300 rounded-xl shadow p-4 sm:p-6 flex flex-col items-center justify-center mb-4 transition-all hover:border-fuchsia-400 hover:bg-fuchsia-50/60"
            >
              <label htmlFor="file-upload" className="w-full flex flex-col items-center cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-fuchsia-400 to-blue-400 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                    <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-fuchsia-700">Drop or select a file</span>
                  <span className="text-xs text-gray-500">PDF, Images, Word, TXT • Up to 50MB</span>
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
              {isProcessing && (
                <div className="mt-4 flex items-center space-x-2 text-fuchsia-600 animate-pulse">
                  <FileText className="w-5 h-5" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg hover:from-fuchsia-600 hover:to-blue-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-base mb-2 mt-2"
            >
              View My Documents
            </button>
            <p className="text-xs text-gray-600 mt-2">Start free. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-fuchsia-400 to-blue-400 flex items-center justify-center mb-2 shadow-lg">
            <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <span className="text-fuchsia-700 font-bold text-base sm:text-lg">Lightning Fast</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Upload, configure, and send in seconds.</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center mb-2 shadow-lg">
            <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <span className="text-blue-700 font-bold text-base sm:text-lg">Bank-Level Security</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Your documents are encrypted and safe.</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-teal-400 to-fuchsia-400 flex items-center justify-center mb-2 shadow-lg">
            <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <span className="text-teal-700 font-bold text-base sm:text-lg">Multi-Signer</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Invite others and track every signature.</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center mb-2 shadow-lg">
            <Star className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <span className="text-yellow-700 font-bold text-base sm:text-lg">Affordable Pricing</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Save up to 70% vs. DocuSign.</span>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="w-full bg-white/80 backdrop-blur-sm py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-gray-900 via-fuchsia-700 to-blue-900 bg-clip-text text-transparent">
            Why Choose eSignTap Over DocuSign?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-4 text-gray-800">eSignTap</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Up to 40% more affordable</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">All essential features included</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Simple, intuitive interface</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">24/7 customer support</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
              <h3 className="text-xl font-bold mb-4 text-gray-800">DocuSign</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Premium pricing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Complex feature set</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Steep learning curve</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Limited support hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 w-full">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-base sm:text-lg text-gray-700 font-semibold">"eSignTap made our contract process 10x faster!"</span>
          </div>
          <span className="text-sm text-gray-500">— Alex P., Operations Manager</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-gray-400 py-6 mt-auto">
        &copy; {new Date().getFullYear()} eSignTap. All rights reserved.
      </footer>
    </div>
  )
} 