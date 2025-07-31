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
    <section className={`py-8 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {showViewAll && (
            <Link href={viewAllLink} className="text-gray-600 hover:text-purple-600 font-medium underline">
              Show all
            </Link>
          )}
        </div>

        <div className="relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div className="overflow-hidden">
            <div className="flex space-x-4 transition-transform duration-300">
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