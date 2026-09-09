import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Armchair,
  PartyPopper,
  Megaphone,
  Cpu,
  TrendingUp,
  ShieldCheck,
  Target,
  Zap,
  Users,
  Compass,
  ChevronRight,
  Network,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Watech | Pakistan's Integrated Business & Growth Ecosystem",
  description:
    "WATECH is a technology-driven business ecosystem connecting customers, businesses, and service providers across Real Estate, Chinioti Furniture, and Events with modern digital services and automation.",
  alternates: {
    canonical: "https://watech-solutions-platform-eight.vercel.app/about",
  },
  openGraph: {
    title: "About Watech Solutions Platform",
    description:
      "Technology-driven business growth, marketplace transparency, and partner ecosystem in Pakistan.",
    url: "https://watech-solutions-platform-eight.vercel.app/about",
    siteName: "Watech Solutions Platform",
    type: "website",
  },
};

export default function AboutPage() {
  const journeys = [
    {
      title: "Digital Services & Growth Agency",
      accent: "text-[#2563EB]",
      badge: "Services Journey",
      bgBadge: "bg-blue-50 border-blue-200 text-[#2563EB]",
      desc: "Performance marketing, high-converting Meta & Google ad funnels, custom Next.js platforms, and official WhatsApp automation bots engineered to bring measurable revenue to Pakistani enterprises.",
      points: ["High-intent buyer lead funnels", "Official Meta WhatsApp Cloud API bots", "Custom Next.js & TypeScript platforms"],
      link: "/services",
    },
    {
      title: "Direct Verified Marketplace",
      accent: "text-[#16A34A]",
      badge: "Products Journey",
      bgBadge: "bg-emerald-50 border-emerald-200 text-[#16A34A]",
      desc: "A transparent digital marketplace connecting genuine buyers directly with verified sellers in Real Estate (plots & homes), authentic Chinioti Sheesham wood furniture, and signature banquet venues.",
      points: ["100% phone-verified listings", "Direct transparent pricing", "Frictionless WhatsApp seller contact"],
      link: "/marketplace",
    },
    {
      title: "Partner Ecosystem",
      accent: "text-[#EA580C]",
      badge: "Partners Journey",
      bgBadge: "bg-orange-50 border-orange-200 text-[#EA580C]",
      desc: "A collaborative commercial platform where local real estate agents, Chiniot artisan workshops, and event vendors join free to receive buyer demand, verified inquiries, and shared technology tools.",
      points: ["Free listing & business onboarding", "Automated commission accounting", "Direct verified customer leads"],
      link: "/partners",
    },
  ];

  const pillars = [
    {
      icon: Megaphone,
      title: "Digital Marketing",
      desc: "Paid search, social ads, and authority content engineered for high-ticket industries.",
    },
    {
      icon: Globe2,
      title: "Marketplace Infrastructure",
      desc: "Centralized catalog for verified properties, handcrafted furniture, and banquet spaces.",
    },
    {
      icon: Users,
      title: "Partner Network",
      desc: "Connecting manufacturers, brokers, and event planners with nationwide customer demand.",
    },
    {
      icon: Cpu,
      title: "AI & Automation",
      desc: "Self-hosted workflows, instant lead routing, and 24/7 WhatsApp customer conversational bots.",
    },
    {
      icon: ShieldCheck,
      title: "Trust & Verification",
      desc: "Rigorous quality screening to eliminate middleman fraud and fake listing clutter.",
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      desc: "Strategic consulting, sales CRM pipelines, and commercial scale advisory.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Ecosystem Onboarding",
      desc: "Businesses join WATECH as verified marketplace partners or digital services clients with clearly defined growth objectives.",
    },
    {
      num: "02",
      title: "Technology & Catalog Integration",
      desc: "Inventory (properties, furniture pieces, hall dates) or service funnels are configured with real-time WhatsApp automation.",
    },
    {
      num: "03",
      title: "Precision Demand Generation",
      desc: "WATECH drives qualified local and overseas Pakistani buyers through targeted search, SEO, and paid campaigns.",
    },
    {
      num: "04",
      title: "Frictionless Deal Closing",
      desc: "Leads are qualified in seconds, inquiries reach decision-makers directly, and transactions conclude with transparency.",
    },
  ];

  const reasons = [
    {
      title: "Engineered For Pakistan's Reality",
      desc: "We understand that in Pakistan, high-value deals don't happen via anonymous cart checkouts; they close on WhatsApp calls, site visits, and verified trust.",
    },
    {
      title: "All-in-One Multi-Sector Synergy",
      desc: "A property buyer invariably needs luxury furniture and frequently plans family weddings. Our ecosystem cross-pollinates buyer intent across all three verticals.",
    },
    {
      title: "Zero-Bloat Modern Technology",
      desc: "No slow, broken templates. Built with Next.js 16, TypeScript, and cloud-native databases for sub-second speeds on Pakistani 4G mobile connections.",
    },
    {
      title: "Radical Transparency",
      desc: "Direct contact between verified buyers and sellers, transparent commissions, and honest marketing performance metrics.",
    },
  ];

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white min-h-screen">
      {/* BREADCRUMB */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium">About WATECH</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/services" className="hover:text-[#2563EB] font-semibold transition-colors">
              Services
            </Link>
            <Link href="/marketplace" className="hover:text-[#16A34A] font-semibold transition-colors">
              Marketplace
            </Link>
            <Link href="/partners" className="hover:text-[#EA580C] font-semibold transition-colors">
              Partners
            </Link>
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-blue-50/40 via-white to-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The WATECH Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Powering Pakistan's High-Value Businesses Through{" "}
            <span className="text-[#2563EB]">Technology & Growth</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            WATECH is a technology-driven business ecosystem connecting customers, businesses, and verified service providers across Real Estate, Chinioti Handcrafted Furniture, and Signature Events.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Work With WATECH</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/partners"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Join Our Partner Ecosystem</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & WHAT WE DO */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              A Hybrid Technology Platform & Business Growth Engine
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Headquartered in Pakistan, WATECH Solutions was founded to solve a fundamental disconnect in the country’s high-value commerce: traditional, heritage-rich industries like Real Estate, Chinioti woodcraft, and banquet hospitality lacked modern digital infrastructure, transparency, and automated sales operations.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We bridge this gap by uniting modern full-stack web engineering, official Meta WhatsApp automation, data-driven performance marketing, and verified multi-vendor marketplace listings under one cohesive ecosystem.
            </p>
          </div>

          <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              What We Do
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Six Interconnected Capabilities
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pil, idx) => (
                <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200/60 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <pil.icon className="w-4 h-4 text-[#2563EB]" />
                    <span className="text-xs font-bold text-slate-900">{pil.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{pil.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR ECOSYSTEM (THE THREE JOURNEYS) */}
      <section className="py-20 px-6 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              The Three Journeys
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              One Unified Ecosystem
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every participant in WATECH engages through a tailored journey designed for maximum efficiency and growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journeys.map((j, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${j.bgBadge}`}>
                    {j.badge}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    {j.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {j.desc}
                  </p>
                  <ul className="space-y-2 pt-3 border-t border-slate-100">
                    {j.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={j.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-blue-700 transition-colors"
                  >
                    <span>Explore {j.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WATECH WORKS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Operational Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How WATECH Works
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A transparent, repeatable methodology turning inquiries into sustainable revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3"
              >
                <div className="text-3xl font-black text-[#2563EB]/40">
                  {st.num}
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY WATECH */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              The WATECH Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Why Businesses & Buyers Choose WATECH
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((r, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VISION & MISSION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#2563EB] flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Our Vision
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              To Be Pakistan's Leading Growth Ecosystem
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We envision a future where every authentic Pakistani business—from local property realtors in Faisalabad to third-generation Chinioti woodcarvers—is empowered by world-class software, high-converting digital advertising, and transparent customer acquisition.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-emerald-50/40 border border-emerald-100 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#16A34A] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
              Our Mission
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Eliminate Friction, Accelerate Growth
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our mission is to eliminate middleman extortion, fragmented communications, and slow lead conversions by delivering unified digital services, direct marketplace channels, and free partner onboarding that generate real economic impact.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Ready to Grow With WATECH?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Whether you want to scale your business with our digital growth agency or showcase your inventory on our verified marketplace, we are ready to partner with you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Work With WATECH</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/partners"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Join Our Partner Ecosystem</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}