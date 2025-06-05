'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText, Shield, Users, Zap, Star } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuth from './hooks/useAuth'

export default function HomePage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-br from-indigo-600/80 via-purple-600/70 to-indigo-400/80 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none opacity-10" style={{background: 'radial-gradient(circle at 60% 40%, #fff 0%, transparent 70%)'}} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow mb-4">Effortless Document Signing</h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-8">Upload, add fields, and send for signatures. Secure, fast, and easy for everyone.</p>
          <div className="bg-white/90 rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col items-center mx-auto max-w-md">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full bg-gray-50 border-2 border-dashed border-indigo-200 rounded-xl shadow p-6 flex flex-col items-center justify-center mb-4 transition-all hover:border-indigo-400 hover:bg-indigo-50"
            >
              <label htmlFor="file-upload" className="w-full flex flex-col items-center cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-2">
                    <Upload className="w-7 h-7 text-indigo-600" />
                  </div>
                  <span className="text-lg font-semibold text-indigo-700">Drop or select a file</span>
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
                <div className="mt-4 flex items-center space-x-2 text-indigo-600 animate-pulse">
                  <FileText className="w-5 h-5" />
                  <span>Processing...</span>
                </div>
              )}
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow hover:bg-indigo-700 transition-colors text-base mb-2"
            >
              View My Documents
            </button>
            <p className="text-xs text-gray-500 mt-2">No account needed for basic signing. Free to start.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow border border-indigo-100">
          <Zap className="w-8 h-8 text-indigo-500 mb-2" />
          <span className="text-indigo-700 font-bold text-lg">Lightning Fast</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Upload, configure, and send in seconds.</span>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow border border-indigo-100">
          <Shield className="w-8 h-8 text-indigo-500 mb-2" />
          <span className="text-indigo-700 font-bold text-lg">Bank-Level Security</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Your documents are encrypted and safe.</span>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow border border-indigo-100">
          <Users className="w-8 h-8 text-indigo-500 mb-2" />
          <span className="text-indigo-700 font-bold text-lg">Multi-Signer</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Invite others and track every signature.</span>
        </div>
        <div className="bg-white rounded-xl p-6 flex flex-col items-center shadow border border-indigo-100">
          <Star className="w-8 h-8 text-indigo-500 mb-2" />
          <span className="text-indigo-700 font-bold text-lg">Trusted Worldwide</span>
          <span className="text-xs text-gray-500 mt-1 text-center">Used by thousands of professionals.</span>
        </div>
      </section>

      {/* Trust Bar / Testimonial */}
      <section className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-2">
          <Star className="w-5 h-5 text-yellow-400" />
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