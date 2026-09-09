"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  Clock,
  MessageCircle,
  Award,
} from "lucide-react";
import { registerPartnerUser } from "@/lib/firebase/client";

export default function PartnersPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    category: "Real Estate" as "Real Estate" | "Chinioti Wood & Furniture" | "Events & Catering",
    subcategory: "",
    city: "Lahore",
    area: "",
    address: "",
    whatsapp: "",
    phone: "",
    email: "",
    facebook: "",
    instagram: "",
    website: "",
    description: "",
    services: "",
    priceRange: "Moderate to High-End",
    password: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredPartnerId, setRegisteredPartnerId] = useState<string | null>(null);

  const benefits = [
    {
      icon: TrendingUp,
      title: "Get Discovered",
      description: "We promote your listings across Pakistan to high-intent buyers seeking verified real estate, luxury furniture, and banquet venues.",
      badge: "National Reach",
    },
    {
      icon: MessageSquare,
      title: "Receive Customer Leads",
      description: "Every inquiry generates a tracked lead and routes directly to your WhatsApp with complete customer budget and requirements.",
      badge: "Direct Inquiries",
    },
    {
      icon: BadgePercent,
      title: "Pay on Success",
      description: "100% Free to join and create listings. Zero monthly subscription fees. Only pay standard commission after closing a deal.",
      badge: "Risk-Free Model",
    },
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setErrorMessage("Please agree to the 'Pay on Success' terms before proceeding.");
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Map form to registration payload with Pending Verification status
      const res = await registerPartnerUser({
        fullName: formData.ownerName,
        email: formData.email,
        phone: formData.phone || formData.whatsapp,
        businessType:
          formData.category === "Real Estate"
            ? "Agent"
            : formData.category === "Chinioti Wood & Furniture"
            ? "Furniture Dealer"
            : "Event Manager",
        agencyName: formData.businessName,
        city: formData.city,
        password: formData.password,
      });

      if (res.success) {
        // Save complete partner profile locally for dashboard demo/sync
        const partnerProfile = {
          uid: res.uid || `partner-${Date.now()}`,
          businessName: formData.businessName,
          ownerName: formData.ownerName,
          category: formData.category,
          subcategory: formData.subcategory,
          city: formData.city,
          area: formData.area,
          address: formData.address,
          whatsapp: formData.whatsapp,
          phone: formData.phone || formData.whatsapp,
          email: formData.email,
          facebook: formData.facebook,
          instagram: formData.instagram,
          website: formData.website,
          description: formData.description,
          services: formData.services ? formData.services.split(",") : [],
          priceRange: formData.priceRange,
          verificationStatus: "pending" as const,
          verifiedBadge: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("watech_current_partner_profile", JSON.stringify(partnerProfile));
        }

        setRegisteredPartnerId(partnerProfile.uid);
      } else {
        setErrorMessage(res.error || "Registration failed. Please verify your credentials.");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openFastTrackWhatsApp = () => {
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Waseem bhai, I registered as a Partner on Watech Platform:\n• Business: ${formData.businessName}\n• Sector: ${formData.category} (${formData.city})\n• Owner: ${formData.ownerName}\n\nPlease expedite my Partner Verification and Verified Badge.`
    );
    window.open(`https://wa.me/923270831470?text=${msg}`, "_blank");
  };

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#EA580C] selection:text-white pb-24">
      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-orange-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 text-[#EA580C] text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Partner Ecosystem · Free Join</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]"
          >
            Join WATECH. Get Discovered. Receive Customer Leads.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            Empowering real estate agents, authentic Chinioti woodcraft artisans, and banquet organizers with verified digital distribution, direct WhatsApp leads, and a pure &quot;Pay on Success&quot; partnership.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#register"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EA580C] text-white font-bold text-sm tracking-wide shadow-md hover:bg-orange-700 hover:shadow-orange-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Join as Partner (Free)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/partners/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2"
            >
              <span>Partner Dashboard Login</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* THREE PILLARS (BENEFITS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
            Why Partner with Watech?
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
            Grow Your Business Without Marketing Risk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#EA580C] flex items-center justify-center">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                    {b.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{b.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{b.description}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#EA580C]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero Upfront Cost</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PARTNER REGISTRATION FORM SECTION (SECTION 9) */}
      <section id="register" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EA580C]">
              Free Partner Registration
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
              Create Your Partner Profile
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Register your business to access verified listings, customer inquiries, and direct leads.
            </p>
          </div>

          {registeredPartnerId ? (
            /* SUCCESS STATE WITH PENDING VERIFICATION STATUS */
            <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-slate-200 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-orange-100 text-[#EA580C] flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  Status: Pending Verification
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Application Submitted Successfully!
                </h3>
                <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto mt-4 leading-relaxed">
                  Your profile for <strong className="text-slate-900">{formData.businessName}</strong> has been submitted. Our compliance team will review your details within 24 hours to award the official <strong>Verified Partner Badge</strong>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 max-w-lg mx-auto text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="font-semibold">Business:</span>
                  <span className="font-bold text-slate-900">{formData.businessName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Owner:</span>
                  <span className="font-bold text-slate-900">{formData.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sector:</span>
                  <span className="font-bold text-[#EA580C]">{formData.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">City:</span>
                  <span className="font-bold text-slate-900">{formData.city}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={openFastTrackWhatsApp}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#16A34A] text-white font-bold text-sm tracking-wide shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Fast-Track Verification on WhatsApp</span>
                </button>

                <Link
                  href="/partners/dashboard"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#EA580C] text-white font-bold text-sm hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
                >
                  <span>Go to Partner Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleRegister}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 space-y-8"
            >
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  {errorMessage}
                </div>
              )}

              {/* SECTION 1: BUSINESS INFORMATION */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-5 h-5 text-[#EA580C]" />
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                    1. Business Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Business / Agency Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Rehman Estate or Chiniot Woodcraft"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Owner / Representative Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Haji Muhammad Aslam"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Sector / Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as "Real Estate" | "Chinioti Wood & Furniture" | "Events & Catering",
                        })
                      }
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm bg-white"
                    >
                      <option value="Real Estate">Real Estate (Plots, Villas, Commercial)</option>
                      <option value="Chinioti Wood & Furniture">Chinioti Wood & Furniture (Artisans/Dealers)</option>
                      <option value="Events & Catering">Events & Catering (Halls, Marquees, Food)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Subcategory / Specialty
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DHA Phase Specialist, Solid Sheesham Beds, Marquee Setup"
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      City *
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
                      <option value="Other">Other City</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Area / Neighborhood
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. DHA Phase 6, Chiniot Bypass, Gulberg"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Office Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Plaza #12, Commercial Block"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: CONTACT & CREDENTIALS */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-[#EA580C]" />
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                    2. Contact & Access Credentials
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      WhatsApp Number (For Leads) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0327 0831470"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Calling Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                      placeholder="e.g. dealer@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Account Password (Min 6 Characters) *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Price Range Category
                    </label>
                    <select
                      value={formData.priceRange}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm bg-white"
                    >
                      <option value="Economy & Budget">Economy & Budget</option>
                      <option value="Moderate to High-End">Moderate to High-End</option>
                      <option value="Luxury & Exclusive">Luxury & Exclusive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: BUSINESS PROFILE (DESCRIPTION & SERVICES) */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-[#EA580C]" />
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                    3. Public Profile & Bio
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Business Profile Bio / Experience
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell buyers about your years in business, landmark projects, craftsmanship, or client satisfaction..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C] text-sm"
                  />
                </div>
              </div>

              {/* TERMS AGREEMENT ("Pay on Success") */}
              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-[#EA580C] focus:ring-[#EA580C]"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I understand that partner registration is <strong>100% free</strong> with zero upfront spend. I agree to WATECH&apos;s standard <strong>&quot;Pay on Success&quot;</strong> commission model on verified deals closed through platform leads, subject to admin verification.
                  </span>
                </label>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-full bg-[#EA580C] text-white font-bold text-sm tracking-wide shadow-md hover:bg-orange-700 hover:shadow-orange-500/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Registering Profile...</span>
                ) : (
                  <>
                    <span>Submit Partner Application (Free)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
