"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { newYearSaleProducts } from "@/components/NewYearSale/products/productsData"
import ProductDetail from "@/components/NewYearSale/ProductDetail"
import Header from "@/components/layout/Header"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the product by slug
    const foundProduct = newYearSaleProducts.find(p => p.slug === params.slug)
    
    if (foundProduct) {
      setProduct(foundProduct)
    }
    
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Full Header with Logo and Navigation */}
      <Header />
      
      {/* Product Detail */}
      <ProductDetail product={product} onClose={() => {}} />
    </div>
  )
}
