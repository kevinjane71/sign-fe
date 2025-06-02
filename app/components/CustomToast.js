import React, { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'

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
          bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
          iconColor: 'text-white',
          borderColor: 'border-green-400'
        }
      case 'error':
        return {
          icon: AlertCircle,
          bgColor: 'bg-gradient-to-r from-red-500 to-rose-500',
          iconColor: 'text-white',
          borderColor: 'border-red-400'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-gradient-to-r from-yellow-500 to-amber-500',
          iconColor: 'text-white',
          borderColor: 'border-yellow-400'
        }
      default:
        return {
          icon: Info,
          bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-500',
          iconColor: 'text-white',
          borderColor: 'border-blue-400'
        }
    }
  }

  const config = getToastConfig()
  const Icon = config.icon

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor}
        border-l-4 rounded-lg shadow-lg backdrop-blur-sm
        p-4 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${isExiting 
          ? 'translate-x-full opacity-0 scale-95' 
          : 'translate-x-0 opacity-100 scale-100'
        }
        hover:shadow-xl hover:scale-105
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-white leading-relaxed">
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={handleClose}
            className="inline-flex text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Toast Container Component
export const ToastContainer = ({ toasts }) => {
  return (
    <>
      {/* Desktop - Bottom Left */}
      <div className="hidden md:block fixed bottom-4 left-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <CustomToast key={toast.id} {...toast} />
        ))}
      </div>
      
      {/* Mobile - Top */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50 space-y-3">
        {toasts.map((toast) => (
          <CustomToast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  )
}

// Toast Hook
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

  const toast = {
    success: (message, duration) => addToast(message, 'success', duration),
    error: (message, duration) => addToast(message, 'error', duration),
    warning: (message, duration) => addToast(message, 'warning', duration),
    info: (message, duration) => addToast(message, 'info', duration),
  }

  return { toast, toasts, ToastContainer }
}

export default CustomToast 