"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Armchair,
  Cake,
  Users,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = {
    totalProperties: 48,
    totalFurniture: 76,
    totalEvents: 34,
    totalClients: 820,
    totalRevenuePKR: 12450000,
    pendingOrders: 6,
  };

  const monthlyRevenue = [
    { month: "Apr", revenue: 2.1 },
    { month: "May", revenue: 3.4 },
    { month: "Jun", revenue: 4.8 },
    { month: "Jul", revenue: 6.2 },
    { month: "Aug", revenue: 9.5 },
    { month: "Sep", revenue: 12.45 },
  ];

  const categoryDistribution = [
    { name: "Real Estate", count: 48, percent: 30, color: "#2563EB" },
    { name: "Chinioti Furniture", count: 76, percent: 48, color: "#16A34A" },
    { name: "Events & Catering", count: 34, percent: 22, color: "#EA580C" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            Platform Command Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Operations & Performance
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time aggregates across Real Estate, Chinioti Woodcraft, and Signature Events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Firestore Live Sync
          </span>
        </div>
      </div>

      {/* 6 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Link href="/admin/properties" className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Properties</span>
          <div className="text-2xl font-black text-white mt-1">{stats.totalProperties}</div>
          <span className="text-[10px] text-blue-400">Plots & Villas →</span>
        </Link>

        <Link href="/admin/furniture" className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Furniture</span>
          <div className="text-2xl font-black text-white mt-1">{stats.totalFurniture}</div>
          <span className="text-[10px] text-emerald-400">Chinioti Wood →</span>
        </Link>

        <Link href="/admin/events" className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Events</span>
          <div className="text-2xl font-black text-white mt-1">{stats.totalEvents}</div>
          <span className="text-[10px] text-orange-400">Halls & Venues →</span>
        </Link>

        <Link href="/admin/clients" className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Clients</span>
          <div className="text-2xl font-black text-white mt-1">{stats.totalClients}</div>
          <span className="text-[10px] text-slate-400">Active Buyers →</span>
        </Link>

        <Link href="/admin/orders" className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Revenue</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">1.24 Cr</div>
          <span className="text-[10px] text-slate-400">Gross Deals PKR →</span>
        </Link>

        <Link href="/admin/orders" className="bg-slate-900 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pending Orders</span>
          <div className="text-2xl font-black text-orange-400 mt-1">{stats.pendingOrders}</div>
          <span className="text-[10px] text-slate-400">Needs Review →</span>
        </Link>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Line Chart */}
        <div className="lg:col-span-7 bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Monthly Revenue Trend</h3>
              <p className="text-xs text-slate-400">Deal volume in Million PKR (2026)</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <TrendingUp className="w-4 h-4" />
              <span>+38.5% Growth</span>
            </div>
          </div>

          <div className="h-56 w-full flex items-end justify-between pt-8 pb-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>

            {monthlyRevenue.map((pt, idx) => {
              const heightPercent = (pt.revenue / 13) * 100;
              return (
                <div key={pt.month} className="flex flex-col items-center gap-2 flex-1 z-10 group">
                  <div className="text-[10px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    PKR {pt.revenue}M
                  </div>
                  <div className="w-full flex items-end justify-center h-40">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="w-6 md:w-8 rounded-t-xl bg-gradient-to-t from-blue-600/40 to-blue-500 hover:to-blue-400 transition-colors cursor-pointer"
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{pt.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="lg:col-span-5 bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Category Distribution</h3>
            <p className="text-xs text-slate-400">158 Total Active Listings Breakdown</p>
          </div>

          <div className="space-y-4 pt-2">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="font-mono text-slate-400">
                    {cat.count} items ({cat.percent}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percent}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Fastest Growing:</span>
            <span className="font-bold text-[#16A34A]">Chinioti Furniture (+48%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
