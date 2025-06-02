import HomePage from '../../homepage';
import '../../globals.css';
import Script from 'next/script';

export async function generateMetadata() {
  return {
    title: "SignFlow: Professional Document Signing & E-Signature Platform",
    description: "Streamline your document signing process with SignFlow's intelligent platform. Upload documents, add signature fields, manage signers, and track signing progress all in one place.",
    
    // Basic meta tags
    metadataBase: new URL('https://signflow.com'),
    
    // OpenGraph metadata
    openGraph: {
      title: 'SignFlow - Professional Document Signing Platform',
      description: 'Transform any document into a professional signing experience. Add fields, manage multiple signers, and track progress with our secure e-signature solution.',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'SignFlow Document Signing Platform'
        }
      ],
      locale: 'en_US',
      siteName: 'SignFlow'
    },

    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: 'SignFlow - Professional Document Signing Made Simple',
      description: 'Upload any document and transform it into a professional signing experience. Secure, compliant, and easy to use.',
      images: ['/twitter-image.png'],
      creator: '@signflow'
    },

    // Icons
    icons: {
      icon: [
        { url: '/favicon.ico', type: 'image/x-icon' }
      ],
      apple: {
        url: '/apple-touch-icon.png',
        type: 'image/png'
      }
    },

    // Alternative languages
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
      }
    },

    // Keywords - document signing focused
    keywords: [
      // Primary keywords (document signing focused)
      'document signing',
      'e-signature',
      'electronic signature',
      'digital signature',
      'document management',
      'signature software',
      'DocuSign alternative',
      'online document signing',
      'PDF signing',
      'contract signing',
      'signature workflow',
      'document automation',
      'signature tracking',
      'secure document signing',
      
      // Additional document signing keywords
      'electronic document signing',
      'digital document workflow',
      'online signature platform',
      'document signature software',
      'multi-signer documents',
      'signature field management',
      'document signing workflow',
      'secure e-signature solution',
      'professional document signing',
      'signature request management',
      'document signing automation',
      
      // Secondary use cases
      'contract management',
      'legal document signing',
      'business document workflow',
      'remote document signing',
      'paperless document signing',
      'compliance document signing'
    ],

    // Additional meta tags
    robots: 'index, follow',
    
    // Application information
    applicationName: 'SignFlow',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'SignFlow Team' }],
    publisher: 'SignFlow',
    category: 'Business Software',
    
    // Verification tags (add your actual verification codes)
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      bing: 'your-bing-verification-code'
    },

    // App-specific metadata
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'apple-mobile-web-app-title': 'SignFlow',
      'msapplication-TileColor': '#2b5797',
      'theme-color': '#ffffff'
    }
  };
}

export default function Home() {
  return (
    <>
      <Script id="schema-markup" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "SignFlow",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Professional document signing platform for secure e-signatures and document workflow management"
          }
        `}
      </Script>
      <HomePage />
    </>
  );
} 