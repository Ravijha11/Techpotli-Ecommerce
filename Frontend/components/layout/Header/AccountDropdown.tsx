"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown, User, Package, Heart, Gift, CreditCard, LogOut, Crown, Settings, Bell } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

export default function AccountDropdown() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      icon: User,
      label: t('header.myProfile'),
      href: '/profile',
      description: 'Manage your account settings'
    },
    {
      icon: Crown,
      label: t('header.ishopPlusZone'),
      href: '/plus-zone',
      description: 'Exclusive benefits for Plus members',
      badge: 'Plus'
    },
    {
      icon: Package,
      label: t('header.orders'),
      href: '/orders',
      description: 'Track your orders and history'
    },
    {
      icon: Heart,
      label: t('header.wishList'),
      href: '/wishlist',
      description: 'Your saved items'
    },
    {
      icon: Gift,
      label: t('header.rewards'),
      href: '/rewards',
      description: 'Earn and redeem points'
    },
    {
      icon: CreditCard,
      label: t('header.giftCards'),
      href: '/gift-cards',
      description: 'Buy and manage gift cards'
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        className="flex items-center space-x-2 cursor-pointer hover:text-purple-600 transition-colors"
        onClick={handleClick}
      >
        <span className="font-bold text-gray-900">{t('header.account')}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          {/* Caret */}
          <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
          
          {/* User Info Section */}
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900 font-medium text-sm">Welcome back!</p>
                <p className="text-gray-600 text-xs">Manage your account</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2 max-h-96 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
              >
                <div className="relative">
                  <item.icon className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 text-sm font-medium">{item.label}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100"></div>

          {/* Settings and Logout */}
          <div className="py-2">
            <Link 
              href="/settings"
              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
            >
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
              <span className="text-gray-900 text-sm">Settings</span>
            </Link>
            
            <button 
              className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left group"
              onClick={() => {
                // Handle logout logic here
                console.log('Logout clicked')
                setIsOpen(false)
              }}
            >
              <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
              <span className="text-gray-900 text-sm group-hover:text-red-600">{t('header.logout')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 