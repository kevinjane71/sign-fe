import { Globe } from 'lucide-react'
import GuidePageTemplate from '../../../components/GuidePageTemplate'

export const metadata = {
  title: 'eIDAS Regulation: EU E-Signature Guide | eSignTap',
  description: 'Understand the eIDAS regulation for electronic signatures in the EU. Learn about SES, AES, and QES signature types, compliance, and cross-border recognition.',
  keywords: 'eIDAS regulation, eIDAS e-signatures, EU electronic signature, qualified electronic signature, advanced electronic signature',
  alternates: { canonical: 'https://esigntap.com/guides/eidas' },
  openGraph: {
    title: 'eIDAS Regulation: EU E-Signature Guide | eSignTap',
    description: 'Understand the eIDAS regulation for electronic signatures in the EU. SES, AES, QES types explained.',
    url: 'https://esigntap.com/guides/eidas',
    siteName: 'eSignTap',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eIDAS Regulation: EU E-Signature Guide | eSignTap',
    description: 'EU electronic signature rules and the three levels of eIDAS signatures.',
  },
}

const tableOfContents = [
  { id: 'what-is-eidas', title: 'What Is eIDAS?' },
  { id: 'three-types', title: 'Three Types of E-Signatures Under eIDAS' },
  { id: 'ses', title: 'Simple Electronic Signatures (SES)' },
  { id: 'aes', title: 'Advanced Electronic Signatures (AES)' },
  { id: 'qes', title: 'Qualified Electronic Signatures (QES)' },
  { id: 'eidas-vs-esign', title: 'eIDAS vs ESIGN Act Comparison' },
  { id: 'cross-border', title: 'Cross-Border Recognition' },
  { id: 'us-companies', title: 'Compliance for US Companies Doing EU Business' },
]

