'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, User, LogIn, LogOut, Menu, X, FileIcon, RotateCcw, PenTool } from 'lucide-react'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isLoading, isRefreshing, logout: handleLogout } = useAuth()

  const handleLogin = () => {
    router.push('/login')
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  const handleNavigation = (path) => {
    setMobileMenuOpen(false)
    if (pathname === '/login') {
      window.location.href = path
    } else {
      router.push(path)
    }
  }

  const handleLogoClick = () => {
    // If on "/" page, always navigate to "/"
    if (pathname === '/') {
      router.push('/')
    } else if (pathname === '/login') {
      // Special handling for login page - force complete navigation to home
      window.location.href = '/'
    } else {
      // If user is logged in and not on "/", navigate to "/dashboard"
      // If user is not logged in, navigate to "/"
      const targetPath = user ? '/dashboard' : '/'
      router.push(targetPath)
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800/30 md:sticky md:top-0 z-50 shadow-lg">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-bold text-white">eSignTap</span>
                    <span className="text-xs md:text-sm text-white/70">Professional Document Signing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800/30 sticky top-0 z-50 shadow-lg">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 md:h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 hover:opacity-90 transition-opacity group"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="flex flex-col text-left">
                  <span className="text-base sm:text-lg md:text-2xl font-bold text-white leading-tight">E-SignTap</span>
                  <span className="text-[10px] sm:text-xs md:text-sm text-white/70 leading-tight">Professional Document Signing</span>
                </div>
              </div>
            </button>
          </div>

          {/* Right Side - Navigation and User */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {/* Navigation - Show Documents when logged in and not on "/" page */}
            {user && pathname !== '/' && (
              <nav className="hidden md:flex items-center space-x-1">
                <button
                  onClick={() => handleNavigation('/dashboard')}
                  className="flex items-center space-x-1.5 px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
                >
                  <FileIcon className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Documents</span>
                </button>
                <button
                  onClick={() => handleNavigation('/your-sign')}
                  className="flex items-center space-x-1.5 px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
                >
                  <PenTool className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Your Sign</span>
                </button>
              </nav>
            )}

            {/* Pricing/Billing Link */}
            <nav className="hidden md:flex items-center">
              <button
                onClick={() => handleNavigation(user ? '/billing' : '/pricing')}
                className="px-2 md:px-3 py-1 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                {user ? 'Billing' : 'Pricing'}
              </button>
            </nav>

            {/* User Authentication */}
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
                {pathname === '/' && (
                  <button
                    onClick={handleDashboard}
                    className="hidden md:flex items-center space-x-1.5 px-2 md:px-3 py-1 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs md:text-sm font-medium transition-all duration-200"
                  >
                    <span>Dashboard</span>
                  </button>
                )}
                {/* Token refresh indicator */}
                {isRefreshing && (
                  <div className="flex items-center space-x-1 px-1.5 md:px-3 py-0.5 md:py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg">
                    <RotateCcw className="w-2 h-2 md:w-3 md:h-3 text-orange-300 animate-spin" />
                    <span className="text-[9px] md:text-xs text-orange-300 font-medium">Refreshing...</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 md:space-x-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name || user.email} 
                        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    )}
                  </div>
                  <span className="hidden lg:block text-xs md:text-sm font-medium text-white max-w-20 md:max-w-32 truncate">
                    {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-1 md:p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    title="Logout"
                  >
                    <LogOut className="w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center space-x-1 px-2 md:px-3 py-1 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs md:text-sm font-medium transition-all duration-200"
              >
                <LogIn className="w-3 h-3 md:w-4 md:h-4" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="space-y-2">
              {/* Show Documents in mobile menu when logged in and not on "/" page */}
              {user && pathname !== '/' && (
                <>
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <FileIcon className="w-5 h-5" />
                    <span className="font-medium text-sm">Documents</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/your-sign')}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
                  >
                    <PenTool className="w-5 h-5" />
                    <span className="font-medium text-sm">Your Sign</span>
                  </button>
                </>
              )}

              {/* Pricing/Billing in mobile menu */}
              <button
                onClick={() => {
                  handleNavigation(user ? '/billing' : '/pricing')
                  setMobileMenuOpen(false)
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <span className="font-medium text-sm">{user ? 'Billing' : 'Pricing'}</span>
              </button>

              {user ? (
                <>
                  {pathname === '/' && (
                    <button
                      onClick={() => {
                        handleDashboard()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-200"
                    >
                      <span className="font-medium text-sm">Dashboard</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogin()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all duration-200"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="font-medium text-sm">Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 