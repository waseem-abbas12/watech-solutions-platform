"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Smartphone,
  Bot,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Send,
  Sparkles,
  TrendingUp,
  Target,
  Megaphone,
  MessageCircle,
  PhoneCall,
  Search,
  Building2,
} from "lucide-react";
import { createLead } from "@/lib/services/leads";

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    whatsappNumber: "",
    city: "Lahore",
    businessCategory: "Real Estate",
    website: "",
    socialMedia: "",
    requiredService: "Social Media Marketing",
    monthlyBudget: "PKR 50,000 - 150,000",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const services = [
    {
      id: "srv-1",
      icon: Megaphone,
      badge: "Paid Ads",
      title: "Social Media Marketing & Meta Ads",
      description: "Targeted Facebook, Instagram & TikTok campaigns engineered to generate qualified local inquiries for plots, furniture, and banquets.",
      points: ["High-converting Meta & TikTok Ads", "Creative ad visual reels", "Audience retargeting & lookalikes"],
    },
    {
      id: "srv-2",
      icon: Search,
      badge: "High Intent",
      title: "Google Ads & Search PPC",
      description: "Capture high-intent buyers actively searching on Google for '10 marla house DHA' or 'Chinioti bedroom set'.",
      points: ["Google Search & Maps PPC", "Negative keyword optimization", "High ROI conversion tracking"],
    },
    {
      id: "srv-3",
      icon: Globe,
      badge: "Web & Mobile",
      title: "Website & App Development",
      description: "Custom Next.js & WordPress platforms engineered for blazing speed, mobile-first responsiveness, and top Google SEO ranking.",
      points: ["High-speed Next.js portals", "Property & catalog search engines", "PWA mobile app integration"],
    },
    {
      id: "srv-4",
      icon: Bot,
      badge: "Instant Chat",
      title: "WhatsApp Automation & Bots",
      description: "Autonomous Meta WhatsApp Cloud API bots that reply in <30s in Roman Urdu & English, send PDF catalogs, and log leads.",
      points: ["Instant lead response in <30s", "Catalog sent directly on WhatsApp", "Automated follow-up sequences"],
    },
    {
      id: "srv-5",
      icon: BarChart3,
      badge: "Operations & Sales",
      title: "CRM & Lead Management",
      description: "Comprehensive CRM setup to track every customer from first inquiry to closed deal, preventing lead leakage.",
      points: ["Lead pipeline tracking", "Agent commission accounting", "Staff workflow training"],
    },
    {
      id: "srv-6",
      icon: Sparkles,
      badge: "Autonomous",
      title: "AI Automation & Workflows",
      description: "Self-hosted n8n workflows that synchronize your Meta leads, website inquiries, and WhatsApp notifications automatically.",
      points: ["Zero-touch lead routing", "Automated customer SMS/WhatsApp alerts", "Custom AI business assistants"],
    },
    {
      id: "srv-7",
      icon: Target,
      badge: "Inquiries",
      title: "B2B & B2C Lead Generation",
      description: "Dedicated lead funnels designed to deliver genuine, phone-verified buyer leads directly to your sales team daily.",
      points: ["Verified buyer phone numbers", "Budget-filtered inquiries", "Exclusive leads (no sharing)"],
    },
    {
      id: "srv-8",
      icon: TrendingUp,
      badge: "Scale",
      title: "Marketing & Growth Strategy",
      description: "Quarterly growth roadmaps, pricing strategy, brand positioning, and competitor analysis to dominate your local market.",
      points: ["Full business market audit", "Pricing & positioning strategy", "Scale & franchise blueprint"],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.ownerName || !formData.whatsappNumber) return;

    setIsSubmitting(true);
    try {
      const notesContent = `Business: ${formData.businessName} (${formData.businessCategory}) | Owner: ${formData.ownerName} | City: ${formData.city} | Web/Social: ${formData.website || "N/A"} / ${formData.socialMedia || "N/A"} | Budget: ${formData.monthlyBudget} | Message: ${formData.message || "Consultation requested"}`;

      const leadRes = await createLead({
        customerName: `${formData.ownerName} (${formData.businessName})`,
        phone: formData.whatsappNumber,
        whatsapp: formData.whatsappNumber,
        category: "digital_services",
        source: "agency_consultation",
        requiredService: formData.requiredService,
        budget: formData.monthlyBudget,
        city: formData.city,
        notes: notesContent,
      });

      setSubmittedLeadId(leadRes.leadId);
      setToastMessage(`Request submitted successfully! Lead Ref: ${leadRes.leadId}`);

      setFormData({
        businessName: "",
        ownerName: "",
        whatsappNumber: "",
        city: "Lahore",
        businessCategory: "Real Estate",
        website: "",
        socialMedia: "",
        requiredService: "Social Media Marketing",
        monthlyBudget: "PKR 50,000 - 150,000",
        message: "",
      });
    } catch (err) {
      console.error("Failed to submit digital services lead:", err);
      setToastMessage("Error submitting request. Please contact direct WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppDirect = (leadId?: string) => {
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Waseem bhai, I submitted a Digital Services consultation request on Watech Platform${
        leadId ? ` (Ref: ${leadId})` : ""
      }. Please share your agency proposal and strategy.`
    );
    window.open(`https://wa.me/923270831470?text=${msg}`, "_blank");
  };

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className="fixed top-24 left-1/2 z-50 flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-full shadow-2xl border border-slate-700 text-sm font-medium"
          >
            <CheckCircle2 className="w-5 h-5 text-[#2563EB]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/60 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#2563EB]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Watech Digital Services & Agency</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.08]"
          >
            Technology & Marketing Engine for Modern Businesses
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            We engineer high-performance websites, high-converting Meta & Google ad funnels, WhatsApp AI automation, and CRM solutions tailored for Pakistan&apos;s most ambitious businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563EB] text-white font-bold text-sm tracking-wide shadow-md hover:bg-blue-700 hover:shadow-blue-500/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Grow My Business</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => openWhatsAppDirect()}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp Consultation</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Comprehensive Solutions
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
            Engineered for Measurable Growth
          </h2>
          <p className="text-slate-600 mt-3 text-base max-w-xl mx-auto">
            From first impression to closed deal, our integrated digital services power the entire customer acquisition lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                    {srv.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {srv.description}
                </p>

                <ul className="space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
                  {srv.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href="#contact"
                  className="text-xs font-bold text-[#2563EB] group-hover:text-blue-700 flex items-center gap-1"
                >
                  <span>Inquire Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LEAD-GENERATION CONTACT SECTION (SECTION 4 COMPLETE FORM) */}
      <section id="contact" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Start Scaling Today
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
              Grow My Business
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Complete your business details below to receive a custom digital strategy and ROI projection.
            </p>
          </div>

          {submittedLeadId ? (
            <div className="bg-white rounded-3xl p-10 md:p-14 shadow-xl border border-slate-200 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Consultation Request Received!
                </h3>
                <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-sm font-mono font-bold text-[#2563EB]">
                  Lead Reference ID: {submittedLeadId}
                </div>
                <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto mt-4 leading-relaxed">
                  Our growth strategist will review your business profile and contact you on WhatsApp with an actionable proposal.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => openWhatsAppDirect(submittedLeadId)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#16A34A] text-white font-bold text-sm tracking-wide shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect with Advisor on WhatsApp Now</span>
                </button>

                <button
                  onClick={() => setSubmittedLeadId(null)}
                  className="w-full sm:w-auto px-6 py-4 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 space-y-6"
            >
              {/* Row 1: Business Name & Owner Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Business / Agency Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al-Madina Real Estate"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Owner / Representative Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Waseem Abbas"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp Number & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0327 0831470"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm bg-white"
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
              </div>

              {/* Row 3: Business Category & Required Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Business Category *
                  </label>
                  <select
                    value={formData.businessCategory}
                    onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm bg-white"
                  >
                    <option value="Real Estate">Real Estate / Housing</option>
                    <option value="Furniture">Chinioti Wood / Furniture Maker</option>
                    <option value="Events & Catering">Banquet Hall / Event Organizer</option>
                    <option value="Retail & E-Commerce">Retail & E-Commerce Store</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Other">Other Industry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Required Service *
                  </label>
                  <select
                    value={formData.requiredService}
                    onChange={(e) => setFormData({ ...formData, requiredService: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm bg-white"
                  >
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Meta Ads">Meta Ads (Facebook & Instagram)</option>
                    <option value="Google Ads">Google Ads (Search & PPC)</option>
                    <option value="Website Development">Website & Mobile App Development</option>
                    <option value="WhatsApp Automation">WhatsApp AI Automation</option>
                    <option value="CRM Setup">CRM & Sales Pipeline</option>
                    <option value="AI Automation">AI Workflow Automation</option>
                    <option value="Lead Generation">Exclusive Lead Generation</option>
                    <option value="Marketing Strategy">Full Growth Strategy & Audit</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Website & Social Media (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Website URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Facebook / Instagram Link (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. facebook.com/mypage"
                    value={formData.socialMedia}
                    onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                  />
                </div>
              </div>

              {/* Row 5: Monthly Budget */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Estimated Monthly Marketing Budget *
                </label>
                <select
                  value={formData.monthlyBudget}
                  onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm bg-white"
                >
                  <option value="Under PKR 50,000">Under PKR 50,000 / month</option>
                  <option value="PKR 50,000 - 150,000">PKR 50,000 - 150,000 / month</option>
                  <option value="PKR 150,000 - 500,000">PKR 150,000 - 500,000 / month</option>
                  <option value="PKR 500,000+">PKR 500,000+ / month (Enterprise)</option>
                </select>
              </div>

              {/* Row 6: Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Message & Specific Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your current business challenges, target audience, and sales goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-full bg-[#2563EB] text-white font-bold text-sm tracking-wide shadow-md hover:bg-blue-700 hover:shadow-blue-500/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Submitting Consultation Request...</span>
                ) : (
                  <>
                    <span>Grow My Business</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CROSS-LINK SECTION */}
      <section className="py-16 px-6 bg-white border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 text-base md:text-lg font-semibold text-slate-700 hover:text-[#EA580C] transition-colors group"
          >
            <span>Want free buyer leads instead?</span>
            <span className="text-[#EA580C] underline underline-offset-4 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Join our Partner Ecosystem (Pay on Success) →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
