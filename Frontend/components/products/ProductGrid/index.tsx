"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductGridItem from "./ProductGridItem"

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

interface ProductGridProps {
  title: string
  products: Product[]
  showViewAll?: boolean
  viewAllLink?: string
  className?: string
}

export default function ProductGrid({ 
  title, 
  products, 
  showViewAll = true, 
  viewAllLink = "/products",
  className = ""
}: ProductGridProps) {
  return (
    <section className={`py-6 md:py-8 bg-white ${className} responsive-section`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3 sm:gap-0">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 responsive-heading">{title}</h2>
          {showViewAll && (
            <Link href={viewAllLink} className="text-gray-600 hover:text-purple-600 font-medium underline text-sm md:text-base">
              Show all
            </Link>
          )}
        </div>

        <div className="relative">
          {/* Navigation Buttons - Hidden on mobile for better UX */}
          <button className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow responsive-button">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow responsive-button">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div className="overflow-hidden">
            {/* Mobile: Grid Layout */}
            <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {products.map((product) => (
                <ProductGridItem key={product.id} product={product} />
              ))}
            </div>
            
            {/* Desktop: Horizontal Scroll Layout */}
            <div className="hidden md:flex space-x-4 transition-transform duration-300">
              {products.map((product) => (
                <ProductGridItem key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 