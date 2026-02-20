import Link from 'next/link'
import { CheckCircle, ArrowRight, Upload, Settings, PenTool } from 'lucide-react'
import TrustBadges from './TrustBadges'

export default function UseCasePageTemplate({
  documentType,
  headline,
  subtitle,
  definitionBlock,
  benefits = [],
  steps = [
    { number: 1, title: 'Upload Your Document', description: 'Upload your document in PDF or Word format.', icon: Upload },
    { number: 2, title: 'Add Signature Fields', description: 'Place signature fields and configure recipients.', icon: Settings },
    { number: 3, title: 'Send & Sign', description: 'Recipients sign from any device. Documents are stored securely.', icon: PenTool },
  ],
  faqs = [],
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

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to e-sign ${documentType.toLowerCase()} online`,
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
      { '@type': 'ListItem', position: 2, name: 'Use Cases', item: 'https://esigntap.com/use-cases' },
      { '@type': 'ListItem', position: 3, name: documentType },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li><Link href="/use-cases" className="hover:text-gray-900">Use Cases</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">{documentType}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            {headline || <>E-Sign <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{documentType}</span> Online</>}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">{subtitle}</p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
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

      <TrustBadges />

      {/* Why Sign Electronically */}
      {benefits.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                Why Sign {documentType} Electronically?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              How to E-Sign {documentType} with eSignTap
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-extrabold mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to Sign {documentType} Online?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Get started in under 2 minutes. No credit card, no commitment.
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

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group rounded-2xl border-2 border-gray-200 bg-white shadow-lg overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-6 text-lg font-bold text-gray-900 hover:text-purple-600 transition-colors">
                    {faq.question}
                    <span className="ml-4 text-purple-500 group-open:rotate-45 transition-transform duration-300 text-2xl font-light">+</span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.answer}</div>
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
                    <Link key={sol.slug} href={`/solutions/${sol.slug}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3">
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
                    <Link key={uc.slug} href={`/use-cases/${uc.slug}`} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all flex items-center gap-3">
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </div>
  )
}
