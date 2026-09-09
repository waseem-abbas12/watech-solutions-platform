"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Bot,
  Globe,
  Briefcase,
  Megaphone,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface ServiceGoal {
  id: string;
  tabLabel: string;
  shortTag: string;
  badge: string;
  title: string;
  tagline: string;
  fullDescription: string;
  accentColor: string;
  bgGradient: string;
  icon: React.ElementType;
  deliverables: string[];
  primaryCtaText: string;
  primaryCtaLink: string;
  whatsappMessage: string;
}

const WATECH_SERVICES: ServiceGoal[] = [
  {
    id: "meta-google-ads",
    tabLabel: "🎯 Meta & Google Paid Ads",
    shortTag: "Targeted Inbound Leads",
    badge: "High-Intent Inbound Acquisition",
    title: "Meta (FB & Insta) aur Google Search Ads Se Verified Leads",
    tagline: "Real Estate projects, Luxury Furniture aur B2B businesses ke liye high-ticket verified buyers generate karne wali paid campaigns.",
    fullDescription:
      "Hum vanity likes aur clicks ke peechay nahi bhagte. Hamara ad framework laser-targeted audience targeting, custom lead capture forms aur direct phone/WhatsApp routing par mabni hai. Har campaign ka daily conversion rate aur cost-per-lead track kiya jata hai taake aapke ad spend ka maximum ROI mile.",
    accentColor: "#2563EB",
    bgGradient: "from-blue-600 via-indigo-700 to-slate-900",
    icon: Target,
    deliverables: [
      "High-Converting Ad Creatives & Video Copywriting",
      "Phone-Verified Inbound Lead Capture & Routing",
      "Google Search PPC & Negative Keyword Optimization",
      "Audience Retargeting & Cost-Per-Acquisition Reduction",
    ],
    primaryCtaText: "Meta & Google Ads Detail",
    primaryCtaLink: "/services/meta-ads",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne business ke liye Meta aur Google Paid Ads ke zariye high-converting leads generate karwani hain.",
  },
  {
    id: "whatsapp-crm",
    tabLabel: "🤖 WhatsApp Automation & CRM",
    shortTag: "Zero-Latency Sales Engine",
    badge: "Autonomous 24/7 Sales Engine",
    title: "Automated WhatsApp Cloud Bots & Smart CRM Pipeline",
    tagline: "Inquiry aate hi <30 seconds mein Roman Urdu aur English mein auto-reply, PDF catalogs ki direct delivery, aur sales team tracking.",
    fullDescription:
      "Pakistan mein 80% deals late response ki wajah se zaya hoti hain. Hamara WhatsApp Cloud API system har customer ko foran attend karta hai, unka budget aur requirement poochta hai, product catalog share karta hai, aur qualified lead aapke sales agent ke dashboard par transfer kar deta hai.",
    accentColor: "#16A34A",
    bgGradient: "from-emerald-600 via-teal-700 to-slate-900",
    icon: Bot,
    deliverables: [
      "Zero-Latency (<30s) Instant Roman Urdu/English Bot",
      "Automatic PDF Catalog & Price List Delivery on WhatsApp",
      "Lead Stage Tracking (New, Qualified, Meeting, Closed)",
      "Broadcast Sequences & Inactive Customer Reactivation",
    ],
    primaryCtaText: "WhatsApp Automation Detail",
    primaryCtaLink: "/services/whatsapp-automation",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne business ke liye Automated WhatsApp Bot aur CRM lead management system setup karwana hai.",
  },
  {
    id: "web-development",
    tabLabel: "🌐 Website & App Development",
    shortTag: "Next.js 16 High-Speed Portals",
    badge: "Modern Next.js 16 Engineering",
    title: "High-Speed Web Portals, Search Engines & E-Commerce",
    tagline: "Slow WordPress ki bajaye lightning-fast Next.js 16 platforms jo Google SEO mein top rank karein aur mobile par 1 second mein open hon.",
    fullDescription:
      "Hamari websites sirf digital visiting card nahi balki 24/7 sales machines hoti hain. Filterable product search, clean modern UI, WhatsApp checkout, responsive mobile-first layouts, aur built-in Google Technical SEO jo organic traffic generate karta hai.",
    accentColor: "#2563EB",
    bgGradient: "from-sky-600 via-blue-700 to-slate-900",
    icon: Globe,
    deliverables: [
      "Custom Next.js 16 App Router Architecture (Super Fast)",
      "Advanced Search & Categorized Dynamic Listings Catalog",
      "PWA Mobile App Support & 1-Click WhatsApp Inquiries",
      "100/100 Core Web Vitals & Technical Google SEO Ranking",
    ],
    primaryCtaText: "Web Development Detail",
    primaryCtaLink: "/services/website-development",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne business ke liye fast Next.js website / e-commerce platform develop karwana hai.",
  },
  {
    id: "fmcg-consulting",
    tabLabel: "🏢 FMCG Distribution Consulting",
    shortTag: "17+ Yrs On-Ground Authority",
    badge: "17+ Years Ground Leadership",
    title: "FMCG Distribution Network Setup & Sales Force Route Planning",
    tagline: "17 saala on-ground tajurba — FMCG brands ke liye nationwide distribution expansion, retail route mapping aur sales force deployment.",
    fullDescription:
      "Naye ya existing FMCG brands ke liye ground par distribution khari karna sab se bara challenge hota hai. 17 saal ke practical field tajurbe ke sath hum aapke brand ke liye retail territory route mapping, wholesale dealer onboarding, order bookers ki training, aur digital sales reporting system setup karte hain.",
    accentColor: "#D97706",
    bgGradient: "from-amber-600 via-orange-600 to-stone-900",
    icon: Briefcase,
    deliverables: [
      "Retail Territory Route Planning & Beat Optimization",
      "Distributor Onboarding & Nationwide Dealer Appointments",
      "Sales Force Training & Automated Order Booking Workflow",
      "Trade Marketing, Retailer Push Strategy & Brand Scalability",
    ],
    primaryCtaText: "FMCG Corporate Solutions",
    primaryCtaLink: "/services",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne FMCG brand ki distribution network setup aur on-ground sales force consulting ke liye rabta karna hai.",
  },
  {
    id: "social-media",
    tabLabel: "📱 Social Media & Video Reels",
    shortTag: "Brand Authority & Storytelling",
    badge: "Brand Authority & Content Engine",
    title: "Creative Social Media Marketing & High-Converting Video Reels",
    tagline: "Real Estate projects, Chinioti Master Craftsmanship aur corporate clients ke liye high-end visual storytelling aur viral reels.",
    fullDescription:
      "Aam boring posts se sales nahi aati. Hum aesthetic video tours, behind-the-scenes master craftsmanship storytelling, customer testimonials aur engaging short-form video reels create karte hain jo brand ka trust build karein aur viewers ko paying clients mein convert karein.",
    accentColor: "#E1306C",
    bgGradient: "from-pink-600 via-purple-700 to-slate-900",
    icon: Megaphone,
    deliverables: [
      "Scriptwriting, On-Site Video Shoot & High-End Post Editing",
      "Instagram, Facebook & YouTube Daily Visual Consistency",
      "Brand Identity, Modern Graphic Posters & Carousel Guides",
      "Active Community Engagement & Organic Audience Building",
    ],
    primaryCtaText: "Social Media Marketing Detail",
    primaryCtaLink: "/services/social-media-marketing",
    whatsappMessage: "Assalam o Alaikum WATECH, Mujhe apne brand ke social media marketing aur video reels production ke liye package discuss karna hai.",
  },
];

