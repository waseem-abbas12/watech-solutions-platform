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
  ShieldCheck,
  PlusCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
} from "lucide-react";
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
      const matchesSearch =
        searchQuery === "" ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity = selectedCity === "All" || prop.city.toLowerCase() === selectedCity.toLowerCase();
      const matchesType = selectedType === "All" || prop.type === selectedType;

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

  function formatPricePKR(price?: number) {
    if (price && price > 0) {
      if (price >= 10000000) return `PKR ${(price / 10000000).toFixed(2)} Crore`;
      return `PKR ${(price / 100000).toFixed(2)} Lac`;
    }
    return "Demand on Consultation";
  }

  const handleWhatsAppInquiry = (prop: PropertyItem) => {
    const text = `Assalam-o-Alaikum WATECH Real Estate, I am interested in: "${prop.title}" (${prop.area}) in ${prop.location}. Please share the current verified demand price, legal registry documents, and schedule an on-ground visit.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleOpenInquiry = (prop: PropertyItem) => {
    setSelectedItemForInquiry({
      id: prop.id,
      title: prop.title,
      category: "property",
      priceFormatted: "Demand on Consultation",
      partnerPhone: prop.partnerPhone || "923270831470",
    });
    setIsInquiryOpen(true);
  };

  const faqs = [
    {
      q: "Kya tamam properties registry aur intiqal verified hain?",
      a: "Ji haan, WATECH Real Estate par listed har plot aur ghar on-ground physical record aur patwari/registry verification ke baad hi publish hota hai taake fraud ka 0% risk ho.",
    },
    {
      q: "Overseas Pakistanis ke liye property purchase ka kya process hai?",
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white flex flex-col">
      {/* 1. Dedicated Real Estate Top Bar */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              WATECH Real Estate
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">100% Verified Registry & Intiqal Properties</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Direct Helpline: <strong className="text-white font-mono">+92 327 0831470</strong></span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-emerald-400 font-medium">Chiniot · Lahore · Faisalabad</span>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Real Estate Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/real-estate" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-emerald-50 p-1.5 border border-emerald-200 group-hover:border-emerald-500 transition-colors">
              <Image
                src="/images/watech-mark-transparent.png"
                alt="WATECH Real Estate"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-mono">WATECH</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                  REAL ESTATE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Verified Properties & Investment</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                setSelectedType("House");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors"
            >
              Houses & Villas
            </button>
            <button
              onClick={() => {
                setSelectedType("Plot");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors"
            >
              Plots & Files
            </button>
            <button
              onClick={() => {
                setSelectedType("Commercial");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors"
            >
              Commercial Plazas
            </button>
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="hover:text-emerald-600 transition-colors flex items-center gap-1"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cost Calculator</span>
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Area / Cost Calculator</span>
              <span className="sm:hidden">Calculator</span>
            </button>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Real%20Estate,%20I%20want%20to%20consult%20about%20verified%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Clean White / Light Theme) */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Registry & Intiqal Verified Property Portfolios</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
              Punjab & Chiniot's Most Trusted <br />
              <span className="text-emerald-600">
                Real Estate Properties
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
              Designer Luxury Bungalows, Prime Commercial Plazas, and High-ROI Investment Plots. 
              Direct consultation with Waseem Abbas and verified property consultants.
            </p>

            {/* Authority Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">100%</div>
                <div className="text-slate-600 text-xs font-medium">Clear Legal Title</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">0%</div>
                <div className="text-slate-600 text-xs font-medium">Hidden Brokerage</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">&lt; 30s</div>
                <div className="text-slate-600 text-xs font-medium">WhatsApp Reply</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">VIP</div>
                <div className="text-slate-600 text-xs font-medium">Overseas Desk</div>
              </div>
            </div>

            {/* 4. Search & Filter Bar */}
            <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Search Text */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Search Keyword</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. DHA Phase 6, Bahria, Chiniot..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                    />
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / Region</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="All">All Cities (Chiniot, Lahore...)</option>
                    <option value="Chiniot">Chiniot</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Islamabad">Islamabad</option>
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Property Category</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="All">All Types (Houses, Plots, Commercial)</option>
                    <option value="House">Houses & Luxury Villas</option>
                    <option value="Plot">Residential & Commercial Plots</option>
                    <option value="Commercial">Commercial Plazas & Shops</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Budget / Price</label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="All">All Budgets</option>
                    <option value="under2">Under 2 Crore</option>
                    <option value="2to5">2 Crore — 5 Crore</option>
                    <option value="above5">Above 5 Crore</option>
                  </select>
                </div>
              </div>

              {/* Fast Pills */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium text-[11px]">Popular Filters:</span>
                <button
                  onClick={() => {
                    setSelectedCity("Chiniot");
                    setSelectedType("All");
                  }}
                  className="px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs transition-colors"
                >
                  📍 Chiniot Prime
                </button>
                <button
                  onClick={() => {
                    setSelectedCity("Lahore");
                    setSelectedType("House");
                  }}
                  className="px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs transition-colors"
                >
                  🏡 Lahore Luxury Bungalows
                </button>
                <button
                  onClick={() => {
                    setSelectedType("Plot");
                  }}
                  className="px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 text-xs transition-colors"
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
                  className="ml-auto text-slate-500 hover:text-slate-900 text-xs underline"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Listings Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>Verified Properties Catalog</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                {filteredProperties.length} Properties
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Each listing includes registry verification, high-res gallery, and direct WhatsApp token reservation.
            </p>
          </div>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold shadow-xs transition-colors"
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Calculate Construction Cost</span>
          </button>
        </div>

        {/* Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-800">Koi property nahi mili aapke filter ke mutabiq</p>
            <p className="text-xs text-slate-500 mt-1">Filters tabdeel karein ya WhatsApp par direct inquiry send karein.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("All");
                setSelectedType("All");
                setPriceFilter("All");
              }}
              className="mt-4 px-5 py-2.5 text-xs rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors"
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
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all hover:shadow-xl flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      Verified Title
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold border border-slate-200">
                      {prop.type}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 text-[11px] font-bold border border-slate-200 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      {prop.city}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Direct Verified Deal</div>
                      <div className="text-sm sm:text-base font-black text-white tracking-tight">
                        Demand on Consultation
                      </div>
                    </div>
                    <div className="text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700">
                      {prop.area}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-3 line-clamp-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {prop.location}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {prop.description}
                    </p>

                    {prop.type === "House" && (
                      <div className="flex items-center gap-4 py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-700 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-emerald-600" />
                          <span>{prop.bedrooms} Beds</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-4 h-4 text-emerald-600" />
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Maximize className="w-4 h-4 text-emerald-600" />
                          <span>{prop.area.split(" ")[0]}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Buttons (Green Action) */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenInquiry(prop)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleWhatsAppInquiry(prop)}
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 6. List Property Callout Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-50 p-8 sm:p-10 rounded-3xl border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                Property Owners & Builders
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                Apna Plot, Ghar Ya Plaza WATECH Par Sell Karein
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero advance listing fees. Humari team aapki property ki on-ground physical video shoot karegi aur verified overseas aur local buyers tak direct deal finalize karwayegi.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Real%20Estate,%20I%20want%20to%20list%20my%20property%20for%20sale."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>List On WhatsApp (Free)</span>
              </a>
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 transition-colors flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Area Converter</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Founder Trust & Verification Guarantee */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-emerald-500 shrink-0 shadow-md">
            <Image
              src="/images/founder-waseem-abbas.jpg"
              alt="Waseem Abbas - Founder & CEO"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Founder's Direct Legal Guarantee</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">
              "Real Estate mein sab se qeemti cheez Sarmaaye ka Tahaffuz hai."
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              "Pakistan mein bohot se log plots aur makanat mein life-savings laga dete hain magar papers mein issues nikal aate hain. WATECH Real Estate ka usool saaf hai: jis property ki registry, intiqal, aur fard hum khud on-ground verify na karein, use platform par qadam nahi rakhne dete."
            </p>
            <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">Waseem Abbas</div>
                <div className="text-xs text-emerald-700 font-semibold">Founder & CEO, WATECH Solutions</div>
              </div>
              <span className="text-slate-300">|</span>
              <div className="text-xs text-slate-600">
                Direct Helpline: <span className="text-slate-900 font-mono font-bold">+92 327 0831470</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs (Accordion) */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <h3 className="text-2xl font-black text-slate-900 text-center mb-6">
          Real Estate FAQs (Aksar Pooche Jane Wale Sawalat)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4.5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 hover:text-emerald-700"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-emerald-600 transition-transform ${
                    openFaqIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaqIndex === i && (
                <div className="px-4.5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Dedicated Real Estate Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/watech-mark-transparent.png"
                  alt="WATECH Real Estate"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-white font-bold text-sm">WATECH Real Estate</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Punjab aur Chiniot ka sab se ba-aitemad verified real estate portal. 100% Registry & Intiqal cleared deals.
              </p>
              <div className="text-slate-300 font-medium">
                CEO: Waseem Abbas
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Property Categories
              </div>
              <ul className="space-y-2">
                <li><button onClick={() => setSelectedType("House")} className="hover:text-emerald-400">Luxury Designer Houses</button></li>
                <li><button onClick={() => setSelectedType("Plot")} className="hover:text-emerald-400">Residential & Commercial Plots</button></li>
                <li><button onClick={() => setSelectedType("Commercial")} className="hover:text-emerald-400">Commercial Plazas & Shops</button></li>
                <li><button onClick={() => setIsCalculatorOpen(true)} className="hover:text-emerald-400">Construction Cost Estimator</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Coverage Cities
              </div>
              <ul className="space-y-2">
                <li><button onClick={() => setSelectedCity("Chiniot")} className="hover:text-emerald-400">Chiniot City Prime</button></li>
                <li><button onClick={() => setSelectedCity("Lahore")} className="hover:text-emerald-400">Lahore (DHA & Bahria)</button></li>
                <li><button onClick={() => setSelectedCity("Faisalabad")} className="hover:text-emerald-400">Faisalabad Canal Road</button></li>
                <li><button onClick={() => setSelectedCity("Islamabad")} className="hover:text-emerald-400">Islamabad Sectors</button></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Verification Office
              </div>
              <p className="text-slate-400 mb-2">
                Katchery Road / Main Market, Chiniot, Punjab, Pakistan
              </p>
              <p className="text-slate-300 font-mono">
                WhatsApp: +92 327 0831470
              </p>
              <p className="text-slate-300">
                Email: waseem000094@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © {new Date().getFullYear()} WATECH Real Estate. All rights reserved.
            </div>
            <div>
              100% On-Ground Legal Ownership Verification Guaranteed.
            </div>
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
