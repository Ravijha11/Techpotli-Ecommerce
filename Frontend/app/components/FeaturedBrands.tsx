import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const brands = [
  { name: "Adidas", logo: "https://placehold.co/120x80/FFF/333?text=adidas" },
  { name: "Rolex", logo: "https://placehold.co/120x80/FFF/333?text=ROLEX" },
  { name: "Gucci", logo: "https://placehold.co/120x80/FFF/333?text=GUCCI" },
  { name: "H&M", logo: "https://placehold.co/120x80/FFF/E60026?text=H%26M" },
  { name: "Apple", logo: "https://placehold.co/120x80/FFF/333?text=Apple" },
  { name: "Schnell", logo: "https://placehold.co/120x80/FFF/333?text=CHANEL" },
]

export default function FeaturedBrands() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">Featured Brands</h2>
            <div className="flex space-x-2">
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
          <Link href="/brands" className="text-gray-600 hover:text-purple-600 font-medium underline">
            Show all
          </Link>
        </div>

        <div className="flex justify-between">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1 max-w-md">
            {brands.map((brand, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow h-24"
              >
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={80}
                  height={40}
                  className="object-contain mb-2"
                />
                <span className="text-sm font-medium text-gray-700">{brand.name}</span>
              </div>
            ))}
          </div>

          <div className="hidden lg:block bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-8 ml-8 flex-1 max-w-2xl">
            <div className="flex items-center justify-between h-full">
              <div>
                <p className="text-lg text-gray-600 italic mb-4">Choose from</p>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  Thousands of
                  <br />
                  useful products
                </h3>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-0.5 bg-gray-400 mr-4"></div>
                  <span className="text-gray-600">Starting from $45</span>
                </div>
                <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                  Get it Now →
                </button>
              </div>
              <div className="relative w-48 h-32">
                <Image
                  src="https://placehold.co/300x200/F59E0B/FFF?text=Beauty+Products"
                  alt="Beauty Products"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
