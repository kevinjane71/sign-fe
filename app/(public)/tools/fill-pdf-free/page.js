import Link from 'next/link'
import {
  FileText,
  Upload,
  Edit3,
  Download,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Smartphone,
  Clock,
  Lock,
} from 'lucide-react'
import TrustBadges from '@/app/components/TrustBadges'

export const metadata = {
  title: 'Fill PDF Forms Online Free | eSignTap',
  description:
    'Fill out any PDF form online for free. No software to install. Upload your PDF, fill in the fields, and download instantly.',
  keywords:
    'fill PDF form online free, free PDF form filler, fill out PDF online, edit PDF form free, PDF form editor online',
  alternates: { canonical: 'https://esigntap.com/tools/fill-pdf-free' },
  openGraph: {
    title: 'Fill PDF Forms Online Free | eSignTap',
    description:
      'Fill out any PDF form online for free. Upload, fill fields, and download instantly.',
    url: 'https://esigntap.com/tools/fill-pdf-free',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const steps = [
  {
    number: 1,
    title: 'Upload Your PDF',
    description:
      'Drag and drop your PDF form or click to browse. We support all standard PDF forms including tax forms, applications, contracts, and registration documents.',
    icon: Upload,
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    number: 2,
    title: 'Fill In the Fields',
    description:
      'Click on any field to start typing. Fill in text fields, check boxes, select radio buttons, and add dates. Our smart detection highlights all fillable areas automatically.',
    icon: Edit3,
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    number: 3,
    title: 'Download Your PDF',
    description:
      'Once you have completed the form, download the filled PDF to your device. Your completed document is ready to print, email, or submit.',
    icon: Download,
    gradient: 'from-pink-500 to-red-500',
  },
]

const benefits = [
  {
    icon: Zap,
    title: 'No Software Required',
    description:
      'Fill PDF forms directly in your browser. No need to download Adobe Acrobat, Foxit Reader, or any desktop application.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure and Private',
    description:
      'Your documents are processed securely with 256-bit encryption. We respect your privacy and protect every file you upload.',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    icon: Globe,
    title: 'Works on Any Device',
    description:
      'Fill PDF forms on your computer, tablet, or phone. Our responsive interface adapts to any screen size for a seamless experience.',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    icon: Clock,
    title: 'Save Hours of Time',
    description:
      'Stop printing, hand-filling, and scanning forms. Complete the entire process digitally in minutes instead of hours.',
    gradient: 'from-purple-400 to-violet-600',
  },
  {
    icon: Smartphone,
    title: 'Mobile-Friendly',
    description:
      'Need to fill a form on the go? Our mobile-optimized editor makes it easy to complete PDF forms right from your phone.',
    gradient: 'from-pink-400 to-rose-600',
  },
  {
    icon: Lock,
    title: 'Free with No Hidden Costs',
    description:
      'Fill unlimited PDF forms without any subscription or hidden fees. No watermarks, no trial periods, no credit card required.',
    gradient: 'from-teal-400 to-cyan-600',
  },
]

const faqs = [
  {
    q: 'Is this PDF form filler really free?',
    a: 'Yes, completely free. You can upload, fill, and download PDF forms without any charge. There are no hidden fees, no watermarks, and no trial limitations. For advanced features like e-signatures and multi-party workflows, you can upgrade to a free eSignTap account.',
  },
  {
    q: 'Is my data secure when I fill PDF forms online?',
    a: 'Absolutely. We use 256-bit AES encryption to protect your documents during upload and processing. Your privacy is our priority, and we follow strict data protection practices to keep your information safe.',
  },
  {
    q: 'What types of PDF forms can I fill?',
    a: 'You can fill virtually any PDF form including tax forms (W-9, W-4, 1099), government applications, employment forms, medical intake forms, rental applications, school enrollment forms, and any other standard PDF with fillable fields.',
  },
  {
    q: 'What is the maximum file size?',
    a: 'You can upload PDF files up to 10MB in size. This covers the vast majority of standard forms and documents. If you need to work with larger files, create a free eSignTap account for extended file size limits.',
  },
  {
    q: 'Can I fill a PDF form on my phone?',
    a: 'Yes. Our PDF form filler is fully responsive and works on smartphones and tablets. You can upload, fill, and download forms from any mobile device with a modern web browser.',
  },
  {
    q: 'Can I also sign the PDF after filling it?',
    a: 'Yes. After filling your PDF form, you can add your electronic signature using eSignTap. Try our free Sign PDF tool or create a free account for the full e-signature experience with legally binding audit trails.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No account is needed to fill PDF forms. Just open the page, upload your PDF, fill in the fields, and download. If you need advanced features like templates, team management, or sending documents for signature, a free eSignTap account unlocks those capabilities.',
  },
  {
    q: 'What file formats are supported?',
    a: 'This tool supports standard PDF files (.pdf). If you need to fill forms in other formats like Word (DOCX) or Excel (XLSX), create a free eSignTap account to access our full document platform that supports multiple file types.',
  },
]

export default function FillPdfFreePage() {
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
        name: 'Fill PDF Free',
        item: 'https://esigntap.com/tools/fill-pdf-free',
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
            100% Free &mdash; No Signup Required
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Fill PDF Forms Online Free
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Upload any PDF form, fill in the fields, and download your completed document instantly.
            No software to install, no account needed. Works on any device.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Start Filling PDFs <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">No credit card required</p>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* What Is Section */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            What Is a PDF Form Filler?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p>
              A PDF form filler is an online tool that lets you type directly into the fields of a PDF document.
              Instead of printing out a form, filling it in by hand, and scanning it back to your computer, you
              can complete the entire process digitally in your browser. This saves time, reduces errors, and
              produces a professional-looking result every time.
            </p>
            <p>
              eSignTap&apos;s free PDF form filler detects fillable fields automatically and lets you tab through
              them quickly. Whether you are completing a tax form, a job application, a medical intake form, or
              a government document, our tool makes the process fast and painless. Once you have filled in your
              form, you can download it immediately or add an electronic signature before sending it off.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            How to Fill a PDF Form Online
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg">Three simple steps. No software to install.</p>
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

      {/* Benefits */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Why Use eSignTap&apos;s Free PDF Form Filler?
          </h2>
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

      {/* Use Cases */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            PDF Forms You Can Fill Online
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            Our tool works with virtually any PDF form. Here are some of the most popular use cases.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Tax Forms', desc: 'W-9, W-4, 1099, and other IRS forms' },
              { title: 'Job Applications', desc: 'Employment forms and onboarding paperwork' },
              { title: 'Government Forms', desc: 'Permits, licenses, and official applications' },
              { title: 'Medical Forms', desc: 'Patient intake, consent forms, and HIPAA documents' },
              { title: 'Rental Applications', desc: 'Lease agreements and tenant applications' },
              { title: 'School Forms', desc: 'Enrollment, permission slips, and registration' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
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
              Need to Sign After Filling?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Create a free eSignTap account to fill PDF forms, add legally binding e-signatures,
              send documents for others to sign, and track everything with a complete audit trail.
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

      {/* Related Tools */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">
            Related Tools and Resources
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Link
              href="/tools/sign-pdf-free"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Sign PDF Free</h3>
              <p className="text-sm text-gray-500">Sign any PDF document online for free</p>
            </Link>
            <Link
              href="/tools/esignature-generator"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Edit3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">E-Signature Generator</h3>
              <p className="text-sm text-gray-500">Create your electronic signature</p>
            </Link>
            <Link
              href="/guides/how-to-sign-pdf"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">How to Sign a PDF</h3>
              <p className="text-sm text-gray-500">Step-by-step guide to PDF signing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Fill Your PDF Form?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Start filling PDF forms for free today, or create an account for the complete document management experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/tools/sign-pdf-free"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Sign a PDF Instead
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