const sections = [
  {
    id: 'what-is-eidas',
    title: 'What Is eIDAS?',
    content: [
      'eIDAS (Electronic Identification, Authentication and Trust Services) is a European Union regulation (EU No 910/2014) that took effect on July 1, 2016. It establishes a comprehensive legal framework for electronic signatures, electronic seals, time stamps, electronic documents, electronic delivery services, and website authentication across all EU member states.',
      'eIDAS replaced the earlier EU Electronic Signatures Directive (1999/93/EC) and was designed to solve a critical problem: the original directive was implemented differently by each member state, creating legal uncertainty for cross-border electronic transactions. As an EU Regulation rather than a Directive, eIDAS is directly applicable in all member states without requiring national implementing legislation, creating a single, harmonized framework.',
      'For businesses, eIDAS provides legal certainty that electronic signatures are valid and enforceable across the entire European Union, the European Economic Area (EEA), and -- through post-Brexit legislation -- the United Kingdom. It is the foundation of digital trust in European commerce.',
    ],
  },
  {
    id: 'three-types',
    title: 'Three Types of E-Signatures Under eIDAS',
    content: [
      'One of the most important aspects of eIDAS is its three-tiered classification of electronic signatures. Each tier provides a different level of legal assurance and technical requirements, allowing businesses to choose the appropriate level based on their specific needs and risk profile.',
      'Unlike the US ESIGN Act, which treats all electronic signatures equally, eIDAS creates a hierarchy: Simple Electronic Signatures (SES) provide basic legal recognition, Advanced Electronic Signatures (AES) add identity verification and tamper detection, and Qualified Electronic Signatures (QES) provide the highest level of assurance and are legally equivalent to handwritten signatures across the entire EU.',
    ],
  },
  {
    id: 'ses',
    title: 'Simple Electronic Signatures (SES)',
    content: [
      'A Simple Electronic Signature (SES) is the broadest category under eIDAS. It is defined as "data in electronic form which is attached to or logically associated with other data in electronic form and which is used by the signatory to sign." This definition is intentionally broad and covers virtually any electronic indication of intent to sign.',
      'Examples of SES include typing your name in an email, clicking an "I Accept" button on a website, drawing a signature with your mouse or finger on a touchscreen, and pasting a scanned signature image into a document. SES signatures require no specific technology, identity verification, or security measures.',
    ],
    bullets: [
      'No specific technology requirements -- any electronic indication of signing intent qualifies',
      'Cannot be denied legal admissibility in court solely because it is electronic',
      'The most commonly used type of e-signature for everyday business transactions',
      'Sufficient for most B2B contracts, HR documents, and standard business agreements',
      'Used by platforms like eSignTap for standard signing workflows',
    ],
    callout: 'Under eIDAS Article 25(1), a court cannot refuse to admit an SES as evidence solely because it is electronic. However, the weight given to an SES is up to the court -- so having a strong audit trail (as eSignTap provides) significantly strengthens enforceability.',
  },
  {
    id: 'aes',
    title: 'Advanced Electronic Signatures (AES)',
    content: [
      'An Advanced Electronic Signature (AES) must meet four specific requirements defined in eIDAS Article 26. These requirements add identity verification and tamper detection beyond what a Simple Electronic Signature provides.',
      'The four requirements are: (1) the signature is uniquely linked to the signatory, (2) the signature is capable of identifying the signatory, (3) the signature is created using electronic signature creation data that the signatory can, with a high level of confidence, use under their sole control, and (4) the signature is linked to the data signed in such a way that any subsequent change in the data is detectable.',
    ],
    bullets: [
      'Uniquely linked to the signatory through identity verification (email, phone, ID check)',
      'Creates a tamper-evident seal so any changes after signing are detectable',
      'The signatory must have sole control over the signing process (password, biometric, device)',
      'Provides stronger legal presumption than SES -- shifts burden of proof',
      'Often implemented using digital certificates or advanced platform authentication',
      'Required for higher-risk transactions in many EU member states',
    ],
  },
  {
    id: 'qes',
    title: 'Qualified Electronic Signatures (QES)',
    content: [
      'A Qualified Electronic Signature (QES) is the gold standard under eIDAS. It is the only type of electronic signature that is explicitly given the legal equivalent of a handwritten signature across all EU member states, as stated in eIDAS Article 25(2). A QES from one member state must be recognized as a QES in all other member states.',
      'To create a QES, two conditions must be met: the signature must be based on a qualified certificate for electronic signatures issued by a qualified trust service provider (QTSP) listed on the EU Trusted List, and the signature must be created using a qualified electronic signature creation device (QSCD) -- a hardware or software component that meets strict security standards certified under eIDAS.',
    ],
    bullets: [
      'Legal equivalent of a handwritten signature in all 27 EU member states',
      'Requires a qualified certificate from an EU-recognized trust service provider (QTSP)',
      'Must be created using a qualified signature creation device (QSCD)',
      'Mandatory cross-border recognition -- a QES from France is valid in Germany, Italy, etc.',
      'Required for certain documents: real estate transactions in some countries, government filings, tax submissions',
      'Higher cost and complexity than SES or AES, but provides maximum legal certainty',
    ],
    callout: 'Most EU businesses use SES or AES for day-to-day operations and reserve QES for high-value or legally mandated transactions. eSignTap supports SES and AES workflows, and can guide you to QES providers when needed.',
  },
  {
    id: 'eidas-vs-esign',
    title: 'eIDAS vs ESIGN Act: How They Compare',
    content: [
      'While both eIDAS and the US ESIGN Act establish the legal validity of electronic signatures, their approaches differ significantly. Understanding these differences is crucial for businesses operating across the Atlantic.',
    ],
    table: {
      headers: ['Aspect', 'eIDAS (EU)', 'ESIGN Act (US)'],
      rows: [
        ['Jurisdiction', 'EU/EEA (27 member states)', 'United States (all 50 states)'],
        ['Year enacted', '2016 (replaced 1999 Directive)', '2000'],
        ['Type of law', 'Regulation (directly applicable)', 'Federal statute'],
        ['Signature tiers', 'Three: SES, AES, QES', 'No tiers -- all e-signatures treated equally'],
        ['Handwriting equivalence', 'Only QES equals handwritten', 'All e-signatures equal handwritten'],
        ['Technology requirements', 'QES requires certified devices/certificates', 'Technology-neutral -- no requirements'],
        ['Trust service providers', 'Regulated QTSPs on EU Trusted List', 'No equivalent -- market-driven'],
        ['Cross-border recognition', 'Mandatory QES recognition across EU', 'Not applicable (single country)'],
        ['Consumer consent', 'Varies by member state', 'Detailed federal requirements'],
        ['Scope beyond signatures', 'Covers seals, timestamps, e-delivery', 'Limited to signatures and records'],
      ],
    },
  },
  {
    id: 'cross-border',
    title: 'Cross-Border Recognition',
    content: [
      'One of eIDAS\'s most important achievements is establishing mandatory cross-border recognition of electronic signatures within the EU. Under Article 25(3), a Qualified Electronic Signature based on a qualified certificate issued in one member state must be recognized as a QES in all other member states. This eliminates the fragmented recognition that existed under the previous Directive.',
      'For Advanced and Simple Electronic Signatures, cross-border recognition is also supported but with less legal certainty. An AES from one member state is admissible as evidence in another, and courts should give it appropriate weight based on the security measures used. An SES is admissible everywhere but carries the least presumptive weight.',
      'Since January 2021, the United Kingdom has operated under its own version of eIDAS (UK eIDAS), incorporated through the European Union (Withdrawal) Act 2018. UK-issued QES certificates are still recognized within the UK, but their status in the EU is no longer guaranteed. UK businesses doing EU transactions should consider obtaining certificates from EU-based trust service providers to ensure seamless cross-border recognition.',
    ],
  },
  {
    id: 'us-companies',
    title: 'Compliance for US Companies Doing EU Business',
    content: [
      'US companies that do business with EU customers, partners, or subsidiaries need to understand how eIDAS affects their electronic signature practices. While there is no single "eIDAS certification" that a US company can obtain, there are practical steps to ensure compliance.',
      'For most B2B transactions with EU counterparties, a Simple Electronic Signature (SES) through a platform like eSignTap is legally sufficient. eIDAS explicitly states that SES cannot be denied legal effect simply because it is electronic, and most EU businesses accept SES for standard contracts and agreements.',
      'If your EU counterparty requires an Advanced Electronic Signature (AES), you will need to use a platform that provides stronger identity verification and tamper detection -- features that eSignTap includes in its standard workflow through email authentication, audit trails, and document integrity hashing.',
    ],
    bullets: [
      'For standard B2B contracts, an SES through eSignTap is sufficient and widely accepted in the EU',
      'For regulated industries or high-value transactions, consider AES with enhanced identity verification',
      'If QES is required (rare for US companies), partner with an EU-based Qualified Trust Service Provider',
      'Always check your specific EU counterparty\'s requirements -- some industries and countries have stricter norms',
      'Consider including a choice-of-law clause in contracts specifying which jurisdiction\'s e-signature law applies',
      'Maintain comprehensive audit trails to demonstrate the integrity and authenticity of your signatures under any legal framework',
    ],
    callout: 'When in doubt, ask your EU counterparty what level of electronic signature they require. In our experience, the vast majority of EU business transactions are conducted with SES or AES -- platforms like eSignTap cover both levels.',
  },
]

