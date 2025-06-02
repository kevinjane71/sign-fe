'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, User, LogIn, LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/')
  }

  const handleLogin = () => {
    router.push('/login')
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

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
                    SignFlow
                  </span>
                  <span className="text-sm text-white/70">
                    Professional Document Signing
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Right Side - Navigation and User */}
          <div className="flex items-center space-x-6">
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => router.push('/price')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <span>Pricing</span>
              </button>
              <button
                onClick={() => router.push('/contact-us')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <span>Contact</span>
              </button>
            </nav>

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDashboard}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <span>Dashboard</span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-white">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

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
              <button
                onClick={() => {
                  router.push('/price')
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <span className="font-medium text-base">Pricing</span>
              </button>
              <button
                onClick={() => {
                  router.push('/contact-us')
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <span className="font-medium text-base">Contact</span>
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => {
                      handleDashboard()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-4 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
                  >
                    <span className="font-medium text-base">Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-4 px-6 py-4 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium text-base">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogin()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-4 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200"
                >
                  <LogIn className="w-6 h-6" />
                  <span className="font-medium text-base">Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 