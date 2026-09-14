import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '100 Free Pakistan Business Tools & Calculators | WATECH Hub',
  description: '100% Free COD courier return calculator, profit margin analyzer, TikTok & Meta ROAS calculators built for Pakistani businesses.',
  keywords: ["Free business tools Pakistan","Watech Tools","COD courier return calculator","ROAS calculator Pakistan"],
  alternates: { canonical: 'https://www.waseemabbas.online/tools' },
  openGraph: {
    title: '100 Free Pakistan Business Tools & Calculators | WATECH Hub',
    description: '100% Free COD courier return calculator, profit margin analyzer, TikTok & Meta ROAS calculators built for Pakistani businesses.',
    url: 'https://www.waseemabbas.online/tools',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
