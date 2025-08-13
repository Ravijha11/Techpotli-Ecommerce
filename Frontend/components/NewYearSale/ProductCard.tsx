"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Product } from "./products/productsData"

interface ProductCardProps {
  product: Product
}

// Star Rating Component
const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const sizeClasses = size === "sm" ? "w-3 h-3" : "w-4 h-4"
  
  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`${sizeClasses} ${
            star <= rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${product.slug}`}
      className="block group"
    >
      <div className="relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden group-hover:border-purple-200">
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium z-10 shadow-sm">
            {product.badge}
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-40 bg-gray-50 overflow-hidden">
          <Image
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.jpg";
            }}
            priority={false}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick Action Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              View Details
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Product Name */}
          <div className="min-h-[3rem]">
            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors duration-200">
              {product.name}
            </h3>
          </div>

          {/* Reviews Section */}
          {product.rating && (
            <div className="flex items-center justify-center space-x-2">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-xs text-gray-600">({product.reviewCount || 0})</span>
            </div>
          )}

          {/* Price Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-lg font-bold text-gray-800">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            {product.discount && (
              <div className="text-sm text-purple-600 font-medium text-center">-{product.discount}%</div>
            )}
          </div>

          {/* Review Preview */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="text-xs text-gray-500 text-center italic">
              "{product.reviews[0].comment}"
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
