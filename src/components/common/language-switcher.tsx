"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n/context";
import { LANGUAGE_OPTIONS } from "@/lib/i18n/dictionaries";
import { SupportedLanguage } from "@/types/i18n";

interface LanguageSwitcherProps {
  variant?: "dropdown" | "pills" | "compact";
  className?: string;
}

export function LanguageSwitcher({
  variant = "dropdown",
  className = "",
}: LanguageSwitcherProps) {
  const { language, setLanguage, currentOption } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languageList = Object.values(LANGUAGE_OPTIONS);

  // Variant 1: Segmented Pills (great for drawers, settings, footers)
  if (variant === "pills") {
    return (
      <div
        className={`inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-inner ${className}`}
        role="group"
        aria-label="Select website language"
      >
        {languageList.map((opt) => {
          const isActive = language === opt.code;
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200/50 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <span className="text-sm leading-none">{opt.flag}</span>
              <span className={opt.code === "ur" ? "font-serif" : ""}>
                {opt.nativeName}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Variant 2: Compact (flag only with subtle code)
  if (variant === "compact") {
    return (
      <div className={`relative inline-block ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer border border-slate-200"
          title={`Active Language: ${currentOption.nativeName}`}
          aria-expanded={isOpen}
        >
          <span className="text-sm">{currentOption.flag}</span>
          <span className="uppercase tracking-wider font-mono text-[10px]">
            {currentOption.code}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-200/80 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            {languageList.map((opt) => {
              const isActive = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setLanguage(opt.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left cursor-pointer transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{opt.flag}</span>
                    <div>
                      <div className={opt.code === "ur" ? "font-serif text-sm" : ""}>
                        {opt.nativeName}
                      </div>
                      <div className="text-[10px] text-slate-600 font-normal">
                        {opt.label}
                      </div>
                    </div>
                  </div>
                  {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Variant 3: Default Dropdown (Clean, modern navbar style)
  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 text-slate-800 text-xs font-semibold transition-all duration-200 hover:shadow-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-blue-500/30"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-blue-600" />
        <span className="text-sm leading-none">{currentOption.flag}</span>
        <span className={currentOption.code === "ur" ? "font-serif" : ""}>
          {currentOption.nativeName}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-100">
            Choose Language / زبان
          </div>
          <div className="py-1 space-y-0.5">
            {languageList.map((opt) => {
              const isActive = language === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setLanguage(opt.code as SupportedLanguage);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left cursor-pointer transition-all duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white font-medium shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{opt.flag}</span>
                    <div>
                      <div
                        className={`leading-tight ${
                          opt.code === "ur" ? "font-serif text-sm font-semibold" : ""
                        }`}
                      >
                        {opt.nativeName}
                      </div>
                      <div
                        className={`text-[10px] ${
                          isActive ? "text-blue-100" : "text-slate-600"
                        }`}
                      >
                        {opt.label}
                      </div>
                    </div>
                  </div>
                  {isActive && <Check className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
