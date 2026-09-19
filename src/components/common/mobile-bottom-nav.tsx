"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, MessageCircle, User } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  // Hide on admin routes so admin panel has its own clean interface
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navTabs = [
    { label: t.nav.home, href: "/", icon: Home },
    { label: t.nav.marketplace, href: "/marketplace", icon: ShoppingBag },
    { label: t.nav.contactUs, href: "/services#contact", icon: MessageCircle },
    { label: t.nav.partners, href: "/partners", icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2 flex items-center justify-around shadow-2xl safe-area-bottom">
      {navTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? "text-[#2563EB] font-bold scale-105"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.75]"}`} />
            <span className="text-[10px] tracking-tight mt-1">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
