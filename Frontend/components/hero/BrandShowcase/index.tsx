"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

const brands = [
  { name: "Apple", logo: "/Apple.jpg" },
  { name: "Samsung", logo: "/Samsung.jpg" },
  { name: "Sony", logo: "/Sony.jpg" },
  { name: "LG", logo: "/LG.jpg" },
  { name: "Panasonic", logo: "/Panasonic.jpg" },
  { name: "Philips", logo: "/Philips.jpg" },
  { name: "Nike", logo: "/Nike.jpg" },
  { name: "Adidas", logo: "/Adidas Logo.jpg" },
  { name: "Levi's", logo: "/Levis Logo.jpg" },
  { name: "H&M", logo: "/H&M.jpg" },
  { name: "Zara", logo: "/Zara.jpg" },
  { name: "Gucci", logo: "/Gucci.jpg" },
  { name: "Rolex", logo: "/Rolex.jpg" },
  { name: "Gillette", logo: "/Gillette.jpg" },
  { name: "L'Oréal", logo: "/Loreal.jpg" },
  { name: "Nescafe", logo: "/Nescafe.jpg" },
  { name: "Accenture", logo: "/Accenture.jpg" },
]

export default function BrandShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % brands.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Our Trusted Brands</h2>

        <div className="overflow-hidden">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Click on any brand to view related products</p>
          </div>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (120 + 32)}px)`,
              width: `${brands.length * (120 + 32)}px`,
            }}
          >
            {brands.concat(brands).map((brand, index) => (
              <Link
                key={`${brand.name}-${index}`}
                href={`/discover/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex-shrink-0 w-[120px] h-[80px] mx-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:shadow-lg hover:shadow-blue-100 transition-all duration-200 hover:border-blue-500 hover:scale-105 group"
                title={`Click to view ${brand.name} products`}
              >
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={80}
                  height={40}
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all cursor-pointer mb-1"
                />
                <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                  View Products
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 