"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface CollectionFilterProps {
  selectedCollections: string[]
  onCollectionChange: (collection: string, checked: boolean) => void
}

const collections = [
  "New products",
  "Trending products", 
  "Top selling products"
]

export default function CollectionFilter({ selectedCollections, onCollectionChange }: CollectionFilterProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Collections</h3>
      <div className="space-y-2">
        {collections.map((collection) => (
          <div key={collection} className="flex items-center space-x-2">
            <Checkbox
              id={collection}
              checked={selectedCollections.includes(collection)}
              onCheckedChange={(checked) => onCollectionChange(collection, checked as boolean)}
            />
            <label htmlFor={collection} className="text-sm text-gray-700 cursor-pointer">
              {collection}
            </label>
          </div>
        ))}
      </div>
      <Separator className="mt-6" />
    </div>
  )
} 