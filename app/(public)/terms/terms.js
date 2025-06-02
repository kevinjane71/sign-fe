import React from 'react';
import { FileText, Clock, Building, Scale } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Scale className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms & Conditions
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
              <Building className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <p className="ml-4 text-gray-700 leading-relaxed">
                For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean <span className="font-semibold">MeetSynk</span>, whose registered/operational office is b1-1101,sector 83 Gurgaon HARYANA 122004. "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Your use of the website and/or purchase from us are governed by following Terms and Conditions:
          </h2>

          {/* Terms List */}
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                The content of the pages of this website is subject to change without notice.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                You may not create a link to our website from another website or document without MeetSynk's prior written consent.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 pt-1">
                <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
              </div>
              <p className="ml-4 text-gray-700 leading-relaxed">
                We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time.
              </p>
            </div>
          </div>

          {/* Legal Notice Box */}
          <div className="mt-10 p-6 bg-blue-50 rounded-xl border-2 border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Legal Notice
                </h3>
                <p className="text-gray-700">
                  By accessing and using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center text-gray-600">
          <p>For any questions regarding these Terms & Conditions, please contact:</p>
          <p className="font-medium mt-2">support@meetsynk.com</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;