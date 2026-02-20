import Link from 'next/link'
import {
  ArrowRight,
  UserPlus,
  Upload,
  MousePointerClick,
  Send,
  CheckCircle,
} from 'lucide-react'
import TrustBadges from '../../components/TrustBadges'

export const metadata = {
  title: 'How It Works | eSignTap E-Signatures',
  description:
    'Learn how to send documents for e-signature with eSignTap in 5 simple steps. Create an account, upload, add fields, send, and track — all in minutes.',
  keywords:
    'how to e-sign documents, e-signature process, send documents for signature, electronic signature steps, how eSignTap works',
  alternates: { canonical: 'https://esigntap.com/how-it-works' },
  openGraph: {
    title: 'How It Works | eSignTap E-Signatures',
    description:
      'Send documents for e-signature in 5 simple steps with eSignTap.',
    url: 'https://esigntap.com/how-it-works',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: 'Create Your Free Account',
    desc: 'Sign up in seconds with just your email address. No credit card required, no complex onboarding — you can start sending documents immediately.',
    details: [
      'Sign up with email or Google',
      'No credit card required',
      'Ready to use in under 60 seconds',
    ],
    color: 'from-blue-500 to-blue-600',
  },
  {
    number: 2,
    icon: Upload,
    title: 'Upload Your Document',
    desc: 'Upload a PDF, Word document, or other supported file format. You can also start from one of your saved templates to save even more time.',
    details: [
      'Supports PDF, DOCX, and more',
      'Drag and drop or browse files',
      'Use saved templates for speed',
    ],
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: 3,
    icon: MousePointerClick,
    title: 'Add Fields & Signers',
    desc: 'Use the drag-and-drop editor to place signature fields, text boxes, date fields, and checkboxes exactly where you need them. Add signers by email and assign fields to each.',
    details: [
      'Drag-and-drop field placement',
      'Add multiple signers',
      'Set signing order (sequential or parallel)',
    ],
    color: 'from-pink-500 to-pink-600',
  },
  {
    number: 4,
    icon: Send,
    title: 'Send for Signature',
    desc: 'Hit send and your signers receive an email with a secure link. They can sign from any device — desktop, tablet, or phone — without creating an account.',
    details: [
      'Signers receive a secure email link',
      'No account needed to sign',
      'Works on any device',
    ],
    color: 'from-amber-500 to-amber-600',
  },
  {
    number: 5,
    icon: CheckCircle,
    title: 'Track & Download',
    desc: 'Monitor signing progress in real time. Get notified when each signer completes their signature. Download the fully signed document with a complete audit trail.',
    details: [
      'Real-time status updates',
      'Email notifications at every step',
      'Download signed PDF with audit certificate',
    ],
    color: 'from-emerald-500 to-emerald-600',
  },
]

export default function HowItWorksPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'How It Works' },
    ],
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Send Documents for E-Signature with eSignTap',
    description: 'Send documents for electronic signature in 5 simple steps using eSignTap.',
    totalTime: 'PT5M',
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.number,
      name: step.title,
      text: step.desc,
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">How It Works</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-purple-100 text-purple-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Simple & Fast
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Get Documents Signed in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              5 Easy Steps
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            From upload to signed document, the entire process takes less than 5 minutes. No training, no complexity — just results.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Try It Now <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <TrustBadges />

      {/* Steps Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className={`flex flex-col md:flex-row items-start gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-sm font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  <ul className="space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary / Quick Overview */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-12">
            Quick Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg`}>
                  {step.number}
                </div>
                <h4 className="text-sm font-bold text-gray-900 text-center">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to Send Your First Document?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              It takes less than 2 minutes to create your account and send your first document for signature. Try it free.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
    </div>
  )
}
