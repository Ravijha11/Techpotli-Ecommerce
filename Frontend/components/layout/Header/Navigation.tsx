"use client"

import Link from "next/link"

export default function Navigation() {
  return (
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
  )
} 