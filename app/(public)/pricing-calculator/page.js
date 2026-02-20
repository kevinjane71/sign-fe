import Link from 'next/link'
import { Check, ArrowRight, DollarSign, X, TrendingDown, ShieldCheck, Zap, Ban } from 'lucide-react'
import TrustBadges from '../../components/TrustBadges'

export const metadata = {
  title: 'E-Signature Pricing Calculator | eSignTap',
  description: 'Compare e-signature costs. See how much you save with eSignTap vs DocuSign, HelloSign, and PandaDoc.',
  keywords: 'e-signature pricing calculator, compare e-signature costs, eSignTap pricing, DocuSign pricing comparison',
  alternates: { canonical: 'https://esigntap.com/pricing-calculator' },
  openGraph: {
    title: 'E-Signature Pricing Calculator | eSignTap',
    description: 'Compare e-signature costs. See how much you save with eSignTap vs DocuSign, HelloSign, and PandaDoc.',
    url: 'https://esigntap.com/pricing-calculator',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const platforms = [
  { name: 'eSignTap', oneUser: '$4.99/mo', fiveUsers: '$24.99/mo', tenUsers: '$24.99/mo', freePlan: true, highlight: true },
  { name: 'DocuSign', oneUser: '$25/mo', fiveUsers: '$125/mo', tenUsers: '$250/mo+', freePlan: false, highlight: false },
  { name: 'HelloSign', oneUser: '$20/mo', fiveUsers: '$100/mo', tenUsers: '$200/mo+', freePlan: false, freeNote: 'Trial only', highlight: false },
  { name: 'PandaDoc', oneUser: '$19/mo', fiveUsers: '$95/mo', tenUsers: '$190/mo+', freePlan: false, highlight: false },
  { name: 'Adobe Sign', oneUser: '$22.99/mo', fiveUsers: '$114.95/mo', tenUsers: '$229.90/mo+', freePlan: false, highlight: false },
]

const savingsCards = [
  {
    competitor: 'DocuSign',
    color: 'from-blue-500 to-blue-700',
    percentSaved: '80%',
    annualSavingsOneUser: '$240',
    annualSavingsFiveUsers: '$1,200',
    annualSavingsTenUsers: '$2,700',
  },
  {
    competitor: 'HelloSign',
    color: 'from-purple-500 to-purple-700',
    percentSaved: '75%',
    annualSavingsOneUser: '$180',
    annualSavingsFiveUsers: '$900',
    annualSavingsTenUsers: '$2,100',
  },
  {
    competitor: 'PandaDoc',
    color: 'from-pink-500 to-pink-700',
    percentSaved: '74%',
    annualSavingsOneUser: '$168',
    annualSavingsFiveUsers: '$840',
    annualSavingsTenUsers: '$1,980',
  },
  {
    competitor: 'Adobe Sign',
    color: 'from-red-500 to-red-700',
    percentSaved: '78%',
    annualSavingsOneUser: '$216',
    annualSavingsFiveUsers: '$1,079',
    annualSavingsTenUsers: '$2,459',
  },
]

const includedFeatures = [
  'Unlimited documents',
  'All field types (signature, text, date, checkbox)',
  'Multi-signer workflows',
  'Reusable templates',
  'Complete audit trail',
  'Automatic reminders',
  'Mobile signing',
  'Custom branding',
]

const noHiddenCosts = [
  { icon: DollarSign, text: 'No per-envelope charges' },
  { icon: Ban, text: 'No per-user fees on Business plan' },
  { icon: ShieldCheck, text: 'No feature gating' },
  { icon: Zap, text: 'No annual contracts required' },
  { icon: TrendingDown, text: 'No cancellation fees' },
]

export default function PricingCalculatorPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Pricing Calculator' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Pricing Calculator</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Compare & Save
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            How Much Are You{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Overpaying
            </span>{' '}
            for E-Signatures?
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Compare real pricing across every major e-signature platform. See exactly how much your team can save by switching to eSignTap.
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Pricing Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Platform Pricing Comparison
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            Side-by-side pricing for the most popular e-signature platforms.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm uppercase tracking-wider">Platform</th>
                  <th className="py-4 px-6 text-center text-gray-500 font-medium text-sm uppercase tracking-wider">1 User</th>
                  <th className="py-4 px-6 text-center text-gray-500 font-medium text-sm uppercase tracking-wider">5 Users</th>
                  <th className="py-4 px-6 text-center text-gray-500 font-medium text-sm uppercase tracking-wider">10 Users</th>
                  <th className="py-4 px-6 text-center text-gray-500 font-medium text-sm uppercase tracking-wider">Free Plan</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((platform, i) => (
                  <tr
                    key={platform.name}
                    className={
                      platform.highlight
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500'
                        : i % 2 === 0
                          ? 'bg-white'
                          : 'bg-gray-50'
                    }
                  >
                    <td className="py-5 px-6 font-bold text-gray-900">
                      {platform.highlight ? (
                        <span className="inline-flex items-center gap-2">
                          {platform.name}
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            Best Value
                          </span>
                        </span>
                      ) : (
                        platform.name
                      )}
                    </td>
                    <td className={`py-5 px-6 text-center font-semibold ${platform.highlight ? 'text-green-700' : 'text-gray-700'}`}>
                      {platform.oneUser}
                    </td>
                    <td className={`py-5 px-6 text-center font-semibold ${platform.highlight ? 'text-green-700' : 'text-gray-700'}`}>
                      {platform.fiveUsers}
                    </td>
                    <td className={`py-5 px-6 text-center font-semibold ${platform.highlight ? 'text-green-700' : 'text-gray-700'}`}>
                      {platform.tenUsers}
                    </td>
                    <td className="py-5 px-6 text-center">
                      {platform.freePlan ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                          <Check className="w-5 h-5" /> Yes
                        </span>
                      ) : platform.freeNote ? (
                        <span className="text-orange-500 font-medium text-sm">{platform.freeNote}</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-400">
                          <X className="w-5 h-5" /> No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-gray-400 text-sm mt-6">
            * Pricing based on published rates as of 2025. Actual pricing may vary by plan and region.
          </p>
        </div>
      </section>

      {/* Annual Savings Cards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Your Annual Savings with eSignTap
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            See how much your team saves every year compared to other platforms.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {savingsCards.map((card) => (
              <div
                key={card.competitor}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${card.color} px-6 py-4`}>
                  <p className="text-white/80 text-sm font-medium">vs {card.competitor}</p>
                  <p className="text-white text-3xl font-extrabold">Save {card.percentSaved}</p>
                </div>
                <div className="px-6 py-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">1 User</span>
                    <span className="text-green-600 font-bold">{card.annualSavingsOneUser}/yr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">5 Users</span>
                    <span className="text-green-600 font-bold">{card.annualSavingsFiveUsers}/yr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">10 Users</span>
                    <span className="text-green-600 font-bold">{card.annualSavingsTenUsers}/yr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get at Every Price Point */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            What You Get at Every Price Point
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            Unlike competitors who lock features behind expensive tiers, eSignTap includes everything on every paid plan.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-800 font-semibold">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Hidden Costs */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            No Hidden Costs. Ever.
          </h2>
          <p className="text-gray-500 text-lg mb-14 max-w-2xl mx-auto">
            The price you see is the price you pay. No surprises on your bill.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {noHiddenCosts.map((item) => (
              <div
                key={item.text}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-gray-800 font-semibold text-sm">{item.text}</p>
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
              Start Free Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Stop overpaying for e-signatures. Try eSignTap free and see the difference for yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center px-10 py-4 text-lg font-bold bg-white text-purple-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="/price"
                className="inline-flex items-center px-10 py-4 text-lg font-bold text-white border-2 border-white/40 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                View Full Pricing
              </Link>
            </div>
            <p className="text-white/60 mt-4 text-sm">No credit card required. No contracts.</p>
          </div>
        </div>
      </section>

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
