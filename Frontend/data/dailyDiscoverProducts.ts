export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  rating: number
  reviews: number
  image: string
  badge?: "New" | "Trending" | "Featured"
  href: string
  category?: string
  tags?: string[]
}

// Sample products data - replace with backend API call
export const dailyDiscoverProducts: Product[] = [
  {
    id: "1",
    name: "Stride Rite Unisex-Child Made2play Xander Athletic Sneaker",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 0,
    reviews: 0,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-48-1.webp",
    badge: "New",
    href: "/stride-rite-unisex-child-made2play-xander-athletic-sneaker/product/88630158",
    category: "Shoes",
    tags: ["athletic", "sneaker", "children"]
  },
  {
    id: "2",
    name: "Self Retractable ID Badge Holder Key Reel, Heavy Duty Metal Body, 30 Inches Steel Cord, Carabiner Key Chain Keychain with Belt Clip, Hold Up to 15 Keys and Tools",
    price: 105,
    originalPrice: 200,
    discount: 48,
    rating: 4,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-25-1.webp",
    href: "/self-retractable-id-badge-holder-key-reel-heavy-duty-metal-body-30-inches-steel-cord-carabiner-key-chain-keychain-with-belt-clip-hold-up-to-15-keys-and-tools/product/88630135",
    category: "Accessories",
    tags: ["keychain", "badge", "retractable"]
  },
  {
    id: "3",
    name: "Herschel Classic Backpack, Ash Rose, Mid-Volume 18.0L",
    price: 118,
    rating: 4,
    reviews: 5,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-38-1.webp",
    badge: "Trending",
    href: "/herschel-classic-backpack-ash-rose-mid-volume-180l/product/88630148",
    category: "Bags",
    tags: ["backpack", "classic", "trending"]
  },
  {
    id: "4",
    name: "Women's Floral Tunic Tops Casual Blouse V Neck Short Sleeve Buttons Up T-Shirts",
    price: 81,
    originalPrice: 100,
    discount: 19,
    rating: 3,
    reviews: 1,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-6-1.webp",
    href: "/womens-floral-tunic-tops-casual-blouse-v-neck-short-sleeve-buttons-up-t-shirts/product/88630116",
    category: "Women's Clothing",
    tags: ["tunic", "blouse", "casual"]
  },
  {
    id: "5",
    name: "Magic | Skin-renewing Microdermabrasion Scrub | Straight-from-the-Spa | Tightens Pores & Brightens Skin | Paraben Free, Cruelty Free",
    price: 99,
    originalPrice: 100,
    discount: 1,
    rating: 5,
    reviews: 5,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-19-1.webp",
    href: "/magic-skin-renewing-microdermabrasion-scrub-straight-from-the-spa-tightens-pores-brightens-skin-paraben-free-cruelty-free/product/88630129",
    category: "Beauty",
    tags: ["skincare", "microdermabrasion", "spa"]
  },
  {
    id: "6",
    name: "Solo New York Region Laptop Backpack, Grey",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 0,
    reviews: 0,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-42-1.webp",
    href: "/solo-new-york-region-laptop-backpack-grey/product/88630152",
    category: "Bags",
    tags: ["laptop", "backpack", "work"]
  },
  {
    id: "7",
    name: "Carhartt Men's Thermal Lined Duck Active Jacket J131 (Regular and Big & Tall Sizes)",
    price: 112,
    originalPrice: 190,
    discount: 42,
    rating: 4,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-32-1.webp",
    href: "/carhartt-mens-thermal-lined-duck-active-jacket-j131-regular-and-big-tall-sizes/product/88630142",
    category: "Men's Clothing",
    tags: ["jacket", "thermal", "workwear"]
  },
  {
    id: "8",
    name: "3 Pairs Triple Stripe Over the Knee Socks Extra Long Opaque Thigh High Stockings",
    price: 88,
    originalPrice: 100,
    discount: 12,
    rating: 5,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-13-1.webp",
    href: "/3-pairs-triple-stripe-over-the-knee-socks-extra-long-opaque-thigh-high-stockings/product/88630123",
    category: "Women's Accessories",
    tags: ["socks", "stockings", "fashion"]
  },
  {
    id: "9",
    name: "PUMA Women's Carina Sneaker",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 0,
    reviews: 0,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-49-1.webp",
    href: "/puma-womens-carina-sneaker/product/88630159",
    category: "Shoes",
    tags: ["sneaker", "puma", "women"]
  },
  {
    id: "10",
    name: "Airanes Anti Fog Safety Glasses for Women Men",
    price: 106,
    originalPrice: 170,
    discount: 38,
    rating: 3,
    reviews: 3,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-26-1.webp",
    href: "/airanes-anti-fog-safety-glasses-for-women-men/product/88630136",
    category: "Safety",
    tags: ["glasses", "safety", "anti-fog"]
  },
  {
    id: "11",
    name: "Vera Bradley Women's Cotton Campus Backpack",
    price: 119,
    rating: 5,
    reviews: 4,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-39-1.webp",
    href: "/vera-bradley-womens-cotton-campus-backpack/product/88630149",
    category: "Bags",
    tags: ["backpack", "campus", "cotton"]
  },
  {
    id: "12",
    name: "Andongnywell Women's Casual Tops Leopard Print T-Shirt Long Sleeve Soft Stretchy Camouflage Blouse Shirts",
    price: 82,
    originalPrice: 100,
    discount: 18,
    rating: 4,
    reviews: 2,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-7-1.webp",
    href: "/andongnywell-womens-casual-tops-leopard-print-t-shirt-long-sleeve-soft-stretchy-camouflage-blouse-shirts/product/88630117",
    category: "Women's Clothing",
    tags: ["tops", "leopard", "casual"]
  },
  {
    id: "13",
    name: "'Daily Hydrating' Duo Skin Care Starter Kit (Bio-Complex Moisturizer and Ferulic Acid + Vitamins C & E) Helps with Fine Lines, Hydration, and Uneven Skin Tone",
    price: 100,
    rating: 5,
    reviews: 4,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-20-1.webp",
    badge: "New",
    href: "/daily-hydrating-duo-skin-care-starter-kit-bio-complex-moisturizer-and-ferulic-acid-vitamins-c-e-helps-with-fine-lines-hydration-and-uneven-skin-tone/product/88630130",
    category: "Beauty",
    tags: ["skincare", "hydrating", "vitamins"]
  },
  {
    id: "14",
    name: "Laptop Backpack for Women Work Backpack Purse Travel Bookbag Nurse School Bag",
    price: 100,
    originalPrice: 110,
    discount: 10,
    rating: 0,
    reviews: 0,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-43-1.webp",
    badge: "Featured",
    href: "/laptop-backpack-for-women-work-backpack-purse-travel-bookbag-nurse-school-bag/product/88630153",
    category: "Bags",
    tags: ["laptop", "work", "travel"]
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
    href: "/columbia-mens-powder-lite-jacket/product/88630143",
    category: "Men's Clothing",
    tags: ["jacket", "columbia", "outdoor"]
  },
  {
    id: "16",
    name: "Women's Casual Long Sleeve Lapel Zipper Sweatshirt Drawstring Loose Pullover Tops",
    price: 76,
    originalPrice: 130,
    discount: 42,
    rating: 4,
    reviews: 5,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-1-1.webp",
    badge: "New",
    href: "/womens-casual-long-sleeve-lapel-zipper-sweatshirt-drawstring-loose-pullover-tops/product/88630111",
    category: "Women's Clothing",
    tags: ["sweatshirt", "casual", "pullover"]
  }
]

/**
 * Get products by category
 * @param category - The category to filter by
 * @returns Product[]
 */
export function getProductsByCategory(category: string): Product[] {
  return dailyDiscoverProducts.filter(product => product.category === category)
}

/**
 * Get products by tag
 * @param tag - The tag to filter by
 * @returns Product[]
 */
export function getProductsByTag(tag: string): Product[] {
  return dailyDiscoverProducts.filter(product => product.tags?.includes(tag))
}

/**
 * Get featured products (with badges)
 * @returns Product[]
 */
export function getFeaturedProducts(): Product[] {
  return dailyDiscoverProducts.filter(product => product.badge)
}

/**
 * Get discounted products
 * @returns Product[]
 */
export function getDiscountedProducts(): Product[] {
  return dailyDiscoverProducts.filter(product => product.discount && product.discount > 0)
}

/**
 * Get products sorted by rating
 * @returns Product[]
 */
export function getTopRatedProducts(): Product[] {
  return [...dailyDiscoverProducts].sort((a, b) => b.rating - a.rating)
}

/**
 * Get products sorted by discount percentage
 * @returns Product[]
 */
export function getBestDeals(): Product[] {
  return [...dailyDiscoverProducts]
    .filter(product => product.discount && product.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
} 