import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import DiscoverProducts from "@/components/discover/DiscoverProducts"

export const metadata: Metadata = {
  title: "Discover Products - Techpotli",
  description: "Explore our wide range of products including electronics, fashion, home & lifestyle, and more.",
  keywords: "discover products, online shopping, electronics, fashion, home & lifestyle",
}

export default function DiscoverProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <DiscoverProducts />
      </main>
      <Footer />
    </div>
  )
} 