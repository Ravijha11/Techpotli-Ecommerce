"use client"

import { ShoppingCart } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

export default function CartIcon() {
  const { t } = useTranslation()
  
  return (
    <div className="flex items-center space-x-1">
      <ShoppingCart className="w-5 h-5" />
      <span>{t('header.cart')}</span>
    </div>
  )
} 