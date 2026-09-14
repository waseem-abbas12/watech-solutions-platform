"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Home,
  Building2,
  Sofa,
  Sparkles,
  Globe,
  Zap,
  Calculator,
  Flame,
  Smartphone,
  Search,
  MessageCircle,
  Layers,
  Bot,
  Hammer,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/common/brand-logo";

interface SubMenuItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface DropdownMenu {
  id: string;
  label: string;
  accentColor: string;
  accentBg: string;
  items: SubMenuItem[];
  featured: {
    badge: string;
    title: string;
    description: string;
    href: string;
    ctaText: string;
  };
}

const MEGA_MENUS: DropdownMenu[] = [
  {
    id: "properties",
    label: "Properties",
    accentColor: "text-emerald-600",
    accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    items: [
      {
        title: "Houses & Luxury Villas",
        description: "Modern family homes, 5/10 Marla & 1 Kanal houses",
        href: "/real-estate",
        icon: Home,
      },
      {
        title: "Commercial & Plazas",
        description: "Retail shops, office floors & high-rental commercial spaces",
        href: "/real-estate",
        icon: Building2,
        badge: "High ROI",
      },
      {
        title: "Plots & Residential Land",
        description: "LDA, CDA, RDA approved housing societies & files",
        href: "/real-estate",
        icon: Layers,
      },
      {
        title: "All Real Estate Listings",
        description: "Browse verified properties with instant WhatsApp inquiry",
        href: "/real-estate",
        icon: Search,
      },
    ],
    featured: {
      badge: "Verified Listings",
      title: "Pakistan Property Portal",
      description: "Direct deals with zero fake listings in Lahore, Islamabad, Karachi & Faisalabad.",
      href: "/real-estate",
      ctaText: "Explore Properties",
    },
  },
  {
    id: "furniture",
    label: "Furniture",
    accentColor: "text-amber-700",
    accentBg: "bg-amber-50 text-amber-800 border-amber-200",
    items: [
      {
        title: "Bridal Bedroom Sets",
        description: "Handcrafted king beds, wardrobes & luxury dressing tables",
        href: "/furniture",
        icon: Sofa,
      },
      {
        title: "Royal Sofas & Diwans",
        description: "Carved 7-seater living sets in pure seasoned Sheesham",
        href: "/furniture",
        icon: Sparkles,
        badge: "Chinioti",
      },
      {
        title: "Dining & Center Tables",
        description: "Carved marble-top and solid wood dining room sets",
        href: "/furniture",
        icon: Layers,
      },
      {
        title: "Custom Woodwork Builder",
        description: "Order custom designs, polish colors & wood selection",
        href: "/furniture",
        icon: Hammer,
        badge: "Custom",
      },
    ],
    featured: {
      badge: "Master Craftsmanship",
      title: "100% Solid Sheesham",
      description: "Authentic Chinioti woodcraft with lifetime seasoning & termite guarantee.",
      href: "/furniture",
      ctaText: "Browse Furniture",
    },
  },
  {
    id: "services",
    label: "Services",
    accentColor: "text-blue-600",
    accentBg: "bg-blue-50 text-blue-700 border-blue-200",
    items: [
      {
        title: "Meta & TikTok Ads",
        description: "High ROAS paid campaigns for real estate & brands",
        href: "/services",
        icon: TrendingUp,
        badge: "Performance",
      },
      {
        title: "Web & App Development",
        description: "Next.js platforms, mobile apps & fast eCommerce stores",
        href: "/services",
        icon: Globe,
      },
      {
        title: "WhatsApp CRM Automation",
        description: "Automated n8n workflows, instant chatbots & lead sync",
        href: "/services",
        icon: Bot,
        badge: "n8n AI",
      },
      {
        title: "Digital Agency Portal",
        description: "See our proven client case studies & growth packages",
        href: "/agency",
        icon: Zap,
      },
    ],
    featured: {
      badge: "Growth Engine",
      title: "Scale Your Business",
      description: "Over PKR 10M+ revenue generated for Pakistani businesses with modern tech.",
      href: "/agency",
      ctaText: "Explore Agency",
    },
  },
  {
    id: "tools",
    label: "Tools",
    accentColor: "text-orange-600",
    accentBg: "bg-orange-50 text-orange-700 border-orange-200",
    items: [
      {
        title: "100 Free Pakistan Tools",
        description: "COD, courier return, ROAS, NTN & business calculators",
        href: "/tools",
        icon: Calculator,
        badge: "100 Free",
      },
      {
        title: "AI Life OS & Habit Tracker",
        description: "Daily habit streaks, productivity scoring & 7-day stats",
        href: "/tracker",
        icon: Flame,
        badge: "AI Powered",
      },
      {
        title: "Profit & COD Calculator",
        description: "Calculate net margins, return losses & shipping costs",
        href: "/tools/product-profit-margin-calculator",
        icon: TrendingUp,
      },
      {
        title: "AI Growth Mentor",
        description: "Real-time AI advice for business, focus & habits",
        href: "/tracker",
        icon: Bot,
      },
    ],
    featured: {
      badge: "Free Utilities",
      title: "Empowering Pakistan",
      description: "Comprehensive suite of 100+ growth tools built for local founders & sellers.",
      href: "/tools",
      ctaText: "Launch Tools",
    },
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdowns on route change
  useEffect(() => {
    setActiveDropdown(null);
    setIsOpen(false);
  }, [pathname]);

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (id: string) => {
    setMobileExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0" aria-label="WATECH Solutions Home">
          <BrandLogo size="md" />
        </Link>

        {/* Desktop Navigation with Mega Dropdowns */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 relative"
          onMouseLeave={handleMouseLeave}
        >
          {MEGA_MENUS.map((menu) => {
            const isMenuOpen = activeDropdown === menu.id;
            return (
              <div
                key={menu.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(menu.id)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDropdown(isMenuOpen ? null : menu.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isMenuOpen
                      ? "text-slate-900 bg-slate-100/80 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                  aria-expanded={isMenuOpen}
                >
                  <span>{menu.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180 text-slate-700" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[560px] xl:w-[620px] z-50 pointer-events-auto"
                    >
                      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xl shadow-slate-900/10 grid grid-cols-12 gap-6 overflow-hidden">
                        {/* Submenu Items (8 cols) */}
                        <div className="col-span-7 space-y-1.5">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
                            Explore {menu.label}
                          </div>
                          {menu.items.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-slate-50 transition-all group/item"
                              >
                                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover/item:bg-blue-50 group-hover/item:text-blue-600 transition-colors shrink-0 mt-0.5">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-slate-900 group-hover/item:text-blue-600 transition-colors">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                    {item.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Featured Showcase Card (5 cols) */}
                        <div className="col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-inner">
                          <div className="relative z-10">
                            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white mb-3">
                              {menu.featured.badge}
                            </span>
                            <h4 className="text-base font-bold text-white leading-snug mb-2">
                              {menu.featured.title}
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                              {menu.featured.description}
                            </p>
                          </div>

                          <div className="relative z-10 pt-4">
                            <Link
                              href={menu.featured.href}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors group/cta"
                            >
                              <span>{menu.featured.ctaText}</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                            </Link>
                          </div>

                          {/* Decorative subtle background circle */}
                          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Standalone Clean Links */}
          <Link
            href="/partners"
            className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#EA580C] hover:bg-orange-50/60 transition-colors"
          >
            Partners
          </Link>
          <Link
            href="/blog"
            className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:text-[#2563EB] hover:bg-blue-50/60 transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Desktop CTA Area (Sleek, Organized, Zero Clutter) */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Mobile App Download Pill */}
          <Link
            href="/download"
            title="Download Android APK / PWA"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all hover:scale-105"
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>App</span>
          </Link>

          {/* Track Inquiry Status */}
          <Link
            href="/track"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span>Track</span>
          </Link>

          {/* Primary Action Button */}
          <Link
            href="/services#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold tracking-wide uppercase rounded-full bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-sm hover:shadow-md hover:scale-[1.02]"
          >
            <span>Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 focus:outline-none rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer (Categorized Accordions) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-200 bg-white px-5 py-6 shadow-2xl overflow-hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="space-y-3">
              {/* Accordions for Mega Menus */}
              {MEGA_MENUS.map((menu) => {
                const isExpanded = mobileExpanded === menu.id;
                return (
                  <div key={menu.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleMobileAccordion(menu.id)}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50/80 hover:bg-slate-100 text-left font-bold text-slate-900 text-sm transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <span>{menu.label}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${menu.accentBg}`}>
                          Explore
                        </span>
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform ${
                          isExpanded ? "rotate-180 text-slate-700" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-2 space-y-1 bg-white border-t border-slate-100"
                        >
                          {menu.items.map((sub) => {
                            const IconComp = sub.icon;
                            return (
                              <Link
                                key={sub.title}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 text-xs font-medium transition-colors"
                              >
                                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                                  <IconComp className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-slate-900">{sub.title}</span>
                                    {sub.badge && (
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                                        {sub.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Direct Mobile Links */}
              <div className="pt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/partners"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center p-3 rounded-xl bg-orange-50 text-orange-800 font-bold text-xs border border-orange-200 transition-colors"
                >
                  Partners Portal
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center p-3 rounded-xl bg-blue-50 text-blue-800 font-bold text-xs border border-blue-200 transition-colors"
                >
                  Blog & Guides
                </Link>
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <Link
                  href="/download"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-2xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Download Android App (.APK)</span>
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/track"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Track Status</span>
                  </Link>

                  <Link
                    href="/services#contact"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
                  >
                    <span>Get in Touch</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
