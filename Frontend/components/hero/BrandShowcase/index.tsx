"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const brands = [
  { name: "Apple", logo: "https://placehold.co/120x60/333/FFF?text=Apple" },
  { name: "Samsung", logo: "https://placehold.co/120x60/333/FFF?text=Samsung" },
  { name: "Xiaomi", logo: "https://placehold.co/120x60/333/FFF?text=Xiaomi" },
  { name: "OnePlus", logo: "https://placehold.co/120x60/333/FFF?text=OnePlus" },
  { name: "Sony", logo: "https://placehold.co/120x60/333/FFF?text=Sony" },
  { name: "Dell", logo: "https://placehold.co/120x60/333/FFF?text=Dell" },
  { name: "HP", logo: "https://placehold.co/120x60/333/FFF?text=HP" },
  { name: "Lenovo", logo: "https://placehold.co/120x60/333/FFF?text=Lenovo" },
  { name: "Asus", logo: "https://placehold.co/120x60/333/FFF?text=Asus" },
  { name: "JBL", logo: "https://placehold.co/120x60/333/FFF?text=JBL" },
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
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (120 + 32)}px)`,
              width: `${brands.length * (120 + 32)}px`,
            }}
          >
            {brands.concat(brands).map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-[120px] h-[80px] mx-4 bg-white rounded-lg border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
              >
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={100}
                  height={50}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 