"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  image: string
  badge?: "New" | "Featured" | "Trending"
  href: string
}

const dailyDiscoverProducts: Product[] = [
  {
    id: "1",
    name: "Vagisil Anti-Itch Medicated Feminine Vaginal Wipes...",
    price: 92,
    originalPrice: 100,
    discount: 8,
    rating: 5,
    reviews: 3,
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=300&h=300&fit=crop",
    href: "/product/1"
  },
  {
    id: "2",
    name: "Goodthreads Men's Slim-Fit Long-Sleeve Plaid...",
    price: 110,
    rating: 5,
    reviews: 3,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/2"
  },
  {
    id: "3",
    name: "Non-Stick Sauté Pan, Rapid Noodles Cooker...",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop",
    href: "/product/3"
  },
  {
    id: "4",
    name: "LYANER Women's Tunic Round Neck Ruffle Loos...",
    price: 86,
    originalPrice: 100,
    discount: 14,
    rating: 5,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/4"
  },
  {
    id: "5",
    name: "Anna by Anuschka Satchel Handbag I...",
    price: 104,
    originalPrice: 170,
    discount: 39,
    rating: 5,
    reviews: 1,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop",
    href: "/product/5"
  },
  {
    id: "6",
    name: "Milky Chic Gift Box for New Moms-10 Unique...",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?w=300&h=300&fit=crop",
    href: "/product/6"
  },
  {
    id: "7",
    name: "Carhartt Legacy Deluxe Work Backpack with 17-...",
    price: 117,
    originalPrice: 170,
    discount: 32,
    rating: 5,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    href: "/product/7"
  },
  {
    id: "8",
    name: "Women's Ruffle Sleeve Tops Summer Casual...",
    price: 80,
    originalPrice: 100,
    discount: 20,
    rating: 5,
    reviews: 1,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/8"
  },
  {
    id: "9",
    name: "Jet Set Hydration Kit, Travel Friendly Skincare...",
    price: 93,
    originalPrice: 100,
    discount: 7,
    rating: 5,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/9"
  },
  {
    id: "10",
    name: "Dickies Men's Sanded Duck Sherpa Lined...",
    price: 111,
    rating: 5,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/10"
  },
  {
    id: "11",
    name: "PUMA Kids' 6 Pack Low Cut Socks",
    price: 87,
    originalPrice: 100,
    discount: 13,
    rating: 5,
    reviews: 3,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
    href: "/product/11"
  },
  {
    id: "12",
    name: "Self Retractable ID Badge Holder Key Reel, Heavy...",
    price: 105,
    originalPrice: 200,
    discount: 48,
    rating: 5,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    href: "/product/12"
  },
  {
    id: "13",
    name: "Stride Rite Unisex-Child Made2play Xander...",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/13"
  },
  {
    id: "14",
    name: "Herschel Classic Backpack, Ash Rose, Mi...",
    price: 118,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/14"
  },
  {
    id: "15",
    name: "Women's Floral Tunic Tops Casual Blouse V...",
    price: 81,
    originalPrice: 100,
    discount: 19,
    rating: 5,
    reviews: 1,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
    href: "/product/15"
  },
  {
    id: "16",
    name: "Magic | Skin-renewing Microdermabrasion Scr...",
    price: 99,
    originalPrice: 100,
    discount: 1,
    rating: 5,
    reviews: 5,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    href: "/product/16"
  },
  {
    id: "17",
    name: "Solo New York Region Laptop Backpack, Grey",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    href: "/product/17"
  },
  {
    id: "18",
    name: "Carhartt Men's Thermal Lined Duck Active Jack...",
    price: 112,
    originalPrice: 100,
    discount: 42,
    rating: 5,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
    href: "/product/18"
  },
  {
    id: "19",
    name: "3 Pairs Triple Stripe Over the Knee Socks Extra...",
    price: 88,
    originalPrice: 100,
    discount: 12,
    rating: 5,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=300&h=300&fit=crop",
    href: "/product/19"
  },
  {
    id: "20",
    name: "Airanes Anti Fog Safety Glasses for Women Men",
    price: 106,
    originalPrice: 170,
    discount: 38,
    rating: 5,
    reviews: 3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    href: "/product/20"
  },
  {
    id: "21",
    name: "PUMA Women's Carina Sneaker",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 5,
    reviews: 0,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop",
    href: "/product/21"
  },
  {
    id: "22",
    name: "Vera Bradley Women's Cotton Campus Backpack",
    price: 119,
    rating: 5,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    href: "/product/22"
  },
  {
    id: "23",
    name: "Andongnywell Women's Casual Tops Leopard Pr...",
    price: 82,
    originalPrice: 100,
    discount: 18,
    rating: 5,
    reviews: 2,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
    href: "/product/23"
  },
  {
    id: "24",
    name: "'Daily Hydrating' Duo Skin Care Starter Kit (Bio-...",
    price: 100,
    rating: 5,
    reviews: 4,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/24"
  }
]

export default function DailyDiscover() {
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Daily discover</h2>
          <Link 
            href="/products" 
            className="text-gray-600 hover:text-purple-600 font-medium underline"
          >
            Show all
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {dailyDiscoverProducts.map((product) => (
            <div key={product.id} className="group">
              <Link 
                href={product.href}
                className="block"
                title={product.name}
              >
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-50 overflow-hidden">
                    {product.badge && (
                      <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white z-10 ${
                        product.badge === "New" ? "bg-purple-500" : 
                        product.badge === "Featured" ? "bg-red-500" : "bg-green-500"
                      }`}>
                        {product.badge}
                      </div>
                    )}
                    
                      <Image
                        src={product.image}
                        alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.jpg";
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                      {product.name}
                    </h3>
                    
                    {/* Rating and Reviews */}
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {product.reviews} Reviews
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-center space-x-2">
                        {product.originalPrice && product.originalPrice > product.price ? (
                          <>
                          <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          <span className="text-lg font-bold text-gray-900">
                              ${product.price}
                            </span>
                            {product.discount && (
                            <span className="text-xs font-bold text-purple-600">
                                -{product.discount}%
                              </span>
                            )}
                          </>
                        ) : (
                        <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 