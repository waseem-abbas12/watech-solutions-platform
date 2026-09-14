import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Digital Marketing & Growth Agency | WATECH Agency',
  description: 'Scale your business with high-ROAS Meta & TikTok ad campaigns, custom CRM, and sales funnels by WATECH Solutions.',
  keywords: ["Digital marketing agency Pakistan","Meta ads agency Lahore","Watech Agency"],
  alternates: { canonical: 'https://www.waseemabbas.online/agency' },
  openGraph: {
    title: 'Performance Digital Marketing & Growth Agency | WATECH Agency',
    description: 'Scale your business with high-ROAS Meta & TikTok ad campaigns, custom CRM, and sales funnels by WATECH Solutions.',
    url: 'https://www.waseemabbas.online/agency',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
