import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import BrandsGrid from "@/components/brands/BrandsGrid"

export const metadata: Metadata = {
  title: "Brands - Techpotli",
  description: "Explore our wide range of trusted brands including fashion, electronics, beauty, and more.",
  keywords: "brands, fashion brands, electronics brands, beauty brands, trusted brands, online shopping",
}

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <BrandsGrid />
      </main>
      <Footer />
    </div>
  )
}
