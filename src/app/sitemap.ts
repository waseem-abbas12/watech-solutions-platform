import { MetadataRoute } from "next";
import {
  INITIAL_BLOG_POSTS,
  INITIAL_PROPERTIES,
  INITIAL_FURNITURE,
  INITIAL_EVENTS,
} from "@/lib/mock-data";
import { DIGITAL_SERVICES } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.waseemabbas.online";

  const currentDate = new Date().toISOString();

  // Core Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketplace/properties`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/marketplace/furniture`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/marketplace/food-catering`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/track`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Digital Service Detail Routes (7 Services)
  const serviceRoutes: MetadataRoute.Sitemap = DIGITAL_SERVICES.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Blog Article Detail Routes
  const blogRoutes: MetadataRoute.Sitemap = INITIAL_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Marketplace Real Estate Detail Routes
  const propertyRoutes: MetadataRoute.Sitemap = INITIAL_PROPERTIES.map((prop) => ({
    url: `${baseUrl}/marketplace/properties/${prop.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Marketplace Furniture Detail Routes
  const furnitureRoutes: MetadataRoute.Sitemap = INITIAL_FURNITURE.map((furn) => ({
    url: `${baseUrl}/marketplace/furniture/${furn.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Marketplace Food & Catering Detail Routes
  const foodRoutes: MetadataRoute.Sitemap = INITIAL_EVENTS.map((food) => ({
    url: `${baseUrl}/marketplace/food-catering/${food.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...propertyRoutes,
    ...furnitureRoutes,
    ...foodRoutes,
  ];
}
