"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Armchair,
  Cake,
  Users,
  ShoppingBag,
  Handshake,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Search,
  Command,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string } | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("watech_admin_session");
      if (stored) {
        try {
          setAdminUser(JSON.parse(stored));
        } catch {
          // fallback
        }
      } else {
        const defaultAdmin = { email: "admin@watechsolutions.com", role: "superAdmin" };
        setAdminUser(defaultAdmin);
        localStorage.setItem("watech_admin_session", JSON.stringify(defaultAdmin));
      }
    }

    // Keyboard Shortcuts: Ctrl+K for Global Search
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/properties", label: "Properties", icon: Building2 },
    { href: "/admin/furniture", label: "Furniture", icon: Armchair },
    { href: "/admin/events", label: "Events", icon: Cake },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/partners", label: "Partners", icon: Handshake },
    { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, badge: "3" },
    { href: "/admin/notifications", label: "Alerts", icon: Bell, badge: "4" },
    { href: "/admin/reports", label: "Reports", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("watech_admin_session");
    }
    router.push("/admin");
    setAdminUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row selection:bg-blue-600 selection:text-white">
      {/* Global Search Modal (Ctrl+K) */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Global search listings, clients, orders, or partner agencies..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between px-2">
              <span>Quick Navigation: Properties, Orders, Partners, Inquiries</span>
              <span>Press ESC to close</span>
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {[
                { title: "1 Kanal Luxury Modern Villa (DHA Phase 6)", href: "/admin/properties" },
                { title: "Maharaja Royal Chinioti Bed Set", href: "/admin/furniture" },
                { title: "Grand Crystal Ballroom, Royal Palm", href: "/admin/events" },
                { title: "Order #WAT-2026-0089 (Tariq Mehmood)", href: "/admin/orders" },
                { title: "Partner: Al-Madina Estate & Builders", href: "/admin/partners" },
              ]
                .filter((i) => !globalSearchQuery || i.title.toLowerCase().includes(globalSearchQuery.toLowerCase()))
                .map((result) => (
                  <Link
                    key={result.title}
                    href={result.href}
                    onClick={() => setIsSearchModalOpen(false)}
                    className="block p-3 rounded-xl hover:bg-slate-800 text-xs font-semibold text-slate-200"
                  >
                    {result.title}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Topbar */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-20 z-30">
        <div className="flex items-center gap-2">
          <span className="font-black text-sm text-white">WATECH ADMIN</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
            {adminUser?.role || "superAdmin"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="p-2 text-slate-400 hover:text-white"
            title="Search (Ctrl+K)"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-2 text-slate-400 hover:text-white"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`w-full md:w-64 bg-slate-900 border-r border-slate-800 shrink-0 flex flex-col justify-between z-20 ${
          isMobileNavOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-slate-800 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                WA
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-xs text-white truncate">Watech Solutions</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400">
                    {adminUser?.role || "superAdmin"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Search Trigger button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="mt-4 w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-400">
                Ctrl+K
              </kbd>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-800 text-blue-400"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/marketplace"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>Open Marketplace</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Viewport Content */}
      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
