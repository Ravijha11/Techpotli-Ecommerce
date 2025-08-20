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

// Extended products array with more variety for 6 rows (36 products total)
const extendedProducts: Product[] = [
  // Original products (first 16)
  {
    id: "1",
    name: "Stride Rite Unisex-Child Made2play Xander Athletic Sneaker",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 4,
    reviews: 8,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-48-1.webp",
    badge: "New",
    href: "/product/1"
  },
  {
    id: "2",
    name: "Self Retractable ID Badge Holder Key Reel",
    price: 105,
    originalPrice: 200,
    discount: 48,
    rating: 4,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-25-1.webp",
    href: "/product/2"
  },
  {
    id: "3",
    name: "Herschel Classic Backpack, Ash Rose",
    price: 118,
    rating: 4,
    reviews: 5,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-38-1.webp",
    badge: "Trending",
    href: "/product/3"
  },
  {
    id: "4",
    name: "Women's Floral Tunic Tops Casual Blouse",
    price: 81,
    originalPrice: 100,
    discount: 19,
    rating: 3,
    reviews: 1,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-6-1.webp",
    href: "/product/4"
  },
  {
    id: "5",
    name: "Magic Skin-renewing Microdermabrasion Scrub",
    price: 99,
    originalPrice: 100,
    discount: 1,
    rating: 5,
    reviews: 5,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-19-1.webp",
    href: "/product/5"
  },
  {
    id: "6",
    name: "Solo New York Region Laptop Backpack",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 4,
    reviews: 3,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-42-1.webp",
    href: "/product/6"
  },
  {
    id: "7",
    name: "Carhartt Men's Thermal Lined Duck Active Jacket",
    price: 112,
    originalPrice: 190,
    discount: 42,
    rating: 4,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-32-1.webp",
    href: "/product/7"
  },
  {
    id: "8",
    name: "3 Pairs Triple Stripe Over the Knee Socks",
    price: 88,
    originalPrice: 100,
    discount: 12,
    rating: 5,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-13-1.webp",
    href: "/product/8"
  },
  {
    id: "9",
    name: "PUMA Women's Carina Sneaker",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 4,
    reviews: 6,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-49-1.webp",
    href: "/product/9"
  },
  {
    id: "10",
    name: "Airanes Anti Fog Safety Glasses",
    price: 106,
    originalPrice: 170,
    discount: 38,
    rating: 3,
    reviews: 3,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-26-1.webp",
    href: "/product/10"
  },
  {
    id: "11",
    name: "Vera Bradley Women's Cotton Campus Backpack",
    price: 119,
    rating: 5,
    reviews: 4,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-39-1.webp",
    href: "/product/11"
  },
  {
    id: "12",
    name: "Andongnywell Women's Casual Tops Leopard Print",
    price: 82,
    originalPrice: 100,
    discount: 18,
    rating: 4,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-7-1.webp",
    href: "/product/12"
  },
  {
    id: "13",
    name: "Daily Hydrating Duo Skin Care Starter Kit",
    price: 100,
    rating: 5,
    reviews: 4,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-20-1.webp",
    badge: "New",
    href: "/product/13"
  },
  {
    id: "14",
    name: "Laptop Backpack for Women Work Backpack",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 4,
    reviews: 7,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-43-1.webp",
    badge: "Featured",
    href: "/product/14"
  },
  {
    id: "15",
    name: "Columbia Men's Powder Lite Jacket",
    price: 113,
    originalPrice: 200,
    discount: 44,
    rating: 3,
    reviews: 1,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-33-1.webp",
    href: "/product/15"
  },
  {
    id: "16",
    name: "Women's Casual Long Sleeve Lapel Zipper Sweatshirt",
    price: 76,
    originalPrice: 130,
    discount: 42,
    rating: 4,
    reviews: 5,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-1-1.webp",
    badge: "New",
    href: "/product/16"
  },
  
  // Additional products to reach 6 rows (24 products total)
  {
    id: "17",
    name: "Wireless Bluetooth Earbuds with Charging Case",
    price: 89,
    originalPrice: 120,
    discount: 26,
    rating: 4,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/17"
  },
  {
    id: "18",
    name: "Smart Fitness Watch with Heart Rate Monitor",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 5,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/18"
  },
  {
    id: "19",
    name: "Portable Bluetooth Speaker Waterproof",
    price: 79,
    originalPrice: 99,
    discount: 20,
    rating: 4,
    reviews: 12,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    href: "/product/19"
  },
  {
    id: "20",
    name: "Gaming Mouse RGB with Adjustable DPI",
    price: 65,
    originalPrice: 89,
    discount: 27,
    rating: 4,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/20"
  },
  {
    id: "21",
    name: "Mechanical Keyboard with Blue Switches",
    price: 129,
    originalPrice: 159,
    discount: 19,
    rating: 5,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
    href: "/product/21"
  },
  {
    id: "22",
    name: "4K Webcam with Built-in Microphone",
    price: 89,
    originalPrice: 129,
    discount: 31,
    rating: 4,
    reviews: 22,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/22"
  },
  {
    id: "23",
    name: "Wireless Charging Pad Fast Charging",
    price: 45,
    originalPrice: 69,
    discount: 35,
    rating: 4,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=300&h=300&fit=crop",
    href: "/product/23"
  },
  {
    id: "24",
    name: "USB-C Hub with Multiple Ports",
    price: 39,
    originalPrice: 59,
    discount: 34,
    rating: 4,
    reviews: 16,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/24"
  },
  
  // Additional products for longer engagement (36 products total - 6 rows of 6)
  {
    id: "25",
    name: "Wireless Gaming Headset with Noise Cancellation",
    price: 129,
    originalPrice: 179,
    discount: 28,
    rating: 4,
    reviews: 25,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/25"
  },
  {
    id: "26",
    name: "Smart Home Security Camera 1080p",
    price: 89,
    originalPrice: 129,
    discount: 31,
    rating: 4,
    reviews: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    href: "/product/26"
  },
  {
    id: "27",
    name: "Portable Power Bank 20000mAh Fast Charging",
    price: 69,
    originalPrice: 99,
    discount: 30,
    rating: 4,
    reviews: 32,
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/27"
  },
  {
    id: "28",
    name: "Ergonomic Office Chair with Lumbar Support",
    price: 199,
    originalPrice: 299,
    discount: 33,
    rating: 5,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
    href: "/product/28"
  },
  {
    id: "29",
    name: "Smart LED Strip Lights with App Control",
    price: 49,
    originalPrice: 79,
    discount: 38,
    rating: 4,
    reviews: 21,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/29"
  },
  {
    id: "30",
    name: "Professional Coffee Maker with Grinder",
    price: 159,
    originalPrice: 229,
    discount: 31,
    rating: 5,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop",
    href: "/product/30"
  },
  {
    id: "31",
    name: "Wireless Car Charger Mount for Phone",
    price: 35,
    originalPrice: 59,
    discount: 41,
    rating: 4,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=300&h=300&fit=crop",
    href: "/product/31"
  },
  {
    id: "32",
    name: "Smart Door Lock with Fingerprint & Keypad",
    price: 129,
    originalPrice: 189,
    discount: 32,
    rating: 4,
    reviews: 26,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    badge: "Featured",
    href: "/product/32"
  },
  {
    id: "33",
    name: "Portable Projector 1080p Home Theater",
    price: 299,
    originalPrice: 449,
    discount: 33,
    rating: 4,
    reviews: 41,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop",
    href: "/product/33"
  },
  {
    id: "34",
    name: "Smart Refrigerator with Touch Screen",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    rating: 5,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=300&h=300&fit=crop",
    badge: "Trending",
    href: "/product/34"
  },
  {
    id: "35",
    name: "Wireless Earbuds with Active Noise Cancellation",
    price: 179,
    originalPrice: 249,
    discount: 28,
    rating: 5,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&h=300&fit=crop",
    href: "/product/35"
  },
  {
    id: "36",
    name: "Smart Mirror with Built-in Display",
    price: 399,
    originalPrice: 599,
    discount: 33,
    rating: 4,
    reviews: 23,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    badge: "New",
    href: "/product/36"
  }
]

