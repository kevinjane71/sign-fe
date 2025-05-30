'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Upload, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  TrendingUp,
  Calendar,
  Eye,
  Edit,
  Send,
  Loader2 
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function HomePage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    pending: 0,
    completed: 0,
    recent: []
  })

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading stats
    setStats({
      total: 24,
      draft: 8,
      pending: 6,
      completed: 10,
      recent: [
        {
          id: '1',
          name: 'Contract Agreement.pdf',
          status: 'completed',
          updatedAt: '2024-01-15',
          signers: 2
        },
        {
          id: '2',
          name: 'NDA Document.pdf',
          status: 'pending',
          updatedAt: '2024-01-14',
          signers: 1
        },
        {
          id: '3',
          name: 'Service Agreement.pdf',
          status: 'draft',
          updatedAt: '2024-01-13',
          signers: 0
        }
      ]
    })
  }, [])

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'draft':
        return <Edit className="w-4 h-4 text-gray-500" />
      default:
        return <FileText className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your documents and track signing progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-3xl font-bold text-gray-900">{stats.draft}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Ready to send</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-yellow-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Awaiting signatures</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>Fully signed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Widget - Smaller */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload New Document</h2>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative group"
              >
                <label
                  htmlFor="file-upload"
                  className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer"
                >
                  <div className="text-center">
                    {isProcessing ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                        <span className="text-sm font-medium text-blue-600">Processing...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-3 transition-colors" />
                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors block mb-1">
                          Drop file here
                        </span>
                        <span className="text-xs text-gray-500 block mb-2">
                          or click to browse
                        </span>
                        <div className="inline-flex items-center space-x-1 text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded">
                          <FileText className="w-3 h-3" />
                          <span>PDF, Images, Word</span>
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
          </div>

          {/* Recent Documents */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View all
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {stats.recent.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{doc.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              <span className="ml-1 capitalize">{doc.status}</span>
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{doc.signers} signers</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/editor/${doc.id}`)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => router.push(`/editor/${doc.id}`)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {doc.status === 'draft' && (
                          <button
                            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white transition-colors"
                            title="Send"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">View All Documents</span>
              </button>
              <button
                onClick={() => router.push('/dashboard?filter=pending')}
                className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
              >
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Pending Signatures</span>
              </button>
              <button
                onClick={() => router.push('/settings')}
                className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Users className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Manage Signers</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 