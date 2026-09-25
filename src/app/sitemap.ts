import { MetadataRoute } from "next";
import {
  INITIAL_BLOG_POSTS,
  INITIAL_PROPERTIES,
  INITIAL_FURNITURE,
  INITIAL_EVENTS,
} from "@/lib/mock-data";
import { DIGITAL_SERVICES } from "@/lib/services-data";
import { TOOLS_REGISTRY } from "@/data/toolsRegistry";
import { LOCATIONS_DATA } from "@/data/locationsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.waseemabbas.online";

  const currentDate = new Date().toISOString();

  // Multi-Language Alternate Hreflang Generator for Google XML Sitemap
  const getAlternates = (path: string = "") => ({
    languages: {
      en: `${baseUrl}${path}?lang=en`,
      ur: `${baseUrl}${path}?lang=ur`,
      "ur-Latn": `${baseUrl}${path}?lang=roman`,
      "x-default": `${baseUrl}${path}`,
    },
  });

  // High-Priority Organic Traffic Magnet Hubs & Core Landing Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: getAlternates(),
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95, // Local SEO Hub Index
      alternates: getAlternates("/locations"),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0, // Major Traffic Magnet
      alternates: getAlternates("/tools"),
    },
    {
      url: `${baseUrl}/tracker`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0, // High-Retention Growth Funnel
      alternates: getAlternates("/tracker"),
    },
    {
      url: `${baseUrl}/agency`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95, // Primary High-Ticket Conversion Goal
      alternates: getAlternates("/agency"),
    },
    {
      url: `${baseUrl}/real-estate`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95, // Core Sector
      alternates: getAlternates("/real-estate"),
    },
    {
      url: `${baseUrl}/furniture`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95, // Core Sector
      alternates: getAlternates("/furniture"),
    },
    {
      url: `${baseUrl}/events`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95, // Core Sector (Banquet Halls & Catering)
      alternates: getAlternates("/events"),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: getAlternates("/services"),
    },
    {
      url: `${baseUrl}/marketplace`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: getAlternates("/marketplace"),
    },
    {
      url: `${baseUrl}/marketplace/properties`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketplace/furniture`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/marketplace/food-catering`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
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
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // 100 Free Pakistan Business & Growth Tools (Massive Google Search Catchment)
  const toolsRoutes: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Digital Agency Services Detail Routes
  const serviceRoutes: MetadataRoute.Sitemap = DIGITAL_SERVICES.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Blog Article Detail Routes
  const blogRoutes: MetadataRoute.Sitemap = INITIAL_BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Marketplace Real Estate Detail Routes
  const propertyRoutes: MetadataRoute.Sitemap = INITIAL_PROPERTIES.map((prop) => ({
    url: `${baseUrl}/marketplace/properties/${prop.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Marketplace Furniture Detail Routes
  const furnitureRoutes: MetadataRoute.Sitemap = INITIAL_FURNITURE.map((furn) => ({
    url: `${baseUrl}/marketplace/furniture/${furn.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Marketplace Food & Catering Detail Routes
  const foodRoutes: MetadataRoute.Sitemap = INITIAL_EVENTS.map((food) => ({
    url: `${baseUrl}/marketplace/food-catering/${food.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  // Pakistan City & Geo-Targeted Local SEO Hubs (Lahore, Islamabad, Faisalabad, Karachi, Chiniot)
  const locationRoutes: MetadataRoute.Sitemap = LOCATIONS_DATA.map((loc) => ({
    url: `${baseUrl}/locations/${loc.slug}`,
    lastModified: currentDate,
    changeFrequency: "daily",
    priority: 0.95,
  }));

  return [
    ...staticRoutes,
    ...locationRoutes,
    ...toolsRoutes,
    ...serviceRoutes,
    ...blogRoutes,
    ...propertyRoutes,
    ...furnitureRoutes,
    ...foodRoutes,
  ];
}
