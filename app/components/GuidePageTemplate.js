import Link from 'next/link'
import { ArrowRight, CheckCircle, BookOpen } from 'lucide-react'
import TrustBadges from './TrustBadges'

export default function GuidePageTemplate({
  title,
  subtitle,
  heroIcon: HeroIcon = BookOpen,
  accentColor = 'blue',
  tableOfContents = [],
  sections = [],
  faqs = [],
  relatedGuides = [],
  relatedSolutions = [],
  relatedUseCases = [],
  relatedTools = [],
  keyTakeaways = [],
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: subtitle,
    author: { '@type': 'Organization', name: 'eSignTap' },
    publisher: {
      '@type': 'Organization',
      name: 'eSignTap',
      url: 'https://esigntap.com',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://esigntap.com/guides' },
      { '@type': 'ListItem', position: 3, name: title },
    ],
  }

  const colorMap = {
    blue: { bg: 'from-blue-50 to-indigo-50', accent: 'text-blue-600', ring: 'bg-blue-100', badge: 'bg-blue-600' },
    purple: { bg: 'from-purple-50 to-blue-50', accent: 'text-purple-600', ring: 'bg-purple-100', badge: 'bg-purple-600' },
    emerald: { bg: 'from-emerald-50 to-teal-50', accent: 'text-emerald-600', ring: 'bg-emerald-100', badge: 'bg-emerald-600' },
    amber: { bg: 'from-amber-50 to-orange-50', accent: 'text-amber-600', ring: 'bg-amber-100', badge: 'bg-amber-600' },
    slate: { bg: 'from-slate-50 to-gray-50', accent: 'text-slate-600', ring: 'bg-slate-100', badge: 'bg-slate-600' },
  }
  const colors = colorMap[accentColor] || colorMap.blue

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li><Link href="/guides" className="hover:text-gray-900">Guides</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium truncate">{title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className={`bg-gradient-to-br ${colors.bg} py-16 sm:py-20 px-4`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl ${colors.ring} flex items-center justify-center`}>
              <HeroIcon className={`w-6 h-6 ${colors.accent}`} />
            </div>
            <span className={`text-sm font-bold uppercase tracking-wider ${colors.accent}`}>Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl">
            {subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Takeaways */}
        {keyTakeaways.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 sm:p-8 mb-12">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h2>
            <ul className="space-y-3">
              {keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents */}
        {tableOfContents.length > 0 && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-12">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">In This Guide</h2>
            <ol className="space-y-2">
              {tableOfContents.map((item, i) => (
                <li key={i}>
                  <a href={`#${item.id}`} className="text-purple-600 hover:text-purple-800 font-medium text-sm flex items-center gap-2">
                    <span className="text-gray-400 w-5">{i + 1}.</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Content Sections */}
        {sections.map((section, i) => (
          <div key={i} id={section.id} className="mb-12 scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{section.title}</h2>
            {section.content && (
              <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed mb-6 space-y-4">
                {section.content.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>
            )}
            {section.bullets && (
              <ul className="space-y-3 mb-6">
                {section.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
            {section.table && (
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100">
                      {section.table.headers.map((h, j) => (
                        <th key={j} className="text-left py-3 px-4 text-sm font-bold text-gray-700">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, k) => (
                          <td key={k} className="py-3 px-4 text-sm text-gray-600">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {section.callout && (
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
                <p className="text-amber-800 text-sm font-medium">{section.callout}</p>
              </div>
            )}
          </div>
        ))}

        {/* eSignTap CTA within content */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 sm:p-10 text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Start Signing Documents for Free</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            eSignTap makes e-signatures simple, affordable, and legally binding. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold bg-white text-purple-700 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/tools/sign-pdf-free" className="inline-flex items-center justify-center px-8 py-3 text-lg font-bold border-2 border-white text-white rounded-full hover:bg-white/10 transition-all duration-300">
              Try Free PDF Signer
            </Link>
          </div>
        </div>

        <TrustBadges />

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mb-12 mt-12">
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
        <section className="border-t border-gray-200 pt-10 mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100 hover:border-purple-200">
                <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Guide</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-purple-700">{g.name}</h3>
              </Link>
            ))}
            {relatedSolutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 hover:border-blue-200">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Solution</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-blue-700">{s.name}</h3>
              </Link>
            ))}
            {relatedUseCases.map((u) => (
              <Link key={u.slug} href={`/use-cases/${u.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors border border-gray-100 hover:border-emerald-200">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Use Case</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-emerald-700">{u.name}</h3>
              </Link>
            ))}
            {relatedTools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-pink-50 transition-colors border border-gray-100 hover:border-pink-200">
                <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">Free Tool</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-pink-700">{t.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
