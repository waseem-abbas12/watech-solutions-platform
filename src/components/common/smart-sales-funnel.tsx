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
  PhoneCall,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface FunnelGoal {
  id: string;
  tabLabel: string;
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
    id: "business",
    tabLabel: "🚀 Karobar / Sales Barhani Hai",
    badge: "WATECH Tech & Marketing Agency",
    title: "Apne Business Ki Sales 10x Karein",
    tagline: "Meta/TikTok Ads, Automated WhatsApp CRM aur High-Speed Web App ke zariye verified leads hasil karein.",
    accentColor: "#2563EB",
    bgGradient: "from-blue-600 via-blue-700 to-indigo-800",
    icon: Rocket,
    benefits: [
      "Targeted Meta & TikTok Paid Ads (Pakistani Audience)",
      "Automated WhatsApp CRM & Instant Chatbot Funnels",
      "Custom High-Speed Next.js Web Portals & E-commerce",
      "Direct Sales Reporting & ROI Tracking",
    ],
    primaryCtaText: "Digital Services Dekhein",
    primaryCtaLink: "/services",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne business ki digital marketing aur automated sales funnel ke liye free consultation chahiye.",
  },
  {
    id: "property",
    tabLabel: "🏡 Ghar ya Plot Kharidna / Bechna Hai",
    badge: "Verified Real Estate Hub",
    title: "Transparent & Verified Property Deals",
    tagline: "Lahore, Islamabad, Rawalpindi aur Karachi mein LDA/RDA approved plots, luxury ghar aur commercial plazas.",
    accentColor: "#2563EB",
    bgGradient: "from-sky-600 via-blue-700 to-slate-900",
    icon: Building2,
    benefits: [
      "100% Documentation & Title Deed Verification",
      "Direct Owner & Verified Partner Contact (No Hidden Fees)",
      "DHA, Bahria, New Metro City & Prime Urban Locations",
      "Instant Property Value & Installment Calculator",
    ],
    primaryCtaText: "Available Properties Dekhein",
    primaryCtaLink: "/marketplace?tab=properties",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe verified property kharidne / bechne ke silsilay mein inquiry karni hai.",
  },
  {
    id: "furniture",
    tabLabel: "🛋️ Chinioti Shahi Furniture Chahiye",
    badge: "Authentic Master Woodcraft",
    title: "Chiniot Se Direct 100% Asal Lakri Furniture",
    tagline: "774+ Handcrafted Designs — Bridal Bed Sets, Royal Sofas, Shahi Jhoolas aur Dining Suites factory-direct rates par.",
    accentColor: "#16A34A",
    bgGradient: "from-emerald-600 via-emerald-700 to-teal-900",
    icon: Sofa,
    benefits: [
      "100% Pure Seasoned Sheesham & Rosewood",
      "Generational Artisans ki Master Hand Carving",
      "Termite-Treated 10-Year Structure Guarantee",
      "Doorstep Safe Delivery Across Pakistan & Worldwide Export",
    ],
    primaryCtaText: "Furniture Catalog Khursheed Karein",
    primaryCtaLink: "/marketplace?tab=furniture",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe Chinioti Handcrafted Furniture ke rates aur custom order ki information chahiye.",
  },
  {
    id: "fmcg",
    tabLabel: "📦 Wholesale Kiryana / FMCG Stock",
    badge: "Rozmarrah Ashiya Wholesale",
    title: "Kiryana Dukaandar & Bulk Buyers Wholesale Hub",
    tagline: "Mill-Direct Ghee, Atta, Chawal, Daalein, Masala Jaat aur FMCG Brands — Dukaandaron ke liye Wholesale Rate par.",
    accentColor: "#EA580C",
    bgGradient: "from-amber-600 via-orange-600 to-red-700",
    icon: Package,
    benefits: [
      "Mill-Direct Wholesale Pricing (B2B Bulk Savings)",
      "Daily Essentials: Atta, Ghee, Rice, Pulses, Spices & Tea",
      "Fast Delivery to Retail Shops, Hotels, & Canteens",
      "Transparent Digital Invoicing & Easy Re-ordering",
    ],
    primaryCtaText: "FMCG Wholesale Stock Dekhein",
    primaryCtaLink: "/marketplace?tab=fmcg",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe Rozmarrah Ashiya & Kiryana Wholesale items ki price list aur bulk order detail chahiye.",
  },
  {
    id: "partner",
    tabLabel: "🤝 Partner / Vendor Ban Kar Kamayein",
    badge: "WATECH Partner Ecosystem",
    title: "Bagher Kisi Investment Ke Humare Sath Judein",
    tagline: "Real Estate Agents, Furniture Manufacturers aur FMCG Suppliers hamari digital marketing se apni sales barhayein.",
    accentColor: "#D97706",
    bgGradient: "from-orange-600 via-amber-600 to-yellow-700",
    icon: Handshake,
    benefits: [
      "Zero Registration Fee — 100% Free Onboarding",
      "Hamara Platform Aapka Stock Poore Pakistan Mein Promote Karega",
      "Direct Customer Calls & WhatsApp Verified Leads",
      "Transparent Commission Tracking Dashboard",
    ],
    primaryCtaText: "Partner Portal Par Join Karein",
    primaryCtaLink: "/partners",
    whatsappMessage: "Assalam o Alaikum WATECH, Main ba-hesiyat vendor / partner register ho kar apna stock list karna chahta hoon.",
  },
];

export const SmartSalesFunnel = () => {
  const [activeGoalId, setActiveGoalId] = useState<string>("business");

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
            <span>10-Second Smart Solution Finder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Aap Aaj WATECH Par Kis Maqsad Se Aaye Hain?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
            Neeche apna maqsad select karein — hamara smart platform aapko seedha right solution, exact products aur instant WhatsApp advisor tak le jayega!
          </p>
        </div>

        {/* Goal Selector Buttons (Funnel Pills) */}
        <div className="flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-4 scrollbar-none mb-8">
          {FUNNEL_GOALS.map((goal) => {
            const isActive = goal.id === activeGoalId;
            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoalId(goal.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/15 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-100/80 border-slate-200 hover:border-slate-300"
                }`}
              >
                <span>{goal.tabLabel}</span>
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
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Col: Visual & Branding */}
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
                <p className="text-sm sm:text-base text-white/85 mt-3 leading-relaxed">
                  {currentGoal.tagline}
                </p>
              </div>

              {/* Quick Trust Badge */}
              <div className="relative z-10 pt-8 mt-6 border-t border-white/20 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-white/90 shrink-0" />
                <span className="text-xs text-white/90 font-medium">
                  Verified by WATECH Solutions Ecosystem · 100% Quality & Security Guarantee
                </span>
              </div>
            </div>

            {/* Right Col: Concrete Benefits & Direct Conversion CTAs */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aapko Kya Milega:
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
                  <span>WhatsApp Mashwara</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
