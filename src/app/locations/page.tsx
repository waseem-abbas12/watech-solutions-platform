import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Building2,
  Sofa,
  Sparkles,
  Phone,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { LOCATIONS_DATA } from "@/data/locationsData";

export const metadata: Metadata = {
  title: "Service Locations & Commercial Hubs in Pakistan | WATECH Solutions",
  description:
    "Explore WATECH Solutions dedicated service hubs across Lahore, Islamabad & Rawalpindi, Faisalabad, Karachi, and Chiniot. Local digital marketing, real estate funnels & handcrafted Chinioti furniture.",
  keywords: [
    "Digital marketing agency Pakistan",
    "Real estate marketing Lahore",
    "Facebook ads agency Islamabad",
    "E-commerce agency Faisalabad",
    "Digital marketing Karachi",
    "Chinioti furniture factory Chiniot",
    "Watech Solutions locations",
  ],
  alternates: {
    canonical: "https://www.waseemabbas.online/locations",
  },
  openGraph: {
    title: "Service Locations in Pakistan | WATECH Solutions Hubs",
    description:
      "Targeted digital growth, real estate lead generation & authentic Chinioti woodcraft across Pakistan's major commercial hubs.",
    url: "https://www.waseemabbas.online/locations",
    siteName: "WATECH Solutions Platform",
    locale: "en_PK",
    type: "website",
  },
};

export default function LocationsDirectoryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: LOCATIONS_DATA.map((loc, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "LocalBusiness",
        name: `WATECH Solutions - ${loc.cityName} Hub`,
        url: `https://www.waseemabbas.online/locations/${loc.slug}`,
        description: loc.metaDescription,
        address: {
          "@type": "PostalAddress",
          addressLocality: loc.cityName,
          addressRegion: loc.province,
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: loc.geoCoordinates.latitude,
          longitude: loc.geoCoordinates.longitude,
        },
        telephone: "+923270831470",
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Locations &amp; City Hubs</span>
        </nav>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs md:text-sm font-semibold mb-4">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Pakistan Nationwide Geo-Targeted Infrastructure</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Commercial &amp; Service <span className="text-blue-600">City Hubs</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Har shehar ki market ka mizaaj alag hota hai. WATECH Solutions Pakistan ke top commercial shehron ke businesses ko unke local audience ke mutabiq <strong>bespoke digital marketing, real estate funnels, aur factory-direct furniture</strong> provide karta hai.
          </p>
        </div>

        {/* City Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {LOCATIONS_DATA.map((loc) => (
            <div
              key={loc.slug}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                    <MapPin className="w-3.5 h-3.5" />
                    {loc.province}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Verified Hub</span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {loc.cityName}
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {loc.tagline}
                </p>

                {/* Key Local Areas */}
                <div className="mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Key Areas Covered:
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {loc.keyAreas.slice(0, 4).map((area, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-[11px] font-medium bg-white px-2 py-0.5 rounded-md border border-slate-200 text-slate-700"
                      >
                        {area}
                      </span>
                    ))}
                    {loc.keyAreas.length > 4 && (
                      <span className="text-[11px] text-blue-600 font-semibold self-center">
                        +{loc.keyAreas.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Top Stat */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {loc.stats.slice(0, 2).map((st, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-xl bg-slate-50 text-center">
                      <div className="text-sm font-extrabold text-slate-900">{st.value}</div>
                      <div className="text-[10px] text-slate-500 truncate">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <Link
                  href={`/locations/${loc.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-all shadow-sm"
                >
                  <span>Explore {loc.cityName} Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`https://wa.me/923270831470?text=${encodeURIComponent(loc.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 font-semibold text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp {loc.cityName} Desk</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* National Guarantee Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-4 inline-block">
              Multi-Sector Scale
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Aapka Shehar List Mein Nahi Hai?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
              WATECH Solutions poore Pakistan (Khyber se Karachi tak) aur overseas Pakistani investors (Gulf, UK, USA) ke liye remote cloud campaigns, real estate documentation, aur factory-direct furniture delivery facilitate karta hai.
            </p>
            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20Watech!%20Mujhe%20Pakistan%20mein%20apne%20shehar%20ke%20liye%20consult%20karna%20hai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Direct Strategy Consultation via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

