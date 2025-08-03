"use client"

import Link from "next/link"
import { useTranslation } from "../../../hooks/useTranslation"

export default function SellerButton() {
  const { t } = useTranslation()
  
  return (
    <Link href="/seller-registration" className="cursor-pointer hover:text-purple-600 transition-colors">
      <span className="font-medium">{t('header.seller')}</span>
    </Link>
  )
} 