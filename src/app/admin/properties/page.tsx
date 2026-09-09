"use client";

import React, { useState, useMemo } from "react";
import {
  Building2,
  Search,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Eye,
} from "lucide-react";

interface PropertyRow {
  id: string;
  title: string;
  price: number;
  city: string;
  location: string;
  status: "Active" | "Pending Approval" | "Sold" | "Inactive";
  agent: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string;
  createdAt: string;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<PropertyRow[]>([
    {
      id: "PROP-101",
      title: "1 Kanal Luxury Modern Villa",
      price: 85000000,
      city: "Lahore",
      location: "DHA Phase 6, Sector C",
      status: "Active",
      agent: "Al-Madina Estate & Builders",
      bedrooms: 5,
      bathrooms: 6,
      area: "1 Kanal (4,500 Sq Ft)",
      description: "Architect-designed brand new bungalow with Spanish tiles and SMEG fittings.",
      createdAt: "2026-09-01",
    },
    {
      id: "PROP-102",
      title: "10 Marla Brand New Designer House",
      price: 42000000,
      city: "Lahore",
      location: "Bahria Town Sector C",
      status: "Active",
      agent: "Al-Madina Estate & Builders",
      bedrooms: 4,
      bathrooms: 5,
      area: "10 Marla (2,250 Sq Ft)",
      description: "Double-unit layout, solid ash wood doors, and Grohe sanitary.",
      createdAt: "2026-09-03",
    },
    {
      id: "PROP-105",
      title: "2 Kanal Farmhouse with Swimming Pool",
      price: 120000000,
      city: "Islamabad",
      location: "Chak Shahzad Farms",
      status: "Pending Approval",
      agent: "New Partner Submissions",
      bedrooms: 6,
      bathrooms: 7,
      area: "2 Kanal",
      description: "Newly listed partner inventory awaiting moderator verification and approval.",
      createdAt: "2026-09-08",
    },
    {
      id: "PROP-103",
      title: "Corner Commercial Plaza Main Boulevard",
      price: 165000000,
      city: "Islamabad",
      location: "Gulberg Greens Main Blvd",
      status: "Active",
      agent: "Capital Heights Realtors",
      bedrooms: 0,
      bathrooms: 4,
      area: "6,000 Sq Ft",
      description: "High-yield commercial plaza with elevator shaft and basement parking.",
      createdAt: "2026-08-25",
    },
    {
      id: "PROP-104",
      title: "5 Marla Residential Ready-to-Build Plot",
      price: 9500000,
      city: "Rawalpindi",
      location: "Bahria Phase 8",
      status: "Sold",
      agent: "Rawal Estate Network",
      bedrooms: 0,
      bathrooms: 0,
      area: "5 Marla",
      description: "Possession plot with paid utility dues on 40ft carpeted road.",
      createdAt: "2026-08-29",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Add/Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    city: "Lahore",
    location: "",
    bedrooms: "4",
    bathrooms: "4",
    area: "10 Marla",
    agent: "Al-Madina Estate & Builders",
    status: "Active" as "Active" | "Pending Approval" | "Sold" | "Inactive",
    description: "",
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.agent.toLowerCase().includes(search.toLowerCase()) ||
        p.location.toLowerCase().includes(search.toLowerCase());
      const matchCity = filterCity === "All" || p.city === filterCity;
      const matchStatus = filterStatus === "All" || p.status === filterStatus;
      return matchSearch && matchCity && matchStatus;
    });
  }, [properties, search, filterCity, filterStatus]);

  const handleToggleStatus = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next =
            p.status === "Pending Approval"
              ? "Active"
              : p.status === "Active"
              ? "Inactive"
              : p.status === "Inactive"
              ? "Active"
              : "Active";
          return { ...p, status: next };
        }
        return p;
      })
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this property listing permanently?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleOpenEdit = (p: PropertyRow) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      price: String(p.price),
      city: p.city,
      location: p.location,
      bedrooms: String(p.bedrooms),
      bathrooms: String(p.bathrooms),
      area: p.area,
      agent: p.agent,
      status: p.status,
      description: p.description,
    });
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      city: "Lahore",
      location: "",
      bedrooms: "4",
      bathrooms: "4",
      area: "10 Marla",
      agent: "Al-Madina Estate & Builders",
      status: "Active",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) return;

    if (editingId) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title: formData.title,
                price: Number(formData.price),
                city: formData.city,
                location: formData.location,
                bedrooms: Number(formData.bedrooms),
                bathrooms: Number(formData.bathrooms),
                area: formData.area,
                agent: formData.agent,
                status: formData.status,
                description: formData.description,
              }
            : p
        )
      );
    } else {
      const newProp: PropertyRow = {
        id: `PROP-${Math.floor(100 + Math.random() * 900)}`,
        title: formData.title,
        price: Number(formData.price),
        city: formData.city,
        location: formData.location,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: formData.area,
        agent: formData.agent,
        status: formData.status,
        description: formData.description,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProperties([newProp, ...properties]);
    }
    setIsModalOpen(false);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 font-mono">
            Sector Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Real Estate Properties
          </h1>
          <p className="text-xs text-slate-400">
            Audit, verify, edit, and approve real estate listings across Pakistan.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search title, agent, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Cities</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Karachi">Karachi</option>
          </select>
        </div>

        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending Approval">Pending Approval</option>
            <option value="Sold">Sold</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Property Title</th>
                <th className="py-4 px-4">Demand Price</th>
                <th className="py-4 px-4">City / Area</th>
                <th className="py-4 px-4">Partner Agent</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Created</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProperties.map((p, idx) => (
                <tr key={p.id} className={idx % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"}>
                  <td className="py-4 px-6 font-bold text-white max-w-xs truncate">
                    {p.title}
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">{p.id}</div>
                  </td>
                  <td className="py-4 px-4 font-black text-blue-400">{formatPKR(p.price)}</td>
                  <td className="py-4 px-4 text-slate-300">
                    <div>{p.city}</div>
                    <div className="text-[10px] text-slate-500">{p.area}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-300 font-medium">{p.agent}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleStatus(p.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-all ${
                        p.status === "Pending Approval"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-emerald-500/20 hover:text-emerald-300"
                          : p.status === "Active"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : p.status === "Sold"
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                      title={p.status === "Pending Approval" ? "Click to Approve Listing" : "Click to toggle status"}
                    >
                      {p.status === "Pending Approval" ? "Approve Listing" : p.status}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-slate-500 font-mono">{p.createdAt}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        title="Edit Property"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Edit Property Listing" : "Add New Property Listing"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Demand Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Karachi">Karachi</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Covered Area</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Sold" | "Inactive" })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Sold">Sold</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1.5">Partner Agent</label>
                <select
                  value={formData.agent}
                  onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Al-Madina Estate & Builders">Al-Madina Estate & Builders</option>
                  <option value="Capital Heights Realtors">Capital Heights Realtors</option>
                  <option value="Rawal Estate Network">Rawal Estate Network</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  {editingId ? "Save Changes" : "Create Property"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
