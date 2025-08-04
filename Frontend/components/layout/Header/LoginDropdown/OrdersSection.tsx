"use client"

import { Package } from "lucide-react"
import { useTranslation } from "../../../../hooks/useTranslation"
import { useAuth } from "../../../../contexts/AuthContext"

interface OrdersSectionProps {
  onClose?: () => void
}

export default function OrdersSection({ onClose }: OrdersSectionProps) {
  const { t } = useTranslation()
  const { isLoggedIn } = useAuth()

  const handleClick = () => {
    onClose?.()
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
      window.location.href = "/login"
    } else {
      // If logged in, go to orders page
      window.location.href = "/orders"
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset w-full text-left"
    >
      <div className="relative">
        <Package className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 text-sm font-medium">{t('header.orders')}</span>
        </div>
        <p className="text-gray-500 text-xs mt-0.5">
          {isLoggedIn ? "Track your orders and history" : "Login to view your orders"}
        </p>
      </div>
    </button>
  )
} 