"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Shirt, 
  Scissors, 
  Gem,
  ShoppingBag,
  Briefcase,
  Microwave,
  Sofa,
  Package,
  ShoppingCart,
  User,
  Home,
  Puzzle,
  Backpack,
  Car,
  Heart,
  Star,
  Zap,
  Gift,
  Coffee,
  Eye,
  Wallet,
  Tv,
  Utensils,
  Wrench,
  Baby,
  ShoppingCart as BottleIcon,
  ShoppingCart as ShoeIcon,
  Package as SuitcaseIcon,
  Package as HatIcon,
  Package as ShortsIcon,
  Package as PantsIcon
} from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CategoryItem {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  href: string
}

// All categories from the screenshots
const allCategories: CategoryItem[] = [
  // Page 1 - Main categories
  { id: "mens-wear", name: "Men's Wear", icon: Shirt, href: "/categories/mens-wear" },
  { id: "women-apparel", name: "Women Apparel", icon: User, href: "/categories/women-apparel" },
  { id: "beauty-personal-care", name: "Beauty & Personal Care", icon: Scissors, href: "/categories/beauty-personal-care" },
  { id: "tops", name: "Tops", icon: Shirt, href: "/categories/tops" },
  { id: "jewellery-accessories", name: "Jewellery & Accessories", icon: Gem, href: "/categories/jewellery-accessories" },
  { id: "womens-bags", name: "Women's Bags", icon: ShoppingBag, href: "/categories/womens-bags" },
  { id: "travel-luggage", name: "Travel & Luggage", icon: Briefcase, href: "/categories/travel-luggage" },
  { id: "dresses", name: "Dresses", icon: User, href: "/categories/dresses" },
  { id: "sling-bags", name: "Sling Bags", icon: Package, href: "/categories/sling-bags" },
  { id: "mens-shoes", name: "Men's Shoes", icon: ShoppingCart, href: "/categories/mens-shoes" },
  { id: "home-appliances", name: "Home Appliances", icon: Microwave, href: "/categories/home-appliances" },
  { id: "home-living", name: "Home & Living", icon: Sofa, href: "/categories/home-living" },
  { id: "socks-tights", name: "Socks & Tights", icon: Package, href: "/categories/socks-tights" },
  { id: "clutches-mini-bags", name: "Clutches & Mini Bags", icon: ShoppingBag, href: "/categories/clutches-mini-bags" },
  { id: "mens-bags", name: "Men's Bags", icon: Package, href: "/categories/mens-bags" },
  { id: "toys-kids-babies", name: "Toys, Kids & Babies", icon: Puzzle, href: "/categories/toys-kids-babies" },
  { id: "handbags", name: "Handbags", icon: Backpack, href: "/categories/handbags" },
  { id: "pants-leggings", name: "Pants & Leggings", icon: PantsIcon, href: "/categories/pants-leggings" },
  { id: "hats-caps", name: "Hats & Caps", icon: HatIcon, href: "/categories/hats-caps" },
  { id: "pants", name: "Pants", icon: ShortsIcon, href: "/categories/pants" },
  { id: "crossbody-shoulder", name: "Crossbody & Shoulder", icon: ShoppingBag, href: "/categories/crossbody-shoulder" },
  { id: "totes", name: "Totes", icon: Backpack, href: "/categories/totes" },
  { id: "luggage", name: "Luggage", icon: SuitcaseIcon, href: "/categories/luggage" },
  { id: "bath-baby-care", name: "Bath & Baby Care", icon: BottleIcon, href: "/categories/bath-baby-care" },
  { id: "formal-shoes", name: "Formal Shoes", icon: ShoeIcon, href: "/categories/formal-shoes" },
  
  // Page 2 - Additional categories
  { id: "home-decor", name: "Home Decor", icon: Sofa, href: "/categories/home-decor" },
  { id: "snacks-sweets", name: "Snacks & Sweets", icon: Gift, href: "/categories/snacks-sweets" },
  { id: "housekeeping", name: "Housekeeping", icon: Package, href: "/categories/housekeeping" },
  { id: "food-beverages", name: "Food & Beverages", icon: Coffee, href: "/categories/food-beverages" },
  { id: "womens-hair-care", name: "Women's Hair Care", icon: User, href: "/categories/womens-hair-care" },
  { id: "feminine-care", name: "Feminine Care", icon: User, href: "/categories/feminine-care" },
  { id: "skincare", name: "Skincare", icon: User, href: "/categories/skincare" },
  { id: "key-chains", name: "Key Chains", icon: Package, href: "/categories/key-chains" },
  { id: "shirts", name: "Shirts", icon: Shirt, href: "/categories/shirts" },
  { id: "eyewear", name: "Eyewear", icon: Eye, href: "/categories/eyewear" },
  { id: "jackets-coats", name: "Jackets & Coats", icon: Shirt, href: "/categories/jackets-coats" },
  { id: "mens-wallet", name: "Men's Wallet", icon: Wallet, href: "/categories/mens-wallet" },
  { id: "backpacks", name: "Backpacks", icon: Backpack, href: "/categories/backpacks" },
  { id: "briefcases", name: "Briefcases", icon: Briefcase, href: "/categories/briefcases" },
  { id: "suit-carriers", name: "Suit Carriers", icon: SuitcaseIcon, href: "/categories/suit-carriers" },
  { id: "travel-bags", name: "Travel Bags &...", icon: ShoppingBag, href: "/categories/travel-bags" },
  { id: "travel-accessories", name: "Travel Accessories", icon: Car, href: "/categories/travel-accessories" },
  { id: "maternity-care", name: "Maternity Care", icon: User, href: "/categories/maternity-care" },
  { id: "kids-furniture", name: "Kid's Furniture", icon: Sofa, href: "/categories/kids-furniture" },
  { id: "sandals-flip-flops", name: "Sandals & Flip-Flops", icon: ShoeIcon, href: "/categories/sandals-flip-flops" },
  { id: "sneakers", name: "Sneakers", icon: ShoeIcon, href: "/categories/sneakers" },
  { id: "tools-diy-outdoors", name: "Tools, DIY & Outdoors", icon: Wrench, href: "/categories/tools-diy-outdoors" },
  { id: "kitchen-dining", name: "Kitchen & Dining", icon: Utensils, href: "/categories/kitchen-dining" },
  { id: "meat-seafood", name: "Meat & Seafood", icon: Package, href: "/categories/meat-seafood" },
  { id: "tv-accessories", name: "TV Accessories", icon: Tv, href: "/categories/tv-accessories" },
  
  // Page 3 - More categories
  { id: "small-kitchen", name: "Small Kitchen...", icon: Microwave, href: "/categories/small-kitchen" },
  { id: "electronics", name: "Electronics", icon: Tv, href: "/categories/electronics" },
  { id: "sports-outdoors", name: "Sports & Outdoors", icon: Star, href: "/categories/sports-outdoors" },
  { id: "books-media", name: "Books & Media", icon: Package, href: "/categories/books-media" },
  { id: "toys-games", name: "Toys & Games", icon: Puzzle, href: "/categories/toys-games" },
  { id: "automotive", name: "Automotive", icon: Car, href: "/categories/automotive" },
  { id: "health-wellness", name: "Health & Wellness", icon: Heart, href: "/categories/health-wellness" },
  { id: "pet-supplies", name: "Pet Supplies", icon: Star, href: "/categories/pet-supplies" },
  { id: "garden-outdoor", name: "Garden & Outdoor", icon: Zap, href: "/categories/garden-outdoor" }
]

const ITEMS_PER_PAGE = 28

export default function CategoriesGrid() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(allCategories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCategories = allCategories.slice(startIndex, endIndex)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Categories Grid - 7 columns layout like screenshot */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-6">
        {currentCategories.map((category) => {
          const IconComponent = category.icon
          return (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                <IconComponent 
                  className="w-6 h-6 text-gray-800 group-hover:text-purple-600 transition-colors duration-200" 
                />
              </div>
              <span className="text-xs font-medium text-gray-900 text-center group-hover:text-purple-600 transition-colors duration-200 leading-tight">
                {category.name}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 rounded-md border ${
                currentPage === page
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
} 