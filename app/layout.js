import { Inter } from 'next/font/google'
import './globals.css'
import Header from './ui/header'
import Footer from './ui/footer'
import LayoutWrapper from './components/LayoutWrapper'
import AuthGuard from './components/AuthGuard'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'esigntap - Professional Document Signing',
  description: 'Professional document signing made simple. Create, share, and sign documents with ease.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          <div className="min-h-screen bg-gray-50">
            <LayoutWrapper>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </LayoutWrapper>
          </div>
        </AuthGuard>
      </body>
    </html>
  )
} 