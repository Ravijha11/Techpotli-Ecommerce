"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, MessageCircle, Share2, Heart, Truck, Shield, Clock, Minus, Plus } from "lucide-react"
import { Product } from "@/data/featuredProducts"
import Footer from "@/components/layout/Footer"

interface ProductDetailProps {
  product: Product
  onClose: () => void
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

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
            <a href="/" className="hover:text-purple-600 transition-colors whitespace-nowrap">Home</a>
            <span className="hidden sm:inline">/</span>
            <a href="/discover/products" className="hover:text-purple-600 transition-colors whitespace-nowrap">Discover Products</a>
            <span className="hidden sm:inline">/</span>
            <a href="/" className="hover:text-purple-600 transition-colors whitespace-nowrap">Featured Products</a>
            <span className="hidden sm:inline">/</span>
            <span className="text-gray-800 font-medium whitespace-nowrap">
              {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
          {/* Left Column - Product Images & Details */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center text-sm text-gray-500">
                Roll over image to zoom in
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <StarRating rating={product.rating} size="md" />
                  <span className="text-gray-600">{product.rating} ({product.reviews} Reviews)</span>
                </div>
              </div>

              {/* Featured Product Badge */}
              {product.badge && (
                <div className="bg-purple-100 border border-purple-200 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-purple-600 text-lg">⭐</span>
                    <span className="font-semibold text-purple-800">Featured Product</span>
                    <span className="text-purple-600 font-medium">- {product.badge}</span>
                  </div>
                </div>
              )}

              {/* Product Specifications */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">In Stock:</span>
                  <span className="text-green-600 font-medium">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium underline">Techpotli</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Refund & warranty:</span>
                  <div className="text-right">
                    <div className="font-medium">Refundable</div>
                    <div className="text-gray-500">Change of mind is not applicable</div>
                    <div className="text-gray-500">100% authentic</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Is Discontinued:</span>
                  <span className="font-medium">No</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-medium">{product.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options & Seller Info */}
          <div className="space-y-6">
            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl sm:text-2xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              {product.discount && (
                <div className="text-green-600 font-semibold text-lg">
                  Save ${product.originalPrice ? product.originalPrice - product.price : 0} ({product.discount}% OFF)
                </div>
              )}
              <div className="text-gray-600 text-sm sm:text-base">+ $5.99 Shipping Fee</div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="text-gray-600">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decreaseQuantity}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  aria-label="Decrease quantity"
                  title="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  aria-label="Increase quantity"
                  title="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm sm:text-base">
                Add to cart
              </button>
              <button className="w-full border border-gray-300 text-gray-800 py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base">
                Buy now
              </button>
            </div>

            {/* Transaction Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure transaction</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Arrives: 3-5 business days</span>
              </div>
            </div>

            {/* WhatsApp Icon */}
            <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-20">
              <div className="bg-green-500 text-white p-2 sm:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
