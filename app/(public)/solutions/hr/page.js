import Link from 'next/link'
import { Briefcase, CheckCircle, Upload, Settings, PenTool, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'E-Signatures for HR & Recruiting | eSignTap - Streamline Onboarding',
  description: 'Digital signatures for HR teams. Automate employee onboarding, offer letters, NDAs, and handbook acknowledgments. Onboard employees in minutes.',
  keywords: 'HR e-signature, digital signature HR, employee onboarding signature, sign offer letter online, NDA electronic signature',
  alternates: { canonical: 'https://esigntap.com/solutions/hr' },
  openGraph: {
    title: 'E-Signatures for HR & Recruiting | eSignTap',
    description: 'Digital signatures for HR teams. Automate onboarding, offer letters, and NDAs.',
    url: 'https://esigntap.com/solutions/hr',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '🐌',
    title: 'Slow Onboarding',
    description: 'New hires wait days or weeks to complete paperwork. First impressions suffer and start dates slip.',
  },
  {
    icon: '📋',
    title: 'Manual Paperwork',
    description: 'HR teams drown in forms — printing, scanning, filing, and chasing signatures across departments.',
  },
  {
    icon: '⚠️',
    title: 'Compliance Risks',
    description: 'Missing signatures and incomplete records create legal exposure and audit headaches.',
  },
]

const useCases = [
  { title: 'Offer Letters', description: 'Send and sign offer letters instantly. Secure top talent before competitors do.' },
  { title: 'NDAs', description: 'Protect company secrets with signed non-disclosure agreements before day one.' },
  { title: 'Employee Handbooks', description: 'Get handbook acknowledgments from every employee with tracked confirmations.' },
  { title: 'Benefits Enrollment', description: 'Streamline open enrollment with digital forms and electronic signatures.' },
  { title: 'Performance Reviews', description: 'Complete review cycles faster with digital sign-off from managers and employees.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload HR documents — offer letters, NDAs, handbooks — in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields, set signers, and create reusable templates for recurring documents.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Employees sign from any device. Track completion status and get instant notifications.', icon: PenTool },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for HR departments?',
    answer: 'Yes. eSignTap is designed to handle the high-volume, recurring document workflows common in HR. From offer letters to performance reviews, our platform supports all standard HR document types with legally binding e-signatures and reusable templates.',
  },
  {
    question: 'Are e-signatures legally valid for employment documents?',
    answer: 'Absolutely. Electronic signatures on employment documents are legally binding under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides complete audit trails, timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are employee documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption in transit and at rest. We maintain role-based access controls, detailed audit logs, and secure cloud storage to keep sensitive employee information safe.',
  },
  {
    question: 'How much does eSignTap cost for HR teams?',
    answer: 'eSignTap plans start from just $4.99/month. For HR teams managing multiple employees, our business plan includes unlimited documents, team management, bulk sending, and priority support. Start with our free tier to try it out.',
  },
]

export default function HRSolutionPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-violet-50 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #7C3AED20 0%, transparent 50%), radial-gradient(circle at 80% 50%, #8B5CF615 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 mb-8">
            <Briefcase className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signatures for{' '}
            <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
              HR &amp; Recruiting
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Onboard employees in minutes, not weeks. Automate every HR document workflow with legally binding digital signatures.
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
              HR teams spend too much time on paperwork instead of people.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border-2 border-purple-100 shadow-xl hover:shadow-2xl hover:border-purple-300 transition-all duration-300"
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every HR document you need signed, handled digitally.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
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
              Three simple steps to streamline HR document signing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white text-2xl font-extrabold mb-6 shadow-lg">
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-purple-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent mb-4">
                5x Faster
              </div>
              <p className="text-lg text-gray-600">Onboard new employees five times faster than traditional paper-based processes.</p>
            </div>
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent mb-4">
                100%
              </div>
              <p className="text-lg text-gray-600">Complete compliance tracking with full audit trails for every signed document.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Signing HR Documents Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of HR teams who have already transformed their onboarding and document workflows with eSignTap.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-10 py-4 text-lg font-bold text-purple-700 bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
                className="group rounded-2xl border-2 border-purple-100 bg-white shadow-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:text-purple-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-purple-500 group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
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
