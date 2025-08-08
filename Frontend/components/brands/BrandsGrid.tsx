"use client"

import Link from "next/link"
import { useState } from "react"

interface BrandItem {
  id: string
  name: string
  logo: string
  href: string
}

const brands: BrandItem[] = [
  {
    id: "levis",
    name: "Levi's",
    logo: "/Levis Logo.jpg",
    href: "/brands/levis"
  },
  {
    id: "adidas",
    name: "Adidas",
    logo: "/Adidas Logo.jpg",
    href: "/brands/adidas"
  },
  {
    id: "hm",
    name: "H&M",
    logo: "/H&M.jpg",
    href: "/brands/hm"
  },
  {
    id: "rolex",
    name: "Rolex",
    logo: "/Rolex.jpg",
    href: "/brands/rolex"
  },
  {
    id: "apple",
    name: "Apple",
    logo: "/Apple.jpg",
    href: "/brands/apple"
  },
  {
    id: "chanel",
    name: "Chanel",
    logo: "/Schnell.jpg",
    href: "/brands/chanel"
  },
  {
    id: "zara",
    name: "Zara",
    logo: "/Zara.jpg",
    href: "/brands/zara"
  },
  {
    id: "nike",
    name: "Nike",
    logo: "/Nike.jpg",
    href: "/brands/nike"
  },
  {
    id: "gillette",
    name: "Gillette",
    logo: "/Gillette.jpg",
    href: "/brands/gillette"
  },
  {
    id: "accenture",
    name: "Accenture",
    logo: "/Accenture.jpg",
    href: "/brands/accenture"
  },
  {
    id: "nescafe",
    name: "Nescafe",
    logo: "/Nescafe.jpg",
    href: "/brands/nescafe"
  },
  {
    id: "loreal",
    name: "L'Oréal",
    logo: "/Loreal.jpg",
    href: "/brands/loreal"
  }
]

interface BrandCardProps {
  brand: BrandItem
  size?: "large" | "small"
}

function BrandCard({ brand, size = "large" }: BrandCardProps) {
  const [imageError, setImageError] = useState(false)

  const isLarge = size === "large"
  const containerClass = isLarge 
    ? "w-20 h-20 flex items-center justify-center mb-4" 
    : "w-16 h-16 flex items-center justify-center mb-3"
  const imageSize = isLarge ? 80 : 64
  const textClass = isLarge 
    ? "text-lg font-bold text-gray-800" 
    : "text-base font-bold text-gray-800"

  // Check if logo exists or if we should show text
  const shouldShowText = !brand.logo || brand.logo === "" || imageError

  return (
    <Link
      href={brand.href}
      className="group flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200"
    >
      <div className={`${containerClass} ${shouldShowText ? 'bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm' : ''}`}>
        {!shouldShowText ? (
          <img
            src={brand.logo}
            alt={`${brand.name} logo`}
            width={imageSize}
            height={imageSize}
            className="max-w-full max-h-full object-contain"
            onError={() => setImageError(true)}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <span className={`${textClass} text-center px-2 text-gray-700`}>
            {brand.name}
          </span>
        )}
      </div>
      <span className={`font-medium text-gray-900 text-center group-hover:text-purple-600 transition-colors duration-200 ${
        isLarge ? "text-sm" : "text-xs"
      }`}>
        {brand.name}
      </span>
    </Link>
  )
}

export default function BrandsGrid() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Featured Brands</h1>
        <p className="text-gray-600">Discover trusted brands you love</p>
      </div>

      {/* Brands Grid - 6 columns layout like screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {brands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} size="large" />
        ))}
      </div>

      {/* Additional Brands Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { id: "gucci", name: "Gucci", logo: "/Gucci.jpg", href: "/brands/gucci" },
            { id: "samsung", name: "Samsung", logo: "/Samsung.jpg", href: "/brands/samsung" },
            { id: "sony", name: "Sony", logo: "/Sony.jpg", href: "/brands/sony" },
            { id: "lg", name: "LG", logo: "/LG.jpg", href: "/brands/lg" },
            { id: "panasonic", name: "Panasonic", logo: "/Panasonic.jpg", href: "/brands/panasonic" },
            { id: "philips", name: "Philips", logo: "/Philips.jpg", href: "/brands/philips" }
          ].map((brand) => (
            <BrandCard 
              key={brand.id} 
              brand={brand} 
              size="small" 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
