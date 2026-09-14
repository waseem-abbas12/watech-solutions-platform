import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentic Chinioti Handcrafted Furniture | WATECH Furniture',
  description: 'Order 100% pure Chinioti Sheesham wood bridal sets, luxury sofa sets, and dining tables at factory rates.',
  keywords: ["Chinioti furniture","Sheesham wood furniture","Watech Furniture"],
  alternates: { canonical: 'https://www.waseemabbas.online/furniture' },
  openGraph: {
    title: 'Authentic Chinioti Handcrafted Furniture | WATECH Furniture',
    description: 'Order 100% pure Chinioti Sheesham wood bridal sets, luxury sofa sets, and dining tables at factory rates.',
    url: 'https://www.waseemabbas.online/furniture',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
