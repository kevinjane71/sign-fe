import Link from 'next/link'
import { Heart, CheckCircle, Upload, Settings, PenTool, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'E-Signatures for Healthcare | eSignTap - Secure Patient Document Signing',
  description: 'Secure e-signatures for healthcare providers. Sign consent forms, patient intake documents, and medical records digitally. HIPAA-aware security.',
  keywords: 'healthcare e-signature, medical document signing, patient consent form digital, healthcare electronic signature',
  alternates: { canonical: 'https://esigntap.com/solutions/healthcare' },
  openGraph: {
    title: 'E-Signatures for Healthcare | eSignTap',
    description: 'Secure e-signatures for healthcare providers. Sign consent forms and patient documents digitally.',
    url: 'https://esigntap.com/solutions/healthcare',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: '⏱️',
    title: 'Patient Wait Times',
    description: 'Patients spend valuable appointment time filling out paper forms in waiting rooms instead of receiving care.',
  },
  {
    icon: '📄',
    title: 'Paper Forms Everywhere',
    description: 'Stacks of intake forms, consent documents, and insurance papers create clutter and increase the risk of errors.',
  },
  {
    icon: '🔐',
    title: 'Data Security',
    description: 'Patient health information requires the highest level of security. Paper forms and email attachments fall short.',
  },
]

const useCases = [
  { title: 'Patient Consent Forms', description: 'Collect informed consent digitally before procedures — even remotely.' },
  { title: 'Intake Documents', description: 'Let patients complete and sign intake forms from home before their visit.' },
  { title: 'Insurance Forms', description: 'Streamline insurance authorization and claims paperwork with digital signatures.' },
  { title: 'Treatment Agreements', description: 'Get treatment plan acknowledgments signed quickly and stored securely.' },
  { title: 'Telehealth Consents', description: 'Collect telehealth consent forms digitally for virtual appointments.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload consent forms, intake documents, and patient paperwork in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields, set up patient-friendly signing flows, and create reusable templates.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Patients sign from any device — at home or in the office. Documents are stored securely.', icon: PenTool },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for healthcare providers?',
    answer: 'Yes. eSignTap is designed with security features that support healthcare document workflows. Our platform handles patient consent forms, intake documents, insurance forms, and other healthcare paperwork with encryption and access controls.',
  },
  {
    question: 'Are e-signatures legally valid for patient consent forms?',
    answer: 'Yes. Electronic signatures on healthcare documents are legally binding under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides complete audit trails, timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are patient documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. We maintain strict access controls, detailed audit logs, and secure cloud storage. Our security practices are designed with healthcare data sensitivity in mind.',
  },
  {
    question: 'How much does eSignTap cost for healthcare teams?',
    answer: 'eSignTap plans start from just $4.99/month. For healthcare practices, our business plan includes unlimited documents, team management, custom templates, and priority support. Start with our free tier to see how it works for your practice.',
  },
]

export default function HealthcareSolutionPage() {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #EC489920 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F472B615 0%, transparent 50%)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink-100 mb-8">
            <Heart className="w-10 h-10 text-pink-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signatures for{' '}
            <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              Healthcare
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Reduce patient wait times and eliminate paper forms. Secure digital signatures designed for healthcare workflows.
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
              Healthcare providers spend too much time on paperwork and not enough time on patient care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border-2 border-pink-100 shadow-xl hover:shadow-2xl hover:border-pink-300 transition-all duration-300"
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perfect For</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every healthcare document you need signed, handled securely and digitally.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CheckCircle className="w-6 h-6 text-pink-500 flex-shrink-0 mt-0.5" />
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
              Three simple steps to digitize your healthcare document signing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white text-2xl font-extrabold mb-6 shadow-lg">
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
                60% Less
              </div>
              <p className="text-lg text-gray-600">Reduce patient wait times by 60% with pre-visit digital form completion.</p>
            </div>
            <div className="p-8">
              <div className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
                Secure
              </div>
              <p className="text-lg text-gray-600">256-bit encryption and strict access controls for all patient documents.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Signing Healthcare Documents Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of healthcare providers who have streamlined their patient document workflows with eSignTap.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center px-10 py-4 text-lg font-bold text-pink-700 bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
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
                className="group rounded-2xl border-2 border-pink-100 bg-white shadow-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:text-pink-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 text-pink-500 group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
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
