"use client"

import { useTranslation } from "../../../hooks/useTranslation"

interface AddToCartButtonProps {
  onClick?: () => void
  className?: string
}

export default function AddToCartButton({ onClick, className = "" }: AddToCartButtonProps) {
  const { t } = useTranslation()
  
  return (
    <button
      onClick={onClick}
      className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium ${className}`}
    >
      {t('product.addToCart')}
    </button>
  )
} 