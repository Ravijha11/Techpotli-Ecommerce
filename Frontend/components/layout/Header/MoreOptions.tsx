"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Mail, Phone, ShoppingCart, User, Settings, HelpCircle, Info, Package, Heart, Gift, Globe, Languages } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"
import { useLanguage } from "../../../contexts/LanguageContext"
import Link from "next/link"

export default function MoreOptions() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { currentLanguage, setLanguage, languages } = useLanguage()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowLanguageMenu(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    setShowLanguageMenu(false)
  }

  const handleLanguageClick = () => {
    setShowLanguageMenu(!showLanguageMenu)
  }

  const handleLanguageSelect = (language: { code: string; name: string; nativeName: string }) => {
    setLanguage(language)
    setShowLanguageMenu(false)
    setIsOpen(false)
  }

  const menuItems = [
    {
      icon: Globe,
      label: 'Language',
      description: currentLanguage.nativeName,
      action: handleLanguageClick,
      isLink: false,
      isLanguage: true
    },
    {
      icon: Mail,
      label: 'Email',
      description: 'info@techpotli.com',
      action: () => window.location.href = 'mailto:info@techpotli.com',
      isLink: false
    },
    {
      icon: Phone,
      label: 'Phone',
      description: 'Helpline 01147200987',
      action: () => window.location.href = 'tel:01147200987',
      isLink: false
    },
    {
      icon: ShoppingCart,
      label: 'Cart',
      description: 'View your shopping cart',
      action: () => {},
      isLink: true,
      href: '/cart'
    },
    {
      icon: User,
      label: 'My Account',
      description: 'Manage your account',
      action: () => {},
      isLink: true,
      href: '/profile'
    },
    {
      icon: Package,
      label: 'Orders',
      description: 'Track your orders',
      action: () => {},
      isLink: true,
      href: '/orders'
    },
    {
      icon: Heart,
      label: 'Wishlist',
      description: 'Your saved items',
      action: () => {},
      isLink: true,
      href: '/wishlist'
    },
    {
      icon: Gift,
      label: 'Rewards',
      description: 'Earn and redeem points',
      action: () => {},
      isLink: true,
      href: '/rewards'
    },
    {
      icon: Settings,
      label: 'Settings',
      description: 'Manage your preferences',
      action: () => console.log('Settings clicked'),
      isLink: false
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help and contact support',
      action: () => console.log('Help clicked'),
      isLink: false
    },
    {
      icon: Info,
      label: 'About Techpotli',
      description: 'Learn more about our company',
      action: () => console.log('About clicked'),
      isLink: false
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Three Dots Button */}
      <button
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        aria-label="More options"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {/* Main Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl border border-gray-200 shadow-xl z-50 overflow-hidden">
          {/* Caret */}
          <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"></div>
          
          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => (
              item.isLanguage ? (
                <div key={index}>
                  <button
                    onClick={item.action}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left group"
                  >
                    <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-900 text-sm font-medium">{item.label}</span>
                          </div>
                          <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                        </div>
                        <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">Change</span>
                      </div>
                    </div>
                  </button>
                  
                  {/* Language Selection Menu */}
                  {showLanguageMenu && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      <div className="p-3">
                        <div className="flex items-center space-x-2 mb-3">
                          <Languages className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Select Language</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                          {languages.map((language) => (
                            <button
                              key={language.code}
                              className={`p-2 rounded-lg text-left text-sm transition-all duration-200 ${
                                currentLanguage.code === language.code
                                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                              }`}
                              onClick={() => handleLanguageSelect(language)}
                            >
                              <div className="font-medium">{language.nativeName}</div>
                              <div className="text-xs text-gray-500">{language.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : item.isLink ? (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left group"
                >
                  <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 text-sm font-medium">{item.label}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                  </div>
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={item.action}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors w-full text-left group"
                >
                  <item.icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-900 text-sm font-medium">{item.label}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                  </div>
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
