import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import { HeroSection } from "@/components/hero"
import ServiceFeatures from "@/components/common/ServiceFeatures"
import ProductCarousel from "@/components/products/ProductCarousel"
import TopSellingProducts from "@/components/products/ProductGrid/TopSellingProducts"
import FlashSale from "@/components/marketing/FlashSale"
import FeaturedBrands from "@/components/marketing/FeaturedBrands"
import DailyDeals from "@/components/marketing/DailyDeals"
import ProductBanner from "@/components/marketing/ProductBanner"
import FeaturedCategories from "@/components/categories/FeaturedCategories"
import BrandShowcase from "@/components/hero/BrandShowcase"
import Newsletter from "@/components/layout/Footer/Newsletter"
import Footer from "@/components/layout/Footer"

// Keep page-specific components in app/components
import NewYearSale from "./components/NewYearSale"

// Import data
import { featuredProducts } from "@/data/featuredProducts"

export const metadata: Metadata = {
  title: "Techpotli - Best Online Shopping Store in India | Electronics, Fashion & More",
  description:
    "Shop the latest smartphones, laptops, fashion, and electronics at Techpotli. Get best deals, free shipping, and 24/7 customer support. Your trusted online shopping destination.",
  keywords: "online shopping, electronics, smartphones, laptops, fashion, india, ecommerce",
  openGraph: {
    title: "Techpotli - Best Online Shopping Store in India",
    description: "Shop the latest products with amazing deals and fast delivery",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <main className="space-y-0">
        {/* Hero Section - No top margin needed */}
        <section className="relative">
          <HeroSection />
        </section>

        {/* Service Features - Compact spacing */}
        <section className="py-8 bg-white shadow-sm">
          <ServiceFeatures />
        </section>

        {/* New Year Sale - Enhanced spacing */}
        <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
          <NewYearSale />
        </section>

        {/* Product Banner - Premium spacing */}
        <section className="py-16 bg-white">
          <ProductBanner />
        </section>

        {/* Featured Products - Enhanced section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <ProductCarousel 
            title="Featured products"
            products={featuredProducts}
            viewAllLink="/products"
          />
        </section>

        {/* Featured Categories - Enhanced section */}
        <section className="py-16 bg-white">
          <FeaturedCategories />
        </section>

        {/* Top Selling Products - Premium spacing */}
        <section className="py-16 bg-white">
          <TopSellingProducts />
        </section>

        {/* Featured Brands - Enhanced spacing */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
          <FeaturedBrands />
        </section>

        {/* Daily Deals - Premium spacing */}
        <section className="py-16 bg-white">
          <DailyDeals />
        </section>

        {/* Brand Showcase - Enhanced spacing */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <BrandShowcase />
        </section>

        {/* Newsletter - Compact spacing */}
        <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
          <Newsletter />
        </section>
      </main>
      <Footer />
    </div>
  )
}
