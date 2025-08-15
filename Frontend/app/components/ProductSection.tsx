import Image from "next/image"
import Link from "next/link"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { useTranslation } from "../../hooks/useTranslation"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  image: string
  badge?: string
  slug: string
}

interface ProductSectionProps {
  title: string
  subtitle: string
  products: Product[]
}

export default function ProductSection({ title, subtitle, products }: ProductSectionProps) {
  const { t } = useTranslation()
  
  return (
    <section className="py-12 bg-white">
      <div className="w-full px-6 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          <Link
            href="/products"
            className="text-orange-500 hover:text-orange-600 font-medium flex items-center space-x-1 min-w-[100px] justify-center"
          >
            <span>{t('home.featuredProducts.viewAll')}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/featured-product/${product.slug || product.id}`} className="block">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 w-full group border border-gray-100">
      {product.badge && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          {product.badge}
        </div>
      )}

      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-500 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.rating})</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              {product.discount && (
                <span className="text-sm text-green-600 font-medium">({product.discount}% off)</span>
              )}
            </>
          )}
        </div>

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center space-x-2">
          <ShoppingCart className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
      </div>
    </Link>
  )
}
