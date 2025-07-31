import { Star } from "lucide-react"

interface ProductInfoProps {
  name: string
  rating: number
  reviews: number
}

export default function ProductInfo({ name, rating, reviews }: ProductInfoProps) {
  return (
    <div>
      <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm">{name}</h3>
      
      <div className="flex items-center mb-2">
        <div className="flex items-center mr-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
        </div>
        <span className="text-xs text-gray-500">{reviews} Reviews</span>
      </div>
    </div>
  )
} 