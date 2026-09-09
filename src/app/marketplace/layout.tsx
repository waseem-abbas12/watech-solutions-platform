import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace | Real Estate, Furniture & Events in Pakistan",
  description:
    "Explore verified Real Estate plots and houses, authentic handcrafted Chinioti Sheesham wood furniture, and signature banquet halls across Lahore, Islamabad, and Faisalabad.",
  alternates: {
    canonical: "https://watech-solutions-platform-eight.vercel.app/marketplace",
  },
  openGraph: {
    title: "WATECH Marketplace | Real Estate, Furniture & Events in Pakistan",
    description:
      "Direct verified marketplace connecting buyers with authentic properties, Chinioti furniture, and wedding banquets.",
    url: "https://watech-solutions-platform-eight.vercel.app/marketplace",
    type: "website",
  },
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}