export interface BannerProduct {
  id: string
  name: string
  description: string
  currentPrice: string
  originalPrice: string
  discount: string
  image: string
  backgroundColor: string
  season: string
  isActive: boolean
  startDate?: string
  endDate?: string
  category?: string
  tags?: string[]
  priority?: number
}

export interface BannerSeason {
  id: string
  name: string
  startDate: string
  endDate: string
  isActive: boolean
  theme?: string
  products: BannerProduct[]
}

export interface BannerResponse {
  success: boolean
  data: {
    currentSeason: BannerSeason
    products: BannerProduct[]
  }
  message?: string
}
