import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import TrustBadges from './TrustBadges'

export default function GlossaryPageTemplate({
  term,
  definition,
  longDescription = [],
  keyPoints = [],
  examples = [],
  faqs = [],
  relatedTerms = [],
  relatedGuides = [],
  relatedSolutions = [],
  relatedUseCases = [],
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

  const definitionSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term,
    description: definition,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://esigntap.com/glossary' },
      { '@type': 'ListItem', position: 3, name: term },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li><Link href="/glossary" className="hover:text-gray-900">Glossary</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium truncate">{term}</li>
        </ol>
      </nav>

      {/* Hero - Definition Block */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold uppercase tracking-wider text-purple-500">Glossary</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            What Is {term}?
          </h1>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <p className="text-lg text-gray-700 leading-relaxed font-medium">{definition}</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Long Description */}
        {longDescription.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{term} Explained</h2>
            <div className="space-y-4">
              {longDescription.map((p, i) => (
                <p key={i} className="text-gray-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* Key Points */}
        {keyPoints.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Points</h2>
            <div className="bg-blue-50 rounded-2xl p-6">
              <ul className="space-y-3">
                {keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Examples */}
        {examples.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Examples</h2>
            <div className="grid gap-3">
              {examples.map((example, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{example.title}</h3>
                  <p className="text-gray-600 text-sm">{example.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">Try eSignTap Free</h2>
          <p className="text-purple-100 mb-6 max-w-lg mx-auto text-sm">
            Legally binding e-signatures starting at $4.99/mo. No credit card required to get started.
          </p>
          <Link href="/login" className="inline-flex items-center px-8 py-3 font-bold bg-white text-purple-700 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <TrustBadges />

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mb-10 mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
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

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTerms.map((t) => (
                <Link key={t.slug} href={`/glossary/${t.slug}`} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition-colors">
                  {t.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Resources */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors border border-gray-100">
                <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Guide</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-purple-700">{g.name}</h3>
              </Link>
            ))}
            {relatedSolutions.map((s) => (
              <Link key={s.slug} href={`/solutions/${s.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Solution</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-blue-700">{s.name}</h3>
              </Link>
            ))}
            {relatedUseCases.map((u) => (
              <Link key={u.slug} href={`/use-cases/${u.slug}`} className="group p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors border border-gray-100">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Use Case</span>
                <h3 className="text-sm font-bold text-gray-900 mt-1 group-hover:text-emerald-700">{u.name}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definitionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
