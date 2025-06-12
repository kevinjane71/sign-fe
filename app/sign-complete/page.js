'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, FileText, Download, AlertCircle, RefreshCw, ExternalLink, ArrowRight, Users, Clock, Calendar, Eye, Loader2, Mail } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'

export default function SignCompletePage() {
  const searchParams = useSearchParams()
  const documentId = searchParams.get('document')
  const signerEmail = searchParams.get('signer')
  
  const [status, setStatus] = useState('loading') // loading, success, error
  const [documentData, setDocumentData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!documentId || !signerEmail) {
      setStatus('error')
      setError('Missing document or signer information')
      return
    }

    // Check the signing status
    const checkSigningStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}/status`)
        const result = await response.json()

        if (response.ok) {
          setDocumentData(result.document)
          
          // Check if this signer has completed signing
          const signer = result.document.signers?.find(s => s.email === signerEmail)
          if (signer && signer.signed) {
            setStatus('success')
          } else {
            setStatus('error')
            setError('Document signing not completed. Please complete the signing process first.')
          }
        } else {
          setStatus('error')
          setError(result.error || 'Failed to verify signing status')
        }
      } catch (err) {
        console.error('Error checking signing status:', err)
        setStatus('error')
        setError('Unable to verify signing status. Please check your connection and try again.')
      }
    }

    checkSigningStatus()
  }, [documentId, signerEmail])

  const handleDownloadDocument = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}/download`)
      
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${documentData?.title || 'signed-document'}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        throw new Error('Failed to download document')
      }
    } catch (err) {
      console.error('Download error:', err)
      alert('Failed to download document. Please try again.')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying signing status...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't complete your signing request. Please try again or contact support."}
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Document Signed Successfully!
              </h1>
              <p className="text-gray-600">
                Your signature has been added to the document
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Document Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Document Title</label>
                <p className="text-gray-900">{documentData?.title || 'Signed Document'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Signed By</label>
                <p className="text-gray-900">{signerEmail}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Signed On</label>
                <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-green-700 font-medium">Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              What's Next?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Email Notification Sent</p>
                  <p className="text-sm text-gray-600">
                    All parties involved will receive an email with the signed document attached.
                  </p>
                </div>
              </div>
              
              {/* <div className="flex items-start space-x-3">
                <Download className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Download Available</p>
                  <p className="text-sm text-gray-600 mb-2">
                    {documentData?.allSigned && documentData?.downloadUrl ? (
                      'You can download a copy of the signed document now.'
                    ) : (
                      'The final signed document will be available once all parties have signed.'
                    )}
                  </p>
                  <button
                    onClick={handleDownloadDocument}
                    disabled={!(documentData?.allSigned && documentData?.downloadUrl)}
                    className={`px-4 py-2 bg-green-600 text-white text-sm rounded-md transition-colors ${
                      documentData?.allSigned && documentData?.downloadUrl
                        ? 'hover:bg-green-700'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                  >
                    Download Signed Document
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>
              This document has been digitally signed and is legally binding.
            </p>
            <p className="mt-2">
              If you have any questions, please contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }
} 