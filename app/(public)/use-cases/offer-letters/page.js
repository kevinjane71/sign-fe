import { Upload, Settings, PenTool } from 'lucide-react'
import UseCasePageTemplate from '../../../components/UseCasePageTemplate'

export const metadata = {
  title: 'Sign Offer Letters Electronically Free | eSignTap',
  description: 'Sign offer letters electronically with eSignTap. Send job offers and collect candidate signatures online. Free, fast, and legally binding.',
  keywords: 'sign offer letter electronically, e-sign offer letter, digital offer letter, job offer e-signature, electronic offer letter signing',
  alternates: { canonical: 'https://esigntap.com/use-cases/offer-letters' },
  openGraph: {
    title: 'Sign Offer Letters Electronically | eSignTap',
    description: 'Send and sign offer letters online with eSignTap. Fast, free, and legally binding.',
    url: 'https://esigntap.com/use-cases/offer-letters',
    siteName: 'eSignTap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Offer Letters Electronically | eSignTap',
    description: 'Send and sign offer letters online with eSignTap. Fast, free, and legally binding.',
  },
}

const benefits = [
  {
    title: 'Faster Hiring',
    description: 'Send offer letters and get them signed in minutes. Reduce time-to-hire and secure top candidates before competitors.',
  },
  {
    title: 'Legal Validity',
    description: 'E-signed offer letters are legally enforceable under the ESIGN Act, UETA, and eIDAS regulation.',
  },
  {
    title: 'Cost Savings',
    description: 'Eliminate printing, mailing, and courier costs for every offer letter your HR team sends out.',
  },
  {
    title: 'Better Security',
    description: 'Offer letters are encrypted and include tamper-proof audit trails with timestamps and signer verification.',
  },
  {
    title: 'Easy Tracking',
    description: 'Track which offer letters have been viewed, signed, or are still pending in a real-time dashboard.',
  },
  {
    title: 'No Printing or Scanning',
    description: 'Candidates sign offer letters from their phone or laptop. No need to print, sign, scan, and email back.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Upload Your Offer Letter',
    description: 'Upload the offer letter in PDF or Word format. Use your company template or create one from scratch.',
    icon: Upload,
  },
  {
    number: 2,
    title: 'Add Signature Fields',
    description: 'Place signature, date, and initial fields for both the hiring manager and the candidate.',
    icon: Settings,
  },
  {
    number: 3,
    title: 'Send to the Candidate',
    description: 'The candidate receives the offer letter via email, reviews it, and signs from any device. You are notified instantly.',
    icon: PenTool,
  },
]

const faqs = [
  {
    question: 'What is an offer letter?',
    answer: 'An offer letter is a formal document from an employer to a candidate that outlines the terms of a job offer, including position title, salary, benefits, start date, and employment conditions. It serves as a written confirmation of the offer and, once signed, represents the candidate\'s acceptance of those terms.',
  },
  {
    question: 'Are e-signed offer letters legally binding?',
    answer: 'Yes. Electronically signed offer letters are legally binding and enforceable under the ESIGN Act (United States), UETA, and eIDAS (European Union). eSignTap provides a complete audit trail with timestamps and signer identity verification for every signed offer letter.',
  },
  {
    question: 'How do I sign an offer letter online?',
    answer: 'Upload your offer letter to eSignTap, add signature fields for the hiring manager and candidate, and send it via email. The candidate opens the offer letter on any device, reviews the terms, and signs electronically. Both parties receive a copy of the signed document.',
  },
  {
    question: 'Is it free to sign offer letters on eSignTap?',
    answer: 'Yes. eSignTap offers a free plan that lets you send and sign offer letters at no cost. Upload your offer letter, add signature fields, send to your candidate, and download the signed document for free.',
  },
  {
    question: 'How is eSignTap different from DocuSign for offer letters?',
    answer: 'eSignTap provides a streamlined, affordable alternative to DocuSign for HR teams. You get legally binding e-signatures, audit trails, and secure document storage without the enterprise pricing or complex setup. Most offer letters can be sent in under two minutes.',
  },
  {
    question: 'Can multiple people sign the same offer letter?',
    answer: 'Yes. eSignTap supports multiple signers on a single document. This is common for offer letters that need signatures from both the hiring manager and the candidate, or that require additional approvals from HR leadership.',
  },
  {
    question: 'Can candidates sign offer letters on their phone?',
    answer: 'Yes. eSignTap is fully mobile-friendly. Candidates can open, review, and sign offer letters directly from their smartphone or tablet without downloading any app.',
  },
]

const relatedSolutions = [
  { slug: 'hr', name: 'E-Signatures for HR' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
  { slug: 'education', name: 'E-Signatures for Education' },
]

const relatedUseCases = [
  { slug: 'employment-contracts', name: 'Sign Employment Contracts Online' },
  { slug: 'nda-signing', name: 'Sign NDAs Online' },
  { slug: 'consent-forms', name: 'Sign Consent Forms Online' },
]

export default function OfferLettersPage() {
  return (
    <UseCasePageTemplate
      documentType="Offer Letters"
      subtitle="Send job offer letters for electronic signature and get them signed the same day. Close hires faster with instant, legally binding e-signatures."
      definitionBlock={{
        title: 'What is an offer letter?',
        content: 'An offer letter is an official document issued by an employer to a prospective employee that formally extends a job offer. It typically includes the job title, compensation, benefits, start date, work location, and any conditions of employment. A signed offer letter confirms that the candidate has accepted the position and agrees to the stated terms.',
      }}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
      relatedUseCases={relatedUseCases}
    />
  )
}
