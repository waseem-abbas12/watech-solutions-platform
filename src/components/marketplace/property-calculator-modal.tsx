"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calculator, ArrowRight, MessageCircle, Building2, Layers, Check } from "lucide-react";

interface PropertyCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PropertyCalculatorModal: React.FC<PropertyCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"area" | "construction">("area");

  // Area Converter State
  const [marlas, setMarlas] = useState<number>(5);
  const [standard, setStandard] = useState<"lahore" | "islamabad">("lahore");

  // Construction Cost State
  const [coveredAreaSqFt, setCoveredAreaSqFt] = useState<number>(2200);
  const [constructionTier, setConstructionTier] = useState<"grey" | "premium">("premium");

  // Calculations
  const sqFtPerMarla = standard === "lahore" ? 225 : 272;
  const totalSqFt = marlas * sqFtPerMarla;
  const totalSqYards = (totalSqFt / 9).toFixed(1);
  const totalKanals = (marlas / 20).toFixed(2);

  const ratePerSqFt = constructionTier === "grey" ? 2400 : 4200;
  const totalConstructionCost = coveredAreaSqFt * ratePerSqFt;

  function formatPKR(num: number): string {
    if (num >= 10000000) {
      const crore = num / 10000000;
      return `PKR ${crore.toFixed(2)} Crore`;
    }
    if (num >= 100000) {
      const lac = num / 100000;
      return `PKR ${lac.toFixed(2)} Lac`;
    }
    return `PKR ${num.toLocaleString()}`;
  }

  const handleWhatsAppConsult = () => {
    const text =
      activeTab === "area"
        ? `Assalam-o-Alaikum Watech team, I calculated ${marlas} Marla (${standard.toUpperCase()} Standard = ${totalSqFt} SqFt / ${totalSqYards} SqYards). Please suggest available plots in this size.`
        : `Assalam-o-Alaikum Watech team, I estimated ${coveredAreaSqFt} SqFt ${constructionTier.toUpperCase()} construction cost (${formatPKR(totalConstructionCost)}). I need builder consultation.`;

    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Real Estate & Construction Calculator
                </h3>
                <p className="text-xs text-slate-500">Official Pakistani Area & Cost Standards</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher */}
          <div className="grid grid-cols-2 p-2 bg-slate-100 border-b border-slate-200 text-xs font-bold">
            <button
              onClick={() => setActiveTab("area")}
              className={`py-2.5 rounded-xl transition-all ${
                activeTab === "area"
                  ? "bg-white text-[#2563EB] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              📐 Marla & Area Converter
            </button>
            <button
              onClick={() => setActiveTab("construction")}
              className={`py-2.5 rounded-xl transition-all ${
                activeTab === "construction"
                  ? "bg-white text-[#2563EB] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              🏗️ Construction Cost Estimator
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {activeTab === "area" ? (
              <div className="space-y-5">
                {/* Standard selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                    Select City Standard
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStandard("lahore")}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        standard === "lahore"
                          ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold">Lahore / Punjab</div>
                      <div className="text-[10px] text-slate-500">1 Marla = 225 Sq Ft</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStandard("islamabad")}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        standard === "islamabad"
                          ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold">Islamabad / CDA</div>
                      <div className="text-[10px] text-slate-500">1 Marla = 272.25 Sq Ft</div>
                    </button>
                  </div>
                </div>

                {/* Marla Input & Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Plot Size in Marlas
                    </label>
                    <span className="text-base font-black text-[#2563EB] font-mono">{marlas} Marla</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={marlas}
                    onChange={(e) => setMarlas(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>1 Marla</span>
                    <span>5 Marla</span>
                    <span>10 Marla</span>
                    <span>1 Kanal (20M)</span>
                    <span>2 Kanal (40M)</span>
                  </div>
                </div>

                {/* Conversion Results Box */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Calculated Area Equivalents
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white p-2.5 rounded-xl border border-blue-200 shadow-xs">
                      <div className="text-sm font-black text-slate-900">{totalSqFt.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500">Square Feet</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-blue-200 shadow-xs">
                      <div className="text-sm font-black text-slate-900">{totalSqYards}</div>
                      <div className="text-[10px] text-slate-500">Square Yards (Ghaz)</div>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-blue-200 shadow-xs">
                      <div className="text-sm font-black text-slate-900">{totalKanals}</div>
                      <div className="text-[10px] text-slate-500">Kanals</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Construction Quality Tier */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
                    Construction Quality Grade
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setConstructionTier("grey")}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        constructionTier === "grey"
                          ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold">Grey Structure Only</div>
                      <div className="text-[10px] text-slate-500">PKR 2,400 / Sq Ft</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConstructionTier("premium")}
                      className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        constructionTier === "premium"
                          ? "border-[#2563EB] bg-blue-50/50 text-[#2563EB]"
                          : "border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-bold">A+ Luxury Finished</div>
                      <div className="text-[10px] text-slate-500">PKR 4,200 / Sq Ft</div>
                    </button>
                  </div>
                </div>

                {/* Covered Area Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Covered Area (Sq Ft)
                    </label>
                    <span className="text-base font-black text-[#2563EB] font-mono">
                      {coveredAreaSqFt.toLocaleString()} Sq Ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="10000"
                    step="100"
                    value={coveredAreaSqFt}
                    onChange={(e) => setCoveredAreaSqFt(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>5M (1,800)</span>
                    <span>10M (3,200)</span>
                    <span>1K (5,500)</span>
                    <span>2K (9,000+)</span>
                  </div>
                </div>

                {/* Cost Estimate Result */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-2 text-center">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Estimated Construction Budget
                  </div>
                  <div className="text-2xl font-black text-[#16A34A]">
                    {formatPKR(totalConstructionCost)}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Based on current market cement, steel, tile & labor rates in Punjab/Islamabad.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppConsult}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#16A34A] hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Quotation on WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
