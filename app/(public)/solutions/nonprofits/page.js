import { HeartHandshake, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Nonprofits | eSignTap',
  description: 'Free e-signatures for nonprofits. Sign grant applications, donor agreements, and volunteer waivers digitally. Save time and resources.',
  keywords: 'nonprofit e-signature, grant application signing, donor agreement digital signature, volunteer waiver e-sign, nonprofit document management',
  alternates: { canonical: 'https://esigntap.com/solutions/nonprofits' },
}

const painPoints = [
  {
    icon: '\u{1F4B8}',
    title: 'Tight Budgets',
    description: 'Every dollar spent on printing, mailing, and storing paper documents is a dollar diverted from your mission. Nonprofits cannot afford waste.',
  },
  {
    icon: '\u{23F3}',
    title: 'Slow Grant Turnarounds',
    description: 'Paper-based grant applications and donor agreements take weeks to route for signatures, risking missed funding deadlines.',
  },
  {
    icon: '\u{1F4CB}',
    title: 'Volunteer Coordination Chaos',
    description: 'Collecting signed waivers, background check authorizations, and onboarding forms from dozens of volunteers is a logistical nightmare.',
  },
]

const useCases = [
  { title: 'Grant Applications', description: 'Submit fully signed grant applications to funders on time with digital signatures from board members and executives.' },
  { title: 'Donor Agreements', description: 'Formalize major gift pledges and sponsorship commitments with signed donor agreements sent and returned in minutes.' },
  { title: 'Volunteer Waivers', description: 'Collect liability waivers and consent forms from volunteers before events, all from their phones.' },
  { title: 'Board Resolutions', description: 'Get board approval on resolutions, minutes, and policy changes without scheduling in-person signing sessions.' },
  { title: 'Employment Offer Letters', description: 'Send offer letters and onboarding paperwork to new hires and interns with a streamlined signing experience.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload grant forms, donor agreements, or volunteer waivers in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Place signature fields, add date and initial fields, and save templates for recurring documents.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Send signing links to board members, donors, or volunteers. They sign from any device in seconds.', icon: PenTool },
]

const stats = [
  { value: '$36 Saved', label: 'Average savings per document when you eliminate printing, postage, and manual filing costs.' },
  { value: '80% Faster', label: 'Documents signed in hours instead of weeks, so you never miss a grant deadline again.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for nonprofits?',
    answer: 'Absolutely. eSignTap is built for organizations of all sizes, including nonprofits. Our affordable pricing and free tier make it accessible for mission-driven teams that need to keep costs low while staying professional and organized.',
  },
  {
    question: 'Are e-signatures legally valid for grant applications?',
    answer: 'Yes. Electronic signatures are legally binding under the ESIGN Act (US) and eIDAS regulation (EU). Most grantors accept digitally signed applications. eSignTap provides full audit trails, timestamps, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are nonprofit documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption both in transit and at rest. We maintain strict access controls, detailed audit logs, and secure cloud storage. Donor information and organizational records are always safe.',
  },
  {
    question: 'How much does eSignTap cost for nonprofit teams?',
    answer: 'eSignTap offers a free tier for basic signing needs. Paid plans start at just $4.99/month, which is a fraction of what competitors charge. For nonprofit teams that need team management and unlimited documents, our business plan offers the best value.',
  },
  {
    question: 'How is eSignTap different from DocuSign for nonprofits?',
    answer: 'eSignTap is purpose-built for simplicity and affordability. DocuSign charges $25-$65 per user per month. eSignTap starts free and paid plans begin at $4.99/month. You get the same legally binding signatures, audit trails, and templates without the enterprise price tag.',
  },
  {
    question: 'Can I create templates for nonprofit documents?',
    answer: 'Yes. Save any document as a reusable template with pre-placed signature fields. This is perfect for volunteer waivers, donor pledge forms, and board resolutions that you send repeatedly throughout the year.',
  },
  {
    question: 'Can board members sign documents remotely?',
    answer: 'Yes. Board members can sign resolutions, minutes, and policy documents from anywhere using any device. No need to coordinate in-person signing sessions or mail physical copies.',
  },
  {
    question: 'Does eSignTap support multiple signers on one document?',
    answer: 'Yes. You can add multiple signers to any document and set a specific signing order if needed. This is ideal for grant applications that require signatures from both the executive director and board chair.',
  },
]

const definitionBlock = {
  title: 'What is e-signature software for nonprofits?',
  content: 'E-signature software for nonprofits is a digital tool that allows nonprofit organizations to send, sign, and manage documents electronically. Instead of printing, mailing, and scanning paper forms, staff and stakeholders sign grant applications, donor agreements, volunteer waivers, and board resolutions from any device. This saves nonprofits significant time and money that can be redirected toward their mission.',
}

const comparisonTable = [
  { aspect: 'Cost per document', paper: '$12-$40 (print, mail, file)', esigntap: 'Free or pennies' },
  { aspect: 'Turnaround time', paper: '5-14 days', esigntap: 'Under 24 hours' },
  { aspect: 'Grant deadline risk', paper: 'High (mail delays)', esigntap: 'Near zero' },
  { aspect: 'Volunteer onboarding', paper: 'In-person only', esigntap: 'Remote, any device' },
  { aspect: 'Document storage', paper: 'Filing cabinets', esigntap: 'Secure cloud with search' },
]

const relatedSolutions = [
  { slug: 'small-business', name: 'Small Business' },
  { slug: 'hr', name: 'Human Resources' },
  { slug: 'legal', name: 'Legal' },
]

const relatedUseCases = [
  { slug: 'grant-applications', name: 'Grant Applications' },
  { slug: 'board-resolutions', name: 'Board Resolutions' },
  { slug: 'volunteer-waivers', name: 'Volunteer Waivers' },
]

export default function NonprofitsSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Nonprofits"
      headline="E-Signatures for Nonprofits"
      subtitle="Spend less on paperwork and more on your mission. Digital signatures for grant applications, donor agreements, and volunteer waivers."
      heroIcon={HeartHandshake}
      accentColor="teal"
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
