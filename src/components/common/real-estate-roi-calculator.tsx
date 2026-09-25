"use client";

import React, { useState, useMemo } from "react";
import { Calculator, ArrowRight, MessageCircle, Sparkles, CheckCircle2, TrendingUp, Users, Building2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export function RealEstateRoiCalculator() {
  const { language, isRTL } = useTranslation();

  const [monthlyBudget, setMonthlyBudget] = useState<number>(150000);
  const [propertyType, setPropertyType] = useState<"plots" | "villas" | "commercial">("villas");

  const calculations = useMemo(() => {
    let cpl = 550; // Cost per verified lead
    let visitRatio = 0.20; // 20% convert to site visits
    let closeRatio = 0.04; // 4% closed deals
    let avgDealValue = 35000000; // 3.5 Crore

    if (propertyType === "plots") {
      cpl = 450;
      visitRatio = 0.22;
      closeRatio = 0.05;
      avgDealValue = 12000000; // 1.2 Crore
    } else if (propertyType === "commercial") {
      cpl = 850;
      visitRatio = 0.15;
      closeRatio = 0.03;
      avgDealValue = 65000000; // 6.5 Crore
    }

    const estimatedLeads = Math.round(monthlyBudget / cpl);
    const siteVisits = Math.max(1, Math.round(estimatedLeads * visitRatio));
    const closedDeals = Math.max(1, Math.round(estimatedLeads * closeRatio));
    const projectedInventoryVolume = closedDeals * avgDealValue;
    const projectedCommissionOrRevenue = Math.round(projectedInventoryVolume * 0.02); // 2% agency/developer standard

    return {
      cpl,
      estimatedLeads,
      siteVisits,
      closedDeals,
      projectedInventoryVolume,
      projectedCommissionOrRevenue,
    };
  }, [monthlyBudget, propertyType]);

  const formatCrore = (num: number) => {
    const crore = num / 10000000;
    return `PKR ${crore.toFixed(1)} Crore`;
  };

  const handleWhatsAppSend = () => {
    const propertyLabels = {
      plots: "Residential Plots & Files",
      villas: "Luxury Houses & Villas",
      commercial: "Commercial Plazas & Retail",
    };

    const text = `Assalam-o-Alaikum WATECH Real Estate Agency Desk,\nI calculated my projected marketing ROI on your website:\n• Target Inventory: ${propertyLabels[propertyType]}\n• Monthly Marketing Budget: PKR ${monthlyBudget.toLocaleString()}\n• Projected Verified Leads: ~${calculations.estimatedLeads} Buyers\n• Projected Site Visits: ~${calculations.siteVisits}\n• Target Closed Inventory Volume: ${formatCrore(calculations.projectedInventoryVolume)}\n\nPlease share your ad strategy and campaign setup proposal.`;
    window.open(`https://wa.me/923270831470?text=${encodeURIComponent(text)}`, "_blank");
  };

  // Localized texts
  const tStrings = {
    en: {
      badge: "PROPRIETARY REAL ESTATE GROWTH MODEL",
      title: "Calculate Your Real Estate Marketing ROI & Leads",
      desc: "Simulate projected buyer inquiries, on-site visit bookings, and closed property sales based on your monthly ad spend.",
      budgetLabel: "Monthly Digital Ad Spend (PKR)",
      inventoryLabel: "Select Property Sector",
      plots: "Plots & Land",
      villas: "Houses & Villas",
      commercial: "Commercial Plazas",
      leadsLabel: "Projected Inbound Leads",
      visitsLabel: "Estimated Site Visits",
      salesLabel: "Projected Inventory Closed",
      sendBtn: "Send Custom Blueprint to WhatsApp Desk",
      disclaimer: "Projections based on WATECH verified 3.8x+ ROAS historical ad campaign data in Lahore, Islamabad, and Faisalabad.",
    },
    ur: {
      badge: "رئیل اسٹیٹ گروتھ اور منافع کا تخمینہ",
      title: "اپنے رئیل اسٹیٹ اشتہاری خرچ اور لیڈز کا حساب لگائیں",
      desc: "اپنے ماہانہ اشتہاری بجٹ کے مطابق متوقع خریداروں کی تعداد، سائیٹ وزٹس اور فروخت ہونے والی پراپرٹی کا تخمینہ جانیے۔",
      budgetLabel: "ماہانہ ڈیجیٹل ایڈز بجٹ (PKR)",
      inventoryLabel: "پراپرٹی کی قسم منتخب کریں",
      plots: "پلاٹس اور فائلز",
      villas: "گھر اور ولاز",
      commercial: "کمرشل پلازے",
      leadsLabel: "متوقع تصدیق شدہ خریدار لیڈز",
      visitsLabel: "سائیٹ وزٹس کا شیڈول",
      salesLabel: "متوقع فروخت شدہ پراپرٹی والیم",
      sendBtn: "یہ گروتھ پلان واٹس ایپ پر حاصل کریں",
      disclaimer: "یہ تخمینہ واٹیک کے گزشتہ 3.8 گنا مصدقہ ایڈز پرفارمنس ڈیٹا کے تحت تیار کیا گیا ہے۔",
    },
    roman: {
      badge: "REAL ESTATE GROWTH AUR LEADS CALCULATOR",
      title: "Apne Real Estate Ad Spend Aur Buyer Leads Ka Hisab Lagayein",
      desc: "Apne monthly ad budget ke mutabiq phone-verified buyer leads, site visits aur inventory sales ka foran takhmeena lagayein.",
      budgetLabel: "Mahana Digital Ads Budget (PKR)",
      inventoryLabel: "Property Ki Qism Chunein",
      plots: "Plots & Files",
      villas: "Houses & Villas",
      commercial: "Commercial Plazas",
      leadsLabel: "Estimated Verified Buyer Leads",
      visitsLabel: "Schedule Shuda Site Visits",
      salesLabel: "Projected Property Closed Volume",
      sendBtn: "Yeh Growth Blueprint WhatsApp Par Bhejein",
      disclaimer: "Yeh projections WATECH ke 3.8x+ verified historical ad campaigns ke mutabiq hain.",
    },
  }[language] || {
    badge: "PROPRIETARY REAL ESTATE GROWTH MODEL",
    title: "Calculate Your Real Estate Marketing ROI & Leads",
    desc: "Simulate projected buyer inquiries, on-site visit bookings, and closed property sales based on your monthly ad spend.",
    budgetLabel: "Monthly Digital Ad Spend (PKR)",
    inventoryLabel: "Select Property Sector",
    plots: "Plots & Land",
    villas: "Houses & Villas",
    commercial: "Commercial Plazas",
    leadsLabel: "Projected Inbound Leads",
    visitsLabel: "Estimated Site Visits",
    salesLabel: "Projected Inventory Closed",
    sendBtn: "Send Custom Blueprint to WhatsApp Desk",
    disclaimer: "Projections based on WATECH verified 3.8x+ ROAS historical ad campaign data in Lahore, Islamabad, and Faisalabad.",
  };

  return (
    <section id="agency-calculator" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white border-y border-slate-800 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>{tStrings.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {tStrings.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            {tStrings.desc}
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Row 1: Property Type Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
              {tStrings.inventoryLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "plots", label: tStrings.plots, desc: "5/10 Marla & 1 Kanal Files" },
                { id: "villas", label: tStrings.villas, desc: "Luxury Finished Family Homes" },
                { id: "commercial", label: tStrings.commercial, desc: "High-Rental Retail Plazas" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPropertyType(item.id as "plots" | "villas" | "commercial")}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    propertyType === item.id
                      ? "bg-blue-600/20 border-blue-500 text-white shadow-sm"
                      : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="font-bold text-sm text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Row 2: Budget Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {tStrings.budgetLabel}
              </label>
              <span className="text-xl font-black text-blue-400 font-mono">
                PKR {monthlyBudget.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="25000"
              value={monthlyBudget}
              onChange={(e) => setMonthlyBudget(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-2.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-mono">
              <span>PKR 50,000</span>
              <span>PKR 1,000,000</span>
              <span>PKR 2,000,000</span>
            </div>
          </div>

          {/* Row 3: Live Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            {/* Card 1: Leads */}
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>{tStrings.leadsLabel}</span>
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {calculations.estimatedLeads}+
              </div>
              <span className="text-[11px] text-blue-400 font-medium">~PKR {calculations.cpl} cost/lead</span>
            </div>

            {/* Card 2: Visits */}
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>{tStrings.visitsLabel}</span>
                <Building2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {calculations.siteVisits} Visits
              </div>
              <span className="text-[11px] text-slate-400">Pre-qualified buyers</span>
            </div>

            {/* Card 3: Inventory Volume */}
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>{tStrings.salesLabel}</span>
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                {formatCrore(calculations.projectedInventoryVolume)}
              </div>
              <span className="text-[11px] text-slate-400">Projected closed deals</span>
            </div>
          </div>

          {/* CTA & Disclaimer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-500 max-w-md">
              {tStrings.disclaimer}
            </p>

            <button
              onClick={handleWhatsAppSend}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer shrink-0"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{tStrings.sendBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
