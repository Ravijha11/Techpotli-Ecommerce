"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import ProductFilters from "./ProductFilters"
import ProductGrid from "./ProductGrid"
import ProductHeader from "./ProductHeader"

interface Filters {
  categories: string[]
  priceRange: { min: string; max: string }
  ratings: number[]
  brands: string[]
  collections: string[]
  freeShipping: boolean
}

export default function DiscoverProducts() {
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState<Filters>({
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
  const [isLoading, setIsLoading] = useState(false)

  // Read brand and category parameters from URL and apply to filters
  useEffect(() => {
    const brandParam = searchParams.get('brand')
    const categoryParam = searchParams.get('category')
    
    if (brandParam || categoryParam) {
      setIsLoading(true)
      setFilters(prev => ({
        ...prev,
        brands: brandParam ? [brandParam] : prev.brands,
        categories: categoryParam ? [categoryParam] : prev.categories
      }))
      // Simulate loading time for better UX
      setTimeout(() => setIsLoading(false), 500)
    }
  }, [searchParams])

  const handleFilterChange = (newFilters: Filters) => {
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
        activeFilters={filters}
      />

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">
            {filters.brands.length > 0 && `Loading ${filters.brands[0]} products...`}
            {filters.categories.length > 0 && `Loading ${filters.categories[0]} products...`}
            {filters.brands.length === 0 && filters.categories.length === 0 && 'Loading products...'}
          </span>
        </div>
      )}

      {/* Active Filters Display */}
      {(filters.brands.length > 0 || filters.categories.length > 0) && !isLoading && (
        <div className="flex items-center justify-between py-3 px-4 bg-blue-50 border border-blue-200 rounded-lg mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-blue-800">Active Filters:</span>
            {filters.brands.map((brand) => (
              <span key={brand} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Brand: {brand}
              </span>
            ))}
            {filters.categories.map((category) => (
              <span key={category} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Category: {category}
              </span>
            ))}
          </div>
          <button
            onClick={() => setFilters({
              categories: [],
              priceRange: { min: "", max: "" },
              ratings: [],
              brands: [],
              collections: [],
              freeShipping: false
            })}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Clear All Filters
          </button>
        </div>
      )}

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