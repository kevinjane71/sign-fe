import { Upload, Settings, PenTool } from 'lucide-react'
import UseCasePageTemplate from '../../../components/UseCasePageTemplate'

export const metadata = {
  title: 'Electronic Purchase Order Signing | eSignTap',
  description: 'Sign purchase orders electronically with eSignTap. Streamline procurement with legally binding digital signatures. Free, fast, and secure.',
  keywords: 'electronic purchase order, e-sign purchase order, digital PO signing, sign purchase order online, procurement e-signature, PO approval workflow',
  alternates: { canonical: 'https://esigntap.com/use-cases/purchase-orders' },
  openGraph: {
    title: 'Electronic Purchase Order Signing | eSignTap',
    description: 'Sign purchase orders electronically with eSignTap. Streamline procurement with legally binding digital signatures. Free, fast, and secure.',
    url: 'https://esigntap.com/use-cases/purchase-orders',
    siteName: 'eSignTap',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electronic Purchase Order Signing | eSignTap',
    description: 'Sign purchase orders electronically with eSignTap. Streamline procurement with legally binding digital signatures. Free, fast, and secure.',
  },
}

const benefits = [
  {
    title: 'Faster Procurement',
    description: 'Get purchase orders approved and signed in minutes, not days. Accelerate your procurement cycle and avoid supply chain delays.',
  },
  {
    title: 'Legally Binding',
    description: 'E-signed purchase orders are fully enforceable under the ESIGN Act and eIDAS, with complete audit trails for every approval.',
  },
  {
    title: 'Cost Savings',
    description: 'Eliminate paper, printing, and manual routing costs for purchase orders. Process more POs without adding administrative overhead.',
  },
  {
    title: 'Better Accountability',
    description: 'Every purchase order signature is timestamped and logged. Know exactly who approved what, when, and from where.',
  },
  {
    title: 'Easy Approval Tracking',
    description: 'Track the status of every purchase order in real time. Get notified instantly when POs are reviewed, approved, or signed.',
  },
  {
    title: 'No Printing or Scanning',
    description: 'Digitize your entire PO workflow. Create, route, approve, and store purchase orders without a single sheet of paper.',
  },
]

const steps = [
  {
    number: 1,
    title: 'Upload Your Purchase Order',
    description: 'Upload your purchase order in PDF or Word format, or use your existing PO template.',
    icon: Upload,
  },
  {
    number: 2,
    title: 'Add Approvers & Fields',
    description: 'Place signature and date fields. Add approvers, buyers, and vendor email addresses.',
    icon: Settings,
  },
  {
    number: 3,
    title: 'Route & Sign',
    description: 'Approvers receive a secure link, review the PO, and sign electronically. Everyone gets a signed copy automatically.',
    icon: PenTool,
  },
]

const faqs = [
  {
    question: 'What is a purchase order?',
    answer: 'A purchase order (PO) is a commercial document issued by a buyer to a seller, indicating the type, quantity, and agreed-upon price for goods or services. Once accepted by the seller, a purchase order becomes a legally binding contract. POs are essential for managing procurement, tracking expenses, and maintaining accurate financial records.',
  },
  {
    question: 'Are e-signed purchase orders legally binding?',
    answer: 'Yes. Electronically signed purchase orders are legally binding and enforceable in the United States under the ESIGN Act and UETA, in the EU under eIDAS, and in most jurisdictions globally. eSignTap provides full audit trails, timestamps, and certificates of completion for compliance.',
  },
  {
    question: 'How do I sign a purchase order online?',
    answer: 'With eSignTap, you upload your purchase order, add signature fields for buyers, approvers, and vendors, enter their email addresses, and send. Each party receives a secure link to review and sign the PO from any device.',
  },
  {
    question: 'Is it free to sign purchase orders on eSignTap?',
    answer: 'Yes. eSignTap offers a free plan that allows you to sign purchase orders at no cost. Upload your PO, add signers, and collect legally binding electronic signatures without a credit card or paid subscription.',
  },
  {
    question: 'How is eSignTap different from DocuSign for procurement?',
    answer: 'eSignTap provides a more affordable and streamlined alternative to DocuSign for procurement teams. With a generous free tier, fast setup, and an intuitive interface, eSignTap helps businesses get purchase orders signed quickly without enterprise-level complexity or pricing.',
  },
  {
    question: 'Can multiple people sign the same purchase order?',
    answer: 'Yes. eSignTap supports multi-party signing and approval workflows for purchase orders. You can add multiple approvers, set the signing order for sequential approvals, and track each person\'s progress in real time.',
  },
  {
    question: 'Can I set up approval chains for purchase orders?',
    answer: 'Yes. eSignTap allows you to define signing order so purchase orders go through the proper approval chain. For example, a department manager can approve first, followed by finance, and then the vendor signs last.',
  },
  {
    question: 'How are signed purchase orders stored?',
    answer: 'All signed purchase orders are stored securely in your eSignTap account with 256-bit encryption. You can search, filter, download, and retrieve any signed PO at any time. Each document includes a certificate of completion with a full audit trail.',
  },
]

const relatedSolutions = [
  { slug: 'small-business', name: 'E-Signatures for Small Business' },
  { slug: 'freelancers', name: 'E-Signatures for Freelancers' },
  { slug: 'legal', name: 'E-Signatures for Legal' },
]

const relatedUseCases = [
  { slug: 'sales-contracts', name: 'Sales Contracts' },
  { slug: 'nda-signing', name: 'NDA Signing' },
  { slug: 'lease-agreements', name: 'Lease Agreements' },
]

export default function PurchaseOrdersPage() {
  return (
    <UseCasePageTemplate
      documentType="Purchase Orders"
      subtitle="Streamline procurement by signing purchase orders electronically. Legally binding, instantly routed, and free to get started — no paper needed."
      definitionBlock={{
        title: 'What is a purchase order?',
        content: 'A purchase order (PO) is an official document issued by a buyer to a vendor that authorizes a purchase transaction. It specifies the items or services being ordered, quantities, prices, delivery dates, and payment terms. Once accepted by the seller, the purchase order becomes a legally binding agreement and serves as a key record for accounting and inventory management.',
      }}
      benefits={benefits}
      steps={steps}
      faqs={faqs}
      relatedSolutions={relatedSolutions}
      relatedUseCases={relatedUseCases}
    />
  )
}
