import { Upload, Settings, PenTool } from 'lucide-react'
import UseCasePageTemplate from '../../../components/UseCasePageTemplate'

export const metadata = {
  title: 'Sign NDA Online Free | eSignTap E-Signatures',
  description: 'Sign non-disclosure agreements online for free with eSignTap. Legally binding e-signatures, instant delivery, and full audit trails for every NDA.',
  keywords: 'sign NDA online free, e-sign NDA, electronic NDA signing, digital NDA signature, non-disclosure agreement e-sign, NDA signing platform',
  alternates: { canonical: 'https://esigntap.com/use-cases/nda-signing' },
  openGraph: {
    title: 'Sign NDA Online Free | eSignTap E-Signatures',
    description: 'Sign non-disclosure agreements online for free with eSignTap. Legally binding e-signatures, instant delivery, and full audit trails for every NDA.',
    url: 'https://esigntap.com/use-cases/nda-signing',
    siteName: 'eSignTap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign NDA Online Free | eSignTap E-Signatures',
    description: 'Sign non-disclosure agreements online for free with eSignTap. Legally binding e-signatures, instant delivery, and full audit trails for every NDA.',
  },
}

const benefits = [
  {
    title: 'Faster Turnaround',
    description: 'Get NDAs signed in minutes instead of days. No printing, scanning, or mailing required.',
  },
  {
    title: 'Legally Binding',
    description: 'E-signed NDAs are fully enforceable under the ESIGN Act and eIDAS regulation with complete audit trails.',
  },
  {
    title: 'Cost Savings',
    description: 'Eliminate printing, paper, ink, and courier costs. Sign unlimited NDAs on our free plan.',
  },
  {
    title: 'Bank-Level Security',
    description: 'Your confidential agreements are protected with 256-bit encryption and secure cloud storage.',
  },
  {
    title: 'Real-Time Tracking',
    description: 'Know exactly when your NDA is opened, viewed, and signed with instant notifications.',
  },
  {
    title: 'No Printing or Scanning',
    description: 'Go fully digital. Upload your NDA, add signature fields, and send it for signing from any device.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Upload Your NDA',
    description: 'Upload your non-disclosure agreement in PDF or Word format, or start from scratch.',
    icon: Upload,
  },
  {
    number: 2,
    title: 'Add Signers & Fields',
    description: 'Place signature fields, add signer email addresses, and set the signing order.',
    icon: Settings,
  },
  {
    number: 3,
    title: 'Send & Sign',
    description: 'Signers receive the NDA via email and sign from any device. You get notified instantly.',
    icon: PenTool,
  },
]

const faqs = [
  {
    question: 'What is an NDA?',
    answer: 'A non-disclosure agreement (NDA) is a legally binding contract that establishes a confidential relationship between parties. The signing parties agree that sensitive information they share will not be disclosed to third parties. NDAs are commonly used in business negotiations, partnerships, employment, and when sharing proprietary information.',
  },
  {
    question: 'Are e-signed NDAs legally binding?',
    answer: 'Yes. Electronic signatures on NDAs are legally binding and enforceable in the United States under the ESIGN Act and UETA, in the European Union under eIDAS, and in most countries worldwide. eSignTap provides full audit trails, timestamps, and certificates of completion to ensure your NDAs hold up in court.',
  },
  {
    question: 'How do I sign an NDA online?',
    answer: 'With eSignTap, signing an NDA online takes three simple steps: upload your NDA document, add signature fields and recipient email addresses, then send it out. Recipients receive a secure link via email and can sign from any device — desktop, tablet, or phone — in under a minute.',
  },
  {
    question: 'Is it free to sign NDAs on eSignTap?',
    answer: 'Yes. eSignTap offers a free plan that lets you sign NDAs at no cost. You can upload your NDA, add signers, and collect legally binding electronic signatures without a credit card or paid subscription.',
  },
  {
    question: 'How is eSignTap different from DocuSign for NDAs?',
    answer: 'eSignTap offers a generous free tier, a simpler user experience, and faster setup compared to DocuSign. You can start signing NDAs immediately without a lengthy onboarding process. eSignTap also provides the same legal validity, audit trails, and security features at a fraction of the cost.',
  },
  {
    question: 'Can multiple people sign the same NDA?',
    answer: 'Absolutely. eSignTap supports multi-party signing workflows. You can add multiple signers to a single NDA, define the signing order, and track each signer\'s progress in real time. All parties receive a completed copy once everyone has signed.',
  },
  {
    question: 'What types of NDAs can I sign on eSignTap?',
    answer: 'You can sign any type of NDA on eSignTap, including mutual NDAs, unilateral NDAs, multilateral NDAs, employee NDAs, contractor NDAs, and investor NDAs. Simply upload your document and start collecting signatures.',
  },
  {
    question: 'How secure are NDAs signed on eSignTap?',
    answer: 'eSignTap uses 256-bit SSL encryption, secure cloud storage, and tamper-evident audit trails to protect your NDAs. Documents are encrypted at rest and in transit. Only authorized parties can access and sign the agreement.',
  },
]

const relatedSolutions = [
  { slug: 'legal', name: 'E-Signatures for Legal' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
  { slug: 'hr', name: 'E-Signatures for HR' },
]

const relatedUseCases = [
  { slug: 'employment-contracts', name: 'Employment Contracts' },
  { slug: 'sales-contracts', name: 'Sales Contracts' },
  { slug: 'consent-forms', name: 'Consent Forms' },
]

export default function NdaSigningPage() {
  return (
    <UseCasePageTemplate
      documentType="NDAs"
      subtitle="Sign non-disclosure agreements online in minutes. Free, legally binding, and secure — no printing or scanning needed."
      definitionBlock={{
        title: 'What is an NDA?',
        content: 'A non-disclosure agreement (NDA), also known as a confidentiality agreement, is a legally binding contract between two or more parties that outlines information the parties wish to share for certain purposes but want to restrict from wider use. NDAs are essential in business dealings, employment relationships, and partnership discussions where proprietary or sensitive information is exchanged.',
      }}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
      relatedUseCases={relatedUseCases}
    />
  )
}
