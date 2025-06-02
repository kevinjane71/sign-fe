'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/terms',
    '/privacy',
    '/refund',
    '/price',
    '/contact-us'
  ]

  useEffect(() => {
    const checkAuth = () => {
      // Check if current route is public
      const isPublicRoute = publicRoutes.some(route => {
        if (route === '/') {
          return pathname === '/'
        }
        return pathname.startsWith(route)
      })

      if (isPublicRoute) {
        setIsAuthenticated(true)
        setIsLoading(false)
        return
      }

      // Check for user token in localStorage
      try {
        const userData = localStorage.getItem('user')
        if (userData) {
          const user = JSON.parse(userData)
          if (user && (user.id || user.email)) {
            setIsAuthenticated(true)
          } else {
            // Invalid user data, redirect to login
            localStorage.removeItem('user')
            router.push('/login')
            return
          }
        } else {
          // No user data, redirect to login
          router.push('/login')
          return
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        localStorage.removeItem('user')
        router.push('/login')
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [pathname, router])

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