"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  className?: string
}

export default function SearchBar({ className = "" }: SearchBarProps) {
  return (
    <div className={`flex w-full ${className}`}>
      <input
        type="text"
        placeholder="Search Here"
        className="flex-1 px-4 py-3 bg-gray-200 rounded-l-lg border-0 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 placeholder-gray-500"
      />
      <button 
        className="px-6 py-3 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
} 