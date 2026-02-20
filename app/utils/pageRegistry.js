const baseUrl = 'https://esigntap.com'

export const solutions = [
  // Existing
  { slug: 'real-estate', name: 'Real Estate', desc: 'Close deals faster with digital signatures', icon: 'Building2', color: 'orange' },
  { slug: 'hr', name: 'HR & Recruiting', desc: 'Streamline onboarding and contracts', icon: 'Briefcase', color: 'violet' },
  { slug: 'legal', name: 'Legal', desc: 'Legally binding e-signatures', icon: 'Scale', color: 'amber' },
  { slug: 'healthcare', name: 'Healthcare', desc: 'HIPAA-compliant document signing', icon: 'Heart', color: 'rose' },
  { slug: 'small-business', name: 'Small Business', desc: 'Affordable signing for growing teams', icon: 'Store', color: 'emerald' },
  { slug: 'freelancers', name: 'Freelancers', desc: 'Sign proposals and invoices easily', icon: 'Palette', color: 'pink' },
  // New
  { slug: 'education', name: 'Education', desc: 'Enrollment forms, permission slips & IEPs', icon: 'GraduationCap', color: 'blue' },
  { slug: 'finance', name: 'Finance & Banking', desc: 'Loan docs, account openings & compliance', icon: 'Landmark', color: 'emerald' },
  { slug: 'insurance', name: 'Insurance', desc: 'Policies, claims & applications', icon: 'ShieldCheck', color: 'sky' },
  { slug: 'construction', name: 'Construction', desc: 'Contracts, change orders & safety forms', icon: 'HardHat', color: 'yellow' },
  { slug: 'government', name: 'Government', desc: 'Permits, licenses & citizen services', icon: 'Landmark', color: 'slate' },
  { slug: 'nonprofits', name: 'Nonprofits', desc: 'Grant applications & donor agreements', icon: 'HeartHandshake', color: 'teal' },
  { slug: 'automotive', name: 'Auto Dealers', desc: 'Sales contracts, financing & title transfers', icon: 'Car', color: 'red' },
  { slug: 'property-management', name: 'Property Management', desc: 'Leases, maintenance requests & move-in/out', icon: 'Home', color: 'indigo' },
  { slug: 'accounting', name: 'Accountants & CPAs', desc: 'Engagement letters & tax authorizations', icon: 'Calculator', color: 'green' },
  { slug: 'recruitment', name: 'Recruitment Agencies', desc: 'Offer letters, NDAs & timesheets', icon: 'UserPlus', color: 'purple' },
  { slug: 'logistics', name: 'Logistics & Shipping', desc: 'BOLs, delivery confirmations & contracts', icon: 'Truck', color: 'orange' },
  { slug: 'retail', name: 'Retail', desc: 'Vendor agreements & franchise docs', icon: 'ShoppingBag', color: 'pink' },
  { slug: 'technology', name: 'Tech Companies', desc: 'SaaS agreements, SOWs & MSAs', icon: 'Cpu', color: 'cyan' },
  { slug: 'manufacturing', name: 'Manufacturing', desc: 'Purchase orders & quality agreements', icon: 'Factory', color: 'gray' },
  { slug: 'hospitality', name: 'Hotels & Hospitality', desc: 'Guest waivers & vendor contracts', icon: 'Hotel', color: 'amber' },
]

export const useCases = [
  { slug: 'nda-signing', name: 'NDA Signing', desc: 'Sign NDAs online quickly and securely', keyword: 'sign NDA online free' },
  { slug: 'lease-agreements', name: 'Lease Agreements', desc: 'Electronic lease signing for landlords and tenants', keyword: 'electronic lease signing' },
  { slug: 'employment-contracts', name: 'Employment Contracts', desc: 'Sign employment contracts online', keyword: 'sign employment contract online' },
  { slug: 'sales-contracts', name: 'Sales Contracts', desc: 'E-sign sales contracts instantly', keyword: 'e-sign sales contract' },
  { slug: 'consent-forms', name: 'Consent Forms', desc: 'Digital consent form signing', keyword: 'digital consent form signing' },
  { slug: 'purchase-orders', name: 'Purchase Orders', desc: 'Electronic purchase order signing', keyword: 'electronic purchase order' },
  { slug: 'vendor-agreements', name: 'Vendor Agreements', desc: 'E-sign vendor agreements online', keyword: 'e-sign vendor agreement' },
  { slug: 'waivers', name: 'Waivers', desc: 'Sign waivers electronically', keyword: 'sign waiver electronically' },
  { slug: 'invoices', name: 'Invoices', desc: 'E-sign invoices online', keyword: 'e-sign invoice online' },
  { slug: 'offer-letters', name: 'Offer Letters', desc: 'Sign offer letters electronically', keyword: 'sign offer letter electronically' },
  { slug: 'permission-slips', name: 'Permission Slips', desc: 'Digital permission slip signing', keyword: 'digital permission slip signing' },
  { slug: 'rental-applications', name: 'Rental Applications', desc: 'E-sign rental applications', keyword: 'e-sign rental application' },
]

