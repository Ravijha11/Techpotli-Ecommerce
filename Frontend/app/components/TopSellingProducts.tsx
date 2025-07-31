import Image from "next/image"
import Link from "next/link"
import { RefreshCw } from "lucide-react"

const topSellingProducts = [
  {
    id: "1",
    name: "Women's Floral Tunic Tops Casual Blouse ...",
    price: 81,
    originalPrice: 100,
    discount: 19,
    image: "https://placehold.co/200x200/FF8C42/FFF?text=Floral+Top",
  },
  {
    id: "2",
    name: "Image Skincare The Max Stem Cell Facial...",
    price: 101,
    originalPrice: null,
    discount: null,
    image: "https://placehold.co/200x200/8B4513/FFF?text=Skincare",
  },
  {
    id: "3",
    name: "PUMA Kids' 6 Pack Low Cut Socks",
    price: 87,
    originalPrice: 100,
    discount: 13,
    image: "https://placehold.co/200x200/FFD700/333?text=Socks",
  },
  {
    id: "4",
    name: "Andongnywelll Casual Solid Color Ruffle...",
    price: 78,
    originalPrice: 100,
    discount: 22,
    image: "https://placehold.co/200x200/8B4513/FFF?text=Bag",
  },
  {
    id: "5",
    name: "Legendary Whitetails Men's Journeyman...",
    price: 107,
    originalPrice: 160,
    discount: 34,
    image: "https://placehold.co/200x200/654321/FFF?text=Wallet",
  },
  {
    id: "6",
    name: "Jet Set Hydration Kit, Travel Friendly...",
    price: 93,
    originalPrice: 100,
    discount: 7,
    image: "https://placehold.co/200x200/000/FFF?text=Kit",
  },
  {
    id: "7",
    name: "Simple Flavor Women's Floral Vintage Dres...",
    price: 84,
    originalPrice: 100,
    discount: 16,
    image: "https://placehold.co/200x200/8B4513/FFF?text=Dress",
  },
  {
    id: "8",
    name: "Anna by Anuschka Satchel Handbag |...",
    price: 104,
    originalPrice: 170,
    discount: 39,
    image: "https://placehold.co/200x200/000/FFF?text=Watch",
  },
  {
    id: "9",
    name: "Women's Regrowth Kit Plus: Shampoo,...",
    price: 90,
    originalPrice: 100,
    discount: 10,
    image: "https://placehold.co/200x200/000/FFF?text=Kit",
  },
]

export default function TopSellingProducts() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top selling products</h2>
          <Link href="/products" className="text-gray-600 hover:text-purple-600 font-medium underline">
            Show all
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topSellingProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center space-x-4 p-4 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                  <span className="text-lg font-bold text-gray-800">${product.price}</span>
                  {product.discount && (
                    <span className="text-sm text-purple-600 font-medium">-{product.discount}%</span>
                  )}
                </div>
              </div>

              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
