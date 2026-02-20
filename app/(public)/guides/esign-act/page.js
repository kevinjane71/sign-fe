import { Gavel } from 'lucide-react'
import GuidePageTemplate from '../../../components/GuidePageTemplate'

export const metadata = {
  title: 'ESIGN Act: Complete Guide to E-Signature Law | eSignTap',
  description: 'Learn how the ESIGN Act makes electronic signatures legally binding in the US. Key provisions, requirements, exemptions, and compliance guide.',
  keywords: 'ESIGN Act, ESIGN Act explained, ESIGN Act requirements, e-signature law, electronic signature legal',
  alternates: { canonical: 'https://esigntap.com/guides/esign-act' },
  openGraph: {
    title: 'ESIGN Act: Complete Guide to E-Signature Law | eSignTap',
    description: 'Learn how the ESIGN Act makes electronic signatures legally binding in the US. Key provisions and compliance guide.',
    url: 'https://esigntap.com/guides/esign-act',
    siteName: 'eSignTap',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESIGN Act: Complete Guide to E-Signature Law | eSignTap',
    description: 'How the ESIGN Act makes electronic signatures legally binding in the US.',
  },
}

const tableOfContents = [
  { id: 'what-is', title: 'What Is the ESIGN Act?' },
  { id: 'key-provisions', title: 'Key Provisions of the ESIGN Act' },
  { id: 'requirements', title: 'Requirements for Valid E-Signatures' },
  { id: 'consumer-consent', title: 'Consumer Consent Requirements' },
  { id: 'exemptions', title: 'Exemptions: What the ESIGN Act Does NOT Cover' },
  { id: 'esign-vs-ueta', title: 'ESIGN Act vs UETA' },
  { id: 'how-to-comply', title: 'How to Comply with the ESIGN Act' },
  { id: 'state-laws', title: 'State-Level E-Signature Laws' },
]

