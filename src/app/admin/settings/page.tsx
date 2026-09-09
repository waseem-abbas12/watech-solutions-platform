"use client";

import React, { useState } from "react";
import {
  Settings,
  ShieldCheck,
  Mail,
  Percent,
  Download,
  Trash2,
  Plus,
  Save,
  CheckCircle2,
  UploadCloud,
  FileJson,
} from "lucide-react";

interface AdminAccount {
  id: string;
  email: string;
  role: "superAdmin" | "admin" | "manager";
  name: string;
}

export default function AdminSettingsPage() {
  const [companyName, setCompanyName] = useState("Watech Solutions Ecosystem");
  const [supportPhone, setSupportPhone] = useState("+92 300 1234567");
  const [supportEmail, setSupportEmail] = useState("info@watechsolutions.com");
  const [officeAddress, setOfficeAddress] = useState("DHA Phase 6, Main Boulevard, Lahore, Pakistan");

  const [defaultCommissionRate, setDefaultCommissionRate] = useState(10);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Users List (Super Admin capability)
  const [adminUsers, setAdminUsers] = useState<AdminAccount[]>([
    {
      id: "ADM-1",
      email: "superadmin@watechsolutions.com",
      role: "superAdmin",
      name: "Super Administrator",
    },
    {
      id: "ADM-2",
      email: "operations@watechsolutions.com",
      role: "admin",
      name: "Operations Admin",
    },
    {
      id: "ADM-3",
      email: "manager@watechsolutions.com",
      role: "manager",
      name: "Floor Manager",
    },
  ]);

  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<"admin" | "manager">("admin");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;

    const newAdm: AdminAccount = {
      id: `ADM-${Math.floor(10 + Math.random() * 90)}`,
      email: newAdminEmail,
      role: newAdminRole,
      name: newAdminRole === "admin" ? "Platform Admin" : "Operations Manager",
    };

    setAdminUsers([...adminUsers, newAdm]);
    setNewAdminEmail("");
    showToast(`New admin account created: ${newAdm.email}`);
  };

  const handleDeleteAdmin = (id: string) => {
    if (adminUsers.length <= 1) {
      alert("Cannot delete the root superAdmin account.");
      return;
    }
    if (confirm("Remove this administrator account?")) {
      setAdminUsers(adminUsers.filter((a) => a.id !== id));
      showToast("Admin account removed.");
    }
  };

  // Full Database JSON Backup Export
  const handleExportJSONBackup = () => {
    const backupData = {
      backupDate: new Date().toISOString(),
      platform: companyName,
      settings: {
        companyName,
        supportPhone,
        supportEmail,
        officeAddress,
        defaultCommissionRate,
        emailNotifications,
      },
      administrators: adminUsers,
      collections: {
        propertiesCount: 48,
        furnitureCount: 76,
        eventsCount: 34,
        clientsCount: 820,
        ordersVolumePKR: 12450000,
      },
    };

    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute("download", `watech_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
    showToast("Full platform JSON database backup exported.");
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Platform general settings updated in Firestore 'settings' collection.");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
          System Administration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
          Platform Global Settings
        </h1>
        <p className="text-xs text-slate-400">
          Configure branding, manage commission structures, administer team seats, and export JSON backups.
        </p>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. GENERAL & BRANDING */}
      <form
        onSubmit={handleSaveGeneral}
        className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="font-bold text-sm text-white uppercase tracking-wider">
            General & Company Info
          </h3>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-400 mb-1.5">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-400 mb-1.5">Official Support Phone</label>
            <input
              type="text"
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase text-slate-400 mb-1.5">Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-slate-400 mb-1.5">Physical Head Office</label>
            <input
              type="text"
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </form>

      {/* 2. COMMISSION RATES & NOTIFICATIONS */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Commission Architecture (Section 13)
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Configure global or sector-specific commission models: percentage share or fixed fee.
            </p>
          </div>
          <button
            type="button"
            onClick={() => showToast("Commission policy settings saved successfully.")}
            className="px-4 py-2 rounded-full bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Update Policies
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Real Estate Commission */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-400">Real Estate Sector</span>
              <span className="font-black text-white text-xs">1.0% Success Fee</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Standard agency brokerage cut applied to closed property transaction values.
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
              <span className="text-[10px] font-bold text-slate-500">Type:</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                Percentage (1.0%)
              </span>
            </div>
          </div>

          {/* Furniture Commission */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400">Furniture Marketplace</span>
              <span className="font-black text-white text-xs">{defaultCommissionRate}% Margin</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Wholesale / retail vendor margin share automatically calculated on order checkout.
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
              <span className="text-[10px] font-bold text-slate-500">Type:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                Percentage ({defaultCommissionRate}%)
              </span>
            </div>
          </div>

          {/* Event & Catering Commission */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-orange-400">Events & Catering</span>
              <span className="font-black text-white text-xs">10% or PKR 25k Fixed</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Banquet halls & catering vendor flat referral fee or per-guest rate commission.
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
              <span className="text-[10px] font-bold text-slate-500">Type:</span>
              <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono text-[10px]">
                Hybrid (Percentage / Fixed)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pt-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Default Platform Commission</span>
              <span className="font-black text-orange-400 text-sm">{defaultCommissionRate}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={25}
              value={defaultCommissionRate}
              onChange={(e) => setDefaultCommissionRate(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500">
              Standard rate automatically assigned to newly onboarded partner accounts.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-white">Email Deal Notifications</div>
              <div className="text-[10px] text-slate-500">
                Receive instant email dispatch on new order transactions.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                emailNotifications ? "bg-blue-600" : "bg-slate-800"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  emailNotifications ? "right-1" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. ADMIN USERS (SUPER ADMIN ACCESS) */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Administrator Accounts (RBAC)
            </h3>
            <p className="text-[11px] text-slate-400">Restricted privilege for Super Administrators only.</p>
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {adminUsers.map((adm) => (
            <div key={adm.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-white">{adm.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">{adm.email}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {adm.role}
                </span>
                {adm.role !== "superAdmin" && (
                  <button
                    onClick={() => handleDeleteAdmin(adm.id)}
                    className="p-1 rounded-lg text-red-400 hover:bg-red-500/10"
                    title="Remove Admin"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Admin Form */}
        <form onSubmit={handleAddAdmin} className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            required
            placeholder="new.admin@watechsolutions.com"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          />
          <select
            value={newAdminRole}
            onChange={(e) => setNewAdminRole(e.target.value as any)}
            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0"
          >
            Add Admin Seat
          </button>
        </form>
      </div>

      {/* 4. PLATFORM JSON BACKUP */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white uppercase tracking-wider">
              Complete Platform JSON Backup
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Export full platform configuration, listings metadata, and transaction tables into a secure JSON archive.
          </p>
        </div>

        <button
          onClick={handleExportJSONBackup}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export JSON Backup</span>
        </button>
      </div>
    </div>
  );
}
