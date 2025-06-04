import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X, AlertTriangle, Loader2 } from 'lucide-react'

const CustomToast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 300)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, 300)
  }

  if (!isVisible) return null

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bgColor: 'bg-gradient-to-r from-emerald-500 to-green-500',
          textColor: 'text-white',
          borderColor: 'border-emerald-400',
          shadowColor: 'shadow-emerald-500/30',
          iconBg: 'bg-emerald-600'
        }
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-gradient-to-r from-red-500 to-rose-500',
          textColor: 'text-white',
          borderColor: 'border-red-400',
          shadowColor: 'shadow-red-500/30',
          iconBg: 'bg-red-600'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-gradient-to-r from-amber-500 to-yellow-500',
          textColor: 'text-white',
          borderColor: 'border-amber-400',
          shadowColor: 'shadow-amber-500/30',
          iconBg: 'bg-amber-600'
        }
      case 'loading':
        return {
          icon: Loader2,
          bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
          textColor: 'text-white',
          borderColor: 'border-blue-400',
          shadowColor: 'shadow-blue-500/30',
          iconBg: 'bg-blue-600',
          spin: true
        }
      default:
        return {
          icon: Info,
          bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
          textColor: 'text-white',
          borderColor: 'border-blue-400',
          shadowColor: 'shadow-blue-500/30',
          iconBg: 'bg-blue-600'
        }
    }
  }

  const config = getToastConfig()
  const Icon = config.icon

  return (
    <div
      className={`
        relative ${config.bgColor} ${config.borderColor} ${config.shadowColor}
        border rounded-2xl shadow-2xl backdrop-blur-md
        p-4 max-w-sm w-full
        transform transition-all duration-300 ease-out
        ${isExiting 
          ? 'translate-y-2 opacity-0 scale-95' 
          : 'translate-y-0 opacity-100 scale-100'
        }
        hover:scale-105 hover:shadow-2xl
        before:absolute before:inset-0 before:rounded-2xl before:bg-white/10 before:backdrop-blur-sm
      `}
      style={{
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse"></div>
      
      <div className="relative flex items-start space-x-3">
        {/* Icon with pulse effect */}
        <div className={`flex-shrink-0 w-8 h-8 ${config.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className={`w-5 h-5 text-white ${config.spin ? 'animate-spin' : ''}`} />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${config.textColor} leading-relaxed`}>
            {message}
          </p>
        </div>
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors duration-200 group"
        >
          <X className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  )
}

// Enhanced Toast Container Component
export const ToastContainer = ({ toasts }) => {
  return (
    <>
      {/* Desktop - Bottom Left with better spacing */}
      <div className="hidden md:block fixed bottom-6 left-6 z-50 space-y-3 max-w-sm">
        {toasts.map((toast) => (
          <CustomToast key={toast.id} {...toast} />
        ))}
      </div>
      
      {/* Mobile - Top Center with safe area */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50 space-y-3 flex flex-col items-center">
        {toasts.map((toast) => (
          <CustomToast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  )
}

// Enhanced Toast Hook with new features
export const useCustomToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      message,
      type,
      duration,
      onClose: () => removeToast(id)
    }
    
    setToasts(prev => [...prev, newToast])
    return id
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const clearAllToasts = () => {
    setToasts([])
  }

  const toast = {
    success: (message, duration = 3000) => addToast(message, 'success', duration),
    error: (message, duration = 5000) => addToast(message, 'error', duration),
    warning: (message, duration = 4000) => addToast(message, 'warning', duration),
    info: (message, duration = 4000) => addToast(message, 'info', duration),
    loading: (message, duration = 10000) => addToast(message, 'loading', duration),
    // Utility methods
    clear: clearAllToasts,
    promise: async (promise, { loading, success, error }) => {
      const loadingId = addToast(loading, 'loading', 30000)
      try {
        const result = await promise
        removeToast(loadingId)
        addToast(success, 'success')
        return result
      } catch (err) {
        removeToast(loadingId)
        addToast(error || err.message, 'error')
        throw err
      }
    }
  }

  return { toast, toasts, ToastContainer, clearAllToasts }
}

export default CustomToast 