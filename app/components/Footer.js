'use client'

import { FileText, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">SignFlow</span>
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Professional document signing made simple. Create, share, and sign documents with ease.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Security</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">API</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2024 SignFlow. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-500 mt-4 sm:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for better workflows</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 