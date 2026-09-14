import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  ShieldCheck,
  Smartphone,
  Zap,
  CheckCircle2,
  Lock,
  Share2,
  RefreshCw,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Download Watech Mobile App | Android APK & PWA",
  description:
    "Official download page for the Watech Solutions Mobile App. High-speed, secure, cryptographically signed Android APK with real-time property, furniture, and lead tracking.",
};

export default function DownloadAppPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs md:text-sm font-semibold mb-4">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Official Verified Build &bull; 100% Virus-Free &bull; Fast Sync</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Watech Solutions <span className="text-blue-600">Mobile App</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Real Estate listings, authentic Chinioti luxury furniture, aur automated business tracking ab aapki ungliyon par. Direct high-speed Android APK ya instant web-app install karein.
          </p>
        </div>

        {/* Primary Download Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Option 1: Android APK */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-bl-2xl">
              Recommended for Android
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                <Smartphone className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Android Release APK</h2>
              <p className="text-slate-600 text-sm mb-6">
                Official signed package. Google Play Store ke bina direct zero-lag download. WhatsApp leads aur notifications instant receive honge.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Cryptographically Signed</strong> (RSA 2048-bit / SHA-256)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Live Cloud Sync</strong> — Har nayi listing foran update hoti hai</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>1-Tap WhatsApp Lead Direct Launch</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span><strong>Low Bandwidth Optimized</strong> (Pakistan networks ready)</span>
                </div>
              </div>
            </div>

            <div>
              <a
                href="/downloads/watech-solutions.apk"
                download
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/25 transition-all text-base"
              >
                <Download className="w-5 h-5" />
                <span>Download Android APK (v1.0)</span>
              </a>
              <p className="text-center text-xs text-slate-500 mt-2">
                Supports Android 8.0 to Android 15 &bull; Size: ~4.5 MB
              </p>
            </div>
          </div>

          {/* Option 2: Instant PWA Install */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <Zap className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Instant PWA (No Download)</h2>
              <p className="text-slate-600 text-sm mb-6">
                Agar aap phone storage bachana chahte hain ya iPhone (iOS) use karte hain, toh 2 second mein direct apne home screen par add karein.
              </p>

              <div className="space-y-4 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    Android / Chrome par:
                  </h3>
                  <p className="text-xs text-slate-600">
                    Browser menu (3 dots) par tap karein aur <strong>&quot;Install app&quot;</strong> ya <strong>&quot;Add to Home screen&quot;</strong> select karein.
                  </p>
                </div>
                <div className="border-t border-slate-200 pt-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
                    <Share2 className="w-4 h-4 text-blue-600" />
                    iPhone / iOS Safari par:
                  </h3>
                  <p className="text-xs text-slate-600">
                    Share icon (square with up arrow) par tap karein aur <strong>&quot;Add to Home Screen&quot;</strong> choose karein.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all text-base"
              >
                <span>Browse Marketplace Online</span>
              </Link>
              <p className="text-center text-xs text-slate-500 mt-2">
                Zero installation size &bull; Works on any modern browser
              </p>
            </div>
          </div>
        </div>

        {/* Security & Architecture Highlights */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Enterprise Security & Engineering Standards
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Strict SSL & End-to-End Encryption</h3>
              <p className="text-sm text-slate-600">
                App ke andar cleartext HTTP traffic 100% blocked hai. Har transaction aur lead safe HTTPS protocol se protect hoti hai.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Re-installation Overhead</h3>
              <p className="text-sm text-slate-600">
                Live cloud synchronization ki wajah se website par aane wale naye updates bina dobara APK download kiye foran reflect hote hain.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Cryptographically Authenticated</h3>
              <p className="text-sm text-slate-600">
                Official digital key se sealed package, taake users ko original aur unmodified Watech platform experience mile.
              </p>
            </div>
          </div>
        </div>

        {/* Installation FAQ Guide */}
        <div className="bg-slate-100 rounded-3xl p-8 md:p-10 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Installation Guide (Android Users)</h2>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Download ke baad phone par &quot;File might be harmful&quot; ya &quot;Unknown sources&quot; ka warning kyun aata hai?
              </h3>
              <p className="text-slate-600">
                Yeh Android ka default security notice hota hai jab aap Google Play Store ke bahar se direct APK install karte hain. Hamari APK official RSA 2048-bit digital key se signed aur 100% clean hai. Aap <strong>&quot;Download anyway&quot;</strong> aur install karte waqt <strong>&quot;Allow from this source&quot;</strong> select karke aasaani se install kar sakte hain.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Kya partners aur agents is app se property ya furniture list kar sakte hain?
              </h3>
              <p className="text-slate-600">
                Jee haan! App ke bottom bar par direct <strong>Partner Portal</strong> ka access mojood hai jahan se agents aur manufacturers foran apni listings upload aur leads monitor kar sakte hain.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Kisi bhi mushkil ki soorat mein hamari engineering support team se rabta karein.
            </p>
            <a
              href="https://wa.me/923000000000?text=Assalam-o-Alaikum,%20mujhe%20Watech%20Mobile%20App%20ke%20bare%20mein%20inquiry%20karni%20hai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
