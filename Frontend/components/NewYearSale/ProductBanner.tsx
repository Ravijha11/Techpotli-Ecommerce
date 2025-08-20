"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { BannerProduct } from "./types/banner.types"
import { BannerService } from "./services/banner.service"

export default function ProductBanner() {
  const [bannerProducts, setBannerProducts] = useState<BannerProduct[]>([])
  const [currentSeason, setCurrentSeason] = useState("Winter 2024")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBannerProducts = async () => {
      try {
        setIsLoading(true)
        const products = await BannerService.getCurrentSeasonBanners()
        setBannerProducts(products)
        
        // Extract season from first product
        if (products.length > 0) {
          const season = products[0].season
          setCurrentSeason(season ? season.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Current Season")
        }
      } catch (error) {
        console.error('Error fetching banner products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBannerProducts()
  }, [])

  // Filter only active products for current season
  const activeProducts = bannerProducts.filter(product => product.isActive)

  if (isLoading) {
    return (
      <section className="w-full py-6 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse h-[320px] flex flex-col">
                <div className="w-full h-32 bg-gray-200 rounded-md mb-3 flex-shrink-0"></div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-5 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded mt-3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (activeProducts.length === 0) {
    return (
      <section className="w-full py-6 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center py-6">
            <h3 className="text-base font-semibold text-gray-600 mb-2">No Banner Products Available</h3>
            <p className="text-gray-500 text-sm">Check back later for seasonal offers!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-6 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Banner Grid - Horizontal Layout with compact dimensions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {activeProducts.map((product) => (
            <div
              key={product.id}
              className={`${product.backgroundColor} rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group h-[320px] flex flex-col`}
            >
              {/* Product Image - Smaller height for compact design */}
              <div className="w-full h-32 rounded-md mb-3 overflow-hidden bg-white flex-shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info - Compact content area */}
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-xs">{product.description}</p>
                  </div>
                  
                  {/* Pricing - Compact layout */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-800">{product.currentPrice}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full">
                      {product.discount}
                    </span>
                  </div>
                </div>

                {/* Call to Action Button - Bottom aligned, smaller size */}
                <button className="w-full bg-white text-gray-800 font-medium py-2 px-3 rounded-md border border-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105 mt-3 text-sm">
                  <span>Get it now</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Season Indicator - Dynamic from backend */}
        <div className="text-center mt-4">
          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Current Season: {currentSeason}
          </span>
        </div>
      </div>
    </section>
  )
}
