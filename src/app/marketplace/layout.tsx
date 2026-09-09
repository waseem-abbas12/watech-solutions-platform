import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace | Real Estate, Furniture & Food & Catering in Pakistan",
  description:
    "Explore verified Real Estate plots and houses, authentic handcrafted Chinioti Sheesham wood furniture, and top-rated Food & Catering providers across Lahore, Islamabad, Karachi, and Faisalabad.",
  alternates: {
    canonical: "https://watech-solutions-platform-eight.vercel.app/marketplace",
  },
  openGraph: {
    title: "WATECH Marketplace | Real Estate, Furniture & Food & Catering in Pakistan",
    description:
      "Direct verified marketplace connecting buyers with authentic properties, Chinioti furniture, and premium Food & Catering services.",
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