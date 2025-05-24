import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'SignApp - Document Signing Made Easy',
  description: 'A modern document signing application like DocuSign',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        />
      </body>
    </html>
  )
} 