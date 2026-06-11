"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { t, type Locale } from "@/lib/translations";

type Translations = (typeof t)[Locale];

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  tr: Translations;
  aiLang: "EN" | "HI";
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "hi",
  setLocale: () => {},
  tr: t.hi,
  aiLang: "HI",
});

function getInitialLocale(): Locale {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("nyayasetu-lang");
    if (saved === "hi" || saved === "en") return saved;
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("nyayasetu-lang", newLocale);
    }
  }, []);

  const value: LanguageContextType = {
    locale,
    setLocale,
    tr: t[locale],
    aiLang: locale === "hi" ? "HI" : "EN",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
