"use client"

import Image from "next/image"
import Link from "next/link"
import { getActiveBanner, promotionalBanners } from "@/data/promotionalBanners"

interface PromotionalBannerProps {
  title?: string
  imageUrl?: string
  linkUrl?: string
  altText?: string
  height?: number
  width?: number
  useConfig?: boolean
  bannerId?: string
}

/**
 * PromotionalBanner Component
 * 
 * A flexible promotional banner component designed for large e-commerce websites.
 * Features:
 * - Configuration-based banner management
 * - Date-based activation/deactivation
 * - Priority-based display logic
 * - Category and tag-based filtering
 * - Easy campaign management
 * - Responsive design
 * 
 * @example
 * ```tsx
 * // Use configuration system (recommended)
 * <PromotionalBanner useConfig={true} />
 * 
 * // Use specific banner
 * <PromotionalBanner bannerId="summer-fashion-2024" />
 * 
 * // Use custom props
 * <PromotionalBanner 
 *   title="Custom Banner"
 *   imageUrl="https://example.com/banner.jpg"
 *   linkUrl="/custom-page"
 *   altText="Custom banner"
 * />
 * ```
 */
export default function PromotionalBanner({
  title,
  imageUrl,
  linkUrl,
  altText,
  height = 100,
  width = 500,
  useConfig = true,
  bannerId
}: PromotionalBannerProps) {
  // Get banner data from configuration if enabled
  let bannerData = null
  
  if (useConfig) {
    if (bannerId) {
      // Find specific banner by ID
      bannerData = promotionalBanners.find((b: any) => b.id === bannerId && b.isActive)
    } else {
      bannerData = getActiveBanner()
    }
  }

  // Use configuration data or fall back to props
  const displayData = bannerData || {
    title: title || "Summer Fashion",
    imageUrl: imageUrl || "https://cdn.ishop.cholobangla.com/uploads/banner-5.webp",
    linkUrl: linkUrl || "/summer-fashion/products?banner=5",
    altText: altText || "Summer fashion",
    height,
    width
  }

  // Don't render if no banner data is available
  if (!displayData) {
    return null
  }

  return (
    <section className="w-full bg-white py-4">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <Link 
          href={displayData.linkUrl} 
          className="block banner-wrapper home-section mb-0 br-primary flow-hidden"
          aria-label={displayData.title}
        >
          <Image
            src={displayData.imageUrl}
            alt={displayData.altText}
            height={displayData.height}
            width={displayData.width}
            className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            priority
          />
        </Link>
      </div>
    </section>
  )
} 