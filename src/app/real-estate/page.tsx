"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Home,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Search,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calculator,
  SlidersHorizontal,
  Sparkles,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Send,
  Layers,
} from "lucide-react";
import { EcosystemTopBar } from "@/components/common/ecosystem-top-bar";
import { INITIAL_PROPERTIES, PropertyItem } from "@/lib/mock-data";
import { PropertyCalculatorModal } from "@/components/marketplace/property-calculator-modal";
import { InquiryModal, ModalItemDetails } from "@/components/marketplace/inquiry-modal";

export default function RealEstatePortalPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState<"All" | "House" | "Plot" | "Commercial">("All");
  const [priceFilter, setPriceFilter] = useState<"All" | "under2" | "2to5" | "above5">("All");

  // Modals state
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedItemForInquiry, setSelectedItemForInquiry] = useState<ModalItemDetails | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((prop) => {
      // Search
      const matchesSearch =
        searchQuery === "" ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchQuery.toLowerCase());

      // City
      const matchesCity = selectedCity === "All" || prop.city.toLowerCase() === selectedCity.toLowerCase();

      // Type
      const matchesType = selectedType === "All" || prop.type === selectedType;

      // Price
      let matchesPrice = true;
      if (priceFilter === "under2") {
        matchesPrice = prop.price < 20000000;
      } else if (priceFilter === "2to5") {
        matchesPrice = prop.price >= 20000000 && prop.price <= 50000000;
      } else if (priceFilter === "above5") {
        matchesPrice = prop.price > 50000000;
      }

      return matchesSearch && matchesCity && matchesType && matchesPrice;
    });
  }, [searchQuery, selectedCity, selectedType, priceFilter]);

  function formatPricePKR(price: number) {
    if (price >= 10000000) {
      return `PKR ${(price / 10000000).toFixed(2)} Crore`;
    }
    return `PKR ${(price / 100000).toFixed(2)} Lac`;
  }

  const handleWhatsAppInquiry = (prop: PropertyItem) => {
    const text = `Assalam-o-Alaikum WATECH Real Estate, I am interested in: "${prop.title}" (${formatPricePKR(prop.price)}) in ${prop.location}. Please share verification papers and schedule a visit.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleOpenInquiry = (prop: PropertyItem) => {
    setSelectedItemForInquiry({
      id: prop.id,
      title: prop.title,
      category: "property",
      priceFormatted: formatPricePKR(prop.price),
      partnerPhone: prop.partnerPhone || "923270831470",
    });
    setIsInquiryOpen(true);
  };

  const faqs = [
    {
      q: "Kya tamam properties registry aur intiqal verified hain?",
      a: "Ji haan, WATECH Real Estate par listed har plot aur ghar on-ground record aur fard/registry verification ke baad hi publish kiya jata hai taake fraud ka 0% risk ho.",
    },
    {
      q: "Overseas Pakistanis ke liye purchase ka kya tareeqa-e-kar hai?",
      a: "Hum overseas clients ke liye live 4K video walkthrough, official digital legal verification, aur direct Power of Attorney assistance provide karte hain.",
    },
    {
      q: "Kya installment par bhi plots aur houses dastiyab hain?",
      a: "Bilkul! Humare pas Chiniot prime societies aur Lahore/Faisalabad mein 1 saal se 3 saal ke asaan mahana installment plans wale plots aur files moojood hain.",
    },
    {
      q: "Kya hum apni property WATECH par sell karne ke liye de sakte hain?",
      a: "Ji bilkul! Aap humare WhatsApp par direct property details send kar sakte hain, humari team 24 ghante mein verify kar ke serious buyers tak pohchaye gi.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* 1. Universal Ecosystem Top Bar */}
      <EcosystemTopBar currentPortal="real-estate" />

      {/* 2. Dedicated Real Estate Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo & Real Estate Badge */}
          <Link href="/real-estate" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-slate-800 p-1 border border-emerald-500/30 group-hover:border-emerald-500 transition-colors">
              <Image
                src="/images/watech-mark-transparent.png"
                alt="WATECH Real Estate"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-mono">WATECH</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  REAL ESTATE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Verified Properties & Investment</p>
            </div>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Area / Cost Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </button>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Real%20Estate,%20I%20want%20to%20consult%20about%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800/80">
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Registry & Intiqal Verified Portfolios</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Punjab & Chiniot's Most Trusted <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Real Estate Properties
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              Designer Luxury Bungalows, Prime Commercial Plazas, and High-ROI Investment Plots. 
              Direct consultation with Waseem Abbas and verified property consultants.
            </p>

            {/* Quick Authority Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-emerald-400 font-bold text-lg">100%</div>
                <div className="text-slate-400 text-xs">Clear Legal Title</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-emerald-400 font-bold text-lg">0%</div>
                <div className="text-slate-400 text-xs">Hidden Costs</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-emerald-400 font-bold text-lg">&lt; 30s</div>
                <div className="text-slate-400 text-xs">WhatsApp Reply</div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
                <div className="text-emerald-400 font-bold text-lg">VIP</div>
                <div className="text-slate-400 text-xs">Overseas Desk</div>
              </div>
            </div>

            {/* 4. Interactive Search & Filter Bar */}
            <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl shadow-black/40 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search Text */}
                <div className="relative">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Search Keyword</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. DHA Phase 6, Bahria, Chiniot..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* City Selector */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">City / Region</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="All">All Cities (Chiniot, Lahore...)</option>
                    <option value="Chiniot">Chiniot</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>

                {/* Type Selector */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Property Category</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="All">All Types (Houses, Plots, Commercial)</option>
                    <option value="House">Houses & Luxury Villas</option>
                    <option value="Plot">Residential & Commercial Plots</option>
                    <option value="Commercial">Commercial Plazas & Shops</option>
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Budget / Price</label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="All">All Budgets</option>
                    <option value="under2">Under 2 Crore</option>
                    <option value="2to5">2 Crore — 5 Crore</option>
                    <option value="above5">Above 5 Crore</option>
                  </select>
                </div>
              </div>

              {/* Fast Pills */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px]">Quick Picks:</span>
                <button
                  onClick={() => {
                    setSelectedCity("Chiniot");
                    setSelectedType("All");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 border border-slate-700 text-[11px] transition-colors"
                >
                  📍 Chiniot Prime
                </button>
                <button
                  onClick={() => {
                    setSelectedCity("Lahore");
                    setSelectedType("House");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 border border-slate-700 text-[11px] transition-colors"
                >
                  🏡 Lahore Luxury Bungalows
                </button>
                <button
                  onClick={() => {
                    setSelectedType("Plot");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-emerald-600/20 text-slate-300 hover:text-emerald-300 border border-slate-700 text-[11px] transition-colors"
                >
                  📈 Investment Plots
                </button>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCity("All");
                    setSelectedType("All");
                    setPriceFilter("All");
                  }}
                  className="ml-auto text-slate-400 hover:text-white text-[11px] underline"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Property Listings Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>Available Verified Properties</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {filteredProperties.length} Listed
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Each listing includes verified registry details, high-res photos, and direct WhatsApp booking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span>Calculate Construction Cost</span>
            </button>
          </div>
        </div>

        {/* Listings */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-medium text-slate-300">Koi property nahi mili aapke filter ke mutabiq</p>
            <p className="text-xs text-slate-500 mt-1">Filters change karein ya WhatsApp par direct inquiry karein.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("All");
                setSelectedType("All");
                setPriceFilter("All");
              }}
              className="mt-4 px-4 py-2 text-xs rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-500 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((prop) => (
              <motion.div
                key={prop.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all hover:shadow-xl hover:shadow-emerald-950/30 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                      Verified
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-medium border border-slate-700">
                      {prop.type}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[11px] font-semibold border border-slate-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {prop.city}
                    </span>
                  </div>

                  {/* Bottom Price in Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Demand / Price</div>
                      <div className="text-lg font-bold text-white tracking-tight">
                        {formatPricePKR(prop.price)}
                      </div>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 bg-slate-900/90 px-2 py-1 rounded-md border border-slate-800">
                      {prop.area}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-3 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      {prop.location}
                    </p>

                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Features Badges */}
                    {prop.type === "House" && (
                      <div className="flex items-center gap-4 py-2 px-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{prop.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{prop.area.split(" ")[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenInquiry(prop)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors text-center"
                    >
                      Book Visit / Details
                    </button>
                    <button
                      onClick={() => handleWhatsAppInquiry(prop)}
                      className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/30"
                      title="Direct WhatsApp Consultation"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 6. List Your Property Callout */}
      <section className="py-12 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <PlusCircle className="w-4 h-4" />
                Property Owners & Builders
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">
                Apna Plot, Ghar Ya Plaza WATECH Par Sell Karein
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Zero advance fees. Humari team aapki property ki on-ground physical video shoot karegi aur verified overseas aur local buyers tak direct deal finalize karwayegi.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Real%20Estate,%20I%20want%20to%20list%20my%20property%20for%20sale."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>List On WhatsApp (Free)</span>
              </a>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Area Converter</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Founder Trust & Verification Guarantee */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shrink-0 shadow-lg shadow-emerald-950/50">
            <Image
              src="/images/founder-waseem-abbas.jpg"
              alt="Waseem Abbas - Founder & CEO"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Founder's Direct Legal Guarantee</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              "Real Estate mein sab se qeemti cheez Sarmaaye ka Tahaffuz hai."
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              "Pakistan mein bohot se log plots aur makanat mein life-savings laga dete hain magar papers mein issues nikal aate hain. WATECH Real Estate ka usool saaf hai: jis property ki registry, intiqal, aur fard hum khud on-ground verify na karein, use platform par qadam nahi rakhne dete."
            </p>
            <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
              <div>
                <div className="text-sm font-bold text-white">Waseem Abbas</div>
                <div className="text-xs text-emerald-400">Founder & CEO, WATECH Solutions</div>
              </div>
              <span className="text-slate-700">|</span>
              <div className="text-xs text-slate-400">
                Direct Helpline: <span className="text-white font-mono">+92 327 0831470</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <h3 className="text-xl font-bold text-white text-center mb-6">
          Real Estate FAQs (Aksar Pooche Jane Wale Sawalat)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-emerald-400 transition-transform ${
                    openFaqIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaqIndex === i && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Dedicated Real Estate Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/watech-mark-transparent.png"
              alt="WATECH"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white font-bold">WATECH Real Estate</span>
            <span className="text-slate-600">|</span>
            <span>A Specialized Portal of WATECH Solutions</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Main Ecosystem Hub
            </Link>
            <Link href="/furniture" className="hover:text-white transition-colors">
              Chinioti Furniture
            </Link>
            <Link href="/agency" className="hover:text-white transition-colors">
              Digital Agency
            </Link>
          </div>
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} WATECH Real Estate. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PropertyCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        item={selectedItemForInquiry}
      />
    </div>
  );
}
