'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Public routes that don't require authentication - COMPLETELY bypass all localStorage checks
  const publicRoutes = [
    '/',
    '/login',
    '/pricing',
    '/terms',
    '/privacy',
    '/refund',
    '/price',
    '/contact-us',
    '/sign',
    '/demo',
    '/blog',
    '/kibill',    // For React Native WebView - no localStorage needed
    '/meetsynk',
    '/kirana'
  ]

  // Check if current route is public - initialize state accordingly
  const isPublicRoute = publicRoutes.some(route => {
    if (route === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(route)
  })

  const [isLoading, setIsLoading] = useState(!isPublicRoute) // Skip loading for public routes
  const [isAuthenticated, setIsAuthenticated] = useState(isPublicRoute) // Auto-authenticate public routes
  const isMountedRef = useRef(true)

  useEffect(() => {
    isMountedRef.current = true;

    // If public route, we're already done - no need to check anything
    if (isPublicRoute) {
      return // EXIT EARLY - no localStorage checks needed
    }

    const checkAuth = () => {
      if (!isMountedRef.current) return;

      // Check if current route is public FIRST - completely bypass everything else
      const isPublicRoute = publicRoutes.some(route => {
        if (route === '/') {
          return pathname === '/'
        }
        return pathname.startsWith(route)
      })

      if (isPublicRoute) {
        console.log('Public route detected, bypassing auth:', pathname);
        if (isMountedRef.current) {
          setIsAuthenticated(true)
          setIsLoading(false)
        }
        return // EXIT EARLY - no localStorage checks needed
      }

      // Only do localStorage checks for non-public routes
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
          // If localStorage fails, treat as unauthenticated
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
        // Check if current route is still public before running auth check
        const currentIsPublic = publicRoutes.some(route => {
          if (route === '/') {
            return pathname === '/'
          }
          return pathname.startsWith(route)
        })
        
        if (!currentIsPublic) {
          checkAuth()
        }
      }
    }

    // Listen for custom events when user state changes in same tab
    const handleUserChange = () => {
      if (isMountedRef.current) {
        // Check if current route is still public before running auth check
        const currentIsPublic = publicRoutes.some(route => {
          if (route === '/') {
            return pathname === '/'
          }
          return pathname.startsWith(route)
        })
        
        if (!currentIsPublic) {
          checkAuth()
        }
      }
    }

    // Only add event listeners if we're not on a public route
    if (!isPublicRoute && typeof window !== 'undefined') {
      try {
        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('userStateChanged', handleUserChange)
      } catch (e) {
        console.warn('Failed to add event listeners:', e)
      }
    }

    return () => {
      isMountedRef.current = false
      // Only remove listeners if we're in browser environment
      if (typeof window !== 'undefined') {
        try {
          window.removeEventListener('storage', handleStorageChange)
          window.removeEventListener('userStateChanged', handleUserChange)
        } catch (e) {
          console.warn('Failed to remove event listeners:', e)
        }
      }
    }
  }, [pathname, router, isPublicRoute])

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
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on public route, don't render children
  if (!isAuthenticated) {
    return null
  }

  return children
} 