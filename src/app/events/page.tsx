"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Sparkles,
  Search,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  Building2,
  Sofa,
  Users,
  Utensils,
  MapPin,
  Clock,
  ArrowRight,
  Award,
  Layers,
  Check,
  Zap,
  Calculator,
} from "lucide-react";
import { INITIAL_EVENTS, EventItem } from "@/lib/mock-data";
import { InquiryModal, ModalItemDetails } from "@/components/marketplace/inquiry-modal";
import { InteractiveImageZoom } from "@/components/common/interactive-image-zoom";

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

export default function EventsPortalPage() {
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [selectedMenu, setSelectedMenu] = useState<string>("All");

  // Calculator State
  const [guestCount, setGuestCount] = useState<number>(300);
  const [menuTier, setMenuTier] = useState<"standard" | "royal" | "executive">("royal");

  // Modals
  const [selectedItemForInquiry, setSelectedItemForInquiry] = useState<ModalItemDetails | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const categories = [
    { id: "All", label: "All Venues & Catering", icon: "✨" },
    { id: "Banquet Hall", label: "Banquet Halls", icon: "🏛️" },
    { id: "Pakwan Center", label: "Pakwan Centers & Daigs", icon: "🍲" },
    { id: "Catering", label: "Live Catering & BBQ", icon: "🍢" },
    { id: "Wedding Service", label: "Wedding Management", icon: "💍" },
    { id: "Corporate Event", label: "Corporate Confs & Lunch", icon: "💼" },
    { id: "Restaurant", label: "Dining & Halls", icon: "🍽️" },
  ];

  const cities = ["All", "Lahore", "Islamabad", "Karachi", "Rawalpindi", "Faisalabad"];

  const filteredEvents = useMemo(() => {
    return INITIAL_EVENTS.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchCity =
        selectedCity === "All" || item.city.toLowerCase() === selectedCity.toLowerCase();

      const matchMenu =
        selectedMenu === "All" || item.menuType === selectedMenu;

      return matchSearch && matchCategory && matchCity && matchMenu;
    });
  }, [searchQuery, selectedCategory, selectedCity, selectedMenu]);

  // Calculator calculation
  const calculatedEstimate = useMemo(() => {
    let perHead = 2200;
    if (menuTier === "standard") perHead = 1800;
    if (menuTier === "executive") perHead = 3200;
    const total = guestCount * perHead;
    return { perHead, total };
  }, [guestCount, menuTier]);

  const handleWhatsAppBooking = (item: EventItem) => {
    const text = `Assalam-o-Alaikum WATECH Events & Banquets, I am interested in booking / inquiring about:\n• Venue/Service: "${item.title}" (${item.city})\n• Category: ${item.category}\n• Menu Type: ${item.menuType} (PKR ${item.packagePrice}/head)\n• Estimated Guests: ~${item.capacity}\nPlease share date availability, per-head menu card, hall video, and advance booking details.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleCalculatorWhatsApp = () => {
    const text = `Assalam-o-Alaikum WATECH Events Desk, I calculated an event budget on your website:\n• Estimated Guests: ${guestCount} Persons\n• Package Tier: ${menuTier.toUpperCase()} Menu (~PKR ${calculatedEstimate.perHead}/head)\n• Estimated Total: PKR ${calculatedEstimate.total.toLocaleString()}\nPlease share customized menu options and available banquet dates.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleOpenInquiry = (item: EventItem) => {
    setSelectedItemForInquiry({
      id: item.id,
      title: item.title,
      category: "event",
      priceFormatted: `PKR ${item.packagePrice.toLocaleString()}/head`,
      partnerPhone: item.partnerPhone || "923270831470",
    });
    setIsInquiryOpen(true);
  };

  const faqs = [
    {
      q: "Banquet Hall aur Catering booking ka tareeqa-e-kar kya hai?",
      a: "Aap hamari website par pasandida hall ya pakwan service select kar ke direct WhatsApp ya Call par booking date confirm kar sakte hain. Date lock karne ke liye standard token advance hota hai aur baqaya payment event ke din clear hoti hai.",
    },
    {
      q: "Kya hum booking se pehle food tasting sample le sakte hain?",
      a: "Bilkul! Shahi pakwan centers aur premium caterers ke liye hum live wedding daawat ya weekend par complimentary food sample tasting arrange karwate hain taake aap mutton deg aur biryani ke zaiqe se 100% mutma'in ho sakein.",
    },
    {
      q: "Kya Banquet Hall mein AC aur generator backup guaranteed hota hai?",
      a: "Ji haan, hamare tamam listed halls 100% heavy dual commercial generators se equipped hain. Load shedding ki soorat mein zero disruption hoti hai aur AC continuously operate rehta hai.",
    },
    {
      q: "Kya event management aur stage decor bhi shamil hota hai?",
      a: "Aap complete turnkey package le sakte hain jis mein floral stage decor, thematic mood lighting, bride/groom entry setup, uniformed waitstaff aur complete sound system shamil hota hai.",
    },
    {
      q: "Kya Real Estate society ya farmhouse inaugurations par outdoor catering milti hai?",
      a: "WATECH Real Estate society clients ke liye hum on-site live BBQ, live tandoor, pakwan degs, aur VIP seating tents supply karte hain, chahe event Islamabad, Lahore ya Chiniot mein ho.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-purple-600 selection:text-white flex flex-col">
      {/* 1. Dedicated Events Top Bar */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 text-purple-400 font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              WATECH Verified Events & Banquets Portal
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Banquet Halls, Pakwan Daigs & Corporate Hospitality</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-400">
            <Link href="/real-estate" className="text-emerald-400 hover:text-white transition-colors flex items-center gap-1 font-medium">
              <span>← Back to Real Estate Hub</span>
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/furniture" className="text-amber-400 hover:text-white transition-colors font-medium">
              🪵 Chinioti Furniture
            </Link>
            <span className="text-slate-600">|</span>
            <Link href="/services" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-slate-600">|</span>
            <span>Events Desk: <strong className="text-white font-mono">+92 327 0831470</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Events Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/events" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-purple-50 p-1.5 border border-purple-200 group-hover:border-purple-500 transition-colors">
              <Image
                src="/images/watech-mark-transparent.png"
                alt="WATECH Events & Banquets"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-mono">WATECH</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-purple-100 text-purple-800 border border-purple-300">
                  EVENTS & BANQUETS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Verified Venues, Pakwan & Hospitality</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                setSelectedCategory("Banquet Hall");
                window.scrollTo({ top: 460, behavior: "smooth" });
              }}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Banquet Halls
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Pakwan Center");
                window.scrollTo({ top: 460, behavior: "smooth" });
              }}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Pakwan Centers & Daigs
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Catering");
                window.scrollTo({ top: 460, behavior: "smooth" });
              }}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Live BBQ & Catering
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Corporate Event");
                window.scrollTo({ top: 460, behavior: "smooth" });
              }}
              className="hover:text-purple-600 transition-colors cursor-pointer"
            >
              Corporate Confs
            </button>
            <a href="#calculator" className="hover:text-purple-600 transition-colors flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-purple-600" />
              <span>Budget Calculator</span>
            </a>

            <span className="w-px h-4 bg-slate-200 mx-1" />

            {/* Nested Links */}
            <Link
              href="/real-estate"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-bold transition-all shadow-xs"
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Real Estate Hub</span>
            </Link>

            <Link
              href="/furniture"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 text-[11px] font-bold transition-all shadow-xs"
            >
              <Sofa className="w-3.5 h-3.5 text-amber-700" />
              <span>Chinioti Furniture</span>
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#calculator"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">Event Cost Estimator</span>
              <span className="sm:hidden">Budget</span>
            </a>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Events,%20I%20want%20to%20inquire%20about%20event%20banquet%20and%20catering%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Book Coordinator</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative py-14 sm:py-20 bg-slate-900 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80"
            alt="Events & Banquets Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Pakistan’s Trusted Hospitality & Event Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Banquet Halls, Shahi Daigs & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300">
              Complete Event Management
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Society inaugurations, royal weddings, corporate conferences, and family milads. Verified venues with guaranteed backup generators, hygiene-certified chefs, and transparent per-head packages.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-full shadow-2xl border border-white/20 text-slate-900 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-grow w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search banquet halls, pakwan centers, Lahore, Islamabad..."
                className="w-full pl-11 pr-4 py-2.5 text-xs sm:text-sm bg-transparent rounded-full focus:outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-1/2 sm:w-auto px-4 py-2.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 focus:outline-none border-none cursor-pointer"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    City: {c}
                  </option>
                ))}
              </select>

              <select
                value={selectedMenu}
                onChange={(e) => setSelectedMenu(e.target.value)}
                className="w-1/2 sm:w-auto px-4 py-2.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-700 focus:outline-none border-none cursor-pointer"
              >
                <option value="All">Menu: All</option>
                <option value="Desi">Desi Shahi</option>
                <option value="BBQ">Live BBQ</option>
                <option value="Continental">Continental</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              100% Hygiene-Certified Chefs
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              Heavy AC & Generator Backup
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              Complimentary Food Sample Tasting
            </span>
          </div>
        </div>
      </section>

      {/* 4. Category Filter Buttons */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Events & Banquets Listings Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Verified Event Venues & Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {filteredEvents.length} certified halls, caterers & packages
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="hidden sm:inline">Active Sector:</span>
            <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
              {selectedCategory}
            </span>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No event venues match your search</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please adjust your search keywords, city selection, or category filter to discover available packages.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedCity("All");
                setSelectedMenu("All");
              }}
              className="px-6 py-2.5 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Image Container with Zoom & Lightbox */}
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <InteractiveImageZoom
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                        {item.category}
                      </span>
                    </div>

                    {/* Status / City Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-600" />
                        {item.city}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">
                        {item.menuType} Menu
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Up to {item.capacity} Guests
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-purple-700 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{item.venue}</span>
                    </p>

                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Amenities Tags */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {item.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600"
                        >
                          {amenity}
                        </span>
                      ))}
                      {item.amenities.length > 3 && (
                        <span className="px-2 py-1 rounded-md text-[10px] font-medium bg-purple-50 text-purple-700">
                          +{item.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Price & CTAs */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Rate</span>
                      <span className="text-base font-black text-slate-900 font-mono">
                        PKR {item.packagePrice.toLocaleString()}
                        <span className="text-xs font-normal text-slate-500"> /head</span>
                      </span>
                    </div>

                    <button
                      onClick={() => handleOpenInquiry(item)}
                      className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>

                  <button
                    onClick={() => handleWhatsAppBooking(item)}
                    className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Check Date Availability</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Event Cost & Guest Estimator Calculator */}
      <section id="calculator" className="py-16 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Instant Event Estimator
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mt-3 tracking-tight">
              Event Guest & Catering Budget Calculator
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
              Apne guests ki tadaad aur menu select karein aur foran total estimated budget janiye.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
            {/* Guest Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Estimated Guest Count (Mehmano Ki Tadaad)
                </label>
                <span className="text-lg font-bold text-purple-400 font-mono">
                  {guestCount} Persons
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>50 Guests</span>
                <span>500 Guests</span>
                <span>1,500 Guests</span>
              </div>
            </div>

            {/* Menu Tier Radio */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                Select Menu Package Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setMenuTier("standard")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    menuTier === "standard"
                      ? "bg-purple-600/20 border-purple-500 text-white"
                      : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <div className="font-bold text-sm text-white">Standard Menu</div>
                  <div className="text-xs text-purple-300 mt-1 font-mono">~PKR 1,800/head</div>
                  <div className="text-[11px] text-slate-400 mt-2">Chicken Biryani, Qorma, Naan, Salad, Raita, Kheer</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMenuTier("royal")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    menuTier === "royal"
                      ? "bg-purple-600/20 border-purple-500 text-white"
                      : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <div className="font-bold text-sm text-white flex items-center justify-between">
                    <span>Royal Shahi</span>
                    <span className="text-[10px] bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded-full">Popular</span>
                  </div>
                  <div className="text-xs text-purple-300 mt-1 font-mono">~PKR 2,200/head</div>
                  <div className="text-[11px] text-slate-400 mt-2">Mutton Deg, Chicken Boti BBQ, Taftan, Zarda, Cold Drinks</div>
                </button>

                <button
                  type="button"
                  onClick={() => setMenuTier("executive")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    menuTier === "executive"
                      ? "bg-purple-600/20 border-purple-500 text-white"
                      : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <div className="font-bold text-sm text-white">VIP Executive</div>
                  <div className="text-xs text-purple-300 mt-1 font-mono">~PKR 3,200/head</div>
                  <div className="text-[11px] text-slate-400 mt-2">Mutton Mandi, Fish Crackers, Live Grilled BBQ, Desserts, Tea/Qahwa</div>
                </button>
              </div>
            </div>

            {/* Total Display & CTA */}
            <div className="pt-6 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Estimated Budget Total</span>
                <div className="text-3xl font-black text-white font-mono mt-1">
                  PKR {calculatedEstimate.total.toLocaleString()}
                </div>
                <span className="text-xs text-slate-500">
                  Calculated for {guestCount} guests at PKR {calculatedEstimate.perHead}/head
                </span>
              </div>

              <button
                onClick={handleCalculatorWhatsApp}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Send Estimate to WhatsApp Desk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs Section */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-black text-slate-900 text-center mb-6">
          Events & Banquets FAQs (Aksar Pooche Jane Wale Sawalat)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4.5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 hover:text-purple-700 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-purple-600 transition-transform ${
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

      {/* 8. Dedicated Events Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/watech-mark-transparent.png"
                  alt="WATECH Events"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-white font-bold text-sm">WATECH Events & Banquets</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Pakistan ki certified banquet booking aur Shahi pakwan catering management: 100% verified halls, live BBQ, society inauguration events aur family daawats.
              </p>
              <div className="text-slate-300 font-medium">
                CEO: Waseem Abbas
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Hospitality Portfolios
              </div>
              <ul className="space-y-2">
                <li><button onClick={() => setSelectedCategory("Banquet Hall")} className="hover:text-purple-400 cursor-pointer">Luxury Banquet Halls</button></li>
                <li><button onClick={() => setSelectedCategory("Pakwan Center")} className="hover:text-purple-400 cursor-pointer">Shahi Pakwan Centers & Daigs</button></li>
                <li><button onClick={() => setSelectedCategory("Catering")} className="hover:text-purple-400 cursor-pointer">Live BBQ & Outdoor Catering</button></li>
                <li><button onClick={() => setSelectedCategory("Wedding Service")} className="hover:text-purple-400 cursor-pointer">Bridal Stage & Decor</button></li>
                <li><button onClick={() => setSelectedCategory("Corporate Event")} className="hover:text-purple-400 cursor-pointer">Corporate Meetings & Lunch</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Active Coverage Cities
              </div>
              <p className="text-slate-400 leading-relaxed mb-2">
                Certified venue partnerships in:
              </p>
              <p className="text-slate-300">
                Lahore (Gulberg, DHA, Johar Town) · Islamabad & Rawalpindi · Karachi · Faisalabad · Chiniot
              </p>
            </div>

            {/* Col 4 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Event Coordinator Desk
              </div>
              <p className="text-slate-400 mb-2">
                Direct Booking & Free Date Inquiry Desk, Pakistan
              </p>
              <p className="text-slate-300 font-mono">
                WhatsApp Desk: +92 327 0831470
              </p>
              <p className="text-slate-300">
                Support: 7 Days a Week (10:00 AM - 10:00 PM)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © {new Date().getFullYear()} WATECH Events & Hospitality Ecosystem. All rights reserved.
            </div>
            <div>
              Part of WATECH Multi-Sector Platform.
            </div>
          </div>
        </div>
      </footer>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        item={selectedItemForInquiry}
      />
    </div>
  );
}
