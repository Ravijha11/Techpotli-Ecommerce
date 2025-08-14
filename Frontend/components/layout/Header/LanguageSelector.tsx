"use client"

import { useState } from "react"
import { ChevronDown, Globe } from "lucide-react"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage, setLanguage, languages } = useLanguage()

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageSelect = (language: { code: string; name: string; nativeName: string }) => {
    setLanguage(language)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button 
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105"
        onClick={handleClick}
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
        <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50 max-h-64 overflow-y-auto">
          {languages.map((language) => (
            <button
              key={language.code}
              className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 cursor-pointer text-sm flex items-center justify-between hover:text-gray-900 transition-all duration-200"
              onClick={() => handleLanguageSelect(language)}
            >
              <span>{language.nativeName}</span>
              <span className="text-xs text-gray-400">({language.name})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 