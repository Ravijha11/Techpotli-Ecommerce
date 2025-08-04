"use client"

import { LogOut } from "lucide-react"
import { useTranslation } from "../../../../hooks/useTranslation"

interface LogoutSectionProps {
  onClose?: () => void
  onLogout?: () => void
}

export default function LogoutSection({ onClose, onLogout }: LogoutSectionProps) {
  const { t } = useTranslation()

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked')
    onLogout?.()
    onClose?.()
  }

  return (
    <button 
      className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left group focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors" />
      <span className="text-gray-900 text-sm group-hover:text-red-600">{t('header.logout')}</span>
    </button>
  )
} 