import { Metadata } from "next";
import { getItemByCategoryAndId } from "@/lib/mock-data";

type Props = {
  params: Promise<{ category: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, id } = await params;
  const result = getItemByCategoryAndId(category, id);

  if (!result || !result.item) {
    return {
      title: "Listing Not Found | WATECH Marketplace",
      description: "The requested listing could not be found.",
    };
  }

  const item = result.item;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://watech-solutions-platform-eight.vercel.app";
  const canonicalUrl = `${siteUrl}/marketplace/${category}/${id}`;

  const title = (item as any).title || (item as any).name || "Marketplace Listing";
  const desc = (item.description || "").slice(0, 160);

  return {
    title: `${title} | WATECH Marketplace`,
    description: desc,
    // Mark demo items with noindex to avoid misleading Google search results
    robots: {
      index: false, // Demo data should not be indexed as genuine commercial inventory
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | WATECH Marketplace`,
      description: desc,
      url: canonicalUrl,
      images: [
        {
          url: item.image,
          alt: title,
        },
      ],
    },
  };
}

export default function ItemDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}