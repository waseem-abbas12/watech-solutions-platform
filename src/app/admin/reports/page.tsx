"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  Award,
  Eye,
  MessageCircle,
  FileText,
  Printer,
  Building2,
  Armchair,
  Cake,
  Users,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";
import { formatPKR } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<
    "today" | "yesterday" | "this-week" | "this-month" | "last-month" | "custom"
  >("this-month");

  // Dynamic Metrics based on selected range
  const metricsData = {
    "today": { grossRevenue: 4500000, deals: 2, inquiries: 14, growth: "+12.4%" },
    "yesterday": { grossRevenue: 8900000, deals: 3, inquiries: 22, growth: "+18.2%" },
    "this-week": { grossRevenue: 24500000, deals: 6, inquiries: 78, growth: "+24.5%" },
    "this-month": { grossRevenue: 124500000, deals: 18, inquiries: 240, growth: "+38.5%" },
    "last-month": { grossRevenue: 95000000, deals: 14, inquiries: 195, growth: "+15.0%" },
    "custom": { grossRevenue: 156000000, deals: 22, inquiries: 310, growth: "+42.1%" },
  };

  const currentMetric = metricsData[dateRange];

  const monthlyTrend = [
    { period: "W1", revenue: 18 },
    { period: "W2", revenue: 32 },
    { period: "W3", revenue: 45 },
    { period: "W4", revenue: 29.5 },
  ];

  const categoryShare = [
    { name: "Real Estate", amount: 85000000, percent: 68, color: "#2563EB" },
    { name: "Furniture", amount: 24500000, percent: 20, color: "#16A34A" },
    { name: "Events & Banquets", amount: 15000000, percent: 12, color: "#EA580C" },
  ];

  const leadSources = [
    { channel: "Direct WhatsApp", leads: 135, percent: 56 },
    { channel: "Marketplace Search", leads: 65, percent: 27 },
    { channel: "Google & Meta Ads", leads: 28, percent: 12 },
    { channel: "Referrals & Direct", leads: 12, percent: 5 },
  ];

  const topPartners = [
    { rank: 1, name: "Malik Muhammad Asif", agency: "Al-Madina Estate & Builders", salesPKR: 85000000, deals: 2, leads: 48 },
    { rank: 2, name: "Farhan Qureshi", agency: "Royal Palm Hospitality", salesPKR: 18000000, deals: 4, leads: 32 },
    { rank: 3, name: "Ustad Ghulam Rasool", agency: "Chiniot Royal Woodcraft", salesPKR: 6300000, deals: 12, leads: 26 },
  ];

  const topListings = [
    { title: "1 Kanal Luxury Modern Villa (DHA Phase 6)", category: "Property", views: 1420, inquiries: 18, sales: "1 Deal" },
    { title: "10 Marla Brand New Designer House", category: "Property", views: 890, inquiries: 9, sales: "1 Deal" },
    { title: "Maharaja Royal Chinioti Bed Set", category: "Furniture", views: 640, inquiries: 12, sales: "3 Sold" },
    { title: "Grand Crystal Ballroom, Royal Palm", category: "Event", views: 510, inquiries: 8, sales: "2 Booked" },
  ];

  const handleExportCSV = () => {
    exportToCSV(
      `watech_report_${dateRange}`,
      topPartners.map((p) => ({
        rank: p.rank,
        name: p.name,
        agency: p.agency,
        salesPKR: p.salesPKR,
        deals: p.deals,
        leads: p.leads,
      }))
    );
  };

  return (
    <div className="space-y-8 print:text-black print:bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">
            Intelligence & Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 print:text-black">
            Executive Performance Reports
          </h1>
          <p className="text-xs text-slate-400 mt-1 print:text-slate-600">
            Multi-sector financial breakdowns, partner leaderboards, and acquisition channels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 print:hidden">
          {/* Date Range Selector */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center">
            {(
              [
                { id: "today", label: "Today" },
                { id: "yesterday", label: "Yesterday" },
                { id: "this-week", label: "This Week" },
                { id: "this-month", label: "This Month" },
                { id: "last-month", label: "Last Month" },
                { id: "custom", label: "All Time" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDateRange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  dateRange === tab.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => printOrExportPDF("Watech Executive Report")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export PDF Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards for Selected Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl print:border-slate-300">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Gross Deal Volume
          </span>
          <div className="text-2xl font-black text-emerald-400 mt-1 print:text-black">
            {formatPKR(currentMetric.grossRevenue)}
          </div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>{currentMetric.growth} compared to previous</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl print:border-slate-300">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Closed Deals
          </span>
          <div className="text-2xl font-black text-white mt-1 print:text-black">
            {currentMetric.deals} Transactions
          </div>
          <div className="text-[10px] text-blue-400 mt-1 font-semibold">100% Fulfilled</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl print:border-slate-300">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Customer Inquiries
          </span>
          <div className="text-2xl font-black text-white mt-1 print:text-black">
            {currentMetric.inquiries} Leads
          </div>
          <div className="text-[10px] text-amber-400 mt-1 font-semibold">88% Response Rate</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl print:border-slate-300">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Commissions
          </span>
          <div className="text-2xl font-black text-amber-400 mt-1 print:text-black">
            {formatPKR(currentMetric.grossRevenue * 0.08)}
          </div>
          <div className="text-[10px] text-slate-400 mt-1 font-semibold">Avg 8% cut rate</div>
        </div>
      </div>

      {/* Revenue & Category Breakdown Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Weekly Trend */}
        <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 print:border-slate-300">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider print:text-black">
                Deal Volume Timeline
              </h3>
              <p className="text-xs text-slate-400 print:text-slate-600">Breakdown by period in Million PKR</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 font-mono">
              Peak: PKR 45M (W3)
            </span>
          </div>

          <div className="h-52 w-full flex items-end justify-between pt-6 pb-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>

            {monthlyTrend.map((pt, idx) => {
              const heightPercent = (pt.revenue / 50) * 100;
              return (
                <div key={pt.period} className="flex flex-col items-center gap-2 flex-1 z-10">
                  <div className="text-[10px] font-mono text-blue-400">PKR {pt.revenue}M</div>
                  <div className="w-full flex items-end justify-center h-36">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="w-12 rounded-t-xl bg-gradient-to-t from-blue-700 to-blue-500 hover:to-blue-400 transition-colors"
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{pt.period}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Share Donut / Bar */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5 print:border-slate-300">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider print:text-black">
              Sector Revenue Contribution
            </h3>
            <p className="text-xs text-slate-400 print:text-slate-600">Share of total PKR deal transactions</p>
          </div>

          <div className="space-y-4">
            {categoryShare.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-2 print:text-black">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="font-mono text-slate-300 print:text-black">
                    {formatPKR(cat.amount)} ({cat.percent}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${cat.percent}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex justify-between">
            <span>Highest Margin Sector:</span>
            <span className="font-bold text-emerald-400">Chinioti Furniture (10% platform fee)</span>
          </div>
        </div>
      </div>

      {/* Lead Acquisition Channels */}
      <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 print:border-slate-300">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider print:text-black">
          Lead Acquisition Inbound Channels
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {leadSources.map((ls) => (
            <div key={ls.channel} className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300">{ls.channel}</span>
              <div className="text-xl font-mono font-black text-emerald-400 mt-1">
                {ls.leads} Leads
              </div>
              <div className="text-[10px] text-slate-500 font-mono">{ls.percent}% of total traffic</div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Partners */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 print:border-slate-300">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider print:text-black">
              Top Performing Partner Agencies
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-slate-800/40">
            {topPartners.map((partner) => (
              <div key={partner.rank} className="pt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-black">
                    #{partner.rank}
                  </div>
                  <div>
                    <div className="font-bold text-white print:text-black">{partner.agency}</div>
                    <div className="text-[11px] text-slate-400">Owner: {partner.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400 text-sm">
                    {formatPKR(partner.salesPKR)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {partner.deals} deals • {partner.leads} leads
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Listings / Inventory */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 print:border-slate-300">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider print:text-black">
              Top Listings by Engagement
            </h3>
          </div>

          <div className="space-y-3 divide-y divide-slate-800/40">
            {topListings.map((item, idx) => (
              <div key={idx} className="pt-3 flex items-center justify-between text-xs">
                <div className="max-w-[280px]">
                  <div className="font-bold text-white truncate print:text-black">{item.title}</div>
                  <span className="text-[10px] text-blue-400 font-semibold">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-200">
                    {item.views} views • {item.inquiries} inq
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold">{item.sales}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
