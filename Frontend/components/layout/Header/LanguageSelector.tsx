"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const languages = ["English", "Hindi", "Spanish", "French"]

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-1 cursor-pointer hover:text-purple-600 transition-colors"
        onClick={handleClick}
      >
        <span className="text-gray-700">{selectedLanguage}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg border border-gray-200 shadow-lg py-1 z-50">
          {languages.map((language) => (
            <div
              key={language}
              className="px-3 py-2 text-gray-700 hover:bg-gray-50 cursor-pointer text-sm"
              onClick={() => handleLanguageSelect(language)}
            >
              {language}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 