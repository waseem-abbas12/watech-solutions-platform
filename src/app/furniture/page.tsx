"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sofa,
  Sparkles,
  Search,
  CheckCircle2,
  Phone,
  MessageCircle,
  Truck,
  ShieldCheck,
  ChevronDown,
  Hammer,
  Palette,
  Ruler,
  Clock,
  ArrowRight,
  Package,
  Award,
} from "lucide-react";
import { INITIAL_FURNITURE, FurnitureItem } from "@/lib/mock-data";
import { InquiryModal, ModalItemDetails } from "@/components/marketplace/inquiry-modal";

export default function FurniturePortalPage() {
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedWood, setSelectedWood] = useState<string>("All");

  // Custom Order Builder State
  const [customCategory, setCustomCategory] = useState("Bed Set");
  const [customWood, setCustomWood] = useState("100% Seasoned Sheesham");
  const [customPolish, setCustomPolish] = useState("Natural Gloss Polish");
  const [customNotes, setCustomNotes] = useState("");

  // Modals
  const [selectedItemForInquiry, setSelectedItemForInquiry] = useState<ModalItemDetails | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filtered furniture
  const filteredFurniture = useMemo(() => {
    return INITIAL_FURNITURE.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesWood =
        selectedWood === "All" || item.woodType === selectedWood;

      return matchesSearch && matchesCategory && matchesWood;
    });
  }, [searchQuery, selectedCategory, selectedWood]);

  function formatPricePKR(price?: number) {
    if (price && price > 0) {
      if (price >= 100000) return `PKR ${(price / 100000).toFixed(2)} Lac`;
      return `PKR ${price.toLocaleString()}`;
    }
    return "Direct Factory Rate — On Request";
  }

  const handleWhatsAppInquiry = (item: FurnitureItem) => {
    const text = `Assalam-o-Alaikum WATECH Chiniot Furniture, I am interested in: "${item.name}" made of 100% Solid ${item.woodType} Wood (${item.dimensions}). Please share workshop direct factory rate, live video tour, and delivery schedule.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCustomOrderWhatsApp = () => {
    const text = `Assalam-o-Alaikum WATECH Chiniot Workshop, I want a custom order quotation:\n• Item: ${customCategory}\n• Wood: ${customWood}\n• Polish Finish: ${customPolish}\n• Custom Specs: ${customNotes || "Standard King/Family Size"}\nPlease share estimated pricing and manufacturing timeline.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleOpenInquiry = (item: FurnitureItem) => {
    setSelectedItemForInquiry({
      id: item.id,
      title: item.name,
      category: "furniture",
      priceFormatted: "Direct Factory Rate — On Request",
      partnerPhone: item.partnerPhone || "923270831470",
    });
    setIsInquiryOpen(true);
  };

  const faqs = [
    {
      q: "Kya furniture waqai Chiniot ki asli Sheesham lakri se bana hota hai?",
      a: "100% Guaranteed! Humara workshop Chiniot mein waqia hai aur hum sirf seasoned (properly dry aur chemical-treated) pure Pakistani Sheesham lakri use karte hain.",
    },
    {
      q: "Deliver karte waqt lakri ya carving tootne ka risk to nahi hota?",
      a: "Hum 3-Layer Heavy Industrial Foam + Corrugated Packing aur Wooden Crating use karte hain. Lahore, Islamabad, Karachi aur Faisalabad tak 100% damage-free delivery insurance ke sath hoti hai.",
    },
    {
      q: "Kya hum apni marzi ka custom design ya size banwa sakte hain?",
      a: "Ji bilkul! Aap Pinterest, Instagram ya kisi bhi picture ka screenshot humare Custom Order Builder ke zariye bhej sakte hain. Humare master karigar same to same bana kar denge.",
    },
    {
      q: "Termite (Deemak) aur polish ki kya guarantee hai?",
      a: "Hum har piece par 10-Year Anti-Termite (Deemak) guarantee aur premium weather-resistant PU/Lacquer polish provide karte hain jo saalon saal chamakti rehti hai.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-600 selection:text-white flex flex-col">
      {/* 1. Dedicated Furniture Top Bar */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 text-orange-400 font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Chiniot Royal Furniture Showroom
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">100% Seasoned Pure Sheesham Hardwood</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Workshop Desk: <strong className="text-white font-mono">+92 327 0831470</strong></span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-orange-400 font-medium">Safe Nationwide Delivery Across Pakistan</span>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Furniture Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/furniture" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-orange-50 p-1.5 border border-orange-200 group-hover:border-orange-500 transition-colors">
              <Image
                src="/images/watech-mark-transparent.png"
                alt="WATECH Chiniot Furniture"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-mono">WATECH</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-orange-100 text-orange-800 border border-orange-300">
                  CHINIOT ROYAL WOOD
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Handcrafted Sheesham Masterpieces</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                setSelectedCategory("Bed");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="hover:text-orange-600 transition-colors"
            >
              Bridal Bed Sets
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Sofa");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="hover:text-orange-600 transition-colors"
            >
              Carved Living Sofas
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Dining");
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              className="hover:text-orange-600 transition-colors"
            >
              Dining Suites
            </button>
            <a href="#custom-builder" className="hover:text-orange-600 transition-colors flex items-center gap-1">
              <Hammer className="w-3.5 h-3.5 text-orange-600" />
              <span>Custom Order Builder</span>
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#custom-builder"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Hammer className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">Custom Order Builder</span>
              <span className="sm:hidden">Custom</span>
            </a>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Chiniot%20Furniture,%20I%20want%20to%20inquire%20about%20furniture%20designs."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Workshop Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Clean White / Light Theme) */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Direct Chiniot Artisan Workshop Pricing (Zero Middleman)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
              Authentic Handcrafted Chinioti <br />
              <span className="text-orange-600">
                Sheesham Wood Furniture
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
              Generational wood carving mastery direct from Chiniot to your doorstep. 
              Royal Bridal Bedroom Sets, 7-Seater Carved Sofas, and Luxury Dining Tables with 10-Year Termite Guarantee.
            </p>

            {/* Authority Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-orange-600 font-black text-xl">100%</div>
                <div className="text-slate-600 text-xs font-medium">Pure Seasoned Sheesham</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-orange-600 font-black text-xl">10 Yrs</div>
                <div className="text-slate-600 text-xs font-medium">Anti-Termite Cover</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-orange-600 font-black text-xl">Zero</div>
                <div className="text-slate-600 text-xs font-medium">Middleman Markup</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-orange-600 font-black text-xl">Safe</div>
                <div className="text-slate-600 text-xs font-medium">Pakistan Delivery</div>
              </div>
            </div>

            {/* 4. Search & Filter Bar */}
            <div className="bg-slate-50 p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md text-left">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Search */}
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Search Design</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Maharaja Bed, Victorian Sofa, Dining..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Furniture Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                  >
                    <option value="All">All Categories (Beds, Sofas, Dining...)</option>
                    <option value="Bed">Royal Bridal Bed Sets</option>
                    <option value="Sofa">Hand-Carved Living Sofas</option>
                    <option value="Dining">Luxury Dining Suites</option>
                    <option value="Console">Consoles & Heritage Cabinets</option>
                    <option value="Jhoola">Jhoola & Heritage Deewans</option>
                  </select>
                </div>

                {/* Wood */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Wood Material</label>
                  <select
                    value={selectedWood}
                    onChange={(e) => setSelectedWood(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                  >
                    <option value="All">All Hardwoods</option>
                    <option value="Sheesham">100% Seasoned Pure Sheesham</option>
                    <option value="Teak">Imported Burma Teak (Sagwan)</option>
                    <option value="Rosewood">Dark Heritage Rosewood</option>
                  </select>
                </div>
              </div>

              {/* Fast Pills */}
              <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium text-[11px]">Popular Categories:</span>
                <button
                  onClick={() => setSelectedCategory("Bed")}
                  className="px-3 py-1 rounded-full bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 text-xs transition-colors"
                >
                  🛏️ Bridal Bed Sets
                </button>
                <button
                  onClick={() => setSelectedCategory("Sofa")}
                  className="px-3 py-1 rounded-full bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 text-xs transition-colors"
                >
                  🛋️ 7-Seater Carved Sofas
                </button>
                <button
                  onClick={() => setSelectedCategory("Dining")}
                  className="px-3 py-1 rounded-full bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-700 border border-slate-200 text-xs transition-colors"
                >
                  🍽️ 8-Seater Dining
                </button>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedWood("All");
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

      {/* 5. Catalog Section */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>Chiniot Masterpiece Collection</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-300 font-bold">
                {filteredFurniture.length} Pieces Available
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct workshop rates with custom wood polish and fabric customization options.
            </p>
          </div>

          <a
            href="#custom-builder"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-300 text-xs font-bold transition-colors"
          >
            <Hammer className="w-4 h-4 text-orange-600" />
            <span>Customize Any Design</span>
          </a>
        </div>

        {/* Grid */}
        {filteredFurniture.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-xs">
            <Sofa className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-800">Koi furniture piece nahi mila aapke filter ke mutabiq</p>
            <p className="text-xs text-slate-500 mt-1">Filters reset karein ya direct WhatsApp par custom photo send karein.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedWood("All");
              }}
              className="mt-4 px-5 py-2.5 text-xs rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFurniture.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-orange-500 transition-all hover:shadow-xl flex flex-col justify-between group"
              >
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                      {item.woodType} Wood
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold border border-slate-200">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-emerald-800 text-[10px] font-bold border border-slate-200">
                      {item.status || "In Stock"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Handcrafted Seasoned Sheesham</div>
                      <div className="text-sm sm:text-base font-black text-white tracking-tight">
                        Direct Factory Rate
                      </div>
                    </div>
                    <div className="text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5 text-orange-400" />
                      <span>Custom Sizes</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-orange-800 font-medium mb-2 line-clamp-1">
                      Specs: {item.dimensions}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      {item.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons (Orange Action) */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenInquiry(item)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors text-center"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => handleWhatsAppInquiry(item)}
                      className="py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-orange-600/20"
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

      {/* 6. Custom Order Builder Section */}
      <section id="custom-builder" className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 p-6 sm:p-10 rounded-3xl border border-orange-200 shadow-sm">
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center gap-1.5 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Hammer className="w-4 h-4 text-orange-600" />
                Custom Woodcraft Workshop
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                Apni Marzi Ka Custom Furniture Order Karein
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Aapke room ka exact size, pasandeeda polish shade (Deco, Lacquer, Antique Walnut) aur carving pattern select karein. Humare Chiniot master artisans aapke mutabiq banayenge.
              </p>
            </div>

            {/* Builder Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Item Type</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                >
                  <option value="Bridal Bedroom Set">Bridal Bedroom Set (Bed + Tables + Dressing)</option>
                  <option value="7-Seater Royal Carved Sofa">7-Seater Royal Carved Living Sofa</option>
                  <option value="8-Seater Dining Table Suite">8-Seater Dining Table Suite</option>
                  <option value="Heritage Handcrafted Jhoola">Heritage Handcrafted Jhoola / Swing</option>
                  <option value="Custom TV Console / Wardrobe">Custom TV Console / Wardrobe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Wood Material</label>
                <select
                  value={customWood}
                  onChange={(e) => setCustomWood(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                >
                  <option value="100% Seasoned Sheesham">100% Seasoned Pure Sheesham (Recommended)</option>
                  <option value="Burma Teak (Sagwan)">Burma Teak (Sagwan Wood)</option>
                  <option value="Antique Dark Rosewood">Antique Dark Rosewood</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Polish & Finish</label>
                <select
                  value={customPolish}
                  onChange={(e) => setCustomPolish(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-orange-600"
                >
                  <option value="Natural Gloss Lacquer">Natural Gloss Lacquer Polish</option>
                  <option value="Antique Walnut Matte">Antique Walnut Matte Finish</option>
                  <option value="Royal Deco Paint with Gold Leafing">Royal Deco Paint with Gold Leafing</option>
                  <option value="Dark Mahogany Polish">Dark Mahogany Polish</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Custom Dimensions / Requirements / Photo Reference
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 6x6.5 ft Bed, Golden velvet fabric cushion, carving depth 2 inches..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-600"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-600 flex items-center gap-2">
                <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Lahore, Karachi, Islamabad, Faisalabad Doorstep Insured Delivery</span>
              </div>
              <button
                onClick={handleCustomOrderWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Instant WhatsApp Workshop Quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Craftsmanship & Founder Guarantee */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-orange-500 shrink-0 shadow-md">
            <Image
              src="/images/founder-waseem-abbas.jpg"
              alt="Waseem Abbas - Founder"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-semibold border border-orange-200">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
              <span>Direct Chiniot Heritage Guarantee</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">
              "Chinioti Sheesham Sirf Furniture Nahi, Naslon Ka Asasa Hai."
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              "Market mein commercial MDF aur kachi lakri par polish kar ke mehnge damon becha jata hai. WATECH Chiniot Royal Wood par har piece 100% seasoned, chemically anti-termite treated solid Sheesham se banta hai. Hum dukanon ka middleman commission khatam kar ke direct factory rate par provide karte hain."
            </p>
            <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">Waseem Abbas</div>
                <div className="text-xs text-orange-700 font-semibold">Founder & CEO, WATECH Solutions</div>
              </div>
              <span className="text-slate-300">|</span>
              <div className="text-xs text-slate-600">
                Direct Workshop Helpline: <span className="text-slate-900 font-mono font-bold">+92 327 0831470</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs (Accordion) */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <h3 className="text-2xl font-black text-slate-900 text-center mb-6">
          Furniture FAQs (Aksar Pooche Jane Wale Sawalat)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4.5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 hover:text-orange-700"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-orange-600 transition-transform ${
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

      {/* 9. Dedicated Furniture Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/watech-mark-transparent.png"
                  alt="Chiniot Royal Wood"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-white font-bold text-sm">Chiniot Royal Wood</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Asal Chinioti Sheesham lakri ke master karigaron ka banaya hua furniture direct factory price par.
              </p>
              <div className="text-slate-300 font-medium">
                Founder: Waseem Abbas
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Product Collections
              </div>
              <ul className="space-y-2">
                <li><button onClick={() => setSelectedCategory("Bed")} className="hover:text-orange-400">Bridal Bedroom Sets</button></li>
                <li><button onClick={() => setSelectedCategory("Sofa")} className="hover:text-orange-400">7-Seater Carved Living Sofas</button></li>
                <li><button onClick={() => setSelectedCategory("Dining")} className="hover:text-orange-400">Luxury Dining Tables</button></li>
                <li><a href="#custom-builder" className="hover:text-orange-400">Custom Furniture Builder</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Delivery Coverage
              </div>
              <p className="text-slate-400 leading-relaxed mb-2">
                Heavy Crating & Foam Packing ke sath mahfooz delivery:
              </p>
              <p className="text-slate-300">
                Lahore · Islamabad · Karachi · Faisalabad · Multan · Sialkot
              </p>
            </div>

            {/* Col 4 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Artisan Workshop
              </div>
              <p className="text-slate-400 mb-2">
                Main Workshop & Display, Chiniot Industrial Cluster, Punjab, Pakistan
              </p>
              <p className="text-slate-300 font-mono">
                Workshop WhatsApp: +92 327 0831470
              </p>
              <p className="text-slate-300">
                Warranty: 10-Year Anti-Termite Guarantee
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © {new Date().getFullYear()} WATECH Chiniot Royal Wood. All rights reserved.
            </div>
            <div>
              Pure Pakistani Seasoned Sheesham Craftsmanship.
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        item={selectedItemForInquiry}
      />
    </div>
  );
}
