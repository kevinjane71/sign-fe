import Link from 'next/link'
import { ArrowRight, FileText, Scale, Briefcase, Users, Home } from 'lucide-react'

export const metadata = {
  title: 'Free Document Templates | E-Sign Online | eSignTap',
  description: 'Browse free document templates for NDAs, leases, contracts, invoices, and more. Customize and e-sign with eSignTap in minutes.',
  keywords: 'free document templates, free NDA template, free lease template, free contract template, e-signature templates',
  alternates: { canonical: 'https://esigntap.com/templates' },
  openGraph: {
    title: 'Free Document Templates | eSignTap',
    description: 'Browse free document templates for NDAs, leases, contracts, invoices, and more.',
    url: 'https://esigntap.com/templates',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const templates = [
  { slug: 'nda', name: 'Non-Disclosure Agreement (NDA)', category: 'Legal', desc: 'Protect confidential information with a professionally drafted NDA template.' },
  { slug: 'lease-agreement', name: 'Lease Agreement', category: 'Property', desc: 'Standard residential lease agreement template for landlords and tenants.' },
  { slug: 'employment-contract', name: 'Employment Contract', category: 'HR', desc: 'Formalize hiring terms with a comprehensive employment contract template.' },
  { slug: 'invoice', name: 'Invoice', category: 'Business', desc: 'Professional invoice template for billing clients and tracking payments.' },
  { slug: 'offer-letter', name: 'Offer Letter', category: 'HR', desc: 'Extend job offers formally with a customizable offer letter template.' },
  { slug: 'statement-of-work', name: 'Statement of Work (SOW)', category: 'Business', desc: 'Define project scope, deliverables, and timelines clearly.' },
  { slug: 'waiver', name: 'Waiver & Release', category: 'Legal', desc: 'Liability waiver template for events, activities, and services.' },
  { slug: 'vendor-agreement', name: 'Vendor Agreement', category: 'Business', desc: 'Establish clear terms with suppliers and service providers.' },
  { slug: 'sales-contract', name: 'Sales Contract', category: 'Business', desc: 'Document the sale of goods or services with binding terms.' },
  { slug: 'rental-application', name: 'Rental Application', category: 'Property', desc: 'Screen prospective tenants with a thorough rental application form.' },
]

const categories = [
  { name: 'All', icon: FileText, color: 'purple' },
  { name: 'Legal', icon: Scale, color: 'amber' },
  { name: 'Business', icon: Briefcase, color: 'blue' },
  { name: 'HR', icon: Users, color: 'violet' },
  { name: 'Property', icon: Home, color: 'emerald' },
]

const categoryColorMap = {
  Legal: 'bg-amber-100 text-amber-700',
  Business: 'bg-blue-100 text-blue-700',
  HR: 'bg-violet-100 text-violet-700',
  Property: 'bg-emerald-100 text-emerald-700',
}

export default function TemplatesIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'Templates' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">Templates</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Free Document{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Templates
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Choose from professionally crafted templates, customize them to your needs, and send for e-signature with eSignTap. Free, fast, and legally binding.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Browse Templates Free <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Category Filters (visual only - server component) */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <span
                key={cat.name}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-full border border-gray-200 transition-colors"
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Template Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((tpl) => (
              <Link
                key={tpl.slug}
                href={`/templates/${tpl.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 hover:border-purple-300 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full ${categoryColorMap[tpl.category]}`}>
                    {tpl.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tpl.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{tpl.desc}</p>
                <span className="text-purple-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Use Template <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Need a Custom Template?
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Upload any PDF or Word document and turn it into a reusable e-signature template with eSignTap. No design skills needed.
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
