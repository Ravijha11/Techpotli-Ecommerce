"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface CategoryItem {
  id: string
  name: string
  image: string
  href: string
}

const categoryItems: CategoryItem[] = [
  {
    id: "1",
    name: "Tops",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-tops.webp",
    href: "/all/tops"
  },
  {
    id: "2",
    name: "Dresses",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-dresses.webp",
    href: "/all/dresses"
  },
  {
    id: "3",
    name: "Sling Bags",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-sling-bags.webp",
    href: "/all/sling-bags"
  },
  {
    id: "4",
    name: "Socks & Tights",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-socks-tights.webp",
    href: "/all/socks--tights"
  },
  {
    id: "5",
    name: "Clutches & Mini Bags",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-clutches-mini-bags.webp",
    href: "/all/clutches--mini-bags"
  },
  {
    id: "6",
    name: "Handbags",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-handbags.webp",
    href: "/all/handbags"
  },
  {
    id: "7",
    name: "Pants & Leggings",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-pants-leggings.webp",
    href: "/all/pants--leggings"
  },
  {
    id: "8",
    name: "Hats & Caps",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-hats-caps.webp",
    href: "/all/hats--caps"
  },
  {
    id: "9",
    name: "Pants",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-pants.webp",
    href: "/all/pants"
  },
  {
    id: "10",
    name: "Crossbody & Shoulder Bags",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-crossbody-shoulder-bags.webp",
    href: "/all/crossbody--shoulder-bags"
  },
  {
    id: "11",
    name: "Totes",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-totes.webp",
    href: "/all/totes"
  },
  {
    id: "12",
    name: "Luggage",
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-sub-cat-luggage.webp",
    href: "/all/luggage"
  }
]

export default function FeaturedCategories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 8 // Number of items visible at once

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, categoryItems.length - itemsPerView))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = currentIndex >= categoryItems.length - itemsPerView

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Categories</h2>
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
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isNextDisabled 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <Link 
              href="/categories" 
              className="text-gray-900 underline hover:text-gray-700 transition-colors duration-200 text-sm"
            >
              Show all
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
            {categoryItems.map((category) => (
              <div key={category.id} className="flex-shrink-0 w-full md:w-1/8 px-1">
                <Link 
                  href={category.href}
                  className="block text-center group"
                  title={category.name}
                >
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3">
                    <div className="w-10 h-10 mx-auto mb-2 relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={40}
                        height={40}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.jpg";
                        }}
                      />
                    </div>
                    <h5 className="text-xs font-medium text-gray-900 truncate group-hover:text-gray-700 transition-colors duration-200">
                      {category.name}
                    </h5>
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