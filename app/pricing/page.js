'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Zap, Users, Shield, Star, ArrowRight, FileText, Clock, Headphones } from 'lucide-react'

export default function PricingPage() {
  const router = useRouter()
  const [isAnnual, setIsAnnual] = useState(true)

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out SignFlow",
      price: { monthly: 0, annual: 0 },
      features: [
        "🎁 ALL PRO FEATURES until July 30th!",
        "50 documents per month (limited time)",
        "Unlimited signers (limited time)",
        "All templates & forms (limited time)",
        "Priority email support (limited time)",
        "Custom branding (limited time)",
        "After July 30th: 3 docs/month",
        "Basic support (permanent)"
      ],
      limitations: [],
      buttonText: "Get Free Pro Access",
      buttonStyle: "bg-green-600 text-white hover:bg-green-700 border-2 border-green-600",
      popular: true
    },
    {
      name: "Pro",
      description: "Great for individuals & small teams",
      price: { monthly: 5, annual: 4 },
      features: [
        "50 documents per month",
        "Unlimited signers",
        "All templates & forms",
        "Advanced workflows",
        "Custom branding",
        "Priority email support",
        "1-year document storage",
        "Bulk sending",
        "Document analytics"
      ],
      buttonText: "Start Pro Plan",
      buttonStyle: "border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50",
      popular: false
    },
    {
      name: "Business",
      description: "Perfect for growing businesses",
      price: { monthly: 25, annual: 20 },
      features: [
        "500 documents per month",
        "Unlimited signers",
        "Advanced integrations",
        "Team management",
        "Advanced security",
        "Phone & chat support",
        "Unlimited storage",
        "API access",
        "White-label options",
        "Advanced analytics",
        "Compliance features"
      ],
      buttonText: "Start Business Trial",
      buttonStyle: "border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50",
      popular: false
    }
  ]

  const handlePlanSelect = (plan) => {
    if (plan.name === "Free") {
      router.push('/login')
    } else {
      // For paid plans, redirect to login with plan parameter
      router.push(`/login?plan=${plan.name.toLowerCase()}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white font-semibold text-sm sm:text-base">
              🎉 <span className="font-bold">Limited Time Offer!</span> All Pro features FREE for everyone until July 30th, 2024! 
              <span className="hidden sm:inline"> No credit card required.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section - Made Smaller */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Affordable
            <span className="block text-indigo-600">Pricing Plans</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Choose the perfect plan for your document signing needs. Start free, upgrade anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-base font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-base font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 sm:p-7 ${
                  plan.popular
                    ? 'bg-green-600 text-white shadow-2xl scale-105 border-2 border-green-500'
                    : 'bg-white border-2 border-gray-200 shadow-lg'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      🎁 Limited Time!
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-base mb-4 ${plan.popular ? 'text-green-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="mb-4">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className={`text-base ${plan.popular ? 'text-green-100' : 'text-gray-600'}`}>
                      /month
                    </span>
                  </div>

                  {isAnnual && plan.price.annual < plan.price.monthly && (
                    <p className={`text-xs ${plan.popular ? 'text-green-100' : 'text-gray-500'}`}>
                      Billed annually (${plan.price.annual * 12}/year)
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        plan.popular ? 'text-green-300' : 'text-green-500'
                      }`} />
                      <span className={`text-xs ${plan.popular ? 'text-green-100' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 px-5 rounded-xl font-semibold text-base transition-all duration-200 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Comparison */}
      <div className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SignFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer the same powerful features as industry leaders at a fraction of the cost
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600">Setup documents in under 2 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">256-bit encryption & compliance ready</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unlimited Signers</h3>
              <p className="text-gray-600">No per-signer fees on paid plans</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Support</h3>
              <p className="text-gray-600">Real humans ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Can I change plans anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you charge per signer?
              </h3>
              <p className="text-gray-600">
                No! Unlike many competitors, we don't charge per signer. Add as many signers as you need on paid plans.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes! Start with our free plan (no credit card required) or get a 14-day free trial of Pro or Business plans.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What happens to my documents if I cancel?
              </h3>
              <p className="text-gray-600">
                You'll have 30 days to download your documents after cancellation. We'll send you export instructions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to streamline your workflow?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who trust SignFlow for their document signing needs
          </p>
          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center space-x-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-lg"
          >
            <span>Start Free Today</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 