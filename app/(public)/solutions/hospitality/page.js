import { Hotel, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Hotels & Hospitality | eSignTap',
  description: 'Digital signatures for hotels and hospitality. Sign guest waivers, vendor contracts, and event agreements online. Enhance the guest experience.',
  keywords: 'hospitality e-signature, hotel document signing, guest waiver e-sign, event agreement digital signature, hospitality vendor contracts',
  alternates: { canonical: 'https://esigntap.com/solutions/hospitality' },
}

const painPoints = [
  {
    icon: '🛎️',
    title: 'Front Desk Bottlenecks',
    description: 'Guests waiting to sign paper waivers, registration forms, and policy acknowledgments at check-in creates frustration and long queues during peak hours.',
  },
  {
    icon: '📅',
    title: 'Event Coordination Delays',
    description: 'Banquet contracts, catering agreements, and event liability waivers require multiple signatures. Paper slows down event booking and confirmation timelines.',
  },
  {
    icon: '🗂️',
    title: 'Scattered Records',
    description: 'Paper documents from multiple properties, vendors, and seasonal staff create disorganized records that are difficult to search and audit.',
  },
]

const useCases = [
  { title: 'Guest Waivers', description: 'Collect liability waivers and activity consent forms digitally before guests arrive — no paper at the front desk.' },
  { title: 'Vendor Contracts', description: 'Sign contracts with food suppliers, linen services, and maintenance vendors quickly to keep operations running smoothly.' },
  { title: 'Event Agreements', description: 'Close banquet hall bookings and catering contracts faster with digital signing for event planners and clients.' },
  { title: 'Employment Forms', description: 'Onboard seasonal and full-time staff with digital offer letters, tax forms, and policy acknowledgments.' },
  { title: 'Franchise & Management Agreements', description: 'Execute hotel franchise agreements and property management contracts with multi-party digital signing.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload guest waivers, vendor contracts, or event agreements in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Place signature fields for guests, vendors, or event clients. Save templates for your most-used documents.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Guests and partners sign from any device — phone, tablet, or lobby kiosk. Completed documents stored securely.', icon: PenTool },
]

const stats = [
  { value: '90% Faster', label: 'Complete guest check-in paperwork 90% faster with pre-arrival digital signing.' },
  { value: '50% Less', label: 'Cut administrative overhead by 50% across front desk, events, and HR operations.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for hotels and hospitality businesses?',
    answer: 'Yes. eSignTap is designed for the guest-facing, high-volume document needs of hospitality businesses. From guest waivers at check-in to vendor contracts and event bookings, our platform makes document signing seamless for both guests and staff.',
  },
  {
    question: 'Are e-signatures legally valid for guest waivers?',
    answer: 'Yes. Electronic signatures on liability waivers and consent forms are legally binding under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap captures complete audit trails with timestamps, IP addresses, and signer verification for every waiver.',
  },
  {
    question: 'How secure are hospitality documents on eSignTap?',
    answer: 'All documents are encrypted with 256-bit AES encryption in transit and at rest. Guest personal information and vendor contract details are protected with role-based access controls and detailed audit logs that meet hospitality industry standards.',
  },
  {
    question: 'How much does eSignTap cost for hospitality teams?',
    answer: 'Plans start at $4.99/month with a free tier to get started. For hotel chains and resort properties needing unlimited documents, multi-property team management, and branded signing experiences, our business plan offers the best value.',
  },
  {
    question: 'How is eSignTap different from DocuSign for hospitality?',
    answer: 'eSignTap offers flat-rate pricing without per-envelope fees, which is essential for hospitality businesses that process high volumes of guest waivers and vendor documents. Our mobile-first design is perfect for guest-facing signing on tablets and kiosks.',
  },
  {
    question: 'Can I create templates for guest waivers and event contracts?',
    answer: 'Yes. Save any document as a reusable template — guest liability waivers, event contracts, vendor agreements. Pre-set signature fields so front desk staff or event coordinators can send documents for signing with a single click.',
  },
  {
    question: 'Can guests sign waivers before they arrive?',
    answer: 'Absolutely. Send signing links via email or text message so guests complete waivers, policy acknowledgments, and registration forms before check-in. This reduces front desk wait times and improves the guest experience from the very first moment.',
  },
  {
    question: 'Does eSignTap work on tablets and kiosks?',
    answer: 'Yes. eSignTap works in any modern browser, making it perfect for lobby tablets and self-service kiosks. Guests can sign waivers and forms directly on a tablet at check-in without downloading any app.',
  },
]

const definitionBlock = {
  title: 'What is an e-signature for hospitality?',
  content: 'An e-signature for hospitality is a legally binding electronic signature used to sign hotel and hospitality documents such as guest waivers, vendor contracts, event agreements, and employee onboarding forms. Instead of paper forms at the front desk or mailed contracts with suppliers, hospitality businesses use e-signatures to collect signatures digitally — before guest arrival, during event planning, and throughout vendor onboarding — creating a faster, more professional experience for guests and partners alike.',
}

const comparisonTable = [
  { aspect: 'Guest Check-In Signing', paper: '5-10 minutes at desk', esigntap: 'Done before arrival' },
  { aspect: 'Event Booking Confirmation', paper: '3-7 days', esigntap: 'Same day' },
  { aspect: 'Seasonal Staff Onboarding', paper: '2-3 days', esigntap: 'Under 1 hour' },
  { aspect: 'Document Storage', paper: 'Physical files per property', esigntap: 'Centralized cloud archive' },
  { aspect: 'Cost Per Document', paper: '$10-$20', esigntap: 'Pennies' },
]

const relatedSolutions = [
  { slug: 'retail', name: 'E-Signatures for Retail' },
  { slug: 'real-estate', name: 'E-Signatures for Real Estate' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
]

const relatedUseCases = [
  { slug: 'waivers', name: 'Sign Waivers Online' },
  { slug: 'vendor-agreements', name: 'Sign Vendor Agreements' },
  { slug: 'event-contracts', name: 'Sign Event Contracts' },
]

export default function HospitalitySolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Hotels & Hospitality"
      headline="E-Signatures for Hotels & Hospitality"
      subtitle="Elevate the guest experience from the first signature. Sign waivers before arrival, close event bookings instantly, and onboard vendors and staff without paperwork delays."
      heroIcon={Hotel}
      accentColor="amber"
      painPoints={painPoints}
      useCases={useCases}
      steps={steps}
      stats={stats}
      faqs={faqs}
      definitionBlock={definitionBlock}
      comparisonTable={comparisonTable}
      relatedSolutions={relatedSolutions}
      relatedUseCases={relatedUseCases}
    />
  )
}
