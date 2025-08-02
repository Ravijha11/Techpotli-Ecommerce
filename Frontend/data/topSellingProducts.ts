export interface TopSellingProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  href: string
  altText: string
}

export const topSellingProducts: TopSellingProduct[] = [
  {
    id: "88630116",
    name: "Women's Floral Tunic Tops Casual Blouse V Neck Short Sleeve Buttons Up T-Shirts",
    price: 81,
    originalPrice: 100,
    discount: 19,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-6-1.webp",
    href: "/womens-floral-tunic-tops-casual-blouse-v-neck-short-sleeve-buttons-up-t-shirts/product/88630116",
    altText: "Women's Floral Tunic Tops Casual Blouse V Neck Short Sleeve Buttons Up T-Shirts"
  },
  {
    id: "88630131",
    name: "Image Skincare The Max Stem Cell Facial Cleanser, 4 Fl Oz",
    price: 101,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-21-1.webp",
    href: "/image-skincare-the-max-stem-cell-facial-cleanser-4-fl-oz/product/88630131",
    altText: "Image Skincare The Max Stem Cell Facial Cleanser, 4 Fl Oz"
  },
  {
    id: "88630122",
    name: "PUMA Kids' 6 Pack Low Cut Socks",
    price: 87,
    originalPrice: 100,
    discount: 13,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-12-1.webp",
    href: "/puma-kids-6-pack-low-cut-socks/product/88630122",
    altText: "PUMA Kids' 6 Pack Low Cut Socks"
  },
  {
    id: "88630113",
    name: "Andongnywell Casual Solid Color Ruffle Collar Long Sleeve Ruffle Shirt Blouse V Neck Short Sleeve Shirt Top",
    price: 78,
    originalPrice: 100,
    discount: 22,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-3-1.webp",
    href: "/andongnywell-casual-solid-color-ruffle-collar-long-sleeve-ruffle-shirt-blouse-v-neck-short-sleeve-shirt-top/product/88630113",
    altText: "Andongnywell Casual Solid Color Ruffle Collar Long Sleeve Ruffle Shirt Blouse V Neck Short Sleeve Shirt Top"
  },
  {
    id: "88630137",
    name: "Legendary Whitetails Men's Journeyman Shirt Jacket",
    price: 107,
    originalPrice: 160,
    discount: 34,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-27-1.webp",
    href: "/legendary-whitetails-mens-journeyman-shirt-jacket/product/88630137",
    altText: "Legendary Whitetails Men's Journeyman Shirt Jacket"
  },
  {
    id: "88630128",
    name: "Jet Set Hydration Kit, Travel Friendly Skincare Set, Cleanser, Balm, Moisturizer, Eye Cream & Night Cream",
    price: 93,
    originalPrice: 100,
    discount: 7,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-18-1.webp",
    href: "/jet-set-hydration-kit-travel-friendly-skincare-set-cleanser-balm-moisturizer-eye-cream-night-cream/product/88630128",
    altText: "Jet Set Hydration Kit, Travel Friendly Skincare Set, Cleanser, Balm, Moisturizer, Eye Cream & Night Cream"
  },
  {
    id: "88630119",
    name: "Simple Flavor Women's Floral Vintage Dress Elegant Midi Evening Dress 3/4 Sleeves",
    price: 84,
    originalPrice: 100,
    discount: 16,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-9-1.webp",
    href: "/simple-flavor-womens-floral-vintage-dress-elegant-midi-evening-dress-34-sleeves/product/88630119",
    altText: "Simple Flavor Women's Floral Vintage Dress Elegant Midi Evening Dress 3/4 Sleeves"
  },
  {
    id: "88630134",
    name: "Anna by Anuschka Satchel Handbag | Genuine Leather",
    price: 104,
    originalPrice: 170,
    discount: 39,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-24-1.webp",
    href: "/anna-by-anuschka-satchel-handbag-genuine-leather/product/88630134",
    altText: "Anna by Anuschka Satchel Handbag | Genuine Leather"
  },
  {
    id: "88630125",
    name: "Women's Regrowth Kit Plus: Shampoo, Conditioner, 2% Minoxidil, Leave-In Foamer. Anti Hair Loss and Thinning Hair Solution for Women, 1 Month",
    price: 90,
    originalPrice: 100,
    discount: 10,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-15-1.webp",
    href: "/womens-regrowth-kit-plus-shampoo-conditioner-2-minoxidil-leave-in-foamer-anti-hair-loss-and-thinning-hair-solution-for-women-1-month/product/88630125",
    altText: "Women's Regrowth Kit Plus: Shampoo, Conditioner, 2% Minoxidil, Leave-In Foamer. Anti Hair Loss and Thinning Hair Solution for Women, 1 Month"
  }
]

/**
 * Get products by category
 */
export function getTopSellingByCategory(category: string): TopSellingProduct[] {
  return topSellingProducts.filter(product => 
    product.name.toLowerCase().includes(category.toLowerCase())
  )
}

/**
 * Get products with discount
 */
export function getDiscountedProducts(): TopSellingProduct[] {
  return topSellingProducts.filter(product => product.discount && product.discount > 0)
}

/**
 * Get products by price range
 */
export function getProductsByPriceRange(min: number, max: number): TopSellingProduct[] {
  return topSellingProducts.filter(product => 
    product.price >= min && product.price <= max
  )
} 