export const comparisons = [
  { slug: 'docusign-alternative', name: 'DocuSign', competitor: 'DocuSign', savings: '70', competitorPrice: '$25/mo' },
  { slug: 'hellosign-alternative', name: 'HelloSign', competitor: 'HelloSign', savings: '65', competitorPrice: '$20/mo' },
  { slug: 'pandadoc-alternative', name: 'PandaDoc', competitor: 'PandaDoc', savings: '60', competitorPrice: '$19/mo' },
  { slug: 'adobe-sign-alternative', name: 'Adobe Sign', competitor: 'Adobe Sign', savings: '75', competitorPrice: '$22.99/mo' },
  { slug: 'signwell-alternative', name: 'SignWell', competitor: 'SignWell', savings: '50', competitorPrice: '$10/mo' },
  { slug: 'signnow-alternative', name: 'signNow', competitor: 'signNow', savings: '60', competitorPrice: '$20/mo' },
  { slug: 'jotform-sign-alternative', name: 'Jotform Sign', competitor: 'Jotform Sign', savings: '55', competitorPrice: '$12.50/mo' },
]

export const tools = [
  { slug: 'sign-pdf-free', name: 'Sign PDF Free', desc: 'Upload and sign any PDF instantly', path: '/tools/sign-pdf-free' },
  { slug: 'esignature-generator', name: 'E-Signature Generator', desc: 'Create your digital signature', path: '/tools/esignature-generator' },
  { slug: 'fill-pdf-free', name: 'Fill PDF Free', desc: 'Fill PDF forms online for free', path: '/tools/fill-pdf-free' },
  { slug: 'nda-generator', name: 'NDA Generator', desc: 'Create free NDA templates online', path: '/tools/nda-generator' },
  { slug: 'invoice-generator', name: 'Invoice Generator', desc: 'Create professional invoices free', path: '/tools/invoice-generator' },
  { slug: 'signature-to-png', name: 'Signature to PNG', desc: 'Remove signature background to transparent PNG', path: '/tools/signature-to-png' },
  { slug: 'esignature-legality-checker', name: 'E-Signature Legality Checker', desc: 'Check if e-signatures are legal in your country', path: '/tools/esignature-legality-checker' },
]

export const glossaryTerms = [
  { slug: 'electronic-signature', name: 'Electronic Signature', desc: 'What is an electronic signature and how does it work?' },
  { slug: 'digital-signature', name: 'Digital Signature', desc: 'What is a digital signature and how is it different from e-signatures?' },
  { slug: 'wet-signature', name: 'Wet Signature', desc: 'What is a wet signature and when do you still need one?' },
  { slug: 'esign-act', name: 'ESIGN Act', desc: 'The federal law making e-signatures legal in the US' },
  { slug: 'ueta', name: 'UETA', desc: 'Uniform Electronic Transactions Act explained' },
  { slug: 'eidas', name: 'eIDAS', desc: 'EU regulation for electronic identification and signatures' },
  { slug: 'audit-trail', name: 'Audit Trail', desc: 'Complete record of document signing activity' },
  { slug: 'multi-party-signing', name: 'Multi-Party Signing', desc: 'Sending documents to multiple signers in sequence or parallel' },
  { slug: 'signer-authentication', name: 'Signer Authentication', desc: 'Verifying the identity of document signers' },
  { slug: 'document-template', name: 'Document Template', desc: 'Reusable document with pre-placed signature fields' },
  { slug: 'legally-binding-signature', name: 'Legally Binding Signature', desc: 'What makes an e-signature legally enforceable' },
  { slug: 'remote-signing', name: 'Remote Signing', desc: 'Signing documents from anywhere without being physically present' },
]

