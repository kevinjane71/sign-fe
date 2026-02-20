import Link from 'next/link'
import { Check, X, ArrowRight, DollarSign, Zap, Shield } from 'lucide-react'
import TrustBadges from './TrustBadges'

export default function ComparisonPageTemplate({
  competitor,
  competitorPrice,
  ourPrice = 'From $4.99/mo',
  savings,
  comparisonRows = [],
  faqs = [],
  relatedComparisons = [],
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://esigntap.com/compare' },
      { '@type': 'ListItem', position: 3, name: `${competitor} Alternative` },
    ],
  }

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'eSignTap',
    description: `Best ${competitor} alternative for e-signatures. Save up to ${savings}%.`,
    brand: { '@type': 'Brand', name: 'eSignTap' },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '14.99',
      priceCurrency: 'USD',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li><Link href="/compare" className="hover:text-gray-900">Compare</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">{competitor} Alternative</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            #1 {competitor} Alternative
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Best {competitor} Alternative<br className="hidden md:block" /> in {new Date().getFullYear()}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Save up to {savings}% while getting all the features you need
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Switch to eSignTap <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/70 mt-4 text-sm">Start free, no credit card required</p>
        </div>
      </section>

      <TrustBadges />

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">Feature-by-Feature Comparison</h2>
          <p className="text-center text-gray-500 mb-12 text-lg">See how eSignTap stacks up against {competitor}</p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm uppercase tracking-wider">Feature</th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-4 py-2 rounded-full text-sm">eSignTap</span>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-full text-sm">{competitor}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 font-medium text-gray-800">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-green-700 font-semibold">{row.us}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center gap-1.5">
                        {row.themGood ? <Check className="w-5 h-5 text-green-500 flex-shrink-0" /> : <X className="w-5 h-5 text-red-400 flex-shrink-0" />}
                        <span className={row.themGood ? 'text-gray-700' : 'text-orange-600 font-medium'}>{row.them}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Switch */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">Why Businesses Switch to eSignTap</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Money</h3>
              <p className="text-gray-600 leading-relaxed">Cut your e-signature costs by up to {savings}%. All the features without the enterprise price tag.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simpler Setup</h3>
              <p className="text-gray-600 leading-relaxed">Get started in 2 minutes, not 30. No complex onboarding needed.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Same Features</h3>
              <p className="text-gray-600 leading-relaxed">Legally binding signatures, audit trails, templates, and multi-signer support included.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Steps */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">Switch in Under 5 Minutes</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { n: 1, title: 'Sign Up', desc: 'Create your free eSignTap account in seconds', from: 'from-blue-500', to: 'to-purple-600' },
              { n: 2, title: 'Upload Documents', desc: 'Bring your templates and documents over', from: 'from-purple-500', to: 'to-pink-600' },
              { n: 3, title: 'Start Signing', desc: 'Send your first document for signature', from: 'from-pink-500', to: 'to-red-500' },
            ].map((s) => (
              <div key={s.n} className="flex flex-col items-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${s.from} ${s.to} rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg`}>
                  {s.n}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/login" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-gray-900 text-lg list-none">
                    {faq.q}
                    <span className="ml-4 text-purple-500 group-open:rotate-45 transition-transform duration-200 text-2xl font-light">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to Save {savings}%?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">Join thousands of businesses that have already switched from {competitor} to eSignTap.</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start Free Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Related Comparisons */}
      {relatedComparisons.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Comparisons</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedComparisons.map((comp) => (
                <Link key={comp.slug} href={`/compare/${comp.slug}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-800">vs {comp.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
    </div>
  )
}
