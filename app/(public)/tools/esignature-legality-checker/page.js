import Link from 'next/link'
import {
  Globe,
  CheckCircle,
  ArrowRight,
  Shield,
  Scale,
  AlertTriangle,
  FileText,
  BookOpen,
  XCircle,
  Info,
} from 'lucide-react'
import TrustBadges from '@/app/components/TrustBadges'

export const metadata = {
  title: 'E-Signature Legality Checker | eSignTap',
  description:
    'Check if e-signatures are legally valid in your country. Learn about e-signature laws in the US, EU, UK, Canada, Australia, India, and more.',
  keywords:
    'is my e-signature legal, e-signature legality by country, electronic signature laws, ESIGN Act, eIDAS, e-signature validity',
  alternates: { canonical: 'https://esigntap.com/tools/esignature-legality-checker' },
  openGraph: {
    title: 'E-Signature Legality Checker | eSignTap',
    description:
      'Check if e-signatures are legally valid in your country and use case.',
    url: 'https://esigntap.com/tools/esignature-legality-checker',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const regions = [
  {
    region: 'United States',
    law: 'ESIGN Act & UETA',
    status: 'Fully Legal',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'The Electronic Signatures in Global and National Commerce Act (ESIGN Act, 2000) and the Uniform Electronic Transactions Act (UETA) establish that electronic signatures have the same legal standing as handwritten signatures for most transactions. All 50 states recognize e-signatures.',
  },
  {
    region: 'European Union',
    law: 'eIDAS Regulation',
    status: 'Fully Legal',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'The Electronic Identification, Authentication and Trust Services (eIDAS) regulation provides a comprehensive legal framework across all EU member states. It defines three levels: Simple Electronic Signatures, Advanced Electronic Signatures, and Qualified Electronic Signatures, each with increasing legal weight.',
  },
  {
    region: 'United Kingdom',
    law: 'Electronic Communications Act 2000',
    status: 'Fully Legal',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'The UK recognizes electronic signatures under the Electronic Communications Act 2000 and retained EU law (UK eIDAS). Post-Brexit, the UK maintains its own version of eIDAS. E-signatures are legally binding for most business and personal transactions.',
  },
  {
    region: 'Canada',
    law: 'PIPEDA & Provincial Laws',
    status: 'Fully Legal',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'Canada recognizes electronic signatures under federal law (PIPEDA, Personal Information Protection and Electronic Documents Act) and various provincial electronic commerce acts. Each province has its own legislation, but all broadly accept e-signatures.',
  },
  {
    region: 'Australia',
    law: 'Electronic Transactions Act 1999',
    status: 'Fully Legal',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'The Electronic Transactions Act 1999 (Cth) and corresponding state and territory legislation establish the legal validity of electronic signatures in Australia. E-signatures are accepted for most commercial and government transactions.',
  },
  {
    region: 'India',
    law: 'IT Act 2000',
    status: 'Legally Recognized',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'The Information Technology Act 2000 recognizes electronic signatures (called digital signatures in the Act) as legally valid. The IT Amendment Act 2008 broadened the definition to include various forms of electronic authentication. Aadhaar-based e-signatures are also recognized.',
  },
  {
    region: 'Singapore',
    law: 'Electronic Transactions Act',
    status: 'Fully Legal',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'Singapore&apos;s Electronic Transactions Act recognizes e-signatures as legally binding. The country has a technology-neutral approach, meaning any form of electronic signature is accepted unless a specific law requires otherwise.',
  },
  {
    region: 'Brazil',
    law: 'MP 2.200-2/2001',
    status: 'Legally Recognized',
    statusColor: 'text-green-600 bg-green-50',
    details:
      'Brazil recognizes electronic signatures under Medida Provisoria 2.200-2/2001, which established the Brazilian Public Key Infrastructure (ICP-Brasil). Both ICP-Brasil certified digital signatures and other forms of e-signatures are accepted, with certified signatures carrying higher legal weight.',
  },
]

const canBeESigned = [
  'Business contracts and agreements',
  'Employment offers and HR documents',
  'Non-disclosure agreements (NDAs)',
  'Sales contracts and purchase orders',
  'Lease and rental agreements',
  'Insurance policies and claims',
  'Banking and financial documents',
  'Vendor and supplier agreements',
  'Consent forms and waivers',
  'Invoices and purchase approvals',
]

const exceptions = [
  { title: 'Wills and Testaments', desc: 'Most jurisdictions require handwritten or witnessed signatures for wills and codicils.' },
  { title: 'Notarized Documents', desc: 'Documents requiring notarization often need in-person or remote online notarization (RON) procedures.' },
  { title: 'Court Orders', desc: 'Certain court documents and orders may require wet ink signatures or specific digital certificate-based signatures.' },
  { title: 'Powers of Attorney', desc: 'Some jurisdictions require wet-ink signatures or specific formalities for powers of attorney.' },
  { title: 'Real Property Deeds', desc: 'Property transfer deeds in some jurisdictions still require notarized wet-ink signatures.' },
  { title: 'Family Law Documents', desc: 'Adoption papers, divorce decrees, and certain family law documents may have specific signature requirements.' },
]

const faqs = [
  {
    q: 'Are e-signatures legally binding?',
    a: 'Yes, in the vast majority of countries and for most types of documents. The United States (ESIGN Act), European Union (eIDAS), United Kingdom, Canada, Australia, India, and over 60 other countries have laws that recognize electronic signatures as legally equivalent to handwritten signatures. There are some exceptions for specific document types like wills and notarized documents.',
  },
  {
    q: 'Is my eSignTap signature legally valid?',
    a: 'Yes. eSignTap signatures comply with the ESIGN Act (US), UETA, and eIDAS regulation (EU). Every signature includes a comprehensive audit trail with timestamps, IP addresses, email verification, and a certificate of completion. These elements provide the legal evidence needed to demonstrate signer identity and intent.',
  },
  {
    q: 'What makes an e-signature legally binding?',
    a: 'For an e-signature to be legally binding, it generally must demonstrate: (1) intent to sign by the signer, (2) consent to do business electronically, (3) association of the signature with the specific document, (4) attribution to a specific person, and (5) retention of a complete record. eSignTap satisfies all these requirements automatically.',
  },
  {
    q: 'What is the difference between e-signatures and digital signatures?',
    a: 'An electronic signature (e-signature) is a broad term for any electronic indication of intent to agree, including typed names, drawn signatures, and click-to-sign buttons. A digital signature is a specific type of e-signature that uses cryptographic technology (PKI) to verify authenticity. Digital signatures offer a higher level of security but both are legally valid in most jurisdictions.',
  },
  {
    q: 'Can e-signatures be used for international contracts?',
    a: 'Yes. E-signatures are recognized in over 60 countries worldwide. For international contracts, it is important to consider the laws of all jurisdictions involved. In most cases, a standard electronic signature with a proper audit trail (like eSignTap provides) is sufficient. For high-value or regulated transactions, you may want to use advanced or qualified electronic signatures.',
  },
  {
    q: 'What documents cannot be e-signed?',
    a: 'While most documents can be e-signed, common exceptions include wills and testaments, certain court orders, documents requiring notarization (in some jurisdictions), some real estate deeds, adoption papers, and specific government filings. These exceptions vary by jurisdiction, so check your local laws or consult an attorney for specific guidance.',
  },
  {
    q: 'Do e-signatures hold up in court?',
    a: 'Yes. E-signatures with proper audit trails have been upheld in courts worldwide. The key is having comprehensive evidence of signer identity and intent. eSignTap provides detailed audit trails including timestamps, IP addresses, email verification, browser information, and certificates of completion that serve as strong legal evidence.',
  },
  {
    q: 'What is the eIDAS regulation?',
    a: 'eIDAS (Electronic Identification, Authentication and Trust Services) is an EU regulation that provides a legal framework for electronic signatures across all EU member states. It defines three levels: Simple Electronic Signatures (SES), Advanced Electronic Signatures (AES), and Qualified Electronic Signatures (QES). Each level offers increasing legal certainty, with QES having the highest legal standing equivalent to a handwritten signature.',
  },
]

export default function EsignatureLegalityCheckerPage() {
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
        name: 'E-Signature Legality Checker',
        item: 'https://esigntap.com/tools/esignature-legality-checker',
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
            Comprehensive Legal Guide &mdash; Updated 2025
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            E-Signature Legality Checker
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Check if electronic signatures are legally valid in your country and for your specific use case.
            Understand e-signature laws across the US, EU, UK, Canada, Australia, India, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Signing Legally <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">eSignTap is ESIGN Act and eIDAS compliant</p>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Introduction */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Are E-Signatures Legally Binding?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p>
              Yes. Electronic signatures are legally binding in the United States, European Union, United Kingdom,
              Canada, Australia, India, and over 60 other countries around the world. Major legislation like the
              ESIGN Act (US), UETA (US state-level), and eIDAS regulation (EU) explicitly grants electronic
              signatures the same legal standing as traditional handwritten signatures for most types of documents
              and transactions.
            </p>
            <p>
              The legal validity of an e-signature depends on several factors: the signer&apos;s intent to sign,
              consent to use electronic means, proper attribution to a specific individual, and retention of a
              complete audit trail. When you use eSignTap, all of these requirements are automatically satisfied
              through our built-in verification, timestamping, and audit trail features.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table by Region */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            E-Signature Laws by Country
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            A comprehensive overview of e-signature legislation and legal status across major regions.
          </p>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Country / Region</th>
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Governing Law</th>
                  <th className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.region}</td>
                    <td className="px-6 py-4 text-gray-600">{row.law}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${row.statusColor}`}>
                        <CheckCircle className="w-4 h-4" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {regions.map((row, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{row.region}</h3>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${row.statusColor}`}>
                    <CheckCircle className="w-3 h-3" />
                    {row.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2"><strong>Law:</strong> {row.law}</p>
                <p className="text-sm text-gray-600">{row.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Region Breakdown */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Detailed Legal Framework by Region
          </h2>
          <div className="space-y-8">
            {regions.map((row, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{row.region}</h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${row.statusColor}`}>
                        {row.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-purple-600 mb-2">{row.law}</p>
                    <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: row.details }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents That Can Be E-Signed */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Can Be E-Signed */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Documents You Can E-Sign
                </h2>
              </div>
              <div className="space-y-3">
                {canBeESigned.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exceptions */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  Common Exceptions
                </h2>
              </div>
              <div className="space-y-3">
                {exceptions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <XCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-900 font-semibold">{item.title}</span>
                      <p className="text-gray-500 text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes an E-Signature Legal */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            What Makes an E-Signature Legally Binding?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Intent to Sign',
                desc: 'The signer must clearly demonstrate intent to agree to the document content. eSignTap captures explicit consent through click-to-sign and draw-to-sign actions.',
                icon: PenToolIcon,
              },
              {
                title: 'Consent to Electronic Process',
                desc: 'All parties must agree to conduct business electronically. eSignTap records consent as part of the signing flow.',
                icon: CheckCircle,
              },
              {
                title: 'Signer Attribution',
                desc: 'The signature must be attributable to a specific person. eSignTap verifies identity through email, IP address, and optional additional authentication.',
                icon: Shield,
              },
              {
                title: 'Record Retention',
                desc: 'A complete, tamper-evident record of the signed document must be maintained. eSignTap stores signed documents with full audit trails and certificates of completion.',
                icon: FileText,
              },
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <Info className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>Disclaimer:</strong> This page provides general information about e-signature laws and
            is not legal advice. Laws and regulations vary by jurisdiction and change over time. For specific
            legal questions about e-signature validity in your situation, please consult a qualified attorney
            in your jurisdiction.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Sign Documents with Confidence
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              eSignTap provides ESIGN Act and eIDAS-compliant e-signatures with comprehensive audit trails.
              Sign legally binding documents from any device, anywhere in the world.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 mt-4 text-sm">No credit card required. ESIGN Act and eIDAS compliant.</p>
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
            Related Guides and Resources
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link
              href="/guides/legally-binding"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Scale className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Legally Binding Guide</h3>
              <p className="text-sm text-gray-500">What makes e-signatures legally binding</p>
            </Link>
            <Link
              href="/guides/esign-act"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">ESIGN Act Guide</h3>
              <p className="text-sm text-gray-500">Understanding the US ESIGN Act</p>
            </Link>
            <Link
              href="/guides/eidas"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Globe className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">eIDAS Guide</h3>
              <p className="text-sm text-gray-500">EU e-signature regulation explained</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            E-Signatures Are Legal. Start Using Them.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of businesses that use eSignTap for legally binding, compliant electronic signatures.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/guides/legally-binding"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Read Legality Guide
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

function PenToolIcon(props) {
  return <Scale {...props} />
}
