"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Download, X, Share2, PlusSquare, Smartphone, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [installedSuccessfully, setInstalledSuccessfully] = useState(false);

  useEffect(() => {
    // 1. Check if already running in standalone app mode
    const standaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    setIsStandalone(standaloneMode);
    if (standaloneMode) return;

    // 2. Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isAppleDevice);

    // 3. Check dismissal snooze (3 days)
    const dismissedAt = localStorage.getItem("watech_pwa_dismissed");
    const isSnoozed = dismissedAt && Date.now() - parseInt(dismissedAt, 10) < 3 * 24 * 60 * 60 * 1000;

    // 4. Android / Chromium beforeinstallprompt handler
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isSnoozed) {
        setShowBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. Detect successful install
    const handleAppInstalled = () => {
      setInstalledSuccessfully(true);
      setShowBanner(false);
      setDeferredPrompt(null);
      setTimeout(() => setInstalledSuccessfully(false), 5000);
    };

    window.addEventListener("appinstalled", handleAppInstalled);

    // 6. If iOS and not snoozed, show banner after 3 seconds
    let iosTimer: NodeJS.Timeout | null = null;
    if (isAppleDevice && !isSnoozed) {
      iosTimer = setTimeout(() => {
        setShowBanner(true);
      }, 3000);
    }

    // 7. Global custom event listener for any button on the site to trigger install
    const handleTriggerInstall = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choice) => {
          if (choice.outcome === "accepted") {
            setShowBanner(false);
          }
          setDeferredPrompt(null);
        });
      } else if (isAppleDevice) {
        setShowIosModal(true);
      } else {
        const downloadSec = document.getElementById("install-guide-section");
        if (downloadSec) {
          downloadSec.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/download";
        }
      }
    };

    window.addEventListener("trigger-pwa-install", handleTriggerInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("trigger-pwa-install", handleTriggerInstall);
      if (iosTimer) clearTimeout(iosTimer);
    };
  }, [deferredPrompt]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          setShowBanner(false);
        }
        setDeferredPrompt(null);
      });
    } else if (isIos) {
      setShowIosModal(true);
    } else {
      window.location.href = "/download";
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("watech_pwa_dismissed", Date.now().toString());
  };

  if (isStandalone) return null;

  return (
    <>
      {/* 1. Floating Bottom Install Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.aside
            aria-label="Watech Mobile App Installation Banner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700/60 flex items-center justify-between gap-3.5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
                <Image
                  src="/images/watech-logo-transparent.png"
                  alt="Watech App Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs sm:text-sm font-bold truncate text-white">
                    Watech Mobile App
                  </h3>
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold rounded-md uppercase">
                    0 MB
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate">
                  {isIos
                    ? "iPhone screen par 1-tap add karein"
                    : "Mobile drawer mein bina warning install karein"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 2. Success Toast */}
      <AnimatePresence>
        {installedSuccessfully && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold"
          >
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span>Watech App kamyabi se aapke mobile mein install ho gayi hai!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. iPhone / iOS Guided Modal */}
      <AnimatePresence>
        {showIosModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 relative"
            >
              <button
                onClick={() => setShowIosModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    iPhone Par Watech App Lagayein
                  </h3>
                  <p className="text-xs text-slate-500">
                    Apple Safari se sirf 2 seconds ka asaan tareeqa
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-700 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Share Button:</span> Neeche Safari bar mein mojood{" "}
                    <strong className="inline-flex items-center gap-1 text-blue-600 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">
                      <Share2 className="w-3.5 h-3.5" /> Share icon
                    </strong>{" "}
                    par tap karein.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Add to Home Screen:</span> Thora neeche scroll karein aur{" "}
                    <strong className="inline-flex items-center gap-1 text-slate-900 font-semibold bg-slate-200 px-1.5 py-0.5 rounded">
                      <PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen
                    </strong>{" "}
                    select karein.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div className="text-xs text-slate-600">
                    Upar right corner mein <strong>&quot;Add&quot;</strong> dabayein. Watech App aapke iPhone par native app ki tarah aa jayegi!
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIosModal(false)}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 transition-all cursor-pointer"
              >
                Samajh Aa Gaya
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
