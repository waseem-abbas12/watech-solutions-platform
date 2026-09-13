'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOOL_CATEGORIES, TOOLS_REGISTRY } from '@/data/toolsRegistry';
import { ToolCategoryId } from '@/types/tools';

export default function ToolsHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategoryId | 'all'>('all');

  // Filter tools by search query and category
  const filteredTools = useMemo(() => {
    return TOOLS_REGISTRY.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = tool.title.toLowerCase().includes(q);
      const matchUrdu = tool.urduTitle.toLowerCase().includes(q);
      const matchDesc = tool.description.toLowerCase().includes(q);
      const matchTags = tool.tags.some((t) => t.toLowerCase().includes(q));
      const matchKeywords = tool.searchKeywords.some((k) => k.toLowerCase().includes(q));

      return matchTitle || matchUrdu || matchDesc || matchTags || matchKeywords;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs font-semibold flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>WATECH 100 Free Pakistan-First Tools Suite</span>
          </div>
          <Link href="/tracker" className="text-amber-400 hover:underline font-bold flex items-center gap-1">
            🔥 Daily Life & Growth Tracker (Free) →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 py-12 md:py-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/80 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
            <span>🇵🇰 100% Free • No Signup Required • Runs Offline in Browser</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-950 tracking-tight">
            Pakistan&apos;s Ultimate Free Business & Utility Tools Hub
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pakistani karobaar, dukaandaron, freelancers, property dealers, aur awam ki rozmarrah zarooriyat ke liye 100 muft tools.
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any tool (e.g. 'Tax', 'COD', 'Marla', 'Invoice', 'Wood', 'Bijli')..."
                className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border-2 border-slate-200 focus:border-blue-600 focus:outline-none text-slate-900 text-sm md:text-base shadow-sm font-medium"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {/* Spotlight Banner: Daily Life & Growth Tracker */}
        <div className="mb-10 bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
              ⭐ Flagship Daily Tool
            </span>
            <h3 className="text-2xl md:text-3xl font-black">
              WATECH Life, Habits & Daily Growth Tracker
            </h3>
            <p className="text-white/90 text-sm max-w-xl">
              Kya aap waqt zaya hone, confusion ya low consistency se tang hain? Subah 3 minute dein, apni daily priorities set karein, aur rozana apna score track karein.
            </p>
          </div>
          <Link
            href="/tracker"
            className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm transition flex-shrink-0 shadow-md active:scale-95"
          >
            Launch Life Tracker Now →
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-slate-950 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>All Tools ({TOOLS_REGISTRY.length})</span>
          </button>

          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Tools Count Bar */}
        <div className="flex items-center justify-between mb-6 text-xs md:text-sm text-slate-500 font-medium">
          <span>Showing {filteredTools.length} tools</span>
          {searchQuery && (
            <span>Filtered by query: &quot;{searchQuery}&quot;</span>
          )}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-2xl transition duration-200">
                    {tool.icon}
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {tool.popular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Popular
                      </span>
                    )}
                    {tool.featured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug">
                  {tool.title}
                </h3>
                <p className="text-xs font-urdu text-blue-700 mt-0.5 font-medium" dir="rtl">
                  {tool.urduTitle}
                </p>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400 group-hover:text-slate-600 capitalize">
                  {tool.category.replace('-', ' ')}
                </span>
                <span className="font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition">
                  Open Tool →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <span className="text-4xl mb-2 block">🔍</span>
            <h4 className="text-lg font-bold text-slate-800">No tools found matching &quot;{searchQuery}&quot;</h4>
            <p className="text-sm text-slate-500 mt-1">Try another keyword like Tax, Invoice, Marla, or Wood.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA for Agency & Custom Software */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-10 text-white text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            WATECH AI & Digital Agency
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold max-w-2xl mx-auto">
            Need a Custom Website, Mobile App, or Profitable Meta Ads?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            We build custom tools, e-commerce stores, and high-converting marketing funnels for leading Pakistani businesses.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=923177651230&text=Assalam-o-Alaikum%20Watech!%20I%20saw%20your%20100%20tools%20hub%20and%20want%20to%20hire%20your%20agency%20for%20my%20business."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm transition shadow-lg"
            >
              Chat on WhatsApp with CEO
            </a>
            <Link
              href="/agency"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition"
            >
              View Agency Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
