import Link from 'next/link'
import { Check, X, ArrowRight, Star, Shield, Zap, DollarSign } from 'lucide-react'

export const metadata = {
  title: 'Best Adobe Sign Alternative 2025 | eSignTap - Save 75%',
  description: 'Switch from Adobe Sign to eSignTap. Professional e-signatures at 75% lower cost. No complex setup needed.',
  keywords: 'Adobe Sign alternative, Adobe Acrobat Sign alternative, cheaper than Adobe Sign, Adobe Sign competitor',
  alternates: { canonical: 'https://esigntap.com/compare/adobe-sign-alternative' },
  openGraph: {
    title: 'Best Adobe Sign Alternative 2025 | eSignTap',
    description: 'Compare eSignTap vs Adobe Sign. Professional e-signatures at 75% less.',
    url: 'https://esigntap.com/compare/adobe-sign-alternative',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const competitor = 'Adobe Sign (Acrobat Sign)'
const competitorShort = 'Adobe Sign'
const competitorPrice = '$30/mo'
const ourPrice = 'From $4.99/mo'
const savings = '75'

const comparisonRows = [
  { feature: 'Starting Price', us: '$4.99/mo', them: '$30/mo', usGood: true, themGood: false },
  { feature: 'Free Trial', us: 'Yes, unlimited', them: 'Limited', usGood: true, themGood: false },
  { feature: 'Documents/Month', us: 'Unlimited (Pro)', them: 'Limited', usGood: true, themGood: false },
  { feature: 'Multi-Signer', us: 'Included', them: 'Premium only', usGood: true, themGood: false },
  { feature: 'Templates', us: 'Included', them: 'Premium', usGood: true, themGood: false },
  { feature: 'Audit Trail', us: 'Included', them: 'Premium', usGood: true, themGood: false },
  { feature: 'API Access', us: 'Business plan', them: 'Enterprise', usGood: true, themGood: false },
  { feature: 'Mobile Support', us: 'All plans', them: 'All plans', usGood: true, themGood: true },
  { feature: 'Setup Time', us: '2 minutes', them: '30+ minutes', usGood: true, themGood: false },
  { feature: 'Contract Required', us: 'No', them: 'Annual', usGood: true, themGood: false },
]

const faqs = [
  {
    q: `Is eSignTap really as good as ${competitorShort}?`,
    a: `Yes! eSignTap provides all the core e-signature features you rely on with ${competitorShort} — legally binding signatures, audit trails, templates, multi-signer workflows, and more. Many businesses have switched and found eSignTap simpler to use while saving significantly on costs.`,
  },
  {
    q: `How do I migrate from ${competitorShort}?`,
    a: `Migrating is simple. Sign up for eSignTap, upload your existing document templates, and start sending. There's no complex data migration needed. Most users are up and running in under 5 minutes.`,
  },
  {
    q: 'Is eSignTap legally binding?',
    a: 'Absolutely. eSignTap signatures are legally binding and compliant with the ESIGN Act, UETA, and eIDAS regulations. Every signed document includes a comprehensive audit trail for full legal validity.',
  },
  {
    q: 'What file formats does eSignTap support?',
    a: 'eSignTap supports PDF, Word (DOCX), and many other common document formats. You can upload documents directly or use our built-in templates to create documents from scratch.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. eSignTap has no long-term contracts or cancellation fees. You can upgrade, downgrade, or cancel your plan at any time — no questions asked.',
  },
]

export default function AdobeSignAlternativePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            #1 {competitorShort} Alternative
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Best {competitor} Alternative<br className="hidden md:block" /> in 2025
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Save up to {savings}% while getting all the features you need
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Switch to eSignTap <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/70 mt-4 text-sm">Start free, no credit card required</p>
        </div>
      </section>

      {/* Side-by-Side Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Feature-by-Feature Comparison
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">
            See how eSignTap stacks up against {competitorShort}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm uppercase tracking-wider">Feature</th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-4 py-2 rounded-full text-sm">
                      eSignTap
                    </span>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-full text-sm">
                      {competitorShort}
                    </span>
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
                        {row.themGood ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
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

      {/* Why Switch Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Why Businesses Switch to eSignTap
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Money</h3>
              <p className="text-gray-600 leading-relaxed">
                Cut your e-signature costs by up to {savings}%. Get all the features you need without the enterprise price tag.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simpler Setup</h3>
              <p className="text-gray-600 leading-relaxed">
                Get started in 2 minutes, not 30. No complex onboarding or training needed — just sign up and start signing.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Same Features</h3>
              <p className="text-gray-600 leading-relaxed">
                Legally binding signatures, audit trails, templates, and multi-signer support — everything you expect, included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Migration CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-12">
            Switch in Under 5 Minutes
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Up</h3>
              <p className="text-gray-500">Create your free eSignTap account in seconds</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Upload Documents</h3>
              <p className="text-gray-500">Bring your templates and documents over</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Start Signing</h3>
              <p className="text-gray-500">Send your first document for signature</p>
            </div>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-semibold text-gray-900 text-lg list-none">
                  {faq.q}
                  <span className="ml-4 text-purple-500 group-open:rotate-45 transition-transform duration-200 text-2xl font-light">+</span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Save {savings}%?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that have already switched from {competitorShort} to eSignTap.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  )
}