const sections = [
  {
    id: 'what-is',
    title: 'What Is the ESIGN Act?',
    content: [
      'The Electronic Signatures in Global and National Commerce Act (ESIGN Act) is a United States federal law enacted on June 30, 2000. It establishes that electronic signatures and electronic records are legally valid and enforceable, carrying the same weight as traditional handwritten signatures and paper documents in interstate and international commerce.',
      'Before the ESIGN Act, businesses faced uncertainty about whether contracts signed electronically would hold up in court. The law resolved this by declaring that a signature, contract, or other record cannot be denied legal effect, validity, or enforceability solely because it is in electronic form. This single principle transformed how American businesses handle contracts and opened the door to the modern e-signature industry.',
      'The ESIGN Act applies to all transactions in or affecting interstate or foreign commerce, which covers virtually all business activity in the United States. It is technology-neutral, meaning it does not mandate any specific type of electronic signature technology -- whether you use a typed name, a drawn signature, a click-wrap agreement, or a cryptographic digital signature, the law treats them all as potentially valid.',
    ],
  },
  {
    id: 'key-provisions',
    title: 'Key Provisions of the ESIGN Act',
    content: [
      'The ESIGN Act contains several important provisions that define the legal framework for electronic signatures in the United States:',
    ],
    bullets: [
      'Legal equivalence: Electronic signatures and records have the same legal standing as their paper counterparts. No court can refuse to admit a document solely because it was signed electronically.',
      'Technology neutrality: The law does not favor or require any specific technology. Any electronic process that indicates intent to sign is acceptable.',
      'Consumer protection: When businesses provide required disclosures electronically, consumers must affirmatively consent to receive electronic records and must be informed of their right to receive paper copies.',
      'Record retention: Electronically signed documents must be accurately preserved and reproducible for the legally required retention period. The records must remain accessible to all parties entitled to access them.',
      'Notarization and acknowledgment: If a law requires a signature to be notarized or acknowledged, that requirement can be satisfied electronically if the notary\'s electronic signature is attached or logically associated with the document.',
      'Government exclusion: The ESIGN Act does not require government agencies to use or accept electronic records or signatures, though many have since adopted their own e-signature policies.',
    ],
  },
  {
    id: 'requirements',
    title: 'Requirements for Valid E-Signatures Under the ESIGN Act',
    content: [
      'For an electronic signature to be valid and enforceable under the ESIGN Act, four fundamental requirements must be satisfied. These requirements focus on the intent and process behind the signature rather than the technology used.',
    ],
    bullets: [
      'Intent to sign: The signer must clearly intend to sign the document. This is no different from the requirement for paper signatures -- the act of signing must be deliberate, not accidental.',
      'Consent to do business electronically: All parties to the transaction must agree to conduct the transaction using electronic records and signatures. This consent can be explicit (checking a box) or implied through the course of dealing.',
      'Association of signature with record: The electronic signature must be connected to or logically associated with the document being signed. The signer must be clearly linked to the specific record they are signing.',
      'Record retention: The signed electronic record must be capable of being accurately reproduced and retained for the period required by law. If a statute requires a document to be kept for seven years, the electronic version must remain accessible and unaltered for that entire period.',
    ],
    callout: 'eSignTap automatically satisfies all four ESIGN Act requirements by capturing signer intent through explicit signing actions, obtaining electronic consent, linking each signature to its specific document, and securely storing all signed records with tamper-evident sealing.',
  },
  {
    id: 'consumer-consent',
    title: 'Consumer Consent Requirements',
    content: [
      'The ESIGN Act includes specific consumer protection provisions that apply when a business is required by law to provide information to a consumer in writing. These provisions are designed to ensure consumers are not forced into electronic transactions against their will.',
      'Before providing legally required disclosures electronically, a business must: (1) clearly inform the consumer that they have the right to receive the information on paper, (2) inform the consumer of the right to withdraw consent to electronic delivery at any time and explain any consequences of withdrawal, (3) describe the hardware and software requirements needed to access the electronic records, and (4) obtain the consumer\'s affirmative consent to receive the specific categories of information electronically.',
      'The consent must be obtained in a manner that reasonably demonstrates the consumer can access the electronic records. For example, sending a confirmation email that the consumer must respond to or click a link within demonstrates their ability to access electronic communications. If a business later changes its hardware or software requirements in a way that creates a material risk the consumer can no longer access records, it must notify the consumer and re-obtain consent.',
    ],
  },
  {
    id: 'exemptions',
    title: 'Exemptions: What the ESIGN Act Does NOT Cover',
    content: [
      'While the ESIGN Act covers the vast majority of contracts and business documents, Congress specifically excluded certain categories of documents that were deemed too important or sensitive for electronic-only handling.',
    ],
    bullets: [
      'Wills, codicils, and testamentary trusts -- estate planning documents must still be executed on paper with wet signatures in most states',
      'Adoption, divorce, and other family law matters -- court-supervised family proceedings generally require paper documents',
      'Court orders, notices, and official court documents -- judicial proceedings maintain paper requirements',
      'Cancellation or termination of utility services (electricity, water, gas) -- consumers must receive paper notices',
      'Cancellation or termination of health insurance or life insurance benefits -- protecting consumers from losing critical coverage',
      'Product recall notices that affect health or safety -- ensuring consumers receive important safety information',
      'Documents required to accompany the transportation of hazardous materials -- safety regulations require physical documentation',
      'Certain UCC (Uniform Commercial Code) transactions -- Articles 3 through 9 of the UCC are partially excluded, though Articles 2 and 2A (sales and leases) are covered by ESIGN',
    ],
    callout: 'Even though these documents are exempt from the ESIGN Act, some states have enacted their own laws that do allow electronic signatures for certain exempt categories. Always check your specific state\'s regulations.',
  },
  {
    id: 'esign-vs-ueta',
    title: 'ESIGN Act vs UETA',
    content: [
      'The ESIGN Act and the Uniform Electronic Transactions Act (UETA) work together to create a comprehensive legal framework for electronic signatures in the United States, but they operate at different levels and have different origins.',
      'UETA was drafted in 1999 by the Uniform Law Commission (ULC) as a model state law. It was designed to be adopted by individual state legislatures, and 49 states have done so (New York adopted its own alternative, ESRA). The ESIGN Act was passed by Congress in 2000 as a federal law that applies nationwide.',
    ],
    table: {
      headers: ['Aspect', 'ESIGN Act', 'UETA'],
      rows: [
        ['Level of law', 'Federal', 'State (adopted by 49 states)'],
        ['Year enacted', '2000', '1999 (model act)'],
        ['Scope', 'Interstate and foreign commerce', 'Intrastate transactions'],
        ['Technology neutrality', 'Yes', 'Yes'],
        ['Consumer consent provisions', 'Detailed requirements', 'Less detailed'],
        ['Preemption', 'Preempts inconsistent state laws', 'Can be modified by states adopting it'],
        ['Government agencies', 'Does not require government adoption', 'Applies to government transactions in most adopting states'],
      ],
    },
    content: [
      'The ESIGN Act includes a preemption provision: if a state has adopted UETA without modification, the state law governs and the federal ESIGN Act serves as a backstop. If a state has modified UETA or not adopted it, the federal ESIGN Act applies. This ensures that electronic signatures are valid everywhere in the United States regardless of state-level variations.',
    ],
  },
  {
    id: 'how-to-comply',
    title: 'How to Comply with the ESIGN Act',
    content: [
      'Compliance with the ESIGN Act is straightforward when you use a reputable e-signature platform. Here are the practical steps every business should follow:',
    ],
    bullets: [
      'Use a dedicated e-signature platform like eSignTap that captures intent, consent, and maintains a complete audit trail for every signed document',
      'Ensure all signers explicitly agree to conduct the transaction electronically before signing',
      'Maintain tamper-evident records of all signed documents, including the audit trail showing who signed, when, from where, and how they were authenticated',
      'Provide consumers with clear information about their right to receive paper copies and the right to withdraw electronic consent',
      'Store signed documents securely for the legally required retention period (varies by document type -- typically 3-7 years for business contracts)',
      'Use authentication methods (email verification, access codes, knowledge-based authentication) to verify signer identity, especially for high-value documents',
      'Keep records of the consent process itself, not just the signed documents',
    ],
    callout: 'eSignTap is designed for ESIGN Act compliance out of the box. Every document signed through eSignTap includes a tamper-evident seal, comprehensive audit trail, signer authentication, and secure cloud storage with automatic retention.',
  },
  {
    id: 'state-laws',
    title: 'State-Level E-Signature Laws',
    content: [
      'While the federal ESIGN Act provides a baseline of legal protection for electronic signatures, individual states have their own laws that can provide additional protections or requirements.',
      'Forty-nine states have adopted some version of UETA, often with state-specific modifications. For example, California\'s version of UETA includes provisions for digital signatures backed by certificates from the California Secretary of State. Illinois requires electronic signatures on certain real estate documents to use specific security measures. Texas adopted UETA with minimal modifications and also enacted the Texas Uniform Electronic Transactions Act.',
      'New York is the only state that did not adopt UETA. Instead, it enacted the Electronic Signatures and Records Act (ESRA) in 1999, which provides similar protections but with different procedural requirements. Under ESRA, electronic signatures are valid for most business and government transactions in New York.',
      'For businesses operating across multiple states, the practical advice is simple: use an e-signature platform like eSignTap that satisfies both the federal ESIGN Act and the strictest state-level requirements. This ensures your signed documents are enforceable everywhere in the United States without needing to track 50 different state laws.',
    ],
  },
]

