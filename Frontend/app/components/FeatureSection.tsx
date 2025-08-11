"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FeatureProduct {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  badge?: "New" | "Featured"
  href: string
}

const featureProducts: FeatureProduct[] = [
  {
    id: "1",
    name: "Premium Almonds",
    price: 76,
    originalPrice: 130,
    discount: 42,
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/1"
  },
  {
    id: "2",
    name: "Fresh Pancake Mix",
    price: 77,
    originalPrice: 100,
    discount: 23,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
    href: "/product/2"
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    price: 78,
    originalPrice: 100,
    discount: 22,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
    href: "/product/3"
  },
  {
    id: "4",
    name: "Fresh Lemon Tea",
    price: 79,
    originalPrice: 100,
    discount: 21,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
    href: "/product/4"
  },
  {
    id: "5",
    name: "Women's Flat Shoes",
    price: 80,
    originalPrice: 100,
    discount: 20,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/5"
  },
  {
    id: "6",
    name: "Organic Lentils",
    price: 81,
    originalPrice: 100,
    discount: 19,
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?w=300&h=300&fit=crop",
    href: "/product/6"
  },
  {
    id: "7",
    name: "Grey Sweatpants",
    price: 82,
    originalPrice: 100,
    discount: 18,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
    href: "/product/7"
  }
]

export default function FeatureSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 6 // Number of items visible at once

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, featureProducts.length - itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = currentIndex >= featureProducts.length - itemsPerView

  return (
    <section className="py-8 bg-white">
      <div className="w-full px-6 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                disabled={isPrevDisabled}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isPrevDisabled 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
                aria-label="Previous products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isNextDisabled 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
                aria-label="Next products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link 
              href="/products" 
              className="text-gray-600 hover:text-purple-600 font-medium underline"
            >
              Show all
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
            {featureProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-full md:w-1/6 px-2">
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
                          product.badge === "New" ? "bg-purple-500" : "bg-pink-500"
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
                      
                      {/* Price */}
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="text-sm font-bold text-purple-600">
                          {product.discount}% off
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 