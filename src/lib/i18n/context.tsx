"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { Dictionary, LanguageOption, SupportedLanguage } from "@/types/i18n";
import { DEFAULT_LANGUAGE, LANGUAGE_OPTIONS, getDictionary } from "./dictionaries";

interface LanguageContextType {
  language: SupportedLanguage;
  currentOption: LanguageOption;
  t: Dictionary;
  setLanguage: (lang: SupportedLanguage) => void;
  isRTL: boolean;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "watech_language";
const COOKIE_KEY = "watech_lang";

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  // 1. URL search param takes highest precedence (e.g. ?lang=ur or ?lang=roman)
  try {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang");
    if (langParam === "en" || langParam === "ur" || langParam === "roman") {
      return langParam;
    }
  } catch {
    // Ignore URL parse error
  }

  // 2. Local storage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ur" || saved === "roman") {
      return saved;
    }
  } catch {
    // LocalStorage blocked
  }

  // 3. Cookie fallback
  try {
    const cookieMatch = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_KEY}=`));
    if (cookieMatch) {
      const val = cookieMatch.split("=")[1];
      if (val === "en" || val === "ur" || val === "roman") {
        return val;
      }
    }
  } catch {
    // Cookie blocked
  }

  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const initial = getInitialLanguage();
    if (initial !== DEFAULT_LANGUAGE) {
      setLanguageState(initial);
      applyLanguageToDOM(initial);
    }
  }, []);

  const applyLanguageToDOM = (lang: SupportedLanguage) => {
    if (typeof document === "undefined") return;

    const opt = LANGUAGE_OPTIONS[lang];
    document.documentElement.lang = opt.hreflang;
    document.documentElement.dir = opt.dir;

    if (lang === "ur") {
      document.documentElement.classList.add("lang-ur");
      document.body.classList.add("font-urdu");
    } else {
      document.documentElement.classList.remove("lang-ur");
      document.body.classList.remove("font-urdu");
    }
  };

  const setLanguage = (newLang: SupportedLanguage) => {
    startTransition(() => {
      setLanguageState(newLang);
      applyLanguageToDOM(newLang);

      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch {
        // Ignored
      }

      try {
        document.cookie = `${COOKIE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {
        // Ignored
      }

      // Sync URL parameter subtly without forcing hard reload if query was present
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has("lang")) {
          url.searchParams.set("lang", newLang);
          window.history.replaceState({}, "", url.toString());
        }
      } catch {
        // Ignored
      }
    });
  };

  const currentOption = LANGUAGE_OPTIONS[language] || LANGUAGE_OPTIONS[DEFAULT_LANGUAGE];
  const t = getDictionary(language);
  const isRTL = currentOption.dir === "rtl";

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentOption,
        t,
        setLanguage,
        isRTL,
        isPending,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside provider
    const t = getDictionary(DEFAULT_LANGUAGE);
    return {
      language: DEFAULT_LANGUAGE,
      currentOption: LANGUAGE_OPTIONS[DEFAULT_LANGUAGE],
      t,
      setLanguage: () => {},
      isRTL: false,
      isPending: false,
    };
  }
  return context;
}
