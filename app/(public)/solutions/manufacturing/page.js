import { Factory, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Manufacturing | eSignTap',
  description: 'Digital signatures for manufacturers. Sign purchase orders, quality agreements, and supplier contracts online. Reduce procurement delays by 75%.',
  keywords: 'manufacturing e-signature, purchase order signing, quality agreement e-sign, supplier contract digital signature, manufacturing document signing',
  alternates: { canonical: 'https://esigntap.com/solutions/manufacturing' },
}

const painPoints = [
  {
    icon: '⏱️',
    title: 'Procurement Delays',
    description: 'Purchase orders and supplier contracts take days to route through approvals. Production schedules slip while paperwork sits on desks waiting for signatures.',
  },
  {
    icon: '🏭',
    title: 'Shop Floor to Office Gap',
    description: 'Quality agreements and inspection sign-offs require signatures from people on the factory floor and in the front office. Paper documents get lost in between.',
  },
  {
    icon: '📑',
    title: 'Compliance Documentation',
    description: 'ISO, OSHA, and industry-specific regulations demand documented sign-offs. Managing compliance paperwork manually creates audit risks and gaps.',
  },
]

const useCases = [
  { title: 'Purchase Orders', description: 'Approve and sign purchase orders digitally to keep raw materials flowing and production on schedule.' },
  { title: 'Quality Agreements', description: 'Get quality control sign-offs and inspection approvals completed instantly from the factory floor.' },
  { title: 'Supplier Contracts', description: 'Onboard new suppliers faster with digital contract signing instead of mailing multi-page agreements.' },
  { title: 'Safety Compliance Forms', description: 'Ensure OSHA and safety training acknowledgments are signed and properly documented for every employee.' },
  { title: 'Engineering Change Orders', description: 'Route engineering change orders through approval workflows and get all required signatures quickly.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload purchase orders, quality agreements, or supplier contracts in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Set up approval chains with signature fields for procurement, quality, and management sign-offs.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Approvers sign from any device — tablet on the shop floor or desktop in the office. Instant confirmation.', icon: PenTool },
]

const stats = [
  { value: '75% Faster', label: 'Reduce procurement cycle times by 75% with digital purchase order approvals.' },
  { value: '$28 Saved', label: 'Save an average of $28 per document on printing, routing, and filing costs.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for manufacturing companies?',
    answer: 'Yes. eSignTap supports the multi-step approval workflows common in manufacturing — from purchase order chains to quality inspection sign-offs. Our platform handles the document volume and approval complexity that manufacturing operations require.',
  },
  {
    question: 'Are e-signatures legally valid for purchase orders?',
    answer: 'Yes. Electronic signatures are legally binding for purchase orders, supplier contracts, and quality agreements under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides complete audit trails with timestamps and signer verification for every document.',
  },
  {
    question: 'How secure are manufacturing documents on eSignTap?',
    answer: 'All documents are encrypted with 256-bit AES encryption in transit and at rest. We provide role-based access controls, detailed audit logs, and secure cloud storage to protect sensitive supplier pricing, engineering specs, and proprietary manufacturing data.',
  },
  {
    question: 'How much does eSignTap cost for manufacturing teams?',
    answer: 'Plans start at $4.99/month with a free tier available. For manufacturing operations needing unlimited documents, approval workflows, and team management across departments, our business plan offers exceptional value compared to enterprise alternatives.',
  },
  {
    question: 'How is eSignTap different from DocuSign for manufacturing?',
    answer: 'eSignTap provides straightforward pricing without per-envelope fees — critical for manufacturers who process hundreds of POs and quality documents monthly. Our platform is simpler to set up and use, requiring minimal training for shop floor and office staff alike.',
  },
  {
    question: 'Can I create templates for purchase orders and quality forms?',
    answer: 'Yes. Save any document as a reusable template with pre-set signature fields and approval routing. Your procurement and quality teams can generate and send documents for signing in seconds, maintaining consistency across every order and inspection.',
  },
]

const definitionBlock = {
  title: 'What is an e-signature for manufacturing?',
  content: 'An e-signature for manufacturing is a legally binding electronic signature used to sign production-related documents such as purchase orders, quality agreements, supplier contracts, engineering change orders, and safety compliance forms. Instead of routing paper documents between the shop floor, procurement, quality control, and management offices, manufacturing teams use e-signatures to approve documents instantly from any device — keeping production lines running, suppliers onboarded, and compliance records complete.',
}

const comparisonTable = [
  { aspect: 'PO Approval Time', paper: '3-5 days', esigntap: 'Under 1 hour' },
  { aspect: 'Supplier Onboarding', paper: '2-4 weeks', esigntap: '2-3 days' },
  { aspect: 'Quality Sign-Off', paper: 'End of shift', esigntap: 'Real-time on any device' },
  { aspect: 'Compliance Records', paper: 'Filing cabinets', esigntap: 'Searchable cloud archive' },
  { aspect: 'Cost Per Document', paper: '$15-$35', esigntap: 'Pennies' },
]

const relatedSolutions = [
  { slug: 'logistics', name: 'E-Signatures for Logistics' },
  { slug: 'technology', name: 'E-Signatures for Tech Companies' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
]

const relatedUseCases = [
  { slug: 'purchase-orders', name: 'Sign Purchase Orders' },
  { slug: 'vendor-agreements', name: 'Sign Vendor Agreements' },
  { slug: 'contracts', name: 'Sign Contracts Online' },
]

export default function ManufacturingSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Manufacturing"
      headline="E-Signatures for Manufacturing"
      subtitle="Keep production lines moving. Sign purchase orders, quality agreements, and supplier contracts digitally — from the shop floor to the front office, in minutes."
      heroIcon={Factory}
      accentColor="gray"
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