const faqs = [
  { question: 'What does eIDAS stand for?', answer: 'eIDAS stands for Electronic Identification, Authentication and Trust Services. It is an EU Regulation (No 910/2014) that provides a legal framework for electronic signatures, electronic seals, timestamps, and other trust services across all EU member states.' },
  { question: 'Do I need a Qualified Electronic Signature (QES) for all EU contracts?', answer: 'No. Most EU business contracts can be signed with a Simple Electronic Signature (SES) or Advanced Electronic Signature (AES). QES is typically only required for specific document types mandated by national law, such as certain real estate transactions, government filings, or tax submissions. For standard B2B agreements, SES from a platform like eSignTap is sufficient.' },
  { question: 'Is eIDAS valid in the UK after Brexit?', answer: 'Yes. The UK incorporated eIDAS into domestic law through the European Union (Withdrawal) Act 2018, creating what is known as "UK eIDAS." Electronic signatures remain fully valid in the UK. However, UK-issued qualified certificates may not be automatically recognized in the EU, so UK businesses doing EU transactions may want to obtain certificates from EU-based trust service providers.' },
  { question: 'How do I get a Qualified Electronic Signature?', answer: 'To obtain a QES, you need a qualified certificate from a Qualified Trust Service Provider (QTSP) listed on the EU Trusted List. The QTSP will verify your identity (often requiring in-person or video verification) and issue a certificate. The signature must be created using a qualified signature creation device (QSCD). Providers include companies like DocuSign (through EU QTSPs), Swisscom, and InfoCert.' },
  { question: 'Does eSignTap comply with eIDAS?', answer: 'Yes. eSignTap supports Simple Electronic Signatures (SES) and Advanced Electronic Signatures (AES) that comply with eIDAS requirements. All signatures include audit trails, signer authentication, and tamper-evident document sealing. For Qualified Electronic Signatures (QES), eSignTap can guide you to appropriate EU-based trust service providers.' },
  { question: 'What is the difference between eIDAS and the ESIGN Act?', answer: 'The ESIGN Act is a US federal law that treats all electronic signatures equally with no technology requirements. eIDAS is an EU regulation that creates three tiers of signatures (SES, AES, QES) with increasing levels of technical requirements and legal assurance. Only QES under eIDAS is automatically equivalent to a handwritten signature, while any e-signature under ESIGN has that equivalence.' },
]

const keyTakeaways = [
  'eIDAS is the EU regulation that governs electronic signatures across all 27 member states, establishing three tiers: SES, AES, and QES.',
  'For most business transactions, a Simple Electronic Signature (SES) through platforms like eSignTap is legally sufficient in the EU.',
  'Only Qualified Electronic Signatures (QES) are automatically equivalent to handwritten signatures across the entire EU.',
  'US companies doing EU business can typically use SES or AES -- QES is rarely required outside of government filings and specific regulated transactions.',
]

const relatedGuides = [
  { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?' },
  { slug: 'esign-act', name: 'ESIGN Act: Complete Guide' },
  { slug: 'electronic-vs-digital-signature', name: 'Electronic vs Digital Signature' },
]

const relatedSolutions = [
  { slug: 'legal', name: 'Legal E-Signatures' },
  { slug: 'finance', name: 'Finance & Banking' },
]

export default function EidasGuidePage() {
  return (
    <GuidePageTemplate
      title="eIDAS Regulation: EU E-Signature Guide"
      subtitle="A complete guide to electronic signatures under the European Union's eIDAS Regulation -- including the three signature types (SES, AES, QES), cross-border recognition, and compliance for international businesses."
      heroIcon={Globe}
      accentColor="slate"
      tableOfContents={tableOfContents}
      sections={sections}
      faqs={faqs}
      keyTakeaways={keyTakeaways}
      relatedGuides={relatedGuides}
      relatedSolutions={relatedSolutions}
    />
  )
}
