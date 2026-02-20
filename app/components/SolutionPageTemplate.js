import Link from 'next/link'
import { CheckCircle, Upload, Settings, PenTool, ArrowRight } from 'lucide-react'
import TrustBadges from './TrustBadges'

export default function SolutionPageTemplate({
  industry,
  headline,
  subtitle,
  heroIcon: HeroIcon,
  accentColor = 'blue', // tailwind color name
  painPoints = [],
  useCases = [],
  steps = [
    { number: 1, title: 'Upload', description: 'Upload your documents in PDF or Word format.', icon: Upload },
    { number: 2, title: 'Configure', description: 'Add signature fields and set up signing flows.', icon: Settings },
    { number: 3, title: 'Sign', description: 'Recipients sign from any device. Documents are stored securely.', icon: PenTool },
  ],
  stats = [],
  faqs = [],
  relatedSolutions = [],
  relatedUseCases = [],
  definitionBlock = null,
  comparisonTable = null,
}) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use e-signatures for ${industry}`,
    description: subtitle,
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.number,
      name: s.title,
      text: s.description,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://esigntap.com/solutions' },
      { '@type': 'ListItem', position: 3, name: industry },
    ],
  }

  const colorMap = {
    blue: { gradient: 'from-blue-500 to-blue-600', bg: 'from-blue-50 via-white to-blue-50', border: 'border-blue-100 hover:border-blue-300', text: 'text-blue-500', statGrad: 'from-blue-500 to-blue-600', bgSection: 'from-blue-50/50 to-white' },
    rose: { gradient: 'from-rose-500 to-rose-600', bg: 'from-rose-50 via-white to-rose-50', border: 'border-rose-100 hover:border-rose-300', text: 'text-rose-500', statGrad: 'from-rose-500 to-rose-600', bgSection: 'from-rose-50/50 to-white' },
    violet: { gradient: 'from-violet-500 to-violet-600', bg: 'from-violet-50 via-white to-violet-50', border: 'border-violet-100 hover:border-violet-300', text: 'text-violet-500', statGrad: 'from-violet-500 to-violet-600', bgSection: 'from-violet-50/50 to-white' },
    amber: { gradient: 'from-amber-500 to-amber-600', bg: 'from-amber-50 via-white to-amber-50', border: 'border-amber-100 hover:border-amber-300', text: 'text-amber-500', statGrad: 'from-amber-500 to-amber-600', bgSection: 'from-amber-50/50 to-white' },
    emerald: { gradient: 'from-emerald-500 to-emerald-600', bg: 'from-emerald-50 via-white to-emerald-50', border: 'border-emerald-100 hover:border-emerald-300', text: 'text-emerald-500', statGrad: 'from-emerald-500 to-emerald-600', bgSection: 'from-emerald-50/50 to-white' },
    pink: { gradient: 'from-pink-500 to-pink-600', bg: 'from-pink-50 via-white to-pink-50', border: 'border-pink-100 hover:border-pink-300', text: 'text-pink-500', statGrad: 'from-pink-500 to-pink-600', bgSection: 'from-pink-50/50 to-white' },
    orange: { gradient: 'from-orange-500 to-orange-600', bg: 'from-orange-50 via-white to-orange-50', border: 'border-orange-100 hover:border-orange-300', text: 'text-orange-500', statGrad: 'from-orange-500 to-orange-600', bgSection: 'from-orange-50/50 to-white' },
    sky: { gradient: 'from-sky-500 to-sky-600', bg: 'from-sky-50 via-white to-sky-50', border: 'border-sky-100 hover:border-sky-300', text: 'text-sky-500', statGrad: 'from-sky-500 to-sky-600', bgSection: 'from-sky-50/50 to-white' },
    yellow: { gradient: 'from-yellow-500 to-yellow-600', bg: 'from-yellow-50 via-white to-yellow-50', border: 'border-yellow-100 hover:border-yellow-300', text: 'text-yellow-600', statGrad: 'from-yellow-500 to-yellow-600', bgSection: 'from-yellow-50/50 to-white' },
    slate: { gradient: 'from-slate-500 to-slate-600', bg: 'from-slate-50 via-white to-slate-50', border: 'border-slate-100 hover:border-slate-300', text: 'text-slate-500', statGrad: 'from-slate-500 to-slate-600', bgSection: 'from-slate-50/50 to-white' },
    teal: { gradient: 'from-teal-500 to-teal-600', bg: 'from-teal-50 via-white to-teal-50', border: 'border-teal-100 hover:border-teal-300', text: 'text-teal-500', statGrad: 'from-teal-500 to-teal-600', bgSection: 'from-teal-50/50 to-white' },
    red: { gradient: 'from-red-500 to-red-600', bg: 'from-red-50 via-white to-red-50', border: 'border-red-100 hover:border-red-300', text: 'text-red-500', statGrad: 'from-red-500 to-red-600', bgSection: 'from-red-50/50 to-white' },
    indigo: { gradient: 'from-indigo-500 to-indigo-600', bg: 'from-indigo-50 via-white to-indigo-50', border: 'border-indigo-100 hover:border-indigo-300', text: 'text-indigo-500', statGrad: 'from-indigo-500 to-indigo-600', bgSection: 'from-indigo-50/50 to-white' },
    green: { gradient: 'from-green-500 to-green-600', bg: 'from-green-50 via-white to-green-50', border: 'border-green-100 hover:border-green-300', text: 'text-green-500', statGrad: 'from-green-500 to-green-600', bgSection: 'from-green-50/50 to-white' },
    purple: { gradient: 'from-purple-500 to-purple-600', bg: 'from-purple-50 via-white to-purple-50', border: 'border-purple-100 hover:border-purple-300', text: 'text-purple-500', statGrad: 'from-purple-500 to-purple-600', bgSection: 'from-purple-50/50 to-white' },
    cyan: { gradient: 'from-cyan-500 to-cyan-600', bg: 'from-cyan-50 via-white to-cyan-50', border: 'border-cyan-100 hover:border-cyan-300', text: 'text-cyan-500', statGrad: 'from-cyan-500 to-cyan-600', bgSection: 'from-cyan-50/50 to-white' },
    gray: { gradient: 'from-gray-500 to-gray-600', bg: 'from-gray-50 via-white to-gray-50', border: 'border-gray-200 hover:border-gray-400', text: 'text-gray-500', statGrad: 'from-gray-500 to-gray-600', bgSection: 'from-gray-50/50 to-white' },
  }

  const c = colorMap[accentColor] || colorMap.blue

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li><Link href="/solutions" className="hover:text-gray-900">Solutions</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">{industry}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${c.bg} py-16 sm:py-24`}>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {HeroIcon && (
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${c.gradient} mb-8`}>
              <HeroIcon className="w-10 h-10 text-white" />
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signatures for{' '}
            <span className={`bg-gradient-to-r ${c.gradient} bg-clip-text text-transparent`}>
              {industry}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">No credit card required</p>
        </div>
      </section>

      {/* Definition Block (AEO) */}
      {definitionBlock && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{definitionBlock.title}</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{definitionBlock.content}</p>
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <TrustBadges />

      {/* Pain Points Section */}
      {painPoints.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">The Problem</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Common challenges in {industry.toLowerCase()} document workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {painPoints.map((point, index) => (
                <div key={index} className={`p-8 rounded-2xl bg-white border-2 ${c.border} shadow-xl hover:shadow-2xl transition-all duration-300`}>
                  <div className="text-4xl mb-4">{point.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Comparison Table (Paper vs eSignTap) */}
      {comparisonTable && (
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">Paper vs. eSignTap</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-500 font-medium text-sm uppercase">Aspect</th>
                    <th className="py-4 px-6 text-center text-gray-500 font-medium text-sm uppercase">Paper</th>
                    <th className="py-4 px-6 text-center">
                      <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-4 py-1.5 rounded-full text-sm">eSignTap</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="py-4 px-6 font-medium text-gray-800">{row.aspect}</td>
                      <td className="py-4 px-6 text-center text-gray-500">{row.paper}</td>
                      <td className="py-4 px-6 text-center text-green-700 font-semibold">{row.esigntap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {useCases.length > 0 && (
        <section className={`py-16 sm:py-24 bg-gradient-to-b ${c.bgSection}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Perfect For</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Every {industry.toLowerCase()} document you need signed, handled digitally.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {useCases.map((useCase, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CheckCircle className={`w-6 h-6 ${c.text} flex-shrink-0 mt-0.5`} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{useCase.title}</h3>
                    <p className="text-gray-600">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three simple steps to digitize your {industry.toLowerCase()} document signing.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => {
              const StepIcon = step.icon
              return (
                <div key={step.number} className="text-center p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${c.gradient} text-white text-2xl font-extrabold mb-6 shadow-lg`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.length > 0 && (
        <section className={`py-16 sm:py-24 bg-gradient-to-b ${c.bgSection}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(stats.length, 3)} gap-12 text-center`}>
              {stats.map((stat, i) => (
                <div key={i} className="p-8">
                  <div className={`text-5xl sm:text-6xl font-extrabold bg-gradient-to-r ${c.statGrad} bg-clip-text text-transparent mb-4`}>
                    {stat.value}
                  </div>
                  <p className="text-lg text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inline CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Start Signing {industry} Documents Today
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Join hundreds of {industry.toLowerCase()} professionals who have streamlined their document workflows with eSignTap.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center px-10 py-4 text-lg font-bold bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              style={{ color: '#6d28d9' }}
            >
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <p className="mt-6 text-sm text-blue-200">Join 500+ businesses already using eSignTap</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className={`group rounded-2xl border-2 ${c.border} bg-white shadow-lg overflow-hidden`}
                >
                  <summary className={`flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:${c.text} transition-colors`}>
                    {faq.question}
                    <span className={`ml-4 ${c.text} group-open:rotate-45 transition-transform duration-300 text-2xl font-light`}>+</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Links */}
      {(relatedSolutions.length > 0 || relatedUseCases.length > 0) && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {relatedSolutions.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Solutions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedSolutions.map((sol) => (
                    <Link
                      key={sol.slug}
                      href={`/solutions/${sol.slug}`}
                      className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-800">{sol.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {relatedUseCases.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Use Cases</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedUseCases.map((uc) => (
                    <Link
                      key={uc.slug}
                      href={`/use-cases/${uc.slug}`}
                      className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="font-semibold text-gray-800">{uc.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
