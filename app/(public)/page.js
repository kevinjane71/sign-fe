// app/page.js
import HomePage from '../homepage';
import '../globals.css';
import Script from 'next/script';

export async function generateMetadata() {
  return {
    title: "MeetSynk: AI-Powered Scheduling & Appointment Booking Platform",
    description: "Streamline your scheduling with MeetSynk's intelligent platform. Book appointments, create custom booking pages, and automate your meeting workflow with AI-powered calendar management.",
    
    // Basic meta tags
    metadataBase: new URL('https://meetsynk.com'),
    
    // OpenGraph metadata
    openGraph: {
      title: 'MeetSynk - Smart Scheduling Platform',
      description: 'Eliminate scheduling headaches with our AI-powered booking system. Create beautiful booking pages, sync calendars, and automate your scheduling workflow.',
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'MeetSynk Scheduling Platform'
        }
      ],
      locale: 'en_US',
      siteName: 'MeetSynk'
    },

    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: 'MeetSynk - Smart Meeting Scheduling Made Simple',
      description: 'Schedule meetings intelligently with AI-powered automation. Create custom booking pages, manage appointments, and streamline your calendar.',
      images: ['/twitter-image.png'],
      creator: '@meetsynk'
    },

    // Icons
    icons: {
      icon: [
        { url: '/meet.svg', type: 'image/svg+xml' }
      ],
      apple: {
        url: '/meet.svg',
        type: 'image/svg+xml'
      }
    },

    // Alternative languages
    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/en-US',
      }
    },

    // Keywords - expanded list with additional relevant keywords
    keywords: [
      // Primary keywords (scheduling-focused)
      'meeting scheduler',
      'appointment booking',
      'calendar management',
      'scheduling software',
      'AI scheduling',
      'booking system',
      'Calendly alternative',
      'automated scheduling',
      'custom booking pages',
      'team scheduling',
      'calendar sync',
      'meeting automation',
      'appointment management',
      'online scheduling',
      
      // Additional scheduling keywords
      'online appointment scheduler',
      'meeting booking software',
      'schedule appointments online',
      'professional scheduling tool',
      'automated meeting scheduler',
      'client booking system',
      'business scheduling solution',
      'group scheduling tool',
      'event scheduling software',
      'appointment reminder system',
      'scheduling automation platform',
      
      // Secondary use cases
      'medical appointment booking',
      'online class scheduling',
      'virtual meeting planner',
      'customer appointment system'
    ],

    // Additional meta tags
    robots: 'index, follow',
    
    // Application information
    applicationName: 'MeetSynk',
    referrer: 'origin-when-cross-origin',
    authors: [{ name: 'MeetSynk Team' }],
    publisher: 'MeetSynk',
    category: 'Productivity Software',
    
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
      'apple-mobile-web-app-title': 'MeetSynk',
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
            "name": "MeetSynk",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "AI-powered scheduling platform for effortless appointment booking"
          }
        `}
      </Script>
      <HomePage />
    </>
  );
}