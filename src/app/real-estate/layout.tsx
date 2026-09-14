import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plots & Properties for Sale in Pakistan | WATECH Real Estate',
  description: 'Explore verified houses, plots, and installment schemes in Lahore, Islamabad, Karachi & Chiniot.',
  keywords: ["Plots for sale","Houses for sale Pakistan","Watech Real Estate"],
  alternates: { canonical: 'https://www.waseemabbas.online/real-estate' },
  openGraph: {
    title: 'Plots & Properties for Sale in Pakistan | WATECH Real Estate',
    description: 'Explore verified houses, plots, and installment schemes in Lahore, Islamabad, Karachi & Chiniot.',
    url: 'https://www.waseemabbas.online/real-estate',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
