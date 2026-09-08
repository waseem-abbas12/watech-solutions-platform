"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare, CheckCircle2 } from "lucide-react";
import { submitInquiry } from "@/lib/firebase/client";

export interface ModalItemDetails {
  id: string;
  title: string;
  category: "property" | "furniture" | "event";
  priceFormatted: string;
  partnerPhone: string;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ModalItemDetails | null;
}

export const InquiryModal = ({ isOpen, onClose, item }: InquiryModalProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (item) {
      const categoryName =
        item.category === "property"
          ? "Property"
          : item.category === "furniture"
          ? "Chinioti Furniture Item"
          : "Event Venue/Service";
      setMessage(
        `Assalam-o-Alaikum, I am interested in this ${categoryName}: "${item.title}" (${item.priceFormatted}). Please share further availability and details.`
      );
      setIsSuccess(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      // 1. Store in Firebase inquiries
      await submitInquiry({
        name,
        phone,
        email: "",
        serviceRequired: `${item.category.toUpperCase()}: ${item.title}`,
        message,
        category: item.category,
      });

      // 2. Trigger n8n webhook (if configured) or fallback
      try {
        const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
        if (webhookUrl) {
          await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              leadName: name,
              leadPhone: phone,
              category: item.category,
              itemId: item.id,
              itemTitle: item.title,
              message,
              partnerPhone: item.partnerPhone,
              timestamp: new Date().toISOString(),
            }),
          });
        }
      } catch (webhookErr) {
        console.warn("n8n webhook notification silent fail/not set", webhookErr);
      }

      setIsSuccess(true);

      // 3. Trigger direct WhatsApp notification / connection
      const encodedMsg = encodeURIComponent(
        `New Inquiry from Watech Platform:\nLead Name: ${name}\nPhone: ${phone}\nItem: ${item.title} (${item.priceFormatted})\nMessage: ${message}`
      );
      const whatsappUrl = `https://wa.me/${item.partnerPhone}?text=${encodedMsg}`;

      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-[#16A34A]/10 text-[#16A34A]">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Inquire About Listing</h3>
                <p className="text-xs text-slate-500 truncate max-w-[280px] sm:max-w-xs">{item.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Inquiry Received!</h4>
              <p className="text-sm text-slate-600">
                Opening WhatsApp to connect you directly with the verified partner...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Usman Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Inquiry Message
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#16A34A] text-sm leading-relaxed"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#16A34A] text-white text-sm font-semibold hover:bg-emerald-700 shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Send Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
