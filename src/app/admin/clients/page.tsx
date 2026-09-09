"use client";

import React, { useState, useMemo } from "react";
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
  Download,
  Printer,
  Send,
  Bell,
  Trash2,
} from "lucide-react";
import { INITIAL_CLIENTS, ClientItem } from "@/lib/firebase/admin-service";
import { formatDate } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientItem[]>(INITIAL_CLIENTS);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("all");

  // Selected Client for 360-degree Detail Modal
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Add Client Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "Buyer" as "Buyer" | "Seller" | "Partner",
    source: "Direct WhatsApp" as "Marketplace Search" | "Google Ads" | "Direct WhatsApp" | "Referral" | "Social Media",
    associatedItem: "",
    reminder: "",
  });

  // Filtered List
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.associatedItem.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "all" || c.type.toLowerCase() === selectedType.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" || c.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchesSource =
        selectedSource === "all" || c.source.toLowerCase() === selectedSource.toLowerCase();

      return matchesSearch && matchesType && matchesStatus && matchesSource;
    });
  }, [clients, searchQuery, selectedType, selectedStatus, selectedSource]);

  // Add Note to Client
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedClient) return;

    const newNoteObj = {
      text: newNoteText.trim(),
      date: new Date().toISOString().split("T")[0],
      author: "superAdmin",
    };

    const updatedClient = {
      ...selectedClient,
      notes: [...selectedClient.notes, newNoteObj],
    };

    setSelectedClient(updatedClient);
    setClients((prev) =>
      prev.map((c) => (c.id === selectedClient.id ? updatedClient : c))
    );
    setNewNoteText("");
  };

  // Status Change
  const handleUpdateStatus = (id: string, newStatus: "New" | "Contacted" | "Converted" | "Lost") => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedClient && selectedClient.id === id) {
      setSelectedClient({ ...selectedClient, status: newStatus });
    }
  };

  // Add New Client
  const handleSaveNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.name || !newClientForm.phone) {
      alert("Name and phone number are required.");
      return;
    }

    const newId = `CLI-${Math.floor(400 + Math.random() * 600)}`;
    const newRecord: ClientItem = {
      id: newId,
      name: newClientForm.name,
      phone: newClientForm.phone,
      email: newClientForm.email || `${newClientForm.name.toLowerCase().replace(/\s+/g, "")}@client.pk`,
      type: newClientForm.type,
      source: newClientForm.source,
      status: "New",
      associatedItem: newClientForm.associatedItem || "General Inquiry",
      notes: [
        {
          text: "Client registered in CRM database",
          date: new Date().toISOString().split("T")[0],
          author: "superAdmin",
        },
      ],
      reminder: newClientForm.reminder,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setClients([newRecord, ...clients]);
    setIsAddModalOpen(false);
  };

  const handleExportCSV = () => {
    exportToCSV(
      "watech_clients_crm",
      filteredClients.map((c) => ({
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email,
        type: c.type,
        source: c.source,
        status: c.status,
        associatedItem: c.associatedItem,
        createdAt: c.createdAt,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 font-mono">
              CRM Intelligence
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {clients.length} Active Records
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Clients & Buyers Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            360° buyer profiles, communication timeline, deal association, and follow-up alerts.
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
            onClick={() => printOrExportPDF("Watech Clients Directory")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, email, item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Client Types</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="partner">Partner</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>

          <div>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Acquisition Sources</option>
              <option value="direct whatsapp">Direct WhatsApp</option>
              <option value="marketplace search">Marketplace Search</option>
              <option value="google ads">Google Ads</option>
              <option value="referral">Referral</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-4">Client Name & Type</th>
                <th className="p-4">Contact (Phone & Email)</th>
                <th className="p-4">Associated Deal / Item</th>
                <th className="p-4">Lead Channel</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Profile & Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr
                    key={client.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-white text-sm hover:text-purple-400 transition-colors">
                        {client.name}
                      </div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/30">
                        {client.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-mono text-slate-200 font-semibold">{client.phone}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                        {client.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-200 truncate max-w-[220px]">
                        {client.associatedItem}
                      </div>
                      {client.reminder && (
                        <div className="flex items-center gap-1 text-[10px] text-amber-400 font-semibold mt-1">
                          <Bell className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[200px]">{client.reminder}</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-slate-300 font-medium">{client.source}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          client.status === "Converted"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : client.status === "Contacted"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : client.status === "New"
                            ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {client.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">
                      {formatDate(client.createdAt)}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="px-3 py-1.5 rounded-xl bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/30 font-bold transition-colors cursor-pointer"
                      >
                        View Profile & Notes ({client.notes.length})
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                    No clients found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 360-Degree Client Profile Drawer / Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest">
                  Client Record #{selectedClient.id}
                </span>
                <h3 className="font-bold text-white text-lg">{selectedClient.name}</h3>
                <p className="text-xs text-slate-400">
                  {selectedClient.type} • Acquired via {selectedClient.source}
                </p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & WhatsApp Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Direct Phone</span>
                <div className="font-mono text-xs font-bold text-white flex items-center justify-between">
                  <span>{selectedClient.phone}</span>
                  <a
                    href={`https://wa.me/${selectedClient.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline text-[10px]"
                  >
                    WhatsApp ↗
                  </a>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Email Address</span>
                <div className="text-xs font-bold text-white truncate">{selectedClient.email}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Deal Pipeline Status</span>
                <select
                  value={selectedClient.status}
                  onChange={(e) =>
                    handleUpdateStatus(
                      selectedClient.id,
                      e.target.value as "New" | "Contacted" | "Converted" | "Lost"
                    )
                  }
                  className="w-full bg-slate-900 border border-slate-700 text-xs font-bold text-white rounded-lg px-2 py-1"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
            </div>

            {/* Associated Deal Item */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Associated Item / Intent</span>
              <div className="text-xs font-bold text-blue-400">{selectedClient.associatedItem}</div>
              {selectedClient.reminder && (
                <div className="text-[11px] text-amber-400 font-medium pt-1 flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 shrink-0" />
                  <span>Reminder: {selectedClient.reminder}</span>
                </div>
              )}
            </div>

            {/* Interaction Notes & History Timeline */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Interaction Timeline & Notes</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {selectedClient.notes.length} remarks recorded
                </span>
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 divide-y divide-slate-800/40">
                {selectedClient.notes.map((note, idx) => (
                  <div key={idx} className="pt-2 text-xs space-y-1">
                    <p className="text-slate-200">{note.text}</p>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {note.date} • Logged by {note.author}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Note Input Form */}
              <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Type an internal progress note or reminder..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Add Note</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add New Client Record</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={newClientForm.name}
                  onChange={(e) => setNewClientForm({ ...newClientForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Phone Number (WhatsApp) *</label>
                <input
                  type="text"
                  required
                  placeholder="0300 1234567"
                  value={newClientForm.phone}
                  onChange={(e) => setNewClientForm({ ...newClientForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="tariq@gmail.com"
                  value={newClientForm.email}
                  onChange={(e) => setNewClientForm({ ...newClientForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Client Type</label>
                  <select
                    value={newClientForm.type}
                    onChange={(e) =>
                      setNewClientForm({
                        ...newClientForm,
                        type: e.target.value as "Buyer" | "Seller" | "Partner",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Source</label>
                  <select
                    value={newClientForm.source}
                    onChange={(e) =>
                      setNewClientForm({
                        ...newClientForm,
                        source: e.target.value as "Marketplace Search" | "Google Ads" | "Direct WhatsApp" | "Referral" | "Social Media",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Direct WhatsApp">Direct WhatsApp</option>
                    <option value="Marketplace Search">Marketplace Search</option>
                    <option value="Google Ads">Google Ads</option>
                    <option value="Referral">Referral</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Associated Listing / Interest</label>
                <input
                  type="text"
                  placeholder="e.g. 1 Kanal Villa DHA Phase 6"
                  value={newClientForm.associatedItem}
                  onChange={(e) =>
                    setNewClientForm({ ...newClientForm, associatedItem: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Follow-up Reminder</label>
                <input
                  type="text"
                  placeholder="e.g. Follow up on transfer documents on Friday"
                  value={newClientForm.reminder}
                  onChange={(e) =>
                    setNewClientForm({ ...newClientForm, reminder: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
