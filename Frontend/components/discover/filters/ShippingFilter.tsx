"use client"

import { Checkbox } from "@/components/ui/checkbox"

interface ShippingFilterProps {
  freeShipping: boolean
  onFreeShippingChange: (checked: boolean) => void
}

export default function ShippingFilter({ freeShipping, onFreeShippingChange }: ShippingFilterProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Shipping Options</h3>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="free-shipping"
          checked={freeShipping}
          onCheckedChange={onFreeShippingChange}
        />
        <label htmlFor="free-shipping" className="text-sm text-gray-700 cursor-pointer">
          Free shipping
        </label>
      </div>
    </div>
  )
} 