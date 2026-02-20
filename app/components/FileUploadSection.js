'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, FileText } from 'lucide-react'
import toast from 'react-hot-toast'
import useAuth from '../hooks/useAuth'

export default function FileUploadSection() {
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
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-6 sm:p-8 flex flex-col items-center mx-auto max-w-md ring-2 ring-emerald-200/40">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-dashed border-emerald-300 rounded-2xl shadow p-4 sm:p-6 flex flex-col items-center justify-center mb-4 transition-all hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-100"
      >
        <label htmlFor="file-upload" className="w-full flex flex-col items-center cursor-pointer">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-emerald-200">
              <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-base sm:text-lg font-bold text-gray-800">Drop or select a file</span>
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
          <div className="mt-4 flex items-center space-x-2 text-emerald-600 animate-pulse">
            <FileText className="w-5 h-5" />
            <span>Processing...</span>
          </div>
        )}
      </div>
      <button
        onClick={() => router.push('/dashboard')}
        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all transform hover:scale-[1.02] active:scale-[0.98] text-base mb-2 mt-2"
      >
        View My Documents
      </button>
      <p className="text-xs text-gray-500 mt-2">Start free. No credit card required.</p>
    </div>
  )
}
