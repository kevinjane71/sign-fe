'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, User, LogIn, LogOut, Menu, X, FileIcon, RotateCcw, PenTool, CreditCard, ChevronDown, Users } from 'lucide-react'
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
    <header className="backdrop-blur-2xl bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/70 border-b-2 border-transparent border-b-[3px] border-b-purple-400/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] sticky top-0 z-50" style={{boxShadow:'0 4px 32px 0 rgba(80,0,120,0.10)', borderBottom:'3px solid rgba(167,139,250,0.25)'}}>
      <div className="w-full px-2 sm:px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center h-14 md:h-16 lg:h-18">
          {/* Logo Section - floating glass card */}
          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 md:space-x-2 group focus:outline-none"
              style={{ outline: 'none' }}
            >
              <span className="inline-block rounded-2xl shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 p-1.5 md:p-2 lg:p-2.5 transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl">
                <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
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
              <span className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-[#A78BFA] via-white to-[#60A5FA] text-transparent bg-clip-text drop-shadow-[0_2px_12px_rgba(167,139,250,0.5)] ml-2">
                eSignTap
              </span>
            </button>
          </div>

          {/* Right Side - Navigation and User */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
            {user ? (
              <>
                {/* Desktop navigation (md+) - glassy pills */}
                <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md text-white text-sm font-normal transition-all duration-200 group hover:bg-gradient-to-r hover:from-[#A78BFA]/30 hover:to-[#60A5FA]/30 hover:border-[#A78BFA] hover:shadow-[0_0_12px_2px_rgba(167,139,250,0.18)] focus:outline-none"
                  >
                    <FileText className="w-5 h-5 text-white group-hover:drop-shadow-[0_0_6px_#A78BFA] transition-all duration-200" />
                    <span className="group-hover:bg-gradient-to-r group-hover:from-[#A78BFA] group-hover:to-[#60A5FA] group-hover:text-transparent group-hover:bg-clip-text group-hover:drop-shadow-[0_0_8px_#A78BFA] transition-all duration-200">Dashboard</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/your-sign')}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md text-white text-sm font-normal transition-all duration-200 group hover:bg-gradient-to-r hover:from-[#A78BFA]/30 hover:to-[#60A5FA]/30 hover:border-[#A78BFA] hover:shadow-[0_0_12px_2px_rgba(167,139,250,0.18)] focus:outline-none"
                  >
                    <PenTool className="w-5 h-5 text-white group-hover:drop-shadow-[0_0_6px_#A78BFA] transition-all duration-200" />
                    <span className="group-hover:bg-gradient-to-r group-hover:from-[#A78BFA] group-hover:to-[#60A5FA] group-hover:text-transparent group-hover:bg-clip-text group-hover:drop-shadow-[0_0_8px_#A78BFA] transition-all duration-200">Your Sign</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/billing')}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-md text-white text-sm font-normal transition-all duration-200 group hover:bg-gradient-to-r hover:from-[#A78BFA]/30 hover:to-[#60A5FA]/30 hover:border-[#A78BFA] hover:shadow-[0_0_12px_2px_rgba(167,139,250,0.18)] focus:outline-none"
                  >
                    <CreditCard className="w-5 h-5 text-white group-hover:drop-shadow-[0_0_6px_#A78BFA] transition-all duration-200" />
                    <span className="group-hover:bg-gradient-to-r group-hover:from-[#A78BFA] group-hover:to-[#60A5FA] group-hover:text-transparent group-hover:bg-clip-text group-hover:drop-shadow-[0_0_8px_#A78BFA] transition-all duration-200">Billing</span>
                  </button>
                </nav>
                {/* Mobile: Dashboard button and hamburger menu */}
                <button
                  onClick={handleDashboard}
                  className="flex md:hidden items-center space-x-1 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-all duration-200"
                >
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  aria-label="Open menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
                {/* Profile dropdown (desktop & mobile) */}
                <div className="relative hidden md:block" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center space-x-1 px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full focus:outline-none border border-white/20 shadow-md transition-all duration-200"
                    aria-label="Open profile menu"
                  >
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt="Profile" className="w-7 h-7 rounded-full object-cover border border-white/30" />
                    ) : (
                      <User className="w-6 h-6 text-white/90" />
                    )}
                    <ChevronDown className="w-4 h-4 text-white/70 ml-1" />
                  </button>
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 max-w-xs bg-white/90 backdrop-blur-xl border border-purple-200/40 rounded-2xl shadow-2xl z-50 p-4 flex flex-col min-w-[200px] animate-fade-in-up">
                      <div className="flex items-center space-x-3 mb-3">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover border border-purple-300" />
                        ) : (
                          <User className="w-9 h-9 text-purple-500 bg-purple-100 rounded-full p-1" />
                        )}
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900 text-base truncate">{user.name || user.email}</span>
                          <span className="text-xs text-gray-500 truncate">{user.email}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleProfile}
                        className="w-full text-left px-3 py-2 rounded-lg text-gray-800 hover:bg-purple-100 font-medium transition-all duration-150 mb-1"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => { handleNavigation('/contacts'); setProfileOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg text-gray-800 hover:bg-purple-100 font-medium transition-all duration-150 mb-1"
                      >
                        Contacts
                      </button>
                      <button
                        onClick={handleLogoutAndRedirect}
                        className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all duration-150"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* If logged out, show compact Google Login and Pricing, no hamburger menu */}
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-2 px-2 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-base font-semibold transition-all duration-200 shadow-sm"
                  style={{ minWidth: '110px', height: '36px', background: '#6b4b8e', color: '#fff' }}
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-1" style={{ display: 'inline-block' }} />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => handleNavigation('/pricing')}
                  className="flex items-center space-x-1 px-2 py-1 md:px-4 md:py-2 rounded-lg text-xs md:text-base font-semibold transition-all duration-200 shadow-sm"
                  style={{ minWidth: '110px', height: '36px', background: '#6b4b8e', color: '#fff' }}
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
                onClick={() => { handleNavigation('/contacts'); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <Users className="w-5 h-5" />
                <span className="font-medium text-sm">Contacts</span>
              </button>
              <button
                onClick={() => { handleProfile(); setMobileMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <User className="w-5 h-5" />
                <span className="font-medium text-sm">Profile</span>
              </button>
              <button
                onClick={() => { handleLogoutAndRedirect(); setMobileMenuOpen(false); }}
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