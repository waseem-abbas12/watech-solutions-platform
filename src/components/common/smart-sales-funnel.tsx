"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Building2,
  Sofa,
  Package,
  Handshake,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Layers,
  Award,
} from "lucide-react";

interface FunnelGoal {
  id: string;
  tabLabel: string;
  shortTag: string;
  badge: string;
  title: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ElementType;
  benefits: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  whatsappMessage: string;
}

const FUNNEL_GOALS: FunnelGoal[] = [
  {
    id: "digital-growth",
    tabLabel: "🚀 Corporate Growth & Ads",
    shortTag: "Meta & Google Ads",
    badge: "WATECH Digital Performance Agency",
    title: "Omnichannel Growth & Enterprise Revenue Engine",
    tagline: "Meta & Google Ads, Automated WhatsApp CRM Systems, aur High-Speed Web Platforms ke zariye scalable revenue generate karein.",
    accentColor: "#2563EB",
    bgGradient: "from-blue-600 via-blue-700 to-indigo-900",
    icon: Rocket,
    benefits: [
      "Omnichannel Performance Marketing (Meta & Google Ads)",
      "Automated WhatsApp CRM & Zero-Latency Lead Capture",
      "High-Converting Next.js 16 Web Apps & B2B Portals",
      "Transparent ROI Tracking & Direct Sales Pipeline Setup",
    ],
    primaryCtaText: "Digital Services Dekhein",
    primaryCtaLink: "/services",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne business ki sales grow karne aur Meta & Google Ads / WhatsApp CRM setup ke liye consultation chahiye.",
  },
  {
    id: "fmcg-services",
    tabLabel: "🏢 FMCG Brand Services",
    shortTag: "Distribution Setup",
    badge: "17+ Years On-Ground FMCG Authority",
    title: "FMCG Brands & Factories Ki Distribution Expansion",
    tagline: "17 saala on-ground tajurba — Brands ke liye retail route planning, sales force automation, aur nationwide distributor network deployment.",
    accentColor: "#D97706",
    bgGradient: "from-amber-600 via-orange-600 to-stone-900",
    icon: Briefcase,
    benefits: [
      "On-Ground Route Planning & Retail Territory Mapping",
      "Distributor Onboarding & Punjab / Nationwide Network Setup",
      "Sales Force Training & Automated Order Booking Workflow",
      "Trade Marketing & Retailer Push Strategy Implementation",
    ],
    primaryCtaText: "FMCG Corporate Solutions",
    primaryCtaLink: "/services",
    whatsappMessage: "Assalam o Alaikum WATECH, Main ek FMCG Brand / Factory owner hoon aur mujhe apni product ki distribution network & on-ground sales force expand karni hai.",
  },
  {
    id: "fmcg-supply",
    tabLabel: "📦 FMCG Direct Maal / Supply",
    shortTag: "Wholesale Kiryana",
    badge: "Mill-Direct B2B Supply Hub",
    title: "Kiryana Dukaandar & Bulk Buyers Wholesale Hub",
    tagline: "Mill-Direct Ghee, Atta, Chawal, Daalein, Cooking Oil, aur Masala Jaat — Dukaandaron aur Marts ke liye guaranteed wholesale margins par.",
    accentColor: "#EA580C",
    bgGradient: "from-orange-600 via-red-600 to-amber-900",
    icon: Package,
    benefits: [
      "Mill-Direct Bulk Pricing (High Retailer Profit Margins)",
      "Daily Essentials: Atta, Ghee, Rice, Pulses, Spices & Tea",
      "Fast Doorstep Logistics for Marts, Kiryana & Canteens",
      "Transparent Digital Invoicing & Bulk Contract Supply",
    ],
    primaryCtaText: "Wholesale Stock Inquiry",
    primaryCtaLink: "/marketplace?tab=food-catering",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe Rozmarrah Ashiya & Kiryana Wholesale items ka direct maal aur price list chahiye.",
  },
  {
    id: "fmcg-investor",
    tabLabel: "💼 FMCG Dealership & Investment",
    shortTag: "Secured Capital JV",
    badge: "High-Turnover Capital Venture",
    title: "FMCG Warehouse & Wholesale Dealership Joint Ventures",
    tagline: "FMCG sector mein high-turnover working capital aur warehousing joint ventures — Documented profit sharing aur daily cashflow security.",
    accentColor: "#16A34A",
    bgGradient: "from-emerald-600 via-teal-700 to-slate-900",
    icon: TrendingUp,
    benefits: [
      "Secured Inventory-Backed Working Capital Financing",
      "Fast Moving Essentials (Daily Cashflow & Zero Dead Stock)",
      "Complete Legal Documentation & Formal Partnership Deeds",
      "Transparent Monthly Profit Distribution & Audited Accounts",
    ],
    primaryCtaText: "Investor Proposal Discuss Karein",
    primaryCtaLink: "/partners",
    whatsappMessage: "Assalam o Alaikum WATECH, Main FMCG sector / wholesale distribution mein investment & dealership joint venture ke liye baat karna chahta hoon.",
  },
  {
    id: "real-estate-furniture",
    tabLabel: "🏡 Properties & Chinioti Wood",
    shortTag: "Real Estate & Craft",
    badge: "Verified Marketplace Hub",
    title: "Verified Real Estate Deals & Shahi Chinioti Furniture",
    tagline: "Approved LDA/RDA residential & commercial properties aur Chiniot se direct 774+ master handcrafted pure Sheesham furniture designs.",
    accentColor: "#2563EB",
    bgGradient: "from-sky-700 via-blue-800 to-slate-900",
    icon: Building2,
    benefits: [
      "Verified Real Estate (Plots, Luxury Homes, Commercial)",
      "774+ Pure Sheesham Handcrafted Chinioti Furniture Items",
      "100% Title Deed & Document Verification by WATECH",
      "Direct Artisan Rates & Doorstep Delivery Across Pakistan",
    ],
    primaryCtaText: "Marketplace Browse Karein",
    primaryCtaLink: "/marketplace",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe Verified Properties ya Chinioti Furniture ke silsilay mein inquiry karni hai.",
  },
];

