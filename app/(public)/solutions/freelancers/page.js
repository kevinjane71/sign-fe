import Link from 'next/link'
import { Palette, CheckCircle, Upload, Settings, PenTool, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Free E-Signatures for Freelancers | eSignTap - Sign Documents Free',
  description: 'Free e-signature tool for freelancers and contractors. Sign client contracts, proposals, and invoices professionally. No credit card required.',
  keywords: 'free e-signature freelancers, freelancer document signing, contractor electronic signature, free digital signature tool',
  alternates: { canonical: 'https://esigntap.com/solutions/freelancers' },
  openGraph: {
    title: 'Free E-Signatures for Freelancers | eSignTap',
    description: 'Free e-signature tool for freelancers. Sign contracts and invoices professionally.',
    url: 'https://esigntap.com/solutions/freelancers',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '🚫',
    title: 'No Budget for Tools',
    description: 'Freelancers cannot justify $25/month for document signing when margins are already tight. You need a free or near-free solution.',
  },
  {
    icon: '😬',
    title: 'Unprofessional Image',
    description: 'Asking clients to print, sign, scan, and email documents back makes you look disorganized. First impressions matter.',
  },
  {
    icon: '⏰',
    title: 'Time Wasted on Paperwork',
    description: 'Every hour spent chasing signatures is an hour not spent on billable work. Paperwork is your biggest hidden cost.',
  },
]

const useCases = [
  { title: 'Client Contracts', description: 'Send professional contracts and get them signed before starting any project.' },
  { title: 'Project Proposals', description: 'Win more clients with polished proposals that include built-in signature fields.' },
  { title: 'Invoices', description: 'Get invoices approved and signed to speed up your payment cycle.' },
  { title: 'Scope of Work', description: 'Define project boundaries clearly with signed scope-of-work documents.' },
  { title: 'Non-Compete Agreements', description: 'Protect your client relationships with properly signed non-compete agreements.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload your contracts, proposals, or invoices in PDF or Word format. It takes seconds.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Drag and drop signature fields where you need them. Save templates for documents you reuse.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Share a signing link with your client. They sign from any device — done in under a minute.', icon: PenTool },
]

const faqs = [
  {
    question: 'Is eSignTap really free for freelancers?',
    answer: 'Yes. eSignTap offers a free tier that lets freelancers send and sign documents at no cost. No credit card required, no trial period. When you need more features, paid plans start at just $4.99/month.',
  },
  {
    question: 'Are e-signatures legally valid for freelance contracts?',
    answer: 'Absolutely. Electronic signatures are legally binding for freelance contracts under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides full audit trails, timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are my documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. We maintain access controls, detailed audit logs, and secure cloud storage. Your client documents are always safe.',
  },
  {
    question: 'How much does eSignTap cost if I need more features?',
    answer: 'Our free tier covers basic signing needs. When you are ready for more, paid plans start at just $4.99/month — significantly less than competitors like DocuSign or HelloSign. No long-term contracts required.',
  },
]

export default function FreelancersSolutionPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #F59E0B20 0%, transparent 50%), radial-gradient(circle at 80% 50%, #FBBF2415 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-8">
            <Palette className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signatures for{' '}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Freelancers
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Look professional, get paid faster, and protect your work. Free e-signatures built for freelancers and independent contractors.
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
              Freelancers deserve professional tools without the enterprise price tag.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border-2 border-amber-100 shadow-xl hover:shadow-2xl hover:border-amber-300 transition-all duration-300"
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every freelance document you need signed, handled professionally and for free.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
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
              Three simple steps to sign freelance documents professionally.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-white text-2xl font-extrabold mb-6 shadow-lg">
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent mb-4">
                Free
              </div>
              <p className="text-lg text-gray-600">Start signing documents for free. No credit card, no trial, no catch.</p>
            </div>
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent mb-4">
                Instant
              </div>
              <p className="text-lg text-gray-600">Look professional instantly with polished, branded document signing experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Signing Freelance Documents Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of freelancers who have leveled up their business with professional digital signatures.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-10 py-4 text-lg font-bold text-amber-700 bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
                className="group rounded-2xl border-2 border-amber-100 bg-white shadow-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:text-amber-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-amber-500 group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
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
