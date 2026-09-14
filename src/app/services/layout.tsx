import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Growth & Automation Services | WATECH Solutions',
  description: 'Full-stack digital growth services: Meta Ads, Google Ads, TikTok Ads, and WhatsApp automation.',
  keywords: ["Digital services Pakistan","Watech Solutions"],
  alternates: { canonical: 'https://www.waseemabbas.online/services' },
  openGraph: {
    title: 'Digital Growth & Automation Services | WATECH Solutions',
    description: 'Full-stack digital growth services: Meta Ads, Google Ads, TikTok Ads, and WhatsApp automation.',
    url: 'https://www.waseemabbas.online/services',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
