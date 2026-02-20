import { Upload, Settings, PenTool } from 'lucide-react'
import UseCasePageTemplate from '../../../components/UseCasePageTemplate'

export const metadata = {
  title: 'Digital Consent Form Signing | eSignTap',
  description: 'Sign consent forms digitally with eSignTap. Legally binding e-signatures for medical, parental, and research consent forms. Free and HIPAA-friendly.',
  keywords: 'digital consent form signing, e-sign consent form, electronic consent form, sign medical consent online, parental consent e-signature',
  alternates: { canonical: 'https://esigntap.com/use-cases/consent-forms' },
  openGraph: {
    title: 'Digital Consent Form Signing | eSignTap',
    description: 'Sign consent forms digitally with eSignTap. Legally binding e-signatures for medical, parental, and research consent forms. Free and HIPAA-friendly.',
    url: 'https://esigntap.com/use-cases/consent-forms',
    siteName: 'eSignTap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Consent Form Signing | eSignTap',
    description: 'Sign consent forms digitally with eSignTap. Legally binding e-signatures for medical, parental, and research consent forms. Free and HIPAA-friendly.',
  },
}

const benefits = [
  {
    title: 'Faster Collection',
    description: 'Collect signed consent forms in minutes instead of chasing paper forms. Patients, parents, and participants can sign from any device.',
  },
  {
    title: 'Legally Binding',
    description: 'Digitally signed consent forms are fully enforceable under the ESIGN Act and eIDAS, with complete audit trails for compliance.',
  },
  {
    title: 'Cost Savings',
    description: 'Eliminate printing, filing, and storage costs for consent forms. Go fully paperless for all your consent workflows.',
  },
  {
    title: 'Better Compliance',
    description: 'Every signed consent form includes a timestamped audit trail, ensuring you can demonstrate proper consent was obtained.',
  },
  {
    title: 'Easy Record Keeping',
    description: 'All signed consent forms are stored securely in the cloud. Search, retrieve, and manage forms instantly from your dashboard.',
  },
  {
    title: 'No Printing or Scanning',
    description: 'Send consent forms digitally, collect signatures electronically, and store everything in the cloud. No paper needed at any step.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Upload Your Consent Form',
    description: 'Upload your consent form in PDF or Word format. Works for medical, parental, research, and any other consent documents.',
    icon: Upload,
  },
  {
    number: 2,
    title: 'Add Signature Fields',
    description: 'Place signature, date, and checkbox fields. Add the signer\'s email address or send a signing link directly.',
    icon: Settings,
  },
  {
    number: 3,
    title: 'Collect Signatures',
    description: 'Signers receive a secure link and sign from any device. You are notified instantly and the signed form is stored securely.',
    icon: PenTool,
  },
]

const faqs = [
  {
    question: 'What is a consent form?',
    answer: 'A consent form is a legal document that confirms a person has been informed about and agrees to a specific activity, procedure, or use of their information. Common types include medical consent forms, parental consent forms, research participation consent, photography release forms, and data processing consent forms.',
  },
  {
    question: 'Are e-signed consent forms legally binding?',
    answer: 'Yes. Electronically signed consent forms are legally binding and enforceable in the United States under the ESIGN Act and UETA, in the EU under eIDAS, and in most jurisdictions globally. eSignTap provides complete audit trails, timestamps, and certificates of completion for full legal compliance.',
  },
  {
    question: 'How do I sign a consent form online?',
    answer: 'With eSignTap, you upload your consent form, add signature and checkbox fields, enter the signer\'s email address, and send. The signer receives a secure link, reviews the form, and signs electronically from any device — desktop, tablet, or phone.',
  },
  {
    question: 'Is it free to sign consent forms on eSignTap?',
    answer: 'Yes. eSignTap offers a free plan that lets you collect signed consent forms at no cost. Upload your form, add signers, and collect legally binding electronic signatures without a credit card or paid subscription.',
  },
  {
    question: 'How is eSignTap different from DocuSign for consent forms?',
    answer: 'eSignTap offers a simpler, more affordable solution for collecting consent form signatures compared to DocuSign. With a generous free tier, instant setup, and an easy-to-use interface, eSignTap is ideal for clinics, schools, and organizations that need a straightforward consent workflow.',
  },
  {
    question: 'Can multiple people sign the same consent form?',
    answer: 'Yes. eSignTap supports multi-party signing for consent forms. For example, both a patient and a guardian can sign the same medical consent form. You can set the signing order and track each signer\'s progress.',
  },
  {
    question: 'Can I use eSignTap for medical consent forms?',
    answer: 'Yes. eSignTap can be used for medical consent forms, patient intake forms, and other healthcare documents. The platform provides secure storage, audit trails, and encryption to help support healthcare compliance requirements.',
  },
  {
    question: 'How are signed consent forms stored?',
    answer: 'All signed consent forms are stored securely in your eSignTap account with 256-bit encryption. You can search, download, and retrieve any signed form at any time. Each document includes a certificate of completion with a full audit trail.',
  },
]

const relatedSolutions = [
  { slug: 'healthcare', name: 'E-Signatures for Healthcare' },
  { slug: 'legal', name: 'E-Signatures for Legal' },
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
]

const relatedUseCases = [
  { slug: 'employment-contracts', name: 'Employment Contracts' },
  { slug: 'nda-signing', name: 'NDA Signing' },
  { slug: 'lease-agreements', name: 'Lease Agreements' },
]

export default function ConsentFormsPage() {
  return (
    <UseCasePageTemplate
      documentType="Consent Forms"
      subtitle="Collect signed consent forms digitally in minutes. Legally binding, securely stored, and free to start — perfect for healthcare, education, and events."
      definitionBlock={{
        title: 'What is a consent form?',
        content: 'A consent form is a written document that verifies a person has been informed about and voluntarily agrees to participate in a specific activity, undergo a procedure, or allow the use of their personal information. Consent forms are widely used in healthcare, research, education, events, and business to protect both the organization and the individual by documenting informed agreement.',
      }}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
      relatedUseCases={relatedUseCases}
    />
  )
}
