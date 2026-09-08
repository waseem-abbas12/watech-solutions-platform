"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  X,
  FileText,
  Building2,
  Armchair,
  Cake,
} from "lucide-react";

interface ClientRow {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: "Buyer" | "Seller" | "Partner";
  source: "Marketplace Search" | "Google Ads" | "Direct WhatsApp" | "Referral";
  status: "New" | "Contacted" | "Converted" | "Lost";
  associatedItem: string;
  notes: string[];
  reminder?: string;
  createdAt: string;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientRow[]>([
    {
      id: "CLI-401",
      name: "Tariq Mehmood",
      phone: "0300 9876543",
      email: "tariq.mehmood@gmail.com",
      type: "Buyer",
      source: "Marketplace Search",
      status: "Converted",
      associatedItem: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
      notes: [
        "Met at DHA Phase 6 site office on Sep 3.",
        "Token money PKR 5,000,000 paid. Registry transfer scheduled for Sep 15.",
      ],
      reminder: "Follow up with DHA transfer office for biometric verification on Sep 14.",
      createdAt: "2026-08-28",
    },
    {
      id: "CLI-402",
      name: "Dr. Ayesha Siddiqui",
      phone: "0321 4455667",
      email: "ayesha.siddiqui@hospital.org.pk",
      type: "Buyer",
      source: "Direct WhatsApp",
      status: "Contacted",
      associatedItem: "Maharaja Royal Chinioti Bed Set",
      notes: [
        "Interested in delivery to Islamabad F-7 sector.",
        "Requested fabric customization in royal navy velvet.",
      ],
      reminder: "Send Chiniot factory polish sample video by tomorrow 3 PM.",
      createdAt: "2026-09-02",
    },
    {
      id: "CLI-403",
      name: "Hamza Tariq",
      phone: "0333 1122334",
      email: "hamza.tariq@lahorebiz.com",
      type: "Buyer",
      source: "Google Ads",
      status: "New",
      associatedItem: "Grand Crystal Ballroom, Royal Palm",
      notes: ["Looking for Barat venue for 650 guests in late November."],
      reminder: "Call to confirm tasting session slot for Desi menu.",
      createdAt: "2026-09-06",
    },
    {
      id: "CLI-404",
      name: "Chaudhry Rauf",
      phone: "0300 7788990",
      email: "rauf.estate@yahoo.com",
      type: "Seller",
      source: "Referral",
      status: "Contacted",
      associatedItem: "10 Marla Plot Sector F Bahria Town",
      notes: ["Wants to list 3 residential plots with exclusive agency mandate."],
      createdAt: "2026-09-04",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Client Detail Drawer / Modal
  const [selectedClient, setSelectedClient] = useState<ClientRow | null>(null);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedClient) return;
    const updatedNotes = [...selectedClient.notes, newNote.trim()];

    setClients((prev) =>
      prev.map((c) => (c.id === selectedClient.id ? { ...c, notes: updatedNotes } : c))
    );

    setSelectedClient({ ...selectedClient, notes: updatedNotes });
    setNewNote("");
  };

  const handleStatusChange = (id: string, newStatus: ClientRow["status"]) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedClient && selectedClient.id === id) {
      setSelectedClient({ ...selectedClient, status: newStatus });
    }
  };

  const filteredClients = clients.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "All" || c.type === filterType;
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            Customer Relationship Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Client Directory & Leads
          </h1>
          <p className="text-xs text-slate-400">
            Track customer interactions, follow-up reminders, and associated inquiries across all 3 sectors.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search name, phone, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Client Types</option>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
            <option value="Partner">Partner</option>
          </select>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New Lead</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-4">Contact Info</th>
                <th className="py-4 px-4">Type</th>
                <th className="py-4 px-4">Acquisition Source</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Associated Interest</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredClients.map((c, idx) => (
                <tr
                  key={c.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    idx % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"
                  }`}
                >
                  <td className="py-4 px-6 font-bold text-white">
                    {c.name}
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{c.id}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    <div className="font-mono text-white">{c.phone}</div>
                    <div className="text-[10px] text-slate-500">{c.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {c.type}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-medium">{c.source}</td>
                  <td className="py-4 px-4">
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer focus:outline-none ${
                        c.status === "Converted"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : c.status === "Contacted"
                          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                          : c.status === "New"
                          ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-slate-300 max-w-xs truncate">{c.associatedItem}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedClient(c)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors font-semibold text-[11px]"
                    >
                      View CRM History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Detail Drawer / Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">{selectedClient.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400">
                    {selectedClient.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Client ID: {selectedClient.id} · Acquired via {selectedClient.source}
                </p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`tel:${selectedClient.phone}`} className="hover:underline font-mono">
                  {selectedClient.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${selectedClient.email}`} className="hover:underline truncate">
                  {selectedClient.email}
                </a>
              </div>
            </div>

            {/* Associated Listing */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Associated Interest
              </h4>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-white">
                {selectedClient.associatedItem}
              </div>
            </div>

            {/* Follow-up Reminder */}
            {selectedClient.reminder && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Follow-up Reminder
                </h4>
                <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/30 text-xs text-orange-200">
                  {selectedClient.reminder}
                </div>
              </div>
            )}

            {/* Interaction History & Notes */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Interaction History & Notes
              </h4>

              <div className="space-y-2">
                {selectedClient.notes.map((n, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
                  >
                    • {n}
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add a new client interaction note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddNote();
                  }}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
