import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

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

export default function FeaturedProducts() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured products</h2>
          <Link href="/products" className="text-gray-600 hover:text-purple-600 font-medium underline">
            Show all
          </Link>
        </div>

        <div className="relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div className="overflow-hidden">
            <div className="flex space-x-4 transition-transform duration-300">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-64 bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow relative"
                >
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                      {product.badge}
                    </div>
                  )}

                  <div className="relative h-48 mb-4">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 text-sm">{product.name}</h3>

                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{product.reviews} Reviews</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                    <span className="text-lg font-bold text-gray-800">${product.price}</span>
                    {product.discount && (
                      <span className="text-xs text-purple-600 font-medium">-{product.discount}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
