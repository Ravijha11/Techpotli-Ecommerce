"use client"

import { Search } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

interface SearchBarProps {
  className?: string
}

export default function SearchBar({ className = "" }: SearchBarProps) {
  const { t } = useTranslation()
  
  return (
    <div className={`flex w-full ${className}`}>
      <input
        type="text"
        placeholder={t('header.searchPlaceholder')}
        className="flex-1 px-4 py-3 bg-gray-100 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-gray-400"
      />
      <button 
        className="px-6 py-3 bg-[#470096] text-white rounded-r-lg hover:bg-[#3a007a] transition-colors flex items-center justify-center"
        aria-label={t('header.searchPlaceholder')}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
} 