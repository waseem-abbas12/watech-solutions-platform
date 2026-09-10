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
  FileCheck,
  Trees,
  CalendarCheck,
  Check,
  Compass,
} from "lucide-react";
import { INITIAL_PROPERTIES, PropertyItem } from "@/lib/mock-data";
import { PropertyCalculatorModal } from "@/components/marketplace/property-calculator-modal";
import { InquiryModal, ModalItemDetails } from "@/components/marketplace/inquiry-modal";

export default function RealEstatePortalPage() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState<"All" | "House" | "Plot" | "Commercial" | "Agriculture" | "Installment">("All");
  const [priceFilter, setPriceFilter] = useState<"All" | "under2" | "2to5" | "above5">("All");

  // Modals state
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedItemForInquiry, setSelectedItemForInquiry] = useState<ModalItemDetails | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const propertyTypes = [
    { id: "All", label: "All Properties", icon: "🏢" },
    { id: "House", label: "Houses & Villas", icon: "🏡" },
    { id: "Plot", label: "Plots & Files", icon: "📐" },
    { id: "Commercial", label: "Commercial Plazas", icon: "🏬" },
    { id: "Agriculture", label: "Agricultural & Farmhouses", icon: "🌾" },
    { id: "Installment", label: "Installment Projects", icon: "📅" },
  ];

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

  const handleWhatsAppInquiry = (prop: PropertyItem) => {
    const text = `Assalam-o-Alaikum WATECH Real Estate, I am interested in: "${prop.title}" (${prop.area}) in ${prop.location}. Please share the current verified demand price, legal registry/intiqal documents, and schedule an on-ground visit.`;
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

  const legalChecklist = [
    { step: "01", title: "Fard & Intiqal Verification", desc: "Patwari ya Arazi Record Center (PLRA) se asal malikan ka record match karna." },
    { step: "02", title: "Original Registry & Aks Shajra", desc: "Zameen ka asal naqsha aur boundary demarcation check karna." },
    { step: "03", title: "Development Authority NOC", desc: "LDA, CDA, FDA ya TMA se society ke layout plan ki legal approval tasdeeq." },
    { step: "04", title: "Non-Encumbrance Certificate", desc: "Zameen par koi bank loan, stay order ya adalat ka qanooni tanaza na hona." },
  ];

  const faqs = [
    {
      q: "Kya tamam properties registry aur intiqal verified hain?",
      a: "Ji haan, WATECH Real Estate par listed har plot aur ghar on-ground physical record aur patwari/registry verification ke baad hi publish hota hai taake fraud ka 0% risk ho.",
    },
    {
      q: "Overseas Pakistanis ke liye property purchase ka kya process hai?",
      a: "Hum overseas clients ke liye live 4K video walkthrough, official digital legal verification, aur direct Power of Attorney assistance provide karte hain. Tamam payments direct verified bank escrow ke through hoti hain.",
    },
    {
      q: "Kya installment par bhi plots aur houses dastiyab hain?",
      a: "Bilkul! Humare pas Chiniot prime societies aur Lahore/Faisalabad mein 1 saal se 3 saal ke asaan mahana installment plans wale plots aur files moojood hain jin par down payment de kar foran booking hoti hai.",
    },
    {
      q: "Agricultural zameen khareedte waqt pani aur raste ki kya tasdeeq hoti hai?",
      a: "Hum tube-well electric connection, nehari pani ke baray ki baari (Warabandi), aur sarkari raste ki pakki registry tasdeeq ke baghair koi zameen list nahi karte.",
    },
    {
      q: "Kya hum apni property WATECH par sell karne ke liye de sakte hain?",
      a: "Ji bilkul! Aap humare WhatsApp par direct property details send kar sakte hain, humari team 24 ghante mein legal documents verify kar ke verified buyers tak pohchaye gi.",
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
              WATECH Verified Real Estate Portal
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">100% Registry, Intiqal & NOC Verified Listings</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Main Hub
            </Link>
            <Link href="/furniture" className="hover:text-white transition-colors">
              Chinioti Furniture
            </Link>
            <Link href="/agency" className="hover:text-white transition-colors">
              Agency & Tech
            </Link>
            <span className="text-slate-600">|</span>
            <span>Helpline: <strong className="text-white font-mono">+92 327 0831470</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Real Estate Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
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
              <p className="text-[11px] text-slate-500 hidden sm:block">Verified Properties & Legal Assurance</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                setSelectedType("House");
                window.scrollTo({ top: 450, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Houses & Villas
            </button>
            <button
              onClick={() => {
                setSelectedType("Plot");
                window.scrollTo({ top: 450, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Plots & Files
            </button>
            <button
              onClick={() => {
                setSelectedType("Commercial");
                window.scrollTo({ top: 450, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Commercial Plazas
            </button>
            <button
              onClick={() => {
                setSelectedType("Agriculture");
                window.scrollTo({ top: 450, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Agricultural & Farms
            </button>
            <button
              onClick={() => {
                setSelectedType("Installment");
                window.scrollTo({ top: 450, behavior: "smooth" });
              }}
              className="hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Installment Plans
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Material Specs & BOQ</span>
              <span className="sm:hidden">BOQ</span>
            </button>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Real%20Estate,%20I%20want%20to%20inquire%20about%20verified%20properties."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Property Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zero Risk Legal Guarantee · 100% On-Ground Physical Verification</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
              Kharido Ya Becho, <br />
              <span className="text-emerald-600">
                Mukammal Qanooni Tahaffuz Ke Sath
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
              DHA, Bahria Town, Chiniot Societies aur Punjab ke prime locations par verified Luxury Houses, Plots, Commercial Plazas, Agricultural Lands, aur Asaan Installment Projects.
            </p>

            {/* Authority Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">100%</div>
                <div className="text-slate-600 text-xs font-medium">Registry & Intiqal Check</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">0%</div>
                <div className="text-slate-600 text-xs font-medium">Fake Listing Tolerated</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">4K</div>
                <div className="text-slate-600 text-xs font-medium">Overseas Video Tours</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-emerald-600 font-black text-xl">Direct</div>
                <div className="text-slate-600 text-xs font-medium">Owner & Buyer Sync</div>
              </div>
            </div>

            {/* 4. Search & Filter Bar */}
            <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md text-left">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                {/* Search */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Search Property</label>
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
                    <option value="All">All Cities (Pakistan)</option>
                    <option value="Chiniot">Chiniot & Suburbs</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Karachi">Karachi</option>
                  </select>
                </div>

                {/* Property Type (5 Core Types) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Property Category</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="All">All Property Types</option>
                    <option value="House">Houses & Luxury Villas</option>
                    <option value="Plot">Residential Plots & Files</option>
                    <option value="Commercial">Commercial Plazas & Shops</option>
                    <option value="Agriculture">Agricultural Lands & Farmhouses</option>
                    <option value="Installment">Easy Installment Projects</option>
                  </select>
                </div>

                {/* Price Bracket */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Price Bracket</label>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value as any)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                  >
                    <option value="All">Any Demand Budget</option>
                    <option value="under2">Under PKR 2.0 Crore</option>
                    <option value="2to5">PKR 2.0 Cr - 5.0 Cr</option>
                    <option value="above5">Above PKR 5.0 Crore</option>
                  </select>
                </div>
              </div>

              {/* Fast Filter Pills */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium text-[11px]">Quick Categories:</span>
                {propertyTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedType(pt.id as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      selectedType === pt.id
                        ? "bg-emerald-600 text-white shadow-xs font-bold"
                        : "bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200"
                    }`}
                  >
                    <span>{pt.icon}</span> {pt.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCity("All");
                    setSelectedType("All");
                    setPriceFilter("All");
                  }}
                  className="ml-auto text-slate-500 hover:text-slate-900 text-xs underline cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Properties Catalog */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>Verified On-Ground Property Listings</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                {filteredProperties.length} Properties
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tamam listings physical inspection aur registry documentation verification ke baad update ki gayi hain.
            </p>
          </div>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-emerald-600" />
            <span>Consult Material & BOQ Specs</span>
          </button>
        </div>

        {/* Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-800">Koi property nahi mili aapke filter ke mutabiq</p>
            <p className="text-xs text-slate-500 mt-1">Filters reset karein ya direct WhatsApp par apni zaroorat batayein.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCity("All");
                setSelectedType("All");
                setPriceFilter("All");
              }}
              className="mt-4 px-5 py-2.5 text-xs rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
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
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
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
                      {prop.type}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold border border-slate-200">
                      {prop.city}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold border border-slate-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">Demand Valuation</div>
                      <div className="text-base sm:text-lg font-black text-white tracking-tight">
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
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {prop.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Features Badges */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 pb-3 border-b border-slate-100 mb-3">
                      {prop.bedrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bedrooms} Beds</span>
                        </div>
                      )}
                      {prop.bathrooms > 0 && (
                        <div className="flex items-center gap-1">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Maximize className="w-3.5 h-3.5 text-slate-400" />
                        <span>{prop.area}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      {prop.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenInquiry(prop)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors text-center cursor-pointer"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => handleWhatsAppInquiry(prop)}
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 cursor-pointer"
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

      {/* 6. 7-Point Legal & Registry Due Diligence Blueprint */}
      <section className="py-14 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
              Legal Protection Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              WATECH Qanooni Tasdeeq Framework (Zero Fraud)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Zameen khareedte waqt patwari ya society ke chakkar mein aam insan phans jata hai. Hum har deal se pehle 4 bunyadi tests pass karte hain:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {legalChecklist.map((item) => (
              <div key={item.step} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Overseas Pakistani Investor Desk */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Overseas Pakistani Dedicated Facilitation Desk</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Gulf, UK & US Pakistanis Ke Liye Secure Property Investment
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pakistan aane ki zaroorat nahi. Hum aapko live 4K site video call, official land registry scanned documents, aur verified bank accounts ke zariye clean asset transfer karwate hain.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 justify-center md:justify-start">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live 4K Drone Walkthroughs</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Embassy Attested Power of Attorney</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Escrow Banking Payment</span>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Real%20Estate,%20I%20am%20an%20Overseas%20Pakistani%20interested%20in%20secure%20property%20investment."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect with Overseas Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. FAQs Accordion */}
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
                className="w-full p-4.5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 hover:text-emerald-700 cursor-pointer"
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
                Pakistan ki sab se bharosemand real estate advisory: 100% legal verification, DHA/Bahria luxury houses, agricultural farmlands, aur installment projects.
              </p>
              <div className="text-slate-300 font-medium">
                CEO: Waseem Abbas
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Property Portfolios
              </div>
              <ul className="space-y-2">
                <li><button onClick={() => setSelectedType("House")} className="hover:text-emerald-400 cursor-pointer">Luxury Houses & Villas</button></li>
                <li><button onClick={() => setSelectedType("Plot")} className="hover:text-emerald-400 cursor-pointer">Residential Plots & Files</button></li>
                <li><button onClick={() => setSelectedType("Commercial")} className="hover:text-emerald-400 cursor-pointer">Commercial Plazas & Shops</button></li>
                <li><button onClick={() => setSelectedType("Agriculture")} className="hover:text-emerald-400 cursor-pointer">Agricultural Farmland & Farms</button></li>
                <li><button onClick={() => setSelectedType("Installment")} className="hover:text-emerald-400 cursor-pointer">3-Year Installment Projects</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Active Coverage Cities
              </div>
              <p className="text-slate-400 leading-relaxed mb-2">
                On-ground teams aur legal advisory in:
              </p>
              <p className="text-slate-300">
                Lahore (DHA, Bahria) · Chiniot & Faisalabad · Islamabad (CDA, Gulberg) · Rawalpindi · Karachi
              </p>
            </div>

            {/* Col 4 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Legal Advisory Desk
              </div>
              <p className="text-slate-400 mb-2">
                Central Registry Verification & Client Office, Punjab, Pakistan
              </p>
              <p className="text-slate-300 font-mono">
                WhatsApp Desk: +92 327 0831470
              </p>
              <p className="text-slate-300">
                Overseas Inquiry: Available 24/7
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © {new Date().getFullYear()} WATECH Real Estate Ecosystem. All rights reserved.
            </div>
            <div>
              100% Registry & Intiqal Verification Protocol.
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
