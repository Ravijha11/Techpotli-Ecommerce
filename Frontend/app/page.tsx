import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import { HeroSection } from "@/components/hero"
import ServiceFeatures from "@/components/common/ServiceFeatures"
import ProductGrid from "@/components/products/ProductGrid"
import TopSellingProducts from "@/components/products/ProductGrid/TopSellingProducts"
import FlashSale from "@/components/marketing/FlashSale"
import PromoBanner from "@/components/marketing/PromotionalBanners"
import FeaturedBrands from "@/components/marketing/FeaturedBrands"
import DailyDeals from "@/components/marketing/DailyDeals"
import BrandShowcase from "@/components/hero/BrandShowcase"
import NewsletterSubscription from "@/components/marketing/NewsletterSubscription"
import Footer from "@/components/layout/Footer"
import CategorySitemap from "@/components/layout/Footer/CategorySitemap"

// Keep page-specific components in app/components
import NewYearSale from "./components/NewYearSale"
import PromoBanners from "./components/PromoBanners"

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

const featuredProducts = [
  {
    id: "1",
    name: "Women's Casual Long Sleeve Lapel Zipper...",
    price: 76,
    originalPrice: 130,
    discount: 42,
    rating: 5,
    reviews: 5,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-v7eM14304Y2qz5NAjQJRkhm68kPTNZ.png",
    badge: "New",
  },
  {
    id: "2",
    name: "Self Retractable ID Badge Holder Key Reel, Heavy Du...",
    price: 105,
    originalPrice: 200,
    discount: 48,
    rating: 4,
    reviews: 2,
    image: "https://placehold.co/300x300/333/FFF?text=Nintendo+Switch",
    badge: "New",
  },
  {
    id: "3",
    name: "Nutrafol Women Hair Growth For Thicker, Stronger Hair ...",
    price: 91,
    originalPrice: 100,
    discount: 9,
    rating: 5,
    reviews: 2,
    image: "https://placehold.co/300x300/333/FFF?text=Water+Bottle",
  },
  {
    id: "4",
    name: "Andongnywelll Women's Casual Tops Leopard Print...",
    price: 82,
    originalPrice: 100,
    discount: 18,
    rating: 4,
    reviews: 2,
    image: "https://placehold.co/300x300/333/FFF?text=Casual+Tops",
  },
  {
    id: "5",
    name: "Sling Bag Canvas Crossbody Backpack...",
    price: 102,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviews: 2,
    image: "https://placehold.co/300x300/333/FFF?text=Backpack",
  },
  {
    id: "6",
    name: "3 Pairs Triple Stripe Over the Knee Socks Extra Long...",
    price: 88,
    originalPrice: 100,
    discount: 12,
    rating: 4,
    reviews: 2,
    image: "https://placehold.co/300x300/333/FFF?text=Sneakers",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <ServiceFeatures />
        <ProductGrid 
          title="Featured products"
          products={featuredProducts}
          viewAllLink="/products"
        />
        <NewYearSale />
        <TopSellingProducts />
        <PromoBanner />
        <FeaturedBrands />
        <DailyDeals />
        <BrandShowcase />
        <NewsletterSubscription />
      </main>
      <CategorySitemap />
      <Footer />
    </div>
  )
}
