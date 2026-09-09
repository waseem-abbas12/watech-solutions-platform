"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
} from "lucide-react";
import { INITIAL_NOTIFICATIONS, NotificationItem } from "@/lib/firebase/admin-service";
import { BrandMark } from "@/components/common/brand-logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [adminUser, setAdminUser] = useState<{ email: string; role: string; name: string } | null>(null);

  // Modals & Dropdowns
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Load stored admin session
      const stored = localStorage.getItem("watech_admin_session");
      if (stored) {
        try {
          setAdminUser(JSON.parse(stored));
        } catch {
          // fallback
        }
      } else {
        const defaultAdmin = {
          email: "admin@watechsolutions.com",
          role: "superAdmin",
          name: "Super Administrator",
        };
        setAdminUser(defaultAdmin);
        localStorage.setItem("watech_admin_session", JSON.stringify(defaultAdmin));
      }

      // Check stored sidebar collapsed state
      const storedSidebar = localStorage.getItem("watech_admin_sidebar_collapsed");
      if (storedSidebar === "true") {
        setIsSidebarCollapsed(true);
      }

      // Check stored theme
      const storedTheme = localStorage.getItem("watech_admin_theme");
      if (storedTheme === "light") {
        setIsDarkMode(false);
      }
    }

    // Keyboard Shortcuts: Ctrl+K / Cmd+K for Global Search, Escape to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsSearchModalOpen(false);
        setIsNotificationDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("watech_admin_sidebar_collapsed", String(next));
      }
      return next;
    });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("watech_admin_theme", next ? "dark" : "light");
      }
      return next;
    });
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("watech_admin_session");
    }
    setAdminUser(null);
    router.push("/admin");
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/properties", label: "Properties", icon: Building2 },
    { href: "/admin/furniture", label: "Furniture", icon: Armchair },
    { href: "/admin/events", label: "Events", icon: Cake },
    { href: "/admin/clients", label: "Clients", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { href: "/admin/partners", label: "Partners", icon: Handshake },
    { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare, badge: "3" },
    { href: "/admin/notifications", label: "Alerts", icon: Bell, badge: unreadCount > 0 ? String(unreadCount) : undefined },
    { href: "/admin/reports", label: "Reports", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const searchableItems = [
    { title: "1 Kanal Luxury Modern Villa (DHA Phase 6)", category: "Properties", href: "/admin/properties" },
    { title: "10 Marla Brand New Designer House", category: "Properties", href: "/admin/properties" },
    { title: "Maharaja Royal Chinioti Bed Set", category: "Furniture", href: "/admin/furniture" },
    { title: "Hand-Carved Floral 7-Seater Sofa Set", category: "Furniture", href: "/admin/furniture" },
    { title: "Barat Reception & Grand Banquet", category: "Events", href: "/admin/events" },
    { title: "Grand Crystal Ballroom, Royal Palm", category: "Events", href: "/admin/events" },
    { title: "Tariq Mehmood (Buyer)", category: "Clients", href: "/admin/clients" },
    { title: "Dr. Ayesha Siddiqui (Buyer)", category: "Clients", href: "/admin/clients" },
    { title: "Order #WAT-2026-0089 (PKR 8.5 Cr)", category: "Orders", href: "/admin/orders" },
    { title: "Partner: Al-Madina Estate & Builders", category: "Partners", href: "/admin/partners" },
    { title: "Partner: Chiniot Royal Woodcraft", category: "Partners", href: "/admin/partners" },
    { title: "Kamran Akram (DHA Villa Inquiry)", category: "Inquiries", href: "/admin/inquiries" },
  ];

  const searchResults = searchableItems.filter(
    (item) =>
      !globalSearchQuery ||
      item.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(globalSearchQuery.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-200 ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Global Search Modal (Ctrl+K) */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className={`border rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4 ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-500 font-mono">
                Command Palette / Global Search
              </span>
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Type to search properties, furniture, events, clients, orders..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                  isDarkMode
                    ? "bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
                    : "bg-slate-100 border border-slate-300 text-slate-900 placeholder-slate-400"
                }`}
              />
            </div>

            <div className="text-[11px] text-slate-500 flex items-center justify-between px-2">
              <span>Quick jumps: Properties, Orders, Inquiries, Clients</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300">ESC</kbd>
            </div>

            <div className="space-y-1 max-h-72 overflow-y-auto pt-2 divide-y divide-slate-800/40">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <Link
                    key={result.title}
                    href={result.href}
                    onClick={() => setIsSearchModalOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors ${
                      isDarkMode
                        ? "hover:bg-slate-800 text-slate-200"
                        : "hover:bg-slate-100 text-slate-800"
                    }`}
                  >
                    <span>{result.title}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-600/15 text-blue-500 font-mono">
                      {result.category}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">
                  No matching records found for &quot;{globalSearchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`shrink-0 flex flex-col justify-between z-30 transition-all duration-300 border-r ${
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        } ${isMobileNavOpen ? "fixed inset-0 w-full" : "hidden md:flex"} ${
          isSidebarCollapsed ? "md:w-20" : "md:w-64"
        }`}
      >
        <div>
          {/* Admin Header */}
          <div
            className={`p-4 border-b flex items-center justify-between ${
              isDarkMode ? "border-slate-800" : "border-slate-200"
            }`}
          >
            <Link
              href="/admin"
              className="flex items-center gap-3 overflow-hidden"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <BrandMark className="w-10 h-10" />
              {!isSidebarCollapsed && (
                <div className="overflow-hidden">
                  <h3 className={`font-black text-sm tracking-tight truncate ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    Watech BMS
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-500 font-bold">
                      {adminUser?.role || "superAdmin"}
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Collapse toggle (desktop only) */}
            <button
              onClick={toggleSidebar}
              className={`hidden md:flex p-1.5 rounded-xl border text-slate-400 hover:text-white transition-colors ${
                isDarkMode ? "bg-slate-950 border-slate-800 hover:bg-slate-800" : "bg-slate-100 border-slate-300 hover:bg-slate-200 text-slate-700"
              }`}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileNavOpen(false)}
              className="md:hidden p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Search Button in Sidebar */}
          {!isSidebarCollapsed && (
            <div className="p-3">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-colors border ${
                  isDarkMode
                    ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search...</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300">
                  Ctrl+K
                </kbd>
              </button>
            </div>
          )}

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
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
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    isSidebarCollapsed ? "justify-center px-0 py-3" : "justify-between px-3.5 py-2.5"
                  } rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30"
                      : isDarkMode
                      ? "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isSidebarCollapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? "bg-white/25 text-white"
                          : isDarkMode
                          ? "bg-slate-800 text-blue-400"
                          : "bg-blue-50 text-blue-600"
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
        <div
          className={`p-3 border-t space-y-1.5 ${
            isDarkMode ? "border-slate-800" : "border-slate-200"
          }`}
        >
          <Link
            href="/marketplace"
            target="_blank"
            className={`w-full flex items-center ${
              isSidebarCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3.5 py-2"
            } rounded-xl text-xs font-semibold transition-colors ${
              isDarkMode
                ? "text-slate-400 hover:bg-slate-800 hover:text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
            title="Open Live Website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {!isSidebarCollapsed && <span>Live Website</span>}
          </Link>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${
              isSidebarCollapsed ? "justify-center p-2.5" : "gap-2.5 px-3.5 py-2"
            } rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer`}
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar Header */}
        <header
          className={`sticky top-0 z-20 border-b px-6 py-3.5 flex items-center justify-between backdrop-blur-md ${
            isDarkMode
              ? "bg-slate-950/85 border-slate-800"
              : "bg-white/85 border-slate-200"
          }`}
        >
          {/* Left: Mobile trigger & breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="md:hidden p-2 rounded-xl border border-slate-700 text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">BMS</span>
              <span className="text-slate-600">/</span>
              <span className="font-bold text-blue-500 capitalize">
                {pathname === "/admin" ? "Dashboard" : pathname.replace("/admin/", "")}
              </span>
            </div>
          </div>

          {/* Right: Actions (Search, Theme, Notifications, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-colors ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
              }`}
              title="Search (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline px-1 py-0.2 rounded bg-slate-800 text-[10px] text-slate-300 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors ${
                isDarkMode
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800"
                  : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Bell with Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
                  setIsProfileDropdownOpen(false);
                }}
                className={`relative p-2 rounded-xl border transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {isNotificationDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl p-4 space-y-3 z-50 ${
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between border-b pb-2 border-slate-800/50">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">Notifications</span>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-600/20 text-blue-400 font-bold">
                        {unreadCount} new
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-blue-400 hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto divide-y divide-slate-800/30">
                    {notifications.slice(0, 4).map((notif) => (
                      <div key={notif.id} className="pt-2 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-200 truncate pr-2">
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-slate-500 shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-2">{notif.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-800/50 text-center">
                    <Link
                      href="/admin/notifications"
                      onClick={() => setIsNotificationDropdownOpen(false)}
                      className="text-xs text-blue-400 hover:underline font-bold"
                    >
                      View All Notifications & Activity →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  setIsNotificationDropdownOpen(false);
                }}
                className={`flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-colors ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200"
                    : "bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800"
                }`}
              >
                <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-blue-500/60 shrink-0">
                  <Image
                    src="/images/founder-waseem-abbas.jpg"
                    alt="Waseem Abbas"
                    width={28}
                    height={28}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold leading-none">
                    {adminUser?.name || "Waseem Abbas"}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono leading-none mt-0.5">
                    {adminUser?.role || "Founder & CEO"}
                  </div>
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 space-y-1 z-50 ${
                    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  }`}
                >
                  <div className="px-3 py-2 border-b border-slate-800/60 flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-blue-500/50 shrink-0">
                      <Image
                        src="/images/founder-waseem-abbas.jpg"
                        alt="Waseem Abbas"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">{adminUser?.name || "Waseem Abbas"}</div>
                      <div className="text-[11px] text-slate-400 truncate">{adminUser?.email || "waseem000094@gmail.com"}</div>
                    </div>
                  </div>
                  <Link
                    href="/admin/settings"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>System Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
