"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import { newYearSaleProducts } from "./products/productsData"
import ProductCard from "./ProductCard"
import ProductBanner from "./ProductBanner"

export default function NewYearSale() {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 5

  const totalPages = Math.ceil(newYearSaleProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const currentProducts = newYearSaleProducts.slice(startIndex, endIndex)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="w-full bg-white">
      {/* Product Listing Section */}
      <section className="py-6 sm:py-8">
        <div className="w-full px-4 sm:px-6 md:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">New Year Sale</h2>
              <div className="text-base sm:text-lg font-mono text-gray-600">
                506:23:55:46
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="relative mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 sm:space-x-2 text-center sm:text-left">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Banner Section */}
      <ProductBanner />
    </div>
  )
}
