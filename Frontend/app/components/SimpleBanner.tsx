import Image from "next/image"
import Link from "next/link"

interface SimpleBannerProps {
  imageUrl: string
  linkUrl?: string
  altText?: string
  height?: number
  width?: number
}

export default function SimpleBanner({
  imageUrl,
  linkUrl = "#",
  altText = "Promotional Banner",
  height = 100,
  width = 500
}: SimpleBannerProps) {
  return (
    <section className="w-full bg-white py-4">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <Link 
          href={linkUrl} 
          className="block banner-wrapper home-section mb-0 br-primary flow-hidden"
          aria-label={altText}
        >
          <Image
            src={imageUrl}
            alt={altText}
            height={height}
            width={width}
            className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            priority
          />
        </Link>
      </div>
    </section>
  )
} 