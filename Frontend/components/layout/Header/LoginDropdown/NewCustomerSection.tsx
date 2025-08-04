"use client"

import Link from "next/link"
import { useTranslation } from "../../../../hooks/useTranslation"

interface NewCustomerSectionProps {
  onClose?: () => void
}

export default function NewCustomerSection({ onClose }: NewCustomerSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-gray-900 font-medium text-sm">{t('header.newCustomer')}</span>
          <p className="text-gray-600 text-xs mt-1">Join millions of happy customers</p>
        </div>
        <Link 
          href="/register" 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          onClick={onClose}
        >
          {t('header.signUp')}
        </Link>
      </div>
    </div>
  )
} 