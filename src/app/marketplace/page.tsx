"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Trees,
  SlidersHorizontal,
  ArrowRight,
  MessageCircle,
  Users,
  Utensils,
  ChevronDown,
} from "lucide-react";
import {
  INITIAL_PROPERTIES,
  INITIAL_FURNITURE,
  INITIAL_EVENTS,
  PropertyItem,
  FurnitureItem,
  EventItem,
} from "@/lib/mock-data";
import { InquiryModal, ModalItemDetails } from "@/components/marketplace/inquiry-modal";
import { PropertyCalculatorModal } from "@/components/marketplace/property-calculator-modal";
import { CateringCalculatorModal } from "@/components/marketplace/catering-calculator-modal";
import { Calculator } from "lucide-react";

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

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const rawTab = searchParams.get("tab") || "properties";
  const initialTab =
    rawTab === "food-catering" || rawTab === "events" || rawTab === "food" || rawTab === "catering"
      ? "food-catering"
      : rawTab === "furniture"
      ? "furniture"
      : "properties";

  // Active Tab state: 'properties' | 'furniture' | 'food-catering' | 'events'
  const [activeTab, setActiveTab] = useState<"properties" | "furniture" | "food-catering" | "events">(
    initialTab
  );

  // Dynamic Properties List (syncs newly added properties from Admin Panel)
  const [propertiesList, setPropertiesList] = useState<PropertyItem[]>(INITIAL_PROPERTIES);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("watech_custom_properties_v1");
        if (raw) {
          const customProps = JSON.parse(raw);
          if (Array.isArray(customProps) && customProps.length > 0) {
            setPropertiesList((prev) => {
              const ids = new Set(customProps.map((c: any) => c.id));
              return [...customProps, ...prev.filter((p) => !ids.has(p.id))];
            });
          }
        }
      }
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab === "furniture" || currentTab === "properties") {
      setActiveTab(currentTab);
    } else if (
      currentTab === "food-catering" ||
      currentTab === "events" ||
      currentTab === "food" ||
      currentTab === "catering"
    ) {
      setActiveTab("food-catering");
    }
  }, [searchParams]);

  // Global Unified Search
  const [searchQuery, setSearchQuery] = useState("");

  // Filters for Properties
  const [propertyCity, setPropertyCity] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [propertyMaxPrice, setPropertyMaxPrice] = useState(10000000000); // 1000 Crore max

  // Filters for Furniture
  const [woodType, setWoodType] = useState("All");
  const [furnitureCategory, setFurnitureCategory] = useState("All");
  const [furnitureMaxPrice, setFurnitureMaxPrice] = useState(10000000); // 1 Crore max

  // Filters for Events
  const [eventCategory, setEventCategory] = useState("All");
  const [eventCity, setEventCity] = useState("All");
  const [eventMenuType, setEventMenuType] = useState("All");
  const [eventMinCapacity, setEventMinCapacity] = useState(100);

  // Sorting
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");

  // Pagination / Load more limits
  const [visibleCount, setVisibleCount] = useState(6);

  // Inquiry Modal State
  const [modalItem, setModalItem] = useState<ModalItemDetails | null>(null);

  // Conversion Calculator States
  const [isPropertyCalcOpen, setIsPropertyCalcOpen] = useState(false);
  const [isCateringCalcOpen, setIsCateringCalcOpen] = useState(false);

  // ----------------------------------------------------
  // Filtered Lists & Grouped Search Counts
  // ----------------------------------------------------
  const filteredProperties = useMemo(() => {
    const list = propertiesList.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCity = propertyCity === "All" || p.city === propertyCity;
      const matchType = propertyType === "All" || p.type === propertyType;
      const matchPrice = p.price <= propertyMaxPrice;
      return matchSearch && matchCity && matchType && matchPrice;
    });

    if (sortBy === "price-asc") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return list;
  }, [searchQuery, propertyCity, propertyType, propertyMaxPrice, sortBy]);

  const filteredFurniture = useMemo(() => {
    const list = INITIAL_FURNITURE.filter((f) => {
      const matchSearch =
        !searchQuery ||
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.woodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchWood = woodType === "All" || f.woodType === woodType;
      const matchCat = furnitureCategory === "All" || f.category === furnitureCategory;
      const matchPrice = f.price <= furnitureMaxPrice;
      return matchSearch && matchWood && matchCat && matchPrice;
    });

    if (sortBy === "price-asc") return list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return list.sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return list;
  }, [searchQuery, woodType, furnitureCategory, furnitureMaxPrice, sortBy]);

  const filteredEvents = useMemo(() => {
    const list = INITIAL_EVENTS.filter((e) => {
      const matchSearch =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.menuType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = eventCategory === "All" || e.category === eventCategory;
      const matchCity = eventCity === "All" || e.city === eventCity;
      const matchMenu = eventMenuType === "All" || e.menuType === eventMenuType;
      const matchCap = e.capacity >= eventMinCapacity;
      return matchSearch && matchCategory && matchCity && matchMenu && matchCap;
    });

    if (sortBy === "price-asc") return list.sort((a, b) => a.packagePrice - b.packagePrice);
    if (sortBy === "price-desc") return list.sort((a, b) => b.packagePrice - a.packagePrice);
    if (sortBy === "newest") return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return list;
  }, [searchQuery, eventCategory, eventCity, eventMenuType, eventMinCapacity, sortBy]);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-24 text-slate-900 selection:bg-[#16A34A] selection:text-white">
      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        item={modalItem}
      />

      {/* Property Conversion Calculator Modal */}
      <PropertyCalculatorModal
        isOpen={isPropertyCalcOpen}
        onClose={() => setIsPropertyCalcOpen(false)}
      />

      {/* Catering Conversion Calculator Modal */}
      <CateringCalculatorModal
        isOpen={isCateringCalcOpen}
        onClose={() => setIsCateringCalcOpen(false)}
      />

      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A]">
                Unified Marketplace
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">
                Browse, Compare & Inquire
              </h1>
              <p className="text-slate-600 mt-2 text-sm md:text-base max-w-xl">
                Verified real estate, authentic Chinioti woodcraft, and food & catering services straight from direct sellers.
              </p>
            </div>

            {/* Live Search Counts Badge Bar */}
            {searchQuery && (
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  Properties: <strong className="text-[#16A34A]">{filteredProperties.length}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  Furniture: <strong className="text-[#16A34A]">{filteredFurniture.length}</strong>
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                  Food & Catering: <strong className="text-[#16A34A]">{filteredEvents.length}</strong>
                </span>
              </div>
            )}
          </div>

          {/* =========================================
              SEARCH BAR & SORT CONTROLS
              ========================================= */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-4xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties, furniture, or events by city, name, or style..."
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="shrink-0 flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold uppercase text-slate-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {/* =========================================
              3 TABS (Properties | Furniture | Events)
              ========================================= */}
          <div className="mt-8 flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setActiveTab("properties");
                setVisibleCount(6);
              }}
              className={`pb-3.5 px-4 font-bold text-sm tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "properties"
                  ? "border-[#16A34A] text-[#16A34A]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              🏡 Properties ({filteredProperties.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("furniture");
                setVisibleCount(6);
              }}
              className={`pb-3.5 px-4 font-bold text-sm tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "furniture"
                  ? "border-[#16A34A] text-[#16A34A]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              🪑 Furniture ({filteredFurniture.length})
            </button>

            <button
              onClick={() => {
                setActiveTab("food-catering");
                setVisibleCount(6);
              }}
              className={`pb-3.5 px-4 font-bold text-sm tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "food-catering" || activeTab === "events"
                  ? "border-[#16A34A] text-[#16A34A]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              🍲 Food & Catering ({filteredEvents.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area with Filters */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* =========================================
            TAB 1: PROPERTIES TAB
            ========================================= */}
        {activeTab === "properties" && (
          <div className="space-y-8">
            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  City
                </label>
                <select
                  value={propertyCity}
                  onChange={(e) => setPropertyCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Faisalabad">Faisalabad</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Types</option>
                  <option value="House">House / Villa</option>
                  <option value="Plot">Residential Plot</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <span>Max Budget</span>
                  <span className="text-[#16A34A]">{formatPKR(propertyMaxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000000000}
                  step={10000000}
                  value={propertyMaxPrice}
                  onChange={(e) => setPropertyMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#16A34A] cursor-pointer"
                />
              </div>
            </div>

            {/* Interactive Calculator Quick Launch Card */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-2xl p-5 border border-emerald-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">Marla Converter & Construction Cost Estimator</h3>
                  <p className="text-xs text-slate-300">Convert Marla/Sq Ft (Lahore vs Islamabad standard) and estimate grey vs finished building cost in PKR</p>
                </div>
              </div>
              <button
                onClick={() => setIsPropertyCalcOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Open Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.slice(0, visibleCount).map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/70 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* 16:9 Image container */}
                    <Link href={`/marketplace/properties/${prop.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                        {prop.type}
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="text-sm font-black text-emerald-700 tracking-wider uppercase mb-1">
                        Demand on Consultation
                      </div>
                      <Link href={`/marketplace/properties/${prop.id}`} className="block group-hover:text-[#16A34A] transition-colors">
                        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1 mb-2">
                          {prop.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <div className="flex items-center gap-4 py-3 border-t border-slate-100 text-xs text-slate-600">
                        {prop.bedrooms > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Bed className="w-4 h-4 text-slate-400" />
                            <span>{prop.bedrooms} Beds</span>
                          </div>
                        )}
                        {prop.bathrooms > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Bath className="w-4 h-4 text-slate-400" />
                            <span>{prop.bathrooms} Baths</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <Maximize className="w-4 h-4 text-slate-400" />
                          <span>{prop.area}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() =>
                        setModalItem({
                          id: prop.id,
                          title: prop.title,
                          category: "property",
                          priceFormatted: "Demand on Consultation",
                          partnerPhone: prop.partnerPhone,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-[#16A34A] text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Scroll / Load More */}
            {visibleCount < filteredProperties.length && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Load More Properties
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            TAB 2: FURNITURE TAB
            ========================================= */}
        {activeTab === "furniture" && (
          <div className="space-y-8">
            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Wood Type
                </label>
                <select
                  value={woodType}
                  onChange={(e) => setWoodType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Woods</option>
                  <option value="Sheesham">Pure Sheesham</option>
                  <option value="Teak">Teak Wood</option>
                  <option value="Rosewood">Rosewood</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Category
                </label>
                <select
                  value={furnitureCategory}
                  onChange={(e) => setFurnitureCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Bed">Beds & Bedroom Sets</option>
                  <option value="Sofa">Sofa & Living Room Sets</option>
                  <option value="Dining">Dining Suites & Chairs</option>
                  <option value="Cabinet">Cabinets & Showcases</option>
                  <option value="Console">Consoles & Mirrors</option>
                  <option value="Jhoola">Jhoolas & Swings</option>
                  <option value="Tables">Coffee & Nesting Tables</option>
                  <option value="Custom">Custom & Bespoke Carvings</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <span>Max Price</span>
                  <span className="text-[#16A34A]">{formatPKR(furnitureMaxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000000}
                  step={50000}
                  value={furnitureMaxPrice}
                  onChange={(e) => setFurnitureMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#16A34A] cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Category Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: "All", label: "All Items" },
                { id: "Bed", label: "Beds & Suites" },
                { id: "Sofa", label: "Sofas & Living" },
                { id: "Dining", label: "Dining & Chairs" },
                { id: "Cabinet", label: "Cabinets & Showcases" },
                { id: "Console", label: "Consoles & Mirrors" },
                { id: "Jhoola", label: "Royal Jhoolas" },
                { id: "Tables", label: "Coffee & Nesting Tables" },
                { id: "Custom", label: "Custom Art" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFurnitureCategory(c.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    furnitureCategory === c.id
                      ? "bg-[#16A34A] text-white shadow-md shadow-emerald-500/20"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Furniture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFurniture.slice(0, visibleCount).map((furn) => (
                <div
                  key={furn.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/70 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* 16:9 Image container */}
                    <Link href={`/marketplace/furniture/${furn.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={furn.image}
                        alt={furn.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                        {furn.woodType}
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="text-sm font-black text-emerald-700 tracking-wider uppercase mb-1">
                        Direct Factory Rate
                      </div>
                      <Link href={`/marketplace/furniture/${furn.id}`} className="block group-hover:text-[#16A34A] transition-colors">
                        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1 mb-2">
                          {furn.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <Trees className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                        <span>Chinioti Handcrafted Solid {furn.woodType}</span>
                      </div>

                      <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                        <span className="font-semibold text-slate-700">Specs: </span>
                        {furn.dimensions}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() =>
                        setModalItem({
                          id: furn.id,
                          title: furn.name,
                          category: "furniture",
                          priceFormatted: "Direct Factory Rate — On Request",
                          partnerPhone: furn.partnerPhone,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-[#16A34A] text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredFurniture.length && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Load More Furniture
                </button>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            TAB 3: FOOD & CATERING TAB
            ========================================= */}
        {(activeTab === "food-catering" || activeTab === "events") && (
          <div className="space-y-8">
            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-4 gap-6 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Food Category
                </label>
                <select
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Pakwan Center">Pakwan Centers & Daigs</option>
                  <option value="Catering">Catering & Live BBQ</option>
                  <option value="Restaurant">Restaurants & Dining</option>
                  <option value="Bakeries & Sweets">Bakeries & Sweets</option>
                  <option value="Fast Food">Fast Food & BBQ</option>
                  <option value="Food Suppliers">Food Suppliers & Spices</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  City
                </label>
                <select
                  value={eventCity}
                  onChange={(e) => setEventCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Cuisine / Type
                </label>
                <select
                  value={eventMenuType}
                  onChange={(e) => setEventMenuType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Cuisines</option>
                  <option value="Desi">Desi Traditional</option>
                  <option value="BBQ">Live BBQ</option>
                  <option value="Continental">Continental & Pan-Asian</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <span>Min Capacity / Order</span>
                  <span className="text-[#16A34A]">{eventMinCapacity}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={50}
                  value={eventMinCapacity}
                  onChange={(e) => setEventMinCapacity(Number(e.target.value))}
                  className="w-full accent-[#16A34A] cursor-pointer"
                />
              </div>
            </div>

            {/* Interactive Food & Catering Calculator Quick Launch Card */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 text-white rounded-2xl p-5 border border-emerald-800/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">Event Catering & Daig Budget Estimator</h3>
                  <p className="text-xs text-slate-300">Calculate instant per-head & daig costs for Biryani, Qorma, BBQ, staffing, and event buffers</p>
                </div>
              </div>
              <button
                onClick={() => setIsCateringCalcOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-emerald-600 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Estimate Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Food & Catering Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.slice(0, visibleCount).map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/70 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* 16:9 Image container */}
                    <Link href={`/marketplace/food-catering/${event.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                        {event.category}
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="text-sm font-black text-emerald-700 tracking-wider uppercase mb-1">
                        Custom Menu Quotation
                      </div>
                      <Link href={`/marketplace/food-catering/${event.id}`} className="block group-hover:text-[#16A34A] transition-colors">
                        <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1 mb-2">
                          {event.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{event.venue}</span>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>Cap: {event.capacity.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Utensils className="w-4 h-4 text-slate-400" />
                          <span>{event.menuType}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() =>
                        setModalItem({
                          id: event.id,
                          title: event.title,
                          category: "event",
                          priceFormatted: "Custom Menu Quotation",
                          partnerPhone: event.partnerPhone,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-[#16A34A] text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inquire Menu & Booking</span>
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredEvents.length && (
              <div className="text-center pt-8">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Load More Food & Catering
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function MarketplaceSkeleton() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-24 text-slate-900 animate-pulse">
      {/* Header Banner Skeleton */}
      <section className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-4 w-36 bg-slate-200 rounded-full mb-3" />
          <div className="h-10 w-80 bg-slate-200 rounded-2xl mb-4" />
          <div className="h-4 w-96 max-w-full bg-slate-100 rounded-full mb-8" />

          {/* Search bar skeleton */}
          <div className="max-w-3xl h-14 bg-slate-100 rounded-2xl mb-8" />

          {/* Tabs skeleton */}
          <div className="flex gap-4 border-b border-slate-200 pb-3">
            <div className="h-6 w-32 bg-slate-200 rounded-full" />
            <div className="h-6 w-32 bg-slate-100 rounded-full" />
            <div className="h-6 w-32 bg-slate-100 rounded-full" />
          </div>
        </div>
      </section>

      {/* Grid Skeleton */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        <div className="h-24 bg-white rounded-2xl border border-slate-200 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="aspect-video bg-slate-200 w-full" />
              <div className="p-6 space-y-3">
                <div className="h-6 w-32 bg-slate-200 rounded-full" />
                <div className="h-5 w-48 bg-slate-200 rounded-full" />
                <div className="h-4 w-40 bg-slate-100 rounded-full" />
                <div className="pt-4 border-t border-slate-100 h-8" />
                <div className="h-10 bg-slate-200 rounded-xl w-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<MarketplaceSkeleton />}>
      <MarketplaceContent />
    </Suspense>
  );
}
