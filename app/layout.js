import { Inter } from 'next/font/google'
import './globals.css'
import Header from './ui/header'
import Footer from './ui/footer'
import LayoutWrapper from './components/LayoutWrapper'
import AuthGuard from './components/AuthGuard'
import { Analytics } from "@vercel/analytics/next"
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'eSignTap - Most Affordable DocuSign Alternative | Professional Document Signing',
  description: 'The most affordable DocuSign alternative for professional document signing. Create, share, and sign documents with ease. Save up to 40% compared to DocuSign with our competitive pricing.',
  keywords: 'DocuSign alternative, affordable document signing, electronic signature, digital signature, document signing software, e-signature, professional document signing, cost-effective DocuSign alternative',
  openGraph: {
    title: 'eSignTap - Most Affordable DocuSign Alternative | Professional Document Signing',
    description: 'The most affordable DocuSign alternative for professional document signing. Create, share, and sign documents with ease. Save up to 40% compared to DocuSign.',
    url: 'https://esigntap.com',
    siteName: 'eSignTap',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'eSignTap - Professional Document Signing Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eSignTap - Most Affordable DocuSign Alternative',
    description: 'The most affordable DocuSign alternative for professional document signing. Save up to 40% compared to DocuSign.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    bing: 'your-bing-verification',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
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
        <Analytics />
      </body>
    </html>
  )
} 