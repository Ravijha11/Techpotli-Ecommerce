"use client"

import { UserPlus } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

export default function RegisterButton() {
  const { t } = useTranslation()
  
  return (
    <div className="flex items-center space-x-1 cursor-pointer hover:text-purple-600 transition-colors">
      <UserPlus className="w-4 h-4" />
      <span>{t('header.register')}</span>
    </div>
  )
} 