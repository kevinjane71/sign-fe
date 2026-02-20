import Link from 'next/link'
import {
  ArrowRight,
  Mail,
  Code2,
  HardDrive,
  Droplets,
  MessageSquare,
  Zap,
  BarChart3,
  Target,
  Check,
  Clock,
  Plug,
} from 'lucide-react'
import TrustBadges from '../../components/TrustBadges'

export const metadata = {
  title: 'Integrations | Connect eSignTap',
  description:
    'Connect eSignTap with your favorite tools. Integrate via email, REST API, and upcoming integrations with Google Drive, Dropbox, Slack, Zapier, Salesforce, and HubSpot.',
  keywords:
    'eSignTap integrations, e-signature API, REST API, Google Drive integration, Dropbox, Slack, Zapier, Salesforce, HubSpot, email integration',
  alternates: { canonical: 'https://esigntap.com/integrations' },
  openGraph: {
    title: 'Integrations | Connect eSignTap',
    description:
      'Connect eSignTap with the tools you already use. REST API, email, and more integrations coming soon.',
    url: 'https://esigntap.com/integrations',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const currentIntegrations = [
  {
    icon: Mail,
    name: 'Email',
    desc: 'Send signing requests directly via email. Signers click a secure link to review and sign documents — no account needed.',
    status: 'available',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Code2,
    name: 'REST API',
    desc: 'Build custom workflows with our RESTful API. Create documents, add signers, send for signature, and retrieve signed documents programmatically.',
    status: 'available',
    color: 'from-slate-400 to-slate-600',
  },
]

const comingSoonIntegrations = [
  {
    icon: HardDrive,
    name: 'Google Drive',
    desc: 'Import documents from Google Drive and save signed copies back automatically.',
    color: 'from-green-400 to-green-600',
  },
  {
    icon: Droplets,
    name: 'Dropbox',
    desc: 'Access your Dropbox files directly from eSignTap and sync signed documents.',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    icon: MessageSquare,
    name: 'Slack',
    desc: 'Get signing notifications in your Slack channels. Stay updated without leaving your workspace.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Zap,
    name: 'Zapier',
    desc: 'Connect eSignTap to 5,000+ apps. Automate document creation and signing workflows with Zaps.',
    color: 'from-orange-400 to-orange-600',
  },
  {
    icon: BarChart3,
    name: 'Salesforce',
    desc: 'Send contracts for signature directly from Salesforce and track signing status within your CRM.',
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    icon: Target,
    name: 'HubSpot',
    desc: 'Streamline deal closings by sending e-signature requests from within HubSpot workflows.',
    color: 'from-rose-400 to-rose-600',
  },
]

export default function IntegrationsPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Integrations' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Integrations</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Plug className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Connect eSignTap to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Your Workflow
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Integrate eSignTap with the tools you already use. Send, sign, and manage documents without switching between apps.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <TrustBadges />

      {/* Available Integrations */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Available Now
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            These integrations are ready to use today.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {currentIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${integration.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <integration.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{integration.name}</h3>
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3" /> Available
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{integration.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Callout */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10 sm:p-14">
                <span className="inline-block bg-slate-100 text-slate-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                  Developer Friendly
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                  Powerful REST API
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Build custom integrations with our RESTful API. Automate document creation, manage signers, track signing progress, and download completed documents — all programmatically.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    RESTful endpoints with JSON responses
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    Webhook notifications for real-time updates
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    Comprehensive documentation
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    Available on Business plan
                  </li>
                </ul>
                <Link
                  href="/login"
                  className="inline-flex items-center px-6 py-3 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get API Access <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="bg-slate-900 p-10 sm:p-14 flex items-center">
                <pre className="text-sm text-green-400 overflow-x-auto w-full">
                  <code>{`// Create a document
POST /api/v1/documents
{
  "name": "Contract.pdf",
  "signers": [
    {
      "email": "client@example.com",
      "name": "Jane Doe"
    }
  ]
}

// Response
{
  "id": "doc_abc123",
  "status": "pending",
  "signing_url": "https://..."
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Coming Soon
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            We are actively building these integrations. Stay tuned for updates.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${integration.color} rounded-xl flex items-center justify-center`}>
                    <integration.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{integration.name}</h3>
                <p className="text-gray-600 leading-relaxed">{integration.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Integration */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Need a Different Integration?
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
            We are always expanding our integration library. Let us know which tools you want us to connect with.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors text-lg"
          >
            Request an Integration <ArrowRight className="ml-1 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Integrating Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Connect eSignTap with your existing workflow. Get started in minutes with our email integration or build custom workflows with the API.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center px-10 py-4 text-lg font-bold bg-white text-purple-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
