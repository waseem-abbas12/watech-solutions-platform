"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Download,
  Smartphone,
  CheckCircle2,
  Share2,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Zap,
  Sparkles,
  ArrowRight,
  PlusSquare,
} from "lucide-react";

export function DownloadClient() {
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      setIsStandalone(standalone);

      const ua = window.navigator.userAgent.toLowerCase();
      setIsIos(/iphone|ipad|ipod/.test(ua));
    }
  }, []);

  const triggerInstall = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("trigger-pwa-install"));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs md:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Universal Mobile Solution &bull; Android + iPhone (iOS) &bull; Zero Lag</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Watech Solutions <span className="text-blue-600">Mobile App</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Real Estate plots, authentic Chinioti luxury furniture marketplace, aur automated business tracking. Apne mobile ke andar <strong>1-click mein app install karein</strong>.
          </p>
        </div>

        {/* METHOD 1: SMART 1-TAP INSTALL (RECOMMENDED FOR ALL PHONES) */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-white/20 backdrop-blur-md text-white text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-bl-2xl">
            ⭐ 100% Free &bull; Zero Warnings
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold mb-4">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Android &amp; iPhone Dono Ke Liye Recommended</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Direct Phone Mein Install Karein (1-Tap)
            </h2>
            <p className="text-emerald-50 text-sm sm:text-base leading-relaxed mb-6">
              Koi &quot;File might be harmful&quot; alert nahi aayega, koi permission nahi mangi jayegi, aur phone ki storage (0 MB) bhi nahi bharegi. Direct phone ke app menu mein icon save ho jayega.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <button
                onClick={triggerInstall}
                className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 font-extrabold text-base sm:text-lg shadow-xl shadow-black/20 transition-all cursor-pointer"
              >
                <Smartphone className="w-6 h-6 text-emerald-700" />
                <span>Is Phone Mein Install Karein</span>
                <ArrowRight className="w-5 h-5 text-emerald-700" />
              </button>

              <div className="text-xs text-emerald-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Admin panel se har update foran auto-sync hoga</span>
              </div>
            </div>

            {/* Platform instructions badge */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/20 text-xs text-emerald-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                <span><strong>Android (Chrome):</strong> Button dabayein aur &quot;Install&quot; confirm karein.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-300"></span>
                <span><strong>iPhone (Safari):</strong> Neeche Share &rarr; Add to Home Screen karein.</span>
              </div>
            </div>
          </div>
        </div>

        {/* METHOD 2: DIRECT ANDROID APK (STANDALONE BINARY) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-all mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Download className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Standalone Android APK File
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                    3.35 MB
                  </span>
                </div>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Agar aap raw .apk file phone ke Downloads folder mein save karke manual install karna chahte hain.
                </p>
              </div>
            </div>

            <a
              href="/downloads/watech-solutions.apk"
              download="watech-solutions.apk"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all active:scale-95 text-center cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download APK (3.35 MB)</span>
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
            <strong>Android Download Note:</strong> Google Play Store ke bahar se direct APK par phone &quot;File might be harmful&quot; alert dikhata hai. Install karne ke liye <strong>&quot;Download anyway&quot;</strong> select karein. (Agar aap yeh warning nahi chahte, toh upar wala green 1-Tap option use karein).
          </div>
        </div>

        {/* Step-by-Step Installation Guides */}
        <div id="install-guide-section" className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              iPhone Aur Android Par Install Karne Ka Tareeqa
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Aapke phone ke mutabiq asaan steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Android Chrome */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  🤖
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Android Phones</h3>
                  <p className="text-xs text-slate-500">Samsung, Xiaomi, Vivo, Oppo, Infinix, Tecno</p>
                </div>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Website khol kar upar wala <strong>&quot;Is Phone Mein Install Karein&quot;</strong> button dabayein.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Ya Chrome ke <strong>3 Dots (⋮)</strong> par tap karke <strong>&quot;Install app&quot;</strong> select karein.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>App bina kisi warning ke phone ke app drawer mein aa jayegi!</span>
                </li>
              </ol>
            </div>

            {/* iPhone Safari */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  🍎
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Apple iPhone / iPad</h3>
                  <p className="text-xs text-slate-500">Apple Safari Browser</p>
                </div>
              </div>

              <ol className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>Safari browser mein neeche <strong>Share icon (Square + Up Arrow)</strong> dabayein.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Neeche scroll karke <strong>&quot;Add to Home Screen&quot;</strong> par tap karein.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Upar <strong>&quot;Add&quot;</strong> dabayein. Watech App iPhone par native app ban jayegi!</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Zaroori Sawalaat (FAQs)</h2>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Kya admin panel se plots ya furniture delete/add karne par app khud update hogi?
              </h3>
              <p className="text-slate-600">
                Jee haan! App direct website ke cloud database se linked hai. Jaise hi aap admin panel se koi property, package ya furniture change karenge, phone app mein foran reflect hoga bina dobara download kiye.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Phone storage kitni use hogi?
              </h3>
              <p className="text-slate-600">
                Taqreeban 0 MB! Yeh modern lightweight standard hai jo aapke phone ki memory zaya nahi karta aur Pakistan ke 3G/4G networks par high speed khulta hai.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Kisi bhi maslay ki soorat mein CEO Waseem Abbas se WhatsApp par direct rabta karein.
            </p>
            <a
              href="https://wa.me/923177651230?text=Assalam-o-Alaikum%20Waseem%20Bhai!%20Mujhe%20Watech%20Mobile%20App%20ke%20hawale%20se%20rabta%20karna%20hai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

