"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  TrendingUp,
  MessageSquare,
  BadgePercent,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  Lock,
} from "lucide-react";
import { registerPartnerUser, PartnerRegistrationInput } from "@/lib/firebase/client";

export default function PartnersPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<PartnerRegistrationInput>({
    fullName: "",
    email: "",
    phone: "",
    businessType: "Agent",
    agencyName: "",
    city: "Lahore",
    password: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Free Marketing",
      description: "We promote your listings across our platform and social media with zero upfront spend.",
      badge: "Scale Your Reach",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Leads",
      description: "Every inquiry comes directly to your WhatsApp with pre-filled customer details for instant follow-up.",
      badge: "Direct Contact",
    },
    {
      icon: BadgePercent,
      title: "Pay on Success",
      description: "Zero monthly fees. Only pay standard commission when you close a deal and receive payment.",
      badge: "Risk-Free Model",
    },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setErrorMessage("Please agree to the commission structure terms before proceeding.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await registerPartnerUser(formData);
      if (res.success) {
        router.push("/partners/dashboard");
      } else {
        setErrorMessage(res.error || "Registration failed. Please check details.");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#EA580C] selection:text-white pb-24">
      {/* =========================================
          HERO SECTION (ORANGE THEME)
          ========================================= */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 text-[#EA580C] text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Upfront Risk · 100% Performance-Driven</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] max-w-4xl mx-auto"
          >
            Join Our Ecosystem — <br className="hidden sm:inline" />
            <span className="text-[#EA580C]">Zero Cost</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            List your properties, furniture, or events. Get leads. Pay only on success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <a
              href="#register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EA580C] text-white font-bold text-sm shadow-md hover:bg-orange-700 hover:shadow-orange-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span>Register Free →</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          BENEFITS (3 BOXES)
          ========================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
            Why Partner With Watech
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
            Built for Pakistani Business Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((ben, idx) => {
            const Icon = ben.icon;
            return (
              <motion.div
                key={ben.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white border border-slate-100 rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-orange-50 text-[#EA580C]">
                      <Icon className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {ben.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {ben.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-base">
                    {ben.description}
                  </p>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-50 flex items-center gap-2 text-xs font-semibold text-[#EA580C]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Partner Benefit</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================
          REGISTRATION FORM (#register)
          ========================================= */}
      <section id="register" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
              Partner Onboarding
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Create Your Free Partner Account
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              Takes less than 2 minutes. Start publishing your inventory today.
            </p>
          </div>

          <form
            onSubmit={handleRegister}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 space-y-6"
          >
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Malik Muhammad Asif"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. partner@agency.pk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Business Type *
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      businessType: e.target.value as "Agent" | "Furniture Dealer" | "Event Manager",
                    })
                  }
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm bg-white"
                >
                  <option value="Agent">Real Estate Agent / Builder</option>
                  <option value="Furniture Dealer">Chinioti Furniture Manufacturer / Dealer</option>
                  <option value="Event Manager">Event Manager / Banquet Owner</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Agency / Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Madina Estate & Builders"
                  value={formData.agencyName}
                  onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Primary City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm bg-white"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Chiniot">Chiniot</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Multan">Multan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Password (min 6 characters) *
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm pr-10"
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-[#EA580C] focus:ring-[#EA580C] rounded border-slate-300 accent-[#EA580C]"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I agree to the commission structure (10-20% on successful closed sales/bookings) and verify that all inventory submitted by my agency will be authentic and legally compliant.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-full bg-[#EA580C] text-white font-bold text-sm tracking-wide shadow-md hover:bg-orange-700 hover:shadow-orange-500/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Creating Partner Account...</span>
              ) : (
                <>
                  <span>Create Free Partner Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