const faqs = [
  { question: 'When was the ESIGN Act passed?', answer: 'The ESIGN Act was signed into law by President Bill Clinton on June 30, 2000. It took effect on October 1, 2000. The law was passed with broad bipartisan support to facilitate electronic commerce and remove legal barriers to digital transactions.' },
  { question: 'Does the ESIGN Act apply to all types of documents?', answer: 'The ESIGN Act applies to most contracts and business documents but has specific exemptions. Wills, certain family law documents (adoption, divorce), court orders, utility cancellation notices, health/life insurance cancellation notices, and hazardous materials transportation documents are excluded.' },
  { question: 'Can a state law override the ESIGN Act?', answer: 'States that have adopted UETA without significant modification can govern electronic transactions under their own law, with the ESIGN Act serving as a federal backstop. However, states cannot enact laws that are less protective of electronic signatures than the ESIGN Act. If a state law would invalidate electronic signatures that are valid under ESIGN, the federal law preempts the state law.' },
  { question: 'Does the ESIGN Act require a specific type of technology?', answer: 'No. The ESIGN Act is intentionally technology-neutral. It does not require or favor any specific type of electronic signature technology. A typed name, a drawn signature, a click-to-sign button, a biometric signature, and a PKI-based digital signature are all equally valid under the law.' },
  { question: 'Do I need to keep paper copies of electronically signed documents?', answer: 'No. Under the ESIGN Act, an electronic record satisfies any legal requirement for a written document. You do not need to maintain paper copies. However, you must ensure the electronic records are accurately preserved, accessible to all entitled parties, and capable of being reproduced for the legally required retention period.' },
  { question: 'What happens if someone disputes an electronic signature?', answer: 'If someone claims they did not sign a document electronically, the audit trail becomes critical evidence. A comprehensive audit trail from a platform like eSignTap -- showing the signer\'s email authentication, IP address, timestamp, device information, and signing actions -- provides strong evidence of who signed, when, and how.' },
  { question: 'Does the ESIGN Act apply to government agencies?', answer: 'The ESIGN Act does not require federal, state, or local government agencies to accept or use electronic records or signatures. However, many agencies have independently adopted electronic signature capabilities. The Government Paperwork Elimination Act (GPEA) of 1998 encouraged federal agencies to accept electronic submissions.' },
  { question: 'How does the ESIGN Act protect consumers?', answer: 'The ESIGN Act requires businesses to obtain affirmative consumer consent before delivering legally required disclosures electronically. Consumers must be informed of their right to receive paper copies, their right to withdraw consent, and the hardware/software requirements for accessing electronic records. These protections ensure consumers are not unknowingly trapped in electronic-only communications.' },
]

