"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/common/brand-logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", accent: "hover:text-slate-900" },
    { name: "Marketplace", href: "/marketplace", accent: "hover:text-[#16A34A]" },
    { name: "Digital Services", href: "/services", accent: "hover:text-[#2563EB]" },
    { name: "Blog", href: "/blog", accent: "hover:text-[#2563EB]" },
    { name: "Partners", href: "/partners", accent: "hover:text-[#EA580C]" },
    { name: "About", href: "/about", accent: "hover:text-[#2563EB]" },
  ];

  const checkIsActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.includes("#")) {
      const base = href.split("#")[0];
      return pathname === base;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group" aria-label="WATECH Solutions Home">
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? "text-slate-900 font-bold"
                    : "text-slate-600 " + link.accent
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Area */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/track"
            className="text-xs font-semibold px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            Track Status
          </Link>
          <Link
            href="/services#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold tracking-wide uppercase rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all hover:shadow-md"
          >
            Get in Touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-100 bg-white px-6 py-6 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = checkIsActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium transition-colors py-2 flex items-center justify-between ${
                      isActive
                        ? "text-[#2563EB] font-bold"
                        : "text-slate-800 hover:text-[#2563EB]"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    )}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href="/track"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2.5 px-6 rounded-full border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors"
                >
                  Track Inquiry Status
                </Link>
                <Link
                  href="/services#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 px-6 rounded-full bg-[#2563EB] text-white font-semibold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-md"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
