import { Upload, Settings, PenTool } from 'lucide-react'
import UseCasePageTemplate from '../../../components/UseCasePageTemplate'

export const metadata = {
  title: 'Sign Employment Contracts Online | eSignTap',
  description: 'Sign employment contracts online with eSignTap. Legally binding e-signatures for offer letters, employment agreements, and onboarding documents.',
  keywords: 'sign employment contract online, e-sign employment agreement, digital offer letter signing, HR e-signature, employee onboarding e-sign',
  alternates: { canonical: 'https://esigntap.com/use-cases/employment-contracts' },
  openGraph: {
    title: 'Sign Employment Contracts Online | eSignTap',
    description: 'Sign employment contracts online with eSignTap. Legally binding e-signatures for offer letters, employment agreements, and onboarding documents.',
    url: 'https://esigntap.com/use-cases/employment-contracts',
    siteName: 'eSignTap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Employment Contracts Online | eSignTap',
    description: 'Sign employment contracts online with eSignTap. Legally binding e-signatures for offer letters, employment agreements, and onboarding documents.',
  },
}

const benefits = [
  {
    title: 'Faster Onboarding',
    description: 'Get employment contracts signed before the new hire\'s first day. No delays from printing, mailing, or scheduling in-person signings.',
  },
  {
    title: 'Legally Binding',
    description: 'E-signed employment contracts are fully enforceable under the ESIGN Act and eIDAS, with complete audit trails and timestamps.',
  },
  {
    title: 'Cost Savings',
    description: 'Eliminate paper, printing, and courier costs for every new hire. Scale your hiring without scaling your paperwork budget.',
  },
  {
    title: 'Enhanced Security',
    description: 'Employment contracts contain sensitive information. eSignTap protects them with 256-bit encryption and secure cloud storage.',
  },
  {
    title: 'Real-Time Status Tracking',
    description: 'Track every employment contract in real time. Get instant notifications when candidates open, review, and sign their offers.',
  },
  {
    title: 'No Printing or Scanning',
    description: 'Hire remotely with confidence. Send and sign employment contracts digitally from anywhere in the world.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Upload Your Contract',
    description: 'Upload your employment contract, offer letter, or onboarding document in PDF or Word format.',
    icon: Upload,
  },
  {
    number: 2,
    title: 'Add Signature Fields',
    description: 'Place signature, date, and initial fields for both the employer and the new hire.',
    icon: Settings,
  },
  {
    number: 3,
    title: 'Send & Sign',
    description: 'The new hire receives a secure link via email and signs from any device. You are notified the moment they sign.',
    icon: PenTool,
  },
]

const faqs = [
  {
    question: 'What is an employment contract?',
    answer: 'An employment contract is a legally binding agreement between an employer and an employee that outlines the terms and conditions of employment. It typically covers job title, responsibilities, compensation, benefits, working hours, confidentiality obligations, termination clauses, and non-compete agreements.',
  },
  {
    question: 'Are e-signed employment contracts legally binding?',
    answer: 'Yes. Electronic signatures on employment contracts are legally binding and enforceable in the United States under the ESIGN Act and UETA, in the EU under eIDAS, and in most countries worldwide. eSignTap provides complete audit trails, timestamps, and certificates of completion.',
  },
  {
    question: 'How do I sign an employment contract online?',
    answer: 'With eSignTap, HR teams upload the employment contract, add signature fields for the employer and new hire, and send it via email. The new hire receives a secure link, reviews the contract, and signs electronically from any device in minutes.',
  },
  {
    question: 'Is it free to sign employment contracts on eSignTap?',
    answer: 'Yes. eSignTap offers a free plan that lets you sign employment contracts at no cost. Upload your contract, add signers, and collect legally binding electronic signatures without a credit card or paid subscription.',
  },
  {
    question: 'How is eSignTap different from DocuSign for HR?',
    answer: 'eSignTap offers a simpler, more affordable alternative to DocuSign for HR teams. With a generous free tier, instant setup, and an intuitive interface, eSignTap makes it easy to get employment contracts signed without the enterprise-level pricing.',
  },
  {
    question: 'Can multiple people sign the same employment contract?',
    answer: 'Yes. eSignTap supports multi-party signing for employment contracts. You can add HR representatives, hiring managers, and the new hire as signers, define the signing order, and track each person\'s progress.',
  },
  {
    question: 'Can I use eSignTap for remote hiring?',
    answer: 'Absolutely. eSignTap is perfect for remote hiring. New hires can review and sign employment contracts from anywhere in the world, on any device. No in-person meetings or paper documents required.',
  },
]

const relatedSolutions = [
  { slug: 'hr', name: 'E-Signatures for HR' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
  { slug: 'legal', name: 'E-Signatures for Legal' },
]

const relatedUseCases = [
  { slug: 'nda-signing', name: 'NDA Signing' },
  { slug: 'consent-forms', name: 'Consent Forms' },
  { slug: 'sales-contracts', name: 'Sales Contracts' },
]

export default function EmploymentContractsPage() {
  return (
    <UseCasePageTemplate
      documentType="Employment Contracts"
      subtitle="Sign offer letters and employment agreements online in minutes. Streamline onboarding with legally binding e-signatures — free to start."
      definitionBlock={{
        title: 'What is an employment contract?',
        content: 'An employment contract is a formal, legally binding agreement between an employer and an employee that establishes the terms of the working relationship. It covers compensation, benefits, job responsibilities, working conditions, confidentiality requirements, and termination procedures. Employment contracts protect both parties and set clear expectations from day one.',
      }}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
      relatedUseCases={relatedUseCases}
    />
  )
}
