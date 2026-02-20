import { Upload, Settings, PenTool } from 'lucide-react'
import UseCasePageTemplate from '../../../components/UseCasePageTemplate'

export const metadata = {
  title: 'Digital Permission Slip Signing Free | eSignTap',
  description: 'Sign permission slips digitally with eSignTap. Collect parent signatures for field trips, activities, and events online. Free and legally binding.',
  keywords: 'digital permission slip signing, sign permission slip online, electronic permission slip, e-sign permission form, parent signature online',
  alternates: { canonical: 'https://esigntap.com/use-cases/permission-slips' },
  openGraph: {
    title: 'Digital Permission Slip Signing | eSignTap',
    description: 'Collect parent signatures on permission slips digitally with eSignTap. Free, fast, and secure.',
    url: 'https://esigntap.com/use-cases/permission-slips',
    siteName: 'eSignTap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Permission Slip Signing | eSignTap',
    description: 'Collect parent signatures on permission slips digitally with eSignTap. Free, fast, and secure.',
  },
}

const benefits = [
  {
    title: 'Faster Collection',
    description: 'Get permission slips signed in minutes, not days. No more chasing down paper forms from backpacks.',
  },
  {
    title: 'Legal Validity',
    description: 'E-signed permission slips are legally valid under the ESIGN Act and eIDAS, providing verifiable parent consent.',
  },
  {
    title: 'Cost Savings',
    description: 'Save on paper, printing, and copying costs. Schools and organizations can go fully digital with permission slips.',
  },
  {
    title: 'Better Security',
    description: 'Signed permission slips are stored securely with encryption, audit trails, and tamper-proof timestamps.',
  },
  {
    title: 'Easy Tracking',
    description: 'See which parents have signed and which permission slips are still outstanding in a real-time dashboard.',
  },
  {
    title: 'No Printing or Scanning',
    description: 'Parents sign from their phone or computer. No paper forms to hand out, collect, or file away.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Upload Your Permission Slip',
    description: 'Upload your permission slip in PDF or Word format. Use your school or organization template.',
    icon: Upload,
  },
  {
    number: 2,
    title: 'Add Parent Signature Fields',
    description: 'Place signature and date fields for parents or guardians. Add any additional fields like emergency contact information.',
    icon: Settings,
  },
  {
    number: 3,
    title: 'Send to Parents',
    description: 'Parents receive the permission slip via email, review it, and sign from any device. You are notified when it is signed.',
    icon: PenTool,
  },
]

const faqs = [
  {
    question: 'What is a permission slip?',
    answer: 'A permission slip is a document that requests a parent or guardian\'s written consent for a child to participate in an activity, field trip, event, or program. It typically describes the activity, date, location, and any associated risks, and requires a parent or guardian signature to authorize participation.',
  },
  {
    question: 'Are e-signed permission slips legally binding?',
    answer: 'Yes. Electronically signed permission slips are legally valid under the ESIGN Act (United States), UETA, and eIDAS (European Union). eSignTap captures a full audit trail with timestamps and signer verification, providing clear proof of parental consent.',
  },
  {
    question: 'How do I sign a permission slip online?',
    answer: 'The school or organization uploads the permission slip to eSignTap and sends it to parents via email. Parents open the form on their phone or computer, review the details, sign electronically, and submit. The signed permission slip is stored securely and accessible to the school.',
  },
  {
    question: 'Is it free to sign permission slips on eSignTap?',
    answer: 'Yes. eSignTap offers a free plan that allows schools and organizations to send permission slips for electronic signature at no cost. Upload, send, collect signatures, and download completed forms without paying anything.',
  },
  {
    question: 'How is eSignTap different from DocuSign for permission slips?',
    answer: 'eSignTap is a simpler and more affordable option for schools and organizations. You get legally binding e-signatures and audit trails without the enterprise pricing of DocuSign. The platform is easy enough for any parent to use without training.',
  },
  {
    question: 'Can both parents sign the same permission slip?',
    answer: 'Yes. eSignTap supports multiple signers on a single document. You can add signature fields for both parents or guardians if dual consent is required for the activity.',
  },
  {
    question: 'Can teachers track which permission slips are still missing?',
    answer: 'Yes. eSignTap provides a real-time dashboard showing the status of every sent document. Teachers and administrators can see at a glance which parents have signed and send reminders to those who have not.',
  },
  {
    question: 'Do parents need to create an account to sign?',
    answer: 'No. Parents can sign permission slips directly from the email link without creating an eSignTap account. The process takes less than a minute from start to finish.',
  },
]

const relatedSolutions = [
  { slug: 'education', name: 'E-Signatures for Education' },
  { slug: 'nonprofits', name: 'E-Signatures for Nonprofits' },
  { slug: 'healthcare', name: 'E-Signatures for Healthcare' },
]

const relatedUseCases = [
  { slug: 'consent-forms', name: 'Sign Consent Forms Online' },
  { slug: 'waivers', name: 'Sign Waivers Online' },
  { slug: 'offer-letters', name: 'Sign Offer Letters Online' },
]

export default function PermissionSlipsPage() {
  return (
    <UseCasePageTemplate
      documentType="Permission Slips"
      subtitle="Collect parent and guardian signatures on permission slips digitally. Send forms via email and get them signed from any device in minutes."
      definitionBlock={{
        title: 'What is a permission slip?',
        content: 'A permission slip is a written consent form signed by a parent or legal guardian authorizing a child to participate in a specific activity, field trip, sporting event, or program. Permission slips serve as documentation that the parent was informed about the activity and has given their approval. Schools, camps, sports leagues, and youth organizations commonly use permission slips to ensure proper consent is obtained before any activity.',
      }}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
      relatedUseCases={relatedUseCases}
    />
  )
}
