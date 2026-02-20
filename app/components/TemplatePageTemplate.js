import Link from 'next/link'
import { ArrowRight, CheckCircle, FileText, Download, Eye } from 'lucide-react'
import TrustBadges from './TrustBadges'

export default function TemplatePageTemplate({
  templateName,
  category,
  description,
  heroIcon: HeroIcon = FileText,
  whatIsIt = '',
  whyUseIt = [],
  keyFields = [],
  howToUse = [],
  tips = [],
  faqs = [],
  relatedTemplates = [],
  relatedUseCases = [],
  relatedSolutions = [],
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Templates', item: 'https://esigntap.com/templates' },
      { '@type': 'ListItem', position: 3, name: templateName },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li><Link href="/templates" className="hover:text-gray-900">Templates</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium truncate">{templateName}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full uppercase">{category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Free {templateName} Template
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/login" className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Use This Template Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* What Is It */}
        {whatIsIt && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Is a {templateName}?</h2>
            <p className="text-gray-600 leading-relaxed">{whatIsIt}</p>
          </section>
        )}

        {/* Key Fields */}
        {keyFields.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Template Includes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keyFields.map((field, i) => (
                <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{field.name}</h3>
                    <p className="text-gray-500 text-sm">{field.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Why Use It */}
        {whyUseIt.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use an E-Signature {templateName}?</h2>
            <ul className="space-y-3">
              {whyUseIt.map((reason, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{reason}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* How to Use */}
        {howToUse.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Template</h2>
            <div className="space-y-4">
              {howToUse.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tips */}
        {tips.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Your {templateName}</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="text-amber-800 text-sm flex items-start gap-2">
                    <span className="font-bold">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 sm:p-10 text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Ready to Use This Template?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Sign up free, customize this template, and send it for e-signature in minutes. No credit card required.
          </p>
          <Link href="/login" className="inline-flex items-center px-8 py-3 font-bold bg-white text-purple-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start Using Template <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <TrustBadges />

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mb-10 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-gray-50 rounded-xl">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-gray-900 text-sm">
                    {faq.question}
                    <span className="ml-4 text-gray-400 group-open:rotate-45 transition-transform text-xl">+</span>
                  </summary>
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related Content */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedTemplates.map((t) => (
              <Link key={t.slug} href={`/templates/${t.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100">
                <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Template</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-purple-700">{t.name}</h3>
              </Link>
            ))}
            {relatedUseCases.map((u) => (
              <Link key={u.slug} href={`/use-cases/${u.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors border border-gray-100">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Use Case</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-emerald-700">{u.name}</h3>
              </Link>
            ))}
            {relatedSolutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Solution</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-blue-700">{s.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
