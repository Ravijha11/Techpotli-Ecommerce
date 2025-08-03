"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
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
      <div 
        className="flex items-center space-x-1 cursor-pointer hover:text-purple-600 transition-colors"
        onClick={handleClick}
      >
        <span className="text-gray-700">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50 max-h-64 overflow-y-auto">
          {languages.map((language) => (
            <div
              key={language.code}
              className="px-3 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer text-sm flex items-center justify-between"
              onClick={() => handleLanguageSelect(language)}
            >
              <span>{language.nativeName}</span>
              <span className="text-xs text-gray-400">({language.name})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 