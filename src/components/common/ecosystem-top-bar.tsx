"use client";

import Link from "next/link";
import { Building2, Sparkles, Sofa, Rocket, Home } from "lucide-react";

interface EcosystemTopBarProps {
  currentPortal: "main" | "real-estate" | "furniture" | "agency";
}

export function EcosystemTopBar({ currentPortal }: EcosystemTopBarProps) {
  const portals = [
    {
      id: "main",
      label: "Main Hub",
      localUrl: "/",
      icon: Home,
    },
    {
      id: "real-estate",
      label: "Real Estate",
      localUrl: "/real-estate",
      icon: Building2,
    },
    {
      id: "furniture",
      label: "Chiniot Furniture",
      localUrl: "/furniture",
      icon: Sofa,
    },
    {
      id: "agency",
      label: "Digital Agency",
      localUrl: "/agency",
      icon: Rocket,
    },
  ];

  return (
    <div className="w-full bg-slate-950 text-slate-300 border-b border-slate-800/80 text-xs py-2 px-3 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left: Ecosystem Authority Tag */}
        <div className="flex items-center gap-2 text-slate-400 text-[11px] sm:text-xs">
          <span className="inline-flex items-center gap-1 text-blue-400 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-blue-400" />
            WATECH Ecosystem
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            Founded by <span className="text-white font-medium">Waseem Abbas</span>
          </span>
        </div>

        {/* Right: Quick Switcher Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full pb-0.5 scrollbar-none">
          <span className="text-[11px] text-slate-500 hidden lg:inline mr-1 font-medium">
            Switch Portal:
          </span>
          {portals.map((p) => {
            const Icon = p.icon;
            const isActive = currentPortal === p.id;
            return (
              <Link
                key={p.id}
                href={p.localUrl}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold"
                    : "bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
                }`}
              >
                <Icon className={`w-3 h-3 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{p.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
