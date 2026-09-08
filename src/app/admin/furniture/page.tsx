"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface FurnitureRow {
  id: string;
  name: string;
  woodType: "Sheesham" | "Teak" | "Rosewood";
  price: number;
  stockQuantity: number;
  supplier: string;
  dimensions: string;
  color: string;
  description: string;
  status: "In Stock" | "Out of Stock";
}

export default function AdminFurniturePage() {
  const [furniture, setFurniture] = useState<FurnitureRow[]>([
    {
      id: "FURN-201",
      name: "Maharaja Royal Chinioti Bed Set",
      woodType: "Sheesham",
      price: 345000,
      stockQuantity: 3, // LOW STOCK (< 5)
      supplier: "Chiniot Royal Woodcraft",
      dimensions: "King Size 72x78 in with 2 Side Tables",
      color: "Antique Gold Polish",
      description: "100% Pure solid seasoned Sheesham with master crown relief carvings.",
      status: "In Stock",
    },
    {
      id: "FURN-202",
      name: "Hand-Carved Floral 7-Seater Sofa Set",
      woodType: "Rosewood",
      price: 285000,
      stockQuantity: 8,
      supplier: "Chiniot Royal Woodcraft",
      dimensions: "3+2+1+1 with Center Table",
      color: "Rosewood Dark Polish",
      description: "Mughal floral carving with Molty Master foam warranty.",
      status: "In Stock",
    },
    {
      id: "FURN-203",
      name: "Antique 8-Seater Luxury Dining Suite",
      woodType: "Teak",
      price: 395000,
      stockQuantity: 2, // LOW STOCK (< 5)
      supplier: "Mian Artisans Chiniot",
      dimensions: "8x4 ft Glass Top Table with 8 Chairs",
      color: "Natural Teak Polyurethane",
      description: "Tempered 12mm glass top with solid teak high-back chairs.",
      status: "In Stock",
    },
    {
      id: "FURN-204",
      name: "Crown Carved Chesterfield Sofa 5-Seater",
      woodType: "Sheesham",
      price: 220000,
      stockQuantity: 0, // OUT OF STOCK
      supplier: "Heritage Woods Chiniot",
      dimensions: "3+1+1",
      color: "Turkish Gold Leaf",
      description: "Chesterfield tufted back with solid Sheesham carvings.",
      status: "Out of Stock",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterWood, setFilterWood] = useState("All");

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    woodType: "Sheesham" as "Sheesham" | "Teak" | "Rosewood",
    price: "",
    stockQuantity: "5",
    supplier: "Chiniot Royal Woodcraft",
    dimensions: "King Size 72x78 in",
    color: "Natural Polish",
    description: "",
  });

  const handleStockChange = (id: string, delta: number) => {
    setFurniture((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.stockQuantity + delta);
          return {
            ...item,
            stockQuantity: newQty,
            status: newQty > 0 ? "In Stock" : "Out of Stock",
          };
        }
        return item;
      })
    );
  };

  const handleOpenEdit = (item: FurnitureRow) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      woodType: item.woodType,
      price: String(item.price),
      stockQuantity: String(item.stockQuantity),
      supplier: item.supplier,
      dimensions: item.dimensions,
      color: item.color,
      description: item.description,
    });
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      woodType: "Sheesham",
      price: "",
      stockQuantity: "5",
      supplier: "Chiniot Royal Woodcraft",
      dimensions: "King Size 72x78 in",
      color: "Natural Polish",
      description: "",
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const qty = Number(formData.stockQuantity) || 0;
    const itemStatus = qty > 0 ? "In Stock" : "Out of Stock";

    if (editingId) {
      setFurniture((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.name,
                woodType: formData.woodType,
                price: Number(formData.price),
                stockQuantity: qty,
                supplier: formData.supplier,
                dimensions: formData.dimensions,
                color: formData.color,
                description: formData.description,
                status: itemStatus,
              }
            : item
        )
      );
    } else {
      const newItem: FurnitureRow = {
        id: `FURN-${Math.floor(200 + Math.random() * 800)}`,
        name: formData.name,
        woodType: formData.woodType,
        price: Number(formData.price),
        stockQuantity: qty,
        supplier: formData.supplier,
        dimensions: formData.dimensions,
        color: formData.color,
        description: formData.description,
        status: itemStatus,
      };
      setFurniture([newItem, ...furniture]);
    }
    setIsModalOpen(false);
  };

  const filteredItems = furniture.filter((f) => {
    const matchSearch =
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.supplier.toLowerCase().includes(search.toLowerCase());
    const matchWood = filterWood === "All" || f.woodType === filterWood;
    return matchSearch && matchWood;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] font-mono">
            Craftsmanship Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
            Chinioti Furniture Catalog
          </h1>
          <p className="text-xs text-slate-400">
            Monitor stock levels, manage Chinioti suppliers, and adjust inventory quantities.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Furniture Item</span>
        </button>
      </div>

      {/* Search & Wood filter */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search item name, supplier..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <select
            value={filterWood}
            onChange={(e) => setFilterWood(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Wood Types</option>
            <option value="Sheesham">Pure Sheesham</option>
            <option value="Teak">Teak Wood</option>
            <option value="Rosewood">Rosewood</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Item Name</th>
                <th className="py-4 px-4">Wood Species</th>
                <th className="py-4 px-4">Price (PKR)</th>
                <th className="py-4 px-4">Stock Qty</th>
                <th className="py-4 px-4">Supplier</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredItems.map((f, idx) => {
                const isLowStock = f.stockQuantity > 0 && f.stockQuantity < 5;
                const isOutOfStock = f.stockQuantity === 0;

                return (
                  <tr
                    key={f.id}
                    className={`transition-colors ${
                      isLowStock
                        ? "bg-red-950/20 hover:bg-red-950/30"
                        : idx % 2 === 0
                        ? "bg-slate-900"
                        : "bg-slate-900/50"
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-white max-w-xs truncate">
                      {f.name}
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">{f.id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {f.woodType}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-black text-white">PKR {f.price.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleStockChange(f.id, -1)}
                          className="text-slate-400 hover:text-white"
                          title="Decrease Stock"
                        >
                          <MinusCircle className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className={`font-black px-2 py-0.5 rounded ${
                            isLowStock
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : isOutOfStock
                              ? "text-slate-500"
                              : "text-white"
                          }`}
                        >
                          {f.stockQuantity}
                        </span>
                        <button
                          onClick={() => handleStockChange(f.id, 1)}
                          className="text-slate-400 hover:text-white"
                          title="Increase Stock"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                        </button>
                        {isLowStock && (
                          <span
                            className="inline-flex items-center gap-1 text-[10px] text-red-400 font-bold"
                            title="Low Stock Alert (< 5)"
                          >
                            <AlertTriangle className="w-3 h-3" />
                            Low
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 font-medium">{f.supplier}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          f.status === "In Stock"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {f.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(f)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete this furniture item?")) {
                              setFurniture(furniture.filter((item) => item.id !== f.id));
                            }
                          }}
                          className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingId ? "Edit Furniture Specifications" : "Add Chinioti Furniture Item"}
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
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Item Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Wood Species</label>
                  <select
                    value={formData.woodType}
                    onChange={(e) => setFormData({ ...formData, woodType: e.target.value as "Sheesham" | "Teak" | "Rosewood" })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Sheesham">Sheesham</option>
                    <option value="Teak">Teak</option>
                    <option value="Rosewood">Rosewood</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Stock Qty</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold uppercase text-slate-400 mb-1.5">Color / Polish</label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1.5">Dimensions</label>
                <input
                  type="text"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-400 mb-1.5">Supplier / Manufacturer</label>
                <input
                  type="text"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-500"
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
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
