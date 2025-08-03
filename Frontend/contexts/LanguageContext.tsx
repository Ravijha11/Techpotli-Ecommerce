"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Language {
  code: string
  name: string
  nativeName: string
}

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  languages: Language[]
  isHydrated: boolean
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' }
]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // This runs only on the client after hydration
    const saved = localStorage.getItem('techpotli-language')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const savedLanguage = languages.find(lang => lang.code === parsed.code)
        if (savedLanguage) {
          setCurrentLanguage(savedLanguage)
        }
      } catch (error) {
        console.error('Failed to parse saved language:', error)
      }
    }
    setIsHydrated(true)
  }, [])

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language)
    // Save to localStorage only on client
    if (typeof window !== 'undefined') {
      localStorage.setItem('techpotli-language', JSON.stringify(language))
    }
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages, isHydrated }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 