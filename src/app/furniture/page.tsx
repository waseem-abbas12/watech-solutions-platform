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
} from "lucide-react";
import { EcosystemTopBar } from "@/components/common/ecosystem-top-bar";
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

  function formatPricePKR(price: number) {
    if (price >= 100000) {
      return `PKR ${(price / 100000).toFixed(2)} Lac`;
    }
    return `PKR ${price.toLocaleString()}`;
  }

  const handleWhatsAppInquiry = (item: FurnitureItem) => {
    const text = `Assalam-o-Alaikum WATECH Chiniot Furniture, I am interested in: "${item.name}" (${formatPricePKR(item.price)}) made of ${item.woodType} Wood. Please share video tour, factory discount, and delivery details.`;
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
      priceFormatted: formatPricePKR(item.price),
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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-white">
      {/* 1. Universal Ecosystem Top Bar */}
      <EcosystemTopBar currentPortal="furniture" />

      {/* 2. Dedicated Furniture Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo & Furniture Badge */}
          <Link href="/furniture" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-slate-800 p-1 border border-amber-500/40 group-hover:border-amber-400 transition-colors">
              <Image
                src="/images/watech-mark-transparent.png"
                alt="WATECH Chiniot Furniture"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-mono">WATECH</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  CHINIOT ROYAL WOOD
                </span>
              </div>
              <p className="text-[11px] text-amber-200/60 hidden sm:block">Handcrafted Sheesham Masterpieces</p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#custom-builder"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-950/60 text-amber-300 hover:bg-amber-900/80 border border-amber-700/50 transition-colors"
            >
              <Hammer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Custom Order Builder</span>
              <span className="sm:hidden">Custom</span>
            </a>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Chiniot%20Furniture,%20I%20want%20to%20inquire%20about%20furniture%20designs."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 shadow-sm shadow-amber-600/30 transition-all font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Workshop Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-amber-950/30 via-slate-950 to-slate-950 border-b border-slate-800/80">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct Chiniot Artisan Workshop Pricing</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Authentic Handcrafted Chinioti <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">
                Sheesham Wood Furniture
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              Generational wood carving mastery direct from Chiniot to your doorstep. 
              Royal Bridal Bedroom Sets, 7-Seater Carved Sofas, and Luxury Dining Tables with 10-Year Termite Guarantee.
            </p>

            {/* Authority Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="bg-slate-900/80 border border-amber-900/30 rounded-xl p-3 text-center">
                <div className="text-amber-400 font-bold text-lg">100%</div>
                <div className="text-slate-400 text-xs">Pure Sheesham</div>
              </div>
              <div className="bg-slate-900/80 border border-amber-900/30 rounded-xl p-3 text-center">
                <div className="text-amber-400 font-bold text-lg">10 Yrs</div>
                <div className="text-slate-400 text-xs">Anti-Termite Cover</div>
              </div>
              <div className="bg-slate-900/80 border border-amber-900/30 rounded-xl p-3 text-center">
                <div className="text-amber-400 font-bold text-lg">Zero</div>
                <div className="text-slate-400 text-xs">Middleman Markup</div>
              </div>
              <div className="bg-slate-900/80 border border-amber-900/30 rounded-xl p-3 text-center">
                <div className="text-amber-400 font-bold text-lg">Safe</div>
                <div className="text-slate-400 text-xs">Pakistan Delivery</div>
              </div>
            </div>

            {/* 4. Interactive Category & Filter Bar */}
            <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-xl shadow-black/40 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Search */}
                <div className="relative">
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Search Design</label>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Maharaja Bed, Victorian Sofa, Dining..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Furniture Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="All">All Categories (Beds, Sofas, Dining...)</option>
                    <option value="Bed">Royal Bridal Bed Sets</option>
                    <option value="Sofa">Hand-Carved Living Sofas</option>
                    <option value="Dining">Luxury Dining Suites</option>
                    <option value="Console">Consoles & Heritage Cabinets</option>
                    <option value="Jhoola">Jhoola & Heritage Deewans</option>
                  </select>
                </div>

                {/* Wood Type */}
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1">Wood Material</label>
                  <select
                    value={selectedWood}
                    onChange={(e) => setSelectedWood(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="All">All Hardwoods</option>
                    <option value="Sheesham">100% Seasoned Pure Sheesham</option>
                    <option value="Teak">Imported Burma Teak (Sagwan)</option>
                    <option value="Rosewood">Dark Heritage Rosewood</option>
                  </select>
                </div>
              </div>

              {/* Fast Pills */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 text-[11px]">Popular:</span>
                <button
                  onClick={() => {
                    setSelectedCategory("Bed");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-amber-600/20 text-slate-300 hover:text-amber-300 border border-slate-700 text-[11px] transition-colors"
                >
                  🛏️ Bridal Bedroom Sets
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("Sofa");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-amber-600/20 text-slate-300 hover:text-amber-300 border border-slate-700 text-[11px] transition-colors"
                >
                  🛋️ 7-Seater Carved Sofas
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory("Dining");
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-amber-600/20 text-slate-300 hover:text-amber-300 border border-slate-700 text-[11px] transition-colors"
                >
                  🍽️ 8-Seater Dining
                </button>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedWood("All");
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

      {/* 5. Furniture Catalog Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span>Chiniot Masterpiece Collection</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {filteredFurniture.length} Pieces Available
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct workshop rates with custom wood polish and fabric customization options.
            </p>
          </div>

          <a
            href="#custom-builder"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-600/40 text-xs font-semibold transition-colors"
          >
            <Hammer className="w-3.5 h-3.5 text-amber-400" />
            <span>Customize Any Design</span>
          </a>
        </div>

        {/* Grid */}
        {filteredFurniture.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Sofa className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-medium text-slate-300">Koi furniture piece nahi mila aapke filter ke mutabiq</p>
            <p className="text-xs text-slate-500 mt-1">Filters reset karein ya direct WhatsApp par custom photo send karein.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedWood("All");
              }}
              className="mt-4 px-4 py-2 text-xs rounded-lg bg-amber-600 text-slate-950 font-bold hover:bg-amber-500 transition-colors"
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
                className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-950/30 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                      {item.woodType} Wood
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-slate-200 text-[10px] font-medium border border-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold border border-slate-700">
                      {item.status || "In Stock"}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Workshop Direct Rate</div>
                      <div className="text-lg font-bold text-white tracking-tight">
                        {formatPricePKR(item.price)}
                      </div>
                    </div>
                    <div className="text-[11px] text-amber-300 bg-slate-900/90 px-2 py-1 rounded-md border border-slate-800 flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      <span>Custom Sizes</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-amber-200/70 mb-2 line-clamp-1">
                      Specs: {item.dimensions}
                    </p>

                    <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1 mb-4">
                      {item.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => handleOpenInquiry(item)}
                      className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors text-center"
                    >
                      View Details & Specs
                    </button>
                    <button
                      onClick={() => handleWhatsAppInquiry(item)}
                      className="py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-amber-600/30"
                      title="Direct Workshop WhatsApp"
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

      {/* 6. Custom Order Builder Section */}
      <section id="custom-builder" className="py-14 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-slate-900 p-6 sm:p-10 rounded-3xl border border-amber-500/30">
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Hammer className="w-4 h-4" />
                Custom Woodcraft Workshop
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Apni Marzi Ka Custom Furniture Order Karein
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aapke room ka exact size, pasandeeda polish shade (Deco, Lacquer, Antique Walnut) aur carving pattern select karein. Humare Chiniot master artisans aapke mutabiq banayenge.
              </p>
            </div>

            {/* Interactive Builder Form */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Item Type</label>
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Bridal Bedroom Set">Bridal Bedroom Set (Bed + Tables + Dressing)</option>
                  <option value="7-Seater Royal Carved Sofa">7-Seater Royal Carved Living Sofa</option>
                  <option value="8-Seater Dining Table Suite">8-Seater Dining Table Suite</option>
                  <option value="Heritage Handcrafted Jhoola">Heritage Handcrafted Jhoola / Swing</option>
                  <option value="Custom TV Console / Wardrobe">Custom TV Console / Wardrobe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Wood Material</label>
                <select
                  value={customWood}
                  onChange={(e) => setCustomWood(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="100% Seasoned Sheesham">100% Seasoned Pure Sheesham (Recommended)</option>
                  <option value="Burma Teak (Sagwan)">Burma Teak (Sagwan Wood)</option>
                  <option value="Antique Dark Rosewood">Antique Dark Rosewood</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Polish & Finish</label>
                <select
                  value={customPolish}
                  onChange={(e) => setCustomPolish(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Natural Gloss Lacquer">Natural Gloss Lacquer Polish</option>
                  <option value="Antique Walnut Matte">Antique Walnut Matte Finish</option>
                  <option value="Royal Deco Paint with Gold Leafing">Royal Deco Paint with Gold Leafing</option>
                  <option value="Dark Mahogany Polish">Dark Mahogany Polish</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Custom Dimensions / Requirements / Photo Reference
              </label>
              <textarea
                rows={2}
                placeholder="e.g. 6x6.5 ft Bed, Golden velvet fabric cushion, carving depth 2 inches..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Lahore, Karachi, Islamabad, Faisalabad Doorstep Delivery Available</span>
              </div>
              <button
                onClick={handleCustomOrderWhatsApp}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
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
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-amber-500/40 shrink-0 shadow-lg shadow-amber-950/50">
            <Image
              src="/images/founder-waseem-abbas.jpg"
              alt="Waseem Abbas - Founder"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Chiniot Heritage Guarantee</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              "Chinioti Sheesham Sirf Furniture Nahi, Naslon Ka Asasa Hai."
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              "Market mein commercial MDF aur kachi lakri par polish kar ke mehnge damon becha jata hai. WATECH Chiniot Royal Wood par har piece 100% seasoned, chemically anti-termite treated solid Sheesham se banta hai. Hum dukanon ka middleman commission khatam kar ke direct factory rate par provide karte hain."
            </p>
            <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
              <div>
                <div className="text-sm font-bold text-white">Waseem Abbas</div>
                <div className="text-xs text-amber-400">Founder & CEO, WATECH Solutions</div>
              </div>
              <span className="text-slate-700">|</span>
              <div className="text-xs text-slate-400">
                Direct Workshop Helpline: <span className="text-white font-mono">+92 327 0831470</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <h3 className="text-xl font-bold text-white text-center mb-6">
          Furniture FAQs (Aksar Pooche Jane Wale Sawalat)
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
                  className={`w-4 h-4 text-amber-400 transition-transform ${
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

      {/* 9. Dedicated Furniture Footer */}
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
            <span className="text-white font-bold">Chiniot Royal Furniture</span>
            <span className="text-slate-600">|</span>
            <span>A Specialized Portal of WATECH Solutions</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Main Ecosystem Hub
            </Link>
            <Link href="/real-estate" className="hover:text-white transition-colors">
              Real Estate Portal
            </Link>
            <Link href="/agency" className="hover:text-white transition-colors">
              Digital Agency
            </Link>
          </div>
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} WATECH Chiniot Royal Wood. All rights reserved.
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
