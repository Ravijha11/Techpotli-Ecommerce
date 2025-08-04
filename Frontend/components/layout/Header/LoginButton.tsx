"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
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
      <button
        className="flex items-center space-x-1 cursor-pointer hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md px-2 py-1"
        onClick={handleClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Login menu"
      >
        <ArrowRight className="w-4 h-4" />
        <span className="hidden sm:inline">{t('header.login')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {/* Login Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
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