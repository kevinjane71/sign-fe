'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  FileText,
  Plus,
  Edit3,
  Eye,
  Send,
  Trash2,
  Copy,
  Filter,
  Search,
  Calendar,
  User,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
  MoreVertical,
  Download,
  TrendingUp,
  Users,
  Activity,
  Star,
  Grid,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'

const STATUS_CONFIG = {
  draft: {
    label: 'Draft',
    color: 'gray',
    icon: Edit3,
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-300',
    gradient: 'from-gray-50 to-gray-100'
  },
  sent: {
    label: 'Sent',
    color: 'blue',
    icon: Send,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300',
    gradient: 'from-blue-50 to-blue-100'
  },
  partially_signed: {
    label: 'Partially Signed',
    color: 'yellow',
    icon: Clock,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-300',
    gradient: 'from-yellow-50 to-yellow-100'
  },
  completed: {
    label: 'Completed',
    color: 'green',
    icon: CheckCircle,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-300',
    gradient: 'from-green-50 to-green-100'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'red',
    icon: XCircle,
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-300',
    gradient: 'from-red-50 to-red-100'
  }
}

export default function Dashboard() {
  const router = useRouter()
  const dropdownRefs = useRef({})
  
  const [documents, setDocuments] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showDropdown, setShowDropdown] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  // Load documents and stats
  useEffect(() => {
    loadDocuments()
    loadStats()
  }, [currentPage, statusFilter, sortBy, sortOrder])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && dropdownRefs.current[showDropdown]) {
        if (!dropdownRefs.current[showDropdown].contains(event.target)) {
          setShowDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        sortBy,
        sortOrder
      })
      
      if (statusFilter) {
        params.append('status', statusFilter)
      }

      const response = await axios.get(`${API_BASE_URL}/api/documents?${params}`)
      if (response.data.success) {
        setDocuments(response.data.documents)
        setTotalPages(response.data.pagination.totalPages)
      }
    } catch (error) {
      console.error('Load documents error:', error)
      toast.error('Failed to load documents')
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/documents/stats`)
      if (response.data.success) {
        setStats(response.data.stats)
      }
    } catch (error) {
      console.error('Load stats error:', error)
    }
  }

  // Filter documents by search term
  const filteredDocuments = documents.filter(doc =>
    doc.originalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.signers?.some(signer => 
      signer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  // Handle document actions
  const handleEdit = (documentId) => {
    router.push(`/editor/${documentId}`)
  }

  const handlePreview = (documentId) => {
    router.push(`/preview/${documentId}`)
  }

  const handleLiveView = (documentId) => {
    window.open(`/live/${documentId}`, '_blank')
  }

  const handleDuplicate = async (documentId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/documents/${documentId}/duplicate`)
      if (response.data.success) {
        toast.success('Document duplicated successfully')
        router.push(`/editor/${response.data.documentId}`)
      }
    } catch (error) {
      console.error('Duplicate error:', error)
      toast.error('Failed to duplicate document')
    }
  }

  const handleDelete = async (documentId) => {
    if (!confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      return
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/documents/${documentId}`)
      toast.success('Document deleted successfully')
      loadDocuments()
      loadStats()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Failed to delete document')
    }
  }

  const handleStatusChange = async (documentId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/documents/${documentId}/status`, {
        status: newStatus
      })
      toast.success('Document status updated')
      loadDocuments()
      loadStats()
    } catch (error) {
      console.error('Status update error:', error)
      toast.error('Failed to update document status')
    }
  }

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    
    let date
    if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000)
    } else {
      date = new Date(timestamp)
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get signing progress
  const getSigningProgress = (signers) => {
    if (!signers || signers.length === 0) return { signed: 0, total: 0, percentage: 0 }
    
    const signed = signers.filter(s => s.signed).length
    const total = signers.length
    const percentage = Math.round((signed / total) * 100)
    
    return { signed, total, percentage }
  }

  // Get relative time
  const getRelativeTime = (timestamp) => {
    if (!timestamp) return 'Unknown'
    
    let date
    if (timestamp.seconds) {
      date = new Date(timestamp.seconds * 1000)
    } else {
      date = new Date(timestamp)
    }
    
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
    return formatDate(timestamp)
  }

  const DocumentCard = ({ document }) => {
    const statusConfig = STATUS_CONFIG[document.status] || STATUS_CONFIG.draft
    const StatusIcon = statusConfig.icon
    const progress = getSigningProgress(document.signers)
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-gray-300 group relative">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${statusConfig.gradient}`}>
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                  {document.originalName}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {document.files?.length || 1} file{(document.files?.length || 1) > 1 ? 's' : ''} • {document.fields?.length || 0} fields
                </p>
              </div>
            </div>
            
            <div className="relative" ref={el => dropdownRefs.current[document.id] = el}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowDropdown(showDropdown === document.id ? null : document.id)
                }}
                className="p-1.5 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
              
              {showDropdown === document.id && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] py-1">
                  <button
                    onClick={() => {
                      handlePreview(document.id)
                      setShowDropdown(null)
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    <Eye className="w-4 h-4 mr-3 text-gray-400" />
                    Preview
                  </button>
                  
                  <button
                    onClick={() => {
                      handleEdit(document.id)
                      setShowDropdown(null)
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    <Edit3 className="w-4 h-4 mr-3 text-gray-400" />
                    Edit
                  </button>
                  
                  <button
                    onClick={() => {
                      handleDuplicate(document.id)
                      setShowDropdown(null)
                    }}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    <Copy className="w-4 h-4 mr-3 text-gray-400" />
                    Duplicate
                  </button>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button
                    onClick={() => {
                      handleDelete(document.id)
                      setShowDropdown(null)
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <Trash2 className="w-4 h-4 mr-3" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
              <StatusIcon className="w-3 h-3 mr-1.5" />
              {statusConfig.label}
            </span>
            <span className="text-xs text-gray-500">
              {getRelativeTime(document.createdAt)}
            </span>
          </div>

          {/* Progress */}
          {document.signers?.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-700">Signing Progress</span>
                <span className="text-xs text-gray-500">
                  {progress.signed}/{progress.total} signed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Signers */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {document.signers?.length || 0} signer{(document.signers?.length || 0) !== 1 ? 's' : ''}
              </span>
            </div>
            
            <button
              onClick={() => handleEdit(document.id)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Open →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard
              </h1>
              {stats && (
                <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-500">
                  <span>{stats.total} documents</span>
                  <span>•</span>
                  <span>{stats.completed || 0} completed</span>
                </div>
              )}
            </div>
            
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Document</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <div key={status} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`p-3 bg-gradient-to-br ${config.gradient} rounded-lg`}>
                      <config.icon className={`h-6 w-6 text-${config.color}-600`} />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{config.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stats[status] || 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search documents, signers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[150px]"
                >
                  <option value="">All Status</option>
                  {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                    <option key={status} value={status}>{config.label}</option>
                  ))}
                </select>

                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-')
                    setSortBy(field)
                    setSortOrder(order)
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="createdAt-asc">Oldest First</option>
                  <option value="originalName-asc">Name A-Z</option>
                  <option value="originalName-desc">Name Z-A</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Documents */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-500">Loading documents...</p>
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter ? 'Try adjusting your filters' : 'Get started by creating your first document'}
              </p>
              {!searchTerm && !statusFilter && (
                <button
                  onClick={() => router.push('/')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md inline-flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Document</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredDocuments.map((document) => (
                  <DocumentCard key={document.id} document={document} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
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
                          Progress
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
                      {filteredDocuments.map((document) => {
                        const statusConfig = STATUS_CONFIG[document.status] || STATUS_CONFIG.draft
                        const StatusIcon = statusConfig.icon
                        const progress = getSigningProgress(document.signers)
                        
                        return (
                          <tr key={document.id} className="hover:bg-gray-50 transition-colors relative">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${statusConfig.gradient} mr-3`}>
                                  <FileText className="h-4 w-4 text-gray-600" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {document.originalName}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {document.files?.length || 1} file{(document.files?.length || 1) > 1 ? 's' : ''} • {document.fields?.length || 0} fields
                                  </div>
                                </div>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                              </span>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {document.signers?.length || 0} signers
                              </div>
                              {document.signers?.length > 0 && (
                                <div className="text-sm text-gray-500">
                                  {document.signers.slice(0, 2).map(signer => signer.name).join(', ')}
                                  {document.signers.length > 2 && ` +${document.signers.length - 2} more`}
                                </div>
                              )}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                              {document.signers?.length > 0 ? (
                                <div className="flex items-center">
                                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300" 
                                      style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-600">
                                    {progress.signed}/{progress.total}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400">No signers</span>
                              )}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(document.createdAt)}
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="relative" ref={el => dropdownRefs.current[document.id] = el}>
                                <button
                                  onClick={() => setShowDropdown(showDropdown === document.id ? null : document.id)}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                  <MoreVertical className="w-4 h-4 text-gray-400" />
                                </button>
                                
                                {showDropdown === document.id && (
                                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] py-1">
                                    <button
                                      onClick={() => {
                                        handlePreview(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                                    >
                                      <Eye className="w-4 h-4 mr-3 text-gray-400" />
                                      Preview
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        handleEdit(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                                    >
                                      <Edit3 className="w-4 h-4 mr-3 text-gray-400" />
                                      Edit
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        handleDuplicate(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left"
                                    >
                                      <Copy className="w-4 h-4 mr-3 text-gray-400" />
                                      Duplicate
                                    </button>
                                    
                                    <div className="border-t border-gray-100 my-1"></div>
                                    
                                    <button
                                      onClick={() => {
                                        handleDelete(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                    >
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span>
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-4 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
} 