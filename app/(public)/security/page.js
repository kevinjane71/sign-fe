import Link from 'next/link'
import {
  ArrowRight,
  Lock,
  Shield,
  FileCheck,
  Server,
  KeyRound,
  BadgeCheck,
  ShieldCheck,
  Eye,
  Database,
} from 'lucide-react'
import TrustBadges from '../../components/TrustBadges'

export const metadata = {
  title: 'Security | eSignTap - Enterprise-Grade Protection',
  description:
    'eSignTap protects your documents with 256-bit AES encryption, SOC 2 compliance, full audit trails, and enterprise-grade security. Compliant with ESIGN Act, UETA, and eIDAS.',
  keywords:
    'e-signature security, document encryption, ESIGN Act compliant, UETA, eIDAS, SOC 2, audit trail, secure e-signatures, 256-bit AES encryption',
  alternates: { canonical: 'https://esigntap.com/security' },
  openGraph: {
    title: 'Security | eSignTap - Enterprise-Grade Protection',
    description:
      'Learn how eSignTap protects your documents with enterprise-grade encryption and compliance.',
    url: 'https://esigntap.com/security',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const securityFeatures = [
  {
    icon: Lock,
    title: '256-bit AES Encryption',
    desc: 'All documents are encrypted at rest and in transit using 256-bit AES encryption — the same standard used by banks and government agencies.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Shield,
    title: 'Legal Compliance',
    desc: 'eSignTap signatures are legally binding under the ESIGN Act (US), UETA (US), and eIDAS (EU). Your signed documents hold up in court.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: FileCheck,
    title: 'Tamper-Proof Audit Trails',
    desc: 'Every document includes a detailed audit trail with timestamps, IP addresses, device info, and signer authentication — creating an immutable record.',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: Server,
    title: 'Secure Data Centers',
    desc: 'Your data is stored in SOC 2 Type II certified data centers with 99.99% uptime, redundant backups, and multi-region failover.',
    color: 'from-slate-400 to-slate-600',
  },
  {
    icon: KeyRound,
    title: 'Access Controls',
    desc: 'Role-based access controls let you define who can view, edit, and send documents. Protect sensitive documents with granular permissions.',
    color: 'from-amber-400 to-amber-600',
  },
  {
    icon: BadgeCheck,
    title: 'SOC 2 Compliance',
    desc: 'eSignTap infrastructure follows SOC 2 security principles to ensure your data is handled with the highest standards of security and availability.',
    color: 'from-teal-400 to-teal-600',
  },
]

const faqs = [
  {
    q: 'Are eSignTap signatures legally binding?',
    a: 'Yes. eSignTap electronic signatures are fully legally binding and enforceable under the ESIGN Act (United States), UETA (state-level US), and eIDAS (European Union). Every signed document includes a comprehensive audit trail that serves as proof of signing.',
  },
  {
    q: 'How is my data encrypted?',
    a: 'All documents are encrypted using 256-bit AES encryption at rest. Data in transit is protected with TLS 1.2+ encryption. Encryption keys are managed securely and rotated regularly.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Your data is stored in SOC 2 Type II certified data centers with redundant backups. We maintain strict data isolation between accounts to ensure your documents are always private.',
  },
  {
    q: 'Can I control who accesses my documents?',
    a: 'Absolutely. eSignTap provides role-based access controls, allowing you to assign viewer, editor, and admin roles to team members. You can also set document-level permissions for additional security.',
  },
  {
    q: 'What happens to my documents after they are signed?',
    a: 'Signed documents are securely stored in your eSignTap account with full encryption. You can download them at any time. Documents are never shared with third parties or used for any purpose other than your signing workflow.',
  },
  {
    q: 'Does eSignTap comply with HIPAA?',
    a: 'eSignTap follows security best practices that align with HIPAA requirements. For businesses with specific HIPAA compliance needs, please contact our team to discuss your requirements.',
  },
]

export default function SecurityPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Security' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Security</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Enterprise-Grade{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Security
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Your documents deserve the highest level of protection. eSignTap uses bank-level encryption and rigorous compliance standards to keep your data safe.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Lock className="w-4 h-4" /> 256-bit AES
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield className="w-4 h-4" /> ESIGN & eIDAS
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Eye className="w-4 h-4" /> Full Audit Trail
            </span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Database className="w-4 h-4" /> SOC 2 Data Centers
            </span>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* Security Features */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4">
            How We Protect Your Documents
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            Multiple layers of security ensure your documents and data are always protected.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Callout */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Compliance & Legal Standards
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-extrabold text-blue-600">US</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">ESIGN Act</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Electronic Signatures in Global and National Commerce Act ensures electronic signatures are legally valid across all 50 US states.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-extrabold text-purple-600">US</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">UETA</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The Uniform Electronic Transactions Act provides additional state-level legal validity for electronic signatures and records.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-extrabold text-emerald-600">EU</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">eIDAS</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The European regulation on electronic identification and trust services ensures cross-border legal validity across EU member states.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Security FAQ
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
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Your Documents Are Safe With Us
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Start signing with confidence. eSignTap provides enterprise-grade security at a fraction of the cost.
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
