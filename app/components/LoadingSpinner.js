'use client'

import { Loader2, FileText, Send, CheckCircle, Upload, Edit } from 'lucide-react'
import { useState, useEffect } from 'react'

const LoadingSpinner = ({ 
  message = "Loading...", 
  submessage = "", 
  type = "default",
  size = "default" 
}) => {
  const [currentMessage, setCurrentMessage] = useState(0)
  
  // Different loading messages based on type
  const loadingMessages = {
    upload: [
      { main: "Processing your documents...", sub: "Analyzing file structure" },
      { main: "Preparing for editing...", sub: "Setting up workspace" },
      { main: "Almost ready...", sub: "Finalizing setup" }
    ],
    submit: [
      { main: "Sharing your document...", sub: "Preparing for signers" },
      { main: "Setting up notifications...", sub: "Configuring email alerts" },
      { main: "Finalizing document...", sub: "Almost done" }
    ],
    save: [
      { main: "Saving your changes...", sub: "Updating document" },
      { main: "Syncing data...", sub: "Backing up progress" },
      { main: "Almost saved...", sub: "Finalizing changes" }
    ],
    default: [
      { main: message, sub: submessage }
    ]
  }

  const messages = loadingMessages[type] || loadingMessages.default

  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessage((prev) => (prev + 1) % messages.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [messages.length])

  const getIcon = () => {
    switch (type) {
      case 'upload':
        return <Upload className="w-8 h-8 text-blue-600" />
      case 'submit':
        return <Send className="w-8 h-8 text-green-600" />
      case 'save':
        return <Edit className="w-8 h-8 text-purple-600" />
      default:
        return <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
    }
  }

  const sizeClasses = {
    small: "p-4",
    default: "p-6",
    large: "p-8"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className={`bg-white rounded-xl border border-gray-200 flex flex-col items-center max-w-sm mx-4 ${sizeClasses[size]}`}>
        <div className="relative mb-4">
          {type === 'default' ? (
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          ) : (
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center">
                {getIcon()}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border-2 border-gray-100 flex items-center justify-center">
                <Loader2 className="w-3 h-3 animate-spin text-gray-600" />
              </div>
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-gray-900 font-semibold mb-1 transition-all duration-500">
            {messages[currentMessage]?.main || message}
          </p>
          {(messages[currentMessage]?.sub || submessage) && (
            <p className="text-sm text-gray-500 transition-all duration-500">
              {messages[currentMessage]?.sub || submessage}
            </p>
          )}
        </div>

        {/* Progress dots for multi-step loading */}
        {messages.length > 1 && (
          <div className="flex space-x-2 mt-4">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentMessage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// Partial screen loader for API calls
export const PartialLoader = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  )
}

// Shimmer component for skeleton loading
export const Shimmer = ({ className = "h-4 bg-gray-200 rounded" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer h-full w-full rounded"></div>
    </div>
  )
}

export default LoadingSpinner 