'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Download, Calendar, User, Settings, Check, AlertCircle, TrendingUp } from 'lucide-react'

export default function BillingPage() {
  const router = useRouter()
  const [currentPlan] = useState('Pro') // This would come from user data
  const [usage] = useState({
    documents: 12,
    limit: 50,
    percentage: 24
  })

  const plans = [
    {
      name: "Free",
      price: 0,
      features: ["3 documents/month", "2 signers max", "Basic support"],
      current: false
    },
    {
      name: "Pro",
      price: 6,
      features: ["50 documents/month", "Unlimited signers", "Priority support", "Custom branding"],
      current: true
    },
    {
      name: "Business",
      price: 20,
      features: ["500 documents/month", "Team management", "API access", "Phone support"],
      current: false
    }
  ]

  const invoices = [
    { id: 'INV-001', date: '2024-05-01', amount: 6, status: 'Paid' },
    { id: 'INV-002', date: '2024-04-01', amount: 6, status: 'Paid' },
    { id: 'INV-003', date: '2024-03-01', amount: 6, status: 'Paid' }
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
            Manage your subscription, usage, and billing information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Current Plan */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Current Plan</h2>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
              
              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{currentPlan} Plan</h3>
                    <p className="text-gray-600">Perfect for individuals & small teams</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">$6</div>
                    <div className="text-gray-600">per month</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">50 documents/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Unlimited signers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Priority support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Custom branding</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => router.push('/pricing')}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Change Plan
                </button>
                <button className="flex-1 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  Cancel Subscription
                </button>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Usage</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Documents this month</span>
                    <span className="text-sm text-gray-600">{usage.documents} / {usage.limit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${usage.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Resets on the 1st of each month
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-700">12</div>
                    <div className="text-sm text-green-600">Documents Sent</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700">28</div>
                    <div className="text-sm text-blue-600">Total Signatures</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700">95%</div>
                    <div className="text-sm text-purple-600">Completion Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing History */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Billing History</h2>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Download className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{invoice.id}</div>
                        <div className="text-sm text-gray-600">{invoice.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">${invoice.amount}</div>
                      <div className="text-sm text-green-600">{invoice.status}</div>
                    </div>
                  </div>
                ))}
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
                  <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                  <div className="text-sm text-gray-600">Expires 12/25</div>
                </div>
              </div>
              
              <button className="w-full mt-4 border-2 border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Update Payment Method
              </button>
            </div>

            {/* Next Billing */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Next Billing</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">June 1, 2024</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">$6.00</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-700">
                    Your subscription will automatically renew on June 1st
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Download Invoices</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Update Billing Info</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">Billing Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 