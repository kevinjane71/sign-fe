'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreVertical, 
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2,
  Copy,
  Send,
  Pause,
  Play,
  XCircle,
  FileText,
  User,
  Mail,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Archive,
  Star,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Upload,
  Loader2
} from 'lucide-react'
import { useToast } from '../components/LayoutWrapper'
import { getUserDocuments, deleteDocument, duplicateDocument, isAuthenticated, getStoredUser, getDocuments, getDocumentStats } from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'
import Modal from '../components/Modal'

export default function Dashboard() {
  const router = useRouter()
  const toast = useToast()
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
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDuplicating, setIsDuplicating] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [pendingDeleteDoc, setPendingDeleteDoc] = useState(null)
  const dropdownRef = useRef(null)
  const fileInputRef = useRef(null)

  // Clear document configuration when visiting dashboard
  useEffect(() => {
    sessionStorage.removeItem('documentConfiguration');
  }, []);

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

  // Add these helper functions after the existing status helpers
  const getSignerStatusColor = (hasSigned) => {
    return hasSigned 
      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
      : 'bg-rose-50 text-rose-700 border-rose-200'
  }

  // Helper to infer hasSigned if missing
  const inferSignerHasSigned = (signer, docStatus) => {
    if (typeof signer.hasSigned === 'boolean') return signer.hasSigned
    if (docStatus === 'completed') return true
    return false // sent, partially_signed, draft, etc.
  }

  const getSigningProgress = (signers, docStatus) => {
    if (!signers || signers.length === 0) return { signed: 0, total: 0, percentage: 0 }
    const signed = signers.filter(s => inferSignerHasSigned(s, docStatus)).length
    return {
      signed,
      total: signers.length,
      percentage: signers.length === 0 ? 0 : Math.round((signed / signers.length) * 100)
    }
  }

  const getProgressColor = (percentage) => {
    if (percentage === 100) return 'bg-emerald-500'
    if (percentage >= 50) return 'bg-blue-500'
    return 'bg-rose-400'
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

  useEffect(() => {
    // Add click outside handler for both dropdowns
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.dropdown-container')) {
        setActiveDropdown(null)
      }
      if (isFilterOpen && !event.target.closest('.filter-container')) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeDropdown, isFilterOpen])

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
      setIsTableLoading(true)
      const params = {
        page: currentPage.toString(),
        limit: '10'
      }
      
      if (statusFilter !== 'all') {
        params.status = statusFilter
      }

      const response = await getDocuments(params)
      
      if (response.success) {
        // Sort by updatedAt desc, fallback to createdAt
        const sortedDocs = [...response.documents].sort((a, b) => {
          const aDate = new Date(a.updatedAt || a.createdAt)
          const bDate = new Date(b.updatedAt || b.createdAt)
          return bDate - aDate
        })
        setDocuments(sortedDocs)
        setTotalPages(response.pagination.totalPages)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
      if (error.message !== 'Authentication required') {
        setDocuments([])
      }
    } finally {
      setIsTableLoading(false)
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
          router.push('/editor/local-new')
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
            router.push('/editor/local-new')
          } else {
            setIsProcessing(false)
          }
        }
      }

      reader.readAsDataURL(file)
    })
  }, [router])

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

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onDrop(files)
    }
  }

  const handleDeleteDocument = async (documentId) => {
    try {
      const response = await deleteDocument(documentId)

      if (response.success) {
        toast.success('Document deleted successfully!')
        fetchDocuments()
      } else {
        toast.error(response.error || 'Delete failed')
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      toast.error('Failed to delete document')
    }
  }

  const handleDuplicateDocument = async (documentId) => {
    try {
      const response = await duplicateDocument(documentId)

      if (response.success) {
        toast.success('Document duplicated successfully!')
        fetchDocuments()
      } else {
        toast.error(response.error || 'Duplicate failed')
      }
    } catch (error) {
      console.error('Error duplicating document:', error)
      toast.error('Failed to duplicate document')
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
    let date;
    // Handle Firebase timestamp format
    if (dateString && typeof dateString === 'object' && dateString._seconds) {
      date = new Date(dateString._seconds * 1000 + (dateString._nanoseconds || 0) / 1000000);
    } else if (dateString) {
      date = new Date(dateString);
    } else {
      return 'Unknown';
    }
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    // Format: Sat, 6 Jul 2024, 12:30pm
    return date.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(/, ([0-9]{1,2}):([0-9]{2}) ([AP]M)$/, (match, h, m, ampm) => `, ${h}:${m.toLowerCase()}${ampm.toLowerCase()}`)
  }

  const filteredDocuments = documents.filter(doc =>
    doc.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.originalName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Check if we should show empty state (only when no filters are applied and no documents exist)
  const shouldShowEmptyState = documents.length === 0 && (!statusFilter || statusFilter === 'all') && !searchTerm;
  
  // Check if we should show "no results" message (when filters are applied but no results)
  const shouldShowNoResults = documents.length === 0 && ((statusFilter && statusFilter !== 'all') || searchTerm);

  const handleDeleteClick = (doc) => {
    setPendingDeleteDoc(doc)
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    if (pendingDeleteDoc) {
      await handleDeleteDocument(pendingDeleteDoc.id)
      setShowDeleteModal(false)
      setPendingDeleteDoc(null)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
    setPendingDeleteDoc(null)
  }

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
        <LoadingSpinner 
          type="upload"
          size="default"
        />
      )}

      <div className="w-full px-2 sm:px-6 lg:px-24 py-6 lg:py-8">
        {/* Header Section */}
        <div className="mb-4 lg:mb-8">
          <div className="bg-white rounded-lg p-3 lg:p-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-2 lg:mb-0">
                <h1 className="text-lg lg:text-3xl font-bold mb-1 lg:mb-2 text-gray-900">
                  {user?.name ? `Welcome, ${user.name.split(' ')[0]}! 👋` : 'Welcome! 👋'}
                </h1>
                <p className="text-xs lg:text-base text-gray-600">
                  Manage your documents and track signing progress
                </p>
              </div>
              <div className="hidden lg:flex justify-end w-full lg:w-auto mt-4 lg:mt-0">
                <button
                  onClick={() => document.getElementById('file-upload').click()}
                  className="inline-flex items-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow font-semibold text-base transition-all duration-200"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Regular Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
          {/* Upload Section - Left Column - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-50 via-white to-rose-50 rounded-xl p-6 border border-gray-100 shadow-sm">
                <div className="text-center mb-4">
                <div className="w-12 h-12 mx-auto mb-3 bg-gray-200 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-gray-900">Upload Documents</h3>
                <p className="text-xs text-gray-600">
                    Add new documents to get started
                  </p>
                </div>

                <div 
                className={`border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 cursor-pointer ${
                    isDragOver ? 'border-emerald-400 bg-emerald-50' : ''
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                <div className="py-3">
                  <FolderOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-xs font-medium text-gray-900 mb-1">
                      Drop files here or click to browse
                    </p>
                  <p className="text-[10px] text-gray-500">
                      PDF, Images, Word docs • Max 50MB
                    </p>
                  </div>

                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Main Content - Right Column */}
            <div className="lg:col-span-3">
              {/* Header */}
            <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                  <h1 className="text-xl lg:text-2xl font-bold mb-1 text-gray-900">Document Dashboard</h1>
                  <p className="text-xs lg:text-sm text-gray-600">
                      Manage and track your documents
                    </p>
                  </div>
                {/* Mobile Upload Button */}
                <div className="lg:hidden mt-3">
                  <button
                    onClick={() => document.getElementById('file-upload').click()}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow text-sm font-medium transition-all duration-200"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </button>
                  </div>
                </div>
              </div>

            {/* Main Content Area: Loading, Empty State, or Data */}
            {isTableLoading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-2" />
                <span className="text-gray-600 text-sm">Loading documents...</span>
              </div>
            ) : shouldShowEmptyState ? (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents Yet</h3>
                  <p className="text-sm text-gray-600 mb-6">
                    Get started by uploading your first document. You can upload PDFs, images, and Word documents.
                  </p>
                  <button
                    onClick={() => document.getElementById('file-upload').click()}
                    className="inline-flex items-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow font-medium text-sm transition-all duration-200"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Your First Document
                  </button>
                </div>
              </div>
            ) : (
              <>
              {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-600">Total</p>
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{stats.total || 0}</p>
                    </div>
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-600">Draft</p>
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{stats.draft || 0}</p>
                    </div>
                      <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Edit className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-600">Sent</p>
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{stats.sent || 0}</p>
                    </div>
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Send className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-600">Completed</p>
                        <p className="text-lg lg:text-xl font-bold text-gray-900">{stats.completed || 0}</p>
                    </div>
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-lg p-3 mb-4 shadow-sm border border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                      <input
                        type="text"
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                    <div className="lg:w-40 filter-container">
                      <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
                    >
                        <span className="flex items-center">
                          <Filter className="w-3.5 h-3.5 mr-2 text-gray-500" />
                          {statusFilter === 'all' ? 'All Status' : getStatusText(statusFilter)}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isFilterOpen ? 'transform rotate-180' : ''}`} />
                      </button>
                      {isFilterOpen && (
                        <div className="absolute mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-10 transform origin-top-right transition-all duration-200 ease-out">
                          <div className="py-1">
                            <div className="px-4 py-2 border-b border-gray-100">
                              <p className="text-xs font-medium text-gray-900">Filter by Status</p>
                              <p className="text-[10px] text-gray-500 mt-0.5">Select a status to filter documents</p>
                  </div>
                            <button
                              onClick={() => {
                                setStatusFilter('all');
                                setIsFilterOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-xs flex items-center transition-colors duration-150 ${
                                statusFilter === 'all' 
                                  ? 'bg-blue-50 text-blue-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                                <FileText className="w-4 h-4 text-gray-600" />
                </div>
                              <div>
                                <p className="font-medium">All Documents</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Show all documents</p>
              </div>
                            </button>
                            <button
                              onClick={() => {
                                setStatusFilter('draft');
                                setIsFilterOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-xs flex items-center transition-colors duration-150 ${
                                statusFilter === 'draft' 
                                  ? 'bg-amber-50 text-amber-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
                                <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                              <div>
                                <p className="font-medium">Draft</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Documents in draft state</p>
                </div>
                            </button>
                            <button
                              onClick={() => {
                                setStatusFilter('sent');
                                setIsFilterOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-xs flex items-center transition-colors duration-150 ${
                                statusFilter === 'sent' 
                                  ? 'bg-blue-50 text-blue-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                                <Send className="w-4 h-4 text-blue-600" />
                    </div>
                              <div>
                                <p className="font-medium">Sent</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Documents sent for signing</p>
                              </div>
                            </button>
                      <button
                              onClick={() => {
                                setStatusFilter('partially_signed');
                                setIsFilterOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-xs flex items-center transition-colors duration-150 ${
                                statusFilter === 'partially_signed' 
                                  ? 'bg-purple-50 text-purple-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                                <Users className="w-4 h-4 text-purple-600" />
                              </div>
                              <div>
                                <p className="font-medium">Partially Signed</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Documents with pending signatures</p>
                              </div>
                      </button>
                            <button
                              onClick={() => {
                                setStatusFilter('completed');
                                setIsFilterOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-xs flex items-center transition-colors duration-150 ${
                                statusFilter === 'completed' 
                                  ? 'bg-emerald-50 text-emerald-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mr-3">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                              <div>
                                <p className="font-medium">Completed</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Fully signed documents</p>
                  </div>
                            </button>
                            <button
                              onClick={() => {
                                setStatusFilter('cancelled');
                                setIsFilterOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left text-xs flex items-center transition-colors duration-150 ${
                                statusFilter === 'cancelled' 
                                  ? 'bg-red-50 text-red-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                                <XCircle className="w-4 h-4 text-red-600" />
                              </div>
                              <div>
                                <p className="font-medium">Cancelled</p>
                                <p className="text-[10px] text-gray-500 mt-0.5">Cancelled documents</p>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
                      <span className="text-xs text-gray-500">
                        {documents.length} of {totalPages} documents
                      </span>
                    </div>
                  </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '40%'}}>
                              Document
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '15%'}}>
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '20%'}}>
                              Signers
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '10%'}}>
                              Created
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" style={{width: '15%'}}>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {isTableLoading ? (
                          <tr>
                            <td colSpan="5" className="px-4 py-8">
                              <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-3 text-sm text-gray-600">Loading documents...</span>
                              </div>
                            </td>
                          </tr>
                        ) : documents.map((doc, index) => (
                            <tr 
                              key={doc.id} 
                              className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              <td className="px-4 py-3" style={{width: '40%'}}>
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="min-w-0 flex-1" style={{wordBreak: 'break-word', whiteSpace: 'normal'}}>
                                    <p className="text-sm font-medium text-gray-900" title={doc.title || doc.originalName || 'Untitled Document'}>
                                      {doc.title || doc.originalName || 'Untitled Document'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {doc.totalFiles ? `${doc.totalFiles} files` : doc.files ? `${doc.files.length} files` : '1 file'} • 
                                      {(() => {
                                        const totalFields = doc.files ? doc.files.reduce((total, file) => total + (file.fields?.length || 0), 0) : 0;
                                        return `${totalFields} fields`;
                                      })()}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3" style={{width: '15%'}}>
                                <div className="flex flex-col space-y-1">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1 ${getStatusDotColor(doc.status)}`}></span>
                                    {getStatusIcon(doc.status)}
                                    <span className="ml-1">{getStatusText(doc.status)}</span>
                                  </span>
                                  <div className="w-full mt-1">
                                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full transition-all duration-300 ${getProgressColor(getSigningProgress(doc.signers, doc.status).percentage)}`}
                                        style={{ width: `${getSigningProgress(doc.signers, doc.status).percentage}%` }}
                                      />
                                    </div>
                                    <span className="text-[10px] text-gray-500 ml-1">{getSigningProgress(doc.signers, doc.status).signed}/{getSigningProgress(doc.signers, doc.status).total}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3" style={{width: '20%'}}>
                                {doc.signers && doc.signers.length > 0 ? (
                                  <div className="flex flex-wrap gap-1.5 items-center">
                                    {doc.signers.slice(0, 3).map((signer) => (
                                      <span
                                        key={signer.email}
                                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border shadow-sm ${getSignerStatusColor(inferSignerHasSigned(signer, doc.status))}`}
                                      >
                                        {signer.email}
                                      </span>
                                    ))}
                                    {doc.signers.length > 3 && (
                                      <span className="text-[10px] text-gray-500">
                                        +{doc.signers.length - 3} more
                                      </span>
                                    )}
                                    {doc.signers.length > 3 && (
                                      <div className="absolute z-10 left-0 mt-1 w-max min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-lg p-2 text-xs text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                                        <div className="space-y-1.5">
                                          {doc.signers.map((signer) => (
                                            <div key={signer.email} className="flex items-center justify-between">
                                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border shadow-sm ${getSignerStatusColor(inferSignerHasSigned(signer, doc.status))}`}>
                                                {signer.email}
                                              </span>
                                              <span className={`text-[10px] font-medium ml-2 ${inferSignerHasSigned(signer, doc.status) ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                {inferSignerHasSigned(signer, doc.status) ? 'Signed' : 'Pending'}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-xs">No signers</span>
                                )}
                              </td>
                              <td className="px-4 py-3 text-xs text-gray-500" style={{width: '10%'}}>
                                {formatDate(doc.createdAt)}
                              </td>
                              <td className="px-4 py-3" style={{width: '15%'}}>
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => router.push(`/editor/${doc.id}`)}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                                    title="Edit Document"
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteClick(doc)}
                                    className="inline-flex items-center px-3 py-1.5 border border-red-200 text-xs font-medium rounded text-red-600 bg-white hover:bg-red-50 hover:scale-105 transition-all duration-200"
                                    title="Delete Document"
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
                    {isTableLoading ? (
                      <div className="p-8">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <span className="ml-3 text-sm text-gray-600">Loading documents...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-200">
                        {documents.map((doc, index) => (
                          <div 
                            key={doc.id} 
                            className="p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3 flex-1 min-w-0">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <FileText className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate" title={doc.title || doc.originalName || 'Untitled Document'}>
                                    {doc.title || doc.originalName || 'Untitled Document'}
                                  </p>
                                  <div className="mt-1 flex items-center space-x-3 text-xs text-gray-500">
                                    <span className="flex items-center">
                                      <FileText className="w-3 h-3 mr-1" />
                                      {doc.totalFiles ? `${doc.totalFiles} files` : doc.files ? `${doc.files.length} files` : '1 file'}
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
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteClick(doc)}
                                className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-200 text-xs font-medium rounded text-red-600 bg-white hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    </div>

                {/* Pagination - Only show when there are documents */}
                {documents.length > 0 && totalPages > 1 && (
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalPages * 10)} of {totalPages * 10} results
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-1 text-xs border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Previous
                        </button>
                        <span className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded">
                          {currentPage} of {totalPages}
                        </span>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-1 text-xs border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              </>
            )}
            </div>
          </div>
      </div>

      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <Modal isOpen={showDeleteModal} onClose={handleCancelDelete}>
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Delete Document</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to delete <span className="font-bold">{pendingDeleteDoc?.title || pendingDeleteDoc?.originalName || 'this document'}</span>? This action cannot be undone.</p>
            <div className="flex justify-end space-x-2">
              <button onClick={handleCancelDelete} className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
} 