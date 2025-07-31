"use client"

import { useState, useEffect } from "react"
import { Banner } from "./types"
import HeroSlide from "./HeroSlide"
import CarouselControls from "./CarouselControls"

const banners: Banner[] = [
  {
    id: 1,
    title: "11.11 SUPER SALE",
    subtitle: "Biggest sale of the year",
    discount: "30",
    description: "ENJOY",
    voucher: "VOUCHER",
    cta: "SHOP NOW",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Wr86eGI7H0xDB1c3SmdYhA1HagpJxS.png",
    bgColor: "bg-gradient-to-r from-pink-200 to-pink-300",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      {banners.map((banner, index) => (
        <HeroSlide
          key={banner.id}
          banner={banner}
          isActive={index === currentSlide}
        />
      ))}

      <CarouselControls
        onPrevious={prevSlide}
        onNext={nextSlide}
        totalSlides={banners.length}
        currentSlide={currentSlide}
        onSlideChange={setCurrentSlide}
      />
    </section>
  )
} 