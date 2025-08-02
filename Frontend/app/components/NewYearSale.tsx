"use client"

import ProductCarousel from "@/components/products/ProductCarousel"
import { newYearSaleProducts } from "@/data/newYearSaleProducts"

export default function NewYearSale() {
  return (
    <section className="w-full bg-white py-8">
      <div className="w-full px-6 md:px-6 lg:px-8">
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
      </div>
    </section>
  )
}
