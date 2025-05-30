'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, Home, Settings, User, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Check if we're on home page
  const isHomePage = pathname === '/'

  // If not on home page, show minimal header
  if (!isHomePage) {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    SignFlow
                  </span>
                </div>
              </button>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === '/dashboard'
                    ? 'text-blue-600 bg-blue-50 shadow-sm border border-blue-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Documents</span>
              </button>
            </nav>

            {/* User Profile */}
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700">John Doe</span>
            </button>
          </div>
        </div>
      </header>
    )
  }

  // Full header for home page
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Documents', href: '/dashboard', icon: FileText },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="w-full px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SignFlow
                </span>
                <div className="text-xs text-gray-500 -mt-1 font-medium">Professional Document Signing</div>
              </div>
            </button>
          </div>

          {/* Search Bar - Left/Middle */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300">
                <Search className="w-4 h-4" />
                <span className="text-sm font-medium">Search documents...</span>
              </button>
            </div>
          </div>

          {/* Right Side - Navigation and User */}
          <div className="flex items-center space-x-4">
            {/* Navigation - Moved to right */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 shadow-sm border border-blue-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* User Profile */}
            <button className="flex items-center space-x-2 px-3 py-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700">John Doe</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-6">
            <div className="space-y-3">
              {/* Mobile Search */}
              <div className="px-6">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200">
                  <Search className="w-5 h-5" />
                  <span className="text-sm font-medium">Search documents...</span>
                </button>
              </div>

              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      router.push(item.href)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50 border border-blue-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-base">{item.name}</span>
                  </button>
                )
              })}

              {/* Mobile Settings */}
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center space-x-4 px-6 py-4 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <Settings className="w-6 h-6" />
                <span className="font-medium text-base">Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 