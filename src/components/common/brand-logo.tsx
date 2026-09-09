import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showBadge?: boolean;
  className?: string;
  isDark?: boolean;
}

const SIZE_MAP = {
  xs: { box: "w-7 h-7", text: "text-base", sub: "text-[8px]" },
  sm: { box: "w-9 h-9", text: "text-lg", sub: "text-[9px]" },
  md: { box: "w-11 h-11", text: "text-2xl", sub: "text-[10px]" },
  lg: { box: "w-14 h-14", text: "text-3xl", sub: "text-xs" },
  xl: { box: "w-20 h-20", text: "text-4xl", sub: "text-sm" },
};

export const BrandMark = ({
  className = "w-10 h-10",
  isDark = false,
}: {
  className?: string;
  isDark?: boolean;
}) => {
  return (
    <div
      className={`relative ${className} shrink-0 rounded-2xl overflow-hidden flex items-center justify-center ${
        isDark ? "bg-white p-1" : "bg-transparent"
      } transition-transform duration-300 group-hover:scale-105`}
    >
      <Image
        src="/images/watech-mark-transparent.png"
        alt="WATECH Official Logo"
        width={80}
        height={80}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
};

export const BrandLogo = ({
  size = "md",
  showText = true,
  showBadge = true,
  className = "",
  isDark = false,
}: BrandLogoProps) => {
  const conf = SIZE_MAP[size];

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      <BrandMark className={conf.box} isDark={isDark} />

      {showText && (
        <div className="flex items-center gap-2">
          <div className="flex flex-col text-left">
            <span
              className={`font-black tracking-tight leading-none ${conf.text} transition-colors`}
            >
              <span className="text-[#0066FF]">WA</span>
              <span className={isDark ? "text-white" : "text-slate-900"}>TECH</span>
            </span>
            <span className="text-[8px] font-bold tracking-wider uppercase text-slate-400 mt-0.5">
              AI & Marketing
            </span>
          </div>
          {showBadge && (
            <span
              className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-md font-semibold uppercase tracking-widest ${conf.sub} ${
                isDark
                  ? "bg-slate-800 text-blue-400 border border-slate-700/60"
                  : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}
            >
              Ecosystem
            </span>
          )}
        </div>
      )}
    </div>
  );
};
