"use client";

import React, { useState } from "react";
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
  Calculator,
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
} from "lucide-react";
import { EcosystemTopBar } from "@/components/common/ecosystem-top-bar";
import { DIGITAL_SERVICES } from "@/lib/services-data";

export default function AgencyPortalPage() {
  // ROI Calculator State
  const [selectedIndustry, setSelectedIndustry] = useState<"realestate" | "furniture" | "b2b">("realestate");
  const [monthlyBudget, setMonthlyBudget] = useState<number>(100000); // 1 Lac PKR

  // Audit Form State
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Real Estate Agency");
  const [clientPhone, setClientPhone] = useState("");
  const [isSubmittingAudit, setIsSubmittingAudit] = useState(false);
  const [auditSuccess, setAuditSuccess] = useState(false);

  // FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Dynamic calculations based on industry & budget
  const costPerLead =
    selectedIndustry === "realestate" ? 650 : selectedIndustry === "furniture" ? 350 : 500;
  const estimatedLeads = Math.floor(monthlyBudget / costPerLead);
  const estimatedReach = Math.floor(monthlyBudget * 35);
  const estimatedDeals = Math.max(1, Math.floor(estimatedLeads * 0.05)); // 5% closing

  function formatPKR(num: number): string {
    if (num >= 10000000) {
      return `PKR ${(num / 10000000).toFixed(2)} Crore`;
    }
    if (num >= 100000) {
      return `PKR ${(num / 100000).toFixed(1)} Lac`;
    }
    return `PKR ${num.toLocaleString()}`;
  }

  const handleCalculatorWhatsApp = () => {
    const text = `Assalam-o-Alaikum WATECH Agency, I calculated my ad strategy for ${selectedIndustry.toUpperCase()}:\n• Monthly Budget: ${formatPKR(monthlyBudget)}\n• Estimated Leads Target: ~${estimatedLeads} Leads\nI want to discuss running this campaign with your team.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingAudit(true);

    const text = `Assalam-o-Alaikum WATECH Agency, I want a Free 20-Min Growth Audit:\n• Business: ${businessName}\n• Category: ${businessType}\n• Contact Phone: ${clientPhone}\nPlease schedule my strategy session.`;
    
    setTimeout(() => {
      setIsSubmittingAudit(false);
      setAuditSuccess(true);
      window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
    }, 600);
  };

  const faqs = [
    {
      q: "Kya aap Real Estate aur Furniture businesses ke liye campaigns run karte hain?",
      a: "Ji haan! WATECH Agency ka core specialization hi high-ticket niches hain jaise Pakistani Real Estate societies/bungalows aur Chinioti handmade furniture e-commerce.",
    },
    {
      q: "Ad spend budget kahan pay hota hai?",
      a: "Ad budget aap direct apne Meta/Google ad account par card se pay karte hain. Transparent reporting ke sath har rupaye ka hisab live dashboard par visible hota hai.",
    },
    {
      q: "WhatsApp AI Bot se leads kaise handle hoti hain?",
      a: "Hum aapke WhatsApp Business par intelligent AI Auto-Reply setup karte hain jo raat ke 2 baje bhi client ke sawalat ka jawab deta hai aur plot/furniture preference le kar direct meeting book karta hai.",
    },
    {
      q: "Campaigns kitne din mein live hoti hain?",
      a: "Strategy call aur creatives approve hone ke baad 48 se 72 ghante ke andar poori high-converting campaign live ho jati hai.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* 1. Universal Ecosystem Top Bar */}
      <EcosystemTopBar currentPortal="agency" />

      {/* 2. Dedicated Agency Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo & Agency Badge */}
          <Link href="/agency" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-slate-800 p-1 border border-blue-500/40 group-hover:border-blue-400 transition-colors">
              <Image
                src="/images/watech-mark-transparent.png"
                alt="WATECH AI & Digital Agency"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-white font-mono">WATECH</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/40">
                  AI & GROWTH AGENCY
                </span>
              </div>
              <p className="text-[11px] text-blue-200/60 hidden sm:block">Meta Ads, Funnels & Automation</p>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#roi-calculator"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-950/60 text-blue-300 hover:bg-blue-900/80 border border-blue-700/50 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Ad ROI Calculator</span>
              <span className="sm:hidden">ROI Calc</span>
            </a>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Agency,%20I%20want%20to%20scale%20my%20business%20marketing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-600/30 transition-all font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Book Strategy Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-blue-950/30 via-slate-950 to-slate-950 border-b border-slate-800/80">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Performance Marketing & AI Systems for High-Growth Brands</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              High-Converting Meta Ads, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                Google Ads & AI Automation
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 mb-8 leading-relaxed">
              We turn ad spend into predictable revenue for Pakistani businesses. 
              Specialized in Real Estate buyer acquisition, Furniture e-commerce ROAS, and 24/7 AI WhatsApp CRM funnels.
            </p>

            {/* Authority Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="bg-slate-900/80 border border-blue-900/30 rounded-xl p-3 text-center">
                <div className="text-blue-400 font-bold text-lg">3.8x+</div>
                <div className="text-slate-400 text-xs">Average ROAS</div>
              </div>
              <div className="bg-slate-900/80 border border-blue-900/30 rounded-xl p-3 text-center">
                <div className="text-blue-400 font-bold text-lg">&lt; 15 Mins</div>
                <div className="text-slate-400 text-xs">AI Lead Response</div>
              </div>
              <div className="bg-slate-900/80 border border-blue-900/30 rounded-xl p-3 text-center">
                <div className="text-blue-400 font-bold text-lg">100%</div>
                <div className="text-slate-400 text-xs">Transparent Ad Spend</div>
              </div>
              <div className="bg-slate-900/80 border border-blue-900/30 rounded-xl p-3 text-center">
                <div className="text-blue-400 font-bold text-lg">Zero</div>
                <div className="text-slate-400 text-xs">Vanity Metrics</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#audit-form"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim Free 20-Min Audit</span>
              </a>
              <a
                href="#roi-calculator"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Calculate Expected Leads</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Agency Services Grid */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Engineered For High-Ticket Sales
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 mb-3">
            Growth Services That Actually Generate Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            No empty likes or vanity followers. We build direct-response marketing funnels designed to fill your WhatsApp with qualified clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIGITAL_SERVICES.map((service) => (
            <motion.div
              key={service.slug}
              whileHover={{ y: -4 }}
              className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-950/30 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase border border-blue-500/20">
                    {service.badge}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Rocket className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-3 italic">
                  "{service.tagline}"
                </p>
                <p className="text-xs text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                  {service.heroDescription}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 group/btn"
                >
                  <span>Full Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={`https://wa.me/923270831470?text=${encodeURIComponent(
                    `Assalam-o-Alaikum WATECH Agency, I want to discuss: "${service.title}". Please share case studies and packages.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                  title="WhatsApp Consultation"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Interactive Ad ROI & Lead Calculator */}
      <section id="roi-calculator" className="py-14 bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-950/50 via-slate-900 to-slate-900 p-6 sm:p-10 rounded-3xl border border-blue-500/30">
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-4 h-4" />
                Live Campaign Estimator
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Apna Ad Budget Enter Karein Aur Expected Leads Dekhein
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Yeh calculator real campaign benchmarks par mabni hai jo humne Pakistani real estate aur e-commerce clients ke liye chalae hain.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Aapka Business Sector:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry("realestate")}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                        selectedIndustry === "realestate"
                          ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      🏢 Real Estate
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry("furniture")}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                        selectedIndustry === "furniture"
                          ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      🪑 Furniture
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry("b2b")}
                      className={`p-3 rounded-xl border text-xs font-medium transition-all ${
                        selectedIndustry === "b2b"
                          ? "bg-blue-600/20 border-blue-500 text-blue-300 font-bold"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      💼 B2B / Local
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-medium text-slate-300">
                      Mahana Ad Spend Budget:
                    </label>
                    <span className="text-sm font-bold text-blue-400 font-mono">
                      {formatPKR(monthlyBudget)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30000}
                    max={1000000}
                    step={10000}
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>PKR 30,000</span>
                    <span>PKR 5 Lac</span>
                    <span>PKR 10 Lac</span>
                  </div>
                </div>
              </div>

              {/* Right Output Card */}
              <div className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
                  <span>Projected Campaign Results</span>
                  <span className="text-blue-400 text-[10px]">Monthly Average</span>
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
                    <div className="text-xs text-slate-400">Target Impressions</div>
                    <div className="text-lg font-bold text-white font-mono mt-1">
                      ~{estimatedReach.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-400 mt-0.5">High-intent reach</div>
                  </div>

                  <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
                    <div className="text-xs text-slate-400">Qualified Leads</div>
                    <div className="text-lg font-bold text-emerald-400 font-mono mt-1">
                      {estimatedLeads} Leads
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Direct on WhatsApp</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-xs text-blue-200/80 mb-5 leading-relaxed">
                  💡 <strong>WATECH Strategy Note:</strong> Hum sirf lead generate nahi karte, balki instant WhatsApp AI Qualification bot laga kar cold leads ko filter karte hain taake aapka sales team sirf hot buyers se baat kare.
                </div>

                <button
                  onClick={handleCalculatorWhatsApp}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Execute This Campaign on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Free Strategy Audit Form */}
      <section id="audit-form" className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-800 text-center">
          <span className="inline-flex items-center gap-1.5 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            Zero Obligation Consultation
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Free 20-Minute Growth Audit Request Karein
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Hum aapke current social media accounts, ad strategy aur competitor funnel ka audit karenge aur batayenge ke kahan paisa zaya ho raha hai aur kahan se orders niklenge.
          </p>

          <form onSubmit={handleAuditSubmit} className="max-w-xl mx-auto space-y-4 text-left">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Business Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Al-Madina Real Estate, Chiniot Wood Art..."
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Business Niche</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Real Estate Agency">Real Estate Agency / Developer</option>
                  <option value="Furniture Showroom">Furniture Showroom / Factory</option>
                  <option value="Food & Catering">Event / Banquet / Catering</option>
                  <option value="E-commerce Store">E-commerce Brand</option>
                  <option value="Local Service">Local Clinic / Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingAudit}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isSubmittingAudit ? (
                <span>Scheduling Session...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Book Free 20-Min Audit Call</span>
                </>
              )}
            </button>
          </form>

          {auditSuccess && (
            <div className="mt-4 p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-xs text-emerald-300">
              ✓ Audit request receive ho chuki hai! WhatsApp direct chat open ho rahi hai...
            </div>
          )}
        </div>
      </section>

      {/* 7. Founder & Leadership Trust */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-blue-500/40 shrink-0 shadow-lg shadow-blue-950/50">
            <Image
              src="/images/founder-waseem-abbas.jpg"
              alt="Waseem Abbas - Founder"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Founder's Direct Marketing Guarantee</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              "Marketing ka maqsad views nahi, Bank Balance barhana hai."
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              "Aam agencies aapko reports bhejti hain jin mein lakhoon impressions hoty hain magar phone par ek lead nahi aati. WATECH AI & Growth Agency mein humari poori team sirf ek metric par focus karti hai: aapka Cost Per Acquisition aur Qualified WhatsApp Pipeline."
            </p>
            <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
              <div>
                <div className="text-sm font-bold text-white">Waseem Abbas</div>
                <div className="text-xs text-blue-400">Founder & CEO, WATECH Solutions</div>
              </div>
              <span className="text-slate-700">|</span>
              <div className="text-xs text-slate-400">
                Direct Agency Desk: <span className="text-white font-mono">+92 327 0831470</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
        <h3 className="text-xl font-bold text-white text-center mb-6">
          Agency FAQs (Aksar Pooche Jane Wale Sawalat)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-semibold text-slate-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-blue-400 transition-transform ${
                    openFaqIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaqIndex === i && (
                <div className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Dedicated Agency Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/watech-mark-transparent.png"
              alt="WATECH"
              width={24}
              height={24}
              className="object-contain"
            />
            <span className="text-white font-bold">WATECH AI & Digital Agency</span>
            <span className="text-slate-600">|</span>
            <span>A Specialized Portal of WATECH Solutions</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Main Ecosystem Hub
            </Link>
            <Link href="/real-estate" className="hover:text-white transition-colors">
              Real Estate Portal
            </Link>
            <Link href="/furniture" className="hover:text-white transition-colors">
              Chinioti Furniture
            </Link>
          </div>
          <div className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} WATECH AI & Marketing. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
