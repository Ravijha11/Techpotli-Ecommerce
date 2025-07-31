import type { Metadata } from "next"
import Header from "./components/Header"
import HeroCarousel from "./components/HeroCarousel"
import FeaturedProducts from "./components/FeaturedProducts"
import NewYearSale from "./components/NewYearSale"
import ServiceFeatures from "./components/ServiceFeatures"
import BrandsCarousel from "./components/BrandsCarousel"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"
import TopSellingProducts from "./components/TopSellingProducts"
import PromoBanner from "./components/PromoBanner"
import FeaturedBrands from "./components/FeaturedBrands"
import DailyDiscover from "./components/DailyDiscover"

export const metadata: Metadata = {
  title: "iShop - Best Online Shopping Store in India | Electronics, Fashion & More",
  description:
    "Shop the latest smartphones, laptops, fashion, and electronics at iShop. Get best deals, free shipping, and 24/7 customer support. Your trusted online shopping destination.",
  keywords: "online shopping, electronics, smartphones, laptops, fashion, india, ecommerce",
  openGraph: {
    title: "iShop - Best Online Shopping Store in India",
    description: "Shop the latest products with amazing deals and fast delivery",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroCarousel />
        <ServiceFeatures />
        <FeaturedProducts />
        <NewYearSale />
        <TopSellingProducts />
        <PromoBanner />
        <FeaturedBrands />
        <DailyDiscover />
        <BrandsCarousel />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
