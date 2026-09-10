"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Utensils, Users, MessageCircle, CheckCircle2, ShieldCheck, Sparkles, Calendar } from "lucide-react";

interface CateringCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringCalculatorModal: React.FC<CateringCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [guests, setGuests] = useState<number>(150);
  const [occasion, setOccasion] = useState<string>("Wedding / Barat / Valima");
  const [selectedMenuIndex, setSelectedMenuIndex] = useState<number>(0);

  const OCCASIONS = [
    "Wedding / Barat / Valima",
    "Family Gathering / Daawat",
    "Live Charcoal BBQ Feast",
    "Corporate / Community Event",
  ];

  const MENUS = [
    {
      name: "Royal Shahi Daawat Menu",
      badge: "Signature Collection",
      items: "Special Mutton Qorma, Chicken Dum Biryani, Roghni Naan, Fresh Raita & Salad, Shahi Kheer",
      highlights: "Full Chafing Dish Buffet + Uniformed Waiters",
    },
    {
      name: "Executive Live Charcoal BBQ Buffet",
      badge: "Live Griddle & Tandoor",
      items: "Live Mutton Seekh Kabab, Chicken Malai Boti, Fish Fry, Chicken Dum Biryani, Fresh Naan, Gulab Jamun",
      highlights: "On-Site Live Chef Counter + Ambient Setup",
    },
    {
      name: "Heritage Traditional Biryani & Salan",
      badge: "Popular Traditional",
      items: "Special Dum Beef/Chicken Biryani, White Chicken Qorma, Roghni Naan, Fresh Salad, Traditional Zarda",
      highlights: "Hot Sealed Containers + Complete Cutlery",
    },
    {
      name: "Custom Tailored Menu (Aapki Pasand)",
      badge: "Bespoke Selection",
      items: "Apni marzi ke mutabiq Mutton, Beef, Fish, Chinese ya Desi dishes combine karein",
      highlights: "Personal Consultation with Master Chef",
    },
  ];

  const currentMenu = MENUS[selectedMenuIndex];

  const handleWhatsAppInquiry = () => {
    const text = `Assalam-o-Alaikum WATECH Catering Desk,\nI would like to request an official menu quotation for my upcoming event:\n• Expected Guests: ${guests}\n• Occasion: ${occasion}\n• Selected Menu: "${currentMenu.name}"\n• Included Items: ${currentMenu.items}\n\nPlease share the latest transparent per-head rates and arrange date confirmation.`;
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
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-orange-50/50 border-b border-orange-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#EA580C] flex items-center justify-center border border-orange-200">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Event & Catering Menu Requirement Planner
                </h3>
                <p className="text-xs text-slate-500">Transparent Custom Menu Planning & Direct Chef Quotation</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
            {/* Occasion Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>Select Occasion Type</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ)}
                    className={`py-2 px-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      occasion === occ
                        ? "border-[#EA580C] bg-orange-50/70 text-slate-900 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-600"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#EA580C]" />
                  <span>Number of Expected Guests</span>
                </label>
                <span className="text-sm font-black text-[#EA580C] font-mono bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  {guests} Guests
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EA580C]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>50 Guests</span>
                <span>150 Guests</span>
                <span>350 Guests</span>
                <span>500+ Guests</span>
              </div>
            </div>

            {/* Menu Options */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">
                Select Catering Menu Style
              </label>
              <div className="space-y-2">
                {MENUS.map((menu, idx) => {
                  const isSelected = selectedMenuIndex === idx;
                  return (
                    <button
                      key={menu.name}
                      type="button"
                      onClick={() => setSelectedMenuIndex(idx)}
                      className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#EA580C] bg-orange-50/50 shadow-xs ring-1 ring-[#EA580C]"
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
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Custom Quotation
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                        {menu.items}
                      </p>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3 text-[#EA580C]" />
                        <span>{menu.highlights}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quality Standard Badges (Values that attract customers without fake numbers) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Har Order Ke Sath Included Suholiyat:</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>100% Fresh Halal Meat</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Uniformed Professional Staff</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Buffet Warmers & Cutlery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#EA580C]" />
                  <span>Free Food Tasting Session</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 border-t border-slate-200/80 pt-2 leading-relaxed">
                * Rates seasonal market ingredients (Mutton/Beef/Chicken) aur exact menu selection ke mutabiq direct transparent share kiye jaate hain — koi artificial markup ya fake hidden charges nahi hotay.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#EA580C] hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-600/20 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Get Official Custom Quotation on WhatsApp</span>
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
