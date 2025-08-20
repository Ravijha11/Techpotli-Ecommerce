import Image from "next/image"
import Link from "next/link"

interface Brand {
  name: string
  logo: string
}

interface BrandCardProps {
  brand: Brand
  className?: string
}

export default function BrandCard({ brand, className = "" }: BrandCardProps) {
  return (
    <Link
      href={`/discover/products?brand=${encodeURIComponent(brand.name)}`}
      className={`bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition-all duration-200 hover:border-blue-500 hover:scale-105 h-24 group ${className}`}
      title={`Click to view ${brand.name} products`}
    >
      <Image
        src={brand.logo || "/placeholder.svg"}
        alt={brand.name}
        width={80}
        height={40}
        className="object-contain mb-2 group-hover:scale-110 transition-transform"
      />
      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{brand.name}</span>
    </Link>
  )
} 