"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  FileSpreadsheet,
} from "lucide-react";

interface OrderRow {
  id: string;
  orderId: string;
  client: string;
  item: string;
  category: "Property" | "Furniture" | "Event";
  amount: number;
  commissionRate: number; // e.g. 0.10 for 10%
  commission: number; // amount * commissionRate
  partner: string;
  status: "Pending" | "Paid" | "Completed";
  date: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([
    {
      id: "ORD-1",
      orderId: "WAT-2026-0089",
      client: "Tariq Mehmood",
      item: "1 Kanal Luxury Modern Villa (DHA Phase 6)",
      category: "Property",
      amount: 85000000,
      commissionRate: 0.01, // 1% for high ticket property
      commission: 850000,
      partner: "Al-Madina Estate & Builders",
      status: "Paid",
      date: "2026-09-08",
    },
    {
      id: "ORD-2",
      orderId: "WAT-2026-0090",
      client: "Dr. Ayesha Siddiqui",
      item: "Maharaja Royal Chinioti Bed Set",
      category: "Furniture",
      amount: 345000,
      commissionRate: 0.10, // 10%
      commission: 34500,
      partner: "Chiniot Royal Woodcraft",
      status: "Completed",
      date: "2026-09-07",
    },
    {
      id: "ORD-3",
      orderId: "WAT-2026-0091",
      client: "Hamza Tariq",
      item: "Grand Crystal Ballroom (Barat Booking)",
      category: "Event",
      amount: 1800000,
      commissionRate: 0.10, // 10%
      commission: 180000,
      partner: "Royal Palm Hospitality",
      status: "Pending",
      date: "2026-09-08",
    },
    {
      id: "ORD-4",
      orderId: "WAT-2026-0092",
      client: "Shahid Afridi",
      item: "Hand-Carved Floral 7-Seater Sofa",
      category: "Furniture",
      amount: 285000,
      commissionRate: 0.10,
      commission: 28500,
      partner: "Chiniot Royal Woodcraft",
      status: "Paid",
      date: "2026-09-05",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Client",
      "Item",
      "Category",
      "Deal Amount (PKR)",
      "Commission Rate",
      "Commission (PKR)",
      "Partner Agency",
      "Status",
      "Date",
    ];

    const rows = orders.map((o) => [
      o.orderId,
      `"${o.client}"`,
      `"${o.item}"`,
      o.category,
      o.amount,
      `${(o.commissionRate * 100).toFixed(0)}%`,
      o.commission,
      `"${o.partner}"`,
      o.status,
      o.date,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `watech_orders_report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = (id: string, newStatus: OrderRow["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchSearch =
      !search ||
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.client.toLowerCase().includes(search.toLowerCase()) ||
      o.partner.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            Financial Ledger & Transactions
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Orders & Commission Audit
          </h1>
          <p className="text-xs text-slate-400">
            Audit sales, monitor calculated partner commissions (amount × commission_rate), and export CSV reports.
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order ID, client, or partner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-4">Client</th>
                <th className="py-4 px-4">Listing / Item</th>
                <th className="py-4 px-4">Deal Amount</th>
                <th className="py-4 px-4">Commission</th>
                <th className="py-4 px-4">Partner Agency</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((o, idx) => (
                <tr
                  key={o.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    idx % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"
                  }`}
                >
                  <td className="py-4 px-6 font-mono font-black text-blue-400">{o.orderId}</td>
                  <td className="py-4 px-4 font-bold text-white">{o.client}</td>
                  <td className="py-4 px-4 text-slate-300 max-w-xs truncate">
                    <div>{o.item}</div>
                    <span className="text-[10px] text-slate-500 font-semibold">{o.category}</span>
                  </td>
                  <td className="py-4 px-4 font-black text-white">{formatPKR(o.amount)}</td>
                  <td className="py-4 px-4">
                    <div className="font-black text-emerald-400">{formatPKR(o.commission)}</div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {(o.commissionRate * 100).toFixed(0)}% rate
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-medium">{o.partner}</td>
                  <td className="py-4 px-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value as any)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border cursor-pointer focus:outline-none ${
                        o.status === "Paid" || o.status === "Completed"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-slate-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
