import GlossaryPageTemplate from '../../../components/GlossaryPageTemplate'

export const metadata = {
  title: 'What Is eIDAS? | eSignTap',
  description: 'eIDAS is the EU regulation governing electronic signatures, seals, and trust services. Learn about its three signature levels and legal implications.',
  keywords: 'what is eIDAS regulation, eIDAS definition, EU electronic signature law, eIDAS signature levels',
  alternates: { canonical: 'https://esigntap.com/glossary/eidas' },
  openGraph: {
    title: 'What Is eIDAS? | eSignTap',
    description: 'eIDAS is the EU regulation that establishes a legal framework for electronic signatures and trust services.',
    url: 'https://esigntap.com/glossary/eidas',
    siteName: 'eSignTap',
    type: 'article',
  },
}

export default function EidasPage() {
  return (
    <GlossaryPageTemplate
      term="eIDAS"
      definition="eIDAS (electronic IDentification, Authentication, and trust Services) is a European Union regulation that provides a standardized legal framework for electronic signatures, electronic seals, timestamps, and other trust services across all EU member states."
      longDescription={[
        'The eIDAS regulation (EU No 910/2014) came into effect on July 1, 2016, replacing the earlier Electronic Signatures Directive (1999/93/EC). Unlike a directive, which member states implement through their own national laws, eIDAS is a regulation that applies directly and uniformly across all EU and EEA member states. This ensures that an electronic signature valid in Germany is equally valid in France, Italy, or any other member state.',
        'eIDAS defines three levels of electronic signatures, each with increasing legal weight and security requirements. Simple Electronic Signatures (SES) are the broadest category and include any data in electronic form attached to or associated with other electronic data. Advanced Electronic Signatures (AES) must be uniquely linked to the signatory, capable of identifying the signatory, created using data under the signatory\'s sole control, and linked to the signed data in a way that detects any subsequent changes. Qualified Electronic Signatures (QES) meet all AES requirements and are additionally created by a qualified signature creation device and based on a qualified certificate issued by a trust service provider.',
        'For most business-to-business and business-to-consumer transactions in the EU, a simple electronic signature is legally sufficient. However, some member states require advanced or qualified electronic signatures for specific document types, such as real estate transfers or government filings. Qualified Electronic Signatures have the unique legal property of being automatically equivalent to handwritten signatures in all EU member states.',
      ]}
      keyPoints={[
        'EU regulation (not a directive) that applies directly and uniformly across all EU and EEA member states.',
        'Defines three signature levels: Simple (SES), Advanced (AES), and Qualified (QES).',
        'Qualified Electronic Signatures are legally equivalent to handwritten signatures throughout the EU.',
        'Also covers electronic seals, timestamps, registered delivery services, and website authentication certificates.',
        'Replaced the earlier Electronic Signatures Directive (1999/93/EC) and took effect July 1, 2016.',
      ]}
      examples={[
        { title: 'Cross-Border B2B Contract', description: 'A French company and a German supplier sign a supply agreement using simple electronic signatures. Under eIDAS, the contract is legally valid in both countries without additional formalities.' },
        { title: 'Government Filing with QES', description: 'A citizen in Italy submits a legal filing to a government authority using a Qualified Electronic Signature created with a smart card from a qualified trust service provider, giving the filing the same weight as a handwritten signature.' },
      ]}
      faqs={[
        { question: 'What are the three levels of eIDAS signatures?', answer: 'Simple Electronic Signatures (SES) include any form of electronic signing. Advanced Electronic Signatures (AES) must uniquely identify the signer and detect any post-signing changes. Qualified Electronic Signatures (QES) require a qualified certificate and a qualified signature creation device, and are legally equivalent to handwritten signatures across the EU.' },
        { question: 'Does eIDAS apply outside the EU?', answer: 'eIDAS directly applies within EU and EEA member states. The UK adopted its own version (UK eIDAS) after Brexit. Other countries have their own frameworks, but eIDAS is often referenced as a global standard for electronic signature regulation.' },
        { question: 'Which eIDAS signature level do I need?', answer: 'For most business transactions, a Simple Electronic Signature (SES) is legally sufficient. Check your specific industry and member state requirements, as some documents (e.g., real estate transfers in certain countries) may require Advanced or Qualified signatures.' },
        { question: 'How is eIDAS different from the ESIGN Act?', answer: 'eIDAS is a European regulation with a tiered system (SES, AES, QES) and detailed requirements for trust service providers. The ESIGN Act is a U.S. federal law that takes a simpler, technology-neutral approach. Both achieve the same goal of making electronic signatures legally valid.' },
        { question: 'What is a Qualified Trust Service Provider?', answer: 'A Qualified Trust Service Provider (QTSP) is an organization audited and approved by an EU member state supervisory body to issue qualified certificates for electronic signatures, seals, and timestamps. Only certificates from QTSPs can be used to create Qualified Electronic Signatures.' },
      ]}
      relatedTerms={[
        { slug: 'esign-act', name: 'ESIGN Act' },
        { slug: 'ueta', name: 'UETA' },
        { slug: 'digital-signature', name: 'Digital Signature' },
        { slug: 'electronic-signature', name: 'Electronic Signature' },
      ]}
      relatedGuides={[
        { slug: 'eidas', name: 'eIDAS Regulation: EU Guide' },
        { slug: 'legally-binding', name: 'Are E-Signatures Legally Binding?' },
      ]}
      relatedSolutions={[
        { slug: 'legal', name: 'Legal E-Signatures' },
        { slug: 'government', name: 'Government E-Signatures' },
      ]}
      relatedUseCases={[
        { slug: 'vendor-agreements', name: 'Vendor Agreements' },
        { slug: 'sales-contracts', name: 'Sales Contracts' },
      ]}
    />
  )
}
