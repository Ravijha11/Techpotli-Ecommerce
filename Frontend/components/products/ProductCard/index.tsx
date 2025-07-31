"use client"

import ProductImage from "./ProductImage"
import ProductInfo from "./ProductInfo"
import PriceDisplay from "./PriceDisplay"
import AddToCartButton from "./AddToCartButton"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  rating: number
  reviews: number
  image: string
  badge?: string
}

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow relative ${className}`}>
      {product.badge && (
        <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
          {product.badge}
        </div>
      )}

      <ProductImage src={product.image} alt={product.name} />
      
      <ProductInfo 
        name={product.name}
        rating={product.rating}
        reviews={product.reviews}
      />

      <PriceDisplay 
        price={product.price}
        originalPrice={product.originalPrice}
        discount={product.discount}
      />

      <div className="mt-3">
        <AddToCartButton />
      </div>
    </div>
  )
} 