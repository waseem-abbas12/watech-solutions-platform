"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";

export const HomeFaqs = () => {
  const { t, language } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const ctaText = {
    en: {
      heading: "Still Have Questions or Specific Requirements?",
      subheading: "Our team is available live on WhatsApp, contact us directly.",
      button: "Ask on WhatsApp",
    },
    ur: {
      heading: "کوئی مزید سوال یا خاص ضرورت ہے؟",
      subheading: "ہماری ٹیم واٹس ایپ پر لائیو دستیاب ہے، ابھی براہِ راست بات کریں۔",
      button: "واٹس ایپ پر پوچھیں",
    },
    roman: {
      heading: "Mazeed Koi Sawal Ya Specific Requirement Hai?",
      subheading: "Hamari team WhatsApp par live mojood hai, abhi direct baat karein.",
      button: "WhatsApp Par Poochain",
    },
  }[language] || {
    heading: "Still Have Questions or Specific Requirements?",
    subheading: "Our team is available live on WhatsApp, contact us directly.",
    button: "Ask on WhatsApp",
  };

  return (
    <section className="w-full py-20 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>{t.faqs.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.faqs.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl mx-auto leading-relaxed">
            {t.faqs.subtitle}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {t.faqs.items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-blue-50 text-[#2563EB] rotate-180" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-lg font-bold text-slate-900">
              {ctaText.heading}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {ctaText.subheading}
            </p>
          </div>
          <a
            href="https://wa.me/923270831470"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{ctaText.button}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
