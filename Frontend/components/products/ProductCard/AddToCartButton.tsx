"use client"

interface AddToCartButtonProps {
  onClick?: () => void
  className?: string
}

export default function AddToCartButton({ onClick, className = "" }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium ${className}`}
    >
      Add to Cart
    </button>
  )
} 