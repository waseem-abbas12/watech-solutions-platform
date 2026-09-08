"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<"this-month" | "last-month" | "quarter">("this-month");

  // Leaderboard data
  const topPartners = [
    { rank: 1, name: "Malik Muhammad Asif", agency: "Al-Madina Estate & Builders", salesPKR: 85000000, deals: 2 },
    { rank: 2, name: "Farhan Qureshi", agency: "Royal Palm Hospitality", salesPKR: 1800000, deals: 1 },
    { rank: 3, name: "Ustad Ghulam Rasool", agency: "Chiniot Royal Woodcraft", salesPKR: 630000, deals: 2 },
  ];

  const topListings = [
    { title: "1 Kanal Luxury Modern Villa (DHA Phase 6)", category: "Property", views: 1420, inquiries: 18 },
    { title: "10 Marla Brand New Designer House", category: "Property", views: 890, inquiries: 9 },
    { title: "Maharaja Royal Chinioti Bed Set", category: "Furniture", views: 640, inquiries: 12 },
    { title: "Grand Crystal Ballroom, Royal Palm", category: "Event", views: 510, inquiries: 8 },
  ];

  const handlePrintOrPDF = () => {
    window.print();
  };

  const formatPKR = (num: number): string => {
    if (num >= 10000000) {
      const cr = num / 10000000;
      return `PKR ${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      const lac = num / 100000;
      return `PKR ${lac % 1 === 0 ? lac : lac.toFixed(2)} Lac`;
    }
    return `PKR ${num.toLocaleString()}`;
  };

  return (
    <div className="space-y-8 print:text-black print:bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            Analytics & Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5 print:text-black">
            Executive Revenue Reports
          </h1>
          <p className="text-xs text-slate-400 print:text-gray-600">
            Performance audits, partner revenue leaderboards, and category breakdown.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Filter */}
          <div className="flex rounded-full bg-slate-900 p-1 border border-slate-800">
            <button
              onClick={() => setDateRange("this-month")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                dateRange === "this-month" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setDateRange("last-month")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                dateRange === "last-month" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Last Month
            </button>
            <button
              onClick={() => setDateRange("quarter")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                dateRange === "quarter" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Q3 2026
            </button>
          </div>

          <button
            onClick={handlePrintOrPDF}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF Export</span>
          </button>
        </div>
      </div>

      {/* Revenue & Category Breakdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Line & Bar Chart Combo */}
        <div className="lg:col-span-7 bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Gross Deal Volume Breakdown
              </h3>
              <p className="text-xs text-slate-400">Monthly conversion rate vs projected</p>
            </div>
            <span className="text-xs font-bold text-emerald-400">+42.1% YoY</span>
          </div>

          <div className="h-56 w-full flex items-end justify-between gap-4 pt-8 pb-4">
            {[
              { label: "Real Estate", val: 85, color: "#2563EB" },
              { label: "Chinioti Wood", val: 24, color: "#16A34A" },
              { label: "Signature Events", val: 18, color: "#EA580C" },
            ].map((item) => (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-bold text-white font-mono">{item.val}%</span>
                <div className="w-full bg-slate-800 h-36 rounded-2xl overflow-hidden flex items-end">
                  <div
                    className="w-full rounded-2xl transition-all duration-700"
                    style={{ height: `${item.val}%`, backgroundColor: item.color }}
                  />
                </div>
                <span className="text-[11px] font-semibold text-slate-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart Representation */}
        <div className="lg:col-span-5 bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Category Revenue Share
            </h3>
            <p className="text-xs text-slate-400">Total volume: PKR 1.24 Crore</p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2563EB]" />
                <span className="text-xs font-bold text-white">Real Estate</span>
              </div>
              <span className="text-xs font-mono font-bold text-blue-400">PKR 85.0M (68%)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#16A34A]" />
                <span className="text-xs font-bold text-white">Chinioti Furniture</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">PKR 21.0M (17%)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#EA580C]" />
                <span className="text-xs font-bold text-white">Events & Hospitality</span>
              </div>
              <span className="text-xs font-mono font-bold text-orange-400">PKR 18.5M (15%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Partners Leaderboard */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Top Performing Partners Leaderboard
            </h3>
          </div>

          <div className="divide-y divide-slate-800">
            {topPartners.map((ptr) => (
              <div key={ptr.rank} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-800 font-mono font-black text-xs text-yellow-400 flex items-center justify-center">
                    #{ptr.rank}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-white">{ptr.agency}</div>
                    <div className="text-[10px] text-slate-400">{ptr.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-emerald-400">{formatPKR(ptr.salesPKR)}</div>
                  <div className="text-[10px] text-slate-500">{ptr.deals} deals closed</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Listings */}
        <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Most Inquired & Viewed Listings
            </h3>
          </div>

          <div className="divide-y divide-slate-800">
            {topListings.map((l, i) => (
              <div key={i} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white max-w-xs truncate">{l.title}</div>
                  <span className="text-[10px] text-slate-400">{l.category}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Eye className="w-3.5 h-3.5 text-slate-400" /> {l.views}
                  </span>
                  <span className="flex items-center gap-1 text-orange-400 font-bold">
                    <MessageCircle className="w-3.5 h-3.5" /> {l.inquiries}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
