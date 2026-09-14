import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Smartphone,
  CheckCircle2,
  Lock,
  Share2,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Download Watech Android App (.APK) | Official Mobile App",
  description:
    "Download the official Watech Solutions Android App (.APK). Lightweight 3.35 MB signed build, high-speed download, live property and furniture tracking.",
};

export default function DownloadAppPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs md:text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Official Android APK &bull; Lightweight 3.35 MB &bull; Signed Build</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Download <span className="text-blue-600">Watech Android App</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Real Estate listings, Chinioti luxury furniture marketplace, aur automated business tracking. Apne ya client ke mobile mein <strong>direct Android application (.APK)</strong> download aur install karein.
          </p>
        </div>

        {/* Primary Android APK Download Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-blue-600 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-extrabold uppercase tracking-wider py-1.5 px-4 rounded-bl-2xl shadow-sm">
            ⭐ Official Android APK
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
              <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
                <Smartphone className="w-10 h-10" />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Watech Solutions Mobile App
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Standalone Android Application Package (APK) &bull; Version 1.0.2
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                    <Zap className="w-3 h-3" /> Size: 3.35 MB (Fast 2s Download)
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                    <FileCheck className="w-3 h-3" /> Signed & Verified
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    Android 8.0 to Android 15
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Big Download CTA Button */}
            <div className="space-y-4 mb-8">
              <a
                href="/downloads/watech-solutions.apk"
                download="watech-solutions.apk"
                className="w-full flex items-center justify-center gap-3 py-5 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 text-center cursor-pointer"
              >
                <Download className="w-6 h-6 animate-bounce" />
                <span>Download Android App APK (3.35 MB)</span>
              </a>
              <p className="text-center text-xs text-slate-500">
                Direct file download shuru ho jayegi. Purani 67MB wali build ke bajaye yeh sirf <strong>3.35 MB</strong> ki hai jo foran download ho jati hai.
              </p>
            </div>

            {/* Android Security Notice (Very clear explanation) */}
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-sm leading-relaxed mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">
                    Android Installation Note (&quot;File might be harmful&quot; Alert):
                  </h4>
                  <p className="text-xs text-amber-800 leading-normal">
                    Google Play Store ke bahar se aap koi bhi APK download karein (chahay WhatsApp ki apni official website se ho), Android system hamesha security notice dikhata hai.
                  </p>
                  <div className="mt-2 text-xs font-medium text-amber-900 space-y-1">
                    <div>1. Download karte waqt <strong>&quot;Download anyway&quot;</strong> par tap karein.</div>
                    <div>2. Open karte waqt agar permission mangey toh <strong>&quot;Settings &rarr; Allow from this source&quot;</strong> on karein aur <strong>Install</strong> dabayein.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mobile App Drawer mein official icon add hoga</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Admin panel se live sync (Real-time updates)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct 1-Tap WhatsApp Lead launcher</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Native full-screen application feel</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Step Installation Flow */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 text-center">
            Mobile Mein Install Karne Ke 3 Aasaan Steps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-3 shadow-md shadow-blue-600/20">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Download Dabayein</h3>
              <p className="text-xs text-slate-600">
                Upar blue button par tap karein. 3.35 MB ki file sirf 2-3 seconds mein phone mein save ho jayegi.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-3 shadow-md shadow-blue-600/20">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Download Anyway</h3>
              <p className="text-xs text-slate-600">
                Agar Chrome &quot;File might be harmful&quot; poochay toh <strong>Download anyway</strong> select karein.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center mb-3 shadow-md shadow-blue-600/20">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Install &amp; Open</h3>
              <p className="text-xs text-slate-600">
                Notification par tap karke <strong>Install</strong> karein. App aapke mobile menu mein aa jayegi!
              </p>
            </div>
          </div>
        </div>

        {/* iPhone / iOS Alternative Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                iPhone (Apple iOS) Users Ke Liye:
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                Apple security rules ki wajah se iPhone par direct .APK file install nahi hoti. iPhone users Safari browser mein <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-600 font-mono text-xs">waseemabbas.online</code> khol kar <strong>Share &rarr; Add to Home Screen</strong> karein.
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="shrink-0 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors"
          >
            Open in Safari
          </Link>
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
                Q: Pehle download fail kyun ho rahi thi aur ab kyun nahi hogi?
              </h3>
              <p className="text-slate-600">
                Pehle app ka size 67 MB tha jisse slow mobile connection par download ruk jati thi. Humne poori app ko re-compile karke sirf <strong>3.35 MB</strong> ka lightweight package bana diya hai jo kisi bhi connection par 2 second mein download ho jata hai.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: &quot;File might be harmful&quot; alert se koi khatra toh nahi?
              </h3>
              <p className="text-slate-600">
                Bilkul nahi! Yeh Android operating system ka har us file par default alert hota hai jo Play Store ke bahar se download ho. Hamari APK official RSA-2048 digital encryption key se verified hai aur 100% safe hai.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Kya admin panel se naye plots ya furniture add karne par app khud update hogi?
              </h3>
              <p className="text-slate-600">
                Jee haan! App cloud database se connected hai. Jaise hi aap admin panel par koi item update ya delete karenge, app kholne par customer ko live latest data hi nazar aayega.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Kisi bhi maslay ki soorat mein CEO Waseem Abbas se direct WhatsApp par rabta karein.
            </p>
            <a
              href="https://wa.me/923177651230?text=Assalam-o-Alaikum%20Waseem%20Bhai!%20Mujhe%20Android%20App%20download%20ke%20hawale%20se%20madad%20chahiye"
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
