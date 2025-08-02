"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// Type definitions for product data
export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  badge?: "New" | "Featured" | "Sale"
  slug?: string
  rating?: number
  reviewCount?: number
  reviews?: Array<{
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }>
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

interface ProductCarouselProps {
  title: string
  products: Product[]
  viewAllLink?: string
  showCountdown?: boolean
  countdownData?: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}

export default function ProductCarousel({ 
  title, 
  products, 
  viewAllLink, 
  showCountdown = false,
  countdownData 
}: ProductCarouselProps) {
  const [timeLeft, setTimeLeft] = useState(countdownData || {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [loading, setLoading] = useState(false)

  // Countdown timer effect
  useEffect(() => {
    if (!showCountdown) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59, days: prev.days }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showCountdown])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {showCountdown && (
            <div className="text-lg font-mono text-gray-600">
              {timeLeft.days.toString().padStart(3, "0")}:{timeLeft.hours.toString().padStart(2, "0")}:
              {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
            </div>
          )}
        </div>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-gray-600 hover:text-purple-600 font-medium underline">
            Show all
          </Link>
        )}
      </div>

      {/* Product Carousel */}
      <div className="relative mb-8">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                  <Link href={`/${product.slug || product.id}/product/${product.id}`} className="block group">
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
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-purple-700 transition-colors duration-200">
                            Quick View
                          </button>
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
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 shadow-md hover:shadow-lg transition-shadow" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border-gray-200 hover:bg-gray-50 shadow-md hover:shadow-lg transition-shadow" />
          </Carousel>
        )}
      </div>
    </div>
  )
} 