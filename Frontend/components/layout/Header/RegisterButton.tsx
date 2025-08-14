"use client"

import { UserPlus } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"
import { useRouter } from "next/navigation"

export default function RegisterButton() {
  const { t } = useTranslation()
  const router = useRouter()
  
  const handleRegisterClick = () => {
    router.push("/register")
  }
  
  return (
    <button 
      onClick={handleRegisterClick}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transform hover:scale-105"
    >
      <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
      <span className="hidden sm:inline">{t('header.register')}</span>
      <span className="sm:hidden">Register</span>
    </button>
  )
} 