import { Dictionary, LanguageOption, SupportedLanguage } from "@/types/i18n";
import { enDictionary } from "./en";
import { urDictionary } from "./ur";
import { romanDictionary } from "./roman";

export const LANGUAGE_OPTIONS: Record<SupportedLanguage, LanguageOption> = {
  en: {
    code: "en",
    label: "English",
    nativeName: "English",
    flag: "🇬🇧",
    dir: "ltr",
    locale: "en-PK",
    hreflang: "en",
  },
  ur: {
    code: "ur",
    label: "Urdu",
    nativeName: "اردو",
    flag: "🇵🇰",
    dir: "rtl",
    locale: "ur-PK",
    hreflang: "ur",
  },
  roman: {
    code: "roman",
    label: "Roman Urdu",
    nativeName: "Roman Urdu",
    flag: "🌐",
    dir: "ltr",
    locale: "ur-Latn-PK",
    hreflang: "ur-Latn",
  },
};

export const DICTIONARIES: Record<SupportedLanguage, Dictionary> = {
  en: enDictionary,
  ur: urDictionary,
  roman: romanDictionary,
};

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export function getDictionary(lang: SupportedLanguage): Dictionary {
  return DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANGUAGE];
}
