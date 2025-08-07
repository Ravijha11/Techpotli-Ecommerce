"use client"

import Link from "next/link"
import { 
  Shirt, 
  Dress, 
  Scissors, 
  Shirt as TopsIcon,
  Gem,
  ShoppingBag,
  Briefcase,
  Dress as DressIcon,
  Bag,
  Shoe,
  Microwave,
  Sofa,
  Socks,
  Handbag
} from "lucide-react"

interface CategoryItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

const categories: CategoryItem[] = [
  {
    id: "mens-wear",
    name: "Men's Wear",
    icon: Shirt,
    href: "/categories/mens-wear"
  },
  {
    id: "women-apparel",
    name: "Women Apparel",
    icon: Dress,
    href: "/categories/women-apparel"
  },
  {
    id: "beauty-personal-care",
    name: "Beauty & Personal Care",
    icon: Scissors,
    href: "/categories/beauty-personal-care"
  },
  {
    id: "tops",
    name: "Tops",
    icon: TopsIcon,
    href: "/categories/tops"
  },
  {
    id: "jewellery-accessories",
    name: "Jewellery & Accessories",
    icon: Gem,
    href: "/categories/jewellery-accessories"
  },
  {
    id: "womens-bags",
    name: "Women's Bags",
    icon: ShoppingBag,
    href: "/categories/womens-bags"
  },
  {
    id: "travel-luggage",
    name: "Travel & Luggage",
    icon: Briefcase,
    href: "/categories/travel-luggage"
  },
  {
    id: "dresses",
    name: "Dresses",
    icon: DressIcon,
    href: "/categories/dresses"
  },
  {
    id: "sling-bags",
    name: "Sling Bags",
    icon: Bag,
    href: "/categories/sling-bags"
  },
  {
    id: "mens-shoes",
    name: "Men's Shoes",
    icon: Shoe,
    href: "/categories/mens-shoes"
  },
  {
    id: "home-appliances",
    name: "Home Appliances",
    icon: Microwave,
    href: "/categories/home-appliances"
  },
  {
    id: "home-living",
    name: "Home & Living",
    icon: Sofa,
    href: "/categories/home-living"
  },
  {
    id: "socks-tights",
    name: "Socks & Tights",
    icon: Socks,
    href: "/categories/socks-tights"
  },
  {
    id: "clutches-mini-bags",
    name: "Clutches & Mini Bags",
    icon: Handbag,
    href: "/categories/clutches-mini-bags"
  }
]

export default function CategoriesGrid() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Categories Grid - 2 columns layout like screenshot */}
      <div className="grid grid-cols-2 gap-8">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col items-center justify-center p-8 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <IconComponent 
                  className="w-10 h-10 text-gray-800 group-hover:text-purple-600 transition-colors duration-200" 
                />
              </div>
              <span className="text-base font-medium text-gray-900 text-center group-hover:text-purple-600 transition-colors duration-200">
                {category.name}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Additional Categories Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Electronics", icon: "📱" },
            { name: "Sports & Outdoors", icon: "⚽" },
            { name: "Books & Media", icon: "📚" },
            { name: "Toys & Games", icon: "🎮" },
            { name: "Automotive", icon: "🚗" },
            { name: "Health & Wellness", icon: "💊" },
            { name: "Pet Supplies", icon: "🐕" },
            { name: "Garden & Outdoor", icon: "🌱" }
          ].map((category, index) => (
            <Link
              key={index}
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
            >
              <div className="text-3xl mb-3">{category.icon}</div>
              <span className="text-sm font-medium text-gray-900 text-center group-hover:text-purple-600 transition-colors duration-200">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 