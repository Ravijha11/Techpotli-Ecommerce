"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const saleProducts = [
  {
    id: "1",
    name: "Women's Casual Long Sleeve",
    price: 76,
    originalPrice: 130,
    discount: 42,
    image: "https://placehold.co/200x200/333/FFF?text=Product+1",
    badge: "New",
  },
  {
    id: "2",
    name: "Crepe Pancake Mix",
    price: 77,
    originalPrice: 100,
    discount: 23,
    image: "https://placehold.co/200x200/333/FFF?text=Product+2",
  },
  {
    id: "3",
    name: "Crossbody Bag Brown",
    price: 78,
    originalPrice: 100,
    discount: 22,
    image: "https://placehold.co/200x200/333/FFF?text=Product+3",
  },
  {
    id: "4",
    name: "Herbal Tea Cup",
    price: 79,
    originalPrice: 100,
    discount: 21,
    image: "https://placehold.co/200x200/333/FFF?text=Product+4",
  },
  {
    id: "5",
    name: "Black Mary Jane Shoes",
    price: 80,
    originalPrice: 100,
    discount: 20,
    image: "https://placehold.co/200x200/333/FFF?text=Product+5",
  },
  {
    id: "6",
    name: "Orange Lentils Pack",
    price: 81,
    originalPrice: 100,
    discount: 19,
    image: "https://placehold.co/200x200/333/FFF?text=Product+6",
  },
  {
    id: "7",
    name: "Casual Jeans Light Blue",
    price: 82,
    originalPrice: 100,
    discount: 18,
    image: "https://placehold.co/200x200/333/FFF?text=Product+7",
    badge: "Featured",
  },
]

const featuredDeals = [
  {
    id: "watch",
    title: "Lasika W-H9015",
    subtitle: "Digital watch for men",
    price: 399,
    originalPrice: 599,
    discount: 40,
    image: "https://placehold.co/300x200/F5E6D3/333?text=Digital+Watch",
    bgColor: "bg-yellow-100",
  },
  {
    id: "headphone",
    title: "Micropack MHP-01",
    subtitle: "3.5mm Headphone",
    price: 299,
    originalPrice: 445,
    discount: 45,
    image: "https://placehold.co/300x200/E5E7EB/333?text=Headphones",
    bgColor: "bg-gray-100",
  },
  {
    id: "backpack",
    title: "Aaj Oil Pull Up Classic",
    subtitle: "Backpack Navy",
    price: 149,
    originalPrice: 175,
    discount: 20,
    image: "https://placehold.co/300x200/DBEAFE/333?text=Backpack",
    bgColor: "bg-blue-100",
  },
]

export default function NewYearSale() {
  const [timeLeft, setTimeLeft] = useState({
    days: 507,
    hours: 16,
    minutes: 4,
    seconds: 26,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59, days: prev.days }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with countdown */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">New Year Sale</h2>
            <div className="text-lg font-mono text-gray-600">
              {timeLeft.days.toString().padStart(3, "0")}:{timeLeft.hours.toString().padStart(2, "0")}:
              {timeLeft.minutes.toString().padStart(2, "0")}:{timeLeft.seconds.toString().padStart(2, "0")}
            </div>
          </div>
          <Link href="/sale" className="text-gray-600 hover:text-purple-600 font-medium underline">
            Show all
          </Link>
        </div>

        {/* Product grid */}
        <div className="relative mb-8">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div className="overflow-hidden">
            <div className="flex space-x-4">
              {saleProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-48 text-center relative">
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                      {product.badge}
                    </div>
                  )}

                  <div className="relative h-32 mb-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-center space-x-2 text-lg font-bold">
                      <span>${product.price}</span>
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    </div>
                    <div className="text-sm text-purple-600 font-medium">{product.discount}% off</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured deals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDeals.map((deal) => (
            <div key={deal.id} className={`${deal.bgColor} rounded-lg p-6 flex items-center space-x-4`}>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{deal.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{deal.subtitle}</p>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl font-bold">${deal.price}</span>
                  <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                  <span className="text-red-500 font-medium">-{deal.discount}%</span>
                </div>
                <button className="text-orange-500 text-sm font-medium hover:text-orange-600">Get it now →</button>
              </div>
              <div className="w-24 h-24 relative">
                <Image src={deal.image || "/placeholder.svg"} alt={deal.title} fill className="object-cover rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
