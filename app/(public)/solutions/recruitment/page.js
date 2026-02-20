import { UserPlus, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Recruitment Agencies | eSignTap',
  description: 'E-signatures for recruitment agencies. Sign offer letters, NDAs, contractor agreements, and timesheets digitally. Hire faster.',
  keywords: 'recruitment e-signature, staffing agency document signing, offer letter digital signature, contractor agreement e-sign, recruitment NDA signing',
  alternates: { canonical: 'https://esigntap.com/solutions/recruitment' },
}

const painPoints = [
  {
    icon: '\u{26A1}',
    title: 'Candidates Lost to Delays',
    description: 'Top candidates accept other offers while waiting for paper-based offer letters and contracts. In recruiting, speed is everything.',
  },
  {
    icon: '\u{1F501}',
    title: 'Repetitive Paperwork',
    description: 'Every placement requires the same NDAs, contractor agreements, and onboarding forms. Preparing and sending these manually for each candidate is exhausting.',
  },
  {
    icon: '\u{1F4CA}',
    title: 'Timesheet Tracking Gaps',
    description: 'Paper timesheets get lost, arrive late, and delay payroll. Contractors and clients both need a faster way to approve hours worked.',
  },
]

const useCases = [
  { title: 'Offer Letters', description: 'Send offer letters the moment a client approves a candidate. Candidates sign from their phone and you lock in the placement.' },
  { title: 'Non-Disclosure Agreements', description: 'Protect client confidentiality with NDAs signed before candidates receive any proprietary information.' },
  { title: 'Contractor Agreements', description: 'Formalize contractor relationships with signed agreements covering rates, scope, and terms before the first day.' },
  { title: 'Timesheets', description: 'Collect signed timesheet approvals from contractors and client managers weekly, eliminating payroll delays.' },
  { title: 'Client Service Agreements', description: 'Sign staffing service agreements with client companies quickly to start filling positions without delay.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload offer letters, NDAs, contractor agreements, or timesheets in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields for candidates, contractors, and clients. Save templates for documents you send daily.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Candidates and clients sign from any device. Placements move forward without waiting for paper.', icon: PenTool },
]

const stats = [
  { value: '2x Faster', label: 'Time to get offer letters signed and returned, helping you lock in top candidates before competitors do.' },
  { value: '75% Less', label: 'Admin time spent preparing, sending, and tracking recruitment paperwork across multiple placements.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for recruitment agencies?',
    answer: 'Yes. eSignTap is built for the fast-paced, high-volume document workflows that recruitment agencies handle daily. From offer letters and NDAs to contractor agreements and timesheets, our platform helps you move candidates through the pipeline faster.',
  },
  {
    question: 'Are e-signatures legally valid for offer letters and NDAs?',
    answer: 'Yes. Electronic signatures on employment offer letters, NDAs, and contractor agreements are legally binding under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap provides full audit trails, timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are recruitment documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. Candidate personal information, salary details, and client data are safeguarded with strict access controls and detailed audit logs.',
  },
  {
    question: 'How much does eSignTap cost for recruitment teams?',
    answer: 'eSignTap plans start at just $4.99/month. For recruitment agencies handling multiple placements weekly, our business plan includes unlimited documents, team management, bulk sending, and custom templates. The time saved per placement easily covers the cost.',
  },
  {
    question: 'How is eSignTap different from DocuSign for recruitment?',
    answer: 'eSignTap focuses on speed and affordability for high-volume users. DocuSign charges $25-$65 per user per month. eSignTap starts at $4.99/month with the same legally binding signatures, templates, and audit trails. For agencies sending dozens of documents weekly, the savings are significant.',
  },
  {
    question: 'Can I create templates for recruitment documents?',
    answer: 'Yes. Save your standard offer letter, NDA, contractor agreement, and timesheet as reusable templates with pre-placed signature fields. When a new placement is confirmed, send the full document package in seconds.',
  },
  {
    question: 'Can multiple parties sign the same document?',
    answer: 'Yes. Set up multi-party signing with a specific order. For example, the candidate signs the offer letter first, then the hiring manager countersigns. eSignTap notifies each party when it is their turn.',
  },
]

const definitionBlock = {
  title: 'What is e-signature software for recruitment agencies?',
  content: 'E-signature software for recruitment agencies is a digital tool that allows staffing firms to send, sign, and manage placement documents electronically. Instead of printing and mailing offer letters, NDAs, and contractor agreements, recruiters send a signing link and candidates sign from any device within minutes. This eliminates delays that cost placements, reduces administrative overhead, and creates a complete digital record of every signed document.',
}

const comparisonTable = [
  { aspect: 'Offer letter turnaround', paper: '2-5 days', esigntap: 'Under 1 hour' },
  { aspect: 'NDA signing', paper: 'In-person or mail', esigntap: 'Signed remotely in minutes' },
  { aspect: 'Cost per placement paperwork', paper: '$20-$40 (print, mail, file)', esigntap: 'Free or pennies' },
  { aspect: 'Timesheet approvals', paper: 'Weekly paper chase', esigntap: 'Digital sign-off, instant' },
  { aspect: 'Candidate experience', paper: 'Slow and outdated', esigntap: 'Fast and professional' },
]

const relatedSolutions = [
  { slug: 'hr', name: 'Human Resources' },
  { slug: 'small-business', name: 'Small Business' },
  { slug: 'freelancers', name: 'Freelancers' },
]

const relatedUseCases = [
  { slug: 'offer-letters', name: 'Offer Letters' },
  { slug: 'nda-signing', name: 'NDA Signing' },
  { slug: 'contractor-agreements', name: 'Contractor Agreements' },
]

export default function RecruitmentSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Recruitment Agencies"
      headline="E-Signatures for Recruitment Agencies"
      subtitle="Lock in top candidates before the competition. Digital signatures for offer letters, NDAs, contractor agreements, and timesheets."
      heroIcon={UserPlus}
      accentColor="purple"
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
