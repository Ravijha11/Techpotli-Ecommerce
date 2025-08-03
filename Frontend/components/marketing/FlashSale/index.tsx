"use client"

import SaleTimer from "./SaleTimer"
import SaleProducts from "./SaleProducts"
import { useTranslation } from "../../../hooks/useTranslation"

const flashSaleProducts = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    price: 2999,
    originalPrice: 4999,
    discount: 40,
    image: "https://placehold.co/250x250/333/FFF?text=Earbuds",
    stock: 15,
  },
  {
    id: "2",
    name: "Smart Watch Series 8",
    price: 12999,
    originalPrice: 18999,
    discount: 32,
    image: "https://placehold.co/250x250/333/FFF?text=Smart+Watch",
    stock: 8,
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 1999,
    originalPrice: 3499,
    discount: 43,
    image: "https://placehold.co/250x250/333/FFF?text=Speaker",
    stock: 22,
  },
  {
    id: "4",
    name: "Gaming Mouse RGB",
    price: 1499,
    originalPrice: 2499,
    discount: 40,
    image: "https://placehold.co/250x250/333/FFF?text=Gaming+Mouse",
    stock: 12,
  },
  {
    id: "5",
    name: "USB-C Hub 7-in-1",
    price: 2499,
    originalPrice: 3999,
    discount: 38,
    image: "https://placehold.co/250x250/333/FFF?text=USB+Hub",
    stock: 18,
  },
  {
    id: "6",
    name: "Wireless Charger Pad",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: "https://placehold.co/250x250/333/FFF?text=Charger",
    stock: 25,
  },
]

export default function FlashSale() {
  const { t } = useTranslation()
  
  return (
    <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">⚡ {t('home.flashSale.title')}</h2>
            <p className="text-gray-600">{t('home.flashSale.endingSoon')}</p>
          </div>
          <SaleTimer className="mt-4 md:mt-0" />
        </div>

        <SaleProducts products={flashSaleProducts} />
      </div>
    </section>
  )
} 