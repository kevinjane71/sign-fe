'use client'

import Link from 'next/link'
import { FileText, Mail, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  const productLinks = [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Security', href: '/security' },
    { name: 'Free Tools', href: '/tools/sign-pdf-free' },
    { name: 'Integrations', href: '/integrations' },
    { name: 'Switch from DocuSign', href: '/switch-from-docusign', bold: true },
  ]

  const solutionLinks = [
    { name: 'Real Estate', href: '/solutions/real-estate' },
    { name: 'Healthcare', href: '/solutions/healthcare' },
    { name: 'Legal', href: '/solutions/legal' },
    { name: 'Finance & Banking', href: '/solutions/finance' },
    { name: 'Education', href: '/solutions/education' },
    { name: 'Small Business', href: '/solutions/small-business' },
    { name: 'View all solutions →', href: '/solutions', bold: true },
  ]

  const resourceLinks = [
    { name: 'Guides', href: '/guides' },
    { name: 'Templates', href: '/templates' },
    { name: 'Glossary', href: '/glossary' },
    { name: 'Blog', href: '/blog' },
    { name: 'E-Signature Legality', href: '/guides/legally-binding' },
    { name: 'Pricing Calculator', href: '/pricing-calculator' },
  ]

  const compareLinks = [
    { name: 'vs DocuSign', href: '/compare/docusign-alternative' },
    { name: 'vs HelloSign', href: '/compare/hellosign-alternative' },
    { name: 'vs PandaDoc', href: '/compare/pandadoc-alternative' },
    { name: 'vs Adobe Sign', href: '/compare/adobe-sign-alternative' },
    { name: 'vs signNow', href: '/compare/signnow-alternative' },
    { name: 'View all comparisons →', href: '/compare', bold: true },
  ]

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Refund Policy', href: '/refund' },
  ]

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white mt-auto">
      {/* Colorful gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section - Brand + Newsletter */}
        <div className="py-12 border-b border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">eSignTap</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                The most affordable e-signature platform for businesses worldwide.
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Stay up to date</h3>
              <div className="flex items-center max-w-md">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-11 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-full text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
                <button className="ml-3 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5-column links section */}
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Product */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Product
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm hover:text-white transition-colors duration-200 ${link.bold ? 'text-emerald-400 font-semibold' : 'text-gray-400'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Solutions
            </h4>
            <ul className="space-y-3">
              {solutionLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm hover:text-white transition-colors duration-200 ${link.bold ? 'text-emerald-400 font-semibold' : 'text-gray-400'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm hover:text-white transition-colors duration-200 ${link.bold ? 'text-emerald-400 font-semibold' : 'text-gray-400'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Compare
            </h4>
            <ul className="space-y-3">
              {compareLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm hover:text-white transition-colors duration-200 ${link.bold ? 'text-emerald-400 font-semibold' : 'text-gray-400'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} eSignTap. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-sky-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            <p className="text-sm text-gray-500">
              Made with <span className="text-red-500">&hearts;</span> for businesses worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
