"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  const initialTab = searchParams.get("tab") || "properties";

  // Active Tab state: 'properties' | 'furniture' | 'events'
  const [activeTab, setActiveTab] = useState<"properties" | "furniture" | "events">(
    initialTab === "furniture" ? "furniture" : initialTab === "events" ? "events" : "properties"
  );

  React.useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab === "furniture" || currentTab === "events" || currentTab === "properties") {
      setActiveTab(currentTab);
    }
  }, [searchParams]);

  // Global Unified Search
  const [searchQuery, setSearchQuery] = useState("");

  // Filters for Properties
  const [propertyCity, setPropertyCity] = useState("All");
  const [propertyType, setPropertyType] = useState("All");
  const [propertyMaxPrice, setPropertyMaxPrice] = useState(200000000); // 20 Crore max

  // Filters for Furniture
  const [woodType, setWoodType] = useState("All");
  const [furnitureCategory, setFurnitureCategory] = useState("All");
  const [furnitureMaxPrice, setFurnitureMaxPrice] = useState(500000);

  // Filters for Events
  const [eventCity, setEventCity] = useState("All");
  const [eventMenuType, setEventMenuType] = useState("All");
  const [eventMinCapacity, setEventMinCapacity] = useState(100);

  // Pagination / Load more limits
  const [visibleCount, setVisibleCount] = useState(6);

  // Inquiry Modal State
  const [modalItem, setModalItem] = useState<ModalItemDetails | null>(null);

  // ----------------------------------------------------
  // Filtered Lists & Grouped Search Counts
  // ----------------------------------------------------
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A]">
                Unified Marketplace
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-1">
                Browse, Compare & Inquire
              </h1>
              <p className="text-slate-600 mt-2 text-sm md:text-base max-w-xl">
                Verified real estate, authentic Chinioti woodcraft, and banquet packages straight from direct sellers.
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
                  Events: <strong className="text-[#16A34A]">{filteredEvents.length}</strong>
                </span>
              </div>
            )}
          </div>

          {/* =========================================
              SINGLE SEARCH BAR (ABOVE TABS)
              ========================================= */}
          <div className="mt-8 relative max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties, furniture, or events by city, name, or style..."
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
                setActiveTab("events");
                setVisibleCount(6);
              }}
              className={`pb-3.5 px-4 font-bold text-sm tracking-wide transition-all border-b-2 whitespace-nowrap cursor-pointer ${
                activeTab === "events"
                  ? "border-[#16A34A] text-[#16A34A]"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              🎉 Events ({filteredEvents.length})
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
                  min={5000000}
                  max={200000000}
                  step={5000000}
                  value={propertyMaxPrice}
                  onChange={(e) => setPropertyMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#16A34A] cursor-pointer"
                />
              </div>
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
                      <div className="text-xl font-black text-slate-900 tracking-tight mb-1 text-[#16A34A]">
                        {formatPKR(prop.price)}
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

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                        {prop.bedrooms > 0 && (
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-slate-400" />
                            <span>{prop.bedrooms} Beds</span>
                          </div>
                        )}
                        {prop.bathrooms > 0 && (
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4 text-slate-400" />
                            <span>{prop.bathrooms} Baths</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Maximize2 className="w-4 h-4 text-slate-400" />
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
                          priceFormatted: formatPKR(prop.price),
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
                  <option value="Bed">Bed Sets</option>
                  <option value="Sofa">Sofa Sets</option>
                  <option value="Dining">Dining Tables</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <span>Max Price</span>
                  <span className="text-[#16A34A]">{formatPKR(furnitureMaxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={600000}
                  step={25000}
                  value={furnitureMaxPrice}
                  onChange={(e) => setFurnitureMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#16A34A] cursor-pointer"
                />
              </div>
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
                      <div className="text-xl font-black text-slate-900 tracking-tight mb-1 text-[#16A34A]">
                        {formatPKR(furn.price)}
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
                          priceFormatted: formatPKR(furn.price),
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
            TAB 3: EVENTS TAB
            ========================================= */}
        {activeTab === "events" && (
          <div className="space-y-8">
            {/* Filter Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Venue City
                </label>
                <select
                  value={eventCity}
                  onChange={(e) => setEventCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Menu Cuisine
                </label>
                <select
                  value={eventMenuType}
                  onChange={(e) => setEventMenuType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] bg-white"
                >
                  <option value="All">All Cuisines</option>
                  <option value="Desi">Desi Traditional</option>
                  <option value="Chinese">Chinese / Pan-Asian</option>
                  <option value="BBQ">Live BBQ</option>
                  <option value="Continental">Continental</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  <span>Min Capacity</span>
                  <span className="text-[#16A34A]">{eventMinCapacity} Guests</span>
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

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.slice(0, visibleCount).map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/70 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* 16:9 Image container */}
                    <Link href={`/marketplace/events/${event.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-900 shadow-sm backdrop-blur-sm">
                        {event.menuType} Menu
                      </span>
                    </Link>

                    <div className="p-6">
                      <div className="text-xl font-black text-slate-900 tracking-tight mb-1 text-[#16A34A]">
                        PKR {event.packagePrice.toLocaleString()}{" "}
                        <span className="text-xs text-slate-500 font-normal">/ head</span>
                      </div>
                      <Link href={`/marketplace/events/${event.id}`} className="block group-hover:text-[#16A34A] transition-colors">
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
                          <span>Up to {event.capacity.toLocaleString()} Guests</span>
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
                          priceFormatted: `PKR ${event.packagePrice.toLocaleString()} / head`,
                          partnerPhone: event.partnerPhone,
                        })
                      }
                      className="w-full py-3 px-4 rounded-xl bg-[#16A34A] text-white font-semibold text-xs tracking-wider uppercase hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Event</span>
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
                  Load More Events
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Marketplace...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