export const SmartSalesFunnel = () => {
  const [activeGoalId, setActiveGoalId] = useState<string>("digital-growth");

  const currentGoal = FUNNEL_GOALS.find((g) => g.id === activeGoalId) || FUNNEL_GOALS[0];
  const IconComponent = currentGoal.icon;

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
            <span>Interactive Goal Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Aap Aaj WATECH Par Kis Maqsad Se Aaye Hain?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
            Neeche apna maqsad select karein — hamara smart platform aapko seedha right solution, direct supply, investment details aur instant WhatsApp advisor tak le jayega.
          </p>
        </div>

        {/* Goal Selector Buttons: Responsive 5-Tile Grid so ALL 5 are 100% visible on all screens */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {FUNNEL_GOALS.map((goal, idx) => {
            const isActive = goal.id === activeGoalId;
            const BtnIcon = goal.icon;
            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoalId(goal.id)}
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
                  {goal.tabLabel.replace(/^[^\s]+\s/, "")}
                </span>
                <span
                  className={`text-[11px] mt-0.5 font-medium ${
                    isActive ? "text-blue-300" : "text-slate-500"
                  }`}
                >
                  {goal.shortTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Funnel Display Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentGoal.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Col: Visual & Strategic Authority */}
            <div
              className={`lg:col-span-5 p-8 sm:p-12 bg-gradient-to-br ${currentGoal.bgGradient} text-white flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase mb-4 border border-white/20">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{currentGoal.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                  {currentGoal.title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 mt-3 leading-relaxed">
                  {currentGoal.tagline}
                </p>
              </div>

              {/* Quick Trust Badge */}
              <div className="relative z-10 pt-8 mt-6 border-t border-white/20 flex items-center gap-3">
                <Award className="w-6 h-6 text-white/90 shrink-0" />
                <span className="text-xs text-white/90 font-medium">
                  Backed by 17+ Years of Ground Business & Technology Expertise
                </span>
              </div>
            </div>

            {/* Right Col: Concrete Deliverables & Direct Conversion CTAs */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Hamari Deliverables & Scope:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-8">
                  {currentGoal.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons (Funnel Conversion) */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={currentGoal.primaryCtaLink}
                  className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                >
                  <span>{currentGoal.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={getWhatsAppUrl(currentGoal.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Direct Rabta</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
