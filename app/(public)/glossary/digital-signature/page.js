import GlossaryPageTemplate from '../../../components/GlossaryPageTemplate'

export const metadata = {
  title: 'What Is a Digital Signature? | eSignTap',
  description: 'A digital signature is a cryptographic type of electronic signature that uses PKI to verify identity and document integrity. Learn how it works.',
  keywords: 'what is a digital signature, digital signature definition, PKI signature, cryptographic signature',
  alternates: { canonical: 'https://esigntap.com/glossary/digital-signature' },
  openGraph: {
    title: 'What Is a Digital Signature? | eSignTap',
    description: 'A digital signature uses cryptographic technology to verify signer identity and document integrity.',
    url: 'https://esigntap.com/glossary/digital-signature',
    siteName: 'eSignTap',
    type: 'article',
  },
}

export default function DigitalSignaturePage() {
  return (
    <GlossaryPageTemplate
      term="Digital Signature"
      definition="A digital signature is a specific type of electronic signature that uses public key infrastructure (PKI) cryptography to verify the signer's identity and ensure the signed document has not been altered after signing."
      longDescription={[
        'Digital signatures rely on a mathematical scheme involving a pair of cryptographic keys: a private key (known only to the signer) and a public key (available to anyone who needs to verify the signature). When a person signs a document digitally, the software creates a unique hash of the document content and encrypts it with the signer\'s private key. The recipient can then use the signer\'s public key to decrypt the hash and verify both the identity of the signer and the integrity of the document.',
        'While all digital signatures are electronic signatures, not all electronic signatures are digital signatures. A simple typed name or drawn signature is an electronic signature but not a digital signature. Digital signatures provide a higher level of security and non-repudiation, making them particularly valuable for regulated industries, government documents, and high-value contracts.',
        'Under the eIDAS regulation in the EU, digital signatures using qualified certificates from trusted service providers achieve the highest legal standing as Qualified Electronic Signatures (QES). In the United States, both standard electronic signatures and digital signatures are legally valid under the ESIGN Act, though certain industries may require the added security of digital signatures.',
      ]}
      keyPoints={[
        'Uses PKI (public key infrastructure) with a private and public key pair to create and verify signatures.',
        'Provides tamper evidence: any change to the document after signing invalidates the signature.',
        'Offers non-repudiation, meaning the signer cannot credibly deny having signed the document.',
        'Required or preferred for certain regulated industries such as government, healthcare, and finance.',
        'Recognized as the highest tier (Qualified Electronic Signature) under EU eIDAS regulation.',
      ]}
      examples={[
        { title: 'Government Contract Filing', description: 'A defense contractor digitally signs a proposal using a certificate-based digital signature issued by an approved certificate authority, meeting federal procurement requirements.' },
        { title: 'Software Code Signing', description: 'A software developer digitally signs their application code so that users can verify the software has not been tampered with and truly comes from the stated publisher.' },
      ]}
      faqs={[
        { question: 'What is the difference between a digital signature and an electronic signature?', answer: 'An electronic signature is any method of indicating agreement electronically (typed name, drawn signature, click-to-sign). A digital signature is a specific type of electronic signature that uses cryptographic PKI technology to verify the signer\'s identity and detect any document tampering.' },
        { question: 'Do I need a digital signature for business documents?', answer: 'For most business documents like contracts, NDAs, and invoices, a standard electronic signature is legally sufficient and much simpler to use. Digital signatures are typically required only for specific government, financial, or regulatory use cases.' },
        { question: 'How do I get a digital signature certificate?', answer: 'Digital signature certificates are issued by Certificate Authorities (CAs) such as DigiCert, GlobalSign, or government-approved providers. The process involves identity verification and may take a few days depending on the level of assurance required.' },
        { question: 'Are digital signatures more legally binding than electronic signatures?', answer: 'In most jurisdictions, both are equally legally binding for standard business transactions. However, digital signatures offer stronger evidence of identity and document integrity, which can be advantageous in disputes or highly regulated contexts.' },
        { question: 'Can digital signatures be forged?', answer: 'Modern digital signatures using strong cryptographic algorithms are extremely difficult to forge. The private key would need to be compromised for forgery to occur, which is why protecting private keys is essential.' },
      ]}
      relatedTerms={[
        { slug: 'electronic-signature', name: 'Electronic Signature' },
        { slug: 'audit-trail', name: 'Audit Trail' },
        { slug: 'signer-authentication', name: 'Signer Authentication' },
        { slug: 'eidas', name: 'eIDAS' },
      ]}
      relatedGuides={[
        { slug: 'electronic-vs-digital-signature', name: 'Electronic vs Digital Signature' },
        { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?' },
      ]}
      relatedSolutions={[
        { slug: 'legal', name: 'Legal E-Signatures' },
        { slug: 'government', name: 'Government E-Signatures' },
      ]}
      relatedUseCases={[
        { slug: 'sales-contracts', name: 'Sales Contracts' },
        { slug: 'vendor-agreements', name: 'Vendor Agreements' },
      ]}
    />
  )
}
