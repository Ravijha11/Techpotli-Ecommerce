interface PriceDisplayProps {
  price: number
  originalPrice?: number | null
  discount?: number | null
}

export default function PriceDisplay({ price, originalPrice, discount }: PriceDisplayProps) {
  return (
    <div className="flex items-center space-x-2">
      {originalPrice && (
        <span className="text-sm text-gray-500 line-through">${originalPrice}</span>
      )}
      <span className="text-lg font-bold text-gray-800">${price}</span>
      {discount && (
        <span className="text-xs text-purple-600 font-medium">-{discount}%</span>
      )}
    </div>
  )
} 