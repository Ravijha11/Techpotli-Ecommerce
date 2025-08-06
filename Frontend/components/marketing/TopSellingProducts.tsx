"use client"

import Link from "next/link"
import Image from "next/image"
import { RefreshCw } from "lucide-react"
import { TopSellingProduct, topSellingProducts } from "@/data/topSellingProducts"

interface TopSellingProductsProps {
  title?: string
  products?: TopSellingProduct[]
  showAllLink?: string
  className?: string
}

export default function TopSellingProducts({
  title = "Top selling products",
  products = topSellingProducts,
  showAllLink = "/top-selling-products/collection?collection=3",
  className = ""
}: TopSellingProductsProps) {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <Link 
            href={showAllLink} 
            className="text-gray-600 hover:text-purple-600 font-medium underline min-w-[80px] text-center"
          >
            Show all
          </Link>
        </div>

        {/* Products Grid - 3x3 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
          {products.slice(0, 9).map((product) => (
            <Link 
              key={product.id} 
              href={product.href} 
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                <div className="flex p-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-16 h-16 mr-4">
                    <Image
                      src={product.image}
                      alt={product.altText}
                      title={product.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.jpg";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                      {product.name}
                    </h3>
                    
                    {/* Price and Discount */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {product.originalPrice && product.originalPrice > product.price ? (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              ${product.price}
                            </span>
                            {product.discount && (
                              <span className="text-xs font-bold text-white bg-purple-600 px-2 py-1 rounded">
                                -{product.discount}%
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-sm font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>
                      
                      {/* Refresh Button */}
                      <button 
                        className="w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors duration-200"
                        onClick={(e) => {
                          e.preventDefault()
                          // Add refresh functionality here
                        }}
                        title="Refresh"
                        aria-label="Refresh product"
                      >
                        <RefreshCw className="w-3 h-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 