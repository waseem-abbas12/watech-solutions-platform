"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  Clock,
  UserCheck,
  FileText,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

interface TrackedInquiry {
  id: string;
  client: string;
  phone: string;
  category: string;
  itemTitle: string;
  status: "New" | "Contacted" | "Viewed" | "Closed" | "Converted";
  assignedTo: string;
  date: string;
  message?: string;
}

export default function TrackPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<TrackedInquiry[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;

    setLoading(true);
    setSearched(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();

      if (data.success && Array.isArray(data.inquiries)) {
        const queryLower = clean.toLowerCase();
        const matches = data.inquiries.filter((inq: TrackedInquiry) => {
          const matchId = inq.id?.toLowerCase().includes(queryLower);
          const matchPhone = inq.phone?.replace(/[^0-9]/g, "").includes(clean.replace(/[^0-9]/g, ""));
          const matchClient = inq.client?.toLowerCase().includes(queryLower);
          return matchId || matchPhone || matchClient;
        });
        setResults(matches);
      } else {
        setErrorMsg("Unable to retrieve records at this time. Please try again.");
      }
    } catch {
      setErrorMsg("Network error connecting to tracking system. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (status: string, stepIndex: number) => {
    // 0: Logged, 1: Advisor Assigned, 2: Under Review / Discussion, 3: Completed
    const order = ["New", "Contacted", "Viewed", "Converted"];
    const currentIndex = order.indexOf(status);
    const activeIndex = currentIndex === -1 ? (status === "Closed" ? 3 : 0) : currentIndex;

    if (stepIndex < activeIndex) return "completed";
    if (stepIndex === activeIndex) return "current";
    return "upcoming";
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-24 text-slate-900 selection:bg-[#16A34A] selection:text-white">
      {/* Header Banner */}
      <section className="bg-white border-b border-slate-200 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Customer Self-Service</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Track Your Inquiry & Order Status
          </h1>
          <p className="text-slate-600 mt-3 text-sm md:text-base max-w-xl mx-auto">
            Check real-time progress for your property visit scheduling, Chinioti furniture delivery, or event catering booking.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter Lead ID (e.g. INQ-2026-...) or Mobile Number"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-[#16A34A] hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <span>Searching...</span>
              ) : (
                <>
                  <span>Track Status</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-3 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Try searching with sample ID <strong>INQ-2026-001</strong> or your phone number</span>
          </p>
        </div>
      </section>

      {/* Main Results Display */}
      <main className="max-w-4xl mx-auto px-6 pt-10">
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {searched && !loading && results.length === 0 && !errorMsg && (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Inquiries Found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              We couldn&apos;t find an active inquiry matching &ldquo;{query}&rdquo;. Make sure your Lead ID or phone number is typed correctly.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                href="/marketplace"
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Explore Marketplace
              </Link>
              <a
                href="https://wa.me/923270831470?text=Assalam-o-Alaikum,%20I%20need%20assistance%20tracking%20my%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
              >
                Contact Support via WhatsApp
              </a>
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing {results.length} inquiry record{results.length > 1 ? "s" : ""}</span>
              <span className="font-semibold text-[#16A34A]">Live Watech Systems Connected</span>
            </div>

            {results.map((item) => {
              const steps = [
                {
                  title: "Request Logged",
                  desc: "Received & registered in central CRM",
                  icon: FileText,
                },
                {
                  title: "Advisor Assigned",
                  desc: `${item.assignedTo || "Operations Lead"} assigned`,
                  icon: UserCheck,
                },
                {
                  title: "In Review / Coordination",
                  desc: "Discussion or site visit scheduling",
                  icon: Clock,
                },
                {
                  title: "Proposal / Completed",
                  desc: "Booking confirmed or deal concluded",
                  icon: CheckCircle2,
                },
              ];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  {/* Item Header */}
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#16A34A]/10 text-[#16A34A]">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400 font-semibold">{item.id}</span>
                      </div>
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">
                        {item.itemTitle}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Client: <strong className="text-slate-800">{item.client}</strong> &bull; Date: {item.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white uppercase tracking-wider">
                        {item.status}
                      </span>
                      <a
                        href={`https://wa.me/923270831470?text=Assalam-o-Alaikum,%20regarding%20inquiry%20ID:%20${item.id}%20(${item.itemTitle})`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-[#16A34A] hover:bg-emerald-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Direct Help</span>
                      </a>
                    </div>
                  </div>

                  {/* Visual Step Timeline */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {steps.map((step, idx) => {
                        const state = getStepStatus(item.status, idx);
                        const StepIcon = step.icon;

                        return (
                          <div
                            key={idx}
                            className={`p-4 rounded-xl border transition-all ${
                              state === "completed"
                                ? "bg-emerald-50/60 border-emerald-200 text-slate-800"
                                : state === "current"
                                ? "bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 text-slate-900"
                                : "bg-slate-50/50 border-slate-200 text-slate-400"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                                  state === "completed"
                                    ? "bg-[#16A34A] text-white"
                                    : state === "current"
                                    ? "bg-[#2563EB] text-white animate-pulse"
                                    : "bg-slate-200 text-slate-400"
                                }`}
                              >
                                <StepIcon className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider">
                                Step {idx + 1}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold line-clamp-1">{step.title}</h4>
                            <p className="text-[11px] mt-1 text-slate-500 leading-tight">
                              {step.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {item.message && (
                      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">Your Inquiry Note: </span>
                        &ldquo;{item.message}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
