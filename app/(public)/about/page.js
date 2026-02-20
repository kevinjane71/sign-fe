import Link from 'next/link'
import {
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
  Users,
  FileText,
  Star,
  Globe,
  Rocket,
  Shield,
} from 'lucide-react'
import TrustBadges from '../../components/TrustBadges'

export const metadata = {
  title: 'About eSignTap | Our Mission',
  description:
    'eSignTap is on a mission to make e-signatures affordable and accessible for everyone. Learn about our story, values, and the team behind the platform.',
  keywords:
    'about eSignTap, e-signature company, eSignTap mission, eSignTap team, affordable e-signatures',
  alternates: { canonical: 'https://esigntap.com/about' },
  openGraph: {
    title: 'About eSignTap | Our Mission',
    description:
      'Learn about eSignTap and our mission to make e-signatures affordable and accessible for businesses of all sizes.',
    url: 'https://esigntap.com/about',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const stats = [
  { value: '500+', label: 'Businesses Trust Us', icon: Users },
  { value: '50,000+', label: 'Documents Signed', icon: FileText },
  { value: '4.8/5', label: 'Average Rating', icon: Star },
  { value: '30+', label: 'Countries Served', icon: Globe },
]

const values = [
  {
    icon: Target,
    title: 'Simplicity First',
    desc: 'We believe powerful software should be simple to use. Every feature is designed to be intuitive from day one, with no training required.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: Heart,
    title: 'Affordable for Everyone',
    desc: 'E-signatures should not be a luxury. We offer enterprise-grade features at prices that freelancers, startups, and small businesses can afford.',
    color: 'from-pink-400 to-pink-600',
  },
  {
    icon: Shield,
    title: 'Security Without Compromise',
    desc: 'We protect every document with bank-level encryption and compliance standards. Your trust is our most important product.',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    desc: 'We listen to our users and ship improvements every week. Our roadmap is driven by real customer feedback, not boardroom decisions.',
    color: 'from-amber-400 to-amber-600',
  },
  {
    icon: Rocket,
    title: 'Speed Matters',
    desc: 'Time is money. We built eSignTap to be blazing fast — from sign-up to sending your first document in under 2 minutes.',
    color: 'from-purple-400 to-purple-600',
  },
  {
    icon: Users,
    title: 'Customer Obsessed',
    desc: 'Every decision we make starts with the question: does this make our customers more successful? If not, we do not ship it.',
    color: 'from-teal-400 to-teal-600',
  },
]

export default function AboutPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://esigntap.com' },
      { '@type': 'ListItem', position: 2, name: 'About' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-gray-500">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
          <li><span className="mx-1">/</span></li>
          <li className="text-gray-900 font-medium">About</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Making E-Signatures{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Affordable & Accessible
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            We started eSignTap because we believed every business — no matter how small — deserves access to professional e-signature tools without the premium price tag.
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Stats */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
            <p>
              eSignTap was born from a simple frustration: why do e-signature tools cost so much? As small business owners ourselves, we spent hundreds of dollars a month on e-signature platforms that charged premium prices for features that should be standard.
            </p>
            <p>
              We knew there had to be a better way. So we built eSignTap — a platform that provides every essential e-signature feature at a fraction of the cost of established players. No feature gating, no hidden fees, no annual contracts.
            </p>
            <p>
              Today, eSignTap is trusted by over 500 businesses across 30+ countries. From freelancers sending a single contract to growing companies processing thousands of documents a month, our platform scales to meet your needs while keeping costs low.
            </p>
            <p>
              We are just getting started. Our mission is to make professional e-signatures accessible to every business on the planet — and we are building toward that goal every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 sm:p-16 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Our Mission
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              To make legally binding e-signatures affordable, accessible, and effortless for businesses of every size — empowering everyone to go paperless.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-900 mb-4">
            Our Values
          </h2>
          <p className="text-center text-gray-500 mb-14 text-lg max-w-2xl mx-auto">
            The principles that guide everything we build.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            The Team Behind eSignTap
          </h2>
          <p className="text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
            We are a small, passionate team of builders, designers, and problem-solvers dedicated to making document signing easier for everyone.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-extrabold text-white">VK</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Founder & CEO</h3>
              <p className="text-gray-500 text-sm">Product vision, strategy, and making sure we stay true to our mission.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-extrabold text-white">ENG</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Engineering</h3>
              <p className="text-gray-500 text-sm">Building a fast, secure, and reliable platform that our users love.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-extrabold text-white">CX</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Customer Success</h3>
              <p className="text-gray-500 text-sm">Ensuring every user gets the most out of eSignTap with responsive support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Join the eSignTap Community
            </h2>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Start signing documents for free and see why hundreds of businesses choose eSignTap.
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
