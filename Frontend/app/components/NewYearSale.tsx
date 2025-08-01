"use client"

import ProductCarousel from "@/components/products/ProductCarousel"
import { newYearSaleProducts } from "@/data/newYearSaleProducts"

export default function NewYearSale() {
  return (
    <ProductCarousel
      title="New Year Sale"
      products={newYearSaleProducts}
      viewAllLink="/sale"
      showCountdown={true}
      countdownData={{
        days: 506,
        hours: 23,
        minutes: 55,
        seconds: 46,
      }}
    />
  )
}
