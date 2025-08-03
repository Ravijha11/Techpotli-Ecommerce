import Image from "next/image"
import { useTranslation } from "../../../hooks/useTranslation"

interface FlashSaleProduct {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  stock: number
}

interface SaleProductsProps {
  products: FlashSaleProduct[]
}

export default function SaleProducts({ products }: SaleProductsProps) {
  const { t } = useTranslation()
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 pb-4" style={{ width: "max-content" }}>
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-4 min-w-[250px] relative"
          >
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
            <div className="relative h-40 mb-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg font-bold text-orange-500">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-500 mb-3">{t('product.inStock')}: {product.stock}</div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
              {t('product.addToCart')}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 