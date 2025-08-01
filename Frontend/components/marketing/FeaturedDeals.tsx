"use client"

import Image from "next/image"
import Link from "next/link"

interface FeaturedDeal {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice: number
  discount: number
  image: string
  bgColor: string
  slug: string
}

const featuredDeals: FeaturedDeal[] = [
  {
    id: "1",
    name: "Lasika W-H9015",
    subtitle: "Digital watch for men",
    price: 399,
    originalPrice: 599,
    discount: 40,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-30-1.webp",
    bgColor: "bg-yellow-50",
    slug: "lasika-w-h9015-digital-watch-for-men"
  },
  {
    id: "2",
    name: "Micropack MHP-01",
    subtitle: "3.5mm Headphone",
    price: 299,
    originalPrice: 445,
    discount: 45,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-31-1.webp",
    bgColor: "bg-gray-50",
    slug: "micropack-mhp-01-3-5mm-headphone"
  },
  {
    id: "3",
    name: "Aaj Oil Pull Up Classic",
    subtitle: "Backpack Navy",
    price: 149,
    originalPrice: 175,
    discount: 20,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-32-1.webp",
    bgColor: "bg-blue-50",
    slug: "aaj-oil-pull-up-classic-backpack-navy"
  }
]

export default function FeaturedDeals() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDeals.map((deal) => (
            <div key={deal.id} className={`${deal.bgColor} rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300`}>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1 text-lg">{deal.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{deal.subtitle}</p>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-800">${deal.price}</span>
                  <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                  <span className="text-red-500 font-medium">-{deal.discount}%</span>
                </div>
                <Link 
                  href={`/${deal.slug}/product/${deal.id}`}
                  className="inline-block bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  Get it now →
                </Link>
              </div>
              <div className="w-24 h-24 relative flex-shrink-0">
                <Image 
                  src={deal.image || "/placeholder.jpg"} 
                  alt={deal.name} 
                  fill 
                  className="object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.jpg";
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 