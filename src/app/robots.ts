import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://watech-solutions-platform-eight.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/services",
          "/services/*",
          "/marketplace",
          "/marketplace/*",
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