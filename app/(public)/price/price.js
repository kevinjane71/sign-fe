"use client";
import React, { useState } from 'react';
import { Check } from 'lucide-react';

const CurrencyToggle = ({ currency, onToggle }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      <span className={`text-lg ${currency === 'INR' ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
        ₹ INR
      </span>
      <button
        onClick={onToggle}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span
          className={`${
            currency === 'USD' ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
        />
      </button>
      <span className={`text-lg ${currency === 'USD' ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
        $ USD
      </span>
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
  onClick
}) => {
  const originalPrice = currency === 'USD' ? Math.round(price / 83) * 2 : price * 2;
  const discountedPrice = currency === 'USD' ? Math.round(price / 83) : price;
  const currencySymbol = currency === 'USD' ? '$' : '₹';

  return (
    <div 
      onClick={onClick}
      className={`relative rounded-2xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
        isPopular ? 'bg-blue-50 border-2 border-blue-500' : 
        isSelected ? 'bg-green-50 border-2 border-green-500 scale-105' : 
        'bg-white border border-gray-200'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="mt-4 flex flex-col items-center">
          <span className="text-gray-500 line-through text-lg">
            {currencySymbol}{originalPrice}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">{currencySymbol}{discountedPrice}</span>
            <span className="text-gray-600">/month</span>
          </div>
          <span className="mt-2 inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
            50% OFF
          </span>
        </div>
      </div>
      
      <ul className="mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 flex-shrink-0 text-green-500 mr-2 mt-1" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSelected 
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isSelected ? 'Get Started' : 'Select Plan'}
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
      title: "Basic Plan",
      price: "99",
      features: [
        "One meeting scheduling per month",
        "Basic calendar integration",
        "Email confirmation",
        "Simple booking page",
        "Basic support"
      ]
    },
    {
      title: "Pro Plan",
      price: "500",
      features: [
        "All Basic features",
        "Unlimited meeting scheduling",
        "Email notifications",
        "Apps integrations",
        "Payment collection",
        "Priority support",
        "Custom booking page",
        "Multiple calendar integration"
      ],
      isPopular: true
    },
    {
      title: "Advanced Plan",
      price: "1000",
      features: [
        "All Pro features",
        "WhatsApp reminders",
        "Advanced scheduling options",
        "AI-based smart scheduling",
        "Custom payment solutions",
        "Advanced analytics",
        "24/7 priority support",
        "API access",
        "White-label solution"
      ]
    }
  ];

  const handlePlanSelect = (plan) => {
    if (selectedPlan === plan.title) {
      // If selected plan is clicked again, proceed to save and redirect
      const planDetails = {
        selectedPlan: plan.title,
        price: currency === 'USD' ? Math.round(plan.price / 83) : plan.price,
        currency: currency,
        currentUrl: window.location.href
      };
      
      sessionStorage.setItem('selectedPlanDetails', JSON.stringify(planDetails));
      window.location.href = '/login';
    } else {
      // Just select the plan
      setSelectedPlan(plan.title);
    }
  };

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'INR' ? 'USD' : 'INR');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg inline-block mb-8">
          <h3 className="text-xl font-bold animate-pulse">
            Special Offer! 50% OFF for 5 Years
          </h3>
          <p className="text-sm mt-1">
            Hurry! Offer valid for next 2 months only
          </p>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
        <p className="text-lg text-gray-600 mb-6">Select the perfect plan for your scheduling needs</p>
        <CurrencyToggle currency={currency} onToggle={toggleCurrency} />
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
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
  );
};

export default SubscriptionPlans;