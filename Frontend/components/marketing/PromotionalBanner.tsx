"use client"

import Link from "next/link"
import Image from "next/image"
import { getActiveBanner } from "@/data/promotionalBanners"

interface PromotionalBannerProps {
  title?: string
  description?: string
  imageUrl?: string
  linkUrl?: string
  altText?: string
  height?: number
  width?: number
  useConfig?: boolean
}

/**
 * PromotionalBanner Component
 * 
 * A flexible promotional banner component that can be easily updated for different seasons and offers.
 * Features:
 * - Responsive design
 * - Easy customization for different campaigns
 * - SEO-friendly with proper alt text
 * - Clickable banner with link
 * - Configurable through data file
 * 
 * @example
 * ```tsx
 * <PromotionalBanner useConfig={true} />
 * ```
 */
export default function PromotionalBanner({
  title,
  description,
  imageUrl,
  linkUrl,
  altText,
  height = 100,
  width = 500,
  useConfig = true
}: PromotionalBannerProps) {
  // Use configuration if enabled, otherwise use props
  const config = useConfig ? getActiveBanner() : null
  
  const bannerData = config || {
    title: title || "Autumn Offer",
    description: description || "Special deals and offers",
    imageUrl: imageUrl || "https://cdn.ishop.cholobangla.com/uploads/banner-6.webp",
    linkUrl: linkUrl || "/autumn-offer/products?banner=6",
    altText: altText || "Autumn Offer"
  }
  return (
    <section className="w-full bg-transparent overflow-hidden">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <Link 
          href={bannerData.linkUrl} 
          className="block banner-wrapper br-primary flow-hidden hover:opacity-95 transition-opacity duration-200"
          aria-label={bannerData.title}
        >
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={bannerData.imageUrl}
              alt={bannerData.altText}
              width={width}
              height={height}
              className="w-full h-auto object-cover"
              priority
            />
            {/* Optional overlay for text */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </Link>
      </div>
    </section>
  )
} 