import type { Metadata } from "next"
import { Suspense } from "react"
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
        <Suspense fallback={
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        }>
          <DiscoverProducts />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
} 