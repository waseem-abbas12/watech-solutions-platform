import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DIGITAL_SERVICES,
  getDigitalServiceBySlug,
  getOtherServices,
} from "@/lib/services-data";
import { ServiceDetailClient } from "./service-detail-client";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DIGITAL_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getDigitalServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Watech Digital Services",
      description: "The requested digital service could not be found.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://watech-solutions-platform-eight.vercel.app";
  const serviceUrl = `${siteUrl}/services/${service.slug}`;

  return {
    title: `${service.title} in Pakistan | Watech Solutions`,
    description: service.heroDescription,
    keywords: [
      service.title,
      `${service.title} Pakistan`,
      `${service.title} Lahore`,
      "Real estate digital marketing",
      "Chinioti furniture marketing",
      "Watech Solutions",
    ].join(", "),
    alternates: {
      canonical: serviceUrl,
    },
    openGraph: {
      title: `${service.title} | Watech Digital Services`,
      description: service.heroDescription,
      url: serviceUrl,
      siteName: "Watech Solutions Platform",
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getDigitalServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = getOtherServices(service.slug);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://watech-solutions-platform-eight.vercel.app";
  const serviceUrl = `${siteUrl}/services/${service.slug}`;

  // JSON-LD Schema for Service & Breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}/#service`,
        name: service.title,
        description: service.heroDescription,
        provider: {
          "@type": "Organization",
          name: "WATECH Solutions",
          url: siteUrl,
        },
        areaServed: {
          "@type": "Country",
          name: "Pakistan",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.title,
          itemListElement: service.deliverables.map((deliv) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: deliv.title,
              description: deliv.description,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Digital Services",
            item: `${siteUrl}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: serviceUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailClient service={service} otherServices={otherServices} />
    </>
  );
}