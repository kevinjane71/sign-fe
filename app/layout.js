import './globals.css'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  title: 'SignFlow - Professional Document Signing',
  description: 'Professional document signing made simple. Create, share, and sign documents with ease.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
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