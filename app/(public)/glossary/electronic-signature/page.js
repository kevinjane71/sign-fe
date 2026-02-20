import GlossaryPageTemplate from '../../../components/GlossaryPageTemplate'

export const metadata = {
  title: 'What Is an Electronic Signature? | eSignTap',
  description: 'An electronic signature is any digital mark used to indicate agreement on a document. Learn how e-signatures work, their legal validity, and types.',
  keywords: 'what is an electronic signature, e-signature definition, electronic signature meaning, e-signature legal',
  alternates: { canonical: 'https://esigntap.com/glossary/electronic-signature' },
  openGraph: {
    title: 'What Is an Electronic Signature? | eSignTap',
    description: 'An electronic signature is any digital mark used to indicate agreement on a document.',
    url: 'https://esigntap.com/glossary/electronic-signature',
    siteName: 'eSignTap',
    type: 'article',
  },
}

export default function ElectronicSignaturePage() {
  return (
    <GlossaryPageTemplate
      term="Electronic Signature"
      definition="An electronic signature (e-signature) is any electronic symbol, sound, or process attached to or associated with a document that a person adopts with the intent to sign. It serves the same legal purpose as a handwritten signature but is created and applied digitally."
      longDescription={[
        'Electronic signatures encompass a broad category of methods used to indicate agreement or approval on digital documents. They can be as simple as typing your name into a signature field, drawing your signature with a mouse or finger on a touchscreen, or clicking an "I Agree" button. The key legal requirement is that the signer must demonstrate clear intent to sign.',
        'In the United States, electronic signatures are legally recognized under the ESIGN Act (2000) and UETA (1999). In the European Union, the eIDAS regulation provides a framework with three tiers of electronic signatures: simple, advanced, and qualified. Most everyday business transactions require only a simple electronic signature.',
        'Modern e-signature platforms like eSignTap add layers of security and evidence collection on top of the basic signature. These include audit trails, signer authentication, timestamps, and tamper-evident seals that make electronic signatures not only convenient but often more legally defensible than traditional wet signatures.',
      ]}
      keyPoints={[
        'Legally equivalent to handwritten signatures in most countries under laws like the ESIGN Act, UETA, and eIDAS.',
        'Can take many forms: typed names, drawn signatures, checkbox consent, or biometric input.',
        'Faster and more convenient than printing, signing, scanning, and mailing paper documents.',
        'E-signature platforms create audit trails that record when, where, and how a document was signed.',
        'Accepted for the vast majority of business, legal, and personal transactions.',
      ]}
      examples={[
        { title: 'Signing a Lease Agreement', description: 'A tenant receives a lease via email, reviews the terms, draws their signature on a touchscreen, and submits. Both parties receive a signed copy instantly.' },
        { title: 'Approving a Purchase Order', description: 'A procurement manager types their name into the signature field of a purchase order, clicks "Sign," and the vendor is notified automatically.' },
        { title: 'Employee Onboarding', description: 'A new hire signs their offer letter, tax forms, and company policies electronically from their phone before their first day.' },
      ]}
      faqs={[
        { question: 'Is an electronic signature legally binding?', answer: 'Yes. In the United States, the ESIGN Act and UETA give electronic signatures the same legal standing as handwritten signatures. Similar laws exist in the EU (eIDAS), UK, Canada, Australia, and most other countries.' },
        { question: 'What is the difference between an electronic signature and a digital signature?', answer: 'An electronic signature is the broad category that includes any method of signing electronically. A digital signature is a specific type of electronic signature that uses cryptographic encryption (PKI) to verify the signer\'s identity and ensure the document hasn\'t been altered.' },
        { question: 'Are there documents that cannot be signed electronically?', answer: 'A few document types are excluded in most jurisdictions, including wills and testaments, certain court orders, notices of cancellation of utility services, and documents related to hazardous materials. For the vast majority of business documents, e-signatures are fully valid.' },
        { question: 'How secure are electronic signatures?', answer: 'E-signature platforms use encryption, audit trails, multi-factor authentication, and tamper-evident technology to ensure documents remain secure and legally defensible. In many cases, they are more secure than paper signatures.' },
        { question: 'Do I need special software to create an electronic signature?', answer: 'You can create an electronic signature using a platform like eSignTap directly in your web browser. No special software or hardware is needed. Most platforms work on desktops, tablets, and smartphones.' },
      ]}
      relatedTerms={[
        { slug: 'digital-signature', name: 'Digital Signature' },
        { slug: 'wet-signature', name: 'Wet Signature' },
        { slug: 'esign-act', name: 'ESIGN Act' },
        { slug: 'legally-binding-signature', name: 'Legally Binding Signature' },
      ]}
      relatedGuides={[
        { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?' },
        { slug: 'electronic-vs-digital-signature', name: 'Electronic vs Digital Signature' },
      ]}
      relatedSolutions={[
        { slug: 'small-business', name: 'Small Business E-Signatures' },
        { slug: 'legal', name: 'Legal E-Signatures' },
      ]}
      relatedUseCases={[
        { slug: 'nda-signing', name: 'NDA Signing' },
        { slug: 'employment-contracts', name: 'Employment Contracts' },
      ]}
    />
  )
}
