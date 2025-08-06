"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Shirt, 
  Heart, 
  Briefcase, 
  Package, 
  ShoppingBag, 
  Backpack, 
  Users, 
  Crown,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface CategoryItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const categoryItems: CategoryItem[] = [
  {
    id: "1",
    name: "Tops",
    icon: Shirt,
    href: "/all/tops"
  },
  {
    id: "2",
    name: "Dresses",
    icon: Heart,
    href: "/all/dresses"
  },
  {
    id: "3",
    name: "Sling Bags",
    icon: Briefcase,
    href: "/all/sling-bags"
  },
  {
    id: "4",
    name: "Socks & Tights",
    icon: Package,
    href: "/all/socks--tights"
  },
  {
    id: "5",
    name: "Clutches & Mi...",
    icon: ShoppingBag,
    href: "/all/clutches--wallets"
  },
  {
    id: "6",
    name: "Handbags",
    icon: Backpack,
    href: "/all/handbags"
  },
  {
    id: "7",
    name: "Pants &...",
    icon: Users,
    href: "/all/pants--trousers"
  },
  {
    id: "8",
    name: "Hats & Caps",
    icon: Crown,
    href: "/all/hats--caps"
  },
  {
    id: "9",
    name: "Pants",
    icon: Users,
    href: "/all/pants"
  }
]

export default function FeaturedCategories() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 9 // Show all 9 items at once

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
      <div className="container mx-auto px-4 max-w-7xl">
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
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                aria-label="Previous categories"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isNextDisabled}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isNextDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                aria-label="Next categories"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <Link 
              href="/categories" 
              className="text-gray-900 underline hover:text-gray-700 transition-colors duration-200 text-sm font-medium min-w-[80px] text-center"
            >
              Show all
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4">
            {categoryItems.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.id} className="w-full">
                  <Link 
                    href={category.href}
                    className="block text-center group"
                    title={category.name}
                  >
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-3 border border-gray-200 w-full h-full min-h-[100px] flex flex-col items-center justify-center">
                      <div className="w-10 h-10 mb-2 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-gray-900" />
                      </div>
                      <h5 className="text-xs font-medium text-gray-900 truncate group-hover:text-gray-700 transition-colors duration-200 leading-tight">
                        {category.name}
                      </h5>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
} 