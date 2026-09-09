"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Sparkles,
  MessageCircle,
  ArrowRight,
  ExternalLink,
  PhoneCall,
  RotateCcw,
  Minimize2,
} from "lucide-react";
import { ChatRecommendation } from "@/app/api/ai-chat/route";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  recommendations?: ChatRecommendation[];
  directAgent?: boolean;
  time: string;
}

const INITIAL_SUGGESTIONS = [
  "🏡 1 Kanal DHA Lahore Villa",
  "🪑 Chinioti Sheesham Sofa Set",
  "🎉 Royal Palm Banquet Menu Price",
  "📞 Talk to Sales Advisor (Waseem)",
];

export const AiAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-welcome",
      sender: "assistant",
      text: "Assalam-o-Alaikum! Main Watech AI Advisor hoon. Main Real Estate plots, Chinioti luxury furniture aur Event marquee packages ke baray mein aapki madad ke liye hazir hoon. Aap kis cheez ke rate ya inventory dekhna chahte hain?",
      time: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      const assistantMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "Shukriya! Mazeed maloomat ke liye hamare direct WhatsApp par rabta karein.",
        recommendations: data.recommendations || [],
        directAgent: data.directAgent || false,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("AI Assistant Error:", err);
      const errorMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: "Maazrat, rabte mein waqti takheer hui hai. Aap direct hamare WhatsApp (0327-0831470) par foran contact kar sakte hain.",
        directAgent: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const openWhatsAppDirect = (customText?: string) => {
    const text = encodeURIComponent(
      customText ||
        "Assalam-o-Alaikum, I am browsing the Watech Platform and would like to speak with a representative regarding listings and rates."
    );
    window.open(`https://wa.me/923270831470?text=${text}`, "_blank");
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom-Right) */}
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative p-4 rounded-full bg-gradient-to-tr from-slate-950 via-[#2563EB] to-[#16A34A] text-white shadow-2xl hover:shadow-blue-500/30 flex items-center justify-center cursor-pointer group"
              aria-label="Open AI Assistant"
            >
              {/* Online Pulse Beacon */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>

              <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden selection:bg-[#16A34A] selection:text-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-5 py-4 text-white flex items-center justify-between border-b border-slate-700 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#16A34A] flex items-center justify-center shadow-inner">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black tracking-tight">Watech AI Advisor</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Real Estate · Woodcraft · Events
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-[#2563EB] text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`block text-[10px] mt-1 text-right ${
                        msg.sender === "user" ? "text-blue-100" : "text-slate-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>

                  {/* Recommendation Cards */}
                  {msg.recommendations && msg.recommendations.length > 0 && (
                    <div className="w-full mt-3 space-y-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-1">
                        Recommended Listings:
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.recommendations.map((rec) => (
                          <div
                            key={rec.id}
                            className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-[#16A34A] shadow-xs hover:shadow-md transition-all group"
                          >
                            <img
                              src={rec.image}
                              alt={rec.title}
                              className="w-16 h-14 rounded-xl object-cover shrink-0 bg-slate-100"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#16A34A] transition-colors">
                                {rec.title}
                              </h4>
                              <p className="text-[11px] font-black text-[#16A34A] mt-0.5">
                                {rec.price}
                              </p>
                              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                                {rec.detail}
                              </p>
                            </div>
                            <Link
                              href={rec.link}
                              onClick={() => setIsOpen(false)}
                              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#16A34A] hover:text-white transition-all shrink-0"
                              title="View Details"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Direct Agent Contact Card */}
                  {msg.directAgent && (
                    <div className="w-full mt-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Waseem Abbas (Senior Advisor)
                        </div>
                        <div className="text-[11px] text-slate-600">
                          Direct WhatsApp · Instant Response
                        </div>
                      </div>
                      <button
                        onClick={() => openWhatsAppDirect()}
                        className="px-3.5 py-2 rounded-xl bg-[#16A34A] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 shadow-sm transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat Now</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-slate-200 w-24 text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {INITIAL_SUGGESTIONS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(chip)}
                  disabled={isTyping}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#2563EB] text-[11px] font-medium text-slate-600 whitespace-nowrap transition-colors cursor-pointer shrink-0 border border-slate-200/60"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about plots, furniture, banquets in Urdu/English..."
                className="flex-1 px-4 py-3 rounded-2xl bg-slate-100 border border-transparent focus:border-[#2563EB] focus:bg-white text-xs md:text-sm focus:outline-none transition-all"
                disabled={isTyping}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="p-3 rounded-2xl bg-[#2563EB] text-white hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-[#2563EB] transition-all cursor-pointer shadow-md shadow-blue-500/20"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
