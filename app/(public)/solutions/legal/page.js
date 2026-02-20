import Link from 'next/link'
import { Scale, CheckCircle, Upload, Settings, PenTool, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'E-Signatures for Law Firms | eSignTap - Legally Binding Digital Signatures',
  description: 'Legally binding e-signatures for law firms and legal professionals. Sign contracts, agreements, and legal documents securely online.',
  keywords: 'legal e-signature, law firm digital signature, legally binding electronic signature, sign legal documents online',
  alternates: { canonical: 'https://esigntap.com/solutions/legal' },
  openGraph: {
    title: 'E-Signatures for Law Firms | eSignTap',
    description: 'Legally binding e-signatures for law firms. Sign contracts and agreements securely online.',
    url: 'https://esigntap.com/solutions/legal',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '⏰',
    title: 'Client Signature Delays',
    description: 'Clients take days or weeks to return signed documents. Cases stall and billable time is lost waiting for ink on paper.',
  },
  {
    icon: '🔒',
    title: 'Document Security Concerns',
    description: 'Sensitive legal documents sent via email or mail risk interception, loss, or unauthorized access.',
  },
  {
    icon: '📜',
    title: 'Compliance Requirements',
    description: 'Meeting regulatory and evidentiary standards for signed documents demands rigorous audit trails and verification.',
  },
]

const useCases = [
  { title: 'Service Agreements', description: 'Get client engagement letters and service agreements signed before starting work.' },
  { title: 'Power of Attorney', description: 'Execute power of attorney documents securely with full identity verification.' },
  { title: 'Retainer Agreements', description: 'Onboard new clients faster with instant digital retainer signing.' },
  { title: 'Settlement Documents', description: 'Finalize settlements quickly with multi-party digital signatures.' },
  { title: 'Court Filings', description: 'Prepare and sign court filings and declarations with legally compliant e-signatures.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload legal documents — contracts, agreements, filings — in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature and initial fields, set signing order, and configure authentication for each party.', icon: Settings },
  { number: 3, title: 'Sign', description: 'All parties sign electronically with full audit trail. Download signed documents with certificates of completion.', icon: PenTool },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for law firms?',
    answer: 'Yes. eSignTap is built with the security and compliance features law firms require. Our platform supports complex multi-party signing workflows, provides detailed audit trails, and maintains the evidentiary standards needed for legal documents.',
  },
  {
    question: 'Are e-signatures legally valid for legal documents?',
    answer: 'Yes. Electronic signatures are legally binding under the ESIGN Act (US), UETA, and eIDAS regulation (EU). eSignTap generates comprehensive audit trails, timestamps, IP addresses, and certificates of completion that hold up in court.',
  },
  {
    question: 'How secure are my legal documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. We provide role-based access controls, detailed activity logs, and secure cloud storage. Our infrastructure is designed to meet the stringent security requirements of legal professionals.',
  },
  {
    question: 'How much does eSignTap cost for law firms?',
    answer: 'eSignTap plans start from just $4.99/month. For law firms managing high document volumes, our business plan includes unlimited documents, advanced authentication options, team management, and priority support. Try our free tier to get started.',
  },
]

export default function LegalSolutionPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #2563EB20 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3B82F615 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-8">
            <Scale className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signatures for{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Law Firms
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Legally binding, court-admissible digital signatures with enterprise-grade security. Sign legal documents with confidence.
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
              Legal professionals need signatures that are fast, secure, and hold up in court.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border-2 border-blue-100 shadow-xl hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every legal document you need signed, handled securely and digitally.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
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
              Three simple steps to sign legal documents digitally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-extrabold mb-6 shadow-lg">
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            <div className="p-8">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                ESIGN Act
              </div>
              <p className="text-lg text-gray-600">Fully compliant with ESIGN Act and eIDAS regulations worldwide.</p>
            </div>
            <div className="p-8">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                256-bit
              </div>
              <p className="text-lg text-gray-600">Enterprise-grade AES encryption for all documents in transit and at rest.</p>
            </div>
            <div className="p-8">
              <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                100%
              </div>
              <p className="text-lg text-gray-600">Complete audit trails with timestamps, IP addresses, and signing certificates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Signing Legal Documents Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of legal professionals who trust eSignTap for secure, compliant document signing.
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
                className="group rounded-2xl border-2 border-blue-100 bg-white shadow-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-blue-500 group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
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
