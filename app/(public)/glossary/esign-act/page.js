import GlossaryPageTemplate from '../../../components/GlossaryPageTemplate'

export const metadata = {
  title: 'What Is the ESIGN Act? | eSignTap',
  description: 'The ESIGN Act is a U.S. federal law that makes electronic signatures legally binding. Learn its requirements, scope, and how it applies to your documents.',
  keywords: 'what is the ESIGN Act, ESIGN Act definition, electronic signatures in global and national commerce act, e-signature law',
  alternates: { canonical: 'https://esigntap.com/glossary/esign-act' },
  openGraph: {
    title: 'What Is the ESIGN Act? | eSignTap',
    description: 'The ESIGN Act is the U.S. federal law making electronic signatures legally valid.',
    url: 'https://esigntap.com/glossary/esign-act',
    siteName: 'eSignTap',
    type: 'article',
  },
}

export default function EsignActPage() {
  return (
    <GlossaryPageTemplate
      term="ESIGN Act"
      definition="The ESIGN Act (Electronic Signatures in Global and National Commerce Act) is a United States federal law enacted in 2000 that gives electronic signatures and electronic records the same legal validity as handwritten signatures and paper documents in interstate and international commerce."
      longDescription={[
        'Signed into law by President Bill Clinton on June 30, 2000, the ESIGN Act was a landmark piece of legislation that removed legal barriers to the use of electronic signatures in commerce. The act establishes that a contract or signature "may not be denied legal effect, validity, or enforceability solely because it is in electronic form." This simple but powerful principle opened the door for businesses to conduct transactions digitally.',
        'The ESIGN Act applies to transactions in interstate or foreign commerce and works alongside the Uniform Electronic Transactions Act (UETA), which individual states have adopted. While UETA operates at the state level, the ESIGN Act provides a federal baseline ensuring that no state can refuse to recognize electronic signatures for qualifying transactions. Together, these laws form the legal foundation for electronic commerce in the United States.',
        'To be valid under the ESIGN Act, certain consumer protection requirements must be met. When a business sends records to consumers electronically (rather than on paper), the consumer must affirmatively consent to receive electronic records, and the business must inform the consumer of their right to receive paper copies. The act also excludes specific document types, including wills, family law matters, court orders, and certain notices related to insurance and utilities.',
      ]}
      keyPoints={[
        'Federal law enacted in 2000 giving electronic signatures the same legal weight as ink signatures.',
        'Applies to interstate and international commercial transactions conducted in or affecting the United States.',
        'Works in conjunction with UETA, which has been adopted by 49 states and the District of Columbia.',
        'Requires consumer consent before delivering records electronically in consumer transactions.',
        'Excludes certain documents: wills, family law orders, court orders, utility cancellation notices, and insurance cancellations.',
      ]}
      examples={[
        { title: 'Online Software License Agreement', description: 'A customer clicks "I Accept" on a SaaS agreement during checkout. Under the ESIGN Act, this click-to-sign action constitutes a legally valid electronic signature binding both parties.' },
        { title: 'Cross-State Business Contract', description: 'A company in California and a vendor in New York negotiate and sign a services agreement electronically. The ESIGN Act ensures this contract is enforceable across state lines.' },
        { title: 'Consumer Loan Application', description: 'A borrower applies for a personal loan online and e-signs the loan agreement. The lender first obtains the borrower\'s consent to receive documents electronically, satisfying ESIGN Act consumer protections.' },
      ]}
      faqs={[
        { question: 'Does the ESIGN Act apply to all documents?', answer: 'No. The ESIGN Act excludes wills, codicils, and testamentary trusts; documents governed by the Uniform Commercial Code (other than certain sections); court orders and notices; cancellation notices for health and life insurance; product recall notices; and documents related to hazardous materials transportation.' },
        { question: 'What is the difference between the ESIGN Act and UETA?', answer: 'The ESIGN Act is a federal law providing a nationwide baseline for e-signature legality. UETA is a model state law adopted by individual states. When both apply, they work together. If a state has enacted UETA, it generally governs. If there is a conflict, the ESIGN Act preempts state law to ensure electronic signatures remain valid.' },
        { question: 'Do I need to use a specific e-signature platform to comply with the ESIGN Act?', answer: 'No. The ESIGN Act is technology-neutral and does not mandate any specific platform, technology, or method. Any electronic process that captures the signer\'s intent and consent can be valid. However, using a platform with audit trails and authentication (like eSignTap) makes it easier to prove validity if challenged.' },
        { question: 'Does the ESIGN Act apply to international transactions?', answer: 'The ESIGN Act applies to transactions in foreign commerce that affect the United States. For purely international transactions between parties outside the U.S., local laws (such as eIDAS in the EU) would govern instead.' },
        { question: 'What happens if an e-signature is challenged in court?', answer: 'The burden of proof typically falls on the party challenging the signature. E-signature platforms that maintain detailed audit trails, IP address logs, timestamps, and authentication records provide strong evidence of the signature\'s validity under the ESIGN Act.' },
      ]}
      relatedTerms={[
        { slug: 'ueta', name: 'UETA' },
        { slug: 'electronic-signature', name: 'Electronic Signature' },
        { slug: 'legally-binding-signature', name: 'Legally Binding Signature' },
        { slug: 'eidas', name: 'eIDAS' },
      ]}
      relatedGuides={[
        { slug: 'esign-act', name: 'ESIGN Act: Complete Guide' },
        { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?' },
      ]}
      relatedSolutions={[
        { slug: 'legal', name: 'Legal E-Signatures' },
        { slug: 'finance', name: 'Finance & Banking E-Signatures' },
      ]}
      relatedUseCases={[
        { slug: 'sales-contracts', name: 'Sales Contracts' },
        { slug: 'nda-signing', name: 'NDA Signing' },
      ]}
    />
  )
}
