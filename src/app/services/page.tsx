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
} from "lucide-react";
import { submitInquiry } from "@/lib/firebase/client";

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    serviceRequired: "Website & App Development",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const services = [
    {
      id: "card-1",
      icon: Globe,
      badge: "Web & Mobile",
      title: "Website & App Development",
      description: "Custom WordPress, Next.js websites, and mobile apps engineered for speed, high SEO ranking, and conversions.",
      points: ["High-speed Next.js platforms", "Property & catalog search engines", "Custom customer portals"],
    },
    {
      id: "card-2",
      icon: Smartphone,
      badge: "Performance Marketing",
      title: "Social Media Management",
      description: "Facebook, Instagram, TikTok — content creation & targeted paid ads designed to generate qualified local inquiries.",
      points: ["High-converting meta ads", "Reels & TikTok visual reels", "Audience retargeting"],
    },
    {
      id: "card-3",
      icon: Bot,
      badge: "Instant Chat",
      title: "WhatsApp Automation",
      description: "AI bots, auto-replies, and broadcast campaigns tailored for Pakistan's most effective communication channel.",
      points: ["Instant lead response in <30s", "Catalog sent directly on WhatsApp", "Automated follow-up sequences"],
    },
    {
      id: "card-4",
      icon: BarChart3,
      badge: "Operations & Sales",
      title: "CRM & Consulting",
      description: "SuiteCRM setup, sales funnel strategy, and team training to prevent lead leakage and close deals faster.",
      points: ["Lead pipeline tracking", "Agent commission accounting", "Staff workflow training"],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    try {
      await submitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceRequired: formData.serviceRequired,
        message: formData.message,
        category: "service",
      });

      setToastMessage("We'll contact you within 24 hours");
      setFormData({
        name: "",
        phone: "",
        email: "",
        serviceRequired: "Website & App Development",
        message: "",
      });

      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#2563EB] selection:text-white">
      {/* =========================================
          TOAST NOTIFICATION
          ========================================= */}
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

      {/* =========================================
          HERO SECTION (BLUE THEME)
          ========================================= */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Watech Digital Services</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Digital Solutions for Real Estate, Furniture & Events
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed"
          >
            We help businesses grow with modern tech and marketing
          </motion.p>
        </div>
      </section>

      {/* =========================================
          4 SERVICE CARDS (2x2 Desktop Grid)
          ========================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
            Specialized Offerings
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-2">
            Engineered For Tangible Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white border border-slate-100 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-base mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {service.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, serviceRequired: service.title }));
                  }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
                >
                  Request this service
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================
          CONTACT SECTION ("Ready to Grow?")
          ========================================= */}
      <section id="contact" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2563EB]">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mt-2">
              Ready to Grow?
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Leave your requirements and our team will get back to you with a strategy blueprint.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mahmood"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Service Required
                </label>
                <select
                  value={formData.serviceRequired}
                  onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm transition-all bg-white"
                >
                  <option value="Website & App Development">Website & App Development</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="WhatsApp Automation">WhatsApp Automation</option>
                  <option value="CRM & Consulting">CRM & Consulting</option>
                  <option value="Complete Ecosystem Solution">Complete Ecosystem Solution</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Message & Project Brief
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your business goals, current setup, and timeline..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-full bg-[#2563EB] text-white font-bold text-sm tracking-wide shadow-md hover:bg-blue-700 hover:shadow-blue-500/25 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Book a Free Consultation</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* =========================================
          CROSS-LINK SECTION (PARTNER PROPOSITION)
          ========================================= */}
      <section className="py-16 px-6 bg-white border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/partners"
            className="inline-flex items-center gap-3 text-base md:text-lg font-semibold text-slate-700 hover:text-[#EA580C] transition-colors group"
          >
            <span>Want free leads instead?</span>
            <span className="text-[#EA580C] underline underline-offset-4 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Join our Partner Ecosystem →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
