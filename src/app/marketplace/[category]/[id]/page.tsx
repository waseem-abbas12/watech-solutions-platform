"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Trees,
  Users,
  Utensils,
  Calendar,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Armchair,
  Cake,
} from "lucide-react";
import { getItemByCategoryAndId, PropertyItem, FurnitureItem, EventItem } from "@/lib/mock-data";
import { InquiryModal } from "@/components/marketplace/inquiry-modal";

function formatPKR(num: number): string {
  if (num >= 10000000) {
    const crore = num / 10000000;
    return `PKR ${crore % 1 === 0 ? crore : crore.toFixed(2)} Crore`;
  }
  if (num >= 100000) {
    const lac = num / 100000;
    return `PKR ${lac % 1 === 0 ? lac : lac.toFixed(2)} Lac`;
  }
  return `PKR ${num.toLocaleString()}`;
}

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();

  const category = (params.category as string) || "";
  const id = (params.id as string) || "";

  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteNotice, setFavoriteNotice] = useState<string | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Fetch item data
  const data = getItemByCategoryAndId(category, id);

  useEffect(() => {
    // Simulate real-time fetch / loading transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [category, id]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 bg-white">
        <div className="w-10 h-10 border-4 border-[#16A34A] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
          Loading listing details...
        </p>
      </div>
    );
  }

  // Error / Not Found State
  if (!data || !data.item) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Item Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          The requested listing may have expired, sold, or is temporarily unavailable.
        </p>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#16A34A] text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const { type, item, related } = data;

  const handleFavoriteClick = () => {
    // Check login status simulation
    const isLoggedIn = false; // Mock auth check
    if (!isLoggedIn) {
      setFavoriteNotice("Please login to save this listing to your favorites!");
      setTimeout(() => setFavoriteNotice(null), 4000);
      return;
    }
    setIsFavorite(!isFavorite);
  };

  const openDirectWhatsApp = (title: string, priceStr: string, phone: string) => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum, I am interested in this listing from Watech: "${title}" (${priceStr}). Please share details and next steps.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // ----------------------------------------------------
  // RENDER PROPERTY DETAIL
  // ----------------------------------------------------
  if (type === "property") {
    const prop = item as PropertyItem;
    const gallery = prop.gallery && prop.gallery.length ? prop.gallery : [prop.image];

    return (
      <div className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white pb-24">
        {/* Inquiry Modal */}
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          item={{
            id: prop.id,
            title: prop.title,
            category: "property",
            priceFormatted: formatPKR(prop.price),
            partnerPhone: prop.partnerPhone,
          }}
        />

        {/* Favorite Notice Toast */}
        <AnimatePresence>
          {favoriteNotice && (
            <motion.div
              initial={{ opacity: 0, y: -20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="fixed top-24 left-1/2 z-50 px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700"
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>{favoriteNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Breadcrumb / Top bar */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between">
          <Link
            href="/marketplace?tab=properties"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Properties
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={handleFavoriteClick}
              className={`p-2.5 rounded-full border transition-all ${
                isFavorite
                  ? "bg-red-50 border-red-200 text-red-600"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
              title="Save to Favorites"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`} />
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Active Big Image */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={gallery[activeImageIndex]}
                alt={prop.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                {prop.type}
              </span>
            </div>

            {/* Thumbnails row */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#2563EB] scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Full Specs & Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                {prop.city} · Verified Property Listing
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {prop.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{prop.location}</span>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Demand Price
                </span>
                <div className="text-3xl font-black text-[#2563EB] tracking-tight mt-0.5">
                  {formatPKR(prop.price)}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm">
                Direct Seller
              </span>
            </div>

            {/* Spec Icons Grid */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              {prop.bedrooms > 0 && (
                <div className="flex flex-col items-center justify-center p-2">
                  <Bed className="w-5 h-5 text-slate-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900">{prop.bedrooms} Bedrooms</span>
                  <span className="text-[10px] text-slate-500">Master Suites</span>
                </div>
              )}
              {prop.bathrooms > 0 && (
                <div className="flex flex-col items-center justify-center p-2">
                  <Bath className="w-5 h-5 text-slate-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900">{prop.bathrooms} Baths</span>
                  <span className="text-[10px] text-slate-500">Sanitary Fitted</span>
                </div>
              )}
              <div className="flex flex-col items-center justify-center p-2">
                <Maximize2 className="w-5 h-5 text-slate-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">{prop.area}</span>
                <span className="text-[10px] text-slate-500">Covered Area</span>
              </div>
            </div>

            {/* Key Features */}
            {prop.features && prop.features.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Property Highlights
                </h4>
                <div className="flex flex-wrap gap-2">
                  {prop.features.map((feat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                About this Property
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">{prop.description}</p>
            </div>

            {/* CTAs */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() =>
                  openDirectWhatsApp(prop.title, formatPKR(prop.price), prop.partnerPhone)
                }
                className="w-full py-4 px-6 rounded-full bg-[#2563EB] text-white font-bold text-sm tracking-wide shadow-md hover:bg-blue-700 hover:shadow-blue-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact Seller on WhatsApp</span>
              </button>

              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-full border border-slate-200 bg-white text-slate-800 font-semibold text-xs tracking-wider uppercase hover:bg-slate-50 transition-colors"
              >
                Submit In-Platform Inquiry
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            CROSS-SECTOR 1: FURNISH THIS PROPERTY WITH CHINIOTI WOOD
            ========================================= */}
        <section className="max-w-7xl mx-auto px-6 mt-20">
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/40 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-emerald-100 text-[#16A34A] shrink-0">
                <Armchair className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  Ecosystem Cross-Recommendation
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                  Furnish this {prop.type} with Authentic Chinioti Wood
                </h3>
                <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
                  Get pure handcrafted Sheesham master bedroom sets, 8-seater dining suites, and royal carved living room sofas delivered directly from Chiniot artisans with exclusive bundled pricing.
                </p>
              </div>
            </div>
            <Link
              href="/marketplace?tab=furniture"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#16A34A] text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20 transition-all shrink-0"
            >
              <span>Explore Furniture Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* =========================================
            CROSS-SECTOR 2: HOUSEWARMING & NEARBY EVENTS
            ========================================= */}
        <section className="max-w-7xl mx-auto px-6 mt-8">
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-orange-50/70 via-white to-orange-50/40 border border-orange-200 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-orange-100 text-[#EA580C] shrink-0">
                <Cake className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                  Housewarming & Celebrations
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 mt-1">
                  Host Your Gathering at Nearby Premium Venues
                </h3>
                <p className="text-sm text-slate-600 mt-1.5 max-w-2xl leading-relaxed">
                  Planning a housewarming feast, family engagement, or wedding in {prop.city}? Reserve top-rated banquet halls, marquees, and live BBQ catering packages with verified dates.
                </p>
              </div>
            </div>
            <Link
              href="/marketplace?tab=events"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider hover:bg-orange-700 shadow-md hover:shadow-orange-500/20 transition-all shrink-0"
            >
              <span>Find Nearby Venues</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* =========================================
            PARTNER CROSS-LINK PROPOSITION
            ========================================= */}
        <section className="max-w-7xl mx-auto px-6 mt-12">
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-orange-50/60 via-white to-orange-50/30 border border-orange-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="p-4 rounded-2xl bg-[#EA580C]/10 text-[#EA580C]">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Are you a Property Owner or Real Estate Agent?
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  List your plots, houses, and commercial inventory for free. Pay commission only on closed deals.
                </p>
              </div>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EA580C] text-white font-semibold text-xs uppercase tracking-wider hover:bg-orange-700 shadow-md hover:shadow-orange-500/20 transition-all shrink-0"
            >
              <span>Want to sell? Become a Partner</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* =========================================
            RELATED PROPERTIES
            ========================================= */}
        {related && related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
                  Explore More
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Related Properties
                </h2>
              </div>
              <Link
                href="/marketplace?tab=properties"
                className="text-xs font-bold uppercase tracking-wider text-[#2563EB] hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(related as PropertyItem[]).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/marketplace/properties/${rel.id}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 overflow-hidden group"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm">
                      {rel.type}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-lg font-black text-[#2563EB] mb-1">
                      {formatPKR(rel.price)}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">{rel.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER FURNITURE DETAIL
  // ----------------------------------------------------
  if (type === "furniture") {
    const furn = item as FurnitureItem;
    const gallery = furn.gallery && furn.gallery.length ? furn.gallery : [furn.image];

    return (
      <div className="w-full bg-white text-slate-900 selection:bg-[#16A34A] selection:text-white pb-24">
        {/* Inquiry Modal */}
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          item={{
            id: furn.id,
            title: furn.name,
            category: "furniture",
            priceFormatted: formatPKR(furn.price),
            partnerPhone: furn.partnerPhone,
          }}
        />

        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between">
          <Link
            href="/marketplace?tab=furniture"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Furniture
          </Link>
          <button
            onClick={handleFavoriteClick}
            className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
          {/* Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={gallery[activeImageIndex]}
                alt={furn.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                {furn.woodType} Wood
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#16A34A] scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#16A34A]">
                <Trees className="w-3.5 h-3.5" />
                <span>Authentic Chinioti Craftsmanship</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {furn.name}
              </h1>
              <p className="text-sm text-slate-500 mt-1">Category: {furn.category} Collection</p>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Direct Artisan Price
                </span>
                <div className="text-3xl font-black text-[#16A34A] tracking-tight mt-0.5">
                  {formatPKR(furn.price)}
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm">
                100% Solid Wood
              </span>
            </div>

            {/* Dimensions & Material Specs */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-500">Wood Species:</span>
                <span className="font-bold text-slate-900">100% Solid Seasoned {furn.woodType}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-500">Dimensions:</span>
                <span className="font-bold text-slate-900">{furn.dimensions}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-500">Origin:</span>
                <span className="font-bold text-slate-900">Chiniot, Punjab (Pakistan)</span>
              </div>
            </div>

            {/* Features */}
            {furn.features && furn.features.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Quality Standards
                </h4>
                <div className="flex flex-wrap gap-2">
                  {furn.features.map((feat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Artisan Story & Details
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">{furn.description}</p>
            </div>

            {/* CTAs */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() =>
                  openDirectWhatsApp(furn.name, formatPKR(furn.price), furn.partnerPhone)
                }
                className="w-full py-4 px-6 rounded-full bg-[#16A34A] text-white font-bold text-sm tracking-wide shadow-md hover:bg-emerald-700 hover:shadow-emerald-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Inquire on WhatsApp</span>
              </button>

              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full py-3.5 px-6 rounded-full border border-slate-200 bg-white text-slate-800 font-semibold text-xs tracking-wider uppercase hover:bg-slate-50 transition-colors"
              >
                Request Custom Polish / Sizing
              </button>
            </div>
          </div>
        </div>

        {/* Related Furniture */}
        {related && related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A]">
                  Chinioti Collection
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Related Furniture
                </h2>
              </div>
              <Link
                href="/marketplace?tab=furniture"
                className="text-xs font-bold uppercase tracking-wider text-[#16A34A] hover:underline"
              >
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(related as FurnitureItem[]).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/marketplace/furniture/${rel.id}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 overflow-hidden group"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm">
                      {rel.woodType}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-lg font-black text-[#16A34A] mb-1">
                      {formatPKR(rel.price)}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-slate-500">{rel.dimensions}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER EVENT DETAIL
  // ----------------------------------------------------
  if (type === "event") {
    const ev = item as EventItem;
    const gallery = ev.gallery && ev.gallery.length ? ev.gallery : [ev.image];

    return (
      <div className="w-full bg-white text-slate-900 selection:bg-[#EA580C] selection:text-white pb-24">
        {/* Inquiry Modal */}
        <InquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          item={{
            id: ev.id,
            title: ev.title,
            category: "event",
            priceFormatted: `PKR ${ev.packagePrice.toLocaleString()} / head`,
            partnerPhone: ev.partnerPhone,
          }}
        />

        {/* Top bar */}
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between">
          <Link
            href="/marketplace?tab=events"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <button
            onClick={handleFavoriteClick}
            className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-all"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-4">
          {/* Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-100 shadow-md">
              <img
                src={gallery[activeImageIndex]}
                alt={ev.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                {ev.menuType} Cuisine
              </span>
            </div>

            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-[#EA580C] scale-105 shadow-md"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                {ev.city} · Signature Venue & Hospitality
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {ev.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{ev.venue}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-2xl bg-orange-50/70 border border-orange-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Menu Package Rate
                </span>
                <div className="text-3xl font-black text-[#EA580C] tracking-tight mt-0.5">
                  PKR {ev.packagePrice.toLocaleString()}{" "}
                  <span className="text-xs text-slate-500 font-normal">/ head</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full shadow-sm">
                All-Inclusive
              </span>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="flex flex-col items-center justify-center p-2">
                <Users className="w-5 h-5 text-slate-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">
                  Up to {ev.capacity.toLocaleString()} Guests
                </span>
                <span className="text-[10px] text-slate-500">Hall + Lawn Capacity</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <Calendar className="w-5 h-5 text-slate-600 mb-1" />
                <span className="text-xs font-bold text-slate-900">{ev.eventDate}</span>
                <span className="text-[10px] text-slate-500">Upcoming Open Slot</span>
              </div>
            </div>

            {/* Amenities */}
            {ev.amenities && ev.amenities.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Venue Amenities & Setup
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ev.amenities.map((amen, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                      {amen}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Banquet & Hospitality Overview
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">{ev.description}</p>
            </div>

            {/* CTAs */}
            <div className="pt-4 space-y-3">
              <button
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full py-4 px-6 rounded-full bg-[#EA580C] text-white font-bold text-sm tracking-wide shadow-md hover:bg-orange-700 hover:shadow-orange-500/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Event & Check Dates</span>
              </button>

              <button
                onClick={() =>
                  openDirectWhatsApp(
                    ev.title,
                    `PKR ${ev.packagePrice.toLocaleString()} / head`,
                    ev.partnerPhone
                  )
                }
                className="w-full py-3.5 px-6 rounded-full border border-slate-200 bg-white text-slate-800 font-semibold text-xs tracking-wider uppercase hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#EA580C]" />
                <span>Quick WhatsApp Inquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {related && related.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                  Signature Venues
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mt-1">
                  Related Events & Halls
                </h2>
              </div>
              <Link
                href="/marketplace?tab=events"
                className="text-xs font-bold uppercase tracking-wider text-[#EA580C] hover:underline"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(related as EventItem[]).map((rel) => (
                <Link
                  key={rel.id}
                  href={`/marketplace/events/${rel.id}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200 overflow-hidden group"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm">
                      {rel.menuType}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-lg font-black text-[#EA580C] mb-1">
                      PKR {rel.packagePrice.toLocaleString()} / head
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500">{rel.venue}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return null;
}
