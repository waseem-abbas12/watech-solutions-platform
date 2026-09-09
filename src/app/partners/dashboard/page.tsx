"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  MessageSquare,
  BadgePercent,
  User,
  Menu,
  X,
  Building2,
  Sofa,
  Utensils,
  TrendingUp,
  DollarSign,
  Clock,
  Eye,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  LogOut,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Phone,
  Save,
} from "lucide-react";
import { getLocalCachedLeads, updateLeadStatus } from "@/lib/services/leads";
import { LeadStatus } from "@/types/database";

interface ListingItem {
  id: string;
  title: string;
  category: "Property" | "Furniture" | "Event";
  price: number;
  status: "Active" | "Pending Approval" | "Sold" | "Inactive";
  views: number;
  inquiriesCount: number;
  createdAt: string;
}

interface InquiryRecord {
  id: string;
  itemTitle: string;
  category: string;
  buyerName: string;
  buyerPhone: string;
  message: string;
  status: "New" | "Contacted" | "Negotiating" | "Won" | "Lost" | "Invalid" | "Closed";
  date: string;
}

interface CommissionTransaction {
  id: string;
  date: string;
  itemTitle: string;
  amountPKR: number;
  commissionPKR: number;
  status: "Pending" | "Paid";
}

export default function PartnerDashboard() {
  const router = useRouter();

  // Sidebar navigation state
  const [activeSection, setActiveSection] = useState<
    "overview" | "listings" | "add-listing" | "inquiries" | "commission" | "profile"
  >("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Partner Profile State
  const [profile, setProfile] = useState({
    fullName: "Malik Muhammad Asif",
    email: "partner@almadina.pk",
    phone: "0300 1234567",
    agencyName: "Al-Madina Real Estate & Builders",
    city: "Lahore",
    businessType: "Agent",
    verificationStatus: "pending" as "pending" | "verified",
    password: "",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load session & live leads from localStorage if available
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Check newly registered partner profile
      const newRegProfile = localStorage.getItem("watech_current_partner_profile");
      if (newRegProfile) {
        try {
          const parsed = JSON.parse(newRegProfile);
          setProfile((prev) => ({
            ...prev,
            fullName: parsed.ownerName || prev.fullName,
            email: parsed.email || prev.email,
            phone: parsed.phone || prev.phone,
            agencyName: parsed.businessName || prev.agencyName,
            city: parsed.city || prev.city,
            businessType: parsed.category || prev.businessType,
            verificationStatus: parsed.verificationStatus || "pending",
          }));
        } catch {
          // Fallback
        }
      }

      // 2. Load live platform leads from lead engine
      const liveLeads = getLocalCachedLeads();
      if (liveLeads && liveLeads.length > 0) {
        const mappedInquiries: InquiryRecord[] = liveLeads.map((l) => ({
          id: l.id,
          itemTitle: l.listingTitle || l.requiredService || "Platform Inquiry",
          category:
            l.category === "real_estate"
              ? "Property"
              : l.category === "furniture"
              ? "Furniture"
              : "Event",
          buyerName: l.customerName,
          buyerPhone: l.phone,
          message: l.notes || "Customer requested details through Watech platform.",
          status:
            l.status === "new"
              ? "New"
              : l.status === "contacted"
              ? "Contacted"
              : l.status === "negotiating"
              ? "Negotiating"
              : l.status === "won"
              ? "Won"
              : l.status === "lost"
              ? "Lost"
              : "New",
          date: l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "Today",
        }));

        setInquiries((prev) => {
          const ids = new Set(mappedInquiries.map((m) => m.id));
          return [...mappedInquiries, ...prev.filter((p) => !ids.has(p.id))];
        });
      }
    }
  }, []);

  // Listings State
  const [listings, setListings] = useState<ListingItem[]>([
    {
      id: "LIST-101",
      title: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
      category: "Property",
      price: 85000000,
      status: "Active",
      views: 1420,
      inquiriesCount: 18,
      createdAt: "2026-09-01",
    },
    {
      id: "LIST-102",
      title: "10 Marla Brand New Designer House (Bahria Town)",
      category: "Property",
      price: 42000000,
      status: "Active",
      views: 890,
      inquiriesCount: 9,
      createdAt: "2026-09-03",
    },
    {
      id: "LIST-103",
      title: "Maharaja Royal Chinioti Bed Set",
      category: "Furniture",
      price: 345000,
      status: "Sold",
      views: 640,
      inquiriesCount: 12,
      createdAt: "2026-08-28",
    },
  ]);

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([
    {
      id: "INQ-901",
      itemTitle: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
      category: "Property",
      buyerName: "Kamran Akram",
      buyerPhone: "923214567890",
      message: "Assalam-o-Alaikum, is this plot corner facing and what is the final negotiable demand?",
      status: "New",
      date: "Today, 11:20 AM",
    },
    {
      id: "INQ-902",
      itemTitle: "Maharaja Royal Chinioti Bed Set",
      category: "Furniture",
      buyerName: "Dr. Ayesha Siddiqui",
      buyerPhone: "923009876543",
      message: "Can you deliver this bed set to Islamabad and is customization in walnut finish possible?",
      status: "Contacted",
      date: "Yesterday, 04:15 PM",
    },
    {
      id: "INQ-903",
      itemTitle: "Grand Crystal Ballroom & Lawn",
      category: "Event",
      buyerName: "Hamza Tariq",
      buyerPhone: "923331122334",
      message: "Need 650 guests booking for Barat in late November. Please share per head menu breakdown.",
      status: "Closed",
      date: "2026-09-04",
    },
  ]);

  // Commission Transactions State
  const [transactions] = useState<CommissionTransaction[]>([
    {
      id: "TXN-501",
      date: "2026-09-02",
      itemTitle: "Maharaja Royal Chinioti Bed Set",
      amountPKR: 345000,
      commissionPKR: 34500, // 10%
      status: "Paid",
    },
    {
      id: "TXN-502",
      date: "2026-08-20",
      itemTitle: "10 Marla Plot Sector F Bahria Town",
      amountPKR: 12500000,
      commissionPKR: 125000, // 1% agency rate
      status: "Paid",
    },
    {
      id: "TXN-503",
      date: "2026-09-07",
      itemTitle: "Royal Palm Banquet Hall Booking",
      amountPKR: 1800000,
      commissionPKR: 180000, // 10%
      status: "Pending",
    },
  ]);

  // Add Listing Form State
  const [listingCategory, setListingCategory] = useState<"Property" | "Furniture" | "Event">("Property");
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    description: "",
    price: "",
    city: "Lahore",
    location: "",
    bedrooms: "4",
    bathrooms: "5",
    area: "10 Marla",
    images: "",
  });
  const [furnitureForm, setFurnitureForm] = useState({
    name: "",
    description: "",
    price: "",
    dimensions: "King Size 72x78 in",
    woodType: "Sheesham",
    color: "Antique Gold Polish",
    images: "",
  });
  const [eventForm, setEventForm] = useState({
    title: "",
    venue: "",
    capacity: "500",
    menuType: "Desi",
    packagePrice: "3500",
    eventDate: "2026-11-25",
    images: "",
  });

  const handleAddListingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newTitle = "";
    let newPrice = 0;

    if (listingCategory === "Property") {
      newTitle = propertyForm.title || "Untitled Property";
      newPrice = Number(propertyForm.price) || 5000000;
    } else if (listingCategory === "Furniture") {
      newTitle = furnitureForm.name || "Handcrafted Furniture Item";
      newPrice = Number(furnitureForm.price) || 150000;
    } else {
      newTitle = eventForm.title || "Event Hall / Package";
      newPrice = Number(eventForm.packagePrice) || 3000;
    }

    const newListing: ListingItem = {
      id: `LIST-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      category: listingCategory,
      price: newPrice,
      status: "Pending Approval",
      views: 0,
      inquiriesCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newListing, ...listings];
    setListings(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("watech_partner_listings_cache", JSON.stringify(updated));
      } catch {
        // Fallback
      }
    }
    showToast(`Success! New ${listingCategory} listing submitted for Admin Review (Pending Approval).`);
    setActiveSection("listings");
  };

  const handleToggleStatus = (id: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus: "Active" | "Sold" | "Inactive" =
            item.status === "Active" ? "Inactive" : item.status === "Inactive" ? "Active" : "Active";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
    showToast("Listing status updated.");
  };

  const handleDeleteListing = (id: string) => {
    if (confirm("Are you sure you want to remove this listing?")) {
      setListings((prev) => prev.filter((i) => i.id !== id));
      showToast("Listing deleted successfully.");
    }
  };

  const handleUpdateInquiryStatus = (
    id: string,
    newStatus: "New" | "Contacted" | "Negotiating" | "Won" | "Lost" | "Invalid" | "Closed"
  ) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );

    // Sync with master lead service
    const statusMap: Record<string, LeadStatus> = {
      New: "new",
      Contacted: "contacted",
      Negotiating: "negotiating",
      Won: "won",
      Lost: "lost",
      Invalid: "invalid",
      Closed: "won",
    };
    if (statusMap[newStatus]) {
      updateLeadStatus(id, statusMap[newStatus]);
    }
    showToast(`Lead status updated to ${newStatus}`);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("watech_partner_session", JSON.stringify(profile));
    }
    showToast("Profile information updated successfully!");
  };

  const formatPKR = (num: number): string => {
    if (num >= 10000000) {
      const cr = num / 10000000;
      return `PKR ${cr % 1 === 0 ? cr : cr.toFixed(2)} Cr`;
    }
    if (num >= 100000) {
      const lac = num / 100000;
      return `PKR ${lac % 1 === 0 ? lac : lac.toFixed(2)} Lac`;
    }
    return `PKR ${num.toLocaleString()}`;
  };

  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "listings", label: "My Listings", icon: Package, count: listings.length },
    { id: "add-listing", label: "Add Listing", icon: PlusCircle },
    { id: "inquiries", label: "Inquiries", icon: MessageSquare, count: inquiries.filter((i) => i.status === "New").length },
    { id: "commission", label: "Commission", icon: BadgePercent },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 selection:bg-[#EA580C] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 z-50 px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl text-xs font-semibold flex items-center gap-2 border border-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-[#EA580C]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================
          MOBILE TOPBAR
          ========================================= */}
      <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-20 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-bold text-xs">
            {profile.fullName.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-xs text-slate-900 leading-tight">{profile.agencyName}</div>
            <div className="text-[10px] text-slate-500">Partner Workspace</div>
          </div>
        </div>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
        >
          {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* =========================================
          SIDEBAR NAVIGATION (DESKTOP & MOBILE)
          ========================================= */}
      <aside
        className={`w-full md:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between transition-all duration-200 z-20 ${
          isMobileSidebarOpen ? "block" : "hidden md:flex"
        }`}
      >
        <div>
          {/* Partner Info Banner */}
          <div className="p-6 border-b border-slate-100 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#EA580C] flex items-center justify-center font-black text-lg">
                {profile.fullName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-sm text-slate-900 truncate">{profile.agencyName}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  {profile.verificationStatus === "verified" ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[11px] font-semibold text-emerald-600">Verified Partner</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-[11px] font-semibold text-amber-600">Pending Verification</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as typeof activeSection);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-orange-50 text-[#EA580C] shadow-sm font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-[#EA580C]" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? "bg-[#EA580C] text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            href="/marketplace"
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <span>Open Marketplace</span>
          </Link>
          <Link
            href="/partners"
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.removeItem("watech_partner_session");
              }
            }}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Account</span>
          </Link>
        </div>
      </aside>

      {/* =========================================
          MAIN CONTENT VIEWPORT
          ========================================= */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        {/* =========================================
            SECTION 1: DASHBOARD OVERVIEW
            ========================================= */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                  Overview
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                  Welcome back, {profile.fullName.split(" ")[0]}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Here is the live performance of your listings across the Watech ecosystem.
                </p>
              </div>

              <button
                onClick={() => setActiveSection("add-listing")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EA580C] text-white text-xs font-bold shadow-md hover:bg-orange-700 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add New Listing</span>
              </button>
            </div>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total Listings
                  </span>
                  <div className="text-3xl font-black text-slate-900 mt-1">{listings.length}</div>
                  <span className="text-[11px] text-emerald-600 font-semibold">Active & Live</span>
                </div>
                <div className="p-3 rounded-2xl bg-orange-50 text-[#EA580C]">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total Inquiries
                  </span>
                  <div className="text-3xl font-black text-slate-900 mt-1">{inquiries.length}</div>
                  <span className="text-[11px] text-blue-600 font-semibold">Lifetime Leads</span>
                </div>
                <div className="p-3 rounded-2xl bg-blue-50 text-[#2563EB]">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    New Leads (This Week)
                  </span>
                  <div className="text-3xl font-black text-slate-900 mt-1">
                    {inquiries.filter((i) => i.status === "New").length}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">Awaiting reply</span>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 text-[#16A34A]">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Commission Earned
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-1">PKR 159.5k</div>
                  <span className="text-[11px] text-slate-500">From closed deals</span>
                </div>
                <div className="p-3 rounded-2xl bg-purple-50 text-purple-600">
                  <BadgePercent className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Activity Feed</h3>
                  <p className="text-xs text-slate-500">Live events across your inventory and incoming leads</p>
                </div>
                <button
                  onClick={() => setActiveSection("inquiries")}
                  className="text-xs font-bold text-[#EA580C] hover:underline"
                >
                  View All Leads →
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-xl bg-orange-100 text-[#EA580C] shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">
                      New Lead from Kamran Akram on "1 Kanal Luxury Modern Villa"
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      "Assalam-o-Alaikum, is this plot corner facing and what is the final negotiable demand?"
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 inline-block">Today, 11:20 AM</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">
                      Deal Marked Closed: "Maharaja Royal Chinioti Bed Set"
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sale amount: PKR 345,000. Commission of PKR 34,500 successfully accounted.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 inline-block">2026-09-02</span>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-2 rounded-xl bg-blue-100 text-[#2563EB] shrink-0 mt-0.5">
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">
                      Traffic Surge: 10 Marla House reached 890 verified impressions
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 inline-block">2026-09-03</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            SECTION 2: MY LISTINGS (RESPONSIVE TABLE)
            ========================================= */}
        {activeSection === "listings" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                  Inventory Management
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  My Published Listings
                </h2>
                <p className="text-xs text-slate-500">
                  Manage availability, edit pricing, or toggle active/inactive status.
                </p>
              </div>

              <button
                onClick={() => setActiveSection("add-listing")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EA580C] text-white text-xs font-bold shadow-md hover:bg-orange-700 transition-all cursor-pointer shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Listing</span>
              </button>
            </div>

            {/* Responsive Striped Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Listing Title</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4">Status</th>
                      <th className="py-4 px-4">Views</th>
                      <th className="py-4 px-4">Inquiries</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {listings.map((item, index) => (
                      <tr
                        key={item.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-slate-50/40 hover:bg-slate-50"}
                      >
                        <td className="py-4 px-6 font-bold text-slate-900 max-w-xs truncate">
                          {item.title}
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">{item.id}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.category === "Property"
                                ? "bg-blue-50 text-blue-700"
                                : item.category === "Furniture"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-orange-50 text-orange-700"
                            }`}
                          >
                            {item.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-black text-slate-900">{formatPKR(item.price)}</td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleToggleStatus(item.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                              item.status === "Active"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : item.status === "Sold"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                            }`}
                            title="Click to toggle status"
                          >
                            {item.status}
                          </button>
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-600">{item.views}</td>
                        <td className="py-4 px-4 font-bold text-[#EA580C]">{item.inquiriesCount}</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => showToast(`Opening editor for ${item.id}`)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                              title="Edit Listing"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteListing(item.id)}
                              className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            SECTION 3: ADD LISTING (DYNAMIC SECTOR FORM)
            ========================================= */}
        {activeSection === "add-listing" && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                Publish Inventory
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Add New Listing
              </h2>
              <p className="text-xs text-slate-500">
                Choose the sector category to open its customized specification form.
              </p>
            </div>

            {/* Category Switcher Tabs */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setListingCategory("Property")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  listingCategory === "Property"
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Real Estate Property</span>
              </button>

              <button
                type="button"
                onClick={() => setListingCategory("Furniture")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  listingCategory === "Furniture"
                    ? "bg-[#16A34A] text-white shadow-md shadow-emerald-500/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Armchair className="w-4 h-4" />
                <span>Chinioti Furniture</span>
              </button>

              <button
                type="button"
                onClick={() => setListingCategory("Event")}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  listingCategory === "Event"
                    ? "bg-[#EA580C] text-white shadow-md shadow-orange-500/20"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Cake className="w-4 h-4" />
                <span>Events & Catering</span>
              </button>
            </div>

            {/* Dynamic Form Container */}
            <form
              onSubmit={handleAddListingSubmit}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6"
            >
              {/* PROPERTY FIELDS */}
              {listingCategory === "Property" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Property Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1 Kanal Modern Luxury Villa"
                        value={propertyForm.title}
                        onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Demand Price (PKR) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 85000000"
                        value={propertyForm.price}
                        onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        City *
                      </label>
                      <select
                        value={propertyForm.city}
                        onChange={(e) => setPropertyForm({ ...propertyForm, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none bg-white"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Faisalabad">Faisalabad</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Specific Location / Sector *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. DHA Phase 6, Sector C"
                        value={propertyForm.location}
                        onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Covered Area *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1 Kanal (4500 Sq Ft)"
                        value={propertyForm.area}
                        onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Bedrooms
                      </label>
                      <input
                        type="number"
                        value={propertyForm.bedrooms}
                        onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Bathrooms
                      </label>
                      <input
                        type="number"
                        value={propertyForm.bathrooms}
                        onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Property Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Highlight architectural finishes, construction quality, possession status..."
                      value={propertyForm.description}
                      onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* FURNITURE FIELDS */}
              {listingCategory === "Furniture" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Furniture Item Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maharaja Royal Chinioti Bed Set"
                        value={furnitureForm.name}
                        onChange={(e) => setFurnitureForm({ ...furnitureForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#16A34A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Price (PKR) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 345000"
                        value={furnitureForm.price}
                        onChange={(e) => setFurnitureForm({ ...furnitureForm, price: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#16A34A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Wood Type *
                      </label>
                      <select
                        value={furnitureForm.woodType}
                        onChange={(e) => setFurnitureForm({ ...furnitureForm, woodType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#16A34A] focus:outline-none bg-white"
                      >
                        <option value="Sheesham">Pure Solid Sheesham</option>
                        <option value="Teak">Teak Wood</option>
                        <option value="Rosewood">Rosewood</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Color / Polish Finish *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Antique Gold Leaf Polish"
                        value={furnitureForm.color}
                        onChange={(e) => setFurnitureForm({ ...furnitureForm, color: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#16A34A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Dimensions *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. King Size 72x78 in"
                        value={furnitureForm.dimensions}
                        onChange={(e) => setFurnitureForm({ ...furnitureForm, dimensions: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#16A34A] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Handcrafting & Wood Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Seasoning details, artisan carving style, foam warranty..."
                      value={furnitureForm.description}
                      onChange={(e) => setFurnitureForm({ ...furnitureForm, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#16A34A] focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* EVENT FIELDS */}
              {listingCategory === "Event" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Event Title / Package Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Grand Crystal Ballroom & Barat Menu"
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Venue Name & City *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Palm, Lahore"
                        value={eventForm.venue}
                        onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Guest Capacity *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 800"
                        value={eventForm.capacity}
                        onChange={(e) => setEventForm({ ...eventForm, capacity: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Menu Cuisine Type *
                      </label>
                      <select
                        value={eventForm.menuType}
                        onChange={(e) => setEventForm({ ...eventForm, menuType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none bg-white"
                      >
                        <option value="Desi">Desi Traditional</option>
                        <option value="Chinese">Chinese / Pan-Asian</option>
                        <option value="BBQ">Live BBQ</option>
                        <option value="Continental">Continental</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Package Rate (PKR / head) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 3800"
                        value={eventForm.packagePrice}
                        onChange={(e) => setEventForm({ ...eventForm, packagePrice: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Drag-Drop Image Upload (Firebase Storage Simulation) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Listing Images (Firebase Storage Upload)
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-[#EA580C] mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-900">
                    Click to browse or drag and drop high-resolution photos
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    WebP, JPG, or PNG up to 10MB each. Automated CDN distribution.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveSection("listings")}
                  className="px-6 py-3 rounded-full border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#EA580C] text-white text-xs font-bold shadow-md hover:bg-orange-700 transition-all cursor-pointer"
                >
                  Publish Listing to Marketplace
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================
            SECTION 4: INQUIRIES & LEADS MANAGEMENT
            ========================================= */}
        {activeSection === "inquiries" && (
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                Lead Capture
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Client Inquiries & WhatsApp Inbox
              </h2>
              <p className="text-xs text-slate-500">
                Direct buyer inquiries submitted through your listings. Change status or initiate WhatsApp chats.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm divide-y divide-slate-100 overflow-hidden">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-sm text-slate-900">{inq.buyerName}</span>
                      <span className="text-xs text-slate-500 font-mono">({inq.buyerPhone})</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          inq.category === "Property"
                            ? "bg-blue-50 text-blue-700"
                            : inq.category === "Furniture"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {inq.category}
                      </span>
                      <span className="text-[10px] text-slate-400">· {inq.date}</span>
                    </div>

                    <div className="text-xs font-semibold text-[#EA580C]">{inq.itemTitle}</div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0">
                    {/* Status Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Status:</span>
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(
                            inq.id,
                            e.target.value as
                              | "New"
                              | "Contacted"
                              | "Negotiating"
                              | "Won"
                              | "Lost"
                              | "Invalid"
                              | "Closed"
                          )
                        }
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer focus:outline-none ${
                          inq.status === "New"
                            ? "bg-orange-50 border-orange-200 text-orange-700"
                            : inq.status === "Contacted"
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : inq.status === "Negotiating"
                            ? "bg-purple-50 border-purple-200 text-purple-700"
                            : inq.status === "Won" || inq.status === "Closed"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-slate-100 border-slate-200 text-slate-600"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Negotiating">Negotiating</option>
                        <option value="Won">Won (Closed)</option>
                        <option value="Lost">Lost</option>
                        <option value="Invalid">Invalid</option>
                      </select>
                    </div>

                    {/* WhatsApp Direct Chat */}
                    <a
                      href={`https://wa.me/${inq.buyerPhone}?text=${encodeURIComponent(
                        `Assalam-o-Alaikum ${inq.buyerName}, this is ${profile.agencyName} regarding your inquiry on "${inq.itemTitle}".`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-sm transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            SECTION 5: COMMISSION & TRANSACTION LEDGER
            ========================================= */}
        {activeSection === "commission" && (
          <div className="space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                Financial Statement
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Commission & Deals Ledger
              </h2>
              <p className="text-xs text-slate-500">
                Watech platform operates on a pure pay-on-success model. Only pay when client funds clear.
              </p>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Closed Sales
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                  PKR 1.46 Cr
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold">2 deals converted</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Commission Paid
                </span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
                  PKR 159,500
                </div>
                <span className="text-[11px] text-slate-500">Clear receipts</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Pending Commission
                </span>
                <div className="text-2xl sm:text-3xl font-black text-[#EA580C] mt-1">
                  PKR 180,000
                </div>
                <span className="text-[11px] text-orange-600 font-semibold">1 deal finalizing</span>
              </div>
            </div>

            {/* Transaction History Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900">Transaction History</h3>
                <span className="text-xs text-slate-500">Auto-calculated via standard rates</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-4">Item Sold / Booked</th>
                      <th className="py-4 px-4">Deal Amount</th>
                      <th className="py-4 px-4">Commission Due</th>
                      <th className="py-4 px-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {transactions.map((tx, idx) => (
                      <tr
                        key={tx.id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/40 hover:bg-slate-50"}
                      >
                        <td className="py-4 px-6 font-mono text-slate-500">{tx.date}</td>
                        <td className="py-4 px-4 font-bold text-slate-900">{tx.itemTitle}</td>
                        <td className="py-4 px-4 font-bold text-slate-900">
                          {formatPKR(tx.amountPKR)}
                        </td>
                        <td className="py-4 px-4 font-black text-[#EA580C]">
                          {formatPKR(tx.commissionPKR)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                              tx.status === "Paid"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            SECTION 6: PROFILE & AGENCY SETTINGS
            ========================================= */}
        {activeSection === "profile" && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                Agency Settings
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                Edit Partner Profile
              </h2>
              <p className="text-xs text-slate-500">
                Update your contact details, agency credentials, or security password.
              </p>
            </div>

            <form
              onSubmit={handleProfileSave}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address (Read-only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile.email}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Agency / Business Name
                  </label>
                  <input
                    type="text"
                    value={profile.agencyName}
                    onChange={(e) => setProfile({ ...profile, agencyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Primary City
                  </label>
                  <select
                    value={profile.city}
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none bg-white"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Chiniot">Chiniot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Update Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password to change"
                    value={profile.password}
                    onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#EA580C] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#EA580C] text-white font-bold text-xs shadow-md hover:bg-orange-700 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
