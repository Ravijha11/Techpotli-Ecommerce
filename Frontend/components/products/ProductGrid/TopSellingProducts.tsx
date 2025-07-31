import ProductGrid from "./index"

const topSellingProducts = [
  {
    id: "1",
    name: "Women's Floral Tunic Tops Casual Blouse ...",
    price: 81,
    originalPrice: 100,
    discount: 19,
    rating: 4,
    reviews: 12,
    image: "https://placehold.co/200x200/FF8C42/FFF?text=Floral+Top",
  },
  {
    id: "2",
    name: "Image Skincare The Max Stem Cell Facial...",
    price: 101,
    originalPrice: null,
    discount: null,
    rating: 5,
    reviews: 8,
    image: "https://placehold.co/200x200/8B4513/FFF?text=Skincare",
  },
  {
    id: "3",
    name: "PUMA Kids' 6 Pack Low Cut Socks",
    price: 87,
    originalPrice: 100,
    discount: 13,
    rating: 4,
    reviews: 15,
    image: "https://placehold.co/200x200/FFD700/333?text=Socks",
  },
  {
    id: "4",
    name: "Andongnywelll Casual Solid Color Ruffle...",
    price: 78,
    originalPrice: 100,
    discount: 22,
    rating: 4,
    reviews: 6,
    image: "https://placehold.co/200x200/8B4513/FFF?text=Bag",
  },
  {
    id: "5",
    name: "Legendary Whitetails Men's Journeyman...",
    price: 107,
    originalPrice: 160,
    discount: 34,
    rating: 5,
    reviews: 9,
    image: "https://placehold.co/200x200/654321/FFF?text=Wallet",
  },
  {
    id: "6",
    name: "Jet Set Hydration Kit, Travel Friendly...",
    price: 93,
    originalPrice: 100,
    discount: 7,
    rating: 4,
    reviews: 11,
    image: "https://placehold.co/200x200/000/FFF?text=Kit",
  },
]

export default function TopSellingProducts() {
  return (
    <ProductGrid 
      title="Top selling products"
      products={topSellingProducts}
      viewAllLink="/products"
    />
  )
} 