"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const flashSaleProducts = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    image: "https://placehold.co/250x250/333/FFF?text=Earbuds",
    stock: 15,
  },
  {
    id: "2",
    name: "Smart Watch Series 8",
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    image: "https://placehold.co/250x250/333/FFF?text=Smart+Watch",
    stock: 8,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    image: "https://placehold.co/250x250/333/FFF?text=Speaker",
    stock: 22,
  },
  {
    id: "4",
    name: "Gaming Mouse RGB",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    image: "https://placehold.co/250x250/333/FFF?text=Gaming+Mouse",
    stock: 12,
  },
  {
    id: "5",
    name: "USB-C Hub 7-in-1",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    image: "https://placehold.co/250x250/333/FFF?text=USB+Hub",
    stock: 18,
  },
  {
    id: "6",
    name: "Wireless Charger Pad",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: "https://placehold.co/250x250/333/FFF?text=Charger",
    stock: 25,
  },
]

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">⚡ Flash Sale</h2>
            <p className="text-gray-600">Limited time offers - Grab them fast!</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm font-medium text-gray-600">Ends in:</span>
            <div className="flex space-x-2">
              <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                <div className="text-lg font-bold">{timeLeft.hours.toString().padStart(2, "0")}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                <div className="text-lg font-bold">{timeLeft.minutes.toString().padStart(2, "0")}</div>
                <div className="text-xs">Min</div>
              </div>
              <div className="bg-red-500 text-white px-3 py-2 rounded-lg text-center min-w-[50px]">
                <div className="text-lg font-bold">{timeLeft.seconds.toString().padStart(2, "0")}</div>
                <div className="text-xs">Sec</div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4" style={{ width: "max-content" }}>
            {flashSaleProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 min-w-[250px] relative"
              >
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{product.discount}%
                </div>
                <div className="relative h-40 mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg font-bold text-orange-500">₹{product.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 mb-3">Only {product.stock} left in stock</div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
