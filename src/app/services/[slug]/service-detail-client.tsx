"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Users,
  Layers,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Clock,
  Send,
} from "lucide-react";
import { DigitalServiceDetail } from "@/lib/services-data";
import { createLead } from "@/lib/services/leads";

interface Props {
  service: DigitalServiceDetail;
  otherServices: DigitalServiceDetail[];
}

export function ServiceDetailClient({ service, otherServices }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    whatsappNumber: "",
    city: "Lahore",
    businessCategory: "Real Estate",
    monthlyBudget: "PKR 50,000 - 150,000",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const encodedWhatsAppUrl = `https://wa.me/923270831470?text=${encodeURIComponent(
    service.ctaWhatsAppMessage
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.businessName || !formData.ownerName || !formData.whatsappNumber) return;

    setIsSubmitting(true);
    try {
      const notesContent = `Inquiry for Service: ${service.title} | Business: ${formData.businessName} (${formData.businessCategory}) | Owner: ${formData.ownerName} | City: ${formData.city} | Budget: ${formData.monthlyBudget} | Message: ${formData.message || "Consultation requested"}`;

      const leadRes = await createLead({
        customerName: `${formData.ownerName} (${formData.businessName})`,
        phone: formData.whatsappNumber,
        whatsapp: formData.whatsappNumber,
        category: "digital_services",
        source: `service_page_${service.slug}`,
        requiredService: service.title,
        budget: formData.monthlyBudget,
        city: formData.city,
        notes: notesContent,
      });

      setSubmittedLeadId(leadRes.leadId);
      setToastMessage(`Consultation booked successfully! Lead Ref: ${leadRes.leadId}`);

      setFormData({
        businessName: "",
        ownerName: "",
        whatsappNumber: "",
        city: "Lahore",
        businessCategory: "Real Estate",
        monthlyBudget: "PKR 50,000 - 150,000",
        message: "",
      });
    } catch (err) {
      console.error("Failed to submit service lead:", err);
      setToastMessage("Submission error. Please reach out via direct WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppWithRef = () => {
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Waseem bhai, I submitted a consultation request for ${service.title} on Watech Platform${
        submittedLeadId ? ` (Ref: ${submittedLeadId})` : ""
      }. Please share your proposal.`
    );
    window.open(`https://wa.me/923270831470?text=${msg}`, "_blank");
  };

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white min-h-screen">
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

      {/* BREADCRUMB */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-slate-900 transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-medium truncate max-w-[180px] sm:max-w-none">
              {service.title}
            </span>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 font-semibold"
          >
            <span>All Services</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-bold uppercase tracking-wider text-[#2563EB]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{service.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl sm:text-2xl font-bold text-[#2563EB] max-w-3xl mx-auto tracking-tight"
          >
            {service.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            {service.heroDescription}
          </motion.p>

          {/* STATS STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12"
          >
            {service.stats.map((st, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {st.value}
                </div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* HERO CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#consultation-form"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Get Free Strategy Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={encodedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-all shadow-sm hover:shadow"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. PROBLEM & SOLUTION SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* THE PROBLEM CARD */}
          <div className="bg-red-50/40 rounded-3xl p-8 sm:p-10 border border-red-100/80 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                The Costly Reality
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {service.problem.heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.problem.description}
              </p>
              <ul className="space-y-3 pt-4 border-t border-red-100">
                {service.problem.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✕
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* THE SOLUTION CARD */}
          <div className="bg-blue-50/50 rounded-3xl p-8 sm:p-10 border border-blue-100 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                The Watech Advantage
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {service.solution.heading}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.solution.description}
              </p>
              <ul className="space-y-3 pt-4 border-t border-blue-100">
                {service.solution.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                      ✓
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE PROVIDE (DELIVERABLES) */}
      <section className="py-20 px-6 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Scope of Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              What We Deliver For Your Business
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              No vague promises. Every deliverable is clearly scoped, executed with precision, and reported transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.deliverables.map((deliv, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-black text-xs">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {deliv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {deliv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BUSINESS BENEFITS & ROI */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Measurable Impact
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tangible Business Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.benefits.map((b, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-100/60 text-[#2563EB] flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROCESS TIMELINE */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Structured Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Our 4-Step Implementation Process
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3 relative"
              >
                <div className="text-3xl font-black text-blue-400/50">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHO IT IS FOR */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Industry Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Tailored For High-Ticket Pakistani Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.targetAudience.map((aud, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-slate-200/80 bg-white hover:border-slate-300 shadow-sm space-y-3 transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#2563EB]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {aud.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {aud.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isOpen ? "rotate-180 text-[#2563EB]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE CONSULTATION LEAD FORM & DIRECT WHATSAPP */}
      <section id="consultation-form" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Risk-Free Consultation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Get a Tailored Proposal for {service.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tell us about your business goals, and our senior strategy team will prepare a custom proposal and revenue roadmap within 24 hours.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>100% Free Strategy Session (No Obligation)</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Direct Consultation with Agency Founder</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
                  <span>Fast Response via WhatsApp & Phone Call</span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={encodedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold uppercase tracking-wider transition-all w-full justify-center shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat Direct on WhatsApp Now</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Madina Estate"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mehmood"
                      value={formData.ownerName}
                      onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0327-0831470"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      City
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                    >
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Other">Other City</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Primary Industry
                    </label>
                    <select
                      value={formData.businessCategory}
                      onChange={(e) => setFormData({ ...formData, businessCategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                    >
                      <option value="Real Estate">Real Estate & Construction</option>
                      <option value="Furniture">Chinioti Wood & Furniture</option>
                      <option value="Events & Catering">Banquet Hall & Event Services</option>
                      <option value="Other B2B/B2C">Other Business Sector</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Estimated Monthly Budget
                    </label>
                    <select
                      value={formData.monthlyBudget}
                      onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                    >
                      <option value="PKR 50,000 - 100,000">PKR 50,000 - 100,000</option>
                      <option value="PKR 100,000 - 250,000">PKR 100,000 - 250,000</option>
                      <option value="PKR 250,000 - 500,000">PKR 250,000 - 500,000</option>
                      <option value="PKR 500,000+">PKR 500,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Specific Goals / Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you want to achieve (e.g. need 50 buyer leads for 10 Marla plots, want to automate our WhatsApp catalog)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs focus:ring-2 focus:ring-[#2563EB] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#2563EB] text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Request...</span>
                  ) : (
                    <>
                      <span>Submit Free Consultation Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {submittedLeadId && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={openWhatsAppWithRef}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-bold underline"
                    >
                      Connect on WhatsApp with Reference #{submittedLeadId} →
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 9. EXPLORE OTHER DIGITAL SERVICES */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                Complete Suite
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Explore Other Watech Growth Services
              </h3>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((os) => (
              <Link
                key={os.slug}
                href={`/services/${os.slug}`}
                className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#2563EB]">
                    {os.badge}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-[#2563EB] transition-colors">
                    {os.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {os.heroDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-[#2563EB]">Learn More</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}