"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Sparkles,
  TrendingUp,
  Target,
  Bot,
  Globe,
  CheckCircle2,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Send,
  Zap,
  BarChart3,
  Award,
  Video,
  Layers,
  Search,
  Check,
  AlertTriangle,
  FileCheck,
  Compass,
  Cpu,
  Workflow,
  Palette,
  Smartphone,
  FileText,
  Laptop,
  Code2,
  Share2,
} from "lucide-react";

export default function AgencyPortalPage() {
  // Service category filter
  const [activeTab, setActiveTab] = useState<string>("all");

  // Audit Form State
  const [businessName, setBusinessName] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("Paid Ads & Performance Marketing");
  const [businessType, setBusinessType] = useState("Real Estate Agency");
  const [clientPhone, setClientPhone] = useState("");
  const [challengeNotes, setChallengeNotes] = useState("");
  const [isSubmittingAudit, setIsSubmittingAudit] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAudit(true);

    const text = `Assalam-o-Alaikum WATECH Agency Desk,\nI would like to request a 1-on-1 Growth Diagnostic Session:\n• Business Name: ${businessName}\n• Required Service: ${serviceNeeded}\n• Industry Sector: ${businessType}\n• WhatsApp/Phone: ${clientPhone}\n• Current Challenge: ${challengeNotes || "Want verified high-intent leads and scalable revenue systems"}\n\nPlease confirm consultation slot availability.`;

    setTimeout(() => {
      setIsSubmittingAudit(false);
      setAuditSuccess(true);
      window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
    }, 500);
  };

  const agencyServices = [
    // 1. UGC Ads
    {
      id: "ugc-ads",
      category: "creative",
      icon: Video,
      badge: "Viral Creator Production",
      title: "UGC Ads & Creator Video Production",
      tagline: "Asal logon ke authentic product reviews, unboxing, aur viral hooks jo customer ka trust jeet te hain.",
      deliverables: [
        "Vetted Pakistani UGC creators (Urdu & English) tailored to your brand niche",
        "High-retention video hooks designed specifically for TikTok, Reels & YouTube Shorts",
        "Problem-Agitate-Solve scriptwriting that doesn't feel like a boring commercial ad",
        "Raw footage + professional editing with dynamic captions, sound design & CTAs",
      ],
      tools: ["CapCut Pro", "Premiere Pro", "Native Mobile 4K", "TikTok Creative Center"],
      bestFor: "E-commerce Brands, Real Estate Walkthroughs, Furniture Showrooms, Mobile Apps",
    },

    // 2. Graphics & Creative Design
    {
      id: "graphics-design",
      category: "creative",
      icon: Palette,
      badge: "High-Converting Visuals",
      title: "Graphics & Brand Identity Design",
      tagline: "Professional visuals jo scroll karte hue user ka hath rokein aur brand authority qaim karein.",
      deliverables: [
        "High-CTR ad banners for Meta, Google Display & TikTok sponsored posts",
        "Complete Brand Identity: Logo guidelines, typography, color palette & icon sets",
        "Social media carousel design & story templates optimized for viral engagement",
        "3D product mockups, luxury packaging, brochures, and sales pitch decks",
      ],
      tools: ["Figma", "Adobe Illustrator", "Photoshop", "Blender 3D"],
      bestFor: "New Brands, Corporate Companies, Retail Showrooms, Product Packaging",
    },

    // 3. Websites & Web Funnels
    {
      id: "websites",
      category: "tech",
      icon: Globe,
      badge: "Sub-Second Next.js 16",
      title: "Websites & High-Converting Web Funnels",
      tagline: "Sub-second load hone wali Next.js 16 websites jo slow WordPress se 4x zyada conversion deti hain.",
      deliverables: [
        "Full-stack Next.js 16 (App Router) + Tailwind CSS 4 + TypeScript development",
        "95+ Google PageSpeed score on mobile 4G networks across Pakistan",
        "Direct 1-click WhatsApp order booking & lead generation workflows",
        "Conversion API (CAPI), Meta Pixel, Google Tag Manager & Server-Side Event Tracking",
      ],
      tools: ["Next.js 16", "Tailwind CSS 4", "TypeScript", "Vercel", "Cloudflare"],
      bestFor: "Property Builders, Direct-to-Consumer Brands, High-Volume E-commerce",
    },

    // 4. Softwares & ERPs
    {
      id: "softwares",
      category: "tech",
      icon: Laptop,
      badge: "Enterprise Business Logic",
      title: "Custom Softwares & Cloud ERP Systems",
      tagline: "Aapke business ke operational workflow ke mutabiq bespoke CRM, billing, aur stock management portals.",
      deliverables: [
        "Bespoke Lead Management CRM with automated sales team distribution",
        "Inventory & Warehouse management software with real-time stock sync",
        "Multi-branch billing, POS system, and ledger accounting modules",
        "Secure cloud databases (PostgreSQL / Firebase) with role-based staff access",
      ],
      tools: ["React", "Node.js", "PostgreSQL", "Firebase Cloud", "Docker"],
      bestFor: "Real Estate Agencies, Furniture Factories, Multi-Branch Wholesalers, Event Venues",
    },

    // 5. Mobile Apps
    {
      id: "mobile-apps",
      category: "tech",
      icon: Smartphone,
      badge: "iOS & Android Ecosystem",
      title: "Mobile App Development (Android & iOS)",
      tagline: "Native performance wali cross-platform mobile apps jo customer retention aur daily active users barhati hain.",
      deliverables: [
        "Cross-platform development using React Native and Flutter for unified iOS & Android build",
        "Instant push notifications for hot deals, booking updates, and announcements",
        "Offline-first local caching for seamless performance on spotty mobile data",
        "Complete Apple App Store & Google Play Store submission & review compliance",
      ],
      tools: ["React Native", "Flutter", "Firebase Auth", "REST / GraphQL APIs"],
      bestFor: "Booking Services, Marketplace Startups, Dealer Partner Networks, Customer Loyalty",
    },

    // 6. Paid Ads & Performance Marketing
    {
      id: "paid-ads",
      category: "growth",
      icon: Target,
      badge: "Targeted Buyer Acquisition",
      title: "Paid Ads & Performance Marketing",
      tagline: "Meta, Google Search, aur TikTok par data-driven ads jo be-faida likes ke bajaye direct sales generate karein.",
      deliverables: [
        "Hyper-targeted Meta Ads (Facebook & Instagram) focused on verified buyers and Overseas Pakistanis",
        "Google Search & Maps intent capture for people searching to buy right now",
        "TikTok performance campaigns targeting high-volume consumer markets",
        "Continuous A/B split testing of hooks, copy, and audience angles with daily budget optimization",
      ],
      tools: ["Meta Ads Manager", "Google Ads", "TikTok Ads Manager", "Triple Whale / CAPI"],
      bestFor: "High-Ticket Real Estate, Luxury Furniture, Shadi Banquets, Scaling D2C",
    },

    // 7. Content Strategy & Organic Growth
    {
      id: "content-strategy",
      category: "growth",
      icon: Compass,
      badge: "Organic Brand Authority",
      title: "Content Strategy & Organic Authority Systems",
      tagline: "Consistent viral content jo aapko industry ka trusted leader banata hai taake log be-dharak order karein.",
      deliverables: [
        "Monthly content editorial calendars mapped to buyer pain points and objections",
        "Viral short-form scripting for Instagram Reels, YouTube Shorts, and TikTok",
        "Founder & CEO personal branding interviews that build deep human trust",
        "Audience retention optimization, trend-jacking, and SEO-friendly video captions",
      ],
      tools: ["Notion Strategy Hub", "Script Engine", "Frame.io", "Metricool"],
      bestFor: "Founders, Consultants, Real Estate Experts, Premium Showroom Brands",
    },

    // 8. AI Automations & WhatsApp Chatbots
    {
      id: "ai-automations",
      category: "ai",
      icon: Bot,
      badge: "24/7 Intelligent Desk",
      title: "AI Automations & WhatsApp Chatbots",
      tagline: "Raat ke 2 baje aane wali inquiry ko bhi 5 second mein qualify karein aur brochure share karein.",
      deliverables: [
        "Smart WhatsApp AI bot that answers pricing, specifications, and sends brochures in 5 seconds",
        "Lead budget qualification (e.g. 50 Lac vs 2 Crore) before handing over to human sales closing reps",
        "Automated re-engagement sequences on Day 2, Day 5, and Day 10 for unresponsive buyers",
        "Zapier / Make / Webhook workflows connecting ads, WhatsApp, and internal Google Sheets / CRMs",
      ],
      tools: ["WhatsApp Cloud API", "OpenAI / Claude", "Make.com", "Zapier", "Webhooks"],
      bestFor: "Sales Teams with 25+ daily inquiries, Overseas Buyer Inquiries, Fast-Response Desks",
    },
  ];

  const filteredServices = useMemo(() => {
    if (activeTab === "all") return agencyServices;
    return agencyServices.filter((s) => s.category === activeTab);
  }, [activeTab]);

  const executionSteps = [
    {
      step: "01",
      title: "Deep Business Audit & Diagnostics",
      desc: "Hum aapke mojooda sales numbers, target audience, aur competitors ka jaiza lete hain. Yeh clear karte hain ke ad spend kahan lagana faida-mand hoga.",
    },
    {
      step: "02",
      title: "Irresistible Offer Formulation",
      desc: "Client ko attract karne ke liye compelling offer tayyar ki jaati hai (e.g. 100% Registry Verification, Free Workshop Tour, Flexible Token Plan).",
    },
    {
      step: "03",
      title: "High-Speed Funnel & Tech Setup",
      desc: "Modern Next.js landing page live ki jaati hai aur WhatsApp routing bot setup hota hai taake har lead trace ho sake.",
    },
    {
      step: "04",
      title: "Creative & Data Optimization",
      desc: "Pehle 7 din mukhtalif UGC video creatives aur audiences test hoti hain taake sab se kam cost par behtareen buyers identify ho sakein.",
    },
    {
      step: "05",
      title: "Scaling Profitable Campaigns & Sales Sync",
      desc: "Winning campaigns par budget barha diya jata hai aur aapki sales closing team ke sath daily follow-up audit kiya jata hai.",
    },
  ];

  const industrySectors = [
    {
      title: "Real Estate & Builders",
      points: ["1 Kanal / 10 Marla Luxury Houses", "Society Files & Plots", "Commercial Plazas & Shops"],
      icon: "🏢",
    },
    {
      title: "Chinioti & Luxury Furniture",
      points: ["Bridal Bedroom Suites", "Handcrafted Carved Living Sets", "Overseas Container Exports"],
      icon: "🪑",
    },
    {
      title: "Events & Hospitality",
      points: ["Wedding Banquet Halls", "Corporate Lunch & Shadi Catering", "Outdoor Event Planners"],
      icon: "🍲",
    },
    {
      title: "B2B & High-Ticket Services",
      points: ["Architecture & Construction", "Industrial Machinery & Solar", "Professional Consultancies"],
      icon: "💼",
    },
  ];

  const faqs = [
    {
      q: "Online marketing mein results aane ki kya guarantee hoti hai?",
      a: "Hum koi fake ya hawai guarantee nahi dete. Nateeja hamesha product ki quality, offer ki attractiveness, market demand, aur aapki sales closing team ki speed par depend karta hai. Humara kaam technical systems, high-intent targeting, aur conversion funnels ko 100% professional banana hai taake kamyabi ke imkaanat maximum hon.",
    },
    {
      q: "Kya WATECH software aur mobile app development bhi khud karti hai?",
      a: "Ji bilkul! Humari in-house development team Next.js 16, Flutter, React Native aur Cloud Databases (PostgreSQL / Firebase) par custom softwares, inventory ERPs, aur mobile applications banati hai.",
    },
    {
      q: "UGC ads doosre traditional ad creatives se behtar kyun hain?",
      a: "Traditional graphic post ya tv commercial ko log advertisement samajh kar skip kar dete hain. UGC (User Generated Content) mein real Pakistani creators live camera par genuine product review ya walkthrough dete hain jo viewer ko organic lagta hai aur 3x zyada click-through-rate (CTR) deta hai.",
    },
    {
      q: "Ad spend budget hum kis tarah pay karte hain?",
      a: "Ad budget aap direct apne Meta ya Google ad account mein card se pay karte hain. Koi beech mein chhipa hua markup nahi hota. Har aik rupaye ka hisab live analytics dashboard par visible hota hai.",
    },
    {
      q: "WhatsApp AI Bot se leads kaise qualify hoti hain?",
      a: "Hum aapke WhatsApp number par aik smart qualification flow setup karte hain jo buyer se unka budget, location preference, aur timeline foran pooch kar categorize karta hai taake aapki sales team sirf serious buyers se baat kare.",
    },
    {
      q: "Campaigns kitne din mein live hoti hain?",
      a: "Strategy audit aur video creatives approve hone ke 48 se 72 ghante ke andar poori technical campaign live kar di jati hai.",
    },
  ];

  const handleConsultServiceWhatsApp = (srvTitle: string) => {
    const text = `Assalam-o-Alaikum WATECH Solutions, I am interested in your "${srvTitle}" service for my business. Please share case studies, scope details, and consultation process.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col">
      {/* 1. Dedicated Agency Top Bar */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-semibold text-white">WATECH Solutions — Digital Agency & Tech House</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Software · Apps · UGC · Paid Ads · AI Automation</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Main Hub
            </Link>
            <Link href="/real-estate" className="hover:text-white transition-colors">
              Real Estate
            </Link>
            <Link href="/furniture" className="hover:text-white transition-colors">
              Chinioti Furniture
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-mono">Desk: +92 327 0831470</span>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Agency Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 p-0.5 shadow-md shadow-blue-600/20">
              <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                <Image
                  src="/images/watech-mark-transparent.png"
                  alt="WATECH Agency"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-slate-900 leading-none">
                WATECH <span className="text-blue-600">SOLUTIONS</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-0.5">
                Tech & Performance Marketing House
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <a href="#services" className="hover:text-blue-600 transition-colors">
              Services (8 Pillars)
            </a>
            <a href="#reality" className="hover:text-blue-600 transition-colors">
              Honest Philosophy
            </a>
            <a href="#process" className="hover:text-blue-600 transition-colors">
              5-Step Process
            </a>
            <a href="#industries" className="hover:text-blue-600 transition-colors">
              Industries
            </a>
            <a href="#audit-form" className="hover:text-blue-600 transition-colors">
              Book Audit
            </a>
          </nav>

          <a
            href="#audit-form"
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            <span>Request Growth Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* 3. High-Impact Agency Hero */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
              <Rocket className="w-4 h-4 text-blue-600" />
              <span>Full-Spectrum Digital Agency & Custom Software House</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              UGC Ads, Custom Software, Apps, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600">
                Websites & Paid Performance
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
              Hum sirf ad campaign nahi chalate; hum aapke business ka complete digital ecosystem tayyar karte hain: 
              <strong> UGC Creator Ads, Graphics, Next.js Websites, Custom Softwares/ERPs, Mobile Apps, Meta/Google Paid Ads, Content Strategy,</strong> aur <strong>24/7 AI WhatsApp Automation</strong>.
            </p>

            {/* Core Service Tags Strip */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-3xl mx-auto">
              {[
                "🎬 UGC Ads & Videos",
                "🎨 Creative Graphics",
                "🌐 Next.js 16 Websites",
                "💻 Custom Softwares / ERPs",
                "📱 Mobile Apps (iOS/Android)",
                "🎯 Paid Performance Ads",
                "📈 Content Strategy",
                "🤖 AI WhatsApp Automation",
              ].map((pill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#audit-form"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Book 1-on-1 Strategy Diagnostic</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Solutions,%20I%20want%20to%20discuss%20project%20requirements"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Strategy Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Honest Marketing Reality Strip (Zero Fake Claims / Transparent Principles) */}
      <section id="reality" className="py-12 bg-slate-900 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>WATECH Core Principle: Shafafiyat & Sachai (Zero Fake Promises)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Online Marketing Ka Asal Sach: Koi Hawai Dawa Ya Jadoo Nahi Hai
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Online marketing bohot zabardast nateeja bhi de sakti hai aur bohot kharab bhi ho sakti hai. Nateeja hamesha aapki offer ki taqat, video creative ki quality, aur aapki sales closing team ki speed par depend karta hai. Agar product ya customer response kamzor ho to koi bhi agency faida nahi de sakti. Hum fake rozi khawab dikhane ke bajaye technical systems, accurate tracking, aur transparent analytics provide karte hain.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                  <Check className="w-4 h-4" />
                  <span>Kamyabi Kahan Se Aati Hai:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real video walkthroughs, clear competitive pricing, authentic UGC creators, aur inquiry aane ke 5 minute ke andar sales follow-up.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Nuqsan Kahan Hota Hai:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Internet se uthayi hui fake photos, slow loading WordPress websites, aur leads ko 24 ghante baad call karne se ad budget zaya hota hai.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5 mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Humara Kirdar:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-intent buyer targeting, sub-second conversion funnels, custom software/mobile app logic, aur AI qualification bots jo non-serious logon ko filter karein.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 8 Comprehensive Service Pillars (with Tab Switcher) */}
      <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
            End-to-End Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            8 Core Digital & Tech Capabilities
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Har vertical experienced in-house specialists aur technical tools ke zariye deliver kiya jata hai.
          </p>

          {/* Interactive Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All 8 Pillars" },
              { id: "creative", label: "🎨 Creative & UGC (2)" },
              { id: "tech", label: "💻 Tech, Web & Apps (3)" },
              { id: "growth", label: "🎯 Paid Ads & Content (2)" },
              { id: "ai", label: "🤖 AI & Automation (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-500 transition-all hover:shadow-xl flex flex-col justify-between group space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {srv.tagline}
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                      Key Deliverables:
                    </div>
                    {srv.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-start gap-2 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-relaxed">{deliv}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Tools & Stack:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.tools.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-mono text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] font-medium text-slate-500 truncate">
                    {srv.bestFor.split(",")[0]}
                  </span>
                  <button
                    onClick={() => handleConsultServiceWhatsApp(srv.title)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. The 5-Step Execution Blueprint */}
      <section id="process" className="py-20 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
              Tested Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Hamara 5-Step Transparent Execution Process
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Step-by-step roadmap jo discovery aur tech development se le kar customer deal closing tak har marhalay ko track karta hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {executionSteps.map((st) => (
              <div
                key={st.step}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-3xl font-black text-blue-600 font-mono">
                    {st.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 mt-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="w-full h-1 rounded-full bg-blue-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industry Specializations */}
      <section id="industries" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">
            Sector Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Hamari Core Niche Specialization
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Hum general marketing nahi karte; hum sirf un sectors par focus karte hain jahan humari on-ground domain knowledge hai.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industrySectors.map((ind) => (
            <div
              key={ind.title}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4"
            >
              <div className="text-3xl">{ind.icon}</div>
              <h3 className="text-base font-bold text-slate-900">{ind.title}</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {ind.points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Growth Strategy Audit Form (No Fake Calculators, Pure Consultation) */}
      <section id="audit-form" className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
                1-on-1 Strategy Session
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Apne Business Ka 20-Minute Growth Audit Book Karein
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Koi fake robot calculations nahi. Direct Waseem Abbas aur technical team ke sath confidential strategy session jahan hum aapke business funnel, apps ya marketing ki kamzoriyan identify karenge.
              </p>
            </div>

            {auditSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Diagnostic Request Successfully Dispatched!</h3>
                <p className="text-xs text-slate-300">
                  Aapki business details WhatsApp par forward ho chuki hain. WATECH strategy team aapke sath consultation time finalize karegi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4 max-w-xl mx-auto">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Business / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al-Madina Estate / Royal Furniture Chiniot"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Primary Service Needed *
                    </label>
                    <select
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="UGC Ads & Video Production">UGC Ads & Video Production</option>
                      <option value="Graphics & Creative Design">Graphics & Brand Identity Design</option>
                      <option value="Next.js Website / Web Funnel">High-Speed Next.js Website / Web Funnel</option>
                      <option value="Custom Software / Cloud ERP">Custom Software / Cloud ERP System</option>
                      <option value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</option>
                      <option value="Paid Ads & Performance Marketing">Paid Ads (Meta / Google / TikTok)</option>
                      <option value="Content Strategy & Authority">Content Strategy & Organic Growth</option>
                      <option value="AI WhatsApp Automation & Bots">AI WhatsApp Automation & Chatbots</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Business Sector *
                    </label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Real Estate Agency">Real Estate Agency / Builder</option>
                      <option value="Furniture Manufacturer">Furniture Manufacturer / Showroom</option>
                      <option value="Food & Catering">Event / Banquet / Catering</option>
                      <option value="E-commerce Store">E-commerce Brand / Retail</option>
                      <option value="B2B Manufacturing">B2B Manufacturing / Wholesale</option>
                      <option value="Other High-Ticket">Other High-Ticket Business</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    WhatsApp Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0327-0831470"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Sab Se Bada Challenge Kya Hai? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Website slow hai, UGC creators nahi mil rahe, ya WhatsApp par inquiries manually handle nahi ho rahi..."
                    value={challengeNotes}
                    onChange={(e) => setChallengeNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingAudit}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmittingAudit ? "Scheduling..." : "Request Free 20-Min Strategy Audit on WhatsApp"}</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center">
                  100% Confidential · Zero Sales Pressure · Practical Actionable Strategy
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 9. FAQs Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <h3 className="text-2xl font-black text-slate-900 text-center mb-8">
          Agency FAQs (Aksar Pooche Jane Wale Sawalat)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4.5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 hover:text-blue-700 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-blue-600 transition-transform ${
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

      {/* 10. Dedicated Agency Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/watech-mark-transparent.png"
                  alt="WATECH Agency"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-white font-bold text-sm">WATECH Digital Agency</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Full-spectrum digital agency and custom software house: UGC ads, graphics, Next.js web funnels, custom ERPs, mobile apps, performance marketing, and AI WhatsApp bots.
              </p>
              <div className="text-slate-300 font-medium">
                CEO: Waseem Abbas
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Creative & Ads
              </div>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab("creative")} className="hover:text-blue-400">UGC Ads & Video Production</button></li>
                <li><button onClick={() => setActiveTab("creative")} className="hover:text-blue-400">Graphics & Creative Design</button></li>
                <li><button onClick={() => setActiveTab("growth")} className="hover:text-blue-400">Paid Ads (Meta/Google/TikTok)</button></li>
                <li><button onClick={() => setActiveTab("growth")} className="hover:text-blue-400">Content Strategy & Organic Growth</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Tech & Software
              </div>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab("tech")} className="hover:text-blue-400">Next.js 16 High-Speed Websites</button></li>
                <li><button onClick={() => setActiveTab("tech")} className="hover:text-blue-400">Custom Business Softwares & ERPs</button></li>
                <li><button onClick={() => setActiveTab("tech")} className="hover:text-blue-400">Mobile Apps (Android & iOS)</button></li>
                <li><button onClick={() => setActiveTab("ai")} className="hover:text-blue-400">AI WhatsApp Automation Bots</button></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Headquarters Desk
              </div>
              <p className="text-slate-400 mb-2">
                Punjab, Pakistan · Worldwide Remote Client Strategy
              </p>
              <p className="text-slate-300 font-mono">
                Strategy Desk: +92 327 0831470
              </p>
              <p className="text-slate-300">
                Email: waseem000094@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © {new Date().getFullYear()} WATECH Digital Agency & Software House. All rights reserved.
            </div>
            <div>
              UGC Ads · Graphics · Websites · Softwares · Mobile Apps · Paid Ads · AI Automation.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
