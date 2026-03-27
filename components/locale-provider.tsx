"use client"

import { createContext, useContext, useEffect, useState } from "react"

import {
  type SiteCopy,
  defaultLocale,
  isLocale,
  localeCookieName,
  localeStorageKey,
  siteCopy,
  type Locale,
} from "@/lib/site-copy"

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  copy: SiteCopy
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode
  initialLocale?: Locale
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(localeStorageKey)

    if (isLocale(storedLocale) && storedLocale !== initialLocale) {
      setLocale(storedLocale)
      return
    }

    if (!storedLocale) {
      const browserLocale = navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en"

      if (browserLocale !== initialLocale) {
        setLocale(browserLocale)
      }
    }
  }, [initialLocale])

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale)
    document.cookie = `${localeCookieName}=${locale}; path=/; max-age=31536000; samesite=lax`
    document.documentElement.lang = locale
    document.title = siteCopy[locale].metadata.title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", siteCopy[locale].metadata.description)
    }
  }, [locale])

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        copy: siteCopy[locale],
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider")
  }

  return context
}
