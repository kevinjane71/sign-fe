import React from 'react';
import { Shield, Clock, AlertCircle } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Cancellation & Refund Policy
          </h1>
          <div className="flex items-center justify-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <p>Last updated on Jan 29th 2025</p>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">
            eSignTap believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
            </p>
          </div>

          {/* Policy Points */}
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                Cancellations will be considered only if the request is made within same day of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
              eSignTap does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within same day of receipt of the products.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within same day of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                In case of any Refunds approved by the eSignTap, it'll take 1-2 days for the refund to be processed to the end customer.
              </p>
            </div>
          </div>

          {/* Important Notice Box */}
          <div className="mt-10 p-6 bg-blue-50 rounded-xl border-2 border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Important Notice
                </h3>
                <p className="text-gray-700">
                  Please ensure to check the product condition immediately upon delivery and report any issues within the same day to our customer service team for prompt assistance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support Button */}
        <div className="text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Contact Customer Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;