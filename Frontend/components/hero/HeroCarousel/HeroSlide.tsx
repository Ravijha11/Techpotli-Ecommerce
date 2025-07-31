"use client"

import { Banner } from "./types"

interface HeroSlideProps {
  banner: Banner
  isActive: boolean
}

export default function HeroSlide({ banner, isActive }: HeroSlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
        isActive ? "translate-x-0" : "-translate-x-full"
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
  )
} 