import Link from 'next/link'
import {
  Image,
  Upload,
  Download,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Layers,
  Sparkles,
  FileImage,
  Palette,
} from 'lucide-react'
import TrustBadges from '@/app/components/TrustBadges'

export const metadata = {
  title: 'Signature Background Remover | Free PNG',
  description:
    'Remove the background from your signature image and convert it to a transparent PNG. Free, fast, and private. No signup required.',
  keywords:
    'signature background remover, signature to transparent PNG, remove signature background, signature PNG converter, transparent signature image',
  alternates: { canonical: 'https://esigntap.com/tools/signature-to-png' },
  openGraph: {
    title: 'Signature Background Remover | Free PNG',
    description:
      'Convert your signature image to a transparent PNG for free. Remove backgrounds instantly.',
    url: 'https://esigntap.com/tools/signature-to-png',
    siteName: 'eSignTap',
    type: 'website',
  },
}

const steps = [
  {
    number: 1,
    title: 'Upload Your Signature',
    description:
      'Upload a photo or scan of your handwritten signature. We support JPEG, PNG, BMP, and TIFF formats. Take a photo with your phone or use a scanned image.',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    number: 2,
    title: 'Remove the Background',
    description:
      'Our tool automatically detects and removes the background from your signature image, leaving only your signature strokes on a transparent canvas. Fine-tune the results if needed.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    number: 3,
    title: 'Download Transparent PNG',
    description:
      'Download your signature as a high-quality transparent PNG file. Use it in documents, presentations, emails, letterheads, or anywhere you need a clean digital signature.',
    gradient: 'from-pink-500 to-red-500',
  },
]

const benefits = [
  {
    icon: Layers,
    title: 'Transparent Background',
    description:
      'Get a signature image with a fully transparent background that overlays cleanly on any document, regardless of the background color or design.',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    icon: Sparkles,
    title: 'Professional Quality',
    description:
      'Our background removal technology preserves the fine details of your handwriting, producing a clean, crisp signature that looks professional in any context.',
    gradient: 'from-purple-400 to-violet-600',
  },
  {
    icon: Zap,
    title: 'Instant Processing',
    description:
      'Background removal happens in seconds, not minutes. Upload your signature image and get a transparent PNG ready to download almost immediately.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure and Private',
    description:
      'Your signature images are processed securely. We take your privacy seriously because your signature is a sensitive piece of personal identification.',
    gradient: 'from-green-400 to-emerald-600',
  },
  {
    icon: FileImage,
    title: 'Multiple Input Formats',
    description:
      'Upload signatures in JPEG, PNG, BMP, or TIFF format. Take a photo with your phone, scan your signature, or upload an existing image file.',
    gradient: 'from-pink-400 to-rose-600',
  },
  {
    icon: Palette,
    title: 'Use Anywhere',
    description:
      'Your transparent PNG signature works in Word documents, PDFs, Google Docs, presentations, email signatures, letterheads, contracts, and more.',
    gradient: 'from-teal-400 to-cyan-600',
  },
]

const useCases = [
  { title: 'Digital Documents', desc: 'Place your signature on PDFs, Word files, and other digital documents without white box artifacts.' },
  { title: 'Email Signatures', desc: 'Add a professional handwritten signature to your email footer that blends seamlessly with any background.' },
  { title: 'Letterheads', desc: 'Overlay your signature on company letterheads and branded stationery for a personal touch.' },
  { title: 'Presentations', desc: 'Add your signature to slides, proposals, and pitch decks for a professional, personal feel.' },
  { title: 'Contracts and Agreements', desc: 'Place your signature image on contracts before sending for formal approval.' },
  { title: 'Certificates and Awards', desc: 'Add your signature to certificates, diplomas, and award documents you issue.' },
]

