import Link from 'next/link'
import {
  FileText,
  Shield,
  CheckCircle,
  ArrowRight,
  Users,
  Lock,
  Zap,
  Scale,
  PenTool,
  Settings,
} from 'lucide-react'
import TrustBadges from '@/app/components/TrustBadges'

export const metadata = {
  title: 'Free NDA Generator | Create NDA Online',
  description:
    'Generate customizable NDA templates for free. Choose mutual or unilateral NDAs, customize terms, and send for e-signature instantly.',
  keywords:
    'free NDA template generator, create NDA online, non-disclosure agreement template, mutual NDA generator, unilateral NDA template free',
  alternates: { canonical: 'https://esigntap.com/tools/nda-generator' },
  openGraph: {
    title: 'Free NDA Generator | Create NDA Online',
    description:
      'Generate customizable NDA templates for free. Create, customize, and send for e-signature.',
    url: 'https://esigntap.com/tools/nda-generator',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const ndaTypes = [
  {
    icon: Users,
    title: 'Mutual NDA (Bilateral)',
    description:
      'Both parties agree to keep each other&apos;s information confidential. Ideal for partnerships, joint ventures, mergers, and business negotiations where both sides share sensitive information.',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    icon: Shield,
    title: 'Unilateral NDA (One-Way)',
    description:
      'Only one party discloses confidential information, and the other party agrees to protect it. Common for employee onboarding, freelancer agreements, and investor pitches.',
    gradient: 'from-purple-400 to-violet-600',
  },
  {
    icon: Scale,
    title: 'Multilateral NDA',
    description:
      'Three or more parties are involved, and at least one party shares confidential information. Eliminates the need for multiple bilateral NDAs in complex multi-party deals.',
    gradient: 'from-pink-400 to-rose-600',
  },
]

const ndaIncludes = [
  'Names and addresses of all parties involved',
  'Clear definition of what constitutes confidential information',
  'Obligations and duties of the receiving party',
  'Duration of the confidentiality obligation',
  'Exclusions from confidential information (public knowledge, independent discovery)',
  'Consequences of breach and available remedies',
  'Governing law and jurisdiction for disputes',
  'Signature lines and execution date',
]

const steps = [
  {
    number: 1,
    title: 'Choose Your NDA Type',
    description:
      'Select from mutual, unilateral, or multilateral NDA templates. Each template is crafted by legal professionals and covers the essential clauses you need.',
    icon: Settings,
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    number: 2,
    title: 'Customize the Terms',
    description:
      'Fill in party names, define the scope of confidential information, set the duration, and adjust any clauses to match your specific requirements.',
    icon: PenTool,
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    number: 3,
    title: 'Send for E-Signature',
    description:
      'Send your completed NDA to all parties for legally binding electronic signatures. Track signing progress in real time with complete audit trails.',
    icon: FileText,
    gradient: 'from-pink-500 to-red-500',
  },
]

const faqs = [
  {
    q: 'Is the NDA generator really free?',
    a: 'Yes. You can generate and customize NDA templates completely free of charge. To send your NDA for electronic signature with legally binding audit trails, create a free eSignTap account. No credit card is required to get started.',
  },
  {
    q: 'Are the generated NDAs legally binding?',
    a: 'Our NDA templates are crafted based on standard legal frameworks and cover essential clauses. However, we recommend having any NDA reviewed by a qualified attorney before execution, especially for high-value transactions. When signed through eSignTap, the e-signatures are legally binding under the ESIGN Act and eIDAS regulation.',
  },
  {
    q: 'What is the difference between a mutual and unilateral NDA?',
    a: 'A unilateral (one-way) NDA protects only one party&apos;s confidential information. A mutual (bilateral) NDA protects both parties, meaning each side agrees to keep the other&apos;s information confidential. Mutual NDAs are more common in business partnerships and negotiations.',
  },
  {
    q: 'How long should an NDA last?',
    a: 'NDA durations vary by situation. Common timeframes range from one to five years, though some NDAs can be indefinite for trade secrets. Our generator lets you set a custom duration that fits your needs. Consult a legal professional if you are unsure about the appropriate duration.',
  },
  {
    q: 'Can I customize the NDA template?',
    a: 'Absolutely. Our NDA generator lets you customize party names, define what constitutes confidential information, set the duration, specify governing law, and adjust other key terms. You can also add or remove clauses to match your specific requirements.',
  },
  {
    q: 'Can I send the NDA for e-signature after generating it?',
    a: 'Yes. Once your NDA is generated, you can send it directly through eSignTap for legally binding electronic signatures. All parties receive email notifications, can sign from any device, and you get a complete audit trail including timestamps, IP addresses, and certificates of completion.',
  },
]

export default function NdaGeneratorPage() {
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
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://esigntap.com/tools' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NDA Generator',
        item: 'https://esigntap.com/tools/nda-generator',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-16 sm:py-24 px-4">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #fff 0%, transparent 50%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Free NDA Templates &mdash; Legally Reviewed
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Free NDA Generator
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Create professional non-disclosure agreements in minutes. Choose your NDA type, customize
            the terms, and send for legally binding e-signature &mdash; all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create Your NDA <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">No credit card required</p>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* What Is an NDA */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            What Is a Non-Disclosure Agreement?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p>
              A Non-Disclosure Agreement (NDA), also known as a confidentiality agreement, is a legally binding
              contract between two or more parties that outlines confidential information the parties wish to share
              with each other but want to restrict access to by third parties. NDAs are a critical tool in business
              for protecting trade secrets, proprietary processes, client lists, financial data, and other sensitive
              information.
            </p>
            <p>
              NDAs are commonly used when entering business negotiations, hiring employees or contractors,
              discussing potential partnerships, seeking investment, or sharing proprietary technology. Without
              an NDA in place, there is no legal obligation for the receiving party to keep your information
              confidential, leaving your business exposed to potential misuse of sensitive data.
            </p>
          </div>
        </div>
      </section>

      {/* Types of NDAs */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Types of NDAs
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            Choose the right NDA type for your situation. Each serves a different purpose.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {ndaTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${type.gradient} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <type.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{type.title}</h3>
                <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: type.description }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Include */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            What to Include in Your NDA
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            A well-drafted NDA should contain these essential elements to be enforceable and effective.
          </p>
          <div className="space-y-4 max-w-3xl mx-auto">
            {ndaIncludes.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            How to Create an NDA Online
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">Three simple steps to a professional NDA.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg`}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Create Your NDA in Minutes
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Generate a professional NDA, customize every clause, and send it for legally binding
              e-signature with eSignTap. Free to get started.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 mt-4 text-sm">No credit card required. Set up in 30 seconds.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 px-4 bg-white">
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
                  <span className="ml-4 text-purple-500 group-open:rotate-45 transition-transform duration-200 text-2xl font-light">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            Related Resources
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link
              href="/templates/nda"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">NDA Templates</h3>
              <p className="text-sm text-gray-500">Browse ready-to-use NDA templates</p>
            </Link>
            <Link
              href="/use-cases/nda-signing"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Lock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">NDA Signing</h3>
              <p className="text-sm text-gray-500">Learn about NDA e-signature workflows</p>
            </Link>
            <Link
              href="/solutions/legal"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Scale className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Legal Solutions</h3>
              <p className="text-sm text-gray-500">E-signatures for law firms</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Protect Your Business Today
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Generate a professional NDA and get it signed electronically in minutes, not days.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create NDA Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/use-cases/nda-signing"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Learn About NDA Signing
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </div>
  )
}
