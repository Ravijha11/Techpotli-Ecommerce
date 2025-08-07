"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface PriceRangeFilterProps {
  priceRange: { min: string; max: string }
  onPriceRangeChange: (priceRange: { min: string; max: string }) => void
}

export default function PriceRangeFilter({ priceRange, onPriceRangeChange }: PriceRangeFilterProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange)

  const handleApply = () => {
    onPriceRangeChange(localPriceRange)
  }

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
      <div className="space-y-3">
        <div className="flex space-x-2">
          <Input
            placeholder="Min"
            value={localPriceRange.min}
            onChange={(e) => setLocalPriceRange({ ...localPriceRange, min: e.target.value })}
            className="w-20"
          />
          <Input
            placeholder="Max"
            value={localPriceRange.max}
            onChange={(e) => setLocalPriceRange({ ...localPriceRange, max: e.target.value })}
            className="w-20"
          />
          <Button onClick={handleApply} size="sm">
            Go
          </Button>
        </div>
      </div>
      <Separator className="mt-6" />
    </div>
  )
} 