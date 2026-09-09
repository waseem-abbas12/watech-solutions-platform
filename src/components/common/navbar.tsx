"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Services", href: "/services", accent: "hover:text-[#2563EB]" },
    { name: "Marketplace", href: "/marketplace", accent: "hover:text-[#16A34A]" },
    { name: "Partners", href: "/partners", accent: "hover:text-[#EA580C]" },
    { name: "Blog", href: "/blog", accent: "hover:text-[#2563EB]" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:opacity-90 transition-opacity">
            WATECH<span className="text-[#2563EB]">.</span>
          </span>
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-widest text-slate-400 border-l border-slate-200 pl-2">
            Ecosystem
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-slate-900 font-semibold"
                    : "text-slate-600 " + link.accent
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
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
          className="md:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
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
            className="md:hidden border-b border-slate-100 bg-white px-6 py-6 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-800 hover:text-[#2563EB] transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100">
                <Link
                  href="/services#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-3 px-6 rounded-full bg-[#2563EB] text-white font-medium text-sm hover:bg-blue-700 transition-colors"
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
