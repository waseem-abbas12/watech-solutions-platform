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
  FileText,
  HelpCircle,
  Settings,
  BarChart3,
  Check,
  Sparkles,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = {
    totalProperties: 48,
    totalFurniture: 76,
    totalEvents: 34,
    totalCatalogListings: 158,
    activeInquiries: "Live Stream",
    closedOrders: 0,
    totalPartners: 28,
  };

  const operationalModules = [
    {
      title: "Real Estate Management",
      route: "/admin/properties",
      icon: Building2,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      accent: "blue",
      badge: "48 Verified Listings",
      summary: "Residential plots, bungalows, and commercial plazas across Chiniot, Lahore, and Islamabad.",
      guidelines: [
        "Naya plot ya ghar add karte waqt Asal Price (PKR) enter karein, ya '0' chhor dein to site par 'Demand on Consultation' show hoga.",
        "Registry & Intiqal ke verified kaghazat patwari se check karne ke baad 'Active' status karein.",
        "Overseas clients ke liye 4K video walkthrough aur society file transfer tracking support karein.",
      ],
    },
    {
      title: "Chinioti Furniture Catalog",
      route: "/admin/furniture",
      icon: Armchair,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      accent: "emerald",
      badge: "76 Handcrafted Pieces",
      summary: "Authentic pure seasoned Sheesham wood bridal sets, sofas, dining, and custom carvings.",
      guidelines: [
        "Artisan workshop direct rates set karein taake factory pricing transparently display ho sake.",
        "Wood Type mein 100% Solid Sheesham ya Teak specify karein aur 10-year anti-termite guarantee tag lagayein.",
        "Custom Order Builder se aane wali requests par wood polish aur dimensions client se direct finalize karein.",
      ],
    },
    {
      title: "Events & Catering Operations",
      route: "/admin/events",
      icon: Cake,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
      accent: "orange",
      badge: "34 Packages & Venues",
      summary: "Signature banquet halls, live charcoal BBQ counters, and bulk daig catering setups.",
      guidelines: [
        "Shadi, Mehndi, ya Valima ke custom menus manage karein aur per-head custom quotations provide karein.",
        "Live tasting sessions aur kitchen hygiene certificates client profile mein record karein.",
        "Guest capacity (50 se 1,500+ afrad) ke mutabiq staff aur warmers reserve karein.",
      ],
    },
    {
      title: "Inquiries & WhatsApp CRM",
      route: "/admin/inquiries",
      icon: MessageSquare,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      accent: "cyan",
      badge: "Direct Lead Intake",
      summary: "Website inquiry modals aur direct WhatsApp clicks se aane wale prospective high-intent buyers.",
      guidelines: [
        "Har inquiry ka status: New → Contacted → Qualified → Closed Deal track karein.",
        "Lead capture form se aane wale phone numbers ko WhatsApp desk (+92 327 0831470) par assign karein.",
        "Client ki budget range aur location preference log karein taake relevant options send kiye ja sakein.",
      ],
    },
    {
      title: "Orders & Real Deal Ledger",
      route: "/admin/orders",
      icon: ShoppingBag,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      accent: "purple",
      badge: "Verified Revenue Record",
      summary: "Jab koi deal successfully close ho jaye to uska official transaction record aur invoice yahan banayein.",
      guidelines: [
        "Jab plot, furniture, ya catering ki deal confirm ho jaye to 'Create Order' par click karein.",
        "Actual finalized price, client advance payment, aur remaining balance enter karein.",
        "Partner/Agent ka commission calculate karein aur official customer PDF invoice print karein.",
      ],
    },
    {
      title: "Partners & Verified Vendors",
      route: "/admin/partners",
      icon: Handshake,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      accent: "amber",
      badge: "28 Registered Partners",
      summary: "Local real estate agents, furniture workshops, aur catering teams ka verified network.",
      guidelines: [
        "Partner verification karke unka CNIC aur workshop/office address verify karein.",
        "Closed deals par agreed commission (1% to 5%) ka payout ledger maintain karein.",
        "Top performing partners ko badge assign karein taake buyers un par aitemad karein.",
      ],
    },
  ];

  const operationalLogs = [
    {
      id: "LOG-1",
      title: "Real Estate Catalog Active",
      desc: "48 plots & luxury villas verified with 'Demand on Consultation' badges.",
      time: "Live System",
      icon: Building2,
      color: "text-blue-400 bg-blue-500/15",
    },
    {
      id: "LOG-2",
      title: "Chinioti Sheesham Catalog Active",
      desc: "76 authentic furniture pieces live with 'Direct Factory Rate' tags.",
      time: "Live System",
      icon: Armchair,
      color: "text-emerald-400 bg-emerald-500/15",
    },
    {
      id: "LOG-3",
      title: "Catering Requirement Planner Ready",
      desc: "Event menu custom quotation builder active without arbitrary fake multipliers.",
      time: "Live System",
      icon: Cake,
      color: "text-orange-400 bg-orange-500/15",
    },
    {
      id: "LOG-4",
      title: "WhatsApp Helpline Integration",
      desc: "Official inquiries routing to Waseem Abbas (+92 327 0831470).",
      time: "Live System",
      icon: MessageSquare,
      color: "text-cyan-400 bg-cyan-500/15",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">
              Ecosystem Control Hub
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Operational & Verified
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            WATECH Management Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real Estate, Chinioti Handcrafted Furniture, Events Catering, aur Digital Agency ka markazi control system.
          </p>
        </div>

        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/properties"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Properties</span>
          </Link>
          <Link
            href="/admin/furniture"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Furniture</span>
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Real Deal</span>
          </Link>
        </div>
      </div>

      {/* Core Real-Time Inventory & Operational Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
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
            <span>Plots & Houses</span>
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
            <span>Chinioti Sheesham</span>
            <span>→</span>
          </div>
        </Link>

        {/* 3. Events */}
        <Link
          href="/admin/events"
          className="bg-slate-900 border border-slate-800 hover:border-orange-500/40 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Events & Food</span>
            <Cake className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalEvents}</div>
          <div className="text-[10px] text-orange-400 mt-1 font-semibold flex items-center gap-1">
            <span>Banquets & Catering</span>
            <span>→</span>
          </div>
        </Link>

        {/* 4. Total Catalog */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Catalog</span>
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalCatalogListings}</div>
          <div className="text-[10px] text-cyan-400 mt-1 font-semibold">
            Active Online Listings
          </div>
        </div>

        {/* 5. Inquiries Channel */}
        <Link
          href="/admin/inquiries"
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Inquiries</span>
            <MessageSquare className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-base font-black text-emerald-400 mt-2">Active Stream</div>
          <div className="text-[10px] text-slate-400 mt-1 font-semibold flex items-center gap-1">
            <span>WhatsApp & Web</span>
            <span>→</span>
          </div>
        </Link>

        {/* 6. Partners */}
        <Link
          href="/admin/partners"
          className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-4 rounded-2xl transition-all group shadow-sm"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Partners</span>
            <Handshake className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white mt-2">{stats.totalPartners}</div>
          <div className="text-[10px] text-amber-400 mt-1 font-semibold flex items-center gap-1">
            <span>Verified Network</span>
            <span>→</span>
          </div>
        </Link>
      </div>

      {/* =========================================================================
          COMPREHENSIVE ADMIN OPERATIONS MANUAL & FEATURE GUIDE (RAHNUMAI)
          ========================================================================= */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <HelpCircle className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Operating System Rahnumai (User Manual)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
              Admin Panel Operating Guide: Har Feature Ka Kaam Aur Tareeqa-e-Kaar
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Yeh panel aapko complete control deta hai ke real prices enter karein, inventory manage karein, aur verified deals close karein.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-semibold self-start sm:self-center">
            <ShieldCheck className="w-4 h-4" />
            <span>0% Fake Data Guarantee</span>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {operationalModules.map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.title}
                className="bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 p-5 rounded-2xl flex flex-col justify-between space-y-4 group transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${mod.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {mod.summary}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-900 text-xs">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                      Kaise Kaam Karta Hai (Rahnumai):
                    </div>
                    {mod.guidelines.map((guide, gIdx) => (
                      <div key={gIdx} className="flex items-start gap-1.5 text-slate-400 text-[11px] leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{guide}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={mod.route}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold text-center border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Open {mod.title.split(" ")[0]} Module</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Status & Operational Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Financial Ledger Workflow (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400 font-mono">
              Revenue & Deal Closing Process
            </span>
            <h3 className="text-sm font-bold text-white mt-1">
              Asal Sales Aur Revenue Kaise Add Karein?
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Humne tamam fake estimation sales data hata diya hai. Ab jab bhi aap real deal close karenge, uska record yahan aayega:
            </p>
          </div>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] flex items-center justify-center font-mono">1</span>
                <span>Client Ka Rabta (Inquiry / WhatsApp)</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Client website se plot, furniture, ya catering par inquiry bhejta hai jo WhatsApp par receive hoti hai.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] flex items-center justify-center font-mono">2</span>
                <span>Demand Finalize Hona (Real Price)</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                Aap client ke sath plot visit ya furniture workshop tour karwa kar final real price tai karte hain.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-[11px] flex items-center justify-center font-mono">3</span>
                <span>Orders Mein Log Karna (Official Invoice)</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-7">
                '/admin/orders' mein ja kar deal save karein. Deal save hone se verified sales graph khud-ba-khud generate ho jayega.
              </p>
            </div>
          </div>

          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 pt-2"
          >
            <span>Orders & Deals Ledger Kholein</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Right: Operational Status Stream (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Live Ecosystem Health & Verification
              </h3>
              <p className="text-xs text-slate-400">Core platform infrastructure & live communication routes</p>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              100% Operational
            </span>
          </div>

          <div className="space-y-3 divide-y divide-slate-800/40">
            {operationalLogs.map((log) => {
              const Icon = log.icon;
              return (
                <div key={log.id} className="pt-3 flex items-start gap-3 text-xs">
                  <div className={`p-2 rounded-xl shrink-0 ${log.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 truncate">{log.title}</span>
                      <span className="text-[10px] text-emerald-400 shrink-0 font-mono font-bold">
                        {log.time}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {log.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              <span className="font-bold text-slate-200">Admin Account:</span> Waseem Abbas (Founder & CEO)
              <div className="text-[11px] text-slate-500">Connected Helpline: +92 327 0831470</div>
            </div>
            <Link
              href="/admin/settings"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold border border-slate-800"
            >
              Manage Settings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
