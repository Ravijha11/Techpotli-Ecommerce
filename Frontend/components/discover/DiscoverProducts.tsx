"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import ProductFilters from "./ProductFilters"
import ProductGrid from "./ProductGrid"
import ProductHeader from "./ProductHeader"

export default function DiscoverProducts() {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: "", max: "" },
    ratings: [],
    brands: [],
    collections: [],
    freeShipping: false
  })

  const [sortBy, setSortBy] = useState("products")
  const [currentPage, setCurrentPage] = useState(1)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen)
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl responsive-container">
      {/* Page Header */}
      <ProductHeader 
        totalResults={40}
        currentPage={currentPage}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Mobile Filters Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors responsive-button"
        >
          {isFiltersOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Sidebar Filters */}
        <div className={`lg:w-64 lg:flex-shrink-0 ${isFiltersOpen ? 'block' : 'hidden'} md:block`}>
          <div className="lg:sticky lg:top-24">
            <ProductFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {isFiltersOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleFilters}
        />
      )}
    </div>
  )
} 