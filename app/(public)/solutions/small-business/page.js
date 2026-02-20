import Link from 'next/link'
import { Store, CheckCircle, Upload, Settings, PenTool, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Affordable E-Signatures for Small Business | eSignTap - From $4.99/mo',
  description: 'The most affordable e-signature solution for small businesses. Sign contracts, invoices, and agreements online. Starting from just $4.99/month.',
  keywords: 'small business e-signature, affordable electronic signature, cheap document signing, small business digital signature',
  alternates: { canonical: 'https://esigntap.com/solutions/small-business' },
  openGraph: {
    title: 'Affordable E-Signatures for Small Business | eSignTap',
    description: 'The most affordable e-signature solution for small businesses. From $4.99/mo.',
    url: 'https://esigntap.com/solutions/small-business',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '💸',
    title: 'Expensive Tools',
    description: 'Enterprise e-signature tools charge $25-50/month per user. Small businesses need an affordable alternative that does not break the bank.',
  },
  {
    icon: '🧩',
    title: 'Complex Setup',
    description: 'Most signing platforms are built for large teams with complicated onboarding. Small businesses need something that works in minutes.',
  },
  {
    icon: '💰',
    title: 'Limited Budget',
    description: 'Every dollar counts when you are a small business. Paying hundreds per month for document signing is not sustainable.',
  },
]

const useCases = [
  { title: 'Client Contracts', description: 'Send and sign client agreements professionally in minutes, not days.' },
  { title: 'Invoices', description: 'Get invoices approved and signed quickly to speed up your cash flow.' },
  { title: 'Vendor Agreements', description: 'Formalize vendor and supplier relationships with signed agreements.' },
  { title: 'Partnership Agreements', description: 'Bring on new partners and collaborators with properly signed documents.' },
  { title: 'NDAs', description: 'Protect your business ideas and trade secrets with signed non-disclosure agreements.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload your business documents — contracts, invoices, agreements — in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields, assign signers, and save templates for documents you send regularly.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Signers sign from any device in seconds. You get notified instantly when it is done.', icon: PenTool },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for small businesses?',
    answer: 'Absolutely. eSignTap was designed with small businesses in mind. Our platform is simple to set up, easy to use, and priced affordably starting at just $4.99/month. No enterprise complexity, no hidden fees.',
  },
  {
    question: 'Are e-signatures legally valid for business contracts?',
    answer: 'Yes. Electronic signatures are legally binding for business contracts under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides full audit trails, timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are my business documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. We maintain access controls, detailed audit logs, and secure cloud storage to keep your business documents safe.',
  },
  {
    question: 'How much does eSignTap cost for small businesses?',
    answer: 'eSignTap starts at just $4.99/month — a fraction of what competitors charge. We also offer a free tier so you can try it before you commit. No long-term contracts, cancel anytime.',
  },
]

export default function SmallBusinessSolutionPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #10B98120 0%, transparent 50%), radial-gradient(circle at 80% 50%, #34D39915 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-8">
            <Store className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signatures for{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              Small Business
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            The most affordable e-signature solution built for small businesses. Professional document signing from just $4.99/month.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required</p>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">The Problem</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Small businesses deserve professional tools without enterprise price tags.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border-2 border-emerald-100 shadow-xl hover:shadow-2xl hover:border-emerald-300 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{point.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every business document you need signed, at a price you can afford.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start signing business documents.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 text-white text-2xl font-extrabold mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent mb-4">
                $4.99/mo
              </div>
              <p className="text-lg text-gray-600">Professional e-signatures starting from just $4.99 per month. No hidden fees.</p>
            </div>
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent mb-4">
                2 Minutes
              </div>
              <p className="text-lg text-gray-600">Set up your account and send your first document for signing in under two minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Signing Business Documents Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of small businesses who have ditched expensive tools and switched to eSignTap.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-10 py-4 text-lg font-bold text-emerald-700 bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="mt-6 text-sm text-blue-200">Join 500+ businesses already using eSignTap</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-2xl border-2 border-emerald-100 bg-white shadow-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-emerald-500 group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  )
}
