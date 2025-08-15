export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number | null
  discount?: number | null
  image: string
  badge?: string
  slug: string
  rating: number
  reviews: number
  reviewDetails: Array<{
    id: string
    user: string
    rating: number
    comment?: string
    date: string
  }>
}

export const featuredProducts: Product[] = [
  {
    id: "88630111",
    name: "Women's Casual Long Sleeve Lapel Zipper Sweatshirt Drawstring Loose Pullover Tops",
    price: 76,
    originalPrice: 130,
    discount: 42,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-1-1.webp",
    badge: "New",
    slug: "88630111",
    rating: 4.0,
    reviews: 5,
    reviewDetails: [
      { id: "1", user: "Sarah M.", rating: 5, comment: "Perfect fit and great quality!", date: "2024-01-15" },
      { id: "2", user: "Jennifer L.", rating: 4, comment: "Comfortable and stylish", date: "2024-01-10" }
    ]
  },
  {
    id: "88630135",
    name: "Self Retractable ID Badge Holder Key Reel, Heavy Duty Metal Body, 30 Inches Steel Cord, Carabiner Key Chain Keychain with Belt Clip, Hold Up to 15 Keys and Tools",
    price: 105,
    originalPrice: 200,
    discount: 48,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-25-1.webp",
    slug: "88630135",
    rating: 4.0,
    reviews: 2,
    reviewDetails: [
      { id: "3", user: "Mike R.", rating: 5, comment: "Great quality construction", date: "2024-01-12" },
      { id: "4", user: "David K.", rating: 4, comment: "Durable and reliable", date: "2024-01-08" }
    ]
  },
  {
    id: "88630126",
    name: "Nutrafol Women Hair Growth For Thicker, Stronger Hair (4 Capsules Per Day) (1 Month Supply)",
    price: 91,
    originalPrice: 100,
    discount: 9,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-16-1.webp",
    badge: "New",
    slug: "88630126",
        rating: 5.0,
    reviews: 2,
    reviewDetails: [
      { id: "5", user: "Emma S.", rating: 5, comment: "Helped with hair growth", date: "2024-01-14" },
      { id: "6", user: "Lisa M.", rating: 5, comment: "Good results so far", date: "2024-01-09" }
    ]
  },
  {
    id: "88630117",
    name: "Andongnywell Women's Casual Tops Leopard Print T-Shirt Long Sleeve Soft Stretchy Camouflage Blouse Shirts",
    price: 82,
    originalPrice: 100,
    discount: 18,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-7-1.webp",
    slug: "88630117",
    rating: 4.0,
    reviews: 2,
    reviewDetails: [
      { id: "7", user: "Anna B.", rating: 4, comment: "Love the leopard print", date: "2024-01-13" },
      { id: "8", user: "Maria L.", rating: 4, comment: "Comfortable and stylish", date: "2024-01-07" }
    ]
  },
  {
    id: "88630132",
    name: "Sling Bag Canvas Crossbody Backpack Shoulder Travel Bag Casual Daypacks",
    price: 102,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-22-1.webp",
    slug: "88630132",
    rating: 5.0,
    reviews: 2,
    reviewDetails: [
      { id: "9", user: "John D.", rating: 5, comment: "Perfect for travel", date: "2024-01-16" },
      { id: "10", user: "Tom W.", rating: 5, comment: "Good quality canvas", date: "2024-01-11" }
    ]
  },
  {
    id: "88630123",
    name: "3 Pairs Triple Stripe Over the Knee Socks Extra Long Opaque Thigh High Stockings",
    price: 88,
    originalPrice: 100,
    discount: 12,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-13-1.webp",
    slug: "88630123",
    rating: 5.0,
    reviews: 2,
    reviewDetails: [
      { id: "11", user: "Rachel M.", rating: 5, comment: "Comfortable and warm", date: "2024-01-15" },
      { id: "12", user: "Sophie T.", rating: 5, comment: "Great for winter", date: "2024-01-10" }
    ]
  },
  {
    id: "88630114",
    name: "Women's Waffle Knit Blouse Ballon Long Sleeve Lace Tops Casual Loose T Shirts",
    price: 79,
    originalPrice: 100,
    discount: 21,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-4-1.webp",
    slug: "88630114",
    rating: 4.0,
    reviews: 2,
    reviewDetails: [
      { id: "13", user: "Sophie T.", rating: 4, comment: "Beautiful blouse design", date: "2024-01-16" },
      { id: "14", user: "Rachel M.", rating: 4, comment: "Perfect for office wear", date: "2024-01-11" }
    ]
  },
  {
    id: "88630129",
    name: "Magic | Skin-renewing Microdermabrasion Scrub | Straight-from-the-Spa | Tightens Pores & Brightens Skin | Paraben Free, Cruelty Free",
    price: 99,
    originalPrice: 100,
    discount: 1,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-19-1.webp",
    slug: "88630129",
    rating: 5.0,
    reviews: 5,
    reviewDetails: [
      { id: "15", user: "Elena M.", rating: 5, comment: "Amazing skin results!", date: "2024-01-16" },
      { id: "16", user: "Isabella K.", rating: 5, comment: "Great for skin renewal", date: "2024-01-11" }
    ]
  },
  {
    id: "88630120",
    name: "BTFBM Women Casual Fall Dresses V Neck Tie Neck Long Sleeve High Waist Dot Ruffle Tiered A Line Solid Swing Mini Dress",
    price: 85,
    originalPrice: 100,
    discount: 15,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-10-1.webp",
    slug: "88630120",
    rating: 4.0,
    reviews: 5,
    reviewDetails: [
      { id: "17", user: "Chloe R.", rating: 4, comment: "Beautiful fall dress", date: "2024-01-13" },
      { id: "18", user: "Ava L.", rating: 4, comment: "Great for casual occasions", date: "2024-01-08" }
    ]
  },
] 
 