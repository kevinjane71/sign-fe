import Link from 'next/link'
import {
  FileText,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Send,
  PenTool,
  Settings,
  Receipt,
  TrendingUp,
} from 'lucide-react'
import TrustBadges from '@/app/components/TrustBadges'

export const metadata = {
  title: 'Free Invoice Generator | eSignTap',
  description:
    'Create professional invoices for free and get them e-signed. Generate, customize, send, and track invoices with legally binding signatures.',
  keywords:
    'free invoice template, invoice generator free, create invoice online, professional invoice maker, e-sign invoice free',
  alternates: { canonical: 'https://esigntap.com/tools/invoice-generator' },
  openGraph: {
    title: 'Free Invoice Generator | eSignTap',
    description:
      'Create professional invoices for free and get them e-signed instantly.',
    url: 'https://esigntap.com/tools/invoice-generator',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const invoiceIncludes = [
  { title: 'Business Information', desc: 'Your company name, address, phone number, email, and logo for a professional look.' },
  { title: 'Client Details', desc: 'Your client or customer name, company, billing address, and contact information.' },
  { title: 'Invoice Number and Date', desc: 'A unique invoice number for tracking and the date the invoice was issued.' },
  { title: 'Line Items', desc: 'Detailed list of products or services, quantities, unit prices, and line totals.' },
  { title: 'Payment Terms', desc: 'Due date, accepted payment methods, late payment penalties, and early payment discounts.' },
  { title: 'Tax and Totals', desc: 'Subtotal, applicable taxes (sales tax, VAT, GST), discounts, and the final total amount due.' },
]

const benefits = [
  {
    icon: Clock,
    title: 'Get Paid Faster',
    description:
      'E-signed invoices get acknowledged and processed faster. Clients can approve and sign invoices from any device, reducing payment delays significantly.',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Legal Protection',
    description:
      'An e-signed invoice serves as a legally binding acknowledgment of the agreed-upon services and payment terms, providing stronger legal standing than unsigned invoices.',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    icon: TrendingUp,
    title: 'Professional Image',
    description:
      'Well-designed invoices with your branding and electronic signatures project professionalism and build trust with clients and partners.',
    gradient: 'from-purple-400 to-violet-600',
  },
  {
    icon: Zap,
    title: 'Reduce Disputes',
    description:
      'When clients e-sign invoices, they confirm the scope of work, amounts, and payment terms. This dramatically reduces billing disputes and misunderstandings.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Receipt,
    title: 'Complete Audit Trail',
    description:
      'Every e-signed invoice includes a detailed audit trail with timestamps, IP addresses, and a certificate of completion for your records and tax compliance.',
    gradient: 'from-pink-400 to-rose-600',
  },
  {
    icon: Send,
    title: 'Instant Delivery',
    description:
      'Send invoices to clients instantly via email. No printing, no postage, no waiting. Clients receive notifications and can sign from any device.',
    gradient: 'from-teal-400 to-cyan-600',
  },
]

const steps = [
  {
    number: 1,
    title: 'Create Your Invoice',
    description:
      'Use our invoice generator to fill in your business details, client information, line items, tax rates, and payment terms. Choose from professional templates or start from scratch.',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    number: 2,
    title: 'Add E-Signature Fields',
    description:
      'Place signature fields for yourself and your client. Add date fields, initials, and approval checkboxes to create a complete signed invoice workflow.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    number: 3,
    title: 'Send and Get Paid',
    description:
      'Send the invoice to your client for e-signature. They sign from any device, you get notified instantly, and the signed invoice is stored securely in your account.',
    gradient: 'from-pink-500 to-red-500',
  },
]

const faqs = [
  {
    q: 'Is the invoice generator free?',
    a: 'Yes. You can create and customize professional invoices completely free of charge. To send invoices for e-signature and access features like automated reminders, audit trails, and team management, create a free eSignTap account.',
  },
  {
    q: 'Why should I get invoices e-signed?',
    a: 'E-signed invoices provide legal proof that your client has acknowledged and agreed to the billed amounts and payment terms. This reduces disputes, speeds up payment, and gives you stronger legal standing in case of non-payment. It also creates a professional, streamlined billing process.',
  },
  {
    q: 'What information should I include on my invoice?',
    a: 'A professional invoice should include your business name and contact details, client information, a unique invoice number, invoice date, line items with descriptions and prices, subtotal, taxes, total amount due, payment terms, and due date. Our generator includes all these fields by default.',
  },
  {
    q: 'Can I add my company logo to the invoice?',
    a: 'Yes. Our invoice generator supports custom branding including your company logo, brand colors, and custom fields. Upload your logo when creating your invoice to maintain a consistent professional image across all your documents.',
  },
  {
    q: 'Is an e-signed invoice legally binding?',
    a: 'Yes. Electronic signatures on invoices are legally binding under the ESIGN Act (US), UETA, and eIDAS regulation (EU). eSignTap provides a complete audit trail including timestamps, IP addresses, and certificates of completion that serve as legal evidence of the agreement.',
  },
  {
    q: 'Can I set up recurring invoices?',
    a: 'With a free eSignTap account, you can save invoice templates and quickly generate recurring invoices for repeat clients. Set up your template once and reuse it for monthly, quarterly, or project-based billing cycles.',
  },
]

export default function InvoiceGeneratorPage() {
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
        name: 'Invoice Generator',
        item: 'https://esigntap.com/tools/invoice-generator',
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
            Free Invoice Templates &mdash; E-Sign Ready
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Free Invoice Generator
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Create professional invoices in minutes. Add your branding, customize line items, and send
            for e-signature to get paid faster. Free to get started.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create Your Invoice <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">No credit card required</p>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* What Should an Invoice Include */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            What Should an Invoice Include?
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            A complete, professional invoice includes all the information your client needs to process payment quickly and accurately.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {invoiceIncludes.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            How to Create and E-Sign an Invoice
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">Three simple steps to professional invoicing.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center text-white text-2xl font-extrabold mb-4 shadow-lg`}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits of E-Signed Invoices */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Benefits of E-Signed Invoices
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            Combine professional invoicing with e-signatures to streamline your billing and get paid faster.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Who Is This For?
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            Our invoice generator is built for anyone who sends invoices and wants to get paid on time.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Freelancers', desc: 'Bill clients professionally for your work' },
              { title: 'Small Businesses', desc: 'Streamline your accounts receivable' },
              { title: 'Consultants', desc: 'Invoice for hourly or project-based work' },
              { title: 'Agencies', desc: 'Manage invoicing across multiple clients' },
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Start Invoicing Professionally
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Create, send, and e-sign invoices with eSignTap. Get paid faster with professional
              invoicing and legally binding electronic signatures.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-white/60 mt-4 text-sm">No credit card required. Set up in 30 seconds.</p>
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
            Related Resources
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link
              href="/templates/invoice"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Receipt className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Invoice Templates</h3>
              <p className="text-sm text-gray-500">Browse ready-to-use invoice templates</p>
            </Link>
            <Link
              href="/use-cases/invoices"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Invoice E-Signing</h3>
              <p className="text-sm text-gray-500">Learn about e-signed invoice workflows</p>
            </Link>
            <Link
              href="/solutions/freelancers"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <PenTool className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">For Freelancers</h3>
              <p className="text-sm text-gray-500">E-signature solutions for freelancers</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Get Paid Faster?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Create professional invoices and get them signed electronically. Start free today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Create Invoice Now <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/use-cases/invoices"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Learn About E-Signed Invoices
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
