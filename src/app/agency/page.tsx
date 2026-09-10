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
      q: "Kya aap Real Estate aur E-commerce businesses ke liye campaigns run karte hain?",
      a: "Ji haan! WATECH Agency ka core specialization hi high-ticket niches hain jaise Pakistani Real Estate societies/bungalows aur Chinioti handmade furniture e-commerce.",
    },
    {
      q: "Ad spend budget kahan pay hota hai?",
      a: "Ad budget aap direct apne Meta/Google ad account par card se pay karte hain. Transparent reporting ke sath har rupaye ka hisab live dashboard par visible hota hai.",
    },
    {
      q: "WhatsApp AI Bot se leads kaise handle hoti hain?",
      a: "Hum aapke WhatsApp Business par intelligent AI Auto-Reply setup karte hain jo raat ke 2 baje bhi client ke sawalat ka jawab deta hai aur customer requirements le kar direct meeting book karta hai.",
    },
    {
      q: "Campaigns kitne din mein live hoti hain?",
      a: "Strategy call aur creatives approve hone ke baad 48 se 72 ghante ke andar poori high-converting campaign live ho jati hai.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white flex flex-col">
      {/* 1. Dedicated Agency Top Bar */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 text-blue-400 font-semibold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              WATECH AI & Growth Agency
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Omnichannel Meta/Google Ads & WhatsApp AI Systems</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Client Desk: <strong className="text-white font-mono">+92 327 0831470</strong></span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-blue-400 font-medium">B2B Performance & Sales Funnels</span>
          </div>
        </div>
      </div>

      {/* 2. Dedicated Agency Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/agency" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl bg-blue-50 p-1.5 border border-blue-200 group-hover:border-blue-500 transition-colors">
              <Image
                src="/images/watech-mark-transparent.png"
                alt="WATECH AI & Digital Agency"
                width={44}
                height={44}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-mono">WATECH</span>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-blue-100 text-blue-800 border border-blue-300">
                  AI & GROWTH AGENCY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Meta Ads, Funnels & Automation</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600">
            <a href="#services-grid" className="hover:text-blue-600 transition-colors">
              Performance Services
            </a>
            <a href="#roi-calculator" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>Ad ROI Calculator</span>
            </a>
            <a href="#audit-form" className="hover:text-blue-600 transition-colors">
              Free 20-Min Audit
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#roi-calculator"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Ad ROI Calculator</span>
              <span className="sm:hidden">ROI Calc</span>
            </a>

            <a
              href="https://wa.me/923270831470?text=Assalam-o-Alaikum%20WATECH%20Agency,%20I%20want%20to%20scale%20my%20business%20marketing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Book Strategy Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Hero Section (Clean White / Light Theme) */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-4">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>Performance Marketing & AI Systems for High-Growth Brands</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
              High-Converting Meta Ads, <br />
              <span className="text-blue-600">
                Google Ads & AI Automation
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed">
              We turn ad spend into predictable revenue for Pakistani businesses. 
              Specialized in Real Estate buyer acquisition, Furniture e-commerce ROAS, and 24/7 AI WhatsApp CRM funnels.
            </p>

            {/* Authority Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-10">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-blue-600 font-black text-xl">3.8x+</div>
                <div className="text-slate-600 text-xs font-medium">Average ROAS</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-blue-600 font-black text-xl">&lt; 15 Mins</div>
                <div className="text-slate-600 text-xs font-medium">AI Lead Response</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-blue-600 font-black text-xl">100%</div>
                <div className="text-slate-600 text-xs font-medium">Transparent Spend</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-center">
                <div className="text-blue-600 font-black text-xl">Zero</div>
                <div className="text-slate-600 text-xs font-medium">Vanity Metrics</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#audit-form"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim Free 20-Min Audit</span>
              </a>
              <a
                href="#roi-calculator"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-300 transition-colors flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Calculate Expected Leads</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Agency Services Grid */}
      <section id="services-grid" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Engineered For High-Ticket Sales
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 mb-3">
            Growth Services That Actually Generate Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            No empty likes or fake followers. We build direct-response marketing funnels designed to fill your WhatsApp with qualified clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIGITAL_SERVICES.map((service) => (
            <motion.div
              key={service.slug}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-7 border border-slate-200 hover:border-blue-500 transition-all hover:shadow-xl flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase border border-blue-200">
                    {service.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Rocket className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-blue-700 mb-3 italic">
                  "{service.tagline}"
                </p>
                <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {service.heroDescription}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-2 mb-5 pt-3 border-t border-slate-100">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1 font-medium">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn"
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
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white transition-colors"
                  title="WhatsApp Consultation"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Interactive ROI & Lead Calculator */}
      <section id="roi-calculator" className="py-14 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 p-6 sm:p-10 rounded-3xl border border-blue-200 shadow-sm">
            <div className="max-w-3xl mb-8">
              <span className="inline-flex items-center gap-1.5 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                Live Campaign Estimator
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                Apna Ad Budget Enter Karein Aur Expected Leads Dekhein
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yeh calculator real campaign benchmarks par mabni hai jo humne Pakistani real estate aur e-commerce clients ke liye chalae hain.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Aapka Business Sector:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry("realestate")}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                        selectedIndustry === "realestate"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      🏢 Real Estate
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry("furniture")}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                        selectedIndustry === "furniture"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      🪑 Furniture
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedIndustry("b2b")}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                        selectedIndustry === "b2b"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      💼 B2B / Local
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-700">
                      Mahana Ad Spend Budget:
                    </label>
                    <span className="text-sm font-black text-blue-700 font-mono">
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
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
                    <span>PKR 30,000</span>
                    <span>PKR 5 Lac</span>
                    <span>PKR 10 Lac</span>
                  </div>
                </div>
              </div>

              {/* Output Card */}
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-md">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center justify-between">
                  <span>Projected Campaign Results</span>
                  <span className="text-blue-600 text-[10px] font-bold">Monthly Average</span>
                </h4>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="text-xs text-slate-500 font-medium">Target Impressions</div>
                    <div className="text-xl font-black text-slate-900 font-mono mt-1">
                      ~{estimatedReach.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-blue-600 font-bold mt-0.5">High-intent reach</div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                    <div className="text-xs text-slate-500 font-medium">Qualified Leads</div>
                    <div className="text-xl font-black text-emerald-600 font-mono mt-1">
                      {estimatedLeads} Leads
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Direct on WhatsApp</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 mb-5 leading-relaxed">
                  💡 <strong>WATECH Strategy Note:</strong> Hum sirf lead generate nahi karte, balki instant WhatsApp AI Qualification bot laga kar cold leads ko filter karte hain taake aapka sales team sirf hot buyers se baat kare.
                </div>

                <button
                  onClick={handleCalculatorWhatsApp}
                  className="w-full py-3.5 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
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
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 text-center shadow-md">
          <span className="inline-flex items-center gap-1.5 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Zero Obligation Consultation
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
            Free 20-Minute Growth Audit Request Karein
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Hum aapke current social media accounts, ad strategy aur competitor funnel ka audit karenge aur batayenge ke kahan paisa zaya ho raha hai aur kahan se orders niklenge.
          </p>

          <form onSubmit={handleAuditSubmit} className="max-w-xl mx-auto space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Al-Madina Real Estate, Chiniot Wood Art..."
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Business Niche</label>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Real Estate Agency">Real Estate Agency / Developer</option>
                  <option value="Furniture Showroom">Furniture Showroom / Factory</option>
                  <option value="Food & Catering">Event / Banquet / Catering</option>
                  <option value="E-commerce Store">E-commerce Brand</option>
                  <option value="Local Service">Local Clinic / Professional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  required
                  placeholder="0300 1234567"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmittingAudit}
              className="w-full py-3.5 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 mt-4"
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
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs font-semibold text-emerald-800">
              ✓ Audit request receive ho chuki hai! WhatsApp direct chat open ho rahi hai...
            </div>
          )}
        </div>
      </section>

      {/* 7. Founder Strategy Guarantee */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 shadow-xs">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-blue-500 shrink-0 shadow-md">
            <Image
              src="/images/founder-waseem-abbas.jpg"
              alt="Waseem Abbas - Founder"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Founder's Direct Marketing Guarantee</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900">
              "Marketing ka maqsad views nahi, Bank Balance barhana hai."
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              "Aam agencies aapko reports bhejti hain jin mein lakhoon impressions hoty hain magar phone par ek lead nahi aati. WATECH AI & Growth Agency mein humari poori team sirf ek metric par focus karti hai: aapka Cost Per Acquisition aur Qualified WhatsApp Pipeline."
            </p>
            <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">Waseem Abbas</div>
                <div className="text-xs text-blue-700 font-semibold">Founder & CEO, WATECH Solutions</div>
              </div>
              <span className="text-slate-300">|</span>
              <div className="text-xs text-slate-600">
                Direct Agency Desk: <span className="text-slate-900 font-mono font-bold">+92 327 0831470</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQs (Accordion) */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <h3 className="text-2xl font-black text-slate-900 text-center mb-6">
          Agency FAQs (Aksar Pooche Jane Wale Sawalat)
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-colors shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4.5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 hover:text-blue-700"
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

      {/* 9. Dedicated Agency Footer */}
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
                Omnichannel performance marketing, paid ads, sales funnels aur AI WhatsApp automation for Pakistani brands.
              </p>
              <div className="text-slate-300 font-medium">
                CEO: Waseem Abbas
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Agency Services
              </div>
              <ul className="space-y-2">
                <li><a href="#services-grid" className="hover:text-blue-400">Meta & Instagram Ads</a></li>
                <li><a href="#services-grid" className="hover:text-blue-400">Google Search & Retargeting</a></li>
                <li><a href="#services-grid" className="hover:text-blue-400">Next.js Web Funnels</a></li>
                <li><a href="#services-grid" className="hover:text-blue-400">AI WhatsApp CRM Bots</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Growth Calculators
              </div>
              <ul className="space-y-2">
                <li><a href="#roi-calculator" className="hover:text-blue-400">Real Estate Ads ROI</a></li>
                <li><a href="#roi-calculator" className="hover:text-blue-400">Furniture E-commerce ROAS</a></li>
                <li><a href="#roi-calculator" className="hover:text-blue-400">B2B Lead Cost Estimator</a></li>
                <li><a href="#audit-form" className="hover:text-blue-400">Free 20-Min Growth Audit</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <div className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">
                Agency Headquarters
              </div>
              <p className="text-slate-400 mb-2">
                Punjab, Pakistan · Remote Worldwide Client Strategy
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
              © {new Date().getFullYear()} WATECH AI & Digital Agency. All rights reserved.
            </div>
            <div>
              High-Ticket B2B & E-commerce Revenue Systems.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
