'use client'

import { Check, FileText, Home } from 'lucide-react'
import Link from 'next/link'

export default function SignComplete() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-sm border max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Document Signed Successfully!
          </h1>
          <p className="text-gray-600">
            Thank you for signing the document. All parties will be notified of your signature.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <FileText className="w-4 h-4" />
            <span>Your signature has been securely recorded</span>
          </div>
          
          <div className="pt-4 border-t">
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 