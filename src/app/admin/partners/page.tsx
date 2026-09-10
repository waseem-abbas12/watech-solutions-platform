"use client";

import React, { useState, useMemo } from "react";
import {
  Handshake,
  Search,
  CheckCircle2,
  Clock,
  X,
  Building2,
  DollarSign,
  TrendingUp,
  Download,
  Printer,
  Edit3,
  CreditCard,
  Phone,
  Mail,
  ShieldCheck,
  Check,
} from "lucide-react";
import { INITIAL_PARTNERS, PartnerItem } from "@/lib/firebase/admin-service";
import { formatPKR, formatDate } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerItem[]>(INITIAL_PARTNERS);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Selected Partner for Audit & Detail Modal
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);

  // Commission Rate Edit State
  const [rateEditId, setRateEditId] = useState<string | null>(null);
  const [newRateValue, setNewRateValue] = useState<string>("");

  // Payout Modal State
  const [payoutPartner, setPayoutPartner] = useState<PartnerItem | null>(null);
  const [payoutSuccessMsg, setPayoutSuccessMsg] = useState<string | null>(null);

  // Filtered List
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery);

      const matchesType =
        selectedType === "all" || p.businessType.toLowerCase() === selectedType.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" || p.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [partners, searchQuery, selectedType, selectedStatus]);

  // Adjust Commission Rate
  const handleSaveCommissionRate = (id: string) => {
    const rateNum = parseFloat(newRateValue);
    if (isNaN(rateNum) || rateNum < 0 || rateNum > 100) {
      alert("Please enter a valid percentage between 0 and 100.");
      return;
    }
    const rateDecimal = rateNum / 100;
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, commissionRate: rateDecimal } : p))
    );
    if (selectedPartner && selectedPartner.id === id) {
      setSelectedPartner({ ...selectedPartner, commissionRate: rateDecimal });
    }
    setRateEditId(null);
  };

  // Settle Payout Workflow
  const handleProcessPayout = () => {
    if (!payoutPartner || payoutPartner.pendingPayout <= 0) return;

    const amountPaid = payoutPartner.pendingPayout;
    setPartners((prev) =>
      prev.map((p) =>
        p.id === payoutPartner.id ? { ...p, pendingPayout: 0 } : p
      )
    );

    setPayoutSuccessMsg(
      `Payout of ${formatPKR(amountPaid)} successfully settled to ${payoutPartner.agencyName}. Transaction recorded in ledger.`
    );
    setTimeout(() => {
      setPayoutPartner(null);
      setPayoutSuccessMsg(null);
    }, 2500);
  };

  const handleExportCSV = () => {
    exportToCSV(
      "watech_partners_network",
      filteredPartners.map((p) => ({
        id: p.id,
        name: p.name,
        businessType: p.businessType,
        agencyName: p.agencyName,
        city: p.city,
        commissionRate: `${(p.commissionRate * 100).toFixed(1)}%`,
        totalSales: p.totalSales,
        totalCommissionEarned: p.totalCommissionEarned,
        pendingPayout: p.pendingPayout,
        status: p.status,
        joinedDate: p.joinedDate,
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
              Partner Ecosystem
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {partners.length} Verified Agencies
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Partners & Vendor Network
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage real estate brokers, Chiniot furniture workshops, banquet venues, and payouts.
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
            onClick={() => printOrExportPDF("Watech Partners Network")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Feature Guide & Rahnumai Banner */}
      <div className="bg-slate-900/90 border border-amber-500/20 p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
              <Handshake className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Partners & Vendors Network Rahnumai:
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            28 Verified Vendors
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">1. Partner Onboarding:</span>
            <p className="text-[11px] leading-relaxed">
              Real estate agents, Chinioti carpenters/workshops, aur banquet hall managers register hote hain. CNIC aur verified location check karke badge activate karein.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">2. Transparent Commission:</span>
            <p className="text-[11px] leading-relaxed">
              Closed deals par agreed commission auto-calculate hoti hai. Har partner ka pending aur paid balance ledger yahan maintain rehta hai.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">3. Direct Payout Settlement:</span>
            <p className="text-[11px] leading-relaxed">
              Bank transfer, JazzCash ya EasyPaisa se payment send karke &apos;Process Payout&apos; par click karein taake ledger 100% updated rahe.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search partner name, agency, city, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Business Types</option>
              <option value="real estate agent">Real Estate Agent</option>
              <option value="furniture manufacturer">Furniture Manufacturer</option>
              <option value="event vendor">Event Vendor</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-4">Partner Agency & Owner</th>
                <th className="p-4">Business Sector</th>
                <th className="p-4">City</th>
                <th className="p-4">Agreed Commission</th>
                <th className="p-4">Total Gross Sales</th>
                <th className="p-4">Total Commission</th>
                <th className="p-4">Pending Payout</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <tr
                    key={partner.id}
                    className="hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-bold text-white text-sm hover:text-blue-400 transition-colors">
                        {partner.agencyName}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">Owner: {partner.name}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-slate-200">{partner.businessType}</span>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {partner.listingsCount} active listings
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 font-medium">{partner.city}</td>
                    <td className="p-4">
                      {rateEditId === partner.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.5"
                            placeholder="%"
                            defaultValue={partner.commissionRate * 100}
                            onChange={(e) => setNewRateValue(e.target.value)}
                            className="w-16 px-1.5 py-0.5 rounded bg-slate-950 border border-blue-500 text-white font-mono text-xs"
                          />
                          <button
                            onClick={() => handleSaveCommissionRate(partner.id)}
                            className="p-1 rounded bg-blue-600 text-white hover:bg-blue-500"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 font-mono font-bold text-amber-400">
                          <span>{(partner.commissionRate * 100).toFixed(1)}%</span>
                          <button
                            onClick={() => {
                              setRateEditId(partner.id);
                              setNewRateValue(String(partner.commissionRate * 100));
                            }}
                            className="text-slate-500 hover:text-white p-0.5"
                            title="Edit Commission Rate"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                      {formatPKR(partner.totalSales)}
                    </td>
                    <td className="p-4 font-mono font-bold text-slate-200">
                      {formatPKR(partner.totalCommissionEarned)}
                    </td>
                    <td className="p-4">
                      {partner.pendingPayout > 0 ? (
                        <div>
                          <div className="font-mono font-bold text-amber-400">
                            {formatPKR(partner.pendingPayout)}
                          </div>
                          <button
                            onClick={() => setPayoutPartner(partner)}
                            className="mt-1 px-2 py-0.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 text-[10px] font-bold cursor-pointer"
                          >
                            Mark as Paid
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-mono">Settled</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          partner.status === "Active"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : partner.status === "Inactive"
                            ? "bg-slate-800 text-slate-400 border-slate-700"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {partner.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedPartner(partner)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border border-blue-500/30 font-bold transition-colors cursor-pointer"
                      >
                        Audit Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500 text-xs">
                    No partners found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Audit & Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">
                  Verified Partner ID #{selectedPartner.id}
                </span>
                <h3 className="font-bold text-white text-base">{selectedPartner.agencyName}</h3>
                <p className="text-xs text-slate-400">
                  {selectedPartner.businessType} • {selectedPartner.city}, Pakistan
                </p>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Authorized Contact</span>
                <div className="font-bold text-white">{selectedPartner.name}</div>
                <div className="text-slate-400 font-mono">{selectedPartner.phone}</div>
                <div className="text-slate-400 truncate">{selectedPartner.email}</div>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Financial Overview</span>
                <div className="font-mono text-emerald-400 font-bold text-sm">
                  {formatPKR(selectedPartner.totalSales)}
                </div>
                <div className="text-slate-400 text-[11px]">
                  Earned: {formatPKR(selectedPartner.totalCommissionEarned)}
                </div>
                <div className="text-amber-400 text-[11px]">
                  Pending: {formatPKR(selectedPartner.pendingPayout)}
                </div>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Partnership Status:</span>
                <span className="font-bold text-emerald-400">{selectedPartner.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Agreed Platform Commission Rate:</span>
                <span className="font-mono font-bold text-amber-400">
                  {(selectedPartner.commissionRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Listings in Catalog:</span>
                <span className="font-bold text-white">{selectedPartner.listingsCount} Listings</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Closed Transactions:</span>
                <span className="font-bold text-white">{selectedPartner.closedDealsCount} Deals</span>
              </div>
              <div className="flex justify-between border-t border-slate-800/80 pt-2">
                <span className="text-slate-400">Joined Network:</span>
                <span className="font-mono text-slate-300">{formatDate(selectedPartner.joinedDate)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedPartner(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 font-semibold hover:bg-slate-700"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settle Commission Payout Modal */}
      {payoutPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">Settle Commission Payout</h3>
                <p className="text-xs text-slate-400">{payoutPartner.agencyName}</p>
              </div>
              <button
                onClick={() => setPayoutPartner(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {payoutSuccessMsg ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{payoutSuccessMsg}</span>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-slate-400">Total Pending Payout Balance:</div>
                  <div className="font-mono font-black text-2xl text-emerald-400">
                    {formatPKR(payoutPartner.pendingPayout)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Payment will be transferred via Bank Pay Order or Online IBFT to {payoutPartner.agencyName}.
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => setPayoutPartner(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProcessPayout}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 cursor-pointer"
                  >
                    Confirm & Settle Payout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
