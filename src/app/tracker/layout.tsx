import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Daily Productivity & Business Goal Tracker | WATECH Founder Suite',
  description: 'Track daily deep work and milestones with AI mentor guidance.',
  keywords: ["Productivity tracker","Watech Tracker"],
  alternates: { canonical: 'https://www.waseemabbas.online/tracker' },
  openGraph: {
    title: 'AI Daily Productivity & Business Goal Tracker | WATECH Founder Suite',
    description: 'Track daily deep work and milestones with AI mentor guidance.',
    url: 'https://www.waseemabbas.online/tracker',
    siteName: 'WATECH Solutions Platform',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
