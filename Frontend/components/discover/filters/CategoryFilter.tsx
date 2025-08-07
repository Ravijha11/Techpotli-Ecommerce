"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface CategoryFilterProps {
  selectedCategories: string[]
  onCategoryChange: (category: string, checked: boolean) => void
}

const categories = [
  "Men's Wear",
  "Women's Apparel", 
  "Beauty & Personal Care",
  "Jewellery & Accessories",
  "Electronics",
  "Home & Lifestyle",
  "Men's Shoes",
  "Home Appliances",
  "Men's Bags",
  "Toys, Kids & Babies",
  "Food & Groceries"
]

export default function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={(checked) => onCategoryChange(category, checked as boolean)}
            />
            <label htmlFor={category} className="text-sm text-gray-700 cursor-pointer">
              {category}
            </label>
          </div>
        ))}
      </div>
      <Separator className="mt-6" />
    </div>
  )
} 