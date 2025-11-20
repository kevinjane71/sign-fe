import { Upload, FileText, Shield, Users, Zap, Star, CheckCircle, ArrowRight, Lock, Clock, Globe } from 'lucide-react'
import FileUploadSection from './components/FileUploadSection'
import FeedbackWidget from './components/FeedbackWidget'
import Link from 'next/link'

export const metadata = {
  title: 'eSignTap - Most Affordable DocuSign Alternative | Professional Document Signing',
  description: 'The most affordable DocuSign alternative for professional document signing. Create, share, and sign documents with ease. Save up to 40% compared to DocuSign with our competitive pricing.',
  keywords: 'DocuSign alternative, affordable document signing, electronic signature, digital signature, document signing software, e-signature, professional document signing, cost-effective DocuSign alternative',
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center pt-12 sm:pt-20 pb-8 sm:pb-12 px-4 relative overflow-hidden bg-white">
        {/* Decorative shapes - solid colors only */}
        <div className="absolute -top-32 -left-32 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-100 opacity-20 rounded-full blur-3xl z-0" />
        <div className="absolute -bottom-40 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-teal-100 opacity-15 rounded-full blur-3xl z-0" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-5 py-2.5 rounded-full text-sm font-semibold mb-6 shadow-sm border border-emerald-200">
            Save up to 40% compared to DocuSign
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Professional Document Signing
            <span className="block text-emerald-600 mt-2">
              Made Simple & Affordable
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
            Get all the features you need for professional document signing at a fraction of the cost. Fast, secure, and trusted by businesses worldwide.
          </p>

          {/* Upload Card */}
          <FileUploadSection />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-emerald-300">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4 shadow-lg">
            <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <span className="text-emerald-700 font-bold text-lg sm:text-xl mb-2">Lightning Fast</span>
          <span className="text-sm text-gray-600 text-center">Upload, configure, and send in seconds.</span>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-teal-300">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-500 flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <span className="text-teal-700 font-bold text-lg sm:text-xl mb-2">Bank-Level Security</span>
          <span className="text-sm text-gray-600 text-center">Your documents are encrypted and safe.</span>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-cyan-300">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-500 flex items-center justify-center mb-4 shadow-lg">
            <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <span className="text-cyan-700 font-bold text-lg sm:text-xl mb-2">Multi-Signer</span>
          <span className="text-sm text-gray-600 text-center">Invite others and track every signature.</span>
        </div>
        
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-200 hover:border-emerald-300">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-400 flex items-center justify-center mb-4 shadow-lg">
            <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <span className="text-emerald-700 font-bold text-lg sm:text-xl mb-2">Affordable Pricing</span>
          <span className="text-sm text-gray-600 text-center">Save up to 40% vs. DocuSign.</span>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="w-full bg-gray-50 py-16 sm:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose eSignTap?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need for professional document signing, without the premium price tag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                eSignTap
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 40% more affordable</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">All essential features included</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Simple, intuitive interface</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 customer support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">No hidden fees or contracts</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                DocuSign
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-gray-700">Premium pricing</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-gray-700">Complex feature set</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-gray-700">Steep learning curve</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-gray-700">Limited support hours</span>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  </div>
                  <span className="text-gray-700">Long-term contracts required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Secure & Compliant</h3>
            <p className="text-gray-600">Bank-level encryption and compliance with industry standards.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Turnaround</h3>
            <p className="text-gray-600">Get documents signed in minutes, not days.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Works Everywhere</h3>
            <p className="text-gray-600">Access from any device, anywhere in the world.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-emerald-500 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg sm:text-xl mb-8 text-emerald-50 max-w-2xl mx-auto">
            Join thousands of businesses already using eSignTap for their document signing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl shadow-lg hover:bg-emerald-50 transition-all transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-lg sm:text-xl text-gray-800 font-semibold mb-2">
                "eSignTap made our contract process 10x faster! The interface is intuitive and the pricing is unbeatable."
              </p>
              <p className="text-sm text-gray-600">— Alex P., Operations Manager</p>
            </div>
          </div>
        </div>
      </section>
      {/* Feedback widget (fixed, only on home) */}
      <FeedbackWidget />
    </div>
  )
}
