"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, Users, MessageCircle, CheckCircle2, ShieldCheck } from "lucide-react";

interface CateringCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringCalculatorModal: React.FC<CateringCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState<number>(350);
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);

  const MENUS = [
    {
      name: "Shahi Daawat Wedding Menu",
      perHead: 1850,
      badge: "Most Popular",
      items: "Special Mutton Qorma, Chicken Dum Biryani, Roghni Naan, Raita/Salad, Shahi Kheer",
    },
    {
      name: "Executive Live Charcoal BBQ Buffet",
      perHead: 2400,
      badge: "Premium VIP",
      items: "Live Mutton Seekh Kabab, Chicken Malai Boti, Fish Fry, Chicken Biryani, Naan, Gulab Jamun",
    },
    {
      name: "Clifton Royal Biryani & Salan",
      perHead: 1650,
      badge: "Cost Effective",
      items: "Special Dum Beef Biryani, Chicken White Qorma, Roghni Naan, Fresh Salad, Zarda/Kheer",
    },
  ];

  const currentMenu = MENUS[selectedMenuIndex];
  const foodTotal = guests * currentMenu.perHead;
  const staffAndCutleryEstimate = Math.round(guests * 120); // Uniformed staff & warmers
  const recommendedBuffer = Math.round(foodTotal * 0.08); // 8% reserve buffer
  const grandTotal = foodTotal + staffAndCutleryEstimate;

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

  const handleWhatsAppInquiry = () => {
    const text = `Assalam-o-Alaikum Watech Catering Team,\nI used your Catering Budget Estimator:\n• Expected Guests: ${guests}\n• Menu: "${currentMenu.name}" (@ PKR ${currentMenu.perHead}/head)\n• Estimated Total: ${formatPKR(grandTotal)}\n\nPlease confirm date availability and food tasting session.`;
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
          <div className="flex items-center justify-between p-6 bg-orange-50/50 border-b border-orange-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center border border-orange-200">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Food & Catering Budget Estimator
                </h3>
                <p className="text-xs text-slate-500">Instant Per-Head Cost & Buffet Calculations</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Guest Count Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#EA580C]" />
                  <span>Number of Expected Guests</span>
                </label>
                <span className="text-base font-black text-[#EA580C] font-mono">{guests} Guests</span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EA580C]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>100 (Family)</span>
                <span>350 (Mehndi/Valima)</span>
                <span>700 (Barat)</span>
                <span>1,200+ (Grand)</span>
              </div>
            </div>

            {/* Menu Options */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Select Catering Menu Package
              </label>
              <div className="space-y-2.5">
                {MENUS.map((menu, idx) => {
                  const isSelected = selectedMenuIndex === idx;
                  return (
                    <button
                      key={menu.name}
                      type="button"
                      onClick={() => setSelectedMenuIndex(idx)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-[#EA580C] bg-orange-50/50 shadow-xs"
                          : "border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-900">{menu.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-orange-100 text-[#EA580C]">
                            {menu.badge}
                          </span>
                        </div>
                        <span className="text-xs font-black text-[#EA580C] font-mono">
                          PKR {menu.perHead.toLocaleString()} / head
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-1">
                        {menu.items}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Cost Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Food & Main Course ({guests} × PKR {currentMenu.perHead.toLocaleString()}):</span>
                <span className="font-bold text-slate-900 font-mono">{formatPKR(foodTotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-600">
                <span>Catering Crew, Warmers & Cutlery:</span>
                <span className="font-bold text-slate-900 font-mono">{formatPKR(staffAndCutleryEstimate)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 border-t border-slate-200/80 pt-2">
                <span>Recommended 8% Emergency Buffer:</span>
                <span className="font-medium font-mono">{formatPKR(recommendedBuffer)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Estimated Total Budget:
                </span>
                <span className="text-lg font-black text-[#EA580C] font-mono">
                  {formatPKR(grandTotal)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#EA580C] hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book Tasting & Confirm Quote</span>
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
