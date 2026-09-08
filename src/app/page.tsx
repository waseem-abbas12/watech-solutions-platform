"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Building2, Sofa, Utensils, ArrowRight, Mouse } from "lucide-react";

export default function HomePage() {
  // Typewriter effect for subheading
  const fullText = "Real Estate · Furniture · Events";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
          HERO SECTION (100vh Full Viewport Height)
          ========================================= */}
      <section className="relative h-[calc(100vh-5rem)] flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Subtle Animated Gradient Background using Framer Motion */}
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
          <div className="mb-6 flex items-center justify-center min-h-[1.75rem]">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-gray-500 font-mono">
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-3.5 bg-gray-400 ml-1 translate-y-0.5"
              />
            </span>
          </div>

          {/* Massive Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black text-gray-900 tracking-tight leading-[1.05] max-w-4xl"
          >
            Your Space.
            <br />
            Our Expertise.
          </motion.h1>
        </div>

        {/* Minimal Blinking Scroll Indicator at Bottom */}
        <motion.div
          animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
          }}
        >
          <Mouse className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        </motion.div>
      </section>

      {/* =========================================
          BELOW THE FOLD: THREE WAYS WE SERVE YOU
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
              Three Ways We Serve You
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
            className="w-full py-20 border-b border-slate-100 bg-gradient-to-r from-blue-50/40 via-white to-white transition-all hover:bg-blue-50/60"
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
                    Buy, sell, and invest in premium properties across Pakistan. Verified plots, luxury houses, and commercial opportunities.
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
            className="w-full py-20 border-b border-slate-100 bg-gradient-to-r from-emerald-50/40 via-white to-white transition-all hover:bg-emerald-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#16A34A]/10 text-[#16A34A] shadow-sm shrink-0">
                  <Sofa className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                    Sector 02 · Craftsmanship
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    Chinioti Wood & Furniture
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    Handcrafted luxury for your home — authentic wood, timeless designs, and master carving straight from Chiniot artisans.
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
              STRIP 3: EVENTS & CATERING (ORANGE #EA580C)
              ------------------------------------------------ */}
          <motion.div
            variants={itemVariants}
            className="w-full py-20 bg-gradient-to-r from-orange-50/40 via-white to-white transition-all hover:bg-orange-50/60"
          >
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-[#EA580C]/10 text-[#EA580C] shadow-sm shrink-0">
                  <Utensils className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA580C]">
                    Sector 03 · Celebrations
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mt-1">
                    Events & Catering
                  </h3>
                  <p className="text-base text-gray-600 mt-2 max-w-xl leading-relaxed">
                    Memorable gatherings with top-tier hospitality and venue management. Banquet halls, custom menus, and full coordination.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link
                  href="/marketplace?tab=events"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EA580C] text-white font-semibold text-sm shadow-md hover:shadow-orange-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Plan an Event
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
