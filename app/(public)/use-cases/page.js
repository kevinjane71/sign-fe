import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { useCases } from '../../utils/pageRegistry'

export const metadata = {
  title: 'E-Signature Use Cases | Sign Any Document | eSignTap',
  description: 'Explore how to e-sign NDAs, leases, contracts, waivers, invoices, and more online with eSignTap. Free, legally binding, and secure.',
  keywords: 'e-sign documents online, sign NDA online, electronic lease signing, digital consent forms, e-signature use cases',
  alternates: { canonical: 'https://esigntap.com/use-cases' },
  openGraph: {
    title: 'E-Signature Use Cases | eSignTap',
    description: 'Explore how to e-sign NDAs, leases, contracts, waivers, and more online.',
    url: 'https://esigntap.com/use-cases',
    siteName: 'eSignTap',
    type: 'website',
  },
}

export default function UseCasesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Use Cases' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Use Cases</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Sign Any{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Document Type
            </span>{' '}
            Online
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            From NDAs to lease agreements, eSignTap makes it easy to sign any document electronically. Free, legally binding, and secure.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Signing Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <Link
                key={uc.slug}
                href={`/use-cases/${uc.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-purple-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{uc.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{uc.desc}</p>
                <span className="text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Don&apos;t See Your Document Type?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              eSignTap works with any document. Upload any PDF or Word file and start collecting signatures in minutes.
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
