"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

interface TrendingProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  image: string
  badge?: "Trending" | "Featured" | "New"
  href: string
}

const trendingProducts: TrendingProduct[] = [
  {
    id: "1",
    name: "Nautica Diver Nylon Small Womens...",
    price: 103,
    originalPrice: 150,
    discount: 32,
    rating: 5,
    reviews: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/1"
  },
  {
    id: "2",
    name: "4 Pack Leggings with Pockets for Women, Hi...",
    price: 89,
    originalPrice: 100,
    discount: 11,
    rating: 4,
    reviews: 1,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/2"
  },
  {
    id: "3",
    name: "Women's Ruffle Sleeve Tops Summer Casual...",
    price: 80,
    originalPrice: 100,
    discount: 20,
    rating: 4,
    reviews: 1,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/3"
  },
  {
    id: "4",
    name: "'Daily Hydrating' Duo Skin Care Starter Kit...",
    price: 100,
    rating: 5,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/4"
  },
  {
    id: "5",
    name: "LYANER Women's Tunic Round Neck Ruffle...",
    price: 86,
    originalPrice: 100,
    discount: 14,
    rating: 4,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/5"
  },
  {
    id: "6",
    name: "Tops Knit Shirts Casual Ruffle Short Sleeve To...",
    price: 77,
    originalPrice: 100,
    discount: 23,
    rating: 2,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
    href: "/product/6"
  }
]

export default function TrendingProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 6 // Show 6 items at once

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, trendingProducts.length - itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = currentIndex >= trendingProducts.length - itemsPerView

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending products</h2>
          <Link
            href="/trending-products"
            className="text-gray-600 hover:text-purple-600 font-medium underline min-w-[80px] text-center"
          >
            Show all
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingProducts.map((product) => (
              <div key={product.id} className="w-full">
                <Link
                  href={product.href}
                  className="block group"
                  title={product.name}
                >
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gray-50 overflow-hidden">
                      {product.badge && (
                        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white z-10 ${
                          product.badge === "Trending" ? "bg-purple-600" :
                          product.badge === "Featured" ? "bg-purple-600" : "bg-purple-600"
                        }`}>
                          {product.badge}
                        </div>
                      )}

                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                        {product.name}
                      </h3>

                      {/* Rating and Reviews */}
                      <div className="flex items-center mb-3">
                        <div className="flex items-center mr-2">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500">
                          {product.reviews} Reviews
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-center space-x-2">
                        {product.originalPrice && product.originalPrice > product.price ? (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                            <span className="text-lg font-bold text-gray-900">
                              ${product.price}
                            </span>
                            {product.discount && (
                              <span className="text-xs font-bold text-white bg-purple-600 px-2 py-1 rounded">
                                -{product.discount}%
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={isPrevDisabled}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isPrevDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            aria-label="Previous products"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={isNextDisabled}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              isNextDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            aria-label="Next products"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
} 