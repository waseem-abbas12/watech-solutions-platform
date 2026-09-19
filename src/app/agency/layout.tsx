import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Marketing & Meta Ads Agency | WATECH Agency',
  description:
    'Scale your brand with high-ROAS Meta & TikTok ads, real estate buyer pipelines, custom Next.js web apps & CRM across Pakistan.',
  keywords: [
    'Digital marketing agency Pakistan',
    'Digital marketing agency in Lahore',
    'Meta ads agency Lahore DHA Gulberg',
    'Real estate marketing agency Islamabad',
    'Facebook ads agency Faisalabad',
    'Performance marketing agency Karachi',
    'Lead generation agency Pakistan',
    'Watech Digital Agency',
  ],
  alternates: { canonical: 'https://www.waseemabbas.online/agency' },
  openGraph: {
    title: 'Digital Marketing & Meta Ads Agency | WATECH Agency',
    description:
      'Scale your brand with high-ROAS Meta & TikTok ads, real estate buyer pipelines, custom Next.js web apps & CRM across Pakistan.',
    url: 'https://www.waseemabbas.online/agency',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'WATECH Performance Digital Agency',
    url: 'https://www.waseemabbas.online/agency',
    image: 'https://www.waseemabbas.online/images/watech-official-logo.png',
    description:
      'Performance digital marketing, Meta Ads, TikTok campaigns, real estate buyer pipelines, and automated WhatsApp CRM across Pakistan.',
    telephone: '+923270831470',
    email: 'waseem000094@gmail.com',
    priceRange: 'PKR',
    areaServed: [
      { '@type': 'City', name: 'Lahore' },
      { '@type': 'City', name: 'Islamabad' },
      { '@type': 'City', name: 'Rawalpindi' },
      { '@type': 'City', name: 'Faisalabad' },
      { '@type': 'City', name: 'Karachi' },
      { '@type': 'City', name: 'Chiniot' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

