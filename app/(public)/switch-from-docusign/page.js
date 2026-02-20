import Link from 'next/link'
import { Check, X, ArrowRight, Star, AlertTriangle, DollarSign, Lock, Zap, Clock, RefreshCw } from 'lucide-react'
import TrustBadges from '../../components/TrustBadges'

export const metadata = {
  title: 'Switch from DocuSign to eSignTap | Save 70%',
  description: 'Migrate from DocuSign to eSignTap in minutes. Same features, 70% less cost. No contracts, cancel anytime.',
  keywords: 'switch from DocuSign, DocuSign migration, leave DocuSign, DocuSign alternative',
  alternates: { canonical: 'https://esigntap.com/switch-from-docusign' },
  openGraph: {
    title: 'Switch from DocuSign to eSignTap | Save 70%',
    description: 'Migrate from DocuSign to eSignTap in minutes. Same features, 70% less cost. No contracts, cancel anytime.',
    url: 'https://esigntap.com/switch-from-docusign',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const painPoints = [
  {
    icon: DollarSign,
    color: 'from-red-400 to-red-600',
    problem: 'Per-Envelope Pricing That Adds Up',
    problemDesc: 'DocuSign charges per envelope on lower plans, and costs skyrocket as your volume grows.',
    solution: 'Unlimited documents on all paid plans',
  },
  {
    icon: RefreshCw,
    color: 'from-orange-400 to-orange-600',
    problem: 'Auto-Renewal Traps',
    problemDesc: 'Locked into annual contracts that auto-renew before you can cancel, with hefty early termination fees.',
    solution: 'Cancel anytime, no tricks',
  },
  {
    icon: Lock,
    color: 'from-yellow-400 to-yellow-600',
    problem: 'Features Locked Behind Expensive Plans',
    problemDesc: 'Need templates or multi-signer? DocuSign makes you upgrade to premium tiers for basic features.',
    solution: 'All core features from $4.99/mo',
  },
  {
    icon: AlertTriangle,
    color: 'from-purple-400 to-purple-600',
    problem: 'Complex Setup & Clunky Interface',
    problemDesc: 'Lengthy onboarding, confusing menus, and a UI that feels like it was designed for enterprise IT teams.',
    solution: 'Start signing in 2 minutes',
  },
]

const savingsRows = [
  { scenario: '1 User, 50 docs/mo', docusign: '$25/mo', esigntap: '$4.99/mo', savings: '$240/yr' },
  { scenario: '5 Users, 200 docs/mo', docusign: '$125/mo', esigntap: '$24.99/mo (Business)', savings: '$1,200/yr' },
  { scenario: '10 Users, 500 docs/mo', docusign: '$250/mo+', esigntap: '$24.99/mo (Business)', savings: '$2,700/yr' },
]

const sharedFeatures = [
  'Drag & Drop Editor',
  'Multi-Signer Workflows',
  'Reusable Templates',
  'Complete Audit Trail',
  'Automatic Reminders',
  'Mobile Signing',
  'API Access',
  'Custom Branding',
  'Bulk Send',
  'Team Management',
]

const esigntapExtras = [
  'Free plan available',
  'No per-envelope limits',
  'Cancel anytime, no contracts',
]

const migrationSteps = [
  {
    number: 1,
    gradient: 'from-blue-500 to-purple-600',
    title: 'Sign up for free eSignTap account',
    time: '2 minutes',
    desc: 'Create your account instantly. No credit card required, no commitments.',
  },
  {
    number: 2,
    gradient: 'from-purple-500 to-pink-600',
    title: 'Recreate your templates using drag-and-drop editor',
    time: '10 minutes',
    desc: 'Our intuitive editor makes it easy to rebuild your most-used templates quickly.',
  },
  {
    number: 3,
    gradient: 'from-pink-500 to-red-500',
    title: 'Start sending documents',
    time: 'Same features, 70% less cost',
    desc: 'Send your first document for signature and experience the difference immediately.',
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Operations Manager',
    company: 'Greenfield Consulting',
    stars: 5,
    quote: 'We switched from DocuSign after our annual bill jumped to over $3,000. eSignTap does everything we need for a fraction of the cost. The migration took us less than an hour.',
  },
  {
    name: 'James T.',
    role: 'Real Estate Broker',
    company: 'Pacific Realty Group',
    stars: 5,
    quote: 'My agents send hundreds of documents a month. DocuSign was bleeding us dry with per-envelope charges. eSignTap unlimited plan saved us over $2,000 in the first quarter alone.',
  },
  {
    name: 'Priya K.',
    role: 'Founder',
    company: 'LegalFlow Startups',
    stars: 5,
    quote: 'I was skeptical that a cheaper tool could match DocuSign, but eSignTap honestly has a better interface. My clients comment on how easy the signing experience is.',
  },
]

const faqs = [
  {
    q: 'Can I import my DocuSign templates?',
    a: 'DocuSign does not provide a direct template export. However, you can download your original documents (PDF/DOCX) and quickly recreate your templates in eSignTap using our intuitive drag-and-drop editor. Most users recreate their templates in under 10 minutes.',
  },
  {
    q: 'Is eSignTap legally binding like DocuSign?',
    a: 'Yes. eSignTap signatures are fully legally binding and compliant with the ESIGN Act, UETA, and eIDAS regulations. Every signed document includes a comprehensive audit trail with timestamps, IP addresses, and device information for complete legal validity.',
  },
  {
    q: 'Will my recipients notice the difference?',
    a: 'Your recipients will receive a professional signing experience that is just as smooth as DocuSign - many say it is even simpler. With custom branding, your signing pages can feature your company logo and colors for a seamless experience.',
  },
  {
    q: 'Can I use both during transition?',
    a: 'Absolutely. Many customers run eSignTap alongside DocuSign during their transition period. Start sending new documents through eSignTap while your existing DocuSign documents complete their signing cycles. There is no rush to switch everything at once.',
  },
  {
    q: 'Is there a long-term contract?',
    a: 'No. eSignTap operates on a month-to-month basis with no long-term contracts or commitments. You can upgrade, downgrade, or cancel at any time without penalty or cancellation fees.',
  },
  {
    q: 'What happens to my DocuSign documents?',
    a: 'Your existing signed documents in DocuSign remain accessible through your DocuSign account. We recommend downloading copies of your important signed documents for your records. eSignTap does not affect your DocuSign document history in any way.',
  },
  {
    q: 'Does eSignTap have an API like DocuSign?',
    a: 'Yes. eSignTap offers a RESTful API on the Business plan that allows you to integrate e-signature functionality into your existing applications, automate document workflows, and build custom signing experiences programmatically.',
  },
  {
    q: 'How is eSignTap so much cheaper?',
    a: 'We built eSignTap from the ground up with modern, cost-efficient infrastructure. We do not have the legacy overhead, massive sales teams, or enterprise bloat that drives up DocuSign pricing. We pass those savings directly to our customers while delivering the same core functionality.',
  },
]

export default function SwitchFromDocuSignPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Switch from DocuSign' },
    ],
  }

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
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Switch from DocuSign</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            Trusted by teams switching from DocuSign
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Tired of Overpaying<br className="hidden md:block" /> for DocuSign?
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Switch to eSignTap and save up to 70%. Same features, simpler interface, no contracts. Start free in 2 minutes.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Your Free Migration <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/70 mt-4 text-sm">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      <TrustBadges />

      {/* Pain Points Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Why Teams Leave DocuSign
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            These are the real complaints we hear from businesses switching to eSignTap every day.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((point) => (
              <div
                key={point.problem}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${point.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <point.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{point.problem}</h3>
                <p className="text-gray-500 mb-4">{point.problemDesc}</p>
                <div className="flex items-center gap-2 bg-green-50 rounded-xl px-4 py-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-green-700 font-semibold">eSignTap: {point.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            See How Much You Will Save
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            Real cost comparisons based on common usage scenarios.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm uppercase tracking-wider">Scenario</th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-full text-sm">DocuSign</span>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-4 py-2 rounded-full text-sm">eSignTap</span>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm">You Save</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {savingsRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-5 px-6 font-medium text-gray-800">{row.scenario}</td>
                    <td className="py-5 px-6 text-center text-gray-500 line-through">{row.docusign}</td>
                    <td className="py-5 px-6 text-center">
                      <span className="text-green-700 font-bold">{row.esigntap}</span>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <span className="inline-block bg-green-100 text-green-700 font-extrabold px-4 py-1.5 rounded-full text-lg">{row.savings}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            * DocuSign pricing based on published rates. eSignTap Business plan supports unlimited users and documents.
          </p>
        </div>
      </section>

      {/* Feature Parity Checklist */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Everything DocuSign Has. And More.
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            eSignTap matches DocuSign feature-for-feature, plus gives you extras they charge premium for.
          </p>

          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm uppercase tracking-wider">Feature</th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-4 py-2 rounded-full text-sm">eSignTap</span>
                  </th>
                  <th className="py-4 px-6 text-center">
                    <span className="inline-block bg-gray-200 text-gray-600 font-bold px-4 py-2 rounded-full text-sm">DocuSign</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sharedFeatures.map((feature, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 font-medium text-gray-800">{feature}</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* eSignTap Extras */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Plus eSignTap Extras That DocuSign Does Not Offer
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {esigntapExtras.map((extra) => (
                <div key={extra} className="flex items-center gap-2 bg-white rounded-xl px-5 py-3 shadow-sm border border-purple-100">
                  <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className="text-gray-800 font-semibold">{extra}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Migration Steps */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Migrate in 3 Simple Steps
          </h2>
          <p className="text-gray-500 text-lg mb-14 max-w-2xl mx-auto">
            No complex data migration. No downtime. Start sending documents in minutes.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {migrationSteps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white text-3xl font-extrabold mb-6 shadow-lg`}>
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                  {step.time}
                </span>
                <p className="text-gray-500 max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Hear From Teams Who Switched
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg">
            Real feedback from businesses that made the move from DocuSign to eSignTap.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}, {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
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
            Start Your Free Migration Today
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that have already switched from DocuSign to eSignTap. Same features, 70% less cost, zero hassle.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Switch to eSignTap Free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-white/60 mt-4 text-sm">No credit card required. No contracts. Cancel anytime.</p>
        </div>
      </section>

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </div>
  )
}
