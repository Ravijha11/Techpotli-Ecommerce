"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./HeroSection.module.css"

const sliderImages = [
  {
    id: 1,
    src: "https://cdn.ishop.cholobangla.com/uploads/slider-1.webp",
    alt: "11.11 SUPER SALE",
    href: "/discover/products?category=sale&home_spm=1"
  },
  {
    id: 2,
    src: "https://cdn.ishop.cholobangla.com/uploads/slider-2.webp",
    alt: "Flash Sale",
    href: "/discover/products?category=flash-sale&home_spm=2"
  },
  {
    id: 3,
    src: "https://cdn.ishop.cholobangla.com/uploads/slider-3.webp",
    alt: "Black Friday",
    href: "/discover/products?category=black-friday&home_spm=3"
  }
]

const promotionalImages = [
  {
    id: 4,
    src: "https://cdn.ishop.cholobangla.com/uploads/slider-4.webp",
    alt: "Backpack for Men",
    href: "/discover/products?category=backpacks&home_spm=4"
  },
  {
    id: 5,
    src: "https://cdn.ishop.cholobangla.com/uploads/slider-5.webp",
    alt: "Puma Stylist Shoes",
    href: "/discover/products?brand=Puma&home_spm=5"
  }
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000) // Auto-slide every 4 seconds

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    setTimeout(() => setIsAutoPlaying(true), 1000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length)
    setTimeout(() => setIsAutoPlaying(true), 1000)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentSlide(index)
    setTimeout(() => setIsAutoPlaying(true), 1000)
  }

  return (
    <section className={`${styles.mainSlider} responsive-hero`}>
      <div className={styles.h100}>
        <div className={`${styles.sliderWrapper} ${styles.hasRight}`}>
          {/* Left Side - Main Slider */}
          <div className={`${styles.left} ${styles.flowHidden}`}>
            <div className={styles.posRel}>
              <div className={`${styles.embla} ${styles.glide} ${styles.sliderWrapper} ${isLoading ? `${styles.opacity0} ${styles.imgLoading}` : ''}`}>
                <div className={styles.emblaViewport}>
                  <ul 
                    className={styles.emblaContainer} 
                    style={{ 
                      transform: `translate3d(-${currentSlide * 100}%, 0px, 0px)` 
                    }}
                  >
                    {sliderImages.map((image, index) => (
                      <li 
                        key={image.id}
                        style={{ 
                          transform: `translate3d(${index * 100}%, 0px, 0px)` 
                        }}
                      >
                        <Link href={image.href} className={`${styles.sliderContent} block`}>
                          <div className={styles.sliderContentInner}>
                            <Image
                              id={`home-hero-${index}`}
                              className={`${styles.fullDimen} ${isLoading ? styles.opacity0 : ''} responsive-image`}
                              alt={image.alt}
                              src={image.src}
                              width={800}
                              height={500}
                              priority={index === 0}
                              style={{ opacity: isLoading ? 0 : 1 }}
                              onError={(e) => {
                                console.error(`Failed to load image: ${image.src}`);
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation Buttons - Hidden on mobile for better UX */}
                <div className={`${styles.emblaButtons} ${styles.glideNav} hidden sm:flex`}>
                  <button 
                    className={`${styles.prevBtn} responsive-button`} 
                    onClick={prevSlide}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className={`m-0 ${styles.icon} arrow-left`} />
                  </button>
                  <button 
                    className={`${styles.nextBtn} responsive-button`} 
                    onClick={nextSlide}
                    aria-label="Next slide"
                  >
                    <ChevronRight className={`m-0 ${styles.icon} arrow-right`} />
                  </button>
                </div>

                {/* Pagination Dots */}
                <div className={`${styles.emblaThumbs} ${styles.thumbWrapper}`}>
                  <div className={styles.emblaThumbsViewport}>
                    <div className={`${styles.emblaThumbsContainer} ${styles.flex} ${styles.start} ${styles.wrap}`}>
                      {sliderImages.map((_, index) => (
                        <span
                          key={index}
                          className={`${styles.emblaThumbsSlide} ${index === currentSlide ? styles.active : ''}`}
                          onClick={() => goToSlide(index)}
                          role="button"
                          tabIndex={0}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Placeholder Image */}
              <Image
                className={`${styles.fullDimen} ${styles.placeholderImg} ${styles.imgLoaded} responsive-image`}
                alt="Slider image"
                src={sliderImages[currentSlide].src}
                width={800}
                height={500}
              />
            </div>
          </div>

          {/* Right Side - Promotional Images */}
          <div className={styles.right}>
            {promotionalImages.map((image) => (
              <Link key={image.id} href={image.href} className={`${styles.imgWrap} block`}>
                <Image
                  src={image.src}
                  width={400}
                  height={250}
                  alt={image.alt}
                  priority={image.id === 4}
                  className="responsive-image"
                  onError={(e) => {
                    console.error(`Failed to load promotional image: ${image.src}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 