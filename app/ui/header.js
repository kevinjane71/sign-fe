'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, User, LogIn, LogOut, Menu, X, FileIcon, RotateCcw, PenTool, CreditCard, ChevronDown, Users, BookOpen } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isLoading, isRefreshing, logout: handleLogout } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    if (profileOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [profileOpen])

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
    if (pathname === '/') {
      router.push('/')
    } else if (pathname === '/login') {
      window.location.href = '/'
    } else {
      const targetPath = user ? '/dashboard' : '/'
      router.push(targetPath)
    }
  }

  const handleProfile = () => {
    setProfileOpen(false)
    router.push('/profile')
  }

  const handleLogoutAndRedirect = () => {
    setProfileOpen(false)
    handleLogout()
    router.push('/')
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <header className="bg-slate-900 border-b border-slate-700 md:sticky md:top-0 z-50 shadow-lg">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
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
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 md:space-x-3 group focus:outline-none"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md group-hover:bg-emerald-600 transition-colors">
                <FileText className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold text-white">eSignTap</span>
                  <span className="text-xs text-white/70">Professional Document Signing</span>
                </div>
              </div>
            </button>
          </div>

          {/* Right Side - Navigation and User */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {user ? (
              <>
                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center space-x-2">
                  <button
                    onClick={() => handleNavigation('/blog')}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Blog</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/your-sign')}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    <PenTool className="w-4 h-4" />
                    <span>Your Sign</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/billing')}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Billing</span>
                  </button>
                </nav>
                
                {/* Mobile menu button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-white/80 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Open menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                
                {/* Profile dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center space-x-1.5 px-2 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg focus:outline-none border border-slate-700 transition-colors"
                    aria-label="Open profile menu"
                  >
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <User className="w-5 h-5 text-white/90" />
                    )}
                    <ChevronDown className="w-4 h-4 text-white/70 hidden md:block" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-2">
                      <div className="flex items-center space-x-3 mb-2 px-3 py-2 border-b border-gray-200">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <User className="w-8 h-8 text-emerald-500 bg-emerald-100 rounded-full p-1.5" />
                        )}
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-gray-900 text-sm truncate">{user.name || user.email}</span>
                          <span className="text-xs text-gray-500 truncate">{user.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleProfile}
                        className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 text-sm font-medium transition-colors mb-1"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => { handleNavigation('/contacts'); setProfileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-emerald-50 text-sm font-medium transition-colors mb-1"
                      >
                        Contacts
                      </button>
                      <button
                        onClick={handleLogoutAndRedirect}
                        className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 text-sm font-medium transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* If logged out */}
                <button
                  onClick={() => handleNavigation('/blog')}
                  className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Blog</span>
                </button>
                <button
                  onClick={() => handleNavigation('/pricing')}
                  className="hidden md:flex items-center space-x-1.5 px-3 py-2 rounded-lg text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pricing</span>
                </button>
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-white/80 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Open menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Drawer */}
        {(mobileMenuOpen && user) && (
          <div className="md:hidden border-t border-slate-700 py-3">
            <div className="space-y-1">
              <button
                onClick={() => { handleNavigation('/blog'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium text-sm">Blog</span>
              </button>
              <button
                onClick={() => { handleNavigation('/dashboard'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <FileIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Documents</span>
              </button>
              <button
                onClick={() => { handleNavigation('/your-sign'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <PenTool className="w-5 h-5" />
                <span className="font-medium text-sm">Your Sign</span>
              </button>
              <button
                onClick={() => { handleNavigation('/billing'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium text-sm">Billing</span>
              </button>
              <button
                onClick={() => { handleNavigation('/contacts'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span className="font-medium text-sm">Contacts</span>
              </button>
              <button
                onClick={() => { handleProfile(); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-medium text-sm">Profile</span>
              </button>
              <button
                onClick={() => { handleLogoutAndRedirect(); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Mobile Menu Drawer for logged out users */}
        {(mobileMenuOpen && !user) && (
          <div className="md:hidden border-t border-slate-700 py-3">
            <div className="space-y-1">
              <button
                onClick={() => { handleNavigation('/blog'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium text-sm">Blog</span>
              </button>
              <button
                onClick={() => { handleNavigation('/pricing'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-white hover:bg-slate-800 transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium text-sm">Pricing</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
