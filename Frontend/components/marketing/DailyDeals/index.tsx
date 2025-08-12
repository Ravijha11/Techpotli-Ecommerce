import Image from "next/image"
import { Star, RefreshCw } from "lucide-react"

const dailyProducts = [
  {
    id: "1",
    name: "LYANER Women's Tunic Round Neck Ruffle Loos...",
    price: 86,
    originalPrice: 100,
    discount: 14,
    rating: 4,
    reviews: 4,
    image: "https://placehold.co/200x200/DC2626/FFF?text=Apple",
    badge: "New",
  },
  {
    id: "2",
    name: "Solo New York Region Laptop Backpack, Grey",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 0,
    reviews: 0,
    image: "https://placehold.co/200x200/D2691E/FFF?text=Backpack",
  },
  {
    id: "3",
    name: "Anna by Anuschka Satchel Handbag | Genuine...",
    price: 104,
    originalPrice: 170,
    discount: 39,
    rating: 5,
    reviews: 1,
    image: "https://placehold.co/200x200/000/FFF?text=Watch",
  },
  {
    id: "4",
    name: "Carhartt Legacy Deluxe Work Backpack with 17-...",
    price: 117,
    originalPrice: 170,
    discount: 32,
    rating: 5,
    reviews: 4,
    image: "https://placehold.co/200x200/FFD700/333?text=Cheese",
  },
  {
    id: "5",
    name: "Women's Ruffle Sleeve Tops Summer Casual...",
    price: 80,
    originalPrice: 100,
    discount: 20,
    rating: 5,
    reviews: 1,
    image: "https://placehold.co/200x200/000/FFF?text=Shoes",
    badge: "Featured",
  },
  {
    id: "6",
    name: "PUMA Women's Carina Sneaker",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 0,
    reviews: 0,
    image: "https://placehold.co/200x200/D2691E/FFF?text=Almonds",
  },
]

export default function DailyDeals() {
  return (
    <section className="py-8 bg-white">
      <div className="w-full px-6 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Daily discover</h2>
        </div>

        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-4" style={{ width: "max-content" }}>
            {dailyProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 min-w-[220px] relative"
              >
                {product.badge && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium z-10">
                    {product.badge}
                  </div>
                )}

                <div className="absolute top-2 right-2">
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative h-40 mb-4">
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
    </section>
  )
} 