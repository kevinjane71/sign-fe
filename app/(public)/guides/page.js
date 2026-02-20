import Link from 'next/link'
import { ArrowRight, Scale, FileText, ArrowLeftRight, Gavel, Globe } from 'lucide-react'
import { guides } from '../../utils/pageRegistry'

export const metadata = {
  title: 'E-Signature Guides & Resources | eSignTap',
  description: 'Learn everything about electronic signatures: legality, how to sign PDFs, ESIGN Act, eIDAS, and more. Free expert guides from eSignTap.',
  keywords: 'e-signature guides, electronic signature guide, how to e-sign, e-signature legality, ESIGN Act guide',
  alternates: { canonical: 'https://esigntap.com/guides' },
  openGraph: {
    title: 'E-Signature Guides & Resources | eSignTap',
    description: 'Learn everything about electronic signatures: legality, how to sign PDFs, ESIGN Act, eIDAS, and more.',
    url: 'https://esigntap.com/guides',
    siteName: 'eSignTap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Signature Guides & Resources | eSignTap',
    description: 'Learn everything about electronic signatures: legality, how to sign PDFs, ESIGN Act, eIDAS, and more.',
  },
}

const iconMap = {
  Scale,
  FileText,
  ArrowLeftRight,
  Gavel,
  Globe,
}

const colorClasses = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-300' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-300' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'hover:border-emerald-300' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'hover:border-amber-300' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'hover:border-slate-300' },
}

export default function GuidesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Guides</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signature{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Guides & Resources
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Expert guides on electronic signature legality, compliance, and best practices. Learn how to sign documents securely and stay compliant.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Signing Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const colors = colorClasses[guide.color] || colorClasses.blue
              const Icon = iconMap[guide.icon] || FileText
              return (
                <Link
                  key={guide.slug}
                  href={`/guides/${guide.slug}`}
                  className={`group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 ${colors.border} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{guide.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{guide.desc}</p>
                  <span className={`${colors.text} text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all`}>
                    Read guide <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to Start Signing?
            </h2>
            <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto">
              Put your knowledge into practice. eSignTap makes e-signatures simple, affordable, and legally binding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold bg-white text-purple-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/tools/sign-pdf-free"
                className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Try Free PDF Signer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
