'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()

  // Protected routes that REQUIRE authentication - everything else is public
  const protectedRoutes = [
    '/dashboard',
    '/your-sign',
    '/billing',
    '/profile',
    '/contacts',
    '/prepare-document',
    '/sign-document',
  ]

  // Check if current route requires auth
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  const [isLoading, setIsLoading] = useState(isProtectedRoute) // Only show loading for protected routes
  const [isAuthenticated, setIsAuthenticated] = useState(!isProtectedRoute) // Auto-allow public routes
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true;

    // If NOT a protected route, we're already done - no need to check anything
    if (!isProtectedRoute) {
      return // EXIT EARLY - no localStorage checks needed
    }

    const checkAuth = () => {
      if (!isMountedRef.current) return;

      // Only do localStorage checks for protected routes
      if (typeof window === 'undefined') {
        if (isMountedRef.current) {
          setIsAuthenticated(false)
          setIsLoading(false)
        }
        return
      }

      // Check for user token in localStorage (with better error handling)
      try {
        let userData = null;

        // Safely access localStorage
        try {
          if (typeof Storage !== 'undefined' && localStorage) {
            userData = localStorage.getItem('user')
          }
        } catch (localStorageError) {
          console.warn('localStorage not available:', localStorageError)
          if (isMountedRef.current) {
            setIsAuthenticated(false)
            setTimeout(() => {
              if (isMountedRef.current) {
                router.push('/login')
              }
            }, 0)
          }
          return
        }

        if (userData) {
          const user = JSON.parse(userData)
          if (user && (user.id || user.email)) {
            if (isMountedRef.current) {
              setIsAuthenticated(true)
            }
          } else {
            // Invalid user data, redirect to login
            try {
              localStorage.removeItem('user')
            } catch (e) {
              console.warn('Failed to remove user data:', e)
            }
            if (isMountedRef.current) {
              setIsAuthenticated(false)
              setTimeout(() => {
                if (isMountedRef.current) {
                  router.push('/login')
                }
              }, 0)
            }
            return
          }
        } else {
          // No user data, redirect to login
          if (isMountedRef.current) {
            setIsAuthenticated(false)
            setTimeout(() => {
              if (isMountedRef.current) {
                router.push('/login')
              }
            }, 0)
          }
          return
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        try {
          localStorage.removeItem('user')
        } catch (e) {
          console.warn('Failed to remove user data after error:', e)
        }
        if (isMountedRef.current) {
          setIsAuthenticated(false)
          setTimeout(() => {
            if (isMountedRef.current) {
              router.push('/login')
            }
          }, 0)
        }
        return
      }

      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }

    // Initial check
    checkAuth()

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'user' && isMountedRef.current) {
        checkAuth()
      }
    }

    // Listen for custom events when user state changes in same tab
    const handleUserChange = () => {
      if (isMountedRef.current) {
        checkAuth()
      }
    }

    if (typeof window !== 'undefined') {
      try {
        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('userStateChanged', handleUserChange)
      } catch (e) {
        console.warn('Failed to add event listeners:', e)
      }
    }

    return () => {
      isMountedRef.current = false
      if (typeof window !== 'undefined') {
        try {
          window.removeEventListener('storage', handleStorageChange)
          window.removeEventListener('userStateChanged', handleUserChange)
        } catch (e) {
          console.warn('Failed to remove event listeners:', e)
        }
      }
    }
  }, [pathname, router, isProtectedRoute])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and on protected route, don't render children
  if (!isAuthenticated) {
    return null
  }

  return children
}
