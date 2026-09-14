import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100 Free Pakistan Business Tools & Calculators | WATECH Hub',
  description: 'Free COD courier return calculator, profit margin analyzer, and ROAS calculators.',
  keywords: ["Free business tools Pakistan","Watech Tools"],
  alternates: { canonical: 'https://www.waseemabbas.online/tools' },
  openGraph: {
    title: '100 Free Pakistan Business Tools & Calculators | WATECH Hub',
    description: 'Free COD courier return calculator, profit margin analyzer, and ROAS calculators.',
    url: 'https://www.waseemabbas.online/tools',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
