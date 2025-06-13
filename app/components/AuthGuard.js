'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isMountedRef = useRef(true)

  // Public routes that don't require authentication
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
    '/demo'
  ]

  useEffect(() => {
    isMountedRef.current = true;

    const checkAuth = () => {
      if (!isMountedRef.current) return;

      // Check if current route is public
      const isPublicRoute = publicRoutes.some(route => {
        if (route === '/') {
          return pathname === '/'
        }
        return pathname.startsWith(route)
      })

      if (isPublicRoute) {
        if (isMountedRef.current) {
          setIsAuthenticated(true)
          setIsLoading(false)
        }
        return
      }

      // Check for user token in localStorage
      try {
        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          if (user && (user.id || user.email)) {
            if (isMountedRef.current) {
              setIsAuthenticated(true)
            }
          } else {
            // Invalid user data, redirect to login
            localStorage.removeItem('user')
            if (isMountedRef.current) {
              setIsAuthenticated(false)
              // Use setTimeout to prevent immediate navigation during render
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
            // Use setTimeout to prevent immediate navigation during render
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
        localStorage.removeItem('user')
        if (isMountedRef.current) {
          setIsAuthenticated(false)
          // Use setTimeout to prevent immediate navigation during render
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

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userStateChanged', handleUserChange)

    return () => {
      isMountedRef.current = false
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userStateChanged', handleUserChange)
    }
  }, [pathname, router])

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