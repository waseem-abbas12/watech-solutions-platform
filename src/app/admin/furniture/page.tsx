"use client";

import React, { useState, useMemo } from "react";
import {
  Armchair,
  Search,
  Plus,
  Edit3,
  Trash2,
  AlertTriangle,
  PlusCircle,
  MinusCircle,
  X,
  Trees,
  CheckCircle2,
  Download,
  Printer,
  CheckSquare,
  Square,
  SlidersHorizontal,
  Layers,
  ArrowUpDown,
} from "lucide-react";
import { INITIAL_FURNITURE, FurnitureItem } from "@/lib/firebase/admin-service";
import { formatPKR, formatDate, getStockStatus } from "@/lib/utils/formatters";
import { exportToCSV, printOrExportPDF } from "@/lib/utils/export";

export default function AdminFurniturePage() {
  const [furniture, setFurniture] = useState<FurnitureItem[]>(INITIAL_FURNITURE);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWood, setSelectedWood] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(10000000);

  // Selection for Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FurnitureItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    woodType: "Sheesham" as "Sheesham" | "Teak" | "Rosewood" | "Walnut",
    category: "Bed" as "Sofa" | "Bed" | "Dining" | "Cabinet" | "Decor",
    price: "",
    stockQuantity: "5",
    supplier: "Chiniot Royal Woodcraft",
    dimensions: "",
    color: "",
    description: "",
    images: "",
  });

  const woodTypes = ["Sheesham", "Teak", "Rosewood", "Walnut"];
  const categories = ["Sofa", "Bed", "Dining", "Cabinet", "Decor"];

  // Filtered List
  const filteredFurniture = useMemo(() => {
    return furniture.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dimensions.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesWood =
        selectedWood === "all" || item.woodType.toLowerCase() === selectedWood.toLowerCase();

      const matchesCat =
        selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStatus =
        selectedStatus === "all" || item.status.toLowerCase() === selectedStatus.toLowerCase();

      const matchesPrice = item.price <= maxPrice;

      return matchesSearch && matchesWood && matchesCat && matchesStatus && matchesPrice;
    });
  }, [furniture, searchQuery, selectedWood, selectedCategory, selectedStatus, maxPrice]);

  // Quick Stock Adjustment (+/-)
  const adjustStock = (id: string, delta: number) => {
    setFurniture((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newStock = Math.max(0, item.stockQuantity + delta);
        let newStatus: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock";
        if (newStock === 0) newStatus = "Out of Stock";
        else if (newStock < 5) newStatus = "Low Stock";

        return {
          ...item,
          stockQuantity: newStock,
          status: newStatus,
        };
      })
    );
  };

  // Bulk Actions Handlers
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredFurniture.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredFurniture.map((f) => f.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkStockIncrement = (amount: number) => {
    if (!selectedIds.length) return;
    setFurniture((prev) =>
      prev.map((item) => {
        if (!selectedIds.includes(item.id)) return item;
        const newStock = Math.max(0, item.stockQuantity + amount);
        return {
          ...item,
          stockQuantity: newStock,
          status: newStock === 0 ? "Out of Stock" : newStock < 5 ? "Low Stock" : "In Stock",
        };
      })
    );
  };

  const handleBulkDelete = () => {
    if (!selectedIds.length) return;
    if (confirm(`Are you sure you want to delete ${selectedIds.length} furniture items?`)) {
      setFurniture((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
  };

  // Modal Open/Submit
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      woodType: "Sheesham",
      category: "Bed",
      price: "",
      stockQuantity: "5",
      supplier: "Chiniot Royal Woodcraft",
      dimensions: "",
      color: "Antique Polish",
      description: "",
      images: "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: FurnitureItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      woodType: item.woodType,
      category: item.category,
      price: String(item.price),
      stockQuantity: String(item.stockQuantity),
      supplier: item.supplier,
      dimensions: item.dimensions,
      color: item.color,
      description: item.description,
      images: (item.images || []).join(", "),
    });
    setIsModalOpen(true);
  };

  const handleSaveFurniture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert("Please enter product name and price.");
      return;
    }

    const priceNum = Number(formData.price) || 0;
    const stockNum = Number(formData.stockQuantity) || 0;
    const imagesArr = formData.images
      ? formData.images.split(",").map((s) => s.trim()).filter(Boolean)
      : ["/images/furniture/default.jpg"];

    let calculatedStatus: "In Stock" | "Low Stock" | "Out of Stock" = "In Stock";
    if (stockNum === 0) calculatedStatus = "Out of Stock";
    else if (stockNum < 5) calculatedStatus = "Low Stock";

    if (editingItem) {
      // Edit
      setFurniture((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formData.name,
                woodType: formData.woodType,
                category: formData.category,
                price: priceNum,
                stockQuantity: stockNum,
                supplier: formData.supplier,
                dimensions: formData.dimensions,
                color: formData.color,
                description: formData.description,
                images: imagesArr,
                status: calculatedStatus,
              }
            : item
        )
      );
    } else {
      // Add
      const newId = `FURN-${Math.floor(200 + Math.random() * 800)}`;
      const newItem: FurnitureItem = {
        id: newId,
        name: formData.name,
        woodType: formData.woodType,
        category: formData.category,
        price: priceNum,
        stockQuantity: stockNum,
        supplier: formData.supplier,
        dimensions: formData.dimensions,
        color: formData.color,
        description: formData.description,
        images: imagesArr,
        status: calculatedStatus,
        views: 0,
        inquiries: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setFurniture([newItem, ...furniture]);
    }

    setIsModalOpen(false);
  };

  const handleDeleteSingle = (id: string) => {
    if (confirm("Are you sure you want to remove this furniture item?")) {
      setFurniture((prev) => prev.filter((item) => item.id !== id));
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleExportCSV = () => {
    exportToCSV(
      "watech_furniture_inventory",
      filteredFurniture.map((f) => ({
        id: f.id,
        name: f.name,
        woodType: f.woodType,
        category: f.category,
        price: f.price,
        stockQuantity: f.stockQuantity,
        supplier: f.supplier,
        dimensions: f.dimensions,
        color: f.color,
        status: f.status,
        views: f.views,
        inquiries: f.inquiries,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 font-mono">
              Sector Management
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {furniture.length} Products in Catalog
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Chinioti Handcrafted Furniture
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time woodcraft stock monitoring, artisan workshops, and price control.
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
            onClick={() => printOrExportPDF("Watech Furniture Inventory")}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Furniture</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Keyword Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search product name, artisan supplier, dimensions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Wood Type */}
          <div>
            <select
              value={selectedWood}
              onChange={(e) => setSelectedWood(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Wood Types</option>
              {woodTypes.map((w) => (
                <option key={w} value={w}>
                  {w} Wood
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">Max: {formatPKR(maxPrice)}</span>
            <input
              type="range"
              min="0"
              max="10000000"
              step="50000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Bulk Actions Toolbar */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs animate-in fade-in">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckSquare className="w-4 h-4" />
              <span>{selectedIds.length} furniture items selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Stock Adjustment:</span>
              <button
                onClick={() => handleBulkStockIncrement(5)}
                className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold cursor-pointer"
              >
                +5 Units
              </button>
              <button
                onClick={() => handleBulkStockIncrement(-5)}
                className="px-2.5 py-1 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30 hover:bg-amber-600/30 font-semibold cursor-pointer"
              >
                -5 Units
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

      {/* Furniture Inventory Grid */}
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
                    {selectedIds.length === filteredFurniture.length &&
                    filteredFurniture.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Product Name & Category</th>
                <th className="p-4">Wood & Polish</th>
                <th className="p-4">Price (PKR)</th>
                <th className="p-4 text-center">Stock Inventory</th>
                <th className="p-4">Supplier / Workshop</th>
                <th className="p-4">Views / Inq</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredFurniture.length > 0 ? (
                filteredFurniture.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  const stockInfo = getStockStatus(item.stockQuantity);

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        item.stockQuantity < 5
                          ? "bg-rose-950/15"
                          : item.stockQuantity < 10
                          ? "bg-amber-950/10"
                          : ""
                      } ${isSelected ? "bg-emerald-600/10" : ""}`}
                    >
                      <td className="p-4 text-center">
                        <button
                          onClick={() => toggleSelectRow(item.id)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-white text-sm hover:text-emerald-400 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[220px]">
                          {item.dimensions}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-slate-200">{item.woodType} Wood</span>
                        <div className="text-[11px] text-slate-500">{item.color}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                        {formatPKR(item.price)}
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
                          <button
                            onClick={() => adjustStock(item.id, -1)}
                            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Decrease Stock"
                          >
                            <MinusCircle className="w-4 h-4" />
                          </button>
                          <span
                            className={`font-mono font-black text-sm px-2 ${
                              item.stockQuantity < 5
                                ? "text-rose-400"
                                : item.stockQuantity < 10
                                ? "text-amber-400"
                                : "text-emerald-400"
                            }`}
                          >
                            {item.stockQuantity}
                          </span>
                          <button
                            onClick={() => adjustStock(item.id, 1)}
                            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Increase Stock"
                          >
                            <PlusCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-slate-300 font-medium">{item.supplier}</td>
                      <td className="p-4 font-mono text-[11px] text-slate-400">
                        <span>{item.views} views</span> •{" "}
                        <span className="text-emerald-400 font-bold">{item.inquiries} inq</span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${stockInfo.badgeClass}`}
                        >
                          {stockInfo.label}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSingle(item.id)}
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
                    No furniture items match your current search and filter settings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Furniture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-white text-base">
                  {editingItem ? "Edit Furniture Product" : "Add Handcrafted Furniture"}
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in artisan wood type, carving specifications, stock count, and workshop origin.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFurniture} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharaja Royal Chinioti Bed Set"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Wood Type *</label>
                  <select
                    value={formData.woodType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        woodType: e.target.value as "Sheesham" | "Teak" | "Rosewood" | "Walnut",
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {woodTypes.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as "Sofa" | "Bed" | "Dining" | "Cabinet" | "Decor",
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Selling Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 345000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Initial Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Polish / Color</label>
                  <input
                    type="text"
                    placeholder="Antique Gold / Dark Rosewood"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Artisan Workshop / Supplier</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Dimensions & Configuration</label>
                <input
                  type="text"
                  placeholder="e.g. King Size 72x78 in with 2 Side Tables & Dressing Table"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description & Foam/Warranty Specs</label>
                <textarea
                  rows={3}
                  placeholder="Master crown relief carvings, seasoned Sheesham wood, 10-year termite warranty..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
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
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  {editingItem ? "Update Product" : "Save to Inventory"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
