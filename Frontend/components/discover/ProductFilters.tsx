"use client"

import {
  CategoryFilter,
  PriceRangeFilter,
  CustomerReviewsFilter,
  BrandFilter,
  CollectionFilter,
  ShippingFilter
} from "./filters"

interface ProductFiltersProps {
  filters: {
    categories: string[]
    priceRange: { min: string; max: string }
    ratings: number[]
    brands: string[]
    collections: string[]
    freeShipping: boolean
  }
  onFilterChange: (filters: any) => void
}

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category)
    
    onFilterChange({ ...filters, categories: newCategories })
  }

  const handlePriceRangeChange = (priceRange: { min: string; max: string }) => {
    onFilterChange({ ...filters, priceRange })
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    const newRatings = checked 
      ? [...filters.ratings, rating]
      : filters.ratings.filter(r => r !== rating)
    
    onFilterChange({ ...filters, ratings: newRatings })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked 
      ? [...filters.brands, brand]
      : filters.brands.filter(b => b !== brand)
    
    onFilterChange({ ...filters, brands: newBrands })
  }

  const handleCollectionChange = (collection: string, checked: boolean) => {
    const newCollections = checked 
      ? [...filters.collections, collection]
      : filters.collections.filter(c => c !== collection)
    
    onFilterChange({ ...filters, collections: newCollections })
  }

  const handleFreeShippingChange = (checked: boolean) => {
    onFilterChange({ ...filters, freeShipping: checked })
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <CategoryFilter 
        selectedCategories={filters.categories}
        onCategoryChange={handleCategoryChange}
      />

      {/* Price Range */}
      <PriceRangeFilter 
        priceRange={filters.priceRange}
        onPriceRangeChange={handlePriceRangeChange}
      />

      {/* Customer Reviews */}
      <CustomerReviewsFilter 
        selectedRatings={filters.ratings}
        onRatingChange={handleRatingChange}
      />

      {/* Brands */}
      <BrandFilter 
        selectedBrands={filters.brands}
        onBrandChange={handleBrandChange}
      />

      {/* Collections */}
      <CollectionFilter 
        selectedCollections={filters.collections}
        onCollectionChange={handleCollectionChange}
      />

      {/* Shipping Options */}
      <ShippingFilter 
        freeShipping={filters.freeShipping}
        onFreeShippingChange={handleFreeShippingChange}
      />
    </div>
  )
} 