export const templates = [
  { slug: 'nda', name: 'NDA Template', desc: 'Free non-disclosure agreement template', category: 'Legal' },
  { slug: 'lease-agreement', name: 'Lease Agreement', desc: 'Free lease agreement template', category: 'Property' },
  { slug: 'employment-contract', name: 'Employment Contract', desc: 'Free employment contract template', category: 'HR' },
  { slug: 'invoice', name: 'Invoice', desc: 'Free professional invoice template', category: 'Business' },
  { slug: 'offer-letter', name: 'Offer Letter', desc: 'Free offer letter template', category: 'HR' },
  { slug: 'statement-of-work', name: 'Statement of Work', desc: 'Free SOW template', category: 'Business' },
  { slug: 'waiver', name: 'Waiver & Release', desc: 'Free waiver template', category: 'Legal' },
  { slug: 'vendor-agreement', name: 'Vendor Agreement', desc: 'Free vendor agreement template', category: 'Business' },
  { slug: 'sales-contract', name: 'Sales Contract', desc: 'Free sales contract template', category: 'Business' },
  { slug: 'rental-application', name: 'Rental Application', desc: 'Free rental application template', category: 'Property' },
]

export const trustPages = [
  { slug: 'features', name: 'Features', path: '/features' },
  { slug: 'security', name: 'Security', path: '/security' },
  { slug: 'how-it-works', name: 'How It Works', path: '/how-it-works' },
  { slug: 'about', name: 'About', path: '/about' },
  { slug: 'integrations', name: 'Integrations', path: '/integrations' },
]

export const guides = [
  { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?', desc: 'Everything you need to know about e-signature legality under ESIGN, UETA, and eIDAS', icon: 'Scale', color: 'blue' },
  { slug: 'how-to-sign-pdf', name: 'How to Sign a PDF Online (Free)', desc: 'Step-by-step guide to signing PDFs on any device using free tools', icon: 'FileText', color: 'purple' },
  { slug: 'electronic-vs-digital-signature', name: 'Electronic vs Digital Signature', desc: 'Key differences between electronic signatures and digital signatures explained', icon: 'ArrowLeftRight', color: 'emerald' },
  { slug: 'esign-act', name: 'ESIGN Act: Complete Guide', desc: 'How the ESIGN Act makes electronic signatures legal in the United States', icon: 'Gavel', color: 'amber' },
  { slug: 'eidas', name: 'eIDAS Regulation: EU Guide', desc: 'Understanding EU electronic signature rules and the three levels of eIDAS signatures', icon: 'Globe', color: 'slate' },
]

export function getAllPages() {
  const pages = [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/pricing`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/price`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${baseUrl}/contact-us`, priority: 0.5, changeFrequency: 'yearly' },
    { url: `${baseUrl}/privacy`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/terms`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/refund`, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${baseUrl}/login`, priority: 0.4, changeFrequency: 'yearly' },
    // Index pages
    { url: `${baseUrl}/solutions`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/use-cases`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/compare`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/guides`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/glossary`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/templates`, priority: 0.9, changeFrequency: 'monthly' },
    // Standalone pages
    { url: `${baseUrl}/switch-from-docusign`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/pricing-calculator`, priority: 0.8, changeFrequency: 'monthly' },
  ]

  // Solutions
  solutions.forEach(s => {
    pages.push({ url: `${baseUrl}/solutions/${s.slug}`, priority: 0.8, changeFrequency: 'monthly' })
  })

  // Use cases
  useCases.forEach(u => {
    pages.push({ url: `${baseUrl}/use-cases/${u.slug}`, priority: 0.8, changeFrequency: 'monthly' })
  })

  // Comparisons
  comparisons.forEach(c => {
    pages.push({ url: `${baseUrl}/compare/${c.slug}`, priority: 0.8, changeFrequency: 'monthly' })
  })

  // Tools
  tools.forEach(t => {
    pages.push({ url: `${baseUrl}${t.path}`, priority: 0.9, changeFrequency: 'monthly' })
  })

  // Guides
  guides.forEach(g => {
    pages.push({ url: `${baseUrl}/guides/${g.slug}`, priority: 0.8, changeFrequency: 'monthly' })
  })

  // Glossary
  glossaryTerms.forEach(g => {
    pages.push({ url: `${baseUrl}/glossary/${g.slug}`, priority: 0.7, changeFrequency: 'monthly' })
  })

  // Templates
  templates.forEach(t => {
    pages.push({ url: `${baseUrl}/templates/${t.slug}`, priority: 0.8, changeFrequency: 'monthly' })
  })

  // Trust pages
  trustPages.forEach(p => {
    pages.push({ url: `${baseUrl}${p.path}`, priority: 0.7, changeFrequency: 'monthly' })
  })

  return pages
}
