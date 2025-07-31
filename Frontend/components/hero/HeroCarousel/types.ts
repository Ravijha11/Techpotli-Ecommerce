export interface Banner {
  id: number
  title: string
  subtitle: string
  discount: string
  description: string
  voucher: string
  cta: string
  image: string
  bgColor: string
}

export interface PromotionalCard {
  id: number
  title: string
  originalPrice: number
  salePrice: number
  discount: number
  badge?: string
} 