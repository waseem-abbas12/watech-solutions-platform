import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Knowledge Hub | WATECH Solutions",
  description:
    "Actionable market insights, investment analysis, and expert guides covering Real Estate properties, Chinioti handcrafted furniture, and Food & Catering in Pakistan.",
  alternates: {
    canonical: "https://www.waseemabbas.online/blog",
  },
  openGraph: {
    title: "WATECH Blog | Business, Real Estate & Craftsmanship in Pakistan",
    description:
      "Expert knowledge hub for investors, homeowners, and growth-minded entrepreneurs.",
    url: "https://www.waseemabbas.online/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}