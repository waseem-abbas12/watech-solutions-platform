"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface AdminInquiry {
  id: string;
  client: string;
  phone: string;
  email: string;
  category: "Property" | "Furniture" | "Event" | "Service";
  itemTitle: string;
  message: string;
  status: "New" | "Contacted" | "Viewed" | "Closed" | "Converted";
  assignedTo: string;
  date: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([
    {
      id: "INQ-701",
      client: "Kamran Akram",
      phone: "0321 4567890",
      email: "kamran@akram.pk",
      category: "Property",
      itemTitle: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
      message: "Assalam-o-Alaikum, is this plot corner facing and what is the final negotiable demand?",
      status: "New",
      assignedTo: "Operations Admin",
      date: "2026-09-08 11:20 AM",
    },
    {
      id: "INQ-702",
      client: "Dr. Ayesha Siddiqui",
      phone: "0300 9876543",
      email: "ayesha.siddiqui@gmail.com",
      category: "Furniture",
      itemTitle: "Maharaja Royal Chinioti Bed Set",
      message: "Can you deliver this bed set to Islamabad and is customization in walnut finish possible?",
      status: "Contacted",
      assignedTo: "Floor Manager",
      date: "2026-09-07 04:15 PM",
    },
    {
      id: "INQ-703",
      client: "Hamza Tariq",
      phone: "0333 1122334",
      email: "hamza.tariq@gmail.com",
      category: "Event",
      itemTitle: "Grand Crystal Ballroom & Lawn",
      message: "Need 650 guests booking for Barat in late November. Please share per head menu breakdown.",
      status: "Converted",
      assignedTo: "Super Administrator",
      date: "2026-09-05 02:00 PM",
    },
    {
      id: "INQ-704",
      client: "Bilal Ahmad",
      phone: "0300 1122334",
      email: "bilal@brandagency.com",
      category: "Service",
      itemTitle: "Complete Ecosystem Solution (Web + Marketing + CRM)",
      message: "We need an end-to-end digital agency rollout for our furniture manufacturing unit in Chiniot.",
      status: "Viewed",
      assignedTo: "Operations Admin",
      date: "2026-09-08 09:10 AM",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);

  const handleStatusChange = (id: string, newStatus: AdminInquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleConvertToOrder = (inq: AdminInquiry) => {
    alert(`Inquiry ${inq.id} converted into active Transaction Order! Transferred to /admin/orders.`);
    handleStatusChange(inq.id, "Converted");
    setSelectedInquiry(null);
  };

  const filtered = inquiries.filter((inq) => {
    const matchSearch =
      !search ||
      inq.client.toLowerCase().includes(search.toLowerCase()) ||
      inq.itemTitle.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search);
    const matchCat = filterCategory === "All" || inq.category === filterCategory;
    const matchStat = filterStatus === "All" || inq.status === filterStatus;
    return matchSearch && matchCat && matchStat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            Unified Inquiries & Leads
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Master Inquiries Manager
          </h1>
          <p className="text-xs text-slate-400">
            Real-time client inquiries across Real Estate, Chinioti Furniture, Events, and Agency Services.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search client, item, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Categories</option>
            <option value="Property">Real Estate</option>
            <option value="Furniture">Chinioti Furniture</option>
            <option value="Event">Events & Catering</option>
            <option value="Service">Digital Services</option>
          </select>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Viewed">Viewed</option>
            <option value="Converted">Converted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Inquiry ID</th>
                <th className="py-4 px-4">Client</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Listing / Brief</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Assigned To</th>
                <th className="py-4 px-4">Received Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((inq, idx) => (
                <tr
                  key={inq.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    idx % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"
                  }`}
                >
                  <td className="py-4 px-6 font-mono font-black text-blue-400">{inq.id}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{inq.client}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{inq.phone}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        inq.category === "Property"
                          ? "bg-blue-500/20 text-blue-400"
                          : inq.category === "Furniture"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : inq.category === "Event"
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-purple-500/20 text-purple-400"
                      }`}
                    >
                      {inq.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 max-w-xs truncate">{inq.itemTitle}</td>
                  <td className="py-4 px-4">
                    <select
                      value={inq.status}
                      onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer focus:outline-none ${
                        inq.status === "Converted"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : inq.status === "New"
                          ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Viewed">Viewed</option>
                      <option value="Converted">Converted</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-medium">{inq.assignedTo}</td>
                  <td className="py-4 px-4 text-slate-500 font-mono text-[11px]">{inq.date}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedInquiry(inq)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors font-semibold text-[11px]"
                    >
                      Audit Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Action Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">Inquiry {selectedInquiry.id}</h3>
                <p className="text-xs text-slate-400">
                  Received on {selectedInquiry.date} via Marketplace Portal
                </p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase">Client Info</span>
                <div className="font-bold text-white text-sm">{selectedInquiry.client}</div>
                <div className="text-slate-400 font-mono">{selectedInquiry.phone}</div>
                <div className="text-slate-400">{selectedInquiry.email}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold uppercase">Target Listing</span>
                <div className="font-bold text-white text-sm">{selectedInquiry.itemTitle}</div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400">
                  {selectedInquiry.category}
                </span>
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold uppercase text-slate-400 mb-2">
                Inquiry Message Content
              </span>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                "{selectedInquiry.message}"
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`https://wa.me/${selectedInquiry.phone}?text=${encodeURIComponent(
                  `Assalam-o-Alaikum ${selectedInquiry.client}, Watech Admin here regarding your inquiry on "${selectedInquiry.itemTitle}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact on WhatsApp</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleConvertToOrder(selectedInquiry)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Convert to Order</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedInquiry.id, "Closed")}
                  className="px-4 py-2.5 rounded-full border border-slate-700 text-slate-400 hover:text-white text-xs font-bold"
                >
                  Close Inquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
