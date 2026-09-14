import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Digital Marketing & Growth Agency | WATECH Agency',
  description: 'Scale your business with high-ROAS Meta & TikTok ads, custom CRM, and sales funnels.',
  keywords: ["Digital marketing Pakistan","Meta ads agency","Watech Agency"],
  alternates: { canonical: 'https://www.waseemabbas.online/agency' },
  openGraph: {
    title: 'Performance Digital Marketing & Growth Agency | WATECH Agency',
    description: 'Scale your business with high-ROAS Meta & TikTok ads, custom CRM, and sales funnels.',
    url: 'https://www.waseemabbas.online/agency',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
