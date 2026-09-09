"use client";

import React, { useState, useMemo } from "react";
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
  Printer,
  FileText,
  X,
  CreditCard,
  Building2,
  DollarSign,
  ShieldCheck,
} from "lucide-react";
import { INITIAL_ORDERS, OrderItem } from "@/lib/firebase/admin-service";
import { formatPKR, formatDate } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Detail & Invoice Modals
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderItem | null>(null);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        !searchQuery ||
        ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.partner.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || ord.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchesCat =
        selectedCategory === "all" || ord.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesStatus && matchesCat;
    });
  }, [orders, searchQuery, selectedStatus, selectedCategory]);

  const updateOrderStatus = (
    id: string,
    newStatus: "Pending" | "Paid" | "Completed" | "Refunded"
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleExportCSV = () => {
    exportToCSV(
      "watech_orders_deals",
      filteredOrders.map((o) => ({
        orderNumber: o.orderNumber,
        client: o.client,
        phone: o.clientPhone,
        item: o.item,
        category: o.category,
        amount: o.amount,
        commission: o.commission,
        partner: o.partner,
        paymentMethod: o.paymentMethod,
        status: o.status,
        date: o.date,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 font-mono">
              Commerce & Settlement
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {orders.length} Deals Recorded
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Orders, Deals & Invoices
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage transactions across Real Estate token payments, Furniture sales, and Event banquet deposits.
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
            onClick={() => printOrExportPDF("Watech Orders Summary")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ID, client, item, partner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Order Statuses</option>
              <option value="paid">Paid</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="all">All Sectors</option>
              <option value="property">Property Deals</option>
              <option value="furniture">Furniture Orders</option>
              <option value="event">Event Banquets</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Data Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Client</th>
                <th className="p-4">Associated Deal Item</th>
                <th className="p-4">Gross Deal (PKR)</th>
                <th className="p-4">Platform Commission</th>
                <th className="p-4">Partner Agency</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-mono font-bold text-amber-400 text-xs">
                        {order.orderNumber}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{formatDate(order.date)}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{order.client}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{order.clientPhone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-200 truncate max-w-[200px]">
                        {order.item}
                      </div>
                      <span className="text-[10px] text-blue-400 font-semibold">{order.category}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                      {formatPKR(order.amount)}
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-400">
                      <div>{formatPKR(order.commission)}</div>
                      <div className="text-[10px] text-slate-500 font-normal">
                        ({(order.commissionRate * 100).toFixed(0)}% cut)
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 font-medium truncate max-w-[150px]">
                      {order.partner}
                    </td>
                    <td className="p-4 text-slate-400 font-mono text-[11px]">
                      {order.paymentMethod}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          order.status === "Paid"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : order.status === "Completed"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : order.status === "Pending"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setInvoiceOrder(order)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                          title="Generate Branded Invoice"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                          title="View Deal Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500 text-xs">
                    No orders match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  Order Breakdown
                </span>
                <h3 className="font-bold text-white text-base">{selectedOrder.orderNumber}</h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Client Information</span>
                <div className="font-bold text-white">{selectedOrder.client}</div>
                <div className="text-slate-400 font-mono">{selectedOrder.clientPhone}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Partner Attribution</span>
                <div className="font-bold text-white">{selectedOrder.partner}</div>
                <div className="text-amber-400 font-mono">{(selectedOrder.commissionRate * 100).toFixed(0)}% agreed rate</div>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Associated Item:</span>
                <span className="font-bold text-white">{selectedOrder.item}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sector Category:</span>
                <span className="font-bold text-blue-400">{selectedOrder.category}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/80 pt-2">
                <span className="text-slate-400">Total Gross Deal Value:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">
                  {formatPKR(selectedOrder.amount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform Commission Earned:</span>
                <span className="font-mono font-bold text-amber-400">
                  {formatPKR(selectedOrder.commission)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Method:</span>
                <span className="font-bold text-slate-200">{selectedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Change Status */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-medium">Update Status:</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateOrderStatus(
                      selectedOrder.id,
                      e.target.value as "Pending" | "Paid" | "Completed" | "Refunded"
                    )
                  }
                  className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-1 font-bold"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Completed">Completed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setInvoiceOrder(selectedOrder);
                  setSelectedOrder(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600/30 font-bold"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm print:bg-white print:p-0">
          <div className="bg-white text-slate-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl space-y-6 print:rounded-none print:shadow-none print:max-w-none print:p-8">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                    WA
                  </div>
                  <h2 className="font-black text-xl text-slate-900 tracking-tight">
                    WATECH SOLUTIONS
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Multi-Sector Ecosystem • Real Estate | Furniture | Events
                </p>
                <p className="text-xs text-slate-500">DHA Phase 6, Lahore • +92 300 1234567</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  TAX INVOICE
                </span>
                <div className="font-mono font-bold text-sm text-slate-900 mt-1">
                  {invoiceOrder.orderNumber}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Date: {invoiceOrder.date}</div>
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Bill To:</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{invoiceOrder.client}</div>
                <div className="text-slate-600">{invoiceOrder.clientPhone}</div>
                <div className="text-slate-600">{invoiceOrder.clientEmail || "info@client.pk"}</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Partner / Vendor:</span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">{invoiceOrder.partner}</div>
                <div className="text-slate-600">Payment: {invoiceOrder.paymentMethod}</div>
                <div className="text-emerald-600 font-bold">Status: {invoiceOrder.status}</div>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 border-b border-slate-200 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Description & Sector</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Unit Price</th>
                    <th className="p-3 text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{invoiceOrder.item}</div>
                      <div className="text-slate-500 text-[11px]">{invoiceOrder.category} Sector Fulfillment</div>
                    </td>
                    <td className="p-3 text-center font-mono">1</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">
                      {formatPKR(invoiceOrder.amount)}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">
                      {formatPKR(invoiceOrder.amount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Calculations */}
            <div className="flex justify-end text-xs">
              <div className="w-64 space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Total:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatPKR(invoiceOrder.amount)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Platform Fee / Commission:</span>
                  <span className="font-mono font-bold text-blue-600">
                    {formatPKR(invoiceOrder.commission)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-300 pt-2 text-sm font-black text-slate-900">
                  <span>Net Payable / Settled:</span>
                  <span className="font-mono text-emerald-600">
                    {formatPKR(invoiceOrder.amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stamp & Close button in modal view */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4 print:hidden">
              <button
                onClick={() => setInvoiceOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
              >
                Close Preview
              </button>
              <button
                onClick={() => printOrExportPDF(`Invoice_${invoiceOrder.orderNumber}`)}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Invoice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
