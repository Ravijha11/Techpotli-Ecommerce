import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "../../hooks/useTranslation"

export default function PromoBanners() {
  const { t } = useTranslation()
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 space-y-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{t('product.freeShipping')}</h3>
            <p className="text-blue-100 mb-4">
              {t('common.shopNowMessage')}
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {t('home.hero.cta')}
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full opacity-20">
            <Image
              src="https://placehold.co/300x200/4F46E5/FFFFFF?text=Free+Shipping"
              alt="Free Shipping"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Extended Warranty Available</h3>
            <p className="text-green-100 mb-4">
              Protect your purchase with our comprehensive warranty plans starting from just ₹99
            </p>
            <Link
              href="/warranty"
              className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-64 h-full opacity-20">
            <Image
              src="https://placehold.co/300x200/059669/FFFFFF?text=Warranty"
              alt="Extended Warranty"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
