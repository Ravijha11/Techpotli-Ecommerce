"use client"

import Image from "next/image"
import Link from "next/link"

interface BannerItem {
  id: string
  title: string
  image: string
  alt: string
  href: string
}

const bannerItems: BannerItem[] = [
  {
    id: "1",
    title: "Voucher",
    image: "https://cdn.ishop.cholobangla.com/uploads/banner-2.webp",
    alt: "Voucher",
    href: "/homesick-new-home-reed-diffuser/product/88630161"
  },
  {
    id: "2",
    title: "Discount",
    image: "https://cdn.ishop.cholobangla.com/uploads/banner-3.webp",
    alt: "Discount",
    href: "/discount/products?banner=3"
  },
  {
    id: "3",
    title: "Black Friday",
    image: "https://cdn.ishop.cholobangla.com/uploads/banner-4.webp",
    alt: "Black friday",
    href: "/black-friday/products?banner=4"
  }
]

export default function ProductBanner() {
  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bannerItems.map((banner) => (
            <Link 
              key={banner.id} 
              href={banner.href}
              className="block banner-wrapper group h-full"
            >
                             <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 bg-gray-100">
                 <Image
                   src={banner.image}
                   alt={banner.alt}
                   fill
                   className="object-contain w-full h-full"
                   onError={(e) => {
                     const target = e.target as HTMLImageElement;
                     target.src = "/placeholder.jpg";
                   }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 