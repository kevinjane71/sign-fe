'use client'

import { useRouter, usePathname } from 'next/navigation'
import { FileText, User, LogIn, LogOut, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true

    // Check if user is logged in
    const checkUser = () => {
      if (!isMountedRef.current) return

      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          if (parsedUser && (parsedUser.id || parsedUser.email)) {
            if (isMountedRef.current) {
              setUser(parsedUser)
            }
          } else {
            localStorage.removeItem('user')
            if (isMountedRef.current) {
              setUser(null)
            }
          }
        } catch (error) {
          console.error('Error parsing user data:', error)
          localStorage.removeItem('user')
          if (isMountedRef.current) {
            setUser(null)
          }
        }
      } else {
        if (isMountedRef.current) {
          setUser(null)
        }
      }
      
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }

    checkUser()

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'user' && isMountedRef.current) {
        checkUser()
      }
    }

    // Also listen for custom events when user state changes in same tab
    const handleUserChange = () => {
      if (isMountedRef.current) {
        checkUser()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userStateChanged', handleUserChange)

    return () => {
      isMountedRef.current = false
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userStateChanged', handleUserChange)
    }
  }, [])

  const handleLogout = async () => {
    if (!isMountedRef.current) return

    try {
      // Call logout endpoint if user is logged in
      if (user && user.id) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.id}`,
            'Content-Type': 'application/json'
          }
        })
      }
    } catch (error) {
      console.error('Logout API error:', error)
    } finally {
      if (isMountedRef.current) {
        // Clear local storage and update state
        localStorage.removeItem('user')
        setUser(null)
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event('userStateChanged'))
        
        // Use setTimeout to prevent navigation during render
        setTimeout(() => {
          if (isMountedRef.current) {
            router.push('/')
          }
        }, 0)
      }
    }
  }

  const handleLogin = () => {
    if (!isMountedRef.current) return
    router.push('/login')
  }

  const handleDashboard = () => {
    if (!isMountedRef.current) return
    router.push('/dashboard')
  }

  const handleNavigation = (path) => {
    if (!isMountedRef.current) return
    setMobileMenuOpen(false)
    router.push(path)
  }

  // Don't render anything while checking user state
  if (isLoading) {
    return (
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800/30 sticky top-0 z-50 shadow-lg">
        <div className="w-full px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">SignFlow</span>
                    <span className="text-sm text-white/70">Professional Document Signing</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-purple-800/30 sticky top-0 z-50 shadow-lg">
      <div className="w-full px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('/')}
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
                onClick={() => handleNavigation('/price')}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <span>Pricing</span>
              </button>
              <button
                onClick={() => handleNavigation('/contact-us')}
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
                    {user.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name || user.email} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-white max-w-32 truncate">
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
                onClick={() => handleNavigation('/price')}
                className="w-full flex items-center space-x-4 px-6 py-4 rounded-xl text-left transition-all duration-200 text-white/80 hover:text-white hover:bg-white/10"
              >
                <span className="font-medium text-base">Pricing</span>
              </button>
              <button
                onClick={() => handleNavigation('/contact-us')}
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