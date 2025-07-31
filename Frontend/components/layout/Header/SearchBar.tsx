"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  className?: string
}

export default function SearchBar({ className = "" }: SearchBarProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
      />
      <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors">
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
} 