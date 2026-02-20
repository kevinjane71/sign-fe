import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { solutions } from '../../utils/pageRegistry'

export const metadata = {
  title: 'E-Signature Solutions by Industry | eSignTap',
  description: 'Explore eSignTap e-signature solutions tailored for every industry. From healthcare to real estate, find the right digital signing workflow for your business.',
  keywords: 'e-signature solutions, industry e-signatures, digital signing by industry, electronic signature platform',
  alternates: { canonical: 'https://esigntap.com/solutions' },
  openGraph: {
    title: 'E-Signature Solutions by Industry | eSignTap',
    description: 'Explore eSignTap e-signature solutions tailored for every industry.',
    url: 'https://esigntap.com/solutions',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const colorClasses = {
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'hover:border-orange-300' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', border: 'hover:border-violet-300' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'hover:border-amber-300' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-600', border: 'hover:border-rose-300' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'hover:border-emerald-300' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'hover:border-pink-300' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-300' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600', border: 'hover:border-sky-300' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'hover:border-yellow-300' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-600', border: 'hover:border-slate-300' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'hover:border-teal-300' },
  red: { bg: 'bg-red-100', text: 'text-red-600', border: 'hover:border-red-300' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'hover:border-indigo-300' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'hover:border-green-300' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-300' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'hover:border-cyan-300' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'hover:border-gray-300' },
}

export default function SolutionsIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Solutions</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signature Solutions for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Industry
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Tailored digital signing workflows for your industry. Save time, reduce costs, and go paperless with eSignTap.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((sol) => {
              const colors = colorClasses[sol.color] || colorClasses.blue
              return (
                <Link
                  key={sol.slug}
                  href={`/solutions/${sol.slug}`}
                  className={`group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 ${colors.border} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <div className={`w-6 h-6 ${colors.text}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5Z" /></svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{sol.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{sol.desc}</p>
                  <span className={`${colors.text} text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all`}>
                    Learn more <ArrowRight className="w-4 h-4" />
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
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              eSignTap works for any business that needs documents signed. Start free and customize it for your workflow.
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
