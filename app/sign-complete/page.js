'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Download, ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SignComplete() {
  const searchParams = useSearchParams()
  const success = searchParams.get('success') === 'true'

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">✕</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn't complete your signing request. Please try again or contact support.
            </p>
            <Link href="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Document Signed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for signing the document. All parties will be notified via email once the signing process is complete.
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 text-blue-800">
                <Mail className="w-5 h-5" />
                <span className="text-sm font-medium">
                  You'll receive an email confirmation shortly
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• You'll receive a copy of the signed document via email</li>
                <li>• Other signers will be notified to complete their signatures</li>
                <li>• Once all signatures are collected, everyone will receive the final document</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 