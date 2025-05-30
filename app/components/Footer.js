'use client'

import { FileText, Heart, Shield, Zap, Users, Globe, Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  SignFlow
                </span>
                <div className="text-sm text-gray-400 -mt-1">Professional Signing Platform</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm max-w-md mb-6 leading-relaxed">
              Transform your document workflow with our secure, professional e-signature platform. 
              Trusted by thousands of businesses worldwide for seamless document signing experiences.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Lightning Fast</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Team Collaboration</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Twitter className="w-4 h-4 text-gray-300" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4 text-gray-300" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                <Github className="w-4 h-4 text-gray-300" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2 text-blue-400" />
              Product
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Features</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Security</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">API Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Integrations</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Mobile Apps</a></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center">
              <Users className="w-4 h-4 mr-2 text-green-400" />
              Support
            </h3>
            <ul className="space-y-3 mb-6">
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Help Center</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Contact Support</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-white transition-colors hover:underline">Terms of Service</a></li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@signflow.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-green-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <p className="text-sm text-gray-400">
              © 2024 SignFlow Technologies Inc. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-300 transition-colors">Cookies</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-400 mt-4 lg:mt-0">
            <span>Crafted with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current animate-pulse" />
            <span>for seamless workflows</span>
          </div>
        </div>
      </div>
    </footer>
  )
} 