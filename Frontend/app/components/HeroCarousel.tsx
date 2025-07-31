"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const banners = [
  {
    id: 1,
    title: "11.11 SUPER SALE",
    subtitle: "Biggest sale of the year",
    discount: "30",
    description: "ENJOY",
    voucher: "VOUCHER",
    cta: "SHOP NOW",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Wr86eGI7H0xDB1c3SmdYhA1HagpJxS.png",
    bgColor: "bg-gradient-to-r from-pink-200 to-pink-300",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`w-full h-full ${banner.bgColor} relative`}>
            <div className="container mx-auto px-4 h-full flex items-center relative">
              <div className="flex-1 z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-2">{banner.title}</h1>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-1 bg-purple-800 mr-4"></div>
                  <p className="text-lg text-purple-700">{banner.subtitle}</p>
                </div>
                <div className="mb-6">
                  <div className="text-purple-800 text-lg font-medium mb-2">{banner.description}</div>
                  <div className="text-6xl font-bold text-purple-800 transform -rotate-12 inline-block">
                    {banner.discount}
                    <span className="text-4xl">%</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-800 ml-4 inline-block">OFF</div>
                  <div className="text-lg text-purple-700 mt-2">{banner.voucher}</div>
                </div>
                <button className="bg-purple-800 text-white px-8 py-3 rounded font-semibold hover:bg-purple-900 transition-colors">
                  {banner.cta}
                </button>
              </div>

              {/* Right side promotional cards */}
              <div className="absolute right-4 top-4 space-y-4">
                <div className="bg-teal-200 rounded-lg p-4 w-64">
                  <div className="bg-purple-800 text-white px-2 py-1 rounded text-xs inline-block mb-2">SUPER SALE</div>
                  <h3 className="font-bold text-gray-800 mb-2">Backpack for Men</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-gray-500 line-through">$145</span>
                    <span className="text-xl font-bold">$115</span>
                    <span className="text-red-500 font-medium">-30%</span>
                  </div>
                  <button className="text-orange-500 text-sm font-medium">Get it Now →</button>
                </div>

                <div className="bg-white rounded-lg p-4 w-64 shadow">
                  <h3 className="font-bold text-purple-800 mb-2">Puma Stylist Shoes</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-gray-500 line-through">$145</span>
                    <span className="text-xl font-bold">$115</span>
                    <span className="text-red-500 font-medium">-30%</span>
                  </div>
                  <button className="text-orange-500 text-sm font-medium">Get it now →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
