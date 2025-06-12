'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, User, LogIn, LogOut, Menu, X, FileIcon, RotateCcw, PenTool, CreditCard } from 'lucide-react'
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
              className="flex items-center space-x-2 md:space-x-3 hover:opacity-90 transition-opacity group"
              style={{ outline: 'none' }}
            >
              {/* Custom SVG Logo: Document + Signature Stroke */}
              <span className="inline-block">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <rect x="3" y="3" width="30" height="30" rx="8" fill="url(#paint0_linear)" />
                  <rect x="10" y="10" width="16" height="20" rx="3" fill="#fff" fillOpacity="0.13" />
                  <path d="M13 16h10M13 20h7" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M15 26c2-2 6-2 8 0" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="3" y1="3" x2="33" y2="33" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6D28D9"/>
                      <stop offset="1" stopColor="#9333EA"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              {/* Brand Name - always visible */}
              <span className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-[#A78BFA] leading-tight ml-2">
                eSignTap
              </span>
            </button>
          </div>

          {/* Right Side - Navigation and User */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            {user ? (
              <>
                {/* Dashboard button always visible when logged in */}
                <button
                  onClick={handleDashboard}
                  className="flex items-center space-x-1 px-2 py-1 md:px-4 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs md:text-base font-semibold transition-all duration-200"
                >
                  <span>Dashboard</span>
                </button>
                {/* Hamburger menu for mobile and desktop */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-label="Open menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <>
                {/* If logged out, show Login and Pricing, no hamburger menu */}
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-1 px-2 py-1 md:px-4 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs md:text-base font-semibold transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => handleNavigation('/pricing')}
                  className="flex items-center space-x-1 px-2 py-1 md:px-4 md:py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs md:text-base font-semibold transition-all duration-200"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pricing</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Hamburger Menu Drawer (only if logged in) */}
        {user && mobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4">
            <div className="space-y-2">
              <button
                onClick={() => { handleNavigation('/dashboard'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <FileIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Documents</span>
              </button>
              <button
                onClick={() => { handleNavigation('/your-sign'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <PenTool className="w-5 h-5" />
                <span className="font-medium text-sm">Your Sign</span>
              </button>
              <button
                onClick={() => { handleNavigation('/billing'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <CreditCard className="w-5 h-5" />
                <span className="font-medium text-sm">Billing</span>
              </button>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 