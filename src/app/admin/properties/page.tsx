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
  Download,
  Printer,
  History,
  CheckSquare,
  Square,
  SlidersHorizontal,
  ExternalLink,
  Upload,
} from "lucide-react";
import { INITIAL_PROPERTIES, PropertyItem } from "@/lib/firebase/admin-service";
import { formatPKR, formatDate } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<PropertyItem[]>(INITIAL_PROPERTIES);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000000000);

  // Selection for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyItem | null>(null);
  const [activityLogProperty, setActivityLogProperty] = useState<PropertyItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    city: "Lahore",
    location: "",
    bedrooms: "4",
    bathrooms: "5",
    area: "",
    partner: "Al-Madina Estate & Builders",
    description: "",
    status: "Active" as "Active" | "Pending Approval" | "Sold" | "Inactive",
    images: "",
  });

  const partnerOptions = [
    "Al-Madina Estate & Builders",
    "Capital Heights Realtors",
    "Rawal Estate Network",
    "New Partner Submissions",
  ];

  const cityOptions = ["Lahore", "Islamabad", "Rawalpindi", "Karachi", "Faisalabad"];

  // Filtered Properties
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      const matchesSearch =
        !searchQuery ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === "all" || prop.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchesCity =
        selectedCity === "all" || prop.city.toLowerCase() === selectedCity.toLowerCase();

      const matchesPrice =
        prop.price >= minPrice && (maxPrice === 0 || prop.price <= maxPrice);

      return matchesSearch && matchesStatus && matchesCity && matchesPrice;
    });
  }, [properties, searchQuery, selectedStatus, selectedCity, minPrice, maxPrice]);

  // Bulk Selection Handlers
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProperties.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProperties.map((p) => p.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (newStatus: "Active" | "Sold" | "Inactive") => {
    if (!selectedIds.length) return;
    setProperties((prev) =>
      prev.map((prop) =>
        selectedIds.includes(prop.id)
          ? {
              ...prop,
              status: newStatus,
              activityLog: [
                ...(prop.activityLog || []),
                {
                  action: `Status changed to ${newStatus}`,
                  timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
                  by: "superAdmin",
                },
              ],
            }
          : prop
      )
    );
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;
    if (confirm(`Are you sure you want to delete ${selectedIds.length} properties?`)) {
      setProperties((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    }
  };

  // Form Open / Submit
  const handleOpenAddModal = () => {
    setEditingProperty(null);
    setFormData({
      title: "",
      price: "",
      city: "Lahore",
      location: "",
      bedrooms: "4",
      bathrooms: "5",
      area: "",
      partner: partnerOptions[0],
      description: "",
      status: "Active",
      images: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prop: PropertyItem) => {
    setEditingProperty(prop);
    setFormData({
      title: prop.title,
      price: String(prop.price),
      city: prop.city,
      location: prop.location,
      bedrooms: String(prop.bedrooms),
      bathrooms: String(prop.bathrooms),
      area: prop.area,
      partner: prop.partner,
      description: prop.description,
      status: prop.status,
      images: (prop.images || []).join(", "),
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setFormData((prev) => {
            const current = prev.images ? prev.images.split(",").map((s) => s.trim()).filter(Boolean) : [];
            return {
              ...prev,
              images: [...current, result].join(", "),
            };
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Please fill in required fields.");
      return;
    }

    const priceNum = Number(formData.price) || 0;
    const imagesArr = formData.images
      ? formData.images.split(",").map((s) => s.trim()).filter(Boolean)
      : ["/images/properties/default.jpg"];

    if (editingProperty) {
      // Edit
      setProperties((prev) =>
        prev.map((item) =>
          item.id === editingProperty.id
            ? {
                ...item,
                title: formData.title,
                price: priceNum,
                city: formData.city,
                location: formData.location || `${formData.city}, Pakistan`,
                bedrooms: Number(formData.bedrooms) || 0,
                bathrooms: Number(formData.bathrooms) || 0,
                area: formData.area || "1 Kanal",
                partner: formData.partner,
                description: formData.description,
                status: formData.status,
                images: imagesArr,
                featuredImage: imagesArr[0] || item.featuredImage,
                activityLog: [
                  ...(item.activityLog || []),
                  {
                    action: "Property specifications updated",
                    timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
                    by: "superAdmin",
                  },
                ],
              }
            : item
        )
      );
    } else {
      // Add
      const newId = `PROP-${Math.floor(100 + Math.random() * 900)}`;
      const newProp: PropertyItem = {
        id: newId,
        title: formData.title,
        price: priceNum,
        city: formData.city,
        location: formData.location || `${formData.city}, Pakistan`,
        status: formData.status,
        partner: formData.partner,
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        area: formData.area || "1 Kanal",
        views: 0,
        inquiries: 0,
        description: formData.description,
        images: imagesArr,
        featuredImage: imagesArr[0] || "/images/properties/default.jpg",
        createdAt: new Date().toISOString().split("T")[0],
        activityLog: [
          {
            action: "Property created and listed",
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
            by: "superAdmin",
          },
        ],
      };
      const updated = [newProp, ...properties];
      setProperties(updated);
      try {
        if (typeof window !== "undefined") {
          const existingRaw = localStorage.getItem("watech_custom_properties_v1");
          const existing = existingRaw ? JSON.parse(existingRaw) : [];
          localStorage.setItem(
            "watech_custom_properties_v1",
            JSON.stringify([
              {
                id: newProp.id,
                title: newProp.title,
                price: newProp.price,
                city: newProp.city,
                area: newProp.area,
                type: "House",
                beds: newProp.bedrooms,
                baths: newProp.bathrooms,
                image: newProp.featuredImage,
                location: newProp.location,
                description: newProp.description,
                featured: true,
                partnerPhone: "923270831470",
                status: "Available",
                createdAt: new Date().toISOString().substring(0, 10),
                isDemo: false,
              },
              ...existing.filter((p: any) => p.id !== newProp.id),
            ])
          );
        }
      } catch (err) {
        console.warn("Failed to persist property to localStorage", err);
      }
    }

    setIsModalOpen(false);
  };

  const handleDeleteSingle = (id: string) => {
    if (confirm("Are you sure you want to delete this property listing?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleExportCSV = () => {
    exportToCSV(
      "watech_properties",
      filteredProperties.map((p) => ({
        id: p.id,
        title: p.title,
        price: p.price,
        city: p.city,
        location: p.location,
        status: p.status,
        partner: p.partner,
        bedrooms: p.bedrooms,
        bathrooms: p.bathrooms,
        area: p.area,
        views: p.views,
        inquiries: p.inquiries,
        createdAt: p.createdAt,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-500 font-mono">
              Sector Management
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {properties.length} Total Listings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Properties & Real Estate
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Control residential, commercial, plots, and luxury farmhouse listings across Pakistan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => printOrExportPDF("Watech Properties Report")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            title="Print / PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Property</span>
          </button>
        </div>
      </div>

      {/* Feature Guide & Rahnumai Banner */}
      <div className="bg-slate-900/90 border border-blue-500/20 p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-500/20 text-blue-400">
              <Building2 className="w-4 h-4" />
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Properties Module Rahnumai (How It Works):
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Real Price System
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">1. Asal Qemat (Real Prices):</span>
            <p className="text-[11px] leading-relaxed">
              Jab aap kisi ghar ya plot ki pakki demand confirm kar lein to yahan price save karein. Agar price '0' ho to website par &quot;Demand on Consultation&quot; display hoga.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">2. Registry &amp; Intiqal Check:</span>
            <p className="text-[11px] leading-relaxed">
              Koshish karein sirf wohi deals active karein jinki patwari fard ya housing authority NOC verified ho taake client trust 100% barkarar rahe.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
            <span className="font-bold text-slate-200">3. Direct Deal Status:</span>
            <p className="text-[11px] leading-relaxed">
              Jab koi plot ya ghar bikk jaye to uska status &quot;Sold&quot; mark kar dein aur &apos;/admin/orders&apos; mein uski final sale price aur commission ledger mein darj karein.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, city, partner, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending approval">Pending Approval</option>
              <option value="sold">Sold</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* City Dropdown */}
          <div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Cities</option>
              {cityOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider / Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">Max: {formatPKR(maxPrice)}</span>
            <input
              type="range"
              min="0"
              max="10000000000"
              step="10000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Bulk Actions Toolbar (Visible when rows selected) */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 text-blue-400 font-bold">
              <CheckSquare className="w-4 h-4" />
              <span>{selectedIds.length} properties selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Set Status:</span>
              <button
                onClick={() => handleBulkStatusChange("Active")}
                className="px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 font-semibold cursor-pointer"
              >
                Mark Active
              </button>
              <button
                onClick={() => handleBulkStatusChange("Sold")}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold cursor-pointer"
              >
                Mark Sold
              </button>
              <button
                onClick={() => handleBulkStatusChange("Inactive")}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 font-semibold cursor-pointer"
              >
                Mark Inactive
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30 hover:bg-rose-600/30 font-semibold cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Properties Table Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-4 w-10 text-center">
                  <button
                    onClick={toggleSelectAll}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    {selectedIds.length === filteredProperties.length &&
                    filteredProperties.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Property Title & Specs</th>
                <th className="p-4">Price (PKR)</th>
                <th className="p-4">City / Location</th>
                <th className="p-4">Partner Agency</th>
                <th className="p-4">Traffic</th>
                <th className="p-4">Status</th>
                <th className="p-4">Created Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((prop) => {
                  const isSelected = selectedIds.includes(prop.id);
                  return (
                    <tr
                      key={prop.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? "bg-blue-600/10" : ""
                      }`}
                    >
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleSelectRow(prop.id)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-blue-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white text-sm hover:text-blue-400 transition-colors">
                          {prop.title}
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-mono">
                          <span>{prop.area}</span>
                          <span>•</span>
                          <span>{prop.bedrooms} Beds</span>
                          <span>•</span>
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                        {prop.price && prop.price > 0 ? (
                          formatPKR(prop.price)
                        ) : (
                          <span className="text-xs text-slate-400 font-sans font-medium italic">
                            Demand on Request
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-200">{prop.city}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[180px]">
                          {prop.location}
                        </div>
                      </td>
                      <td className="p-4 text-slate-300 font-medium">{prop.partner}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                          <span title="Views" className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-slate-500" />
                            {prop.views}
                          </span>
                          <span>•</span>
                          <span title="Inquiries" className="text-blue-400 font-bold">
                            {prop.inquiries} inq
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            prop.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : prop.status === "Pending Approval"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : prop.status === "Sold"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : "bg-slate-800 text-slate-400 border-slate-700"
                          }`}
                        >
                          {prop.status}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[11px]">
                        {formatDate(prop.createdAt)}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActivityLogProperty(prop)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-colors"
                            title="View Activity Log"
                          >
                            <History className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(prop)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                            title="Edit Property"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSingle(prop.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500 text-xs">
                    No properties match your current search and filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Property Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">
                  {editingProperty ? "Edit Property Listing" : "Add New Property Listing"}
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in the complete property specifications, pricing, and partner attribution.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1 Kanal Luxury Modern Villa"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    Real Demand Price in PKR (Optional)
                  </label>
                  <p className="text-[10px] text-slate-400 mb-1 leading-tight">
                    Yahan asal price enter karein. Agar khali chhoringe to user portal par &quot;Demand on Consultation&quot; display hoga.
                  </p>
                  <input
                    type="number"
                    placeholder="e.g. 85000000 (ya khali chhor dein)"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">City *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    {cityOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Area / Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Kanal or 4,500 Sq Ft"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Address / Location Details</label>
                <input
                  type="text"
                  placeholder="e.g. DHA Phase 6, Sector C, Lahore"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Partner Agency</label>
                  <select
                    value={formData.partner}
                    onChange={(e) => setFormData({ ...formData, partner: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    {partnerOptions.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Listing Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "Active" | "Pending Approval" | "Sold" | "Inactive",
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Sold">Sold</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-bold">
                    Property Photos & Media
                  </label>
                  <label className="cursor-pointer text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="/images/properties/prop1.jpg, /images/properties/prop2.jpg"
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 text-xs font-mono"
                />
                {formData.images && (
                  <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                    {formData.images
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((imgUrl, idx) => (
                        <div key={idx} className="relative w-12 h-12 rounded-lg border border-slate-700 overflow-hidden shrink-0 bg-slate-950">
                          <img src={imgUrl} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Architectural specs, Spanish tiles, fittings, solar installation details..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  {editingProperty ? "Save Changes" : "Publish Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Activity Log Drawer / Modal */}
      {activityLogProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-sm">Activity & Audit Trail</h3>
                <p className="text-[11px] text-slate-400 truncate max-w-[280px]">
                  {activityLogProperty.title}
                </p>
              </div>
              <button
                onClick={() => setActivityLogProperty(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {(activityLogProperty.activityLog || [
                {
                  action: "Listing created",
                  timestamp: activityLogProperty.createdAt,
                  by: "superAdmin",
                },
              ]).map((log, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-200">{log.action}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {log.timestamp} • By {log.by}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800 text-right">
              <button
                onClick={() => setActivityLogProperty(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 font-semibold hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
