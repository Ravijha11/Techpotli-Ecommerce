"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface BrandFilterProps {
  selectedBrands: string[]
  onBrandChange: (brand: string, checked: boolean) => void
}

const brands = [
  "Apple",
  "Samsung",
  "Sony",
  "LG",
  "Panasonic",
  "Philips",
  "Nike",
  "Adidas",
  "Levi's",
  "H&M",
  "Zara",
  "Gucci",
  "Rolex",
  "Gillette",
  "L'Oréal",
  "Nescafe",
  "Accenture"
]

export default function BrandFilter({ selectedBrands, onBrandChange }: BrandFilterProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
      <div className="space-y-2">
        {brands.map((brand) => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={(checked) => onBrandChange(brand, checked as boolean)}
            />
            <label htmlFor={brand} className="text-sm text-gray-700 cursor-pointer">
              {brand}
            </label>
          </div>
        ))}
      </div>
      <Separator className="mt-6" />
    </div>
  )
} 