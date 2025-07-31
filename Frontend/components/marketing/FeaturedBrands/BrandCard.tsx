import Image from "next/image"

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
    <div className={`bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow h-24 ${className}`}>
      <Image
        src={brand.logo || "/placeholder.svg"}
        alt={brand.name}
        width={80}
        height={40}
        className="object-contain mb-2"
      />
      <span className="text-sm font-medium text-gray-700">{brand.name}</span>
    </div>
  )
} 