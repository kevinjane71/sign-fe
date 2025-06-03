'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Send, 
  Upload,
  Plus,
  FolderOpen,
  TrendingUp,
  Calendar,
  Loader2,
  X,
  FileCheck,
  RotateCcw
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getStoredUser, getDocuments, getDocumentStats, isAuthenticated, logout } from '../utils/api'
import { useCustomToast } from '../components/CustomToast'

export default function Dashboard() {
  const router = useRouter()
  const toast = useCustomToast()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    total: 0,
    draft: 0,
    sent: 0,
    completed: 0
  })
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })

  // Helper functions for status handling
  const getStatusColor = (status) => {
    const statusColors = {
      draft: 'bg-amber-100 text-amber-800 border-amber-200',
      sent: 'bg-blue-100 text-blue-800 border-blue-200',
      partially_signed: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    }
    return statusColors[status] || statusColors.draft
  }

  const getStatusDotColor = (status) => {
    const dotColors = {
      draft: 'bg-amber-400',
      sent: 'bg-blue-400',
      partially_signed: 'bg-purple-400',
      completed: 'bg-emerald-400',
      cancelled: 'bg-red-400'
    }
    return dotColors[status] || dotColors.draft
  }

  const getStatusIcon = (status) => {
    const icons = {
      draft: <Clock className="w-3 h-3" />,
      sent: <Send className="w-3 h-3" />,
      partially_signed: <Users className="w-3 h-3" />,
      completed: <CheckCircle className="w-3 h-3" />,
      cancelled: <X className="w-3 h-3" />
    }
    return icons[status] || icons.draft
  }

  const getStatusText = (status) => {
    const statusTexts = {
      draft: 'Draft',
      sent: 'Sent',
      partially_signed: 'Partially Signed',
      completed: 'Completed',
      cancelled: 'Cancelled'
    }
    return statusTexts[status] || 'Draft'
  }

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated()) {
      router.push('/login')
      return
    }

    // Get user data from localStorage
    const userData = getStoredUser()
    if (userData) {
      setUser(userData)
    }

    // Fetch data
    fetchStats()
    fetchDocuments()
  }, [currentPage, statusFilter, router])

  const fetchStats = async () => {
    try {
      const response = await getDocumentStats()
      
      if (response.success) {
        setStats(response.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Keep mock data as fallback
      setStats({
        total: 0,
        draft: 0,
        sent: 0,
        completed: 0
      })
    }
  }

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage.toString(),
        limit: '10'
      }
      
      if (statusFilter !== 'all') {
        params.status = statusFilter
      }

      const response = await getDocuments(params)
      
      if (response.success) {
        setDocuments(response.documents)
        setTotalPages(response.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
      // If authentication failed, user will be redirected by the API utility
      if (error.message !== 'Authentication required') {
        // Show empty state for other errors
        setDocuments([])
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle file upload - support multiple files
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
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const handleFileUpload = async (files) => {
    setUploading(true)
    setUploadProgress({ current: 0, total: files.length })

    try {
      const formData = new FormData()
      
      files.forEach((file, index) => {
        formData.append('documents', file)
      })

      // Add empty signers array and basic metadata
      formData.append('signers', JSON.stringify([]))
      formData.append('subject', `Document Upload - ${new Date().toLocaleDateString()}`)
      formData.append('message', '')
      formData.append('configuration', JSON.stringify({}))

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      })

      if (response.ok) {
        const result = await response.json()
        toast.success('Documents uploaded successfully!')
        
        // Refresh the documents list
        fetchDocuments()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress({ current: 0, total: 0 })
    }
  }

  const handleDeleteDocument = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return
    }

    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      })

      if (response.ok) {
        toast.success('Document deleted successfully!')
        fetchDocuments()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Delete failed')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Delete failed. Please try again.')
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-amber-100 text-amber-800 border border-amber-200', icon: Clock },
      sent: { color: 'bg-blue-100 text-blue-800 border border-blue-200', icon: Send },
      partially_signed: { color: 'bg-purple-100 text-purple-800 border border-purple-200', icon: Users },
      completed: { color: 'bg-emerald-100 text-emerald-800 border border-emerald-200', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800 border border-red-200', icon: Trash2 }
    }
    
    const config = statusConfig[status] || statusConfig.draft
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon className="w-3 h-3 mr-1.5" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    )
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return 'Today'
    if (diffDays === 2) return 'Yesterday'
    if (diffDays <= 7) return `${diffDays - 1} days ago`
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const filteredDocuments = documents.filter(doc =>
    doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.originalName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Check if we should show empty state (only when no filters are applied and no documents exist)
  const shouldShowEmptyState = documents.length === 0 && (!statusFilter || statusFilter === 'all') && !searchTerm;
  
  // Check if we should show "no results" message (when filters are applied but no results)
  const shouldShowNoResults = documents.length === 0 && ((statusFilter && statusFilter !== 'all') || searchTerm);

  // Show loading state while checking authentication
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center max-w-sm mx-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-700 text-center">Processing your documents...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 lg:p-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">
                  Welcome back, {user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'User'}! 👋
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                  Manage your documents and track signing progress
                </p>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Check if user has documents */}
        {!loading && documents.length === 0 ? (
          /* First Time User Experience - Centered Upload */
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            {/* Large Upload Component */}
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-lg">
                <div className="bg-gray-100 p-8 text-gray-700 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Upload className="w-12 h-12 mr-3" />
                    <h2 className="text-3xl font-bold">Upload Your Documents</h2>
                  </div>
                  <p className="text-gray-500 text-lg">
                    Get started by uploading your first document for signing
                  </p>
                </div>
                
                <div className="p-8">
                  <div
                    className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                      isDragOver 
                        ? 'border-gray-400 bg-gray-50' 
                        : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isProcessing}
                    />
                    
                    <div className="space-y-6">
                      <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-colors ${
                        isDragOver ? 'bg-gray-200' : 'bg-gray-100'
                      }`}>
                        <Upload className={`w-12 h-12 ${isDragOver ? 'text-gray-600' : 'text-gray-500'}`} />
                      </div>
                      
                      <div>
                        <p className="text-xl text-gray-700 font-semibold mb-3">
                          Drop files here or click to browse
                        </p>
                        <p className="text-gray-500 leading-relaxed">
                          Supports PDF, Word documents, and images<br />
                          Maximum 50MB per file • Multiple files supported
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <p className="text-gray-600 mb-4">Or start with a blank document</p>
                    <button
                      onClick={() => router.push('/editor/new')}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Create from Scratch
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Widget Below */}
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Start Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">1. Upload</h4>
                    <p className="text-sm text-gray-600">Upload your document or create from scratch</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                      <Edit className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">2. Edit</h4>
                    <p className="text-sm text-gray-600">Add signature fields and customize</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">3. Send</h4>
                    <p className="text-sm text-gray-600">Send to signers and track progress</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Regular Dashboard Layout */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Upload Section - Left Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Upload Documents</h3>
                  <p className="text-sm text-gray-500">
                    Add new documents to get started
                  </p>
                </div>

                <div 
                  className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 cursor-pointer ${
                    isDragOver ? 'border-gray-400 bg-gray-50' : ''
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  {uploading ? (
                    <div className="py-4">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-gray-600" />
                      <p className="text-sm text-gray-600 font-medium">
                        Uploading files...
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {uploadProgress.current}/{uploadProgress.total} files
                      </p>
                    </div>
                  ) : (
                    <div className="py-4">
                      <FolderOpen className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Drop files here or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, Images, Word docs • Max 50MB
                      </p>
                    </div>
                  )}

                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
              </div>
            </div>

            {/* Main Content - Right Column */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">Document Dashboard</h1>
                    <p className="text-gray-600 text-sm lg:text-base">
                      Manage and track your documents
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <span>+12% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Draft</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.draft || 0}</p>
                    </div>
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Edit className="w-5 h-5 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <span>+8% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Sent</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.sent || 0}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Send className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <span>+15% from last month</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.completed || 0}</p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-green-600">
                    <span>+22% from last month</span>
                  </div>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="lg:w-48">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="partially_signed">Partially Signed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
                    <span className="text-sm text-gray-500">
                      {documents.length} of {totalPages} documents
                    </span>
                  </div>
                </div>

                {/* Show empty state only when no filters and no documents */}
                {shouldShowEmptyState ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <FolderOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
                    <p className="text-gray-500 mb-6">Get started by uploading your first document</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => document.getElementById('file-upload').click()}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Document
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Signers
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Created
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {documents.map((doc, index) => (
                            <tr 
                              key={doc.id} 
                              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {doc.title || doc.originalName || 'Untitled Document'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {doc.files ? `${doc.files.length} files` : '1 file'} • 
                                      {doc.fields ? ` ${doc.fields.length} fields` : 
                                       doc.files ? ` ${doc.files.reduce((total, file) => total + (file.fields?.length || 0), 0)} fields` : ' 0 fields'}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                  <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDotColor(doc.status)}`}></span>
                                  {getStatusIcon(doc.status)}
                                  <span className="ml-1">{getStatusText(doc.status)}</span>
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                  {doc.signers && doc.signers.length > 0 ? (
                                    <div>
                                      <span className="font-medium">{doc.signers[0].email}</span>
                                      {doc.signers.length > 1 && (
                                        <span className="text-gray-500 ml-1">+{doc.signers.length - 1} more</span>
                                      )}
                                    </div>
                                  ) : (
                                    <span className="text-gray-400">No signers</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                {formatDate(doc.createdAt)}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => router.push(`/editor/${doc.id}`)}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteDocument(doc.id)}
                                    className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 hover:scale-105 transition-all duration-200"
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden">
                      <div className="divide-y divide-gray-200">
                        {documents.map((doc, index) => (
                          <div 
                            key={doc.id} 
                            className="p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FileCheck className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {doc.title || doc.originalName || 'Untitled Document'}
                                  </p>
                                  <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                                    <span className="flex items-center">
                                      <FileText className="w-3 h-3 mr-1" />
                                      {doc.files ? `${doc.files.length} files` : '1 file'}
                                    </span>
                                    <span className="flex items-center">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {formatDate(doc.createdAt)}
                                    </span>
                                    <span className="flex items-center">
                                      <Users className="w-3 h-3 mr-1" />
                                      {doc.signers?.length || 0}
                                    </span>
                                  </div>
                                  <div className="mt-2">
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDotColor(doc.status)}`}></span>
                                      {getStatusText(doc.status)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 flex space-x-2">
                              <button
                                onClick={() => router.push(`/editor/${doc.id}`)}
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteDocument(doc.id)}
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Show "No Results" message when filters are applied but no results */}
                    {shouldShowNoResults && (
                      <div className="p-8 text-center border-t border-gray-100">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                        <p className="text-gray-500 mb-4">
                          {statusFilter && statusFilter !== 'all' 
                            ? `No documents with status "${statusFilter}" found.`
                            : searchTerm 
                              ? `No documents matching "${searchTerm}" found.`
                              : 'No documents match your current filters.'
                          }
                        </p>
                        <button
                          onClick={() => {
                            setStatusFilter('all');
                            setSearchTerm('');
                          }}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* Pagination - Only show when there are documents */}
                {documents.length > 0 && totalPages > 1 && (
                  <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalPages * 10)} of {totalPages * 10} results
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Previous
                        </button>
                        <span className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md">
                          {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 