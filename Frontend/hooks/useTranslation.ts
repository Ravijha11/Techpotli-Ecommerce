"use client"

import { useLanguage } from '../contexts/LanguageContext'
import { useState, useEffect } from 'react'

interface TranslationData {
  [key: string]: any
}

const translationCache: { [key: string]: TranslationData } = {}

export function useTranslation() {
  const { currentLanguage } = useLanguage()
  const [translations, setTranslations] = useState<TranslationData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true)
      try {
        // Check if translations are already cached
        if (translationCache[currentLanguage.code]) {
          setTranslations(translationCache[currentLanguage.code])
        } else {
          // Load translations dynamically
          const translationModule = await import(`../messages/${currentLanguage.code}.json`)
          const translationData = translationModule.default
          translationCache[currentLanguage.code] = translationData
          setTranslations(translationData)
        }
      } catch (error) {
        console.error(`Failed to load translations for ${currentLanguage.code}:`, error)
        // Fallback to English
        try {
          const fallbackModule = await import('../messages/en.json')
          setTranslations(fallbackModule.default)
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError)
          setTranslations({})
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [currentLanguage.code])

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    if (isLoading) return key

    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    if (typeof value !== 'string') {
      return key
    }

    // Replace parameters if provided
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match: string, param: string) => {
        return params[param]?.toString() || match
      })
    }

    return value
  }

  return { t, isLoading, currentLanguage }
} 