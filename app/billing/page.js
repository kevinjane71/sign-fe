"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Loader2, Calendar, Package, Check, CreditCard } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_MEETSYNK_API_BASE_URL || "https://apis-chi-azure.vercel.app/formio/payment";

const formatDate = (dateString) => {
  if (!dateString || dateString === 'NA') return 'NA';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
};

// Loading Overlay Component
const LoadingOverlay = ({ message }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-lg flex items-center space-x-3">
      <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
      <p className="text-sm text-gray-700">{message}</p>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, subtext, className = "", colorScheme = "blue" }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-500",
    purple: "bg-purple-50 text-purple-500",
    green: "bg-emerald-50 text-emerald-500",
    pink: "bg-rose-50 text-rose-500",
    fuchsia: "bg-fuchsia-50 text-fuchsia-500"
  };

  return (
    <div className={`bg-white rounded-lg p-3 shadow-sm border-t-4 ${
      colorScheme === 'blue' ? 'border-t-blue-500' :
      colorScheme === 'purple' ? 'border-t-purple-500' :
      colorScheme === 'fuchsia' ? 'border-t-fuchsia-500' :
      colorScheme === 'pink' ? 'border-t-rose-500' :
      'border-t-emerald-500'
    } ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs text-gray-500">{title}</h3>
          <p className="mt-1 text-base font-medium text-gray-900">{value}</p>
          {subtext && <p className="mt-0.5 text-xs text-gray-500">{subtext}</p>}
        </div>
        <div className={`p-2 rounded-md ${colorMap[colorScheme]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 text-center p-4">
    <AlertCircle className="h-12 w-12 text-gray-400 mb-3" />
    <h3 className="text-lg font-medium text-gray-900 mb-1">No Billing Data Available</h3>
    <p className="text-sm text-gray-500 max-w-md">Unable to load billing information at this time. Please try again later.</p>
  </div>
);

// Plan Card Component
const PlanCard = ({ 
  title, 
  price, 
  features, 
  planId,
  isCurrentPlan,
  colorScheme = "blue",
  onPaymentSuccess,
  onPaymentError,
  onPaymentStart,
  buttonText,
  priceDisplay,
  subtext
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-500",
      badge: "bg-blue-500",
      icon: "text-blue-500",
      hover: "hover:bg-blue-100",
      button: "bg-blue-500 hover:bg-blue-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-500",
      badge: "bg-purple-500",
      icon: "text-purple-500",
      hover: "hover:bg-purple-100",
      button: "bg-purple-500 hover:bg-purple-600"
    },
    green: {
      bg: "bg-emerald-50",
      border: "border-emerald-500",
      badge: "bg-emerald-500",
      icon: "text-emerald-500",
      hover: "hover:bg-emerald-100",
      button: "bg-emerald-500 hover:bg-emerald-600"
    },
    fuchsia: {
      bg: "bg-fuchsia-50",
      border: "border-fuchsia-500",
      badge: "bg-fuchsia-500",
      icon: "text-fuchsia-500",
      hover: "hover:bg-fuchsia-100",
      button: "bg-emerald-500 hover:bg-emerald-600"
    }
  };

  const colors = colorMap[colorScheme] || colorMap.fuchsia;

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      onPaymentStart?.();
      if (!window.Razorpay) {
        console.log('Loading Razorpay SDK...');
        await loadRazorpaySDK();
      }
  
      if (!window.Razorpay) {
        throw new Error('Failed to load Razorpay SDK');
      }
      // Get user details
      const userObj = JSON.parse(localStorage.getItem('user'));
  
      // Convert price to number and calculate paise amount
      const priceInRupees = Number(price);
      const priceInPaise = Math.round(priceInRupees * 100);
  
      console.log('Amount being sent:', {
        rupees: priceInRupees,
        paise: priceInPaise
      });
  
      // Create order
      const orderResponse = await fetch(`${API_BASE_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          amount: priceInRupees, // Send original amount in rupees
          currency: 'INR',
          email: userObj?.email
        })
      });
  
      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }
  
      const orderData = await orderResponse.json();
      console.log('Order response:', orderData);
  
      // Initialize Razorpay with exact amount from order
      const options = {
        key: 'rzp_live_lMZVjvewP7tKIL',
        amount: orderData.order.amount, // Use exact amount from order
        currency: "INR",
        name: "SnapyForm",
        description: `${title} Subscription`,
        order_id: orderData.order.id, // Use id from order response
        prefill: {
          name: userObj?.name || "",
          email: userObj?.email || ""
        },
        theme: {
          color: colorScheme === 'blue' ? '#3B82F6' : 
                 colorScheme === 'purple' ? '#8B5CF6' : 
                 colorScheme === 'fuchsia' ? '#E879F9' :
                 '#10B981'
        },
        modal: {
          animation: true,
          backdropClass: 'bg-black bg-opacity-50',
          confirm_close: true,
          handleback: true,
        },
        handler: function (response) {
          verifyPayment({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          });
        }
      };
  
      console.log('Razorpay options:', options);
  
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        onPaymentError?.(response.error);
      });
      razorpay.open();
  
    } catch (error) {
      console.error('Payment initialization error:', error);
      onPaymentError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRazorpaySDK = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const verifyPayment = async (paymentData) => {
    console.log('verifyPayment payment');
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/razorpay/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...paymentData,
          planId,
          amount: price
        })
      });

      const data = await response.json();
      
      if (data.success) {
        onPaymentSuccess?.(paymentData);
      } else {
        onPaymentError?.({ message: 'Payment verification failed' });
      }
    } catch (error) {
      console.error('Verification error:', error);
      onPaymentError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative rounded-lg p-4 border-2 transition-all duration-300 ${
      isCurrentPlan ? `${colors.bg} ${colors.border}` : 'bg-white border-gray-200'
    } ${colors.hover}`}>
      {isLoading && <LoadingOverlay message="Processing payment..." />}
      
      {isCurrentPlan && (
        <span className={`absolute -top-3 left-4 ${colors.badge} text-white px-2 py-0.5 text-xs rounded-full`}>
          Active
        </span>
      )}
      
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="mt-2">
          <span className="text-2xl font-bold text-gray-900">{priceDisplay || `$${price}/month`}</span>
          {subtext && <div className="text-xs text-gray-500">{subtext}</div>}
        </div>
      </div>
      
      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-sm">
            <Check className={`h-4 w-4 ${colors.icon} mr-2 mt-0.5 flex-shrink-0`} />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      {title !== "Free" && (
        <button
          onClick={handlePayment}
          disabled={isLoading || isCurrentPlan}
          className={`w-full py-2 px-4 rounded-md text-white transition-colors ${
            isCurrentPlan 
              ? 'bg-gray-400 cursor-not-allowed' 
              : colors.button
          }`}
        >
          {isCurrentPlan ? 'Current Plan' : buttonText || 'Upgrade Now'}
        </button>
      )}
      {title === "Free" && (
        <button
          disabled
          className="w-full py-2 px-4 rounded-md text-white bg-gray-400 cursor-not-allowed mt-2"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

// Main BillingDashboard Component
const BillingDashboard = () => {
  const [billingData, setBillingData] = useState({
    currentPlan: 'Free',
    nextBillingDate: 'NA',
    lastPaymentDate: 'NA'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [currency, setCurrency] = useState('INR');

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        setLoading(true);
        const userObj = JSON.parse(localStorage.getItem('user'));
        const email = userObj?.email;

        if (!email) {
            console.log('No user email data found');
            setLoading(false);
            return;
        }

        const response = await fetch(`${API_BASE_URL}/billing`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch billing data');
        }

        const data = await response.json();
        if (data.success && data.billing) {
          setBillingData(data.billing);
        } else {
          throw new Error(data.error || 'Invalid billing data');
        }
      } catch (err) {
        console.error('Billing data fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, []);

  const planData = {
    INR: [
      {
        title: "Free",
        price: 0,
        planId: 'free',
        colorScheme: "fuchsia",
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
        buttonText: "Get Free Pro Access",
        priceDisplay: "₹0/month"
      },
      {
        title: "Pro",
        price: 49,
        planId: 'pro',
        colorScheme: "fuchsia",
        features: [
          "100 documents per month",
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
        priceDisplay: "₹49/month",
        subtext: "Billed annually (₹500/year)"
      },
      {
        title: "Business",
        price: 200,
        planId: 'business',
        colorScheme: "fuchsia",
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
        priceDisplay: "₹200/month",
        subtext: "Billed annually (₹1000/year)"
      }
    ],
    USD: [
      {
        title: "Free",
        price: 0,
        planId: 'free',
        colorScheme: "fuchsia",
        features: [
          "🎁 ALL PRO FEATURES until July 30th !",
          "50 documents per month (limited time)",
          "Unlimited signers (limited time)",
          "All templates & forms (limited time)",
          "Priority email support (limited time)",
          "Custom branding (limited time)",
          "After July 30th: 3 docs/month",
          "Basic support (permanent)"
        ],
        buttonText: "Get Free Pro Access",
        priceDisplay: "$0/month"
      },
      {
        title: "Pro",
        price: 4,
        planId: 'pro',
        colorScheme: "fuchsia",
        features: [
          "100 documents per month",
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
        priceDisplay: "$4/month",
        subtext: "Billed annually ($48/year)"
      },
      {
        title: "Business",
        price: 20,
        planId: 'business',
        colorScheme: "fuchsia",
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
        priceDisplay: "$20/month",
        subtext: "Billed annually ($240/year)"
      }
    ]
  };

  const plans = planData[currency];

  const handlePaymentSuccess = (response) => {
    setPaymentStatus({ 
      type: 'success', 
      message: 'Payment successful! Plan will be updated shortly.' 
    });
    // Refresh after successful payment
    setTimeout(() => window.location.reload(), 2000);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus({ 
      type: 'error', 
      message: error.message || 'Payment failed. Please try again.' 
    });
  };

  const handlePaymentStart = () => {
    setPaymentStatus(null);
  };

  if (loading) {
    return (
      <div className="min-h-[300px] flex items-center justify-center bg-gray-50">
        <Loader2 className="h-6 w-6 animate-spin text-fuchsia-500" />
      </div>
    );
  }

  // If no billing data available, show empty state
  if (!billingData || error) {
    return <EmptyState />;
  }

  // Find current plan's color scheme
  const currentPlan = plans.find(plan => plan.title === billingData.currentPlan);
  const currentColorScheme = currentPlan?.colorScheme || "fuchsia";

  return (
    <div className="bg-gray-50 mt-10 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Subscription & Billing</h1>
            <p className="text-sm text-gray-500">Manage your payment details and subscription plan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={Package}
            title="Current Plan"
            value={billingData.currentPlan || 'Free'}
            colorScheme={currentColorScheme}
            subtext={
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Active</span>
              </span>
            }
          />
          <StatCard
            icon={Calendar}
            title="Next Billing Date"
            value={formatDate(billingData.nextBillingDate)}
            colorScheme={currentColorScheme}
          />
          <StatCard
            icon={CreditCard}
            title="Last Payment"
            value={formatDate(billingData.lastPaymentDate)}
            colorScheme={currentColorScheme}
          />
        </div>

        {paymentStatus && (
          <div className={`mb-6 p-3 rounded-lg ${
            paymentStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            <p className="text-sm flex items-center gap-2">
              {paymentStatus.type === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              {paymentStatus.message}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-0">Subscription Plans</h2>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${currency === 'INR' ? 'text-fuchsia-600' : 'text-gray-500'}`}>INR</span>
            <button
              onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${currency === 'INR' ? 'bg-fuchsia-500' : 'bg-gray-300'}`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${currency === 'INR' ? 'translate-x-1' : 'translate-x-6'}`}
              />
            </button>
            <span className={`text-sm font-medium ${currency === 'USD' ? 'text-fuchsia-600' : 'text-gray-500'}`}>USD</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <PlanCard
              key={plan.title}
              {...plan}
              isCurrentPlan={billingData.currentPlan === plan.title}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
              onPaymentStart={handlePaymentStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingDashboard; 