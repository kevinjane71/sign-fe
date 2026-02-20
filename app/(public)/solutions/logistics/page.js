import { Truck, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Logistics & Shipping | eSignTap',
  description: 'Digital signatures for logistics companies. Sign bills of lading, delivery confirmations, and carrier contracts online. 80% faster turnaround.',
  keywords: 'logistics e-signature, shipping document signing, bill of lading electronic signature, carrier contract signing, delivery confirmation e-sign',
  alternates: { canonical: 'https://esigntap.com/solutions/logistics' },
}

const painPoints = [
  {
    icon: '🚛',
    title: 'Paper Slows Down Shipments',
    description: 'Drivers waste hours at loading docks waiting for paper documents to be printed, signed, and faxed. Every delay costs money and disrupts delivery schedules.',
  },
  {
    icon: '🌍',
    title: 'Scattered Across Locations',
    description: 'Signers are spread across warehouses, ports, and offices in different time zones. Coordinating wet signatures across the supply chain is a logistical nightmare.',
  },
  {
    icon: '📋',
    title: 'Compliance Risk',
    description: 'Missing or incomplete signatures on shipping documents create costly compliance gaps, customs delays, and liability exposure for your business.',
  },
]

const useCases = [
  { title: 'Bills of Lading', description: 'Get bills of lading signed digitally at pickup and delivery points — no more paper at the dock.' },
  { title: 'Delivery Confirmations', description: 'Capture proof of delivery with electronic signatures directly from the recipient on any device.' },
  { title: 'Carrier Contracts', description: 'Onboard new carriers faster with digital contract signing instead of mailing packets back and forth.' },
  { title: 'Freight Rate Agreements', description: 'Lock in freight rates quickly with instant e-signature turnaround on rate confirmations.' },
  { title: 'Warehouse Agreements', description: 'Sign storage and warehousing contracts digitally to speed up facility onboarding.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload your bills of lading, carrier contracts, or delivery forms in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Place signature fields for drivers, dispatchers, and receivers. Set up signing order by role.', icon: Settings },
  { number: 3, title: 'Sign', description: 'All parties sign from any device — at the dock, in the cab, or at the office. Instant confirmation.', icon: PenTool },
]

const stats = [
  { value: '80% Faster', label: 'Turn around shipping documents 80% faster than paper-based workflows.' },
  { value: '$36 Saved', label: 'Save an average of $36 per document on printing, shipping, and admin costs.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for logistics companies?',
    answer: 'Yes. eSignTap is designed for fast-paced industries like logistics where documents need to be signed by multiple parties across different locations. From bills of lading to carrier contracts, our platform handles the multi-party workflows that logistics teams deal with every day.',
  },
  {
    question: 'Are e-signatures legally valid for bills of lading?',
    answer: 'Yes. Electronic signatures are legally binding for commercial shipping documents under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides full audit trails, GPS-stamped timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are logistics documents on eSignTap?',
    answer: 'All documents are encrypted with 256-bit AES encryption both in transit and at rest. We provide tamper-evident seals, detailed audit logs, and role-based access controls to keep sensitive shipping and contract documents protected.',
  },
  {
    question: 'How much does eSignTap cost for logistics teams?',
    answer: 'Plans start from just $4.99/month with a free tier available. For logistics operations that need unlimited documents, team management, and API access, our business plan offers the best value at a fraction of what competitors charge.',
  },
  {
    question: 'How is eSignTap different from DocuSign for logistics?',
    answer: 'eSignTap is built for speed and simplicity. Unlike DocuSign, we offer straightforward pricing without per-envelope fees, a mobile-first signing experience ideal for drivers and field staff, and faster document turnaround. Most logistics teams save 60% or more compared to DocuSign.',
  },
  {
    question: 'Can I create templates for shipping documents?',
    answer: 'Absolutely. Save any document as a reusable template — bills of lading, rate confirmations, carrier agreements. Pre-set signature fields and recipient roles so your team can send documents for signing in seconds.',
  },
  {
    question: 'Can drivers sign documents from their phones?',
    answer: 'Yes. eSignTap works on any device with a browser — smartphones, tablets, or laptops. Drivers can sign delivery confirmations and bills of lading right from the cab or loading dock without downloading any app.',
  },
  {
    question: 'Does eSignTap integrate with logistics software?',
    answer: 'eSignTap offers a REST API and webhook support so you can integrate document signing into your TMS, WMS, or ERP systems. Automate document creation and signing as part of your existing logistics workflows.',
  },
]

const definitionBlock = {
  title: 'What is an e-signature for logistics?',
  content: 'An e-signature for logistics is a legally binding electronic signature used to sign shipping documents such as bills of lading, delivery confirmations, carrier contracts, and freight rate agreements. Instead of printing and physically signing paper documents at docks, warehouses, and offices, logistics teams use e-signatures to sign from any device — reducing transit delays, eliminating paper costs, and creating instant digital records of every transaction in the supply chain.',
}

const comparisonTable = [
  { aspect: 'Signing Speed', paper: '1-3 days', esigntap: 'Under 5 minutes' },
  { aspect: 'Cost Per Document', paper: '$12-$40', esigntap: 'Pennies' },
  { aspect: 'Driver Wait Time', paper: '30-60 minutes', esigntap: 'Instant' },
  { aspect: 'Document Tracking', paper: 'Phone calls & emails', esigntap: 'Real-time status dashboard' },
  { aspect: 'Audit Trail', paper: 'Manual filing', esigntap: 'Automatic with timestamps' },
]

const relatedSolutions = [
  { slug: 'manufacturing', name: 'E-Signatures for Manufacturing' },
  { slug: 'retail', name: 'E-Signatures for Retail' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
]

const relatedUseCases = [
  { slug: 'contracts', name: 'Sign Contracts Online' },
  { slug: 'purchase-orders', name: 'Sign Purchase Orders' },
  { slug: 'vendor-agreements', name: 'Sign Vendor Agreements' },
]

export default function LogisticsSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Logistics & Shipping"
      headline="E-Signatures for Logistics & Shipping"
      subtitle="Stop losing hours to paper at the dock. Sign bills of lading, delivery confirmations, and carrier contracts digitally — from any device, anywhere in the supply chain."
      heroIcon={Truck}
      accentColor="orange"
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
