import ProductCard from "../ProductCard"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  rating: number
  reviews: number
  image: string
  badge?: string
}

interface ProductGridItemProps {
  product: Product
}

export default function ProductGridItem({ product }: ProductGridItemProps) {
  return (
    <div className="w-full responsive-card">
      <ProductCard product={product} />
    </div>
  )
} 