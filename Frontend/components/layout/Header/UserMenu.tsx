"use client"

import { ChevronDown } from "lucide-react"

export default function UserMenu() {
  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-1">
        <span className="text-gray-700">My Account</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  )
} 