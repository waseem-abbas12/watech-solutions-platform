import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Daily Productivity & Business Goal Tracker | WATECH Founder Suite',
  description: 'Daily focus tracker, routine builder and AI mentor for Pakistani entrepreneurs, realtors and founders.',
  keywords: ["Productivity tracker Pakistan","Watech Tracker","Founder daily planner"],
  alternates: { canonical: 'https://www.waseemabbas.online/tracker' },
  openGraph: {
    title: 'AI Daily Productivity & Business Goal Tracker | WATECH Founder Suite',
    description: 'Daily focus tracker, routine builder and AI mentor for Pakistani entrepreneurs, realtors and founders.',
    url: 'https://www.waseemabbas.online/tracker',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
