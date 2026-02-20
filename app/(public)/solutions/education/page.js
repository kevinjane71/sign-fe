import { GraduationCap, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Education | eSignTap',
  description: 'Digital e-signatures for schools and universities. Sign enrollment forms, permission slips, IEPs, and field trip waivers online securely.',
  keywords: 'education e-signature, school digital signature, enrollment form signing, permission slip electronic signature, IEP signing online',
  alternates: { canonical: 'https://esigntap.com/solutions/education' },
}

const painPoints = [
  {
    icon: '📚',
    title: 'Paper Overload',
    description: 'Schools drown in paper forms every semester — enrollment packets, permission slips, and emergency contacts pile up and slow down administrative staff.',
  },
  {
    icon: '🏃',
    title: 'Chasing Parent Signatures',
    description: 'Forms sent home in backpacks get lost, forgotten, or returned weeks late. Staff waste hours following up with parents for missing signatures.',
  },
  {
    icon: '🔏',
    title: 'Compliance & Record-Keeping',
    description: 'IEPs, FERPA consent forms, and special education documents require strict audit trails that paper-based systems struggle to maintain.',
  },
]

const useCases = [
  { title: 'Enrollment Forms', description: 'Collect new student enrollment paperwork digitally before the school year begins.' },
  { title: 'Permission Slips', description: 'Send field trip and activity permission slips to parents and receive signed copies within hours.' },
  { title: 'IEP Documents', description: 'Manage Individualized Education Program agreements with secure, compliant e-signatures from all parties.' },
  { title: 'Field Trip Waivers', description: 'Distribute liability waivers and medical release forms to parents for quick digital signing.' },
  { title: 'Staff Contracts', description: 'Onboard teachers and staff with digitally signed employment agreements and policy acknowledgments.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload enrollment forms, permission slips, IEPs, or any school document in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields, assign parent and staff recipients, and create reusable templates for recurring forms.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Parents and staff sign from any device — phone, tablet, or computer. Completed documents are stored securely.', icon: PenTool },
]

const stats = [
  { value: '80% Faster', label: 'Get permission slips and enrollment forms returned 80% faster than paper-based processes.' },
  { value: '$36 Saved', label: 'Save an average of $36 per document by eliminating printing, mailing, and manual filing costs.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for schools and universities?',
    answer: 'Yes. eSignTap is designed for education workflows of all sizes, from small private schools to large university systems. Our platform handles enrollment forms, permission slips, IEPs, staff contracts, and more with ease. Templates let you reuse common forms every semester.',
  },
  {
    question: 'Are e-signatures legally valid for permission slips and enrollment forms?',
    answer: 'Yes. Electronic signatures are legally binding under the ESIGN Act (US) and eIDAS regulation (EU). eSignTap generates complete audit trails with timestamps, IP addresses, and certificates of completion for every signed document.',
  },
  {
    question: 'How secure are student and parent documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption in transit and at rest. We provide role-based access controls and detailed audit logs. Our security practices support FERPA compliance requirements for protecting student education records.',
  },
  {
    question: 'How much does eSignTap cost for education teams?',
    answer: 'eSignTap plans start from just $4.99/month. For schools and districts, our business plan includes unlimited documents, team management, custom templates, and priority support. We also offer special education pricing — contact us for details.',
  },
  {
    question: 'How is eSignTap different from DocuSign for education?',
    answer: 'eSignTap is built with simplicity and affordability in mind. Unlike DocuSign, we offer transparent pricing with no hidden per-envelope fees, an intuitive interface that parents and staff can use without training, and reusable templates designed for recurring school forms.',
  },
  {
    question: 'Can I create templates for school forms?',
    answer: 'Absolutely. Create reusable templates for permission slips, enrollment packets, IEPs, and any recurring document. Set up signature fields once, then send to new recipients each time — saving hours of administrative work every semester.',
  },
]

const definitionBlock = {
  title: 'What are e-signatures for education?',
  content: 'E-signatures for education allow schools, colleges, and universities to collect legally binding digital signatures on enrollment forms, permission slips, IEPs, field trip waivers, and staff contracts. Instead of printing, distributing, and collecting paper forms, administrators send documents electronically and parents or staff sign from any device. This speeds up turnaround times, reduces paper waste, and creates automatic audit trails for compliance.',
}

const comparisonTable = [
  { aspect: 'Turnaround Time', paper: 'Days to weeks', esigntap: 'Hours or minutes' },
  { aspect: 'Cost Per Form', paper: '$5-10 (print, mail, file)', esigntap: 'Pennies per document' },
  { aspect: 'Lost Forms', paper: 'Common (backpack problem)', esigntap: 'Never — digital delivery' },
  { aspect: 'Audit Trail', paper: 'Manual tracking', esigntap: 'Automatic timestamps & logs' },
  { aspect: 'Storage', paper: 'Filing cabinets', esigntap: 'Secure cloud storage' },
]

const relatedSolutions = [
  { slug: 'healthcare', name: 'E-Signatures for Healthcare' },
  { slug: 'government', name: 'E-Signatures for Government' },
  { slug: 'hr', name: 'E-Signatures for HR' },
]

const relatedUseCases = [
  { slug: 'permission-slips', name: 'Permission Slips' },
  { slug: 'enrollment-forms', name: 'Enrollment Forms' },
  { slug: 'employee-onboarding', name: 'Employee Onboarding' },
]

export default function EducationSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Education"
      headline="E-Signatures for Education"
      subtitle="Eliminate paper forms and chasing signatures. Schools and universities use eSignTap to sign enrollment forms, permission slips, IEPs, and waivers digitally."
      heroIcon={GraduationCap}
      accentColor="blue"
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
