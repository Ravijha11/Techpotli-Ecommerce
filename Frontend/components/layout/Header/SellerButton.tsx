"use client"

import { useTranslation } from "../../../hooks/useTranslation"

export default function SellerButton() {
  const { t } = useTranslation()
  
  return (
    <div className="cursor-pointer hover:text-purple-600 transition-colors">
      <span className="font-medium">{t('header.seller')}</span>
    </div>
  )
} 