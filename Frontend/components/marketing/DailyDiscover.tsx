"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { RefreshCw, Star, Sparkles, TrendingUp, Zap } from "lucide-react"
import { Product, dailyDiscoverProducts } from "@/data/dailyDiscoverProducts"
import { useTranslation } from "../../hooks/useTranslation"

interface DailyDiscoverProps {
  title?: string
  products?: Product[]
  showMoreLink?: string
}

/**
 * DailyDiscover Component
 * 
 * A modern, high-tech product grid section with advanced animations and professional styling.
 * Features:
 * - Responsive grid layout with glassmorphism effects
 * - Advanced hover animations and micro-interactions
 * - Gradient backgrounds and modern typography
 * - Product badges with animated icons
 * - Star ratings with smooth animations
 * - Price display with modern styling
 * - Compare button with hover effects
 * - Show more functionality with smooth transitions
 * 
 * @example
 * ```tsx
 * <DailyDiscover 
 *   title="Daily Discover"
 *   products={products}
 *   showMoreLink="/products"
 * />
 * ```
 */
export default function DailyDiscover({
  title = "Daily discover",
  products = dailyDiscoverProducts,
  showMoreLink = "/products"
}: DailyDiscoverProps) {
  const { t } = useTranslation()
  const [showAll, setShowAll] = useState(false)
  const initialProducts = 12 // Show 3 rows of 4 products each
  const displayedProducts = showAll ? products : products.slice(0, initialProducts)
  const hasMoreProducts = products.length > initialProducts

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 transition-all duration-300 ${
            i <= rating ? "text-yellow-400 fill-current scale-110" : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "New":
        return <Sparkles className="w-3 h-3" />
      case "Trending":
        return <TrendingUp className="w-3 h-3" />
      case "Featured":
        return <Zap className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <section className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
      
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover handpicked products tailored just for you, powered by advanced algorithms
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {displayedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="group relative daily-discover-card hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-tile glass-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden">
                <Link href={product.href} className="page-link block" title={product.name}>
                  {/* Product Image */}
                  <div className="img-wrapper relative mb-4 overflow-hidden">
                    {product.badge && (
                      <div className={`badge absolute top-3 left-3 z-10 px-3 py-1.5 text-xs font-bold text-white rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm border border-white/20 pulse-badge ${
                        product.badge === "New" ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                        product.badge === "Trending" ? "bg-gradient-to-r from-purple-500 to-pink-500" :
                        "bg-gradient-to-r from-orange-500 to-red-500"
                      }`}>
                        {getBadgeIcon(product.badge)}
                        {product.badge}
                      </div>
                    )}
                    
                    <button 
                      className="compare-btn absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm border border-white/20 group-hover:rotate-12"
                      title="Compare"
                      aria-label="Compare product"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                    </button>
                    
                    <div className="relative overflow-hidden rounded-xl">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="item-title p-4">
                    <h5 className="ellipsis ellipsis-2 text-sm font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">
                      {product.name}
                    </h5>
                    
                    {/* Rating and Reviews */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2 group">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {product.reviews} Reviews
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {product.originalPrice && product.originalPrice > product.price ? (
                          <>
                            <span className="strike-through text-xs text-gray-400 mr-2 font-medium">
                              ${product.originalPrice}
                            </span>
                            <span className="price text-lg font-bold text-gray-900">
                              ${product.price}
                            </span>
                            {product.discount && (
                              <span className="discount text-xs font-bold text-green-600 ml-2 bg-green-100 px-2 py-1 rounded-full">
                                -{product.discount}%
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="price text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Show More Button - Always visible if there are more products */}
        {hasMoreProducts && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              Show More ({products.length - initialProducts} more)
            </button>
          </div>
        )}

        {/* View All Link - Show when all products are displayed */}
        {showAll && (
          <div className="text-center mt-12">
            <Link
              href={showMoreLink}
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-bold text-lg transition-colors duration-300 hover:scale-105"
            >
              <span>{t('home.featuredProducts.viewAll')}</span>
              <TrendingUp className="w-5 h-5" />
            </Link>
          </div>
        )}

        {/* Fallback Button - Always show a button if no other conditions are met */}
        {!hasMoreProducts && !showAll && (
          <div className="text-center mt-12">
            <Link
              href={showMoreLink}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Sparkles className="w-4 h-4" />
              {t('home.featuredProducts.viewAll')}
            </Link>
          </div>
        )}
      </div>
    </section>
  )
} 