import React from "react";

interface BrandLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showBadge?: boolean;
  className?: string;
  isDark?: boolean;
}

const SIZE_MAP = {
  xs: { box: "w-7 h-7", text: "text-lg", sub: "text-[9px]" },
  sm: { box: "w-9 h-9", text: "text-xl", sub: "text-[10px]" },
  md: { box: "w-11 h-11", text: "text-2xl", sub: "text-xs" },
  lg: { box: "w-14 h-14", text: "text-3xl", sub: "text-xs" },
  xl: { box: "w-20 h-20", text: "text-4xl", sub: "text-sm" },
};

export const BrandMark = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0 transition-transform duration-300 group-hover:scale-105`}
    >
      <defs>
        <linearGradient id="wmBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#090D16" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#070B14" />
        </linearGradient>
        <linearGradient id="wmBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#10B981" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F97316" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="wmBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="wmGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="wmOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <filter id="wmGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Badge Shell */}
      <rect
        x="24"
        y="24"
        width="464"
        height="464"
        rx="120"
        ry="120"
        fill="url(#wmBg)"
        stroke="url(#wmBorder)"
        strokeWidth="12"
      />

      {/* Geometric W Monogram */}
      <path d="M 120 160 L 175 160 L 215 320 L 170 320 Z" fill="url(#wmBlue)" />
      <path d="M 170 320 L 215 320 L 256 200 L 222 200 Z" fill="#38BDF8" opacity={0.95} />
      <path d="M 256 200 L 290 200 L 332 320 L 288 320 Z" fill="url(#wmGreen)" />
      <path d="M 288 320 L 332 320 L 392 160 L 338 160 Z" fill="url(#wmOrange)" />

      {/* Innovation Star Dot */}
      <path
        d="M 388 120 Q 388 140 408 140 Q 388 140 388 160 Q 388 140 368 140 Q 388 140 388 120 Z"
        fill="#38BDF8"
        filter="url(#wmGlow)"
      />
    </svg>
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
      <BrandMark className={conf.box} />

      {showText && (
        <div className="flex items-center gap-2">
          <span
            className={`font-black tracking-tight ${conf.text} ${
              isDark ? "text-white" : "text-slate-900"
            } transition-colors`}
          >
            WATECH<span className="text-[#2563EB]">.</span>
          </span>
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
