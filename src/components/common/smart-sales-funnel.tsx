"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  TrendingUp,
  Briefcase,
  Utensils,
  Building2,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Award,
  Zap,
  Flame,
  Layers,
} from "lucide-react";

interface MasterPillar {
  id: string;
  tabLabel: string;
  shortTag: string;
  badge: string;
  title: string;
  tagline: string;
  howItWorks: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ElementType;
  deliverables: { title: string; desc: string }[];
  primaryCtaText: string;
  primaryCtaLink: string;
  whatsappMessage: string;
}

const MASTER_PILLARS: MasterPillar[] = [
  // 1. DIGITAL SERVICES & MARKETING
  {
    id: "digital-services",
    tabLabel: "🚀 Digital Services & Marketing",
    shortTag: "Omnichannel Agency",
    badge: "WATECH Digital Performance Agency",
    title: "Omnichannel Digital Marketing, CRM Automation & Web Tech",
    tagline: "Meta & Google Paid Ads, 24/7 Automated WhatsApp CRM Systems, aur High-Speed Next.js Portals ke zariye confirmed paying buyers hasil karein.",
    howItWorks:
      "Pakistani karobaron ko vanity likes aur views se nahi, confirmed orders aur qualified leads se faida hota hai. Hamara ad framework high-intent local aur overseas buyers ko target karta hai, unka data capture karta hai, aur <30 seconds mein WhatsApp bot ke zariye unhein attend karke aapki sales team ke dashboard par bhej deta hai.",
    accentColor: "#2563EB",
    bgGradient: "from-blue-600 via-indigo-700 to-slate-900",
    icon: Rocket,
    deliverables: [
      {
        title: "Meta & Google Paid Ads",
        desc: "Laser-targeted inbound lead generation for Real Estate, Furniture, Food & B2B brands.",
      },
      {
        title: "Automated WhatsApp CRM",
        desc: "<30s instant response in Roman Urdu, automated PDF catalog delivery & lead pipeline tracking.",
      },
      {
        title: "Custom Next.js 16 Web Portals",
        desc: "Lightning fast, 1-second page loads, filterable product catalogs & Google SEO ranking.",
      },
      {
        title: "High-Impact Video Reels",
        desc: "Architectural property walkthroughs, master woodcraft storytelling & viral brand reels.",
      },
    ],
    primaryCtaText: "Explore All Agency Services",
    primaryCtaLink: "/services",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne karobar ke liye Digital Marketing, Meta/Google Ads aur WhatsApp CRM services ki detail chahiye.",
  },

  // 2. INVESTMENT OPPORTUNITIES (FOOD, REAL ESTATE & FMCG)
  {
    id: "investments",
    tabLabel: "💼 Investment Opportunities",
    shortTag: "Food · Property · FMCG",
    badge: "Verified High-Yield Ventures",
    title: "Verified Investment Opportunities in Food, Real Estate & FMCG",
    tagline: "Daily essential cashflow, high-turnover inventory financing, aur prime capital appreciation — 100% legal security aur transparent monthly profit sharing.",
    howItWorks:
      "WATECH investors ko aam unverified schemes mein nahi, balki Pakistan ki 3 sab se zaroori aur daily-cashflow industries mein strategic partnership mohayya karta hai. Har venture ki complete audited accounting, legal partnership deed, aur direct inventory/asset backing hoti hai taake aapka capital mehfooz rahe aur continuous return generate ho.",
    accentColor: "#16A34A",
    bgGradient: "from-emerald-600 via-teal-700 to-slate-900",
    icon: TrendingUp,
    deliverables: [
      {
        title: "FMCG Sector Working Capital",
        desc: "Inventory-backed daily essentials (Ghee, Atta, Rice) financing with fast turnover & zero dead-stock.",
      },
      {
        title: "Real Estate Capital Projects",
        desc: "High-appreciation LDA/RDA approved plots, commercial rental shops & guaranteed buyback deals.",
      },
      {
        title: "Food & Pakwan Franchises",
        desc: "Commercial cloud kitchens, high-volume wedding catering daigs & event hall operational joint ventures.",
      },
      {
        title: "Complete Legal Security",
        desc: "Formal partnership deeds, bank-audited profit distribution, aur transparent executive dashboards.",
      },
    ],
    primaryCtaText: "Investor Opportunities Discuss Karein",
    primaryCtaLink: "/partners",
    whatsappMessage: "Assalam o Alaikum WATECH, Main Food, Real Estate ya FMCG sector mein verified investment & partnership opportunities ke liye baat karna chahta hoon.",
  },

  // 3. FMCG SETUP SE MARKETING TAK (17+ YRS GROUND + TECH)
  {
    id: "fmcg-turnkey",
    tabLabel: "🏢 FMCG Setup Se Marketing",
    shortTag: "17+ Yrs Ground + Tech",
    badge: "17+ Years Ground Leadership",
    title: "FMCG Brand Launch, Distribution Setup Se Consumer Pull Tak",
    tagline: "17 saala on-ground tajurba aur modern technology ka sangam — Naye aur existing FMCG brands ke liye nationwide distribution, retail route mapping aur sales force automation.",
    howItWorks:
      "FMCG brand sirf achhi packaging banane se kamyab nahi hota; use retail shelf par pohanchana aur consumer se uthwana parta hai. Hamara 17 saal ka field tajurba territory mapping aur distributor network khara karta hai, jabke hamari digital tech order booking aur Meta/Google ads ke zariye retailer push aur consumer demand pull dono create karti hai.",
    accentColor: "#D97706",
    bgGradient: "from-amber-600 via-orange-600 to-stone-900",
    icon: Briefcase,
    deliverables: [
      {
        title: "Brand Strategy & Pricing",
        desc: "Product positioning, retailer margin structure, packaging audit aur competitor landscape analysis.",
      },
      {
        title: "Route Planning & Beat Mapping",
        desc: "On-ground retail territory planning, shop-by-shop beat optimization aur market coverage schedule.",
      },
      {
        title: "Distributor & Dealer Network",
        desc: "Punjab aur nationwide reliable wholesale stockists ki appointment aur direct agreement execution.",
      },
      {
        title: "Sales Force Automation & Ads",
        desc: "Order bookers field training, mobile order booking app setup, aur Meta/Google consumer demand ads.",
      },
    ],
    primaryCtaText: "FMCG Corporate Solutions",
    primaryCtaLink: "/services",
    whatsappMessage: "Assalam o Alaikum WATECH, Main apne FMCG Brand ke complete setup, nationwide distribution network aur on-ground sales force consulting ke liye rabta karna chahta hoon.",
  },

  // 4. FOOD & CATERING SERVICES
  {
    id: "food-catering",
    tabLabel: "🍽️ Food & Catering Services",
    shortTag: "Shahi Pakwan & Events",
    badge: "Hospitality & Pakwan Authority",
    title: "Shahi Pakwan Centers, Daig Delivery & Grand Banquet Catering",
    tagline: "10 se 500+ Daigs ki guaranteed on-time delivery, live BBQ catering, marriage hall venues, aur food business automation across Pakistan.",
    howItWorks:
      "Shadi aur family events mein khana sab se ahem hissa hota hai. Hum verified traditional Shahi Pakwan centers aur seasoned chefs ke zariye premium ingredients (pure banaspati/desi ghee, graded meat, and basmati rice) ke sath authentic taste deliver karte hain. Har daig ka live video update aur exact delivery schedule assure kiya jata hai.",
    accentColor: "#EA580C",
    bgGradient: "from-orange-600 via-red-600 to-amber-900",
    icon: Utensils,
    deliverables: [
      {
        title: "Shahi Pakwan Daig Delivery",
        desc: "Chicken/Mutton Biryani, Korma, Pulao, Zarda & Halwa (10 se 500+ Daigs on-time delivery guarantee).",
      },
      {
        title: "Live BBQ & Wedding Catering",
        desc: "Live Seekh Kabab, Malai Boti, Sajji, Continental & Chinese buffet arrangements with master service staff.",
      },
      {
        title: "Banquet & Venue Booking",
        desc: "Marriage halls, air-conditioned marquees aur outdoor lawns with custom menu & stage decor packages.",
      },
      {
        title: "Food Business Marketing",
        desc: "Restaurants aur pakwan centers ke liye automated WhatsApp order booking aur local area Google/Meta ads.",
      },
    ],
    primaryCtaText: "Food & Catering Details",
    primaryCtaLink: "/marketplace?tab=food-catering",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe Shahi Pakwan Daigs / Wedding Catering / Event booking ke silsilay mein inquiry karni hai.",
  },

  // 5. REAL ESTATE SERVICES
  {
    id: "real-estate",
    tabLabel: "🏡 Real Estate Services",
    shortTag: "Verified Deals & Tech",
    badge: "Property & Project Authority",
    title: "Verified Property Deals, Society Project Marketing & Lead CRM",
    tagline: "LDA/RDA/CDA approved plots, luxury residential & commercial plazas, overseas Pakistani buyer acquisition, aur automated real estate CRM.",
    howItWorks:
      "Property kharidne ya bechne mein transparent documentation aur reliable buyers sab se bari zaroorat hain. WATECH verified listing verification provide karta hai, housing societies ke liye Meta & Google ads ke zariye overseas investors attract karta hai, aur real estate agents ko <30s response automated WhatsApp CRM se empower karta hai.",
    accentColor: "#2563EB",
    bgGradient: "from-sky-700 via-blue-800 to-slate-900",
    icon: Building2,
    deliverables: [
      {
        title: "Verified Buy & Sell Deals",
        desc: "Plots, luxury houses, apartments & commercial plazas in DHA, Bahria, New Metro City & prime urban hubs.",
      },
      {
        title: "Society Project Marketing",
        desc: "Complete marketing campaigns targeting local & overseas Pakistani investors with proven ROI.",
      },
      {
        title: "Real Estate WhatsApp CRM",
        desc: "Autonomous bot replying in <30s, sending society maps, payment plans & logging leads into CRM pipeline.",
      },
      {
        title: "4K Video & Drone Walkthroughs",
        desc: "High-end architectural video tours, drone site shoots & verified on-ground legal title checks.",
      },
    ],
    primaryCtaText: "Explore Real Estate Portal",
    primaryCtaLink: "/marketplace?tab=properties",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe Real Estate buying/selling deals ya housing society project marketing ke liye rabta karna hai.",
  },
];

