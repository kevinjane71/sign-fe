import { ShieldCheck, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Insurance | eSignTap',
  description: 'Streamline insurance workflows with secure e-signatures. Sign policies, claims, applications, and renewals digitally with full audit trails.',
  keywords: 'insurance e-signature, policy signing digital, claims document electronic signature, insurance application signing online',
  alternates: { canonical: 'https://esigntap.com/solutions/insurance' },
}

const painPoints = [
  {
    icon: '⏳',
    title: 'Policy Issuance Delays',
    description: 'New policies take days to issue because applications, disclosures, and binding agreements require multiple rounds of printing, mailing, and manual signing.',
  },
  {
    icon: '📑',
    title: 'Claims Processing Bottlenecks',
    description: 'Claims stall when signed proof-of-loss forms, authorizations, and settlement agreements get stuck in mail or lost in transit.',
  },
  {
    icon: '🔄',
    title: 'Renewal Drop-Off',
    description: 'Policyholders let coverage lapse because renewal paperwork is inconvenient. The friction of paper forms leads to lost revenue and coverage gaps.',
  },
]

const useCases = [
  { title: 'Policy Applications', description: 'Collect signed insurance applications for auto, home, life, and commercial lines digitally.' },
  { title: 'Claims Documents', description: 'Speed up claims resolution with digitally signed proof-of-loss forms and settlement agreements.' },
  { title: 'Policy Renewals', description: 'Send renewal documents to policyholders for quick digital signing, reducing lapse rates.' },
  { title: 'Agent Agreements', description: 'Onboard new agents and brokers with digitally signed appointment and commission agreements.' },
  { title: 'Disclosure Forms', description: 'Deliver and collect signed regulatory disclosures, privacy notices, and consent forms.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload policy applications, claims forms, renewals, or any insurance document in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields for policyholders, agents, and adjusters. Create templates for recurring document types.', icon: Settings },
  { number: 3, title: 'Sign', description: 'All parties sign from any device. Completed documents include tamper-proof audit trails and are stored securely.', icon: PenTool },
]

const stats = [
  { value: '$36 Saved', label: 'Save an average of $36 per document by eliminating printing, postage, and manual processing costs.' },
  { value: '85% Faster', label: 'Policy applications and claims documents are returned 85% faster with digital signing.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for insurance companies?',
    answer: 'Yes. eSignTap supports the document-heavy workflows of insurance carriers, agencies, and brokerages. Our platform handles policy applications, claims forms, renewals, agent agreements, and compliance documents with the security and audit trails the industry demands.',
  },
  {
    question: 'Are e-signatures legally valid for insurance policies?',
    answer: 'Yes. Electronic signatures on insurance documents are legally binding under the ESIGN Act (US), UETA, and eIDAS regulation (EU). Most state insurance departments accept electronically signed applications and policy documents. eSignTap provides complete audit trails for regulatory compliance.',
  },
  {
    question: 'How secure are insurance documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption in transit and at rest. We provide role-based access controls, detailed activity logs, and secure cloud storage. Our security measures are designed to protect sensitive policyholder information.',
  },
  {
    question: 'How much does eSignTap cost for insurance teams?',
    answer: 'eSignTap plans start from just $4.99/month. For insurance agencies and carriers managing high volumes of policies and claims, our business plan includes unlimited documents, team management, custom templates, and priority support.',
  },
  {
    question: 'How is eSignTap different from DocuSign for insurance?',
    answer: 'eSignTap offers straightforward pricing without per-envelope fees that inflate costs for high-volume insurance operations. You get the same enterprise-grade security and compliance features at a more affordable price, with an interface simple enough for policyholders of any age to use.',
  },
  {
    question: 'Can I create templates for insurance documents?',
    answer: 'Yes. Build reusable templates for policy applications, claims forms, renewal packets, agent onboarding documents, and more. Pre-configure signature fields and recipient roles, then send to new policyholders or agents with a few clicks.',
  },
  {
    question: 'Can policyholders sign from their phone?',
    answer: 'Absolutely. eSignTap works on any device with a web browser — smartphones, tablets, and computers. Policyholders receive a secure link via email and can sign documents in minutes without downloading any app.',
  },
  {
    question: 'Does eSignTap support bulk sending for renewals?',
    answer: 'Yes. Upload a renewal template and send it to hundreds of policyholders at once. Track signing progress in real-time and send automatic reminders to those who have not yet signed.',
  },
]

const definitionBlock = {
  title: 'What are e-signatures for insurance?',
  content: 'E-signatures for insurance allow carriers, agencies, and brokerages to collect legally binding digital signatures on policy applications, claims documents, renewals, and agent agreements. Instead of mailing paper forms and waiting days for signed returns, insurance professionals send documents electronically and policyholders sign from any device. This shortens policy issuance times, accelerates claims resolution, improves renewal rates, and creates automatic audit trails for regulatory compliance.',
}

const comparisonTable = [
  { aspect: 'Policy Issuance', paper: '3-7 days', esigntap: 'Same day' },
  { aspect: 'Claims Turnaround', paper: 'Weeks (mail delays)', esigntap: 'Hours to days' },
  { aspect: 'Renewal Rate', paper: 'Lower (friction)', esigntap: 'Higher (easy digital signing)' },
  { aspect: 'Cost Per Document', paper: '$8-15 (print, mail, file)', esigntap: 'Pennies per document' },
  { aspect: 'Compliance Trail', paper: 'Manual, error-prone', esigntap: 'Automatic, tamper-proof' },
]

const relatedSolutions = [
  { slug: 'finance', name: 'E-Signatures for Finance' },
  { slug: 'healthcare', name: 'E-Signatures for Healthcare' },
  { slug: 'legal', name: 'E-Signatures for Legal' },
]

const relatedUseCases = [
  { slug: 'policy-applications', name: 'Policy Applications' },
  { slug: 'claims-processing', name: 'Claims Processing' },
  { slug: 'contract-signing', name: 'Contract Signing' },
]

export default function InsuranceSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Insurance"
      headline="E-Signatures for Insurance"
      subtitle="Issue policies faster, resolve claims sooner, and improve renewal rates. Insurance professionals use eSignTap to sign documents digitally with full compliance."
      heroIcon={ShieldCheck}
      accentColor="sky"
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
