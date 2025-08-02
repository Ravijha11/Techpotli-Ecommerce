export interface PromotionalBannerConfig {
  id: string
  title: string
  description: string
  imageUrl: string
  linkUrl: string
  altText: string
  height: number
  width: number
  isActive: boolean
  startDate?: string
  endDate?: string
  season?: string
}

export const promotionalBanners: PromotionalBannerConfig[] = [
  {
    id: "autumn-offer",
    title: "Autumn Offer",
    description: "Special deals and offers for autumn season",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-6.webp",
    linkUrl: "/autumn-offer/products?banner=6",
    altText: "Autumn Offer - Special deals and offers",
    height: 100,
    width: 500,
    isActive: true,
    season: "autumn"
  },
  {
    id: "diwali-sale",
    title: "Diwali Sale",
    description: "Festive season offers and discounts",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-diwali.webp",
    linkUrl: "/diwali-sale/products?banner=diwali",
    altText: "Diwali Sale - Festive season offers",
    height: 100,
    width: 500,
    isActive: false,
    season: "diwali"
  },
  {
    id: "christmas-offer",
    title: "Christmas Offer",
    description: "Holiday season special deals",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-christmas.webp",
    linkUrl: "/christmas-offer/products?banner=christmas",
    altText: "Christmas Offer - Holiday season deals",
    height: 100,
    width: 500,
    isActive: false,
    season: "christmas"
  },
  {
    id: "new-year-sale",
    title: "New Year Sale",
    description: "Start the year with amazing deals",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-newyear.webp",
    linkUrl: "/new-year-sale/products?banner=newyear",
    altText: "New Year Sale - Start the year with deals",
    height: 100,
    width: 500,
    isActive: false,
    season: "newyear"
  },
  {
    id: "summer-sale",
    title: "Summer Sale",
    description: "Hot deals for the summer season",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-summer.webp",
    linkUrl: "/summer-sale/products?banner=summer",
    altText: "Summer Sale - Hot deals for summer",
    height: 100,
    width: 500,
    isActive: false,
    season: "summer"
  }
]

/**
 * Get the currently active promotional banner
 * @returns PromotionalBannerConfig | null
 */
export function getActiveBanner(): PromotionalBannerConfig | null {
  return promotionalBanners.find(banner => banner.isActive) || null
}

/**
 * Get banner by season
 * @param season - The season to filter by
 * @returns PromotionalBannerConfig[]
 */
export function getBannersBySeason(season: string): PromotionalBannerConfig[] {
  return promotionalBanners.filter(banner => banner.season === season)
}

/**
 * Update banner status
 * @param bannerId - The banner ID to update
 * @param isActive - Whether the banner should be active
 */
export function updateBannerStatus(bannerId: string, isActive: boolean): void {
  const banner = promotionalBanners.find(b => b.id === bannerId)
  if (banner) {
    banner.isActive = isActive
  }
} 