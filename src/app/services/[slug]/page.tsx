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

  return <ServiceDetailClient service={service} otherServices={otherServices} />;
}