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
  X
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getStoredUser, getDocuments, getDocumentStats, isAuthenticated, logout } from '../utils/api'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const router = useRouter()
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
      onDrop(files)
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: Clock },
      sent: { color: 'bg-blue-100 text-blue-800', icon: Send },
      partially_signed: { color: 'bg-yellow-100 text-yellow-800', icon: Users },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-800', icon: Trash2 }
    }
    
    const config = statusConfig[status] || statusConfig.draft
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col items-center max-w-sm mx-4">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-700 text-center">Processing your documents...</p>
            <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100">
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Upload Section - Left Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Upload Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center mb-3">
                    <Upload className="w-6 h-6 mr-2" />
                    <h3 className="text-lg font-semibold">Upload Documents</h3>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Drag & drop or click to upload multiple files
                  </p>
                </div>
                
                <div className="p-6">
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      isDragOver 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isProcessing}
                    />
                    
                    <div className="space-y-3">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors ${
                        isDragOver ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <Upload className={`w-8 h-8 ${isDragOver ? 'text-blue-600' : 'text-gray-500'}`} />
                      </div>
                      
                      <div>
                        <p className="text-gray-700 font-medium mb-1">
                          Drop files here or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          PDF, Word, Images • Max 50MB each
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => router.push('/editor/new')}
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create from Scratch
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">This Month</span>
                    <span className="text-sm font-semibold text-green-600">+12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Completion</span>
                    <span className="text-sm font-semibold text-blue-600">2.3 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-sm font-semibold text-purple-600">94%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Right Column */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-8">
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 lg:p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-2 lg:p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg lg:rounded-xl group-hover:scale-110 transition-transform">
                    <FileText className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total</p>
                    <div className="flex items-center">
                      <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.total}</p>
                      <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-green-500 ml-1 lg:ml-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 lg:p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-2 lg:p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg lg:rounded-xl group-hover:scale-110 transition-transform">
                    <Clock className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Draft</p>
                    <div className="flex items-center">
                      <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.draft}</p>
                      <span className="text-xs text-orange-600 ml-1 lg:ml-2">+8%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 lg:p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-2 lg:p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg lg:rounded-xl group-hover:scale-110 transition-transform">
                    <Send className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Sent</p>
                    <div className="flex items-center">
                      <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.sent}</p>
                      <span className="text-xs text-purple-600 ml-1 lg:ml-2">+15%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 p-3 lg:p-6 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center">
                  <div className="p-2 lg:p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg lg:rounded-xl group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div className="ml-3 lg:ml-4 min-w-0 flex-1">
                    <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Done</p>
                    <div className="flex items-center">
                      <p className="text-lg lg:text-2xl font-bold text-gray-900">{stats.completed}</p>
                      <span className="text-xs text-green-600 ml-1 lg:ml-2">+22%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="px-4 lg:px-6 py-4 lg:py-6 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Recent Documents</h2>
                    <p className="text-sm text-gray-600 mt-1">Manage and track your document signing progress</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-full sm:w-64"
                      />
                    </div>
                    
                    {/* Filter */}
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="partially_signed">Partially Signed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Documents List */}
              <div className="p-4 lg:p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                ) : filteredDocuments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <FolderOpen className="w-12 h-12 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents yet</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Get started by uploading your first document or creating one from scratch.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => document.querySelector('input[type="file"]').click()}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        Upload Document
                      </button>
                      <button
                        onClick={() => router.push('/editor/new')}
                        className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 font-medium"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Create New
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Document</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Signers</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Updated</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredDocuments.map((doc, index) => (
                            <tr 
                              key={doc.id} 
                              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 group"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                                    <FileText className="w-5 h-5 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {doc.title || doc.originalName || 'Untitled Document'}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {doc.fields?.length || 0} fields • {doc.files?.length || 1} files
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                {getStatusBadge(doc.status)}
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                                  <span className="text-sm text-gray-600">
                                    {doc.signers?.length > 0 
                                      ? `${doc.signers[0].email}${doc.signers.length > 1 ? ` +${doc.signers.length - 1} more` : ''}`
                                      : 'No signers'
                                    }
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  {formatDate(doc.updatedAt)}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-2">
                                  <button 
                                    onClick={() => router.push(`/editor/${doc.id}`)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
                                    title="Edit"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button 
                                    onClick={() => router.push(`/document/${doc.id}`)}
                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-300 hover:scale-110"
                                    title="View"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:scale-110">
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {filteredDocuments.map((doc, index) => (
                        <div 
                          key={doc.id} 
                          className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center flex-1 min-w-0">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-gray-900 truncate">
                                  {doc.title || doc.originalName || 'Untitled Document'}
                                </p>
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <FileText className="w-3 h-3 mr-1" />
                                  <span>{doc.fields?.length || 0} fields</span>
                                  <span className="mx-2">•</span>
                                  <Calendar className="w-3 h-3 mr-1" />
                                  <span>{formatDate(doc.updatedAt)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-2">
                              <button 
                                onClick={() => router.push(`/editor/${doc.id}`)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => router.push(`/document/${doc.id}`)}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {getStatusBadge(doc.status)}
                              <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-1" />
                                <span>
                                  {doc.signers?.length > 0 
                                    ? `${doc.signers.length} signer${doc.signers.length > 1 ? 's' : ''}`
                                    : 'No signers'
                                  }
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                          Page {currentPage} of {totalPages}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 