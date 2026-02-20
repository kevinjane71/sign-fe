import { Landmark, Upload, Settings, PenTool } from 'lucide-react'
import SolutionPageTemplate from '../../../components/SolutionPageTemplate'

export const metadata = {
  title: 'E-Signatures for Finance & Banking | eSignTap',
  description: 'Secure e-signatures for financial institutions. Sign loan documents, account openings, and compliance forms digitally with full audit trails.',
  keywords: 'finance e-signature, banking digital signature, loan document signing, account opening electronic signature, financial compliance',
  alternates: { canonical: 'https://esigntap.com/solutions/finance' },
}

const painPoints = [
  {
    icon: '🐌',
    title: 'Slow Loan Closings',
    description: 'Paper-based loan processes take days or weeks to close. Customers lose patience and deals fall through while documents shuttle between branches.',
  },
  {
    icon: '📋',
    title: 'Compliance Burden',
    description: 'Financial regulations demand meticulous documentation and audit trails. Manual processes create gaps that expose institutions to regulatory risk.',
  },
  {
    icon: '🏢',
    title: 'Branch Dependency',
    description: 'Customers must visit a branch in person to sign account openings and loan documents, limiting service reach and creating scheduling bottlenecks.',
  },
]

const useCases = [
  { title: 'Loan Documents', description: 'Close personal, auto, and mortgage loans faster with secure digital signatures from all parties.' },
  { title: 'Account Openings', description: 'Let customers open checking, savings, and investment accounts remotely with e-signed applications.' },
  { title: 'Compliance Forms', description: 'Collect KYC, AML, and regulatory disclosure acknowledgments with complete audit trails.' },
  { title: 'Wealth Management Agreements', description: 'Execute investment advisory agreements and portfolio management contracts digitally.' },
  { title: 'Credit Applications', description: 'Process credit card and line-of-credit applications with instant digital signatures.' },
]

const steps = [
  { number: 1, title: 'Upload', description: 'Upload loan agreements, account applications, or compliance forms in PDF or Word format.', icon: Upload },
  { number: 2, title: 'Configure', description: 'Add signature fields, set multi-party signing order, and configure identity verification for each signer.', icon: Settings },
  { number: 3, title: 'Sign', description: 'Clients sign securely from any device. Completed documents include full audit trails and certificates of completion.', icon: PenTool },
]

const stats = [
  { value: '70% Faster', label: 'Close loans and open accounts 70% faster by eliminating paper-based back-and-forth.' },
  { value: '60% Less', label: 'Reduce administrative overhead by 60% with automated document workflows and digital storage.' },
]

const faqs = [
  {
    question: 'Is eSignTap suitable for financial institutions?',
    answer: 'Yes. eSignTap provides the security, audit trails, and compliance features that banks, credit unions, and financial services firms require. Our platform supports complex multi-party signing workflows common in loan closings and account openings.',
  },
  {
    question: 'Are e-signatures legally valid for loan documents?',
    answer: 'Yes. Electronic signatures on financial documents are legally binding under the ESIGN Act (US), UETA, and eIDAS regulation (EU). eSignTap provides comprehensive audit trails with timestamps, IP addresses, and certificates of completion that satisfy regulatory requirements.',
  },
  {
    question: 'How secure are financial documents on eSignTap?',
    answer: 'All documents are protected with 256-bit AES encryption in transit and at rest. We provide role-based access controls, detailed activity logs, and secure cloud storage. Our security infrastructure is built to meet the stringent requirements of financial services.',
  },
  {
    question: 'How much does eSignTap cost for finance teams?',
    answer: 'eSignTap plans start from just $4.99/month. For financial institutions managing high document volumes, our business plan includes unlimited documents, advanced authentication, team management, and priority support. Start with our free tier to evaluate the platform.',
  },
  {
    question: 'How is eSignTap different from DocuSign for finance?',
    answer: 'eSignTap offers transparent, affordable pricing without per-envelope fees that add up quickly for high-volume financial operations. Our platform provides the same enterprise-grade security and compliance features at a fraction of the cost, with a simpler interface that reduces training time.',
  },
  {
    question: 'Can I create templates for financial documents?',
    answer: 'Yes. Build reusable templates for loan applications, account opening forms, disclosure packets, and any recurring financial document. Pre-configure signature fields and signing order once, then send to new clients instantly.',
  },
  {
    question: 'Does eSignTap support multi-party signing for loan closings?',
    answer: 'Absolutely. Set up sequential or parallel signing workflows for multiple parties — borrowers, co-signers, loan officers, and notaries. Each signer receives their own secure link and the document progresses automatically through the signing order.',
  },
]

const definitionBlock = {
  title: 'What are e-signatures for finance and banking?',
  content: 'E-signatures for finance and banking enable financial institutions to collect legally binding digital signatures on loan documents, account applications, compliance forms, and investment agreements. Rather than requiring in-branch visits and paper forms, clients sign securely from any device. This accelerates loan closings, streamlines account openings, and creates automatic audit trails that satisfy regulatory requirements under the ESIGN Act and UETA.',
}

const comparisonTable = [
  { aspect: 'Loan Closing Time', paper: '5-10 business days', esigntap: 'Same day or next day' },
  { aspect: 'Cost Per Transaction', paper: '$15-40 (print, courier, file)', esigntap: 'Pennies per document' },
  { aspect: 'Audit Trail', paper: 'Manual logs, prone to gaps', esigntap: 'Automatic, tamper-proof' },
  { aspect: 'Customer Experience', paper: 'Branch visit required', esigntap: 'Sign from anywhere' },
  { aspect: 'Compliance Risk', paper: 'Higher (missing docs, errors)', esigntap: 'Lower (enforced workflows)' },
]

const relatedSolutions = [
  { slug: 'insurance', name: 'E-Signatures for Insurance' },
  { slug: 'legal', name: 'E-Signatures for Legal' },
  { slug: 'real-estate', name: 'E-Signatures for Real Estate' },
]

const relatedUseCases = [
  { slug: 'loan-agreements', name: 'Loan Agreements' },
  { slug: 'account-openings', name: 'Account Openings' },
  { slug: 'compliance-forms', name: 'Compliance Forms' },
]

export default function FinanceSolutionPage() {
  return (
    <SolutionPageTemplate
      industry="Finance & Banking"
      headline="E-Signatures for Finance & Banking"
      subtitle="Accelerate loan closings, simplify account openings, and ensure compliance. Financial institutions trust eSignTap for secure, legally binding digital signatures."
      heroIcon={Landmark}
      accentColor="emerald"
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
