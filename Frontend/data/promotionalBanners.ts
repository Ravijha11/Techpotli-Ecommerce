export interface PromotionalBannerConfig {
  id: string
  title: string
  imageUrl: string
  linkUrl: string
  altText: string
  height: number
  width: number
  isActive: boolean
  priority: number
  startDate?: string
  endDate?: string
  category?: string
  tags?: string[]
}

export const promotionalBanners: PromotionalBannerConfig[] = [
  {
    id: "summer-fashion-2024",
    title: "Summer Fashion Collection",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-5.webp",
    linkUrl: "/summer-fashion/products?banner=5",
    altText: "Summer fashion collection with trendy styles",
    height: 100,
    width: 500,
    isActive: true,
    priority: 1,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    category: "fashion",
    tags: ["summer", "fashion", "clothing"]
  },
  {
    id: "autumn-offer-2024",
    title: "Autumn Special Offers",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-6.webp",
    linkUrl: "/autumn-offer/products?banner=6",
    altText: "Autumn special deals and discounts",
    height: 100,
    width: 500,
    isActive: false,
    priority: 2,
    startDate: "2024-09-01",
    endDate: "2024-11-30",
    category: "seasonal",
    tags: ["autumn", "offers", "discounts"]
  },
  {
    id: "diwali-sale-2024",
    title: "Diwali Festival Sale",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-diwali.webp",
    linkUrl: "/diwali-sale/products?banner=diwali",
    altText: "Diwali festival special sale",
    height: 100,
    width: 500,
    isActive: false,
    priority: 3,
    startDate: "2024-10-15",
    endDate: "2024-11-15",
    category: "festival",
    tags: ["diwali", "festival", "sale"]
  },
  {
    id: "christmas-deals-2024",
    title: "Christmas & New Year Deals",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-christmas.webp",
    linkUrl: "/christmas-deals/products?banner=christmas",
    altText: "Christmas and New Year special deals",
    height: 100,
    width: 500,
    isActive: false,
    priority: 4,
    startDate: "2024-12-01",
    endDate: "2025-01-15",
    category: "festival",
    tags: ["christmas", "new-year", "deals"]
  },
  {
    id: "electronics-sale",
    title: "Electronics Mega Sale",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-electronics.webp",
    linkUrl: "/electronics-sale/products?banner=electronics",
    altText: "Electronics mega sale with huge discounts",
    height: 100,
    width: 500,
    isActive: false,
    priority: 5,
    category: "electronics",
    tags: ["electronics", "sale", "discounts"]
  },
  {
    id: "back-to-school",
    title: "Back to School Essentials",
    imageUrl: "https://cdn.ishop.cholobangla.com/uploads/banner-school.webp",
    linkUrl: "/back-to-school/products?banner=school",
    altText: "Back to school essentials and supplies",
    height: 100,
    width: 500,
    isActive: false,
    priority: 6,
    startDate: "2024-07-15",
    endDate: "2024-09-15",
    category: "education",
    tags: ["school", "education", "supplies"]
  }
]

/**
 * Get the currently active banner based on date and priority
 */
export function getActiveBanner(): PromotionalBannerConfig | null {
  const now = new Date()
  const currentDate = now.toISOString().split('T')[0]

  // Filter active banners
  const activeBanners = promotionalBanners.filter(banner => {
    if (!banner.isActive) return false
    
    // Check date range if specified
    if (banner.startDate && banner.endDate) {
      return currentDate >= banner.startDate && currentDate <= banner.endDate
    }
    
    return true
  })

  // Sort by priority (lower number = higher priority)
  const sortedBanners = activeBanners.sort((a, b) => a.priority - b.priority)
  
  return sortedBanners.length > 0 ? sortedBanners[0] : null
}

/**
 * Get banners by category
 */
export function getBannersByCategory(category: string): PromotionalBannerConfig[] {
  return promotionalBanners.filter(banner => 
    banner.category === category && banner.isActive
  )
}

/**
 * Get banners by tags
 */
export function getBannersByTags(tags: string[]): PromotionalBannerConfig[] {
  return promotionalBanners.filter(banner => 
    banner.isActive && banner.tags?.some(tag => tags.includes(tag))
  )
}

/**
 * Activate a banner by ID
 */
export function activateBanner(bannerId: string): void {
  const banner = promotionalBanners.find(b => b.id === bannerId)
  if (banner) {
    banner.isActive = true
  }
}

/**
 * Deactivate a banner by ID
 */
export function deactivateBanner(bannerId: string): void {
  const banner = promotionalBanners.find(b => b.id === bannerId)
  if (banner) {
    banner.isActive = false
  }
}

/**
 * Add a new banner
 */
export function addBanner(banner: PromotionalBannerConfig): void {
  promotionalBanners.push(banner)
}

/**
 * Update an existing banner
 */
export function updateBanner(bannerId: string, updates: Partial<PromotionalBannerConfig>): void {
  const banner = promotionalBanners.find(b => b.id === bannerId)
  if (banner) {
    Object.assign(banner, updates)
  }
}

/**
 * Remove a banner
 */
export function removeBanner(bannerId: string): void {
  const index = promotionalBanners.findIndex(b => b.id === bannerId)
  if (index !== -1) {
    promotionalBanners.splice(index, 1)
  }
} 