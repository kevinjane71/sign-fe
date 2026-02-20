import Link from 'next/link'
import { ArrowRight, Check, X } from 'lucide-react'
import { comparisons } from '../../utils/pageRegistry'

export const metadata = {
  title: 'Compare eSignTap vs Competitors | E-Signature Comparison',
  description: 'Compare eSignTap with DocuSign, HelloSign, PandaDoc, Adobe Sign, and more. See features, pricing, and why businesses switch to eSignTap.',
  keywords: 'e-signature comparison, DocuSign alternative, HelloSign alternative, compare e-signature platforms',
  alternates: { canonical: 'https://esigntap.com/compare' },
  openGraph: {
    title: 'Compare eSignTap vs Competitors',
    description: 'Side-by-side comparison of eSignTap with leading e-signature platforms.',
    url: 'https://esigntap.com/compare',
    siteName: 'eSignTap',
    type: 'website',
  },
}

export default function CompareIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Compare</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            How eSignTap Compares
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-10">
            See why businesses are switching to eSignTap. Same features, better pricing, simpler setup.
          </p>
        </div>
      </section>

      {/* Multi-Competitor Table */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-gray-500 font-medium text-sm uppercase">Platform</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium text-sm uppercase">Starting Price</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium text-sm uppercase">Free Plan</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium text-sm uppercase">Savings vs.</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-medium text-sm uppercase">Compare</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-purple-200">
                  <td className="py-4 px-4 font-bold text-gray-900">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">eSignTap</span>
                  </td>
                  <td className="py-4 px-4 text-center font-bold text-green-700">$4.99/mo</td>
                  <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="py-4 px-4 text-center text-gray-500">-</td>
                  <td className="py-4 px-4 text-center text-gray-500">-</td>
                </tr>
                {comparisons.map((comp, i) => (
                  <tr key={comp.slug} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-4 font-medium text-gray-800">{comp.competitor}</td>
                    <td className="py-4 px-4 text-center text-gray-600">{comp.competitorPrice}</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center font-bold text-green-600">Save {comp.savings}%</td>
                    <td className="py-4 px-4 text-center">
                      <Link href={`/compare/${comp.slug}`} className="text-purple-600 font-semibold hover:text-purple-800 text-sm">
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Individual Comparison Cards */}
      <section className="py-16 sm:py-24 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Detailed Comparisons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-purple-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">vs {comp.competitor}</h3>
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">Save {comp.savings}%</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  See how eSignTap compares to {comp.competitor} in features, pricing, and ease of use.
                </p>
                <span className="text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Compare now <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">Ready to Switch?</h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses saving time and money with eSignTap. Start free, no credit card required.
            </p>
            <Link href="/login" className="inline-flex items-center px-10 py-4 text-lg font-bold bg-white text-purple-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
