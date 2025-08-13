"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { newYearSaleProducts } from "@/components/NewYearSale/products/productsData"
import ProductDetail from "@/components/NewYearSale/ProductDetail"

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
      {/* Header with Back Button */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a 
            href="/"
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to New Year Sale</span>
          </a>
        </div>
      </div>

      {/* Product Detail */}
      <ProductDetail product={product} onClose={() => {}} />
    </div>
  )
}
