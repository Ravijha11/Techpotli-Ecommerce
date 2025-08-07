"use client"

import { useState } from "react"
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

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Page Header */}
      <ProductHeader 
        totalResults={40}
        currentPage={currentPage}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="flex gap-6 mt-6">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0">
          <ProductFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid 
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  )
} 