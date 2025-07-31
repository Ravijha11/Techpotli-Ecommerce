"use client"

import { ShoppingCart } from "lucide-react"

export default function CartIcon() {
  return (
    <div className="flex items-center space-x-1">
      <ShoppingCart className="w-5 h-5" />
      <span>Cart</span>
    </div>
  )
} 