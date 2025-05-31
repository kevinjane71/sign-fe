'use client'

import { FileText, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">DocuSign Pro</span>
              <div className="text-xs text-gray-400 -mt-1">Professional Document Editor</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <span>© 2024 DocuSign Pro</span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-400 fill-current" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 