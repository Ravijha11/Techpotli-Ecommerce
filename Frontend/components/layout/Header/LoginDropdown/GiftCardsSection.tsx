"use client"

import { CreditCard } from "lucide-react"
import { useTranslation } from "../../../../hooks/useTranslation"
import { useAuth } from "../../../../contexts/AuthContext"

interface GiftCardsSectionProps {
  onClose?: () => void
}

export default function GiftCardsSection({ onClose }: GiftCardsSectionProps) {
  const { t } = useTranslation()
  const { isLoggedIn } = useAuth()

  const handleClick = () => {
    onClose?.()
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
      window.location.href = "/login"
    } else {
      // If logged in, go to gift cards page
      window.location.href = "/gift-cards"
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset w-full text-left"
    >
      <div className="relative">
        <CreditCard className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 text-sm font-medium">{t('header.giftCards')}</span>
        </div>
        <p className="text-gray-500 text-xs mt-0.5">
          {isLoggedIn ? "Buy and manage gift cards" : "Login to manage gift cards"}
        </p>
      </div>
    </button>
  )
} 