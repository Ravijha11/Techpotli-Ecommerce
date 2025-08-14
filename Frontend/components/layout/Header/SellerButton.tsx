"use client"

import Link from "next/link"
import { Store } from "lucide-react"
import { useTranslation } from "../../../hooks/useTranslation"

export default function SellerButton() {
  const { t } = useTranslation()
  
  return (
    <Link 
      href="/seller-registration" 
      className="group flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105"
    >
      <Store className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
      <span className="hidden sm:inline">{t('header.seller')}</span>
      <span className="sm:hidden">Seller</span>
    </Link>
  )
} 