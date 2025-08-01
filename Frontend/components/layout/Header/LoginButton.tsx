"use client"

import { useState } from "react"
import { ArrowRight, ChevronDown, User, Star, Package, Heart, Gift, CreditCard } from "lucide-react"

export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center space-x-1 cursor-pointer hover:text-purple-600 transition-colors"
        onClick={handleClick}
      >
        <ArrowRight className="w-4 h-4" />
        <span>LOGIN</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Login Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
          {/* Caret */}
          <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
          
          {/* New Customer Section */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 text-sm">New customer?</span>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors text-sm">
                Sign Up
              </button>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 text-sm">My Profile</span>
            </div>
            
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <Star className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 text-sm">ishop Plus Zone</span>
            </div>
            
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <Package className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 text-sm">Orders</span>
            </div>
            
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <Heart className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 text-sm">Wishlist</span>
            </div>
            
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <Gift className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 text-sm">Rewards</span>
            </div>
            
            <div className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="text-gray-900 text-sm">Gift Cards</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 