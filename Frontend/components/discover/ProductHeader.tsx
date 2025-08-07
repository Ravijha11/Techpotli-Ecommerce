"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductHeaderProps {
  totalResults: number
  currentPage: number
  sortBy: string
  onSortChange: (value: string) => void
}

export default function ProductHeader({ 
  totalResults, 
  currentPage, 
  sortBy, 
  onSortChange 
}: ProductHeaderProps) {
  const startResult = (currentPage - 1) * 20 + 1
  const endResult = Math.min(currentPage * 20, totalResults)

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-200">
      <div className="text-gray-600">
        Showing {startResult}-{endResult} of {totalResults} results for "discover"
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