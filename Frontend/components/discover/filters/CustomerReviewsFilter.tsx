"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

interface CustomerReviewsFilterProps {
  selectedRatings: number[]
  onRatingChange: (rating: number, checked: boolean) => void
}

export default function CustomerReviewsFilter({ selectedRatings, onRatingChange }: CustomerReviewsFilterProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">Customer Reviews</h3>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <Checkbox
              id={`rating-${rating}`}
              checked={selectedRatings.includes(rating)}
              onCheckedChange={(checked) => onRatingChange(rating, checked as boolean)}
            />
            <label htmlFor={`rating-${rating}`} className="text-sm text-gray-700 cursor-pointer flex items-center">
              <span className="text-yellow-400 mr-1">{"★".repeat(rating)}</span>
              <span className="text-gray-400">{"★".repeat(5 - rating)}</span>
              <span className="ml-2">({Math.floor(Math.random() * 100) + 10} reviews)</span>
            </label>
          </div>
        ))}
      </div>
      <Separator className="mt-6" />
    </div>
  )
} 