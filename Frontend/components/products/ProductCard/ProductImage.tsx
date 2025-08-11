import Image from "next/image"

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  return (
    <div className={`relative aspect-square mb-3 md:mb-4 rounded-lg overflow-hidden ${className}`}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover rounded-lg responsive-image"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
      />
    </div>
  )
} 