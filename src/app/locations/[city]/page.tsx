import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  Sofa,
  Sparkles,
  Phone,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Award,
  Zap,
  Star,
  Check,
} from "lucide-react";
import {
  LOCATIONS_DATA,
  getLocationBySlug,
  getAllLocationSlugs,
} from "@/data/locationsData";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({
    city: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return {
      title: "Location Not Found | WATECH Solutions",
      description: "The requested city service hub could not be found.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.waseemabbas.online";
  const canonicalUrl = `${siteUrl}/locations/${location.slug}`;

  return {
    title: location.metaTitle,
    description: location.metaDescription,
    keywords: location.targetKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: canonicalUrl,
      siteName: "WATECH Solutions Platform",
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: location.metaTitle,
      description: location.metaDescription,
    },
  };
}

export default async function CityLocationPage({ params }: PageProps) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.waseemabbas.online";
  const pageUrl = `${siteUrl}/locations/${location.slug}`;

  // Structured Data 1: LocalBusiness Schema for Google Search Console & Local Pack
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}/#localbusiness`,
    name: `WATECH Solutions - ${location.cityName} Hub`,
    url: pageUrl,
    image: `${siteUrl}/images/watech-official-logo.png`,
    description: location.metaDescription,
    telephone: "+923270831470",
    email: "waseem000094@gmail.com",
    priceRange: "PKR",
    currenciesAccepted: "PKR",
    paymentAccepted: "Cash, Bank Transfer, JazzCash, EasyPaisa",
    address: {
      "@type": "PostalAddress",
      addressLocality: location.cityName,
      addressRegion: location.province,
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.geoCoordinates.latitude,
      longitude: location.geoCoordinates.longitude,
    },
    areaServed: location.keyAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "86",
      bestRating: "5",
    },
  };

  // Structured Data 2: FAQPage Schema for Google Rich Snippets & PAA
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Google SEO JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/locations" className="hover:text-blue-600 transition-colors">Locations</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{location.cityName}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl mb-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-4">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{location.badge} &bull; {location.province}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {location.heroHeadline}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              {location.heroSubtitle}
            </p>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
              <a
                href={`https://wa.me/923270831470?text=${encodeURIComponent(location.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book {location.cityName} Strategy Audit</span>
              </a>

              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors"
              >
                <span>Free 100 Business Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Areas Tag Pill Cluster */}
            <div className="pt-6 border-t border-slate-100">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Priority Commercial &amp; Residential Belts Served:
              </h2>
              <div className="flex flex-wrap gap-2">
                {location.keyAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-800 px-3 py-1 rounded-full border border-slate-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-blue-600" />
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* City Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {location.stats.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-blue-600 mb-1">
                {st.value}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {st.label}
              </div>
            </div>
          ))}
        </div>

        {/* Local Market Analysis & Realities */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            <Award className="w-4 h-4" />
            <span>Local Market Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
            {location.cityName} Ki Market Ka Asal Mizaaj Aur Challenges
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            {location.marketOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {location.localMarketChallenges.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <div className="flex items-start gap-2.5 text-red-600 font-bold text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0 mt-0.5 text-xs">✕</span>
                  <span>Aam Challenge: {item.problem}</span>
                </div>
                <div className="flex items-start gap-2.5 text-emerald-700 font-semibold text-xs sm:text-sm pt-2 border-t border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</span>
                  <span>Watech Solution: {item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Service Specialties */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hamari Khas Khidmat ({location.cityName} Specialization)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Local market demands ke mutabiq targeted service frameworks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {location.serviceSpecialties.map((spec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    {spec.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-600">
                  ★ {spec.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Local Case Study */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Verified Local Case Study ({location.cityName})</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
            {location.caseStudy.resultHeadline}
          </h2>
          <div className="text-xs text-slate-400 mb-6">
            Client: <strong className="text-white">{location.caseStudy.clientType}</strong> &bull; Location: <strong className="text-white">{location.caseStudy.area}</strong>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-3xl">
            {location.caseStudy.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-700/60">
            {location.caseStudy.stats.map((cStat, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/40 text-center">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">{cStat.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{cStat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent PKR Pricing Packages */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Transparent Investment</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {location.cityName} Service Packages &amp; Pricing
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Koi hidden fees ya commission nahi. Har package mein clear deliverables shamil hain:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {location.pricingPackages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-7 border flex flex-col justify-between transition-all relative ${
                  pkg.popular
                    ? "bg-white border-2 border-blue-600 shadow-xl"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900">{pkg.price}</span>
                    <span className="text-xs text-slate-500">{pkg.period}</span>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/923270831470?text=${encodeURIComponent(
                    `Assalam-o-Alaikum Watech! Mujhe ${location.cityName} ke "${pkg.name}" package ke hawalay se inquiry karni hai.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs text-center transition-all ${
                    pkg.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  Select Package &amp; Chat on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Localized FAQs (Schema Verified) */}
        <div className="bg-slate-100 rounded-3xl p-8 md:p-10 border border-slate-200 mb-12">
          <div className="flex items-center gap-2.5 mb-6">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Aam Tor Par Pooche Gaye Sawalaat ({location.cityName} FAQs)
            </h2>
          </div>

          <div className="space-y-4">
            {location.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 text-sm text-slate-700 space-y-1.5"
              >
                <h3 className="font-bold text-slate-900 text-base">
                  Q: {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other City Hubs Cross-Links (Internal Linking Engine) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            Explore Other Commercial Hubs in Pakistan:
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LOCATIONS_DATA.filter((l) => l.slug !== location.slug).map((other) => (
              <Link
                key={other.slug}
                href={`/locations/${other.slug}`}
                className="p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-slate-800 font-semibold text-xs flex items-center justify-between transition-all"
              >
                <span>{other.cityName}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

