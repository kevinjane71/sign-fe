import GlossaryPageTemplate from '../../../components/GlossaryPageTemplate'

export const metadata = {
  title: 'What Is a Wet Signature? | eSignTap',
  description: 'A wet signature is a handwritten signature made with ink on a physical document. Learn when wet signatures are required and how e-signatures compare.',
  keywords: 'what is a wet signature, wet signature definition, ink signature, handwritten signature vs electronic',
  alternates: { canonical: 'https://esigntap.com/glossary/wet-signature' },
  openGraph: {
    title: 'What Is a Wet Signature? | eSignTap',
    description: 'A wet signature is a traditional handwritten ink signature on a physical document.',
    url: 'https://esigntap.com/glossary/wet-signature',
    siteName: 'eSignTap',
    type: 'article',
  },
}

export default function WetSignaturePage() {
  return (
    <GlossaryPageTemplate
      term="Wet Signature"
      definition="A wet signature is a traditional handwritten signature created by physically applying ink to a paper document using a pen. The term 'wet' refers to the ink being wet on the page at the moment of signing."
      longDescription={[
        'Wet signatures have been the standard method of authenticating documents for centuries. The act of physically signing a document with ink creates a unique, personal mark that is tied to the individual signer. Historically, wet signatures have served as the primary evidence of a person\'s intent to agree to or authorize the contents of a document.',
        'With the passage of laws like the ESIGN Act (2000) and UETA (1999) in the United States, and eIDAS in the European Union, electronic signatures now carry the same legal weight as wet signatures for the vast majority of transactions. However, a small number of document types still require wet signatures by law, including most wills, certain court documents, and specific government forms.',
        'Many organizations are transitioning from wet signatures to electronic signatures to reduce turnaround times, lower costs, and improve document tracking. Where a wet-signed contract might take days or weeks to circulate by mail, an electronically signed document can be completed in minutes. Despite this shift, understanding when a wet signature is still legally required remains important for compliance.',
      ]}
      keyPoints={[
        'The traditional form of signing documents, used for centuries before electronic alternatives emerged.',
        'Still legally required for a narrow set of documents, including wills, certain court orders, and specific notarized documents.',
        'Slower and more costly than electronic signatures due to printing, mailing, and physical storage requirements.',
        'Lacks the built-in audit trail and tamper evidence that electronic signature platforms provide.',
        'Increasingly being replaced by e-signatures in business, real estate, HR, and legal workflows.',
      ]}
      examples={[
        { title: 'Signing a Last Will and Testament', description: 'Most jurisdictions require wills to be signed with a wet signature in the presence of witnesses, making this one of the few remaining documents where ink signatures are legally mandated.' },
        { title: 'Notarized Real Estate Deed', description: 'While many real estate documents can now be signed electronically, certain deeds and closing documents in some states still require wet signatures in the presence of a notary public.' },
      ]}
      faqs={[
        { question: 'Is a wet signature more legally valid than an electronic signature?', answer: 'No. Under the ESIGN Act, UETA, and similar laws worldwide, electronic signatures and wet signatures hold equal legal standing for the vast majority of documents. In fact, e-signatures often provide better evidence of intent through audit trails.' },
        { question: 'What documents still require a wet signature?', answer: 'The most common exceptions include wills and testaments, certain court orders, documents related to family law (adoption, divorce in some states), notices of cancellation for utility services, and documents governed by the Uniform Commercial Code (like negotiable instruments).' },
        { question: 'Can I scan a wet signature and use it electronically?', answer: 'A scanned image of a wet signature can be used as an electronic signature in some contexts, but it lacks the security features (audit trail, authentication, tamper detection) that a proper e-signature platform provides. For legal defensibility, a dedicated e-signature solution is recommended.' },
        { question: 'Why is it called a "wet" signature?', answer: 'The term "wet" comes from the fact that ink is physically wet when it first touches the paper. It distinguishes traditional ink signatures from electronic or digital signatures, which involve no physical ink.' },
      ]}
      relatedTerms={[
        { slug: 'electronic-signature', name: 'Electronic Signature' },
        { slug: 'legally-binding-signature', name: 'Legally Binding Signature' },
        { slug: 'digital-signature', name: 'Digital Signature' },
      ]}
      relatedGuides={[
        { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?' },
        { slug: 'how-to-sign-pdf', name: 'How to Sign a PDF Online (Free)' },
      ]}
      relatedSolutions={[
        { slug: 'real-estate', name: 'Real Estate E-Signatures' },
        { slug: 'legal', name: 'Legal E-Signatures' },
      ]}
      relatedUseCases={[
        { slug: 'lease-agreements', name: 'Lease Agreements' },
        { slug: 'consent-forms', name: 'Consent Forms' },
      ]}
    />
  )
}