export const SmartSalesFunnel = () => {
  const [activePillarId, setActivePillarId] = useState<string>("digital-services");

  const currentPillar = MASTER_PILLARS.find((p) => p.id === activePillarId) || MASTER_PILLARS[0];
  const IconComponent = currentPillar.icon;

  const getWhatsAppUrl = (msg: string) => {
    return `https://wa.me/923270831470?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className="w-full py-16 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WATECH 5 Core Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Hum Aapke Karobar Ke Liye Kya Karte Hain?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
            Neeche hamare 5 Master Pillars mein se kisi par bhi click karein — mukammal scope, ground tajurba, deliverables aur instant WhatsApp advisor open ho jayega.
          </p>
        </div>

        {/* 5 Master Selector Tiles: Responsive Grid (100% visible on all screen sizes) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {MASTER_PILLARS.map((pillar, idx) => {
            const isActive = pillar.id === activePillarId;
            const BtnIcon = pillar.icon;
            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`flex flex-col items-start text-left p-3.5 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/15 scale-[1.02]"
                    : "bg-white text-slate-700 hover:bg-slate-100/80 border-slate-200/90 hover:border-slate-300 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <BtnIcon className="w-3.5 h-3.5" />
                  </div>
                  <span
                    className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      isActive ? "bg-white/15 text-white/90" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold leading-snug line-clamp-1">
                  {pillar.tabLabel.replace(/^[^\s]+\s/, "")}
                </span>
                <span
                  className={`text-[11px] mt-0.5 font-medium ${
                    isActive ? "text-blue-300" : "text-slate-500"
                  }`}
                >
                  {pillar.shortTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card Below */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Col: Visual & Authority Overview */}
            <div
              className={`lg:col-span-5 p-8 sm:p-12 bg-gradient-to-br ${currentPillar.bgGradient} text-white flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase mb-4 border border-white/20">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{currentPillar.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                  {currentPillar.title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 mt-3 leading-relaxed">
                  {currentPillar.tagline}
                </p>
              </div>

              {/* Trust Badge */}
              <div className="relative z-10 pt-8 mt-6 border-t border-white/20 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-white/90 shrink-0" />
                <span className="text-xs text-white/90 font-medium">
                  Verified by WATECH Solutions · Backed by 17+ Years Ground & Tech Authority
                </span>
              </div>
            </div>

            {/* Right Col: Deep Explanation & 4 Deliverables */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div>
                {/* How It Works Explanation */}
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Yeh Kaise Kaam Karta Hai (Strategy & Execution):
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed mt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {currentPillar.howItWorks}
                  </p>
                </div>

                {/* Scope of Work / Deliverables Grid */}
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aapko Kya Kya Milega (Core Deliverables):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 mb-8">
                  {currentPillar.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-start"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pl-6">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={currentPillar.primaryCtaLink}
                  className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                >
                  <span>{currentPillar.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={getWhatsAppUrl(currentPillar.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Rabta</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
