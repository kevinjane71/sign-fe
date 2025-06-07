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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-fuchsia-50 to-teal-100 relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-16 pb-10 px-4 bg-gradient-to-br from-blue-200 via-fuchsia-100 to-teal-200 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-40 right-0 w-96 h-96 bg-blue-200 opacity-10 rounded-full blur-3xl z-0" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/30 rounded-full blur-2xl z-0" style={{transform:'translate(-50%,-50%)'}} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 drop-shadow mb-4 tracking-tight">Sign documents fast and hassle-free.</h1>
          <p className="text-lg sm:text-2xl text-gray-700 mb-8 font-medium">Upload, edit, send, and share—right from your mobile or desktop. Get signatures in seconds, anywhere.</p>
          {/* Glassmorphic Upload Card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 flex flex-col items-center mx-auto max-w-md ring-2 ring-fuchsia-200/40">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full bg-gradient-to-br from-fuchsia-50 via-white to-blue-50 border-2 border-dashed border-fuchsia-300 rounded-xl shadow p-6 flex flex-col items-center justify-center mb-4 transition-all hover:border-fuchsia-400 hover:bg-fuchsia-50/60"
            >
              <label htmlFor="file-upload" className="w-full flex flex-col items-center cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-400 to-blue-400 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-fuchsia-700">Drop or select a file</span>
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
              className="w-full bg-gradient-to-r from-fuchsia-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow hover:from-fuchsia-600 hover:to-blue-600 transition-colors text-base mb-2 mt-2"
            >
              View My Documents
            </button>
            <p className="text-xs text-gray-600 mt-2">No account needed for basic signing. Free to start.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-fuchsia-400 to-blue-400 flex items-center justify-center mb-2 shadow-lg">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <span className="text-fuchsia-700 font-bold text-lg">Lightning Fast</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Upload, configure, and send in seconds.</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center mb-2 shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <span className="text-blue-700 font-bold text-lg">Bank-Level Security</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Your documents are encrypted and safe.</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-400 to-fuchsia-400 flex items-center justify-center mb-2 shadow-lg">
            <Users className="w-7 h-7 text-white" />
          </div>
          <span className="text-teal-700 font-bold text-lg">Multi-Signer</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Invite others and track every signature.</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-pink-400 flex items-center justify-center mb-2 shadow-lg">
            <Star className="w-7 h-7 text-white" />
          </div>
          <span className="text-yellow-700 font-bold text-lg">Trusted Worldwide</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Used by thousands of professionals.</span>
        </div>
      </section>

      {/* Trust Bar / Logos */}
      {/* <section className="w-full max-w-4xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 bg-white/60 rounded-xl shadow border border-gray-100 mb-8">
        {logos.map((logo, i) => (
          <img key={i} src={logo} alt="logo" className="h-8 object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition" />
        ))}
      </section> */}

      {/* Testimonial Carousel */}
      <section className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-base text-gray-700 font-semibold">“eSignTap made our contract process 10x faster!”</span>
        </div>
        <span className="text-xs text-gray-500">— Alex P., Operations Manager</span>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-gray-400 py-6 mt-auto">
        &copy; {new Date().getFullYear()} eSignTap. All rights reserved.
      </footer>
    </div>
  )
} 