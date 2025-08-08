import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import BrandCard from "./BrandCard"

const brands = [
  { name: "Adidas", logo: "/Adidas Logo.jpg" },
  { name: "Rolex", logo: "/Rolex.jpg" },
  { name: "Gucci", logo: "/Gucci.jpg" },
  { name: "H&M", logo: "/H&M.jpg" },
  { name: "Apple", logo: "/Apple.jpg" },
  { name: "Schnell", logo: "/Schnell.jpg" },
]

export default function FeaturedBrands() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-800">Featured Brands</h2>
            <div className="flex space-x-2">
              <button 
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label="Previous brands"
                title="Previous brands"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button 
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label="Next brands"
                title="Next brands"
              >
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
              <BrandCard key={index} brand={brand} />
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