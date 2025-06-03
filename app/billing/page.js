'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Download, Calendar, Check } from 'lucide-react'

export default function BillingPage() {
  const router = useRouter()
  const [currentPlan] = useState('Free')

  const plans = [
    {
      name: "Free",
      price: 0,
      features: ["3 documents/month", "2 signers max", "Basic support"],
      current: true
    },
    {
      name: "Pro",
      price: 5,
      features: ["50 documents/month", "Unlimited signers", "Priority support", "Custom branding"],
      current: false
    },
    {
      name: "Business",
      price: 20,
      features: ["500 documents/month", "Team management", "API access", "Phone support"],
      current: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Billing & Subscription
          </h1>
          <p className="text-lg text-gray-600">
            Manage your subscription and billing information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Current Plan */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Free Plan</h3>
                    <p className="text-gray-600">Perfect for getting started</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">$0</div>
                    <div className="text-gray-600">per month</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">3 documents/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">2 signers max</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Basic support</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/pricing')}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h3>
              
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl">
                <CreditCard className="w-8 h-8 text-gray-400" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">No payment method required for Free plan</div>
                </div>
              </div>
            </div>

            {/* Next Billing */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Billing</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">No billing date - Free plan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 