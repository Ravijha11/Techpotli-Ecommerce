import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  return (
    <div className={`relative h-48 mb-4 ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover rounded"
      />
    </div>
  )
} 