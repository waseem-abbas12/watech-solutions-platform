import { Metadata } from "next";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const catLower = category.toLowerCase();

  const titles: Record<string, { title: string; desc: string }> = {
    properties: {
      title: "Real Estate Properties in Pakistan | Houses, Plots & Commercial",
      desc: "Browse verified residential plots, houses, and commercial property listings in DHA Lahore, Bahria Town, and Islamabad on WATECH.",
    },
    "real-estate": {
      title: "Real Estate Properties in Pakistan | Houses, Plots & Commercial",
      desc: "Browse verified residential plots, houses, and commercial property listings in DHA Lahore, Bahria Town, and Islamabad on WATECH.",
    },
    furniture: {
      title: "Authentic Chinioti Handcrafted Furniture | Sheesham Wood Luxury",
      desc: "Order authentic handcrafted Chinioti solid Sheesham wood bedroom sets, luxury sofas, and dining tables directly from master artisans.",
    },
    events: {
      title: "Signature Banquet Halls & Wedding Catering in Pakistan",
      desc: "Discover verified wedding marquees, luxury banquet halls, and royal catering services in Lahore, Islamabad, and Faisalabad.",
    },
  };

  const meta = titles[catLower] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Marketplace`,
    desc: `Browse verified ${category} listings on WATECH platform.`,
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://watech-solutions-platform-eight.vercel.app";

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: `${siteUrl}/marketplace/${catLower}`,
    },
    openGraph: {
      title: `${meta.title} | WATECH Marketplace`,
      description: meta.desc,
      url: `${siteUrl}/marketplace/${catLower}`,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}