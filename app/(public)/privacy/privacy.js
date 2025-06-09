import React from 'react';
import { Lock, Clock, Shield, Eye, Database, Bell, Key, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <p>Last updated on Jan 29th 2025</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="ml-4 text-gray-700 leading-relaxed">
                At eSignTap, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information when you use our services. By using our website and services, you agree to the terms of this Privacy Policy.
              </p>
            </div>
          </div>

          {/* Privacy Policy Sections */}
          <div className="space-y-8">
            {/* Information Collection */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
              </div>
              <div className="space-y-4 ml-9">
                <p className="text-gray-700">We collect the following types of information:</p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Personal information such as name, email address, and phone number when you register</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Usage data including your interactions with our services</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Device information and cookies for improving user experience</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Information Usage */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 ml-9">
                <p className="text-gray-700">We use your information to:</p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Provide and improve our services</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Communicate with you about our services</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Ensure security and prevent fraud</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <div className="flex items-center mb-4">
                <Key className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Data Protection</h2>
              </div>
              <div className="space-y-4 ml-9">
                <p className="text-gray-700">We implement various security measures to protect your data:</p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Encryption of sensitive information</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Regular security assessments</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Strict access controls</p>
                  </div>
                </div>
              </div>
            </section>

            {/* User Rights */}
            <section>
              <div className="flex items-center mb-4">
                <UserCheck className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
              </div>
              <div className="space-y-4 ml-9">
                <p className="text-gray-700">You have the right to:</p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Access your personal data</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Request correction or deletion of your data</p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-2 w-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="ml-4 text-gray-700">Opt-out of marketing communications</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Updates Box */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-100">
              <div className="flex items-start">
                <Bell className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Policy Updates
                  </h3>
                  <p className="text-gray-700">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We will notify you of any material changes and obtain your consent where required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">For any questions about this Privacy Policy, please contact:</p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Contact Privacy Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;