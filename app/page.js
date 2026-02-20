import { Upload, FileText, Shield, Users, Zap, Star, CheckCircle, ArrowRight, Lock, Clock, Globe, Building2, Briefcase, Scale, Heart, Store, Palette, PenTool, Eye, Bell, Smartphone, X, ChevronDown } from 'lucide-react'
import FileUploadSection from './components/FileUploadSection'
import FeedbackWidget from './components/FeedbackWidget'
import Link from 'next/link'

export const metadata = {
  title: 'eSignTap - #1 Affordable E-Signature Platform | Sign Documents Online',
  description: 'Sign documents online for free. The most affordable DocuSign alternative trusted by 500+ businesses. Save up to 70% on e-signatures. Try free tools - no signup required.',
  keywords: 'e-signature, electronic signature, sign documents online, DocuSign alternative, free PDF signing, digital signature, affordable e-signature, document signing software',
  alternates: {
    canonical: 'https://esigntap.com',
  },
}

export default function HomePage() {
  const faqData = [
    {
      question: 'What is eSignTap?',
      answer: 'eSignTap is the most affordable e-signature platform that lets you sign, send, and manage documents online. Built for businesses of all sizes, we offer all the core features you need at up to 70% less than competitors like DocuSign.',
    },
    {
      question: 'Is eSignTap legally binding?',
      answer: 'Yes! eSignTap signatures are fully legally binding and compliant with the ESIGN Act (US), UETA, and eIDAS (EU). Every signed document includes a complete audit trail with timestamps, IP addresses, and signer authentication.',
    },
    {
      question: 'How much does eSignTap cost?',
      answer: 'eSignTap starts at just $4.99/month, making it the most affordable e-signature solution on the market. We also offer a free tier so you can get started without any commitment or credit card.',
    },
    {
      question: 'Can I use eSignTap for real estate?',
      answer: 'Absolutely! eSignTap offers industry-specific features for real estate professionals, including templates for purchase agreements, lease contracts, and disclosure forms. Our platform is trusted by hundreds of real estate agencies.',
    },
    {
      question: 'How is eSignTap different from DocuSign?',
      answer: 'eSignTap offers the same core e-signature features as DocuSign at up to 70% lower cost. We focus on simplicity and affordability while providing bank-level security, multi-signer support, real-time tracking, and 24/7 customer support.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Your data is protected with 256-bit AES encryption, the same standard used by banks. We are SOC 2 compliant and follow strict data protection protocols. All documents are stored in secure, redundant data centers.',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full flex flex-col items-center justify-center pt-16 sm:pt-24 pb-16 sm:pb-24 px-4 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-blue-400 opacity-15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-20 right-0 w-64 sm:w-[400px] h-64 sm:h-[400px] bg-purple-500 opacity-15 rounded-full blur-3xl translate-x-1/3" />
        <div className="absolute bottom-0 left-1/3 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-pink-400 opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-300 opacity-10 rounded-full blur-2xl" />

        {/* Floating shapes */}
        <div className="absolute top-24 left-[10%] w-4 h-4 bg-blue-500 rounded-full opacity-40 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-40 right-[15%] w-6 h-6 bg-purple-500 rounded-lg opacity-30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-[20%] w-5 h-5 bg-pink-500 rounded-full opacity-30 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        <div className="absolute top-60 left-[5%] w-3 h-3 bg-yellow-400 rounded-sm opacity-40 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '1.5s' }} />
        <div className="absolute bottom-40 right-[10%] w-4 h-4 bg-emerald-400 rounded-full opacity-30 animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.8s' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Sign Documents in
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Minutes, Not Days
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
            The most affordable e-signature platform.{' '}
            <span className="text-purple-600 font-bold">Save up to 70%</span> compared to DocuSign.
          </p>

          {/* Upload Card */}
          <FileUploadSection />

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-500" />
              No credit card required
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-500" />
              Free to start
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-blue-500" />
              256-bit encryption
            </span>
          </div>
        </div>
      </section>

      {/* ===================== SOCIAL PROOF BAR ===================== */}
      <section className="w-full py-10 sm:py-14 bg-gray-50 overflow-hidden">
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Trusted by 500+ businesses worldwide
        </p>
        <div className="relative">
          <div className="flex animate-[marquee_20s_linear_infinite] gap-12 sm:gap-16 whitespace-nowrap">
            {['TechCorp', 'GlobalHR', 'LegalPro', 'HealthFirst', 'PropMax', 'TechCorp', 'GlobalHR', 'LegalPro', 'HealthFirst', 'PropMax'].map((name, i) => (
              <span key={i} className="text-2xl sm:text-3xl font-bold text-gray-300 select-none">
                {name}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="w-full py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Three simple steps to get your documents signed
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Connecting dashed line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-gray-300 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-extrabold mb-4 shadow-lg shadow-blue-500/30">
                1
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-all w-full">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Document</h3>
                <p className="text-gray-500 text-sm">Drag and drop your PDF, Word, or any document format. We handle the rest.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-extrabold mb-4 shadow-lg shadow-purple-500/30">
                2
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-all w-full">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Add Signers & Fields</h3>
                <p className="text-gray-500 text-sm">Place signature fields, add recipients, and customize your signing workflow.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center text-2xl font-extrabold mb-4 shadow-lg shadow-pink-500/30">
                3
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-100 hover:border-pink-300 transition-all w-full">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Get It Signed!</h3>
                <p className="text-gray-500 text-sm">Recipients sign from any device. Get notified instantly when it is done.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== INDUSTRY SOLUTIONS ===================== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Built for Every Industry
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Tailored solutions for the way you work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: 'Real Estate', desc: 'Close deals faster with streamlined contract signing for agents and brokers.', color: 'orange', bg: 'bg-orange-100', text: 'text-orange-600', border: 'hover:border-orange-300', href: '/solutions/real-estate' },
              { icon: Briefcase, title: 'HR & Recruiting', desc: 'Onboard new hires in minutes with digital offer letters and NDAs.', color: 'purple', bg: 'bg-purple-100', text: 'text-purple-600', border: 'hover:border-purple-300', href: '/solutions/hr' },
              { icon: Scale, title: 'Legal', desc: 'Legally binding signatures with full audit trails and compliance built in.', color: 'blue', bg: 'bg-blue-100', text: 'text-blue-600', border: 'hover:border-blue-300', href: '/solutions/legal' },
              { icon: Heart, title: 'Healthcare', desc: 'HIPAA-friendly document workflows for patient forms and consent documents.', color: 'pink', bg: 'bg-pink-100', text: 'text-pink-600', border: 'hover:border-pink-300', href: '/solutions/healthcare' },
              { icon: Store, title: 'Small Business', desc: 'Affordable plans built for growing businesses. No enterprise bloat.', color: 'emerald', bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'hover:border-emerald-300', href: '/solutions/small-business' },
              { icon: Palette, title: 'Freelancers', desc: 'Send contracts and invoices for signing in seconds. Look professional, stay lean.', color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'hover:border-yellow-300', href: '/solutions/freelancers' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`group bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-100 ${item.border} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${item.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
                  <span className={`${item.text} text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all`}>
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===================== FEATURE BENTO GRID ===================== */}
      <section className="w-full py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              Powerful features, beautifully simple
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large card - spans 2 cols */}
            <div className="sm:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border-2 border-transparent hover:border-blue-300 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                <PenTool className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Drag & Drop Editor</h3>
              <p className="text-gray-500 max-w-md">Intuitively place signature fields, text boxes, dates, and checkboxes anywhere on your document. No learning curve required.</p>
            </div>

            {/* Small card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-transparent hover:border-purple-300 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Multi-Signer Support</h3>
              <p className="text-gray-500 text-sm">Add unlimited signers with custom signing order and roles.</p>
            </div>

            {/* Small card */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border-2 border-transparent hover:border-emerald-300 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-500 text-sm">256-bit encryption protects every document you send and sign.</p>
            </div>

            {/* Small card */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border-2 border-transparent hover:border-orange-300 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Real-Time Tracking</h3>
              <p className="text-gray-500 text-sm">Know exactly when documents are viewed, opened, and signed.</p>
            </div>

            {/* Small card */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 border-2 border-transparent hover:border-pink-300 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20">
                <Bell className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Notifications</h3>
              <p className="text-gray-500 text-sm">Get notified via email the moment a signature is completed.</p>
            </div>

            {/* Large card - spans 2 cols */}
            <div className="sm:col-span-2 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl p-8 border-2 border-transparent hover:border-pink-300 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-pink-500/20">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Works on Any Device</h3>
              <p className="text-gray-500 max-w-md">Sign from your phone, tablet, or desktop. Our responsive design means a perfect experience everywhere, no app download needed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== COMPARISON SECTION ===================== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Why Teams Choose eSignTap
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto">
              See how we stack up against the competition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* eSignTap card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900">eSignTap</h3>
              </div>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">From $4.99/mo</p>
              <ul className="space-y-4">
                {[
                  'Up to 70% more affordable',
                  'Simple, intuitive interface',
                  'Unlimited multi-signer support',
                  '24/7 customer support',
                  'Setup in under 5 minutes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Others card */}
            <div className="bg-gray-100 rounded-3xl p-8 border-2 border-gray-200 relative overflow-hidden opacity-80">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-300" />
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gray-400 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-500">Others</h3>
              </div>
              <p className="text-3xl font-extrabold text-gray-400 mb-6">$25+/mo</p>
              <ul className="space-y-4">
                {[
                  'Premium pricing, hidden fees',
                  'Complex, steep learning curve',
                  'Limited signers on basic plans',
                  'Limited support hours',
                  'Long setup and onboarding',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-gray-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FREE TOOLS PROMO ===================== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
              Try Our Free Tools
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              No account needed. Start signing right away.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/tools/sign-pdf-free" className="group bg-white rounded-3xl p-8 shadow-2xl hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-200">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
                <PenTool className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sign PDF Free</h3>
              <p className="text-gray-500 mb-6">Sign any PDF online, no account needed. Quick, easy, and completely free.</p>
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm group-hover:gap-3 transition-all">
                Sign a PDF Now <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link href="/tools/esignature-generator" className="group bg-white rounded-3xl p-8 shadow-2xl hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-all duration-200">
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">E-Signature Generator</h3>
              <p className="text-gray-500 mb-6">Create your digital signature in seconds. Type, draw, or upload your signature.</p>
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold text-sm group-hover:gap-3 transition-all">
                Create Signature <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="w-full py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Loved by Teams Everywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'eSignTap made our contract process 10x faster! The interface is incredibly intuitive and the pricing is unbeatable.',
                name: 'Sarah Chen',
                title: 'Operations Manager',
                company: 'TechCorp',
                color: 'border-l-blue-500',
              },
              {
                quote: 'We switched from DocuSign and saved over $3,000 a year. Same features, way better price. Highly recommend.',
                name: 'Michael Torres',
                title: 'Head of Legal',
                company: 'GlobalHR',
                color: 'border-l-purple-500',
              },
              {
                quote: 'The multi-signer feature is a game changer for our real estate closings. Documents get signed in hours, not days.',
                name: 'Jessica Park',
                title: 'Senior Agent',
                company: 'PropMax Realty',
                color: 'border-l-pink-500',
              },
            ].map((t) => (
              <div key={t.name} className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 border-l-4 ${t.color}`}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent leading-none">&ldquo;</span>
                  {t.quote}
                </p>
                <div>
                  <p className="font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.title}, {t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ SECTION ===================== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-500">
              Got questions? We have answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => (
              <details key={faq.question} className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-gray-900 text-lg hover:bg-gray-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="w-full py-16 sm:py-24 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-white opacity-5 rounded-full" />
        <div className="absolute bottom-0 right-1/3 w-60 h-60 bg-white opacity-5 rounded-full" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Simplify Your Signing?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            Join 500+ businesses already saving time and money with eSignTap.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 font-bold text-lg rounded-full shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] hover:scale-105 transition-all duration-200"
          >
            Start Free Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <p className="mt-4 text-white/60 text-sm">No credit card required</p>
        </div>
      </section>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />

      {/* Feedback widget */}
      <FeedbackWidget />
    </div>
  )
}
