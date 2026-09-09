"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  X,
  UserCheck,
  ArrowRight,
  ShoppingBag,
  Clock,
  Phone,
  Building2,
  Armchair,
  Cake,
  Download,
  Printer,
  CheckSquare,
  Square,
  Send,
} from "lucide-react";
import { INITIAL_INQUIRIES, InquiryItem } from "@/lib/firebase/admin-service";
import { formatDate } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";
import { getLocalCachedLeads } from "@/lib/services/leads";
import { db } from "@/lib/firebase/client";
import { collection, getDocs } from "firebase/firestore";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);

  // Sync inquiries from website submissions (Server API + local cache + Firestore)
  useEffect(() => {
    // 0. Fetch live inquiries from server API endpoint
    fetch("/api/inquiries")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.inquiries) && data.inquiries.length > 0) {
          setInquiries(data.inquiries);
        }
      })
      .catch(() => {});

    // 1. Sync local cached leads submitted from website
    const cached = getLocalCachedLeads();
    if (cached.length > 0) {
      const mappedCached: InquiryItem[] = cached.map((l) => ({
        id: l.id,
        client: l.customerName,
        phone: l.phone,
        email: l.email || "N/A",
        category:
          l.category === "real_estate"
            ? "Property"
            : l.category === "furniture"
            ? "Furniture"
            : l.category === "events"
            ? "Event"
            : "Service",
        itemTitle: l.listingTitle || l.requiredService || "General Website Inquiry",
        message: l.notes || "Inquiry from website",
        status: "New",
        assignedTo: "Operations Admin",
        date: l.createdAt ? l.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10),
      }));

      setInquiries((prev) => {
        const existingIds = new Set(prev.map((i) => i.id));
        const newItems = mappedCached.filter((i) => !existingIds.has(i.id));
        return [...newItems, ...prev];
      });
    }

    // 2. Fetch live from Firestore if online/configured
    if (db) {
      getDocs(collection(db, "inquiries"))
        .then((snapshot) => {
          if (!snapshot.empty) {
            const firestoreInquiries: InquiryItem[] = snapshot.docs.map((dDoc) => {
              const d = dDoc.data();
              return {
                id: dDoc.id,
                client: d.customerName || "Website Lead",
                phone: d.customerPhone || "N/A",
                email: d.customerEmail || "N/A",
                category:
                  d.category === "property"
                    ? "Property"
                    : d.category === "furniture"
                    ? "Furniture"
                    : d.category === "event"
                    ? "Event"
                    : "Service",
                itemTitle: d.serviceRequired || "Marketplace Inquiry",
                message: d.message || "",
                status: "New",
                assignedTo: "Operations Admin",
                date: new Date().toISOString().substring(0, 10),
              };
            });
            setInquiries((prev) => {
              const ids = new Set(firestoreInquiries.map((i) => i.id));
              return [...firestoreInquiries, ...prev.filter((i) => !ids.has(i.id))];
            });
          }
        })
        .catch(() => {
          // offline fallback
        });
    }
  }, []);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedAdmin, setSelectedAdmin] = useState<string>("all");

  // Selection for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [orderConvertSuccess, setOrderConvertSuccess] = useState<string | null>(null);

  const adminAssignees = [
    "Operations Admin",
    "Floor Manager",
    "Super Administrator",
    "Support Desk",
  ];

  // Filtered List
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        !searchQuery ||
        inq.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.phone.includes(searchQuery) ||
        inq.itemTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inq.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === "all" || inq.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" || inq.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchesAdmin =
        selectedAdmin === "all" || inq.assignedTo.toLowerCase() === selectedAdmin.toLowerCase();

      return matchesSearch && matchesCat && matchesStatus && matchesAdmin;
    });
  }, [inquiries, searchQuery, selectedCategory, selectedStatus, selectedAdmin]);

  // Bulk Selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInquiries.map((i) => i.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (newStatus: "New" | "Contacted" | "Viewed" | "Closed" | "Converted") => {
    if (!selectedIds.length) return;
    setInquiries((prev) =>
      prev.map((inq) =>
        selectedIds.includes(inq.id) ? { ...inq, status: newStatus } : inq
      )
    );
    setSelectedIds([]);
  };

  const handleBulkAssign = (adminName: string) => {
    if (!selectedIds.length) return;
    setInquiries((prev) =>
      prev.map((inq) =>
        selectedIds.includes(inq.id) ? { ...inq, assignedTo: adminName } : inq
      )
    );
    setSelectedIds([]);
  };

  // Quick Action Handlers on Single Inquiry
  const updateSingleStatus = (id: string, newStatus: "New" | "Contacted" | "Viewed" | "Closed" | "Converted") => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const assignSingleAdmin = (id: string, adminName: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, assignedTo: adminName } : i))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, assignedTo: adminName });
    }
  };

  // Convert Inquiry to Order
  const handleConvertToOrder = (inq: InquiryItem) => {
    updateSingleStatus(inq.id, "Converted");
    setOrderConvertSuccess(
      `Inquiry #${inq.id} (${inq.client}) successfully converted to deal pipeline. Order drafting ready.`
    );
    setTimeout(() => {
      setOrderConvertSuccess(null);
      setSelectedInquiry(null);
    }, 2000);
  };

  const handleExportCSV = () => {
    exportToCSV(
      "watech_inquiries_desk",
      filteredInquiries.map((i) => ({
        id: i.id,
        client: i.client,
        phone: i.phone,
        email: i.email,
        category: i.category,
        itemTitle: i.itemTitle,
        message: i.message,
        status: i.status,
        assignedTo: i.assignedTo,
        date: i.date,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">
              Inbound Leads & Triage
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {inquiries.length} Total Messages
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Inquiries & Customer Leads Desk
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track customer requests, assign agents, launch direct WhatsApp chats, and convert to deals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => printOrExportPDF("Watech Inquiries Report")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search client, phone, item title, message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Sectors</option>
              <option value="property">Real Estate</option>
              <option value="furniture">Furniture</option>
              <option value="event">Events</option>
              <option value="service">Digital Services</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="viewed">Viewed</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <select
              value={selectedAdmin}
              onChange={(e) => setSelectedAdmin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Assigned Admins</option>
              {adminAssignees.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <CheckSquare className="w-4 h-4" />
              <span>{selectedIds.length} inquiries selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Set Status:</span>
              <button
                onClick={() => handleBulkStatusChange("Contacted")}
                className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 font-semibold cursor-pointer"
              >
                Mark Contacted
              </button>
              <button
                onClick={() => handleBulkStatusChange("Closed")}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 font-semibold cursor-pointer"
              >
                Close Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Inquiries Table Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-4 w-10 text-center">
                  <button
                    onClick={toggleSelectAll}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    {selectedIds.length === filteredInquiries.length &&
                    filteredInquiries.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Inquiry ID & Client</th>
                <th className="p-4">Sector Category</th>
                <th className="p-4">Item of Interest</th>
                <th className="p-4">Customer Message</th>
                <th className="p-4">Assigned Moderator</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => {
                  const isSelected = selectedIds.includes(inq.id);
                  return (
                    <tr
                      key={inq.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        inq.status === "New" ? "bg-blue-950/20" : ""
                      } ${isSelected ? "bg-blue-600/10" : ""}`}
                    >
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleSelectRow(inq.id)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white text-sm hover:text-blue-400 transition-colors">
                          {inq.client}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">{inq.phone}</div>
                        <div className="text-[10px] text-slate-500">{inq.date}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/15 text-blue-400 border border-blue-500/30">
                          {inq.category}
                        </span>
                      </td>
                      <td className="p-4 font-semibold text-slate-200 truncate max-w-[180px]">
                        {inq.itemTitle}
                      </td>
                      <td className="p-4 text-slate-400 truncate max-w-[240px]">
                        {inq.message}
                      </td>
                      <td className="p-4 text-slate-300 font-medium">
                        {inq.assignedTo}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            inq.status === "New"
                              ? "bg-blue-500/15 text-blue-400 border-blue-500/30 animate-pulse"
                              : inq.status === "Contacted"
                              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                              : inq.status === "Converted"
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 font-bold transition-colors cursor-pointer"
                        >
                          Manage Inquiry
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 text-xs">
                    No inquiries found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Drawer & Quick Actions Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                  Lead Ticket #{selectedInquiry.id}
                </span>
                <h3 className="font-bold text-white text-base">{selectedInquiry.client}</h3>
                <p className="text-xs text-slate-400">{selectedInquiry.date}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderConvertSuccess && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{orderConvertSuccess}</span>
              </div>
            )}

            {/* Client Info & WhatsApp Quick Link */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Client Contact</span>
                <div className="font-mono text-white font-bold">{selectedInquiry.phone}</div>
                <div className="text-slate-400 truncate">{selectedInquiry.email}</div>
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}?text=Assalam-o-Alaikum%20${encodeURIComponent(selectedInquiry.client)},%20Watech%20Solutions%20team%20contacting%20regarding%20your%20inquiry.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px] hover:underline pt-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Launch WhatsApp Chat ↗</span>
                </a>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Sector & Item</span>
                <div className="text-blue-400 font-bold">{selectedInquiry.category}</div>
                <div className="text-white font-medium text-[11px] truncate">
                  {selectedInquiry.itemTitle}
                </div>
              </div>
            </div>

            {/* Client Full Message */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 text-xs">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Customer Inquiry Message</span>
              <p className="text-slate-200 leading-relaxed italic">&quot;{selectedInquiry.message}&quot;</p>
            </div>

            {/* Quick Actions Panel */}
            <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Lead Triage & Conversion Controls
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">
                    Assign to Moderator
                  </label>
                  <select
                    value={selectedInquiry.assignedTo}
                    onChange={(e) => assignSingleAdmin(selectedInquiry.id, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-2.5 py-1.5"
                  >
                    {adminAssignees.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 text-[11px] mb-1 font-semibold">
                    Update Pipeline Status
                  </label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) =>
                      updateSingleStatus(
                        selectedInquiry.id,
                        e.target.value as "New" | "Contacted" | "Viewed" | "Closed" | "Converted"
                      )
                    }
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-2.5 py-1.5"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Viewed">Viewed</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3">
                <button
                  onClick={() => updateSingleStatus(selectedInquiry.id, "Contacted")}
                  className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  Mark as Contacted
                </button>

                <button
                  onClick={() => handleConvertToOrder(selectedInquiry)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Convert to Deal Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
