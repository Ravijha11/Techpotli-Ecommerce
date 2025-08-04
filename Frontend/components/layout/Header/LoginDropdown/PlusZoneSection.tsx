"use client"

import { Crown } from "lucide-react"
import { useTranslation } from "../../../../hooks/useTranslation"
import { useAuth } from "../../../../contexts/AuthContext"

interface PlusZoneSectionProps {
  onClose?: () => void
}

export default function PlusZoneSection({ onClose }: PlusZoneSectionProps) {
  const { t } = useTranslation()
  const { isLoggedIn } = useAuth()

  const handleClick = () => {
    onClose?.()
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
      window.location.href = "/login"
    } else {
      // If logged in, go to plus zone page
      window.location.href = "/plus-zone"
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset w-full text-left"
    >
      <div className="relative">
        <Crown className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
          Plus
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className="text-gray-900 text-sm font-medium">{t('header.ishopPlusZone')}</span>
        </div>
        <p className="text-gray-500 text-xs mt-0.5">
          {isLoggedIn ? "Exclusive benefits for Plus members" : "Login to access Plus benefits"}
        </p>
      </div>
    </button>
  )
} 