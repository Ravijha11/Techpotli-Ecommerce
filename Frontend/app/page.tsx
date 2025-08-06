import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import { HeroSection } from "@/components/hero"
import ServiceFeatures from "@/components/common/ServiceFeatures"
import FeaturedCategories from "@/components/categories/FeaturedCategories"
import FlashSale from "@/components/marketing/FlashSale"
import NewsletterSubscription from "@/components/marketing/NewsletterSubscription"
import PromotionalBanner from "@/components/marketing/PromotionalBanner"
import DailyDiscover from "@/components/marketing/DailyDiscover"
import TopSellingProducts from "@/components/marketing/TopSellingProducts"
import TrendingProducts from "@/components/marketing/TrendingProducts"
import Footer from "@/components/layout/Footer"
import CategorySitemap from "@/components/layout/Footer/CategorySitemap"

// Keep page-specific components in app/components
import NewYearSale from "./components/NewYearSale"
import FeatureSection from "./components/FeatureSection"
import PromoBanners from "./components/PromoBanners"
import SimpleBanner from "./components/SimpleBanner"

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <ServiceFeatures />
        <NewYearSale />
        <FeatureSection />
        <TrendingProducts />
        <FeaturedCategories />
        <TopSellingProducts />
        <PromotionalBanner />
        <DailyDiscover />
        <SimpleBanner 
          imageUrl="https://cdn.ishop.cholobangla.com/uploads/banner-6.webp"
          linkUrl="/autumn-offer/products?banner=6"
          altText="Autumn Special Offers"
          height={100}
          width={500}
        />
        <NewsletterSubscription />
      </main>
      <CategorySitemap />
      <Footer />
    </div>
  )
}