export const SmartSalesFunnel = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>("meta-google-ads");

  const currentService = WATECH_SERVICES.find((s) => s.id === activeServiceId) || WATECH_SERVICES[0];
  const IconComponent = currentService.icon;

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
            <span>WATECH Core Business Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Hum Aapke Karobar Ke Liye Kya Karte Hain?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto">
            Neeche hamari 5 core services mein se kisi par bhi click karein — mukammal scope, deliverables aur instant WhatsApp consultation open ho jayegi.
          </p>
        </div>

        {/* 5 Core Service Selector Tiles (100% visible on all screen sizes) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {WATECH_SERVICES.map((srv, idx) => {
            const isActive = srv.id === activeServiceId;
            const BtnIcon = srv.icon;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
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
                  {srv.tabLabel.replace(/^[^\s]+\s/, "")}
                </span>
                <span
                  className={`text-[11px] mt-0.5 font-medium ${
                    isActive ? "text-blue-300" : "text-slate-500"
                  }`}
                >
                  {srv.shortTag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card Below */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Left Col: Visual & Authority Overview */}
            <div
              className={`lg:col-span-5 p-8 sm:p-12 bg-gradient-to-br ${currentService.bgGradient} text-white flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase mb-4 border border-white/20">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{currentService.badge}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                  {currentService.title}
                </h3>
                <p className="text-sm sm:text-base text-white/90 mt-3 leading-relaxed">
                  {currentService.tagline}
                </p>
              </div>

              {/* Trust Badge */}
              <div className="relative z-10 pt-8 mt-6 border-t border-white/20 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-white/90 shrink-0" />
                <span className="text-xs text-white/90 font-medium">
                  Guaranteed Execution · Dedicated Project Manager · 100% Transparency
                </span>
              </div>
            </div>

            {/* Right Col: Deep Explanation & Concrete Deliverables */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div>
                {/* Problem & Solution Paragraph */}
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Yeh Service Kaise Kaam Karti Hai:
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed mt-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {currentService.fullDescription}
                  </p>
                </div>

                {/* Scope of Work Deliverables */}
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Aapko Kya Kya Milega (Deliverables):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 mb-8">
                  {currentService.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/70 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href={currentService.primaryCtaLink}
                  className="flex-1 py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                >
                  <span>{currentService.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={getWhatsAppUrl(currentService.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp Mashwara</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
