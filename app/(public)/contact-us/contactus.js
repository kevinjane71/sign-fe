"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('success');
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-gray-50 pt-32 pb-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          
          {/* Book Meeting Button */}
          <a
            href="https://www.meetsynk.com/malik.vk07/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl text-lg font-medium"
          >
            <Calendar className="h-6 w-6 mr-3" />
            Book a Meeting
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              
              {/* Quick Meeting Link */}
              <div className="flex items-start mb-8 p-4 bg-blue-50 rounded-xl border-2 border-blue-100">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Quick Schedule</h3>
                  <p className="text-gray-600 mb-2">Book a meeting directly with our team</p>
                  <a
                    href="https://www.meetsynk.com/malik.vk07/contact-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Schedule Now →
                  </a>
                </div>
              </div>

              {/* Rest of contact details */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">admin@meetsynk.com</p>
                    
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  {/* <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">+1 (555) 765-4321</p>
                  </div> */}
                </div>

                {/* <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">
                      123 Business Avenue<br />
                      Suite 4B<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div> */}

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
              
              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl">
                  Thank you for your message. We'll get back to you soon!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center text-lg font-medium"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </button>
                  
                  <a
                    href="https://www.meetsynk.com/malik.vk07/contact-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    Or Schedule a Meeting
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        {/* <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mb-8">
            Can't find the answer you're looking for? Check out our{' '}
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              Help Center
            </button>
          </p>
          
          <div className="space-x-4">
            <button className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors duration-200">
              <MessageCircle className="h-5 w-5 mr-2" />
              Visit FAQ Page
            </button>
            
            <a
              href="https://www.meetsynk.com/malik.vk07/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-blue-600 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:border-blue-700 transition-colors duration-200"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Schedule a Call
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactPage;