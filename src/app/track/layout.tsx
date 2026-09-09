import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Inquiry & Project Status | Watech Solutions",
  description:
    "Real-time self-service lead tracking for Real Estate site visits, Chinioti furniture dispatch, and catering reservations. Enter your Lead ID or registered phone number.",
  openGraph: {
    title: "Track Your Inquiry | Watech Solutions Pakistan",
    description:
      "Check live status, assigned advisor, and milestone timeline for your property, furniture, or catering request.",
  },
};

export default function TrackLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
