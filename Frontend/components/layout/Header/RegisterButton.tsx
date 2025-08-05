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
    <div 
      onClick={handleRegisterClick}
      className="flex items-center space-x-1 cursor-pointer hover:text-purple-600 transition-colors"
    >
      <UserPlus className="w-4 h-4" />
      <span>{t('header.register')}</span>
    </div>
  )
} 