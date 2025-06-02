'use client'

import { useState, useEffect, useRef } from 'react'
import { getStoredUser, isAuthenticated, isTokenExpiringSoon, refreshAccessToken, logout } from '../utils/api'

export default function useAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const isMountedRef = useRef(true)
  const refreshIntervalRef = useRef(null)

  // Check authentication status
  const checkAuth = () => {
    if (!isMountedRef.current) return

    try {
      const userData = getStoredUser()
      if (userData && isAuthenticated()) {
        if (isMountedRef.current) {
          setUser(userData)
        }
      } else {
        if (isMountedRef.current) {
          setUser(null)
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error)
      if (isMountedRef.current) {
        setUser(null)
      }
    }

    if (isMountedRef.current) {
      setIsLoading(false)
    }
  }

  // Proactive token refresh
  const handleTokenRefresh = async () => {
    if (!isMountedRef.current || !isAuthenticated()) return

    if (isTokenExpiringSoon()) {
      if (isMountedRef.current) {
        setIsRefreshing(true)
      }

      try {
        await refreshAccessToken()
        console.log('Token refreshed successfully')
        
        // Update user state with new token data
        if (isMountedRef.current) {
          const updatedUser = getStoredUser()
          setUser(updatedUser)
        }
      } catch (error) {
        console.error('Background token refresh failed:', error)
        // logout() will be called by refreshAccessToken on failure
      } finally {
        if (isMountedRef.current) {
          setIsRefreshing(false)
        }
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true

    // Initial auth check
    checkAuth()

    // Set up token refresh interval (check every 60 seconds)
    refreshIntervalRef.current = setInterval(() => {
      handleTokenRefresh()
    }, 60000) // 1 minute

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'user' && isMountedRef.current) {
        checkAuth()
      }
    }

    // Listen for custom auth state changes
    const handleUserChange = () => {
      if (isMountedRef.current) {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('userStateChanged', handleUserChange)

    return () => {
      isMountedRef.current = false
      
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current)
      }
      
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('userStateChanged', handleUserChange)
    }
  }, [])

  // Manual logout function
  const handleLogout = async () => {
    if (!isMountedRef.current) return

    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
      // Even if logout API fails, clear local state
      setUser(null)
      window.dispatchEvent(new Event('userStateChanged'))
    }
  }

  // Manual token refresh function
  const handleManualRefresh = async () => {
    if (!isMountedRef.current || !isAuthenticated()) return false

    setIsRefreshing(true)
    try {
      await refreshAccessToken()
      const updatedUser = getStoredUser()
      if (isMountedRef.current) {
        setUser(updatedUser)
      }
      return true
    } catch (error) {
      console.error('Manual token refresh failed:', error)
      return false
    } finally {
      if (isMountedRef.current) {
        setIsRefreshing(false)
      }
    }
  }

  return {
    user,
    isLoading,
    isRefreshing,
    isAuthenticated: !!user,
    logout: handleLogout,
    refreshToken: handleManualRefresh
  }
} 