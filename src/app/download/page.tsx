import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Smartphone,
  Zap,
  CheckCircle2,
  Lock,
  Share2,
  RefreshCw,
  HelpCircle,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Install Watech Mobile App | Instant PWA for iOS & Android",
  description:
    "Install the official Watech Solutions Mobile App on Android and iPhone. Instant launch, 0 MB storage, real-time live property and furniture sync, and zero warnings.",
};

export default function DownloadAppPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs md:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Official Progressive Web App (PWA) &bull; Zero Permissions &bull; Instant Sync</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Watech Solutions <span className="text-emerald-600">Mobile App</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Real Estate listings, authentic Chinioti furniture marketplace, aur automated business tools ab aapke mobile home screen par. <strong>Bina kisi warning, bina storage bhare</strong>, direct 1-click mein install karein.
          </p>
        </div>

        {/* Featured App Showcase Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl mb-16 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Zap className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Instant Web App — Kisi App Store Ki Zaroorat Nahi
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Yeh modern Progressive Web App standard hai jo direct aapke browser (Chrome ya Safari) se verified install hota hai. Koi <strong>&quot;Harmful file&quot; warning nahi</strong> aati aur na hi phone ki storage bharti hai.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-10">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>0 MB Storage</span>
                </div>
                <p className="text-xs text-slate-500">Phone memory bilkul zaya nahi hoti.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>100% Safe & Clean</span>
                </div>
                <p className="text-xs text-slate-500">Zero security warnings ya harmful alerts.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Auto Cloud Sync</span>
                </div>
                <p className="text-xs text-slate-500">Admin panel updates foran reflect hote hain.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Full Screen Mode</span>
                </div>
                <p className="text-xs text-slate-500">Browser bar gayab, pure native app look.</p>
              </div>
            </div>

            {/* Quick Launch CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Launch App Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Step-by-Step Installation Guides (Android vs iPhone) */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Sirf 2 Seconds Mein Home Screen Par Kaise Lagayein?
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Aapke phone ke mutabiq asaan tareeqa:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Android Guide */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Android Users</h3>
                  <p className="text-xs text-slate-500">Google Chrome / Samsung Internet</p>
                </div>
              </div>

              <ol className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong>Website Open Karein:</strong> Chrome browser mein <code className="text-emerald-700 font-mono text-xs bg-emerald-50 px-2 py-0.5 rounded">waseemabbas.online</code> kholien.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong>Menu Open Karein:</strong> Upar right corner mein <strong>3 Dots (⋮)</strong> par tap karein.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong>&quot;Install app&quot; ya &quot;Add to Home screen&quot;</strong> select karein. Watech App aapke phone screen par save ho jayegi!
                  </div>
                </li>
              </ol>
            </div>

            {/* iPhone / iOS Guide */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">iPhone / iPad Users</h3>
                  <p className="text-xs text-slate-500">Apple Safari Browser</p>
                </div>
              </div>

              <ol className="space-y-4 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong>Safari Mein Open Karein:</strong> Apne iPhone par Safari khol kar <code className="text-blue-700 font-mono text-xs bg-blue-50 px-2 py-0.5 rounded">waseemabbas.online</code> par jayein.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong>Share Button Dabayein:</strong> Neeche mojood <strong>Share icon (Square + Up Arrow)</strong> par tap karein.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong>&quot;Add to Home Screen&quot;</strong> choose karein. App aapke iPhone par native app ki tarah save ho jayegi!
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Security & Reliability Architecture */}
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            PWA Technology Ke Faide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">SSL Certified & Virus Free</h3>
              <p className="text-sm text-slate-600">
                Tamam data 256-bit SSL encryption se secured hai. Google Play Protect ya kisi third-party security warning ka koi sawal hi paida nahi hota.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Real-Time Cloud Sync</h3>
              <p className="text-sm text-slate-600">
                Jab bhi admin panel se koi property, furniture piece ya package update hota hai, app par foran live dikhai deta hai bina dobara install kiye.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Battery & Data Friendly</h3>
              <p className="text-sm text-slate-600">
                Pakistan ke 3G/4G networks ke liye fast-caching algorithms tayyar kiye gaye hain taake slow internet par bhi app 1 second mein open ho.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-slate-100 rounded-3xl p-8 md:p-10 border border-slate-200">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Aam Tor Par Pooche Gaye Sawalaat (FAQs)</h2>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Kya is app ko install karne ke liye Google Play Store ya App Store ki zaroorat hai?
              </h3>
              <p className="text-slate-600">
                Nahi! Yeh Google aur Apple ka verified Progressive Web App (PWA) standard hai jo bina kisi store ke direct browser se 1 click mein official app ban kar aapke phone screen par add ho jata hai.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Kya phone par &quot;File might be harmful&quot; ya koi security warning aayegi?
              </h3>
              <p className="text-slate-600">
                Hargiz nahi! Yeh Google aur Apple ka modern verified web app standard hai, is liye phone par koi harmful file ka alert ya unknown source ka permission nahi mangi jati. Yeh 100% safe, clean aur secure hai.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">
                Q: Jab admin panel se koi property ya furniture change hoga toh kya mujhe dubara download karna hoga?
              </h3>
              <p className="text-slate-600">
                Bilkul nahi! Jaise hi aap app kholenge, cloud data automatically refresh ho jayega aur aapko hamesha fresh live rate aur inventory nazar aayegi.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Kisi bhi mushkil ki soorat mein CEO Waseem Abbas aur engineering support team se rabta karein.
            </p>
            <a
              href="https://wa.me/923177651230?text=Assalam-o-Alaikum%20Waseem%20Bhai!%20Mujhe%20Watech%20Mobile%20App%20ke%20hawale%20se%20rabta%20karna%20hai"
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
