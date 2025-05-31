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
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800/30 sticky top-0 z-40 shadow-lg">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-3 hover:opacity-90 transition-opacity group"
              >
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-white">
                      DocuSign Pro
                    </span>
                    <span className="text-xs text-white/70">
                      Professional Document Editor
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Side Navigation */}
            <div className="flex items-center space-x-6">
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => router.push('/home')}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === '/dashboard'
                      ? 'text-white bg-white/20 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Documents</span>
                </button>
              </nav>

              {/* User Profile */}
              <button className="flex items-center space-x-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-white">John Doe</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  }

  // Full header for home page
  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Documents', href: '/dashboard', icon: FileText },
  ]

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800/30 sticky top-0 z-50 shadow-lg">
      <div className="w-full px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity group"
            >
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">
                    DocuSign Pro
                  </span>
                  <span className="text-sm text-white/70">
                    Professional Document Editor
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Right Side - Navigation and User */}
          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/20 backdrop-blur-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                )
              })}
            </nav>

            {/* User Profile */}
            <button className="flex items-center space-x-2 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-white">John Doe</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-6">
            <div className="space-y-3">
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
                    className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/20 backdrop-blur-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
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
                className="w-full flex items-center space-x-4 px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
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