import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { glossaryTerms } from '../../utils/pageRegistry'

export const metadata = {
  title: 'E-Signature Glossary | Key Terms Explained | eSignTap',
  description: 'Learn essential e-signature terms: electronic signatures, digital signatures, ESIGN Act, UETA, eIDAS, audit trails, and more. Plain-language definitions.',
  keywords: 'e-signature glossary, electronic signature terms, digital signature definitions, ESIGN Act, UETA, eIDAS, audit trail',
  alternates: { canonical: 'https://esigntap.com/glossary' },
  openGraph: {
    title: 'E-Signature Glossary | eSignTap',
    description: 'Plain-language definitions for every e-signature term you need to know.',
    url: 'https://esigntap.com/glossary',
    siteName: 'eSignTap',
    type: 'website',
  },
}

export default function GlossaryIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Glossary' },
    ],
  }

  // Group terms by first letter
  const grouped = glossaryTerms.reduce((acc, term) => {
    const letter = term.name[0].toUpperCase()
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(term)
    return acc
  }, {})

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  const activeLetters = Object.keys(grouped).sort()

  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Glossary</li>
        </ol>
      </nav>

      <section className="bg-gradient-to-br from-slate-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-purple-500" />
            <span className="text-sm font-bold uppercase tracking-wider text-purple-500">Glossary</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            E-Signature{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Glossary
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Plain-language definitions for every electronic signature term you need to know. From legal frameworks to technical concepts.
          </p>
        </div>
      </section>

      {/* A-Z Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-1">
            {alphabet.map((letter) => {
              const isActive = activeLetters.includes(letter)
              return isActive ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-purple-600 hover:bg-purple-100 transition-colors"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-sm font-bold text-gray-300"
                >
                  {letter}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Term Cards */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeLetters.map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-xl font-extrabold text-purple-600">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[letter].map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-purple-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{term.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{term.desc}</p>
                    <span className="text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read definition <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to Start Signing?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Now that you know the terms, put them into practice. Legally binding e-signatures starting at $4.99/mo.
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
    </div>
  )
}
