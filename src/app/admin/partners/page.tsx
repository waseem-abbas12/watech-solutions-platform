"use client";

import React, { useState } from "react";
import {
  Handshake,
  Search,
  CheckCircle2,
  Clock,
  X,
  Building2,
  DollarSign,
  TrendingUp,
} from "lucide-react";

interface PartnerRow {
  id: string;
  name: string;
  businessType: string;
  agencyName: string;
  city: string;
  commissionRate: number; // e.g. 0.10
  totalSalesPKR: number;
  totalCommissionEarnedPKR: number;
  pendingPayoutPKR: number;
  joinedDate: string;
  listingsCount: number;
  closedDealsCount: number;
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerRow[]>([
    {
      id: "PTR-01",
      name: "Malik Muhammad Asif",
      businessType: "Real Estate Agent",
      agencyName: "Al-Madina Estate & Builders",
      city: "Lahore",
      commissionRate: 0.10,
      totalSalesPKR: 85000000,
      totalCommissionEarnedPKR: 850000,
      pendingPayoutPKR: 150000, // Has pending payout
      joinedDate: "2026-08-15",
      listingsCount: 4,
      closedDealsCount: 2,
    },
    {
      id: "PTR-02",
      name: "Ustad Ghulam Rasool",
      businessType: "Furniture Manufacturer",
      agencyName: "Chiniot Royal Woodcraft",
      city: "Chiniot",
      commissionRate: 0.10,
      totalSalesPKR: 630000,
      totalCommissionEarnedPKR: 63000,
      pendingPayoutPKR: 0,
      joinedDate: "2026-08-20",
      listingsCount: 6,
      closedDealsCount: 2,
    },
    {
      id: "PTR-03",
      name: "Farhan Qureshi",
      businessType: "Event Manager",
      agencyName: "Royal Palm Hospitality",
      city: "Lahore",
      commissionRate: 0.10,
      totalSalesPKR: 1800000,
      totalCommissionEarnedPKR: 180000,
      pendingPayoutPKR: 180000,
      joinedDate: "2026-08-28",
      listingsCount: 3,
      closedDealsCount: 1,
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<PartnerRow | null>(null);

  const handleMarkPayoutPaid = (id: string) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, pendingPayoutPKR: 0 } : p))
    );
    if (selectedPartner && selectedPartner.id === id) {
      setSelectedPartner({ ...selectedPartner, pendingPayoutPKR: 0 });
    }
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

  const filtered = partners.filter((p) => {
    return (
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.agencyName.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C] font-mono">
            Ecosystem Partners
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Partner Accounts & Payouts
          </h1>
          <p className="text-xs text-slate-400">
            Monitor partner inventory volumes, track earned commissions, and execute commission settlements.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search partner name, agency, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Partner & Agency</th>
                <th className="py-4 px-4">Business Type</th>
                <th className="py-4 px-4">Commission Rate</th>
                <th className="py-4 px-4">Total Sales</th>
                <th className="py-4 px-4">Commission Earned</th>
                <th className="py-4 px-4">Pending Payout</th>
                <th className="py-4 px-4">Joined Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    idx % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"
                  }`}
                >
                  <td className="py-4 px-6 font-bold text-white">
                    <div>{p.agencyName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {p.name} ({p.city})
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {p.businessType}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-white">
                    {(p.commissionRate * 100).toFixed(0)}%
                  </td>
                  <td className="py-4 px-4 font-black text-white">{formatPKR(p.totalSalesPKR)}</td>
                  <td className="py-4 px-4 font-black text-emerald-400">
                    {formatPKR(p.totalCommissionEarnedPKR)}
                  </td>
                  <td className="py-4 px-4">
                    {p.pendingPayoutPKR > 0 ? (
                      <span className="font-black text-orange-400">
                        {formatPKR(p.pendingPayoutPKR)}
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Settled
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-slate-400 font-mono">{p.joinedDate}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedPartner(p)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition-colors font-semibold text-[11px]"
                    >
                      Audit Ledger
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedPartner.agencyName}</h3>
                <p className="text-xs text-slate-400">
                  {selectedPartner.name} · {selectedPartner.city} ({selectedPartner.businessType})
                </p>
              </div>
              <button
                onClick={() => setSelectedPartner(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 font-bold uppercase">Active Listings</span>
                <div className="text-2xl font-black text-white mt-1">
                  {selectedPartner.listingsCount} Items
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 font-bold uppercase">Closed Deals</span>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {selectedPartner.closedDealsCount} Transactions
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-orange-950/20 border border-orange-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-orange-400">
                  Pending Payout Due
                </span>
                <div className="text-2xl font-black text-white mt-0.5">
                  {formatPKR(selectedPartner.pendingPayoutPKR)}
                </div>
              </div>
              {selectedPartner.pendingPayoutPKR > 0 ? (
                <button
                  onClick={() => handleMarkPayoutPaid(selectedPartner.id)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Mark Payout as Paid
                </button>
              ) : (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> All Dues Cleared
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
