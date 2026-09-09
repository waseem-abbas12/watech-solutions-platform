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
  Handshake,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
  Eye,
  PlusCircle,
  X,
} from "lucide-react";
import { formatPKR } from "@/lib/utils/formatters";

export default function AdminDashboardPage() {
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);

  const stats = {
    totalProperties: 48,
    totalFurniture: 76,
    totalEvents: 34,
    totalClients: 820,
    totalRevenuePKR: 124500000, // PKR 12.45 Cr
    totalOrders: 42,
    totalPartners: 28,
  };

  const monthlyRevenue = [
    { month: "Apr", revenue: 21, deals: 4 },
    { month: "May", revenue: 34, deals: 6 },
    { month: "Jun", revenue: 48, deals: 8 },
    { month: "Jul", revenue: 62, deals: 11 },
    { month: "Aug", revenue: 95, deals: 14 },
    { month: "Sep", revenue: 124.5, deals: 18 },
  ];

  const categoryDistribution = [
    { name: "Real Estate", count: 48, percent: 45, color: "#2563EB" },
    { name: "Chinioti Furniture", count: 76, percent: 35, color: "#16A34A" },
    { name: "Events & Catering", count: 34, percent: 20, color: "#EA580C" },
  ];

  const leadSources = [
    { source: "Direct WhatsApp", leads: 420, percent: 52 },
    { source: "Marketplace Search", leads: 240, percent: 30 },
    { source: "Google & Meta Ads", leads: 110, percent: 13 },
    { source: "Partner Referral", leads: 50, percent: 5 },
  ];

  const recentActivity = [
    {
      id: "ACT-1",
      type: "order",
      title: "New Deal Order #WAT-2026-0089",
      description: "Tariq Mehmood booked 1 Kanal Luxury Villa in DHA Phase 6",
      amount: 85000000,
      time: "12 mins ago",
      icon: ShoppingBag,
      iconColor: "text-emerald-400 bg-emerald-500/15",
    },
    {
      id: "ACT-2",
      type: "inquiry",
      title: "New High-Intent Client Inquiry",
      description: "Dr. Ayesha Siddiqui inquired on Maharaja Royal Chinioti Bed Set",
      time: "45 mins ago",
      icon: MessageSquare,
      iconColor: "text-blue-400 bg-blue-500/15",
    },
    {
      id: "ACT-3",
      type: "partner",
      title: "Partner Verification Approved",
      description: "Al-Madina Estate & Builders received verified agency badge",
      time: "2 hours ago",
      icon: Handshake,
      iconColor: "text-amber-400 bg-amber-500/15",
    },
    {
      id: "ACT-4",
      type: "event",
      title: "Upcoming Event Milestone",
      description: "Barat Reception & Banquet at Royal Palm in 4 days (Sep 14)",
      time: "4 hours ago",
      icon: Cake,
      iconColor: "text-purple-400 bg-purple-500/15",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Action triggers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">
              Ecosystem Command Center
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Synced
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Operations & Global Analytics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Unified management for Real Estate, Chinioti Handcrafted Furniture, and Signature Events.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/properties"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Property</span>
          </Link>
          <Link
            href="/admin/furniture"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Furniture</span>
          </Link>
          <Link
            href="/admin/events"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-lg shadow-orange-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </Link>
        </div>
      </div>

      {/* 7 Core KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5">
        {/* 1. Properties */}
        <Link
          href="/admin/properties"
          className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Properties</span>
            <Building2 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalProperties}</div>
          <div className="text-[10px] text-blue-400 mt-1 font-semibold flex items-center gap-1">
            <span>Plots & Villas</span>
            <span>→</span>
          </div>
        </Link>

        {/* 2. Furniture */}
        <Link
          href="/admin/furniture"
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Furniture</span>
            <Armchair className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalFurniture}</div>
          <div className="text-[10px] text-emerald-400 mt-1 font-semibold flex items-center gap-1">
            <span>Chinioti Wood</span>
            <span>→</span>
          </div>
        </Link>

        {/* 3. Events */}
        <Link
          href="/admin/events"
          className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Events</span>
            <Cake className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalEvents}</div>
          <div className="text-[10px] text-orange-400 mt-1 font-semibold flex items-center gap-1">
            <span>Banquets & Halls</span>
            <span>→</span>
          </div>
        </Link>

        {/* 4. Clients */}
        <Link
          href="/admin/clients"
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Clients</span>
            <Users className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalClients}</div>
          <div className="text-[10px] text-slate-400 mt-1 font-semibold flex items-center gap-1">
            <span>Active Buyers</span>
            <span>→</span>
          </div>
        </Link>

        {/* 5. Revenue */}
        <Link
          href="/admin/orders"
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">12.4 Cr</div>
          <div className="text-[10px] text-slate-400 mt-1 font-semibold flex items-center gap-1">
            <span>Gross PKR deals</span>
            <span>→</span>
          </div>
        </Link>

        {/* 6. Orders */}
        <Link
          href="/admin/orders"
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Orders</span>
            <ShoppingBag className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalOrders}</div>
          <div className="text-[10px] text-amber-400 mt-1 font-semibold flex items-center gap-1">
            <span>Completed Deals</span>
            <span>→</span>
          </div>
        </Link>

        {/* 7. Partners */}
        <Link
          href="/admin/partners"
          className="bg-slate-900 border border-slate-800 hover:border-slate-700 p-4 rounded-2xl transition-all group shadow-sm col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Partners</span>
            <Handshake className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalPartners}</div>
          <div className="text-[10px] text-blue-400 mt-1 font-semibold flex items-center gap-1">
            <span>Verified Vendors</span>
            <span>→</span>
          </div>
        </Link>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Growth Line Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Monthly Revenue Trend
              </h3>
              <p className="text-xs text-slate-400">Gross deal volume in Million PKR (Year 2026)</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+38.5% YoY Growth</span>
            </div>
          </div>

          <div className="h-60 w-full flex items-end justify-between pt-6 pb-2 relative">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
              <div className="border-b border-white w-full" />
            </div>

            {monthlyRevenue.map((pt, idx) => {
              const heightPercent = (pt.revenue / 130) * 100;
              return (
                <div key={pt.month} className="flex flex-col items-center gap-2 flex-1 z-10 group">
                  <div className="text-[10px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    PKR {pt.revenue}M
                  </div>
                  <div className="w-full flex items-end justify-center h-44">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="w-7 sm:w-10 rounded-t-xl bg-gradient-to-t from-blue-700 via-blue-600 to-blue-400 hover:brightness-125 transition-all cursor-pointer shadow-lg shadow-blue-600/20"
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{pt.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Share Distribution (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Category Distribution
            </h3>
            <p className="text-xs text-slate-400">Deal volume & listing split across sectors</p>
          </div>

          <div className="space-y-4">
            {categoryDistribution.map((cat) => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="font-mono text-slate-400">
                    {cat.count} listings ({cat.percent}%)
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
            <span>Leading Sector by Revenue:</span>
            <span className="font-bold text-blue-400">Real Estate (45%)</span>
          </div>
        </div>
      </div>

      {/* Lower Row: Lead Acquisition Sources & Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leads Bar Chart (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Lead Acquisition Channels
              </h3>
              <p className="text-xs text-slate-400">820 Total Clients conversion channel</p>
            </div>
          </div>

          <div className="space-y-3.5 pt-2">
            {leadSources.map((item) => (
              <div key={item.source} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-300">{item.source}</span>
                  <span className="font-mono text-emerald-400 font-bold">{item.leads} leads ({item.percent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Real-Time Activity Stream
              </h3>
              <p className="text-xs text-slate-400">Latest transactions, inquiries, and partner milestones</p>
            </div>
            <Link
              href="/admin/notifications"
              className="text-xs font-bold text-blue-400 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3 divide-y divide-slate-800/40">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="pt-3 flex items-start gap-3 text-xs">
                  <div className={`p-2 rounded-xl shrink-0 ${activity.iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 truncate">{activity.title}</span>
                      <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5 truncate">
                      {activity.description}
                    </p>
                  </div>
                  {activity.amount && (
                    <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                      {formatPKR(activity.amount)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