export default function DailyDiscover() {
  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${
            i <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      )
    }
    return stars
  }

  return (
         <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
       <div className="w-full px-4 sm:px-6 md:px-6 lg:px-8">
         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center sm:text-left">Daily discover</h2>
                     <Link 
             href="/products" 
             className="text-gray-600 hover:text-purple-600 font-medium underline text-center sm:text-left"
           >
             Show all
           </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {extendedProducts.map((product) => (
            <div key={product.id} className="group">
              <Link 
                href={product.href}
                className="block"
                title={product.name}
              >
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                                     {/* Product Image */}
                   <div className="relative h-32 sm:h-40 md:h-48 bg-gray-50 overflow-hidden">
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
                   <div className="p-2 sm:p-3 md:p-4">
                                         <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                       {product.name}
                     </h3>
                    
                                         {/* Rating and Reviews */}
                     <div className="flex items-center mb-2 sm:mb-3">
                       <div className="flex items-center mr-1 sm:mr-2">
                         {renderStars(product.rating)}
                       </div>
                       <span className="text-xs text-gray-500 hidden sm:block">
                         {product.reviews} Reviews
                       </span>
                     </div>
                    
                                         {/* Price */}
                     <div className="flex items-center justify-center space-x-1 sm:space-x-2">
                       {product.originalPrice && product.originalPrice > product.price ? (
                         <>
                           <span className="text-xs sm:text-sm text-gray-500 line-through">
                             ${product.originalPrice}
                           </span>
                           <span className="text-base sm:text-lg font-bold text-gray-900">
                             ${product.price}
                           </span>
                           {product.discount && (
                             <span className="text-xs font-bold text-purple-600 hidden sm:block">
                               -{product.discount}%
                             </span>
                           )}
                         </>
                       ) : (
                         <span className="text-base sm:text-lg font-bold text-gray-900">
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