const keyTakeaways = [
  'The ESIGN Act (2000) is the federal law that makes electronic signatures legally binding across all 50 US states.',
  'Four requirements for validity: intent to sign, consent to electronic transactions, association of signature with record, and proper record retention.',
  'The law is technology-neutral -- any form of electronic signature can be valid, from typed names to cryptographic digital signatures.',
  'Specific exemptions exist for wills, family law documents, court orders, and certain consumer notices.',
  'Using an e-signature platform like eSignTap ensures automatic compliance by capturing audit trails, signer authentication, and secure document storage.',
]

const relatedGuides = [
  { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?' },
  { slug: 'eidas', name: 'eIDAS Regulation: EU Guide' },
  { slug: 'electronic-vs-digital-signature', name: 'Electronic vs Digital Signature' },
]

const relatedSolutions = [
  { slug: 'legal', name: 'Legal E-Signatures' },
  { slug: 'government', name: 'Government E-Signatures' },
]

export default function EsignActGuidePage() {
  return (
    <GuidePageTemplate
      title="ESIGN Act: Complete Guide to E-Signature Law"
      subtitle="Everything you need to know about the Electronic Signatures in Global and National Commerce Act -- the federal law that makes e-signatures legal in the United States."
      heroIcon={Gavel}
      accentColor="amber"
      tableOfContents={tableOfContents}
      sections={sections}
      faqs={faqs}
      keyTakeaways={keyTakeaways}
      relatedGuides={relatedGuides}
      relatedSolutions={relatedSolutions}
    />
  )
}
