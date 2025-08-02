"use client"

import Link from "next/link"
import Image from "next/image"
import { TopSellingProduct, topSellingProducts } from "@/data/topSellingProducts"

interface TopSellingProductsProps {
  title?: string
  products?: TopSellingProduct[]
  showAllLink?: string
  className?: string
}

/**
 * TopSellingProducts Component
 * 
 * A product grid section displaying top-selling products in a horizontal scrollable layout.
 * Features:
 * - Horizontal scrollable row layout
 * - Compact product tiles with small images
 * - Price display with original price and discounts
 * - Compare button functionality
 * - Responsive design
 * - Easy product management through data file
 * 
 * @example
 * ```tsx
 * <TopSellingProducts 
 *   title="Top selling products"
 *   products={products}
 *   showAllLink="/top-selling-products/collection?collection=3"
 * />
 * ```
 */
export default function TopSellingProducts({
  title = "Top selling products",
  products = topSellingProducts,
  showAllLink = "/top-selling-products/collection?collection=3",
  className = ""
}: TopSellingProductsProps) {
  return (
    <section className={`area home-section grid-product-wrapper ${className}`}>
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex sided title mb-6">
          <h4 className="text-2xl font-bold text-gray-800">{title}</h4>
          <Link href={showAllLink} className="link text-gray-600 hover:text-purple-600 font-medium underline">
            Show all
          </Link>
        </div>

        {/* Products Grid - Horizontal Scrollable */}
        <div className="search-product-tile">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={product.href} 
              className="page-link center-text item"
            >
              <div className="item-inner">
                <div className="img-container">
                  <div className="img-wrapper">
                    <Image
                      src={product.image}
                      alt={product.altText}
                      title={product.name}
                      height={50}
                      width={50}
                      style={{ opacity: 1 }}
                    />
                  </div>
                </div>
                <div className="title-wrap">
                  <h5 className="ellipsis ellipsis-1 mb-5">
                    {product.name}
                  </h5>
                  <div className="pos-rel flex start">
                    <h5>
                      {product.originalPrice && product.originalPrice > product.price ? (
                        <>
                          <span className="strike-through">
                            <span>${product.originalPrice}</span>
                          </span>
                          <span className="f-12">
                            <span>${product.price}</span>
                          </span>
                        </>
                      ) : (
                        <span className="f-12">
                          <span>${product.price}</span>
                        </span>
                      )}
                    </h5>
                    {product.discount && (
                      <span className="discount ml-10">
                        -{product.discount}%
                      </span>
                    )}
                    <button 
                      aria-label="submit" 
                      className="compare-btn" 
                      title="Compare"
                      onClick={(e) => {
                        e.preventDefault()
                        // Add compare functionality here
                      }}
                    >
                      <i className="icon reload-icon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 