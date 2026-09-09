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
  Sliders,
  Bell,
  ShieldAlert,
  Globe,
  Share2,
  X,
  UserCheck,
} from "lucide-react";
import {
  INITIAL_SETTINGS,
  INITIAL_ADMIN_USERS,
  SettingsConfig,
  AdminUserItem,
} from "@/lib/firebase/admin-service";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "social" | "commission" | "email" | "notifications" | "backup" | "admins"
  >("general");

  const [settings, setSettings] = useState<SettingsConfig>(INITIAL_SETTINGS);
  const [adminUsers, setAdminUsers] = useState<AdminUserItem[]>(INITIAL_ADMIN_USERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Admin Modal
  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [newAdminForm, setNewAdminForm] = useState({
    name: "",
    email: "",
    role: "admin" as "superAdmin" | "admin" | "manager" | "support",
    canCreate: true,
    canEdit: true,
    canDelete: false,
    canExport: true,
    canPayout: false,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("General platform settings and company details saved successfully.");
  };

  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Social media profiles updated.");
  };

  const handleSaveCommission = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Commission rules and volume discount tiers updated.");
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("SMTP server configuration and email templates saved.");
  };

  // JSON Database Backup Export
  const handleExportJSONBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      platform: "Watech Solutions Multi-Sector Platform",
      settings,
      adminUsers,
    };
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", jsonStr);
    dlAnchor.setAttribute("download", `watech_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    document.body.removeChild(dlAnchor);
    showToast("Full database JSON backup generated and downloaded.");
  };

  // Add Admin User
  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminForm.email || !newAdminForm.name) {
      alert("Name and email are required.");
      return;
    }

    const newAdmin: AdminUserItem = {
      id: `ADM-${Math.floor(10 + Math.random() * 90)}`,
      name: newAdminForm.name,
      email: newAdminForm.email,
      role: newAdminForm.role,
      permissions: {
        canCreate: newAdminForm.canCreate,
        canEdit: newAdminForm.canEdit,
        canDelete: newAdminForm.role === "superAdmin" ? true : newAdminForm.canDelete,
        canExport: newAdminForm.canExport,
        canPayout: newAdminForm.role === "superAdmin" ? true : newAdminForm.canPayout,
        canManageAdmins: newAdminForm.role === "superAdmin",
      },
      createdAt: new Date().toISOString().split("T")[0],
    };

    setAdminUsers([...adminUsers, newAdmin]);
    setIsAddAdminOpen(false);
    showToast(`Administrator account for ${newAdmin.name} created.`);
  };

  const handleDeleteAdmin = (id: string) => {
    if (adminUsers.length <= 1) {
      alert("At least one Super Administrator account must remain active.");
      return;
    }
    if (confirm("Are you sure you want to revoke this administrator's access?")) {
      setAdminUsers(adminUsers.filter((u) => u.id !== id));
      showToast("Admin account revoked.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">
            Platform Configuration
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            System Settings & Administration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Control platform identity, commission tiers, email templates, backup exports, and admin roles.
          </p>
        </div>

        {/* Maintenance Mode Toggle Badge */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
          <span className="text-xs text-slate-300 font-semibold px-2">Maintenance Mode:</span>
          <button
            onClick={() => {
              setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode });
              showToast(
                settings.maintenanceMode
                  ? "Platform is now LIVE for all users."
                  : "Platform maintenance mode ENABLED. Public marketplace access paused."
              );
            }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              settings.maintenanceMode
                ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {settings.maintenanceMode ? "Enabled (Offline)" : "Disabled (Live)"}
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 p-3 rounded-2xl text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex flex-wrap gap-1 text-xs font-semibold">
        {(
          [
            { id: "general", label: "General & Branding", icon: Settings },
            { id: "social", label: "Social Media Links", icon: Share2 },
            { id: "commission", label: "Commission & Tiers", icon: Percent },
            { id: "email", label: "SMTP & Email Templates", icon: Mail },
            { id: "notifications", label: "Alert Toggles", icon: Bell },
            { id: "backup", label: "Database JSON Backup", icon: Download },
            { id: "admins", label: "Admin RBAC Users", icon: ShieldCheck },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: General & Branding */}
      {activeTab === "general" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            General Business Identity
          </h3>
          <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Company Name</label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Brand Tagline</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Official Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Official Contact Phone (WhatsApp)</label>
                <input
                  type="text"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-bold mb-1">Physical Office Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save General Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Social Links */}
      {activeTab === "social" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Official Social Media Handles
          </h3>
          <form onSubmit={handleSaveSocial} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={settings.socialLinks.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={settings.socialLinks.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">YouTube Channel</label>
                <input
                  type="text"
                  value={settings.socialLinks.youtube}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">TikTok Account</label>
                <input
                  type="text"
                  value={settings.socialLinks.tiktok}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, tiktok: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">LinkedIn Company</label>
                <input
                  type="text"
                  value={settings.socialLinks.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Social Handles</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Commission & Tiers */}
      {activeTab === "commission" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Platform Commission Policy & Volume Tiers
          </h3>
          <form onSubmit={handleSaveCommission} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1">
                Default Standard Commission Rate (%)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  value={settings.defaultCommissionRate}
                  onChange={(e) =>
                    setSettings({ ...settings, defaultCommissionRate: Number(e.target.value) })
                  }
                  className="w-32 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono font-bold"
                />
                <span className="text-slate-400 font-semibold">% applied on new partner enrollments</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="block text-slate-300 font-bold">
                Volume-Based Partner Commission Discounts (Tiered Rates)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {settings.commissionTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1"
                  >
                    <div className="text-slate-400 text-[11px] font-bold uppercase">
                      Tier {idx + 1}
                    </div>
                    <div className="text-sm font-bold text-white">
                      From {tier.minDeals} Deals closed
                    </div>
                    <div className="text-emerald-400 font-mono font-bold">{tier.rate}% platform fee</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Commission Rules</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: SMTP & Email */}
      {activeTab === "email" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            SMTP Server & Notification Dispatcher
          </h3>
          <form onSubmit={handleSaveEmail} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">SMTP Host</label>
                <input
                  type="text"
                  value={settings.emailSettings.smtpHost}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailSettings: { ...settings.emailSettings, smtpHost: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">SMTP Port</label>
                <input
                  type="number"
                  value={settings.emailSettings.smtpPort}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailSettings: { ...settings.emailSettings, smtpPort: Number(e.target.value) },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">SMTP Username / User</label>
                <input
                  type="text"
                  value={settings.emailSettings.smtpUser}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailSettings: { ...settings.emailSettings, smtpUser: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Sender Name</label>
                <input
                  type="text"
                  value={settings.emailSettings.senderName}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      emailSettings: { ...settings.emailSettings, senderName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Email Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 5: Notification Toggles */}
      {activeTab === "notifications" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Real-Time Alert Channels
          </h3>
          <div className="space-y-3 text-xs">
            {[
              {
                id: "newInquiry",
                label: "Customer Inquiries",
                desc: "Send instant bell alert when new lead arrives for property, furniture, or events.",
                active: settings.notifications.newInquiry,
              },
              {
                id: "newOrder",
                label: "New Deal Transactions",
                desc: "Alert administrators when a client confirms deal deposit or order checkout.",
                active: settings.notifications.newOrder,
              },
              {
                id: "lowStock",
                label: "Critical Low Stock Alerts",
                desc: "Flag warnings when Chinioti furniture inventory falls below 5 items.",
                active: settings.notifications.lowStock,
              },
              {
                id: "partnerRegistration",
                label: "New Partner Signups",
                desc: "Notify superAdmin when a broker or craftsman requests partner verification.",
                active: settings.notifications.partnerRegistration,
              },
            ].map((n) => (
              <div
                key={n.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800"
              >
                <div>
                  <div className="font-bold text-white">{n.label}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{n.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={n.active}
                  onChange={() => {
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [n.id]: !n.active,
                      },
                    });
                    showToast(`Notification preference for ${n.label} updated.`);
                  }}
                  className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Backup */}
      {activeTab === "backup" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Database Backup & Snapshots
          </h3>
          <p className="text-xs text-slate-400">
            Export a full JSON snapshot of all system collections, configurations, and administrative accounts.
          </p>
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileJson className="w-10 h-10 text-amber-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Full Platform JSON Snapshot</div>
                <div className="text-xs text-slate-400">Includes Firestore schemas, partners, listings, and orders.</div>
              </div>
            </div>
            <button
              onClick={handleExportJSONBackup}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/20 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON Backup</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 7: Admin RBAC Users */}
      {activeTab === "admins" && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Admin Roles & Granular Permissions
              </h3>
              <p className="text-xs text-slate-400">
                Only Super Administrator can manage team access and assign roles.
              </p>
            </div>
            <button
              onClick={() => setIsAddAdminOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Admin Account</span>
            </button>
          </div>

          <div className="space-y-3">
            {adminUsers.map((user) => (
              <div
                key={user.id}
                className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{user.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        user.role === "superAdmin"
                          ? "bg-blue-600/20 text-blue-400 border-blue-500/30"
                          : user.role === "admin"
                          ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                          : "bg-purple-600/20 text-purple-400 border-purple-500/30"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div className="text-slate-400 font-mono mt-0.5">{user.email}</div>
                  <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mt-2 font-mono">
                    <span>Create: {user.permissions.canCreate ? "✓" : "✗"}</span>
                    <span>•</span>
                    <span>Edit: {user.permissions.canEdit ? "✓" : "✗"}</span>
                    <span>•</span>
                    <span>Delete: {user.permissions.canDelete ? "✓" : "✗"}</span>
                    <span>•</span>
                    <span>Payout: {user.permissions.canPayout ? "✓" : "✗"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {user.role !== "superAdmin" && (
                    <button
                      onClick={() => handleDeleteAdmin(user.id)}
                      className="p-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Revoke Admin Access"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      {isAddAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Add Administrator Account</h3>
              <button
                onClick={() => setIsAddAdminOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asim Raza"
                  value={newAdminForm.name}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Official Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="asim@watechsolutions.com"
                  value={newAdminForm.email}
                  onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Role Hierarchy</label>
                <select
                  value={newAdminForm.role}
                  onChange={(e) =>
                    setNewAdminForm({
                      ...newAdminForm,
                      role: e.target.value as "superAdmin" | "admin" | "manager" | "support",
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="admin">Admin (All operations except admin management)</option>
                  <option value="manager">Manager (Reports, orders, listings edit)</option>
                  <option value="support">Support (View only)</option>
                  <option value="superAdmin">SuperAdmin (Full control)</option>
                </select>
              </div>

              {/* Granular Permissions Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="block text-slate-400 font-bold text-[11px] uppercase">
                  Granular Permissions
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAdminForm.canCreate}
                      onChange={(e) =>
                        setNewAdminForm({ ...newAdminForm, canCreate: e.target.checked })
                      }
                      className="accent-blue-600 rounded"
                    />
                    <span>Can Create</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAdminForm.canEdit}
                      onChange={(e) =>
                        setNewAdminForm({ ...newAdminForm, canEdit: e.target.checked })
                      }
                      className="accent-blue-600 rounded"
                    />
                    <span>Can Edit</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAdminForm.canDelete}
                      onChange={(e) =>
                        setNewAdminForm({ ...newAdminForm, canDelete: e.target.checked })
                      }
                      className="accent-blue-600 rounded"
                    />
                    <span>Can Delete</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newAdminForm.canPayout}
                      onChange={(e) =>
                        setNewAdminForm({ ...newAdminForm, canPayout: e.target.checked })
                      }
                      className="accent-blue-600 rounded"
                    />
                    <span>Can Settle Payouts</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddAdminOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
