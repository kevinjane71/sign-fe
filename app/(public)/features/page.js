import Link from 'next/link'
import {
  ArrowRight,
  MousePointerClick,
  Users,
  LayoutTemplate,
  FileSearch,
  Bell,
  Smartphone,
  UsersRound,
  Code2,
  Palette,
  Clock,
  Send,
  Plug,
} from 'lucide-react'
import TrustBadges from '../../components/TrustBadges'

export const metadata = {
  title: 'Features | eSignTap E-Signature Platform',
  description:
    'Explore all eSignTap features: drag-drop editor, multi-signer workflows, reusable templates, audit trails, real-time tracking, mobile signing, team management, API access, custom branding, and more.',
  keywords:
    'e-signature features, drag drop signature editor, multi-signer, document templates, audit trail, real-time tracking, mobile signing, team management, API, custom branding, bulk send',
  alternates: { canonical: 'https://esigntap.com/features' },
  openGraph: {
    title: 'Features | eSignTap E-Signature Platform',
    description:
      'Discover every feature eSignTap offers to streamline your document signing workflow.',
    url: 'https://esigntap.com/features',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const features = [
  {
    icon: MousePointerClick,
    name: 'Drag & Drop Editor',
    desc: 'Place signature fields, text boxes, dates, and checkboxes anywhere on your document with an intuitive drag-and-drop interface.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Users,
    name: 'Multi-Signer Workflows',
    desc: 'Add multiple signers with custom signing order. Set sequential or parallel signing flows to match your process.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: LayoutTemplate,
    name: 'Reusable Templates',
    desc: 'Create templates for frequently used documents. Save time by reusing contracts, NDAs, and agreements without starting from scratch.',
    color: 'from-pink-400 to-pink-600',
  },
  {
    icon: FileSearch,
    name: 'Complete Audit Trails',
    desc: 'Every action is logged with timestamps, IP addresses, and device information. Generate tamper-proof audit certificates for legal compliance.',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: Bell,
    name: 'Real-Time Tracking & Notifications',
    desc: 'Know exactly when documents are viewed, signed, or declined. Get instant email notifications at every step.',
    color: 'from-amber-400 to-amber-600',
  },
  {
    icon: Smartphone,
    name: 'Mobile Signing',
    desc: 'Signers can sign documents from any device — phone, tablet, or desktop. No app download required.',
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    icon: UsersRound,
    name: 'Team Management',
    desc: 'Add team members, assign roles, and manage permissions. Keep your entire organization on the same page.',
    color: 'from-indigo-400 to-indigo-600',
  },
  {
    icon: Code2,
    name: 'API Access',
    desc: 'Integrate eSignTap into your existing applications with our RESTful API. Automate document creation and signing programmatically.',
    color: 'from-slate-400 to-slate-600',
  },
  {
    icon: Palette,
    name: 'Custom Branding',
    desc: 'Add your company logo, colors, and branding to signing pages and emails. Deliver a professional experience to your clients.',
    color: 'from-rose-400 to-rose-600',
  },
  {
    icon: Clock,
    name: 'Automatic Reminders',
    desc: 'Set automated reminders for pending signatures. Reduce turnaround time without manually following up.',
    color: 'from-teal-400 to-teal-600',
  },
  {
    icon: Send,
    name: 'Bulk Send',
    desc: 'Send the same document to hundreds of recipients at once. Perfect for company-wide policies, consent forms, and announcements.',
    color: 'from-orange-400 to-orange-600',
  },
  {
    icon: Plug,
    name: 'Integrations',
    desc: 'Connect eSignTap with the tools you already use. Email, REST API, and more integrations coming soon.',
    color: 'from-violet-400 to-violet-600',
  },
]

export default function FeaturesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Features' },
    ],
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'eSignTap',
    description: 'Affordable e-signature platform with drag-drop editor, multi-signer workflows, templates, audit trails, and more.',
    brand: { '@type': 'Brand', name: 'eSignTap' },
    url: 'https://esigntap.com/features',
    offers: [
      {
        '@type': 'Offer',
        name: 'Starter',
        price: '4.99',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://esigntap.com/price',
      },
      {
        '@type': 'Offer',
        name: 'Pro',
        price: '9.99',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://esigntap.com/price',
      },
      {
        '@type': 'Offer',
        name: 'Business',
        price: '24.99',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://esigntap.com/price',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Features</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Everything You Need
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Powerful Features,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simple Pricing
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            From drag-and-drop document editing to advanced team management and API access — eSignTap has every feature you need to go paperless.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Try All Features Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="text-gray-400 mt-4 text-sm">No credit card required</p>
        </div>
      </section>

      <TrustBadges />

      {/* Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Every Feature You Need
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            Built for freelancers, small businesses, and growing teams alike.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.name}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            All Features Included in Every Plan
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
            Unlike competitors who lock features behind expensive tiers, eSignTap gives you access to core features on every plan.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-1">$4.99<span className="text-lg font-medium text-gray-400">/mo</span></p>
              <p className="text-gray-500 text-sm">Perfect for individuals</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-500 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-1">$9.99<span className="text-lg font-medium text-gray-400">/mo</span></p>
              <p className="text-gray-500 text-sm">For growing businesses</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business</h3>
              <p className="text-4xl font-extrabold text-gray-900 mb-1">$24.99<span className="text-lg font-medium text-gray-400">/mo</span></p>
              <p className="text-gray-500 text-sm">For teams & enterprises</p>
            </div>
          </div>
          <Link
            href="/price"
            className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
          >
            View full pricing details <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of businesses already using eSignTap to streamline their document signing workflow.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center px-10 py-4 text-lg font-bold bg-white text-purple-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Free Today <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </div>
  )
}