const faqs = [
  {
    q: 'Is this signature background remover free?',
    a: 'Yes, completely free. You can upload your signature image, remove the background, and download the transparent PNG without any charge. No watermarks, no trial limitations, and no credit card required.',
  },
  {
    q: 'What image formats are supported for upload?',
    a: 'You can upload signature images in JPEG, PNG, BMP, and TIFF formats. For best results, use a clear, high-contrast image of your signature on a white or light background. Phone photos work great as long as the lighting is even.',
  },
  {
    q: 'How does the background removal work?',
    a: 'Our tool analyzes the image to distinguish your signature strokes from the background. It identifies the ink marks based on contrast and color differences, then removes the background pixels while preserving the signature details, producing a clean transparent PNG.',
  },
  {
    q: 'Is my signature image kept private?',
    a: 'Yes, your privacy is our top priority. Signature images are processed securely and are not stored, shared, or used for any other purpose. Your signature is sensitive personal information, and we treat it accordingly.',
  },
  {
    q: 'Can I use the PNG signature in Word or Google Docs?',
    a: 'Absolutely. The transparent PNG file can be inserted into Microsoft Word, Google Docs, PowerPoint, Keynote, and virtually any application that supports image insertion. The transparent background ensures your signature overlays cleanly without a visible bounding box.',
  },
  {
    q: 'What if my signature has a colored background?',
    a: 'Our tool works best with signatures on white or light-colored backgrounds. If your signature is on a colored background, the tool will attempt to remove it, but results may vary. For the best outcome, photograph or scan your signature on plain white paper with even lighting.',
  },
]

export default function SignatureToPngPage() {
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
        name: 'Signature to PNG',
        item: 'https://esigntap.com/tools/signature-to-png',
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
            Signature Background Remover
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Convert your handwritten signature into a clean, transparent PNG image. Remove the background
            from any signature photo or scan in seconds. Use it on documents, emails, and presentations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Remove Background Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/60">No credit card required</p>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* What Is This Tool */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            What Is a Signature Background Remover?
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p>
              A signature background remover is a tool that takes an image of your handwritten signature
              &mdash; whether from a photo or a scan &mdash; and removes the paper background, leaving only
              the signature strokes on a transparent canvas. The result is a PNG file with an alpha channel
              (transparency) that you can place on top of any document without a visible white box around
              your signature.
            </p>
            <p>
              This is essential for professionals who want to add a personal, handwritten signature to
              digital documents. Without background removal, inserting a signature image creates an
              unsightly white rectangle that covers the document content underneath. A transparent PNG
              solves this problem by letting the document show through everywhere except where the actual
              signature ink appears.
            </p>
            <p>
              eSignTap&apos;s signature background remover uses intelligent contrast detection to accurately
              separate your signature from the background. The tool preserves the fine details, pressure
              variations, and natural character of your handwriting while producing a clean, professional result.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">
            How to Convert Your Signature to PNG
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
            Why Use eSignTap&apos;s Signature Background Remover?
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
            Where to Use Your Transparent Signature
          </h2>
          <p className="text-center text-gray-500 mb-12 text-lg max-w-2xl mx-auto">
            A transparent PNG signature is versatile and works across many professional contexts.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {useCases.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
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

      {/* Tips for Best Results */}
      <section className="py-16 sm:py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8">
            Tips for the Best Results
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-10 border border-blue-100">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Use white paper:</strong> Sign on plain white paper for the cleanest background removal.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Even lighting:</strong> Take photos in well-lit conditions without shadows across the paper.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Dark ink:</strong> Use a black or dark blue pen for maximum contrast with the paper background.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Steady hand:</strong> Keep your phone or scanner steady to avoid blurring the signature details.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span><strong>Crop tightly:</strong> Crop the image close to your signature before uploading for the best results.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Need More Than a Signature Image?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
              Create a free eSignTap account to draw or type your e-signature, sign documents online,
              send for e-signature, and maintain legally binding audit trails.
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
            Related Tools
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link
              href="/tools/esignature-generator"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <Image className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">E-Signature Generator</h3>
              <p className="text-sm text-gray-500">Draw or type your electronic signature</p>
            </Link>
            <Link
              href="/tools/sign-pdf-free"
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <FileImage className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-gray-900 mb-1">Sign PDF Free</h3>
              <p className="text-sm text-gray-500">Sign any PDF document online for free</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Get Your Transparent Signature Today
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            Upload your signature image, remove the background, and download a professional transparent PNG in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/tools/esignature-generator"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-bold text-lg px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Create E-Signature Instead
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
