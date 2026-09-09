"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  category: "General" | "Services" | "Furniture" | "Real Estate" | "FMCG Wholesale";
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    category: "General",
    question: "WATECH Solutions kya hai aur yeh aam marketplace se kaise mukhtalif hai?",
    answer:
      "WATECH Pakistan ka pehla integrated multi-sector ecosystem hai. Yeh sirf aam directory nahi hai, balki Real Estate, Chinioti Handcrafted Furniture, Rozmarrah Kiryana Wholesale (FMCG) aur Food & Catering ko advanced Digital Marketing aur WhatsApp automation ke sath jodta hai taake buyers ko authentic cheezein aur businesses ko direct sales milein.",
  },
  {
    category: "Services",
    question: "WATECH Digital Agency hamare business ki sales aur leads kaise barha sakti hai?",
    answer:
      "Hum Pakistani consumers ke behavior ke mutabiq targeted Meta & TikTok Ads run karte hain, automated WhatsApp CRM setup karte hain jo har aane wali inquiry ko foran reply karta hai, aur high-converting modern web portals banate hain. Hamara main focus vanity metrics nahi balki direct cashflow aur confirmed customer orders hain.",
  },
  {
    category: "Furniture",
    question: "Kya aapka Chinioti Furniture 100% authentic aur pure lakri ka hota hai?",
    answer:
      "Ji 100%! Hamare tamam 774+ designs Chiniot ke puraney maahir karigaron ke hath se bani hui 100% seasoned Sheesham aur Rosewood se tayyar kiye jate hain. Har furniture piece termite-treated hota hai aur structure ki 10 saal tak ki guarantee di jaati hai. Delivery poore Pakistan aur international export ke zariye hoti hai.",
  },
  {
    category: "FMCG Wholesale",
    question: "Rozmarrah Ashiya & Kiryana Wholesale (FMCG) mein order kaise place hota hai?",
    answer:
      "Kiryana dukaandar, mart owners, canteens aur caterers hamare portal ya direct WhatsApp helpline par apni required items (Atta, Ghee, Cooking Oil, Rice, Daalein, Spices, Beverages) ki list bhejte hain. Hamein mill-direct rate par bulk supply provide karte hain aur fast logistics ke zariye doorstep delivery karte hain.",
  },
  {
    category: "Real Estate",
    question: "Real Estate properties ki verification ka kya process hai?",
    answer:
      "Hamare platform par listed properties (LDA/RDA/CDA approved societies jaise DHA, Bahria, New Metro City) ki registry, fard aur society transfer documentation verify ki jaati hai. Buyer ka direct rabta verified owners ya authorised partners se karwaya jata hai bina kisi fuzool commissions ke.",
  },
  {
    category: "General",
    question: "Partner ya Vendor banne ka kya procedure hai aur kya koi fee hai?",
    answer:
      "WATECH Partner Program mein shamil hone ki 0% Registration Fee hai — bilkul FREE! Agar aap property agent, furniture manufacturer, Kiryana stockist ya event service provider hain, toh aap 'Partners' page se register ho kar apna inventory poore Pakistan mein promote karwa sakte hain.",
  },
];

export const HomeFaqs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", "Services", "Furniture", "FMCG Wholesale", "Real Estate", "General"];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    if (filterCategory === "All") return true;
    return faq.category === filterCategory;
  });

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full py-20 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Aam Taur Par Pooche Gaye Sawalaat
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            WATECH Solutions, hamari services, Chinioti furniture aur wholesale purchasing ke bare mein mukammal rehnumai.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
                }`}
              >
                {cat === "FMCG Wholesale" ? "Kiryana / FMCG" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-slate-900 leading-snug">
                    {faq.question}
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
                        {faq.answer}
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
              Mazeed Koi Sawal Ya Specific Requirement Hai?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hamari team WhatsApp par live mojood hai, abhi direct baat karein.
            </p>
          </div>
          <a
            href="https://wa.me/923270831470?text=Assalam%20o%20Alaikum%20WATECH%2C%20Mujhe%20mazeed%20information%20chahiye."
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Par Poochain</span>
          </a>
        </div>
      </div>
    </section>
  );
};
