"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, ChevronDown, LogIn } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"
import {
  NewCustomerSection,
  ProfileSection,
  PlusZoneSection,
  OrdersSection,
  WishlistSection,
  RewardsSection,
  GiftCardsSection,
  SettingsSection,
  LogoutSection
} from "./LoginDropdown"

export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logout functionality')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop Version - Only visible on large screens */}
      <button
        className="hidden lg:flex items-center space-x-2 cursor-pointer hover:text-sky-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 rounded-lg px-3 py-2 hover:bg-sky-50 font-serif"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Login menu"
      >
        <ArrowRight className="w-4 h-4" />
        <span>{t('header.login')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Tablet Version - Only visible on medium screens (768px-1024px) */}
      <button
        className="hidden md:flex lg:hidden items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all duration-200 text-sm font-medium font-serif focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        onClick={handleClick}
        aria-label="Login"
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </button>

      {/* Mobile Version - Only visible on small screens (below 768px) */}
      <button
        className="flex md:hidden items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all duration-200 text-sm font-medium font-serif focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        onClick={handleClick}
        aria-label="Login"
      >
        <LogIn className="w-4 h-4" />
        <span>Login</span>
      </button>
      
      {/* Login Dropdown - Desktop Only */}
      {isOpen && (
        <div className="hidden lg:block absolute top-full right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          {/* Caret */}
          <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
          
          {/* New Customer Section */}
          <NewCustomerSection onClose={handleClose} />

          {/* Menu Items */}
          <div className="py-2 max-h-96 overflow-y-auto">
            <ProfileSection onClose={handleClose} />
            <PlusZoneSection onClose={handleClose} />
            <OrdersSection onClose={handleClose} />
            <WishlistSection onClose={handleClose} />
            <RewardsSection onClose={handleClose} />
            <GiftCardsSection onClose={handleClose} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Settings and Logout */}
          <div className="py-2">
            <SettingsSection onClose={handleClose} />
            <LogoutSection onClose={handleClose} onLogout={handleLogout} />
          </div>
        </div>
      )}
    </div>
  )
} 