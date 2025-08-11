"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductGridProps {
  currentPage: number
  onPageChange: (page: number) => void
}

// Product data matching the screenshot
const products = [
  {
    id: 1,
    name: "Premium Roasted Coffee Beans",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
    originalPrice: 899,
    discountedPrice: 599,
    rating: 5,
    reviews: 23,
    isNew: true
  },
  {
    id: 2,
    name: "Professional DSLR Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop",
    originalPrice: 45999,
    discountedPrice: 38999,
    rating: 4,
    reviews: 156,
    isTrending: true
  },
  {
    id: 3,
    name: "Fresh Organic Fruits Bundle",
    image: "https://images.unsplash.com/photo-1577234286642-67194d22b8a9?w=300&h=300&fit=crop",
    originalPrice: 299,
    discountedPrice: 199,
    rating: 5,
    reviews: 89,
    isNew: true
  },
  {
    id: 4,
    name: "Fresh Pomegranate",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&h=300&fit=crop",
    originalPrice: 150,
    discountedPrice: 99,
    rating: 4,
    reviews: 45,
    isNew: false
  },
  {
    id: 5,
    name: "Smart Fitness Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    originalPrice: 12999,
    discountedPrice: 8999,
    rating: 5,
    reviews: 234,
    isTrending: true
  },
  {
    id: 6,
    name: "Organic Turmeric Powder",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    originalPrice: 199,
    discountedPrice: 149,
    rating: 4,
    reviews: 67,
    isNew: false
  },
  {
    id: 7,
    name: "Women's Comfortable Flats",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    originalPrice: 1299,
    discountedPrice: 899,
    rating: 4,
    reviews: 123,
    isNew: true
  },
  {
    id: 8,
    name: "Stylish Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    originalPrice: 899,
    discountedPrice: 599,
    rating: 5,
    reviews: 78,
    isTrending: true
  },
  {
    id: 9,
    name: "Men's Luxury Watch",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop",
    originalPrice: 8999,
    discountedPrice: 6999,
    rating: 5,
    reviews: 189,
    isNew: false
  },
  {
    id: 10,
    name: "Genuine Leather Belt",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    originalPrice: 599,
    discountedPrice: 399,
    rating: 4,
    reviews: 56,
    isNew: false
  },
  {
    id: 11,
    name: "Athletic Shorts & Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    originalPrice: 2499,
    discountedPrice: 1799,
    rating: 4,
    reviews: 92,
    isTrending: true
  },
  {
    id: 12,
    name: "Nintendo Switch Console",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=300&h=300&fit=crop",
    originalPrice: 29999,
    discountedPrice: 24999,
    rating: 5,
    reviews: 445,
    isNew: true
  },
  {
    id: 13,
    name: "Organic White Beans",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    originalPrice: 149,
    discountedPrice: 99,
    rating: 4,
    reviews: 34,
    isNew: false
  },
  {
    id: 14,
    name: "Cork Placemat Set",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    originalPrice: 299,
    discountedPrice: 199,
    rating: 4,
    reviews: 67,
    isNew: false
  },
  {
    id: 15,
    name: "Casual Fashion Bundle",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop",
    originalPrice: 1999,
    discountedPrice: 1499,
    rating: 4,
    reviews: 156,
    isTrending: true
  },
  {
    id: 16,
    name: "Summer Hat & Bag Set",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    originalPrice: 399,
    discountedPrice: 299,
    rating: 4,
    reviews: 45,
    isNew: false
  },
  {
    id: 17,
    name: "Soft Knitted Bunny Toy",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop",
    originalPrice: 199,
    discountedPrice: 149,
    rating: 5,
    reviews: 89,
    isNew: true
  },
  {
    id: 18,
    name: "Classic Sunglasses",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=300&h=300&fit=crop",
    originalPrice: 899,
    discountedPrice: 599,
    rating: 4,
    reviews: 123,
    isNew: false
  },
  {
    id: 19,
    name: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
    originalPrice: 2499,
    discountedPrice: 1899,
    rating: 5,
    reviews: 234,
    isTrending: true
  },
  {
    id: 20,
    name: "Organic Garlic Bundle",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    originalPrice: 99,
    discountedPrice: 69,
    rating: 4,
    reviews: 56,
    isNew: false
  }
]

export default function ProductGrid({ currentPage, onPageChange }: ProductGridProps) {
  const productsPerPage = 20
  const totalPages = Math.ceil(products.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = products.slice(startIndex, endIndex)

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 md:mb-8 responsive-product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden responsive-card">
            {/* Product Image */}
            <div className="relative aspect-square">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover responsive-image"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
              {/* Tags */}
              <div className="absolute top-2 left-2">
                {product.isNew && (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    New
                  </span>
                )}
                {product.isTrending && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded ml-1">
                    Trending
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-2 sm:p-3">
              <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-2 responsive-text">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 text-xs">
                  {"★".repeat(product.rating)}
                  <span className="text-gray-400 ml-1">{"★".repeat(5 - product.rating)}</span>
                </div>
                <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
                  ({product.reviews} Reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-sm sm:text-lg font-semibold text-gray-900">
                  ₹{product.discountedPrice.toLocaleString()}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="responsive-button"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant={currentPage === 1 ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(1)}
          className="responsive-button"
        >
          1
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="responsive-button"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
} 