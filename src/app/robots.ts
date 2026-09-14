import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.waseemabbas.online";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/tools",
          "/tools/*",
          "/tracker",
          "/agency",
          "/services",
          "/services/*",
          "/real-estate",
          "/real-estate/*",
          "/furniture",
          "/furniture/*",
          "/marketplace",
          "/marketplace/*",
          "/download",
          "/blog",
          "/blog/*",
          "/partners",
        ],
        disallow: [
          "/admin",
          "/admin/*",
          "/partners/dashboard",
          "/partners/dashboard/*",
          "/api/*",
          "/_next/*",
          "/*?*sort=*",
          "/*?*minPrice=*",
          "/*?*maxPrice=*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}