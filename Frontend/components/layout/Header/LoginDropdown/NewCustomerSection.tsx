"use client"

import Link from "next/link"
import { useTranslation } from "../../../../hooks/useTranslation"

interface NewCustomerSectionProps {
  onClose?: () => void
}

export default function NewCustomerSection({ onClose }: NewCustomerSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">New to Techpotli?</h3>
        <p className="text-gray-600 text-sm">Join millions of happy customers and start shopping today!</p>
      </div>
      
      <div className="flex flex-col space-y-3">
        <Link 
          href="/register" 
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-center"
          onClick={onClose}
        >
          {t('header.signUp')} - Create Account
        </Link>
        
        <Link 
          href="/profile" 
          className="w-full bg-white text-purple-600 border border-purple-600 py-3 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-center"
          onClick={onClose}
        >
          My Account
        </Link>
      </div>
    </div>
  )
} 