import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import CategoriesGrid from "@/components/categories/CategoriesGrid"

export const metadata: Metadata = {
  title: "Categories - Techpotli",
  description: "Explore our wide range of product categories including fashion, electronics, home & lifestyle, and more.",
  keywords: "categories, product categories, fashion, electronics, home & lifestyle, online shopping",
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <CategoriesGrid />
      </main>
      <Footer />
    </div>
  )
} 