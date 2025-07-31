"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Phone, Mail, ChevronDown } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      {/* Top Bar */}
      <div className="bg-gray-100 text-gray-700 py-2 px-4 text-sm border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <select className="bg-transparent text-gray-700">
              <option>English</option>
            </select>
            <span className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>Mail webzedcontact@gmail.com</span>
            </span>
            <span className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>Helpline 4534345656</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>BE A SELLER</span>
            <span>|</span>
            <span>LOGIN</span>
            <span>|</span>
            <span>REGISTER</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-purple-600">ishop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <span className="text-gray-700">My Account</span>
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="flex items-center space-x-1">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white rounded-r-lg">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-8">
              <Link href="/discover" className="text-gray-700 hover:text-purple-600">
                DISCOVER PRODUCTS
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-purple-600">
                CATEGORIES
              </Link>
              <Link href="/brands" className="text-gray-700 hover:text-purple-600">
                BRANDS
              </Link>
              <Link href="/hot-deals" className="text-gray-700 hover:text-purple-600">
                HOT DEALS
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link href="/track-order" className="text-gray-700 hover:text-purple-600">
                TRACK ORDER
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-purple-600">
                FAQ
              </Link>
              <Link href="/help" className="text-gray-700 hover:text-purple-600">
                HELP
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const categories = [
  {
    name: "Smartphones",
    href: "/smartphones",
    subcategories: ["iPhone", "Samsung", "OnePlus", "Xiaomi", "Realme"],
  },
  {
    name: "Laptops",
    href: "/laptops",
    subcategories: ["MacBook", "Dell", "HP", "Lenovo", "Asus"],
  },
  {
    name: "Cameras",
    href: "/cameras",
    subcategories: ["DSLR", "Mirrorless", "Action Cameras", "Instant Cameras"],
  },
  {
    name: "Wearables",
    href: "/wearables",
    subcategories: ["Smart Watches", "Fitness Bands", "Earbuds", "Headphones"],
  },
  {
    name: "Gaming",
    href: "/gaming",
    subcategories: ["Consoles", "Gaming Laptops", "Accessories", "Games"],
  },
  {
    name: "Home & Kitchen",
    href: "/home-kitchen",
    subcategories: ["Appliances", "Smart Home", "Kitchen", "Furniture"],
  },
  {
    name: "Fashion",
    href: "/fashion",
    subcategories: ["Men", "Women", "Kids", "Accessories"],
  },
]
