import { BannerResponse, BannerProduct } from '../types/banner.types'

// This service will be used when backend is connected
export class BannerService {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

  /**
   * Fetch banner products for current season
   */
  static async getCurrentSeasonBanners(): Promise<BannerProduct[]> {
    try {
      // When backend is connected, replace this with actual API call
      // const response = await fetch(`${this.baseUrl}/banners/current-season`)
      // const data: BannerResponse = await response.json()
      // return data.data.products

      // For now, return mock data
      return this.getMockBannerProducts()
    } catch (error) {
      console.error('Error fetching banner products:', error)
      return this.getMockBannerProducts()
    }
  }

  /**
   * Fetch banner products by season
   */
  static async getBannersBySeason(seasonId: string): Promise<BannerProduct[]> {
    try {
      // When backend is connected, replace this with actual API call
      // const response = await fetch(`${this.baseUrl}/banners/season/${seasonId}`)
      // const data: BannerResponse = await response.json()
      // return data.data.products

      // For now, return mock data
      return this.getMockBannerProducts()
    } catch (error) {
      console.error('Error fetching season banners:', error)
      return this.getMockBannerProducts()
    }
  }

  /**
   * Update banner product (admin function)
   */
  static async updateBannerProduct(productId: string, updates: Partial<BannerProduct>): Promise<boolean> {
    try {
      // When backend is connected, replace this with actual API call
      // const response = await fetch(`${this.baseUrl}/banners/products/${productId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updates)
      // })
      // return response.ok

      console.log('Mock update:', { productId, updates })
      return true
    } catch (error) {
      console.error('Error updating banner product:', error)
      return false
    }
  }

  /**
   * Get mock data for development
   */
  private static getMockBannerProducts(): BannerProduct[] {
    return [
      {
        id: "1",
        name: "Lasika W-H9015",
        description: "Digital watch for men",
        currentPrice: "$399",
        originalPrice: "$599",
        discount: "-40%",
        image: "/Rolex.jpg",
        backgroundColor: "bg-amber-50",
        season: "winter-2024",
        isActive: true,
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        category: "watches",
        tags: ["digital", "rose-gold", "men"],
        priority: 1
      },
      {
        id: "2",
        name: "Micropack MHP-01",
        description: "3.5mm Headphone",
        currentPrice: "$299",
        originalPrice: "$145",
        discount: "-45%",
        image: "/Sony.jpg",
        backgroundColor: "bg-slate-100",
        season: "winter-2024",
        isActive: true,
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        category: "audio",
        tags: ["over-ear", "wired", "grey"],
        priority: 2
      },
      {
        id: "3",
        name: "Aaj Oil Pull Up Classic",
        description: "Backpack Navy",
        currentPrice: "$149",
        originalPrice: "$175",
        discount: "-20%",
        image: "/Nike.jpg",
        backgroundColor: "bg-blue-50",
        season: "winter-2024",
        isActive: true,
        startDate: "2024-12-01",
        endDate: "2024-12-31",
        category: "bags",
        tags: ["leather", "backpack", "navy"],
        priority: 3
      }
    ]
  }
}
