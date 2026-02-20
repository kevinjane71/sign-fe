"use client";
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const CurrencyToggle = ({ currency, onToggle }) => {
  return (
    <div className="inline-flex items-center rounded-full bg-gray-100 p-1">
      <button
        onClick={() => currency !== 'INR' && onToggle()}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          currency === 'INR'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        ₹ INR
      </button>
      <button
        onClick={() => currency !== 'USD' && onToggle()}
        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          currency === 'USD'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        $ USD
      </button>
    </div>
  );
};

const PricingCard = ({
  title,
  price,
  features,
  isPopular,
  isSelected,
  currency,
  onSelect,
  onClick,
  variant
}) => {
  const originalPrice = currency === 'USD' ? Math.round(price / 83) * 2 : price * 2;
  const discountedPrice = currency === 'USD' ? Math.round(price / 83) : price;
  const currencySymbol = currency === 'USD' ? '$' : '₹';

  const buttonStyles = {
    starter:
      'border-2 border-blue-500 text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent',
    professional:
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40',
    business:
      'bg-gray-900 text-white border-2 border-transparent hover:border-purple-500',
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        isPopular
          ? 'bg-white border-2 border-transparent bg-clip-padding scale-105 shadow-xl z-10'
          : isSelected
          ? 'bg-white border-2 border-green-500 shadow-lg'
          : 'bg-white border border-gray-200 shadow-md'
      }`}
      style={
        isPopular
          ? {
              backgroundImage:
                'linear-gradient(white, white), linear-gradient(135deg, #3b82f6, #8b5cf6)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
            }
          : undefined
      }
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-1.5 rounded-full text-sm font-bold shadow-lg">
          Most Popular
        </span>
      )}

      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <div className="flex flex-col items-center">
          <span className="text-gray-400 line-through text-lg">
            {currencySymbol}{originalPrice}/mo
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {currencySymbol}{discountedPrice}
            </span>
            <span className="text-gray-500 font-medium">/month</span>
          </div>
          <span className="mt-3 inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
            50% OFF
          </span>
        </div>
      </div>

      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-green-600" strokeWidth={3} />
            </span>
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`w-full py-3.5 px-4 rounded-xl font-semibold transition-all duration-300 ${
            isSelected
              ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
              : buttonStyles[variant]
          }`}
        >
          {isSelected ? 'Get Started →' : 'Select Plan'}
        </button>
      </div>
    </div>
  );
};

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currency, setCurrency] = useState('INR');

  const plans = [
    {
      title: "Starter",
      price: "399",
      features: [
        "5 documents per month",
        "1 user",
        "Email notifications",
        "Basic templates",
        "PDF signing",
        "Mobile friendly",
        "Email support"
      ],
      variant: "starter"
    },
    {
      title: "Professional",
      price: "999",
      features: [
        "Unlimited documents",
        "Up to 5 users",
        "Multi-signer workflows",
        "Custom branding",
        "All file formats (PDF, Word, Images)",
        "Bulk send",
        "Audit trail",
        "Priority support",
        "Template library"
      ],
      isPopular: true,
      variant: "professional"
    },
    {
      title: "Business",
      price: "1999",
      features: [
        "Everything in Professional",
        "Unlimited users",
        "API access",
        "Webhooks",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated account manager",
        "SSO / SAML",
        "White-label option",
        "24/7 phone support"
      ],
      variant: "business"
    }
  ];

  const comparisonFeatures = [
    { name: "Documents / month", starter: "5", professional: "Unlimited", business: "Unlimited" },
    { name: "Users", starter: "1", professional: "Up to 5", business: "Unlimited" },
    { name: "Multi-signer", starter: false, professional: true, business: true },
    { name: "Audit Trail", starter: false, professional: true, business: true },
    { name: "API Access", starter: false, professional: false, business: true },
    { name: "Templates", starter: "Basic", professional: "Full Library", business: "Full Library" },
    { name: "Bulk Send", starter: false, professional: true, business: true },
    { name: "Custom Branding", starter: false, professional: true, business: true },
    { name: "SSO / SAML", starter: false, professional: false, business: true },
    { name: "Support Level", starter: "Email", professional: "Priority", business: "24/7 Phone" },
  ];

  const faqs = [
    {
      q: "Can I try eSignTap for free?",
      a: "Yes! Start with our free trial and explore all features. No credit card required. Upgrade anytime when you're ready."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept credit cards, debit cards, UPI, and Razorpay. All payments are securely processed."
    },
    {
      q: "Can I change plans later?",
      a: "Yes, you can upgrade or downgrade your plan anytime. Changes take effect immediately, and billing is prorated."
    },
    {
      q: "Is there a long-term contract?",
      a: "No, all plans are month-to-month. You can cancel anytime with no cancellation fees."
    },
    {
      q: "Do you offer discounts for annual billing?",
      a: "Yes, save 20% with annual billing on any plan. Contact our team for details."
    },
    {
      q: "What happens when I exceed my document limit?",
      a: "You'll be prompted to upgrade to a higher plan. Your existing documents remain accessible at all times."
    },
  ];

  const handlePlanSelect = (plan) => {
    if (selectedPlan === plan.title) {
      const planDetails = {
        selectedPlan: plan.title,
        price: currency === 'USD' ? Math.round(plan.price / 83) : plan.price,
        currency: currency,
        currentUrl: window.location.href
      };

      sessionStorage.setItem('selectedPlanDetails', JSON.stringify(planDetails));
      window.location.href = '/login';
    } else {
      setSelectedPlan(plan.title);
    }
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'INR' ? 'USD' : 'INR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12 text-center">
        <span className="inline-block mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-bold shadow-lg">
          Save up to 70% vs DocuSign
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          No hidden fees. No long-term contracts. Cancel anytime.
        </p>
        <CurrencyToggle currency={currency} onToggle={toggleCurrency} />
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              currency={currency}
              isSelected={selectedPlan === plan.title}
              onSelect={() => handlePlanSelect(plan)}
              onClick={() => setSelectedPlan(plan.title)}
            />
          ))}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Feature Comparison
          </span>
        </h2>
        <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <th className="text-left py-4 px-6 font-semibold">Feature</th>
                <th className="text-center py-4 px-6 font-semibold">Starter</th>
                <th className="text-center py-4 px-6 font-semibold">Professional</th>
                <th className="text-center py-4 px-6 font-semibold">Business</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feat, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3.5 px-6 font-medium text-gray-700">{feat.name}</td>
                  {['starter', 'professional', 'business'].map((plan) => (
                    <td key={plan} className="py-3.5 px-6 text-center">
                      {typeof feat[plan] === 'boolean' ? (
                        feat[plan] ? (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100">
                            <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-50">
                            <X className="h-4 w-4 text-red-400" strokeWidth={3} />
                          </span>
                        )
                      ) : (
                        <span className="text-gray-700 font-medium">{feat[plan]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-gray-800 hover:text-blue-600 transition-colors list-none">
                <span>{faq.q}</span>
                <span className="ml-4 text-xl text-gray-400 group-open:rotate-45 transition-transform duration-200 select-none">+</span>
              </summary>
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Enterprise Section */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white mb-3">Need a custom solution?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Contact our sales team for enterprise pricing tailored to your organization.
          </p>
          <a
            href="mailto:sales@esigntap.com"
            className="inline-block px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Contact Sales
          </a>
        </div>
      </div>

      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </div>
  );
};

export default SubscriptionPlans;
