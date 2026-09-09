"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  Building2,
  Sofa,
  Utensils,
  Package,
  Rocket,
  ArrowRight,
  Mouse,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Briefcase,
} from "lucide-react";
import { SmartSalesFunnel } from "@/components/common/smart-sales-funnel";
import { HomeFaqs } from "@/components/common/home-faqs";
import { SocialIcons } from "@/components/common/social-icons";

export default function HomePage() {
  // Typewriter effect for subheading
  const fullText = "Digital Performance Agency · 17+ Yrs FMCG Authority · Real Estate · Chinioti Craft";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="w-full bg-white selection:bg-slate-900 selection:text-white">
      {/* =========================================
          HERO SECTION (Full Viewport Height)
          ========================================= */}
      <section className="relative min-h-[calc(100vh-5rem)] py-14 flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Subtle Animated Gradient Background */}
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 50% 40%, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 70%)",
              "radial-gradient(circle at 60% 50%, rgba(241, 245, 249, 1) 0%, rgba(255, 255, 255, 1) 75%)",
              "radial-gradient(circle at 40% 60%, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 70%)",
              "radial-gradient(circle at 50% 40%, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 70%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 -z-10"
        />

        {/* Hero Content Container */}
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Subheading with Typewriter Effect */}
          <div className="mb-5 flex items-center justify-center min-h-[1.75rem]">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-blue-600 font-mono">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-3.5 bg-blue-500 ml-1 translate-y-0.5"
              />
            </span>
          </div>

          {/* Massive Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.8rem] font-black text-slate-900 tracking-tight leading-[1.08] max-w-4xl"
          >
            Building Pakistan&apos;s
            <br />
            Leading Growth Ecosystem.
          </motion.h1>

          <p className="text-base sm:text-lg text-slate-600 mt-5 max-w-2xl leading-relaxed">
            17+ saala on-ground tajurba aur cutting-edge technology ka sangam — Omnichannel Digital Marketing, FMCG Corporate Consulting, Verified Real Estate aur Asal Chinioti Craft.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
            <Link
              href="/services"
              className="px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all"
            >
              Enterprise Digital Services
            </Link>
            <Link
              href="/marketplace"
              className="px-8 py-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:scale-105 transition-all"
            >
              Products & Wholesale Marketplace
            </Link>
          </div>

          {/* Authority Metrics Numbers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 w-full max-w-3xl pt-6 border-t border-slate-200/80">
            {[
              { num: "17+", label: "Years On-Ground", sub: "FMCG Leadership" },
              { num: "774+", label: "Authentic Designs", sub: "Chinioti Woodcraft" },
              { num: "<30s", label: "WhatsApp Lead", sub: "Auto-Response Engine" },
              { num: "100%", label: "Verified Deals", sub: "Deals & Partnership JVs" },
            ].map((m, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-2 rounded-2xl bg-white/50 border border-slate-100">
                <span className="text-2xl sm:text-3xl font-black text-[#2563EB] tracking-tight font-mono">
                  {m.num}
                </span>
                <span className="text-xs font-bold text-slate-900 mt-0.5">
                  {m.label}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Founder Authority Pill */}
          <Link
            href="/about"
            className="inline-flex items-center gap-3.5 mt-8 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-700/80 shadow-md group hover:scale-[1.02]"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-400 shrink-0">
              <Image
                src="/images/founder-waseem-abbas.jpg"
                alt="Waseem Abbas - Founder & CEO"
                width={32}
                height={32}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white tracking-tight">Waseem Abbas</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-semibold">Founder & CEO</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[280px] sm:max-w-md">
                "Direct accountability on every deal & digital partnership."
              </p>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Minimal Blinking Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 flex flex-col items-center gap-2 text-slate-400 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
          }}
        >
          <Mouse className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll Down</span>
        </motion.div>
      </section>

      {/* =========================================
          DOMINANT 3-GATEWAY SPECIALIZED PORTALS NAVIGATOR (ZERO COMPLEXITY)
          ========================================= */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 border-b border-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Zero-Confusion Navigation · 3 Dedicated Portals</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Aap Aaj Kis Sector Mein Dakhil Hona Chahte Hain?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Complexity khatam! Har niche ke liye mukammal dedicated website banayi gayi hai taake aap asani se explore kar sakein:
            </p>
          </div>

          {/* 3 Gateway Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Real Estate Portal */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-7 border border-emerald-500/30 hover:border-emerald-500 transition-all hover:shadow-2xl hover:shadow-emerald-950/50 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    Dedicated Portal
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  WATECH Real Estate
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Punjab & Chiniot ke 100% verified luxury bungalows, investment plots, commercial plazas aur installment schemes.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Registry & Intiqal 100% Checked</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Area & Construction Cost Calculator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Direct Owner / Agent WhatsApp Verification</span>
                  </div>
                </div>
              </div>

              <Link
                href="/real-estate"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Explore Real Estate Website</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 2. Furniture Portal */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-7 border border-amber-500/30 hover:border-amber-500 transition-all hover:shadow-2xl hover:shadow-amber-950/50 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Sofa className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                    Dedicated Showroom
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  Chiniot Royal Furniture
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Asal Chinioti Sheesham lakri ke bridal bedroom sets, hand-carved sofas, dining tables aur custom wooden orders.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>100% Seasoned Pure Sheesham Wood</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Custom Furniture Order Builder Tool</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Direct Factory Pricing (Zero Middleman)</span>
                  </div>
                </div>
              </div>

              <Link
                href="/furniture"
                className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-600/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Explore Furniture Showroom</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3. Agency Portal */}
            <div className="bg-slate-950 rounded-3xl p-6 sm:p-7 border border-blue-500/30 hover:border-blue-500 transition-all hover:shadow-2xl hover:shadow-blue-950/50 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    Dedicated Agency
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  WATECH AI & Digital Agency
                </h3>
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  Pakistani businesses ke liye high-converting Meta Ads, Google Ads, Next.js web platforms aur WhatsApp AI automation.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>3.8x+ Average Verified ROAS</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Live Ad Spend & ROI Calculator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Free 20-Min Growth Strategy Audit</span>
                  </div>
                </div>
              </div>

              <Link
                href="/agency"
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Explore Agency Website</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SMART INTERACTIVE SALES FUNNEL CONCIERGE (5 VISIBLE TILES)
          ========================================= */}
      <SmartSalesFunnel />

      {/* =========================================
          SECTION 01: SERVICES TOP SECTION (HIGH PRIORITY)
          ========================================= */}
      <section className="w-full py-20 px-6 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        {/* Glow Accents */}
        <div className="absolute -top-24 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Rocket className="w-3.5 h-3.5" />
                <span>Primary Journey · WATECH Digital Agency</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Enterprise Business Growth & Tech Solutions
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
                Pakistani businesses ke liye high-ROI Omnichannel Performance Marketing (Meta & Google Ads), Automated WhatsApp CRM Systems, aur Modern Web Platforms.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all group"
              >
                <span>View All 7 Services</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 4 Core Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "Omnichannel Paid Ads",
                desc: "Laser-targeted customer acquisition campaigns across Meta & Google Ads for high-ticket verified buyers.",
                tag: "Meta & Google Ads",
              },
              {
                icon: MessageCircle,
                title: "Automated WhatsApp CRM",
                desc: "Instant zero-second inquiry responses, smart customer qualification aur automated broadcast lead funnels.",
                tag: "0s Lead Latency",
              },
              {
                icon: TrendingUp,
                title: "Custom Web Platforms",
                desc: "Lightning fast Next.js 16 portals with local Pakistani payment systems, WhatsApp checkout & analytics.",
                tag: "Next.js 16 Speed",
              },
              {
                icon: ShieldCheck,
                title: "FMCG & Real Estate Tech",
                desc: "Specialized inventory management, on-ground sales force tracking aur automated dealer commission engines.",
                tag: "Enterprise Systems",
              },
            ].map((srv, idx) => {
              const SrvIcon = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-[#2563EB] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <SrvIcon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      {srv.tag}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-2">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300 group-hover:text-blue-400 font-semibold">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick WhatsApp Growth Audit Banner */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/50 via-slate-900 to-indigo-950/60 border border-blue-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Corporate Consultation
              </span>
              <h4 className="text-lg sm:text-xl font-bold text-white mt-1">
                Apne Karobar Ke Liye Free 15-Minute WhatsApp Growth Audit Hasil Karein
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Hum aapke digital marketing, current sales pipeline aur lead conversion ka audit karke practical scaling blueprint share karenge.
              </p>
            </div>
            <a
              href="https://wa.me/923270831470?text=Assalam%20o%20Alaikum%20WATECH%2C%20Mujhe%20apne%20karobar%20ke%20liye%20Free%2015-Minute%20Growth%20Audit%20chahiye."
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Claim Free Audit</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================
          INTEGRATED CAPABILITIES (FIVE SECTOR STRIPS)
          ========================================= */}
      <section className="w-full border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Integrated Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mt-2">
              Five Sectors We Power Across Pakistan
            </h2>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full flex flex-col"
        >
          {/* ------------------------------------------------
              STRIP 1: REAL ESTATE MARKETPLACE (BLUE #2563EB)
              ------------------------------------------------ */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 border-b border-slate-100 bg-gradient-to-r from-blue-50/40 via-white to-white transition-all hover:bg-blue-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] shadow-sm shrink-0">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                    Sector 01 · Real Estate
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    Real Estate Marketplace
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    Buy, sell, and invest in premium properties across Pakistan. Verified plots, luxury houses, and commercial opportunities in LDA/RDA approved prime societies.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/marketplace?tab=properties"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-semibold text-sm shadow-md hover:shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Explore Properties
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------
              STRIP 2: CHINIOTI WOOD & FURNITURE (GREEN #16A34A)
              ------------------------------------------------ */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 border-b border-slate-100 bg-gradient-to-r from-emerald-50/40 via-white to-white transition-all hover:bg-emerald-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#16A34A]/10 text-[#16A34A] shadow-sm shrink-0">
                  <Sofa className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                    Sector 02 · Craftsmanship (774+ Designs)
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    Chinioti Wood & Handcrafted Furniture
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    Handcrafted luxury for your home — authentic 100% seasoned Sheesham wood, bridal sets, royal sofas, jhoolas and dining suites straight from Chiniot master artisans.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/marketplace?tab=furniture"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#16A34A] text-white font-semibold text-sm shadow-md hover:shadow-emerald-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Browse Furniture
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------
              STRIP 3: WATECH FMCG DIVISION (17+ YEARS AUTHORITY)
              ------------------------------------------------ */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 border-b border-slate-100 bg-gradient-to-r from-amber-50/50 via-orange-50/30 to-white transition-all hover:bg-amber-50/70"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-600 shadow-sm shrink-0">
                  <Package className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                      Sector 03 · FMCG Corporate Hub
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black uppercase font-mono">
                      17+ Yrs On-Ground
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    FMCG Distribution & Sales Consulting
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    17 saala on-ground tajurba — Naye aur established FMCG Brands ke liye Nationwide Distribution Network Setup, Retail Territory Route Mapping, Order Bookers Training aur Strategic Dealership Alliances.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      Brand Distribution Setup
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Route Planning & Sales Force
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                      Dealership Joint Ventures
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/923270831470?text=Assalam%20o%20Alaikum%20WATECH%2C%20Main%20FMCG%20Distribution%20%26%20Sales%20Consulting%20ke%20silsilay%20mein%20baat%20karna%20chahta%20hoon."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md hover:shadow-amber-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>FMCG Consulting Inquiry</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------
              STRIP 4: FOOD & CATERING (ORANGE #EA580C)
              ------------------------------------------------ */}
          <motion.div
            variants={itemVariants}
            className="w-full py-16 bg-gradient-to-r from-orange-50/40 via-white to-white transition-all hover:bg-orange-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] shadow-sm shrink-0">
                  <Utensils className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    Sector 04 · Food & Hospitality
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    Food, Pakwan & Daig Catering
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    Verified Shahi Pakwan Centers, Daig delivery, live BBQ catering, marriage halls aur corporate events management across Pakistan.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/marketplace?tab=food-catering"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EA580C] text-white font-semibold text-sm shadow-md hover:shadow-orange-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Explore Food & Catering
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* =========================================
          PROMINENT FOUNDER & CEO LEADERSHIP SHOWCASE
          ========================================= */}
      <section className="w-full py-24 px-6 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Founder Portrait Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-sm w-full">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#0066FF] via-cyan-400 to-[#16A34A] rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500" />
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-700/80 shadow-2xl">
                  <Image
                    src="/images/founder-waseem-abbas.jpg"
                    alt="Waseem Abbas - Founder & CEO of WATECH Solutions"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-5 text-center">
                    <h4 className="text-xl font-black text-white tracking-tight">Waseem Abbas</h4>
                    <p className="text-xs text-blue-400 font-mono tracking-wider uppercase mt-0.5">
                      Founder & Chief Executive Officer
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message & Authority Credentials */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Executive Leadership · Founder's Note</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  "Personal Accountability on Every Deal & Partnership."
                </h2>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Welcome to <strong>WATECH Solutions</strong>. In an era where online business is often faceless and transactional, we built WATECH to bring personal trust and tangible results back to Pakistan's biggest sectors.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Whether you are investing in a verified residential plot in DHA Lahore, commissioning hand-carved pure Sheesham furniture from our master artisans in Chiniot, or hiring our digital marketing agency to generate scalable business leads — you deal with an organization built on authenticity, precision, and verified results.
              </p>

              {/* 3 Executive Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-black text-white">100%</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Verified Deals & Contracts</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-2xl font-black text-[#0066FF]">17+ Yrs</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">On-Ground Heritage</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 col-span-2 sm:col-span-1">
                  <div className="text-2xl font-black text-emerald-400">&lt; 30s</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Direct WhatsApp Response</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="https://wa.me/923270831470"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#0066FF] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all shadow-xl shadow-blue-600/30 hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Direct WhatsApp with Founder</span>
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-slate-900 text-slate-200 hover:text-white hover:bg-slate-800 text-xs font-bold uppercase tracking-wider transition-all border border-slate-700 hover:scale-105"
                >
                  <span>Read Full Vision & Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SOCIAL MEDIA BANNER
          ========================================= */}
      <section className="w-full py-12 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <SocialIcons variant="banner" />
        </div>
      </section>

      {/* =========================================
          HIGH CONVERTING FAQS SECTION
          ========================================= */}
      <HomeFaqs />
    </div>
  );
}
