"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function AccountDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:text-purple-600 transition-colors"
        onClick={handleClick}
      >
        <span className="font-bold text-gray-900">My Account</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-50">
          {/* Caret */}
          <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
          
          <div className="py-2 px-4 text-gray-900 hover:bg-gray-50 cursor-pointer text-sm">
            Orders
          </div>
          <div className="py-2 px-4 text-gray-900 hover:bg-gray-50 cursor-pointer text-sm">
            Wish List
          </div>
          <div className="py-2 px-4 text-gray-900 hover:bg-gray-50 cursor-pointer text-sm">
            Compared List
          </div>
          <div className="py-2 px-4 text-gray-900 hover:bg-gray-50 cursor-pointer text-sm">
            Vouchers
          </div>
        </div>
      )}
    </div>
  )
} 