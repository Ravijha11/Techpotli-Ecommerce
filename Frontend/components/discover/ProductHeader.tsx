"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductHeaderProps {
  totalResults: number
  currentPage: number
  sortBy: string
  onSortChange: (value: string) => void
  activeFilters?: {
    brands?: string[]
    categories?: string[]
  }
}

export default function ProductHeader({ 
  totalResults, 
  currentPage, 
  sortBy, 
  onSortChange,
  activeFilters
}: ProductHeaderProps) {
  const startResult = (currentPage - 1) * 20 + 1
  const endResult = Math.min(currentPage * 20, totalResults)

  // Generate results text based on active filters
  const getResultsText = () => {
    let baseText = `Showing ${startResult}-${endResult} of ${totalResults} results`
    
    if (activeFilters?.brands && activeFilters.brands.length > 0) {
      const brandText = activeFilters.brands.length === 1 
        ? activeFilters.brands[0] 
        : activeFilters.brands.join(", ")
      baseText += ` for ${brandText}`
    } else if (activeFilters?.categories && activeFilters.categories.length > 0) {
      const categoryText = activeFilters.categories.length === 1 
        ? activeFilters.categories[0] 
        : activeFilters.categories.join(", ")
      baseText += ` in ${categoryText}`
    } else {
      baseText += " for all products"
    }
    
    return baseText
  }

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="text-gray-600">
        {getResultsText()}
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-gray-600">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="products">Products</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 