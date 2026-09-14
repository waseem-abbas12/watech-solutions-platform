'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ToolItem } from '@/types/tools';

interface ToolLayoutProps {
  tool: ToolItem;
  children: React.ReactNode;
}

export default function ToolLayout({ tool, children }: ToolLayoutProps) {
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://www.waseemabbas.online/tools/${tool.slug}`;

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Check out this free tool: "${tool.title}" (${tool.urduTitle})\n100% Free by WATECH Solutions:\n${currentUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Trust Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-400">100% Free & Verified</span>
            <span className="text-slate-400">| Powered by WATECH Solutions</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <Link href="/tracker" className="text-amber-400 hover:underline flex items-center gap-1 font-medium">
              🔥 Daily Life & Growth Tracker
            </Link>
            <Link href="/agency" className="hover:text-white transition">
              Hire Agency
            </Link>
            <Link href="/tools" className="hover:text-white transition">
              All 100 Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-slate-900 transition">Free Tools</Link>
          <span>/</span>
          <span className="capitalize text-slate-700 font-medium">{tool.category.replace('-', ' & ')}</span>
          <span>/</span>
          <span className="text-blue-600 font-semibold truncate max-w-xs">{tool.title}</span>
        </nav>

        {/* Tool Header Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                {tool.icon}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    Free Tool
                  </span>
                  {tool.popular && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                      ⭐ Popular in Pakistan
                    </span>
                  )}
                  {tool.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      ⚡ Verified
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {tool.title}
                </h1>
                <p className="text-base md:text-lg font-urdu text-blue-700 mt-1 font-medium" dir="rtl">
                  {tool.urduTitle}
                </p>
                <p className="text-sm md:text-base text-slate-600 mt-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div className="flex items-center gap-2.5 flex-shrink-0 self-start md:self-auto">
              <button
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs md:text-sm font-semibold shadow-sm transition active:scale-95"
                title="Share this tool on WhatsApp"
              >
                <span>Share WhatsApp</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-medium transition"
              >
                {copied ? '✓ Copied' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Tool Main Area */}
        <div className="mb-12">
          {children}
        </div>

        {/* DYNAMIC CONVERSION FUNNEL ENGINE */}
        {/* FUNNEL 1: REAL ESTATE TOOLS -> PROPERTY SALES */}
        {tool.category === 'real-estate-construction' ? (
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl border border-blue-800/40 mb-12 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                  <span>🏡 Verified Plots & Houses Across Pakistan</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Planning to Buy or Build? Get Verified Deals
                </h3>
                <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
                  Avoid fraud and middleman commissions. Explore 100% legal, registry-verified plots and easy installment schemes in Lahore, Islamabad, and Karachi directly through WATECH Real Estate.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <Link
                  href="/real-estate"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-sm transition shadow-lg hover:shadow-blue-500/25 active:scale-95"
                >
                  Explore Verified Properties
                </Link>
                <a
                  href={`https://api.whatsapp.com/send?phone=923270831470&text=${encodeURIComponent(`Assalam-o-Alaikum WATECH Real Estate! I used the "${tool.title}" calculator on waseemabbas.online and want details on verified plots and houses.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-center text-sm transition active:scale-95"
                >
                  WhatsApp Consultant
                </a>
              </div>
            </div>
          </div>
        ) : tool.category === 'furniture-woodwork' ? (
          /* FUNNEL 2: FURNITURE TOOLS -> CHINIOTI FACTORY SALES */
          <div className="bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 rounded-3xl p-8 text-white shadow-xl border border-amber-800/40 mb-12 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
                  <span>🪵 Direct from Master Chinioti Artisans</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Get 100% Pure Sheesham Wood at Factory Price
                </h3>
                <p className="text-amber-100/80 text-sm md:text-base max-w-xl leading-relaxed">
                  Skip high showroom markups. Order handcrafted bridal bedroom sets, luxury carving sofa sets, and custom dining furniture made in Chiniot with safe doorstep delivery nationwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <Link
                  href="/furniture"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-center text-sm transition shadow-lg hover:shadow-amber-500/25 active:scale-95"
                >
                  View Furniture Catalog
                </Link>
                <a
                  href={`https://api.whatsapp.com/send?phone=923270831470&text=${encodeURIComponent(`Assalam-o-Alaikum WATECH Furniture! I was calculating woodwork specs via "${tool.title}" and want factory prices for bridal furniture.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-center text-sm transition active:scale-95"
                >
                  WhatsApp Factory Desk
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* FUNNEL 3: E-COMMERCE, MARKETING & GENERAL TOOLS -> WATECH AGENCY */
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl border border-slate-800 mb-12 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                  <span>🚀 Need More Customers & High-ROAS Sales?</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Scale Your Business with WATECH Digital Agency
                </h3>
                <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed">
                  Free tools save time, but scalable Meta & TikTok ads, custom web development, and WhatsApp automation explode your profit. Partner directly with Founder & Growth Strategist Waseem Abbas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <Link
                  href="/agency"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-sm transition shadow-lg hover:shadow-blue-500/25 active:scale-95"
                >
                  View Agency Case Studies
                </Link>
                <a
                  href={`https://api.whatsapp.com/send?phone=923177651230&text=${encodeURIComponent(`Assalam-o-Alaikum Watech Agency! I was using the "${tool.title}" tool on waseemabbas.online and want to discuss high-ROAS marketing and custom software for my business.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-center text-sm transition active:scale-95"
                >
                  WhatsApp Waseem Abbas
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Pakistan Context, Guide & FAQs */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Why this tool is essential in Pakistan:
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base">
            In Pakistan, thousands of business owners, dealers, and individuals make avoidable financial and operational mistakes due to lack of transparent calculators. WATECH Solutions provides this tool 100% free with no registration required, running entirely in your browser with complete privacy.
          </p>

          <div className="border-t border-slate-100 pt-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Frequently Asked Questions (FAQs)</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-semibold text-sm text-slate-900 mb-1">Is this tool 100% free to use?</h4>
                <p className="text-xs md:text-sm text-slate-600">
                  Yes, this tool is 100% free of charge with no hidden fees, limits, or signup requirements. It is provided by WATECH Solutions to empower Pakistani businesses.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-semibold text-sm text-slate-900 mb-1">Does my data get uploaded or stored anywhere?</h4>
                <p className="text-xs md:text-sm text-slate-600">
                  No. All calculations, text processing, and document formatting are performed locally inside your device browser. Your inputs remain 100% private and secure.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-semibold text-sm text-slate-900 mb-1">How can I contact WATECH Solutions for business support?</h4>
                <p className="text-xs md:text-sm text-slate-600">
                  You can click the WhatsApp button on this page or visit <Link href="/agency" className="text-blue-600 underline">waseemabbas.online/agency</Link> to connect directly with CEO Waseem Abbas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
