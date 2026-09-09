"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Trees,
  ArrowLeft,
  MessageCircle,
  Users,
  Utensils,
  Sofa,
  Building2,
} from "lucide-react";
import {
  INITIAL_PROPERTIES,
  INITIAL_FURNITURE,
  INITIAL_EVENTS,
} from "@/lib/mock-data";
import { InquiryModal, ModalItemDetails } from "@/components/marketplace/inquiry-modal";

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

export default function CategoryBrowsePage() {
  const params = useParams();

  const rawCategory = (params.category as string) || "";
  const normCategory = rawCategory.toLowerCase();

  // Map category aliases: "real-estate" -> "properties", "food-catering" -> "food-catering", etc.
  const resolvedCategory = useMemo(() => {
    if (
      normCategory === "property" ||
      normCategory === "properties" ||
      normCategory === "real-estate" ||
      normCategory === "realestate"
    ) {
      return "properties";
    }
    if (normCategory === "furniture") {
      return "furniture";
    }
    if (
      normCategory === "food-catering" ||
      normCategory === "food" ||
      normCategory === "catering" ||
      normCategory === "food-and-catering" ||
      normCategory === "event" ||
      normCategory === "events"
    ) {
      return "food-catering";
    }
    return "unknown";
  }, [normCategory]);

  // Global Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Filters for Properties
  const [propertyCity, setPropertyCity] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [propertyMaxPrice, setPropertyMaxPrice] = useState(10000000000);

  // Filters for Furniture
  const [woodType, setWoodType] = useState("All");
  const [furnitureCategory, setFurnitureCategory] = useState("All");
  const [furnitureMaxPrice, setFurnitureMaxPrice] = useState(10000000);

  // Filters for Events
  const [eventCity, setEventCity] = useState("All");
  const [eventMenuType, setEventMenuType] = useState("All");
  const [eventMinCapacity, setEventMinCapacity] = useState(100);

  // Pagination / Load more limits
  const [visibleCount, setVisibleCount] = useState(6);

  // Inquiry Modal State
  const [modalItem, setModalItem] = useState<ModalItemDetails | null>(null);

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return INITIAL_PROPERTIES.filter((p) => {
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
  }, [searchQuery, propertyCity, propertyType, propertyMaxPrice]);

  // Filtered Furniture
  const filteredFurniture = useMemo(() => {
    return INITIAL_FURNITURE.filter((f) => {
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
  }, [searchQuery, woodType, furnitureCategory, furnitureMaxPrice]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return INITIAL_EVENTS.filter((e) => {
      const matchSearch =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.menuType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCity = eventCity === "All" || e.city === eventCity;
      const matchMenu = eventMenuType === "All" || e.menuType === eventMenuType;
      const matchCap = e.capacity >= eventMinCapacity;
      return matchSearch && matchCity && matchMenu && matchCap;
    });
  }, [searchQuery, eventCity, eventMenuType, eventMinCapacity]);

  // If unknown category, show graceful not found
  if (resolvedCategory === "unknown") {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <h2 className="text-2xl font-black text-slate-900 mb-2">Category Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          The requested sector &quot;{rawCategory}&quot; does not exist. Please browse verified properties, Chinioti furniture, or food & catering.
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

  const categoryMeta = {
    properties: {
      title: "Real Estate & Properties",
      subtitle: "Verified residential plots, luxury villas, and commercial spaces across Pakistan.",
      accent: "#2563EB",
      badge: "Real Estate Sector",
      icon: Building2,
      count: filteredProperties.length,
    },
    furniture: {
      title: "Chinioti Handcrafted Furniture",
      subtitle: "Pure Sheesham and Teak wood masterpieces handcrafted by master Chiniot artisans.",
      accent: "#16A34A",
      badge: "Woodcraft Sector",
      icon: Sofa,
      count: filteredFurniture.length,
    },
    "food-catering": {
      title: "Food & Catering",
      subtitle: "Verified restaurants, traditional pakwan centers, live BBQ catering, and food suppliers across Pakistan.",
      accent: "#EA580C",
      badge: "Food & Catering Sector",
      icon: Utensils,
      count: filteredEvents.length,
    },
    events: {
      title: "Food & Catering",
      subtitle: "Verified restaurants, traditional pakwan centers, live BBQ catering, and food suppliers across Pakistan.",
      accent: "#EA580C",
      badge: "Food & Catering Sector",
      icon: Utensils,
      count: filteredEvents.length,
    },
  }[resolvedCategory];

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-24 text-slate-900 selection:bg-[#16A34A] selection:text-white">
      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        item={modalItem}
      />

      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            <Link href="/marketplace" className="hover:text-slate-700 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              All Marketplace
            </Link>
            <span>/</span>
            <span className="text-slate-900">{categoryMeta.badge}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3"
                style={{ backgroundColor: `${categoryMeta.accent}15`, color: categoryMeta.accent }}
              >
                {categoryMeta.badge}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                {categoryMeta.title}
              </h1>
              <p className="text-slate-600 mt-2 text-sm md:text-base max-w-xl">
                {categoryMeta.subtitle}
              </p>
            </div>

            {/* Quick Sector Switcher */}
            <div className="flex items-center gap-2">
              <Link
                href="/marketplace/properties"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  resolvedCategory === "properties"
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Properties
              </Link>
              <Link
                href="/marketplace/furniture"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  resolvedCategory === "furniture"
                    ? "bg-[#16A34A] text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Furniture
              </Link>
              <Link
                href="/marketplace/food-catering"
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  resolvedCategory === "food-catering" || resolvedCategory === "events"
                    ? "bg-[#EA580C] text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Food & Catering
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${categoryMeta.title.toLowerCase()} by city, keyword, or specifications...`}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
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
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        {/* PROPERTIES SECTOR CONTENT */}
        {resolvedCategory === "properties" && (
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white"
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
                  <span className="text-[#2563EB]">{formatPKR(propertyMaxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10000000000}
                  step={10000000}
                  value={propertyMaxPrice}
                  onChange={(e) => setPropertyMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2563EB] cursor-pointer"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.slice(0, visibleCount).map((prop) => (
                <div
                  key={prop.id}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/marketplace/properties/${prop.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm">
                        {prop.type}
                      </span>
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#2563EB] text-white shadow-sm">
                        {prop.city}
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-2xl font-black text-[#2563EB] tracking-tight">
                          {formatPKR(prop.price)}
                        </span>
                      </div>

                      <Link href={`/marketplace/properties/${prop.id}`} className="block group-hover:text-[#2563EB] transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
                          {prop.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-4 mt-4 border-t border-slate-100 text-xs text-slate-600">
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
                          <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{prop.area}</span>
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
                          priceFormatted: formatPKR(prop.price),
                          partnerPhone: prop.partnerPhone,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-[#2563EB] text-white font-semibold text-xs tracking-wider uppercase hover:bg-blue-700 shadow-md hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inquire Direct</span>
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
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

        {/* FURNITURE SECTOR CONTENT */}
        {resolvedCategory === "furniture" && (
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
                  <option value="Teak">Burma Teak</option>
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
                  <span>Max Budget</span>
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

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFurniture.slice(0, visibleCount).map((furn) => (
                <div
                  key={furn.id}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/marketplace/furniture/${furn.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={furn.image}
                        alt={furn.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm">
                        {furn.woodType}
                      </span>
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#16A34A] text-white shadow-sm">
                        {furn.category}
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-2xl font-black text-[#16A34A] tracking-tight">
                          {formatPKR(furn.price)}
                        </span>
                      </div>

                      <Link href={`/marketplace/furniture/${furn.id}`} className="block group-hover:text-[#16A34A] transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
                          {furn.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                        <Trees className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{furn.dimensions}</span>
                      </div>

                      <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                        {furn.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() =>
                        setModalItem({
                          id: furn.id,
                          title: furn.name,
                          category: "furniture",
                          priceFormatted: formatPKR(furn.price),
                          partnerPhone: furn.partnerPhone,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-[#16A34A] text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inquire Woodcraft</span>
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

        {/* FOOD & CATERING SECTOR CONTENT */}
        {(resolvedCategory === "food-catering" || resolvedCategory === "events") && (
          <div className="space-y-8">
            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  City
                </label>
                <select
                  value={eventCity}
                  onChange={(e) => setEventCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C] bg-white"
                >
                  <option value="All">All Cuisines</option>
                  <option value="Desi">Traditional Desi & Pakwan</option>
                  <option value="BBQ">Live Charcoal BBQ</option>
                  <option value="Continental">Continental & Pan-Asian</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <span>Min Capacity / Order</span>
                  <span className="text-[#EA580C]">{eventMinCapacity}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={1500}
                  step={50}
                  value={eventMinCapacity}
                  onChange={(e) => setEventMinCapacity(Number(e.target.value))}
                  className="w-full accent-[#EA580C] cursor-pointer"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.slice(0, visibleCount).map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/marketplace/food-catering/${event.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 text-slate-900 shadow-sm backdrop-blur-sm">
                        {event.city}
                      </span>
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#EA580C] text-white shadow-sm">
                        {event.category}
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-2xl font-black text-[#EA580C] tracking-tight">
                          PKR {event.packagePrice.toLocaleString()}
                          <span className="text-xs font-normal text-slate-500"> / unit</span>
                        </span>
                      </div>

                      <Link href={`/marketplace/food-catering/${event.id}`} className="block group-hover:text-[#EA580C] transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
                          {event.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>

                      <div className="flex items-center gap-4 py-4 mt-4 border-t border-slate-100 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-400" />
                          <span>Capacity: {event.capacity.toLocaleString()}</span>
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
                          priceFormatted: `PKR ${event.packagePrice.toLocaleString()} / unit`,
                          partnerPhone: event.partnerPhone,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-[#EA580C] text-white font-semibold text-xs tracking-wider uppercase hover:bg-orange-700 shadow-md hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inquire / Order</span>
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
