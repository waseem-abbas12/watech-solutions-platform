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
  xs: { height: 32, width: 95 },
  sm: { height: 38, width: 115 },
  md: { height: 46, width: 140 },
  lg: { height: 56, width: 170 },
  xl: { height: 72, width: 220 },
};

export const BrandMark = ({
  className = "w-11 h-11",
  isDark = false,
}: {
  className?: string;
  isDark?: boolean;
}) => {
  return (
    <div
      className={`relative ${className} shrink-0 overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
    >
      <Image
        src="/images/watech-logo-transparent.png"
        alt="WATECH Official Logo"
        width={140}
        height={140}
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
    <div className={`flex items-center group select-none ${className}`}>
      {/* Official Authentic WATECH Brand Logo */}
      <div
        className="relative flex items-center transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ height: conf.height, width: conf.width }}
      >
        <Image
          src="/images/watech-logo-transparent.png"
          alt="WATECH Official Logo - AI & Marketing"
          fill
          sizes="(max-width: 768px) 120px, 160px"
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );
};

