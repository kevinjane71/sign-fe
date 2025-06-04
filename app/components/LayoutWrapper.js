'use client'

import { useCustomToast, ToastContainer } from './CustomToast'
import { createContext, useContext } from 'react'

// Create Toast Context
const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default function LayoutWrapper({ children }) {
  const { toast, toasts } = useCustomToast()

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
} 