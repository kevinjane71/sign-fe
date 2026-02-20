import { HardHat, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Construction | eSignTap',
  description: 'Digital e-signatures for construction firms. Sign contracts, change orders, safety forms, and lien waivers from the job site or office.',
  keywords: 'construction e-signature, contractor digital signature, change order signing, lien waiver electronic signature, construction document signing',
  alternates: { canonical: 'https://esigntap.com/solutions/construction' },
}

const painPoints = [
  {
    icon: '🚧',
    title: 'Job Site Delays',
    description: 'Work stalls when change orders, safety acknowledgments, or subcontractor agreements sit unsigned because paperwork is stuck at the office.',
  },
  {
    icon: '💸',
    title: 'Payment Holdups',
    description: 'Lien waivers and payment applications require multiple signatures across owners, GCs, and subs — delays mean delayed payments for everyone.',
  },
  {
    icon: '📂',
    title: 'Document Chaos',
    description: 'Paper contracts, safety forms, and inspection reports get damaged, lost, or misfiled on busy job sites. Finding the right version is a constant struggle.',
  },
]

const useCases = [
  { title: 'Construction Contracts', description: 'Execute prime contracts and subcontractor agreements digitally with multi-party signing workflows.' },
  { title: 'Change Orders', description: 'Approve scope changes and cost adjustments instantly from the job site — no more waiting for office paperwork.' },
  { title: 'Safety & Compliance Forms', description: 'Collect signed safety acknowledgments, toolbox talk records, and OSHA compliance documents on-site.' },
  { title: 'Lien Waivers', description: 'Streamline conditional and unconditional lien waiver exchanges between owners, GCs, and subcontractors.' },
  { title: 'Daily Reports & Inspections', description: 'Sign off on daily logs, inspection reports, and punch lists directly from a phone or tablet.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload contracts, change orders, safety forms, or lien waivers in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields for owners, GCs, subs, and inspectors. Set signing order and create reusable templates.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Everyone signs from any device — on the job site or in the office. Documents are stored securely with full audit trails.', icon: PenTool },
]

const stats = [
  { value: '75% Faster', label: 'Get change orders and lien waivers signed 75% faster, keeping projects on schedule and payments flowing.' },
  { value: '50% Less', label: 'Cut administrative time in half by replacing paper-based document routing with instant digital workflows.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for construction companies?',
    answer: 'Yes. eSignTap is built for the fast-paced, multi-party workflows of construction. Our platform handles contracts, change orders, safety forms, lien waivers, and daily reports with the mobile-friendly interface field teams need.',
  },
  {
    question: 'Are e-signatures legally valid for construction contracts?',
    answer: 'Yes. Electronic signatures on construction documents are legally binding under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides complete audit trails with timestamps, IP addresses, and certificates of completion that hold up in disputes.',
  },
  {
    question: 'How secure are construction documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption in transit and at rest. We provide role-based access controls and detailed audit logs, ensuring that contracts and financial documents remain confidential and tamper-proof.',
  },
  {
    question: 'How much does eSignTap cost for construction teams?',
    answer: 'eSignTap plans start from just $4.99/month. For construction firms managing multiple projects, our business plan includes unlimited documents, team management, custom templates, and priority support. Start with our free tier to try it out.',
  },
  {
    question: 'How is eSignTap different from DocuSign for construction?',
    answer: 'eSignTap is simpler and more affordable. Construction teams get the same legally binding signatures and audit trails without complex enterprise pricing. Our mobile-first design means subcontractors and field workers can sign documents without any training.',
  },
  {
    question: 'Can I create templates for construction documents?',
    answer: 'Absolutely. Create reusable templates for subcontractor agreements, change orders, lien waivers, safety acknowledgments, and more. Pre-set signature fields and roles, then send new documents in seconds for each project.',
  },
  {
    question: 'Can workers sign documents from the job site?',
    answer: 'Yes. eSignTap works on any smartphone or tablet with a web browser. Field workers receive a secure link and can sign safety forms, daily reports, or change orders right from the job site — no app download required.',
  },
]

const definitionBlock = {
  title: 'What are e-signatures for construction?',
  content: 'E-signatures for construction enable general contractors, subcontractors, owners, and project managers to collect legally binding digital signatures on contracts, change orders, safety forms, lien waivers, and inspection reports. Instead of routing paper between job sites and offices, all parties sign from any device. This keeps projects moving, accelerates payments, maintains safety compliance records, and creates automatic audit trails for dispute resolution.',
}

const comparisonTable = [
  { aspect: 'Change Order Approval', paper: 'Days (office roundtrip)', esigntap: 'Minutes (sign on-site)' },
  { aspect: 'Lien Waiver Exchange', paper: 'Weeks of back-and-forth', esigntap: 'Same day completion' },
  { aspect: 'Document Accessibility', paper: 'Office filing cabinets', esigntap: 'Any device, anywhere' },
  { aspect: 'Safety Form Compliance', paper: 'Incomplete paper records', esigntap: 'Digital logs with timestamps' },
  { aspect: 'Cost Per Document', paper: '$10-20 (print, courier)', esigntap: 'Pennies per document' },
]

const relatedSolutions = [
  { slug: 'real-estate', name: 'E-Signatures for Real Estate' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
  { slug: 'government', name: 'E-Signatures for Government' },
]

const relatedUseCases = [
  { slug: 'contract-signing', name: 'Contract Signing' },
  { slug: 'change-orders', name: 'Change Orders' },
  { slug: 'safety-forms', name: 'Safety & Compliance Forms' },
]

export default function ConstructionSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Construction"
      headline="E-Signatures for Construction"
      subtitle="Keep projects moving and payments flowing. Construction teams use eSignTap to sign contracts, change orders, safety forms, and lien waivers from anywhere."
      heroIcon={HardHat}
      accentColor="yellow"
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
