import { Car, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Auto Dealers | eSignTap',
  description: 'E-signatures for auto dealerships. Sign sales contracts, financing documents, and title transfers digitally. Close deals faster.',
  keywords: 'auto dealer e-signature, car dealership document signing, vehicle sales contract digital signature, automotive electronic signature',
  alternates: { canonical: 'https://esigntap.com/solutions/automotive' },
}

const painPoints = [
  {
    icon: '\u{1F4DD}',
    title: 'Stacks of Paperwork per Sale',
    description: 'A single vehicle sale generates 15-25 pages of documents. Printing, signing, and filing each deal wastes hours of staff time every day.',
  },
  {
    icon: '\u{23F0}',
    title: 'Deals Lost to Delays',
    description: 'When buyers leave the lot to "think about it," slow paper follow-ups let them walk to a competitor. Speed wins in auto sales.',
  },
  {
    icon: '\u{1F512}',
    title: 'Compliance and Record-Keeping',
    description: 'Dealerships must retain signed contracts, disclosures, and financing documents for years. Paper filing makes retrieval and audits painful.',
  },
]

const useCases = [
  { title: 'Sales Contracts', description: 'Close vehicle purchase agreements digitally, whether the buyer is on the lot or reviewing from home.' },
  { title: 'Financing Documents', description: 'Get loan applications, credit authorizations, and finance agreements signed in minutes, not hours.' },
  { title: 'Title Transfers', description: 'Process vehicle title transfer documents with digital signatures to speed up registration.' },
  { title: 'Trade-In Agreements', description: 'Formalize trade-in valuations and agreements with signed documents before the customer changes their mind.' },
  { title: 'Service Authorizations', description: 'Collect signed repair authorizations from vehicle owners remotely, so your service bay stays productive.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload sales contracts, financing forms, or title documents in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Place signature, initial, and date fields. Save templates for your most common deal paperwork.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Buyers sign from the showroom floor, their phone, or their home. Deals close faster than ever.', icon: PenTool },
]

const stats = [
  { value: '70% Faster', label: 'Deal paperwork completed in minutes instead of hours, so your team can move to the next customer.' },
  { value: '$42 Saved', label: 'Average savings per deal by eliminating printing, courier, and physical storage costs.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for auto dealerships?',
    answer: 'Yes. eSignTap handles the high-volume, multi-document workflows that auto dealers deal with daily. From sales contracts to financing paperwork, our platform is designed for speed and simplicity on the showroom floor.',
  },
  {
    question: 'Are e-signatures legally valid for vehicle sales contracts?',
    answer: 'Yes. Electronic signatures on vehicle sales contracts are legally binding under the ESIGN Act (US) and UCC regulations. eSignTap provides complete audit trails, timestamps, and certificates of completion that hold up in any dispute.',
  },
  {
    question: 'How secure are dealership documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. Customer financial information, credit applications, and personal data are safeguarded with strict access controls and detailed audit logs.',
  },
  {
    question: 'How much does eSignTap cost for auto dealer teams?',
    answer: 'eSignTap plans start at just $4.99/month per user. For dealerships, our business plan includes unlimited documents, team management, and custom templates. The ROI is immediate when you consider the paper and time savings per deal.',
  },
  {
    question: 'How is eSignTap different from DocuSign for auto dealers?',
    answer: 'eSignTap is built for speed and affordability. DocuSign charges $25-$65 per user per month and is designed for enterprise workflows. eSignTap starts at $4.99/month and focuses on getting documents signed fast with minimal clicks.',
  },
  {
    question: 'Can I create templates for dealership documents?',
    answer: 'Yes. Save your sales contracts, finance agreements, trade-in forms, and disclosure documents as reusable templates. Pre-place all signature and initial fields so your team can send deal packets in seconds.',
  },
  {
    question: 'Can buyers sign remotely after leaving the dealership?',
    answer: 'Yes. Send a signing link via email or text. Buyers can review and sign from their phone, tablet, or computer. This is especially useful for remote deals and out-of-state buyers.',
  },
  {
    question: 'Does eSignTap integrate with our DMS?',
    answer: 'eSignTap offers an API that can integrate with dealer management systems. Signed documents can be automatically stored and linked to customer records in your existing workflow.',
  },
]

const definitionBlock = {
  title: 'What is e-signature software for auto dealers?',
  content: 'E-signature software for auto dealers is a digital tool that allows dealerships to send, sign, and manage vehicle sales documents electronically. Instead of printing stacks of contracts, buyers and sales staff sign purchase agreements, financing documents, title transfers, and service authorizations from any device. This accelerates deal closings, reduces errors, and eliminates the cost of paper-based workflows.',
}

const comparisonTable = [
  { aspect: 'Time to close deal paperwork', paper: '1-3 hours', esigntap: 'Under 15 minutes' },
  { aspect: 'Cost per transaction', paper: '$30-$50 (print, file, store)', esigntap: 'Free or pennies' },
  { aspect: 'Remote signing', paper: 'Not possible', esigntap: 'Any device, anywhere' },
  { aspect: 'Document retrieval', paper: 'Dig through filing cabinets', esigntap: 'Instant search' },
  { aspect: 'Compliance audit readiness', paper: 'Manual, error-prone', esigntap: 'Automatic audit trails' },
]

const relatedSolutions = [
  { slug: 'small-business', name: 'Small Business' },
  { slug: 'legal', name: 'Legal' },
  { slug: 'real-estate', name: 'Real Estate' },
]

const relatedUseCases = [
  { slug: 'sales-contracts', name: 'Sales Contracts' },
  { slug: 'financing-agreements', name: 'Financing Agreements' },
  { slug: 'service-authorizations', name: 'Service Authorizations' },
]

export default function AutomotiveSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Auto Dealers"
      headline="E-Signatures for Auto Dealers"
      subtitle="Close deals faster and eliminate paper from the showroom floor. Digital signatures for sales contracts, financing, and title transfers."
      heroIcon={Car}
      accentColor="red"
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
