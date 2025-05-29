'use client'

import { useState, useEffect } from 'react'
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
  Download
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
    borderColor: 'border-gray-300'
  },
  sent: {
    label: 'Sent',
    color: 'blue',
    icon: Send,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-300'
  },
  partially_signed: {
    label: 'Partially Signed',
    color: 'yellow',
    icon: Clock,
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    borderColor: 'border-yellow-300'
  },
  completed: {
    label: 'Completed',
    color: 'green',
    icon: CheckCircle,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-300'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'red',
    icon: XCircle,
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    borderColor: 'border-red-300'
  }
}

export default function Dashboard() {
  const router = useRouter()
  
  const [documents, setDocuments] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showDropdown, setShowDropdown] = useState(null)

  // Load documents and stats
  useEffect(() => {
    loadDocuments()
    loadStats()
  }, [currentPage, statusFilter])

  const loadDocuments = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
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
    // Open live view in new tab
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <button
              onClick={() => router.push('/')}
              className="btn-primary flex items-center space-x-2"
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
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Documents</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            {Object.entries(STATUS_CONFIG).map(([status, config]) => (
              <div key={status} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <config.icon className={`h-8 w-8 text-${config.color}-400`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{config.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats[status] || 0}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search documents, signers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 input-field"
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
                className="input-field min-w-[150px]"
              >
                <option value="">All Status</option>
                {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                  <option key={status} value={status}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Documents</h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter ? 'Try adjusting your filters' : 'Get started by creating a new document'}
              </p>
              {!searchTerm && !statusFilter && (
                <div className="mt-6">
                  <button
                    onClick={() => router.push('/')}
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Document
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
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
                        <tr key={document.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {document.originalName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {document.fields?.length || 0} fields
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
                                    className="bg-blue-600 h-2 rounded-full" 
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
                            <div className="relative">
                              <button
                                onClick={() => setShowDropdown(showDropdown === document.id ? null : document.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                              >
                                <MoreVertical className="w-4 h-4" />
                              </button>
                              
                              {showDropdown === document.id && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                                  <div className="py-1">
                                    <button
                                      onClick={() => {
                                        handlePreview(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      Preview
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        handleLiveView(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <FileText className="w-4 h-4 mr-2" />
                                      Live View
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        handleEdit(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Edit3 className="w-4 h-4 mr-2" />
                                      Edit
                                    </button>
                                    
                                    <button
                                      onClick={() => {
                                        handleDuplicate(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                    >
                                      <Copy className="w-4 h-4 mr-2" />
                                      Duplicate
                                    </button>
                                    
                                    {document.status !== 'completed' && (
                                      <button
                                        onClick={() => {
                                          handleStatusChange(document.id, 'cancelled')
                                          setShowDropdown(null)
                                        }}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Cancel
                                      </button>
                                    )}
                                    
                                    <div className="border-t border-gray-100"></div>
                                    
                                    <button
                                      onClick={() => {
                                        handleDelete(document.id)
                                        setShowDropdown(null)
                                      }}
                                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                                    >
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Delete
                                    </button>
                                  </div>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
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
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDropdown(null)}
        />
      )}
    </div>
  )
} 