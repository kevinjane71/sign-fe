import SubscriptionPlans from './price';

export const metadata = {
  title: 'Pricing - eSignTap | Affordable E-Signature Plans from $4.99/mo',
  description: 'Compare eSignTap pricing plans. Start free, upgrade anytime. Save up to 70% vs DocuSign. Plans from $4.99/month with unlimited documents.',
  keywords: 'e-signature pricing, DocuSign alternative pricing, affordable electronic signature, esigntap plans',
  alternates: {
    canonical: 'https://esigntap.com/pricing',
  },
}

export default function Page() {
  return <SubscriptionPlans />
}
