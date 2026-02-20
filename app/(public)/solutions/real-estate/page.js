import Link from 'next/link'
import { Building2, CheckCircle, Upload, Settings, PenTool, ArrowRight, FileText, Clock, Shield } from 'lucide-react'

export const metadata = {
  title: 'E-Signatures for Real Estate | eSignTap - Close Deals Faster',
  description: 'Digital signatures for real estate agents and brokers. Sign lease agreements, purchase contracts, and inspection reports online. Close deals 3x faster.',
  keywords: 'real estate e-signature, digital signature real estate, sign lease agreement online, real estate document signing, electronic signature for realtors',
  alternates: { canonical: 'https://esigntap.com/solutions/real-estate' },
  openGraph: {
    title: 'E-Signatures for Real Estate | eSignTap',
    description: 'Digital signatures for real estate. Sign lease agreements and purchase contracts online.',
    url: 'https://esigntap.com/solutions/real-estate',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '📄',
    title: 'Paper-Heavy Closings',
    description: 'Real estate transactions involve dozens of documents. Printing, scanning, and mailing slows everything down and increases errors.',
  },
  {
    icon: '⏳',
    title: 'Delayed Signatures',
    description: 'Chasing clients for signatures across time zones and busy schedules causes deals to stall and fall through.',
  },
  {
    icon: '📁',
    title: 'Lost Documents',
    description: 'Paper documents get misplaced, misfiled, or damaged. Critical deal documents should never go missing.',
  },
]

const useCases = [
  { title: 'Lease Agreements', description: 'Get residential and commercial leases signed in minutes, not days.' },
  { title: 'Purchase Agreements', description: 'Close on property sales faster with instant digital signatures from all parties.' },
  { title: 'Inspection Reports', description: 'Share and sign inspection findings immediately after walkthroughs.' },
  { title: 'Disclosure Forms', description: 'Ensure all required disclosures are signed and legally documented.' },
  { title: 'Listing Agreements', description: 'Onboard new listings quickly with streamlined agent-client signing.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload your real estate documents — leases, contracts, disclosures — in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields, assign signers, and set the signing order for all parties involved.', icon: Settings },
  { number: 3, title: 'Sign', description: 'All parties sign electronically from any device. Get notified instantly when the deal is done.', icon: PenTool },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for real estate transactions?',
    answer: 'Absolutely. eSignTap is built to handle the complex, multi-party signing workflows common in real estate. From lease agreements to purchase contracts, our platform supports all standard real estate document types with legally binding e-signatures.',
  },
  {
    question: 'Are e-signatures legally valid for real estate documents?',
    answer: 'Yes. Electronic signatures are legally binding for real estate transactions under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides full audit trails, timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are my real estate documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. We maintain strict access controls, detailed audit logs, and secure cloud storage to keep your sensitive property documents safe.',
  },
  {
    question: 'How much does eSignTap cost for real estate teams?',
    answer: 'eSignTap offers plans starting from just $4.99/month. We also have a free tier so you can try it out. For real estate teams and brokerages, our business plan includes unlimited documents, team management, and priority support.',
  },
]

export default function RealEstateSolutionPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #F9731620 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F59E0B15 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-8">
            <Building2 className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signatures for{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Real Estate
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Stop losing deals to paperwork delays. Close real estate transactions 3x faster with legally binding digital signatures that work from anywhere.
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
              Real estate professionals waste countless hours on document logistics instead of closing deals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border-2 border-orange-100 shadow-xl hover:shadow-2xl hover:border-orange-300 transition-all duration-300"
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every real estate document you need signed, handled digitally.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
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
              Three simple steps to close real estate deals faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 text-white text-2xl font-extrabold mb-6 shadow-lg">
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
                3x Faster
              </div>
              <p className="text-lg text-gray-600">Close real estate deals three times faster than traditional paper-based workflows.</p>
            </div>
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent mb-4">
                80% Less
              </div>
              <p className="text-lg text-gray-600">Reduce paperwork by 80% with fully digital document management and signing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Signing Real Estate Documents Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of real estate professionals who have already streamlined their closing process with eSignTap.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-10 py-4 text-lg font-bold text-blue-700 bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
                className="group rounded-2xl border-2 border-orange-100 bg-white shadow-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-orange-500 group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
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
