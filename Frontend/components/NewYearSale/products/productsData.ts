export interface ProductReview {
  id: string
  user: string
  rating: number
  comment: string
  date: string
  time?: string
  productImage?: string
}

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  image: string
  badge?: "New" | "Featured" | "Sale" | "Shocking Sale"
  slug: string
  rating: number
  reviewCount: number
  reviews: ProductReview[]
  brand: string
  size: string
  inStock: boolean
  bundleDeal?: string
  returnPolicy: string
  warranty: string
  inDimensions: boolean
  productDimensions: string
  weight: string
  itemModelNumber: string
  shippingFee: number
  estimatedArrival: string
  secureTransaction: boolean
  category: string
  subcategory: string
  description: string
  features: string[]
  colors?: string[]
  sizes?: string[]
}

export const newYearSaleProducts: Product[] = [
  {
    id: "88630111",
    name: "Women's Casual Long Sleeve Lapel Zipper Sweatshirt Drawstring Loose Pullover Tops",
    price: 76,
    originalPrice: 130,
    discount: 42,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-1-1.webp",
    badge: "Shocking Sale",
    slug: "womens-casual-long-sleeve-lapel-zipper-sweatshirt-drawstring-loose-pullover-tops",
    rating: 4.4,
    reviewCount: 5,
    brand: "Levi's",
    size: "XL",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "3 x 3 x 3 inches",
    weight: "1.76 Ounces",
    itemModelNumber: "251171045",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Tops",
    description: "A comfortable and stylish casual sweatshirt perfect for everyday wear. Features a lapel design with zipper closure and drawstring waist for a customizable fit.",
    features: [
      "Long sleeve design",
      "Lapel collar",
      "Zipper closure",
      "Drawstring waist",
      "Loose fit",
      "Pullover style"
    ],
    colors: ["Black", "Navy", "Gray", "Burgundy"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    reviews: [
      { 
        id: "1", 
        user: "John Doe", 
        rating: 5, 
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
        date: "23 Jun, 25",
        time: "04:39 am",
        productImage: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-1-1.webp"
      },
      { 
        id: "2", 
        user: "Jane Smith", 
        rating: 4, 
        comment: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", 
        date: "22 Jun, 25",
        time: "02:15 pm",
        productImage: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-2-1.webp"
      },
      { 
        id: "3", 
        user: "Mike Johnson", 
        rating: 4, 
        comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", 
        date: "21 Jun, 25",
        time: "11:30 am",
        productImage: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-3-1.webp"
      },
      { 
        id: "4", 
        user: "Sarah Wilson", 
        rating: 5, 
        comment: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
        date: "20 Jun, 25",
        time: "09:45 am",
        productImage: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-4-1.webp"
      },
      { 
        id: "5", 
        user: "David Brown", 
        rating: 4, 
        comment: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.", 
        date: "19 Jun, 25",
        time: "03:20 pm",
        productImage: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-5-1.webp"
      }
    ]
  },
  {
    id: "88630112",
    name: "Tops Knit Shirts Casual Ruffle Short Sleeve Top Round Neck Tunic Tank Tops Tee Blouse for Women",
    price: 77,
    originalPrice: 100,
    discount: 23,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-2-1.webp",
    badge: "Sale",
    slug: "tops-knit-shirts-casual-ruffle-short-sleeve-top-round-neck-tunic-tank-tops-tee-blouse-for-women",
    rating: 4.2,
    reviewCount: 95,
    brand: "Andongnywell",
    size: "M",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "2 x 2 x 2 inches",
    weight: "0.5 Ounces",
    itemModelNumber: "251171046",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Tops",
    description: "A beautiful casual top with ruffle details perfect for summer days. Features a round neck design with short sleeves and a comfortable fit.",
    features: [
      "Short sleeve design",
      "Round neck",
      "Ruffle details",
      "Casual fit",
      "Tunic length",
      "Tank top style"
    ],
    colors: ["White", "Pink", "Blue", "Yellow"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { 
        id: "3", 
        user: "Emma R.", 
        rating: 4, 
        comment: "Beautiful design and comfortable", 
        date: "2024-01-12",
        time: "10:30 am"
      },
      { 
        id: "4", 
        user: "Lisa K.", 
        rating: 5, 
        comment: "Love the ruffle detail!", 
        date: "2024-01-08",
        time: "02:15 pm"
      }
    ]
  },
  {
    id: "88630113",
    name: "Andongnywell Casual Solid Color Ruffle Collar Long Sleeve Ruffle Shirt Blouse V Neck Short Sleeve Shirt Top",
    price: 78,
    originalPrice: 100,
    discount: 22,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-3-1.webp",
    badge: "Sale",
    slug: "andongnywell-casual-solid-color-ruffle-collar-long-sleeve-ruffle-shirt-blouse-v-neck-short-sleeve-shirt-top",
    rating: 4.0,
    reviewCount: 67,
    brand: "Andongnywell",
    size: "L",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "2.5 x 2.5 x 2.5 inches",
    weight: "0.8 Ounces",
    itemModelNumber: "251171047",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Tops",
    description: "An elegant blouse with ruffle collar design. Features both long and short sleeve options with a V-neck style for a sophisticated look.",
    features: [
      "Ruffle collar",
      "V-neck design",
      "Long/short sleeve options",
      "Solid color",
      "Casual style",
      "Blouse fit"
    ],
    colors: ["Black", "White", "Navy", "Red"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    reviews: [
      { 
        id: "5", 
        user: "Maria S.", 
        rating: 4, 
        comment: "Good quality fabric", 
        date: "2024-01-14",
        time: "11:45 am"
      },
      { 
        id: "6", 
        user: "Anna B.", 
        rating: 4, 
        comment: "Fits well and looks great", 
        date: "2024-01-09",
        time: "04:20 pm"
      }
    ]
  },
  {
    id: "88630114",
    name: "Women's Waffle Knit Blouse Ballon Long Sleeve Lace Tops Casual Loose T Shirts",
    price: 79,
    originalPrice: 100,
    discount: 21,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-4-1.webp",
    badge: "Sale",
    slug: "womens-waffle-knit-blouse-ballon-long-sleeve-lace-tops-casual-loose-t-shirts",
    rating: 4.7,
    reviewCount: 156,
    brand: "Andongnywell",
    size: "M",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "2.5 x 2.5 x 2.5 inches",
    weight: "0.9 Ounces",
    itemModelNumber: "251171048",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Tops",
    description: "A beautiful waffle knit blouse with lace details. Features a balloon sleeve design and comfortable loose fit perfect for casual wear.",
    features: [
      "Waffle knit fabric",
      "Balloon sleeves",
      "Lace details",
      "Casual loose fit",
      "Long sleeve design",
      "Comfortable material"
    ],
    colors: ["White", "Beige", "Light Blue", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { 
        id: "7", 
        user: "Sophie T.", 
        rating: 5, 
        comment: "Absolutely love this blouse!", 
        date: "2024-01-16",
        time: "09:30 am"
      },
      { 
        id: "8", 
        user: "Rachel M.", 
        rating: 4, 
        comment: "Perfect for office wear", 
        date: "2024-01-11",
        time: "03:45 pm"
      }
    ]
  },
  {
    id: "88630115",
    name: "Women's Ruffle Sleeve Tops Summer Casual Blouse Crew Neck Solid Cute Tunic Shirt",
    price: 80,
    originalPrice: 100,
    discount: 20,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-5-1.webp",
    badge: "Featured",
    slug: "womens-ruffle-sleeve-tops-summer-casual-blouse-crew-neck-solid-cute-tunic-shirt",
    rating: 4.8,
    reviewCount: 203,
    brand: "Andongnywell",
    size: "L",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "3 x 3 x 3 inches",
    weight: "1.2 Ounces",
    itemModelNumber: "251171049",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Tops",
    description: "A cute summer blouse with ruffle sleeves and crew neck design. Perfect for casual summer days with a comfortable tunic length.",
    features: [
      "Ruffle sleeves",
      "Crew neck",
      "Summer casual",
      "Solid color",
      "Cute design",
      "Tunic length"
    ],
    colors: ["Yellow", "Pink", "Light Green", "White"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    reviews: [
      { 
        id: "9", 
        user: "Jessica L.", 
        rating: 5, 
        comment: "Featured product for a reason!", 
        date: "2024-01-17",
        time: "11:20 am"
      },
      { 
        id: "10", 
        user: "Amanda K.", 
        rating: 5, 
        comment: "Best purchase this year", 
        date: "2024-01-13",
        time: "02:15 pm"
      }
    ]
  },
  {
    id: "88630116",
    name: "Women's Floral Tunic Tops Casual Blouse V Neck Short Sleeve Buttons Up T-Shirts",
    price: 81,
    originalPrice: 100,
    discount: 19,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-6-1.webp",
    badge: "Sale",
    slug: "womens-floral-tunic-tops-casual-blouse-v-neck-short-sleeve-buttons-up-t-shirts",
    rating: 4.3,
    reviewCount: 89,
    brand: "Andongnywell",
    size: "M",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "2.8 x 2.8 x 2.8 inches",
    weight: "1.0 Ounces",
    itemModelNumber: "251171050",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Tops",
    description: "A beautiful floral tunic top with V-neck design and button-up front. Perfect for casual summer days with a comfortable fit.",
    features: [
      "Floral pattern",
      "V-neck design",
      "Short sleeves",
      "Button-up front",
      "Tunic length",
      "Casual style"
    ],
    colors: ["Blue Floral", "Pink Floral", "Green Floral", "Purple Floral"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { 
        id: "11", 
        user: "Natalie P.", 
        rating: 4, 
        comment: "Beautiful floral pattern", 
        date: "2024-01-15",
        time: "10:45 am"
      },
      { 
        id: "12", 
        user: "Victoria R.", 
        rating: 5, 
        comment: "Great for summer days", 
        date: "2024-01-10",
        time: "04:30 pm"
      }
    ]
  },
  {
    id: "88630117",
    name: "Andongnywell Women's Casual Tops Leopard Print T-Shirt Long Sleeve Soft Stretchy Camouflage Blouse Shirts",
    price: 82,
    originalPrice: 100,
    discount: 18,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-7-1.webp",
    badge: "Sale",
    slug: "andongnywell-womens-casual-tops-leopard-print-t-shirt-long-sleeve-soft-stretchy-camouflage-blouse-shirts",
    rating: 4.1,
    reviewCount: 73,
    brand: "Andongnywell",
    size: "L",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "3.2 x 3.2 x 3.2 inches",
    weight: "1.4 Ounces",
    itemModelNumber: "251171051",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Tops",
    description: "A stylish leopard print top with long sleeves and soft stretchy fabric. Features a camouflage-inspired design perfect for casual wear.",
    features: [
      "Leopard print",
      "Long sleeves",
      "Soft stretchy fabric",
      "Camouflage design",
      "Casual style",
      "Comfortable fit"
    ],
    colors: ["Leopard Print", "Black Leopard", "Brown Leopard"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    reviews: [
      { 
        id: "13", 
        user: "Michelle W.", 
        rating: 4, 
        comment: "Love the leopard print", 
        date: "2024-01-12",
        time: "01:15 pm"
      },
      { 
        id: "14", 
        user: "Diana L.", 
        rating: 4, 
        comment: "Comfortable and stylish", 
        date: "2024-01-08",
        time: "05:45 pm"
      }
    ]
  },
  {
    id: "88630118",
    name: "Amoretu Women Summer Tunic Dress V Neck Casual Loose Flowy Swing Shift Dresses",
    price: 83,
    originalPrice: 100,
    discount: 17,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-8-1.webp",
    badge: "Sale",
    slug: "amoretu-women-summer-tunic-dress-v-neck-casual-loose-flowy-swing-shift-dresses",
    rating: 4.6,
    reviewCount: 134,
    brand: "Amoretu",
    size: "M",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "4 x 4 x 4 inches",
    weight: "2.1 Ounces",
    itemModelNumber: "251171052",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Dresses",
    description: "A beautiful summer tunic dress with V-neck design and flowy swing style. Perfect for casual summer events with a comfortable loose fit.",
    features: [
      "V-neck design",
      "Casual loose fit",
      "Flowy swing style",
      "Shift dress",
      "Summer fabric",
      "Comfortable length"
    ],
    colors: ["Blue", "Pink", "Yellow", "White"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { 
        id: "15", 
        user: "Elena M.", 
        rating: 5, 
        comment: "Perfect flowy dress!", 
        date: "2024-01-16",
        time: "12:30 pm"
      },
      { 
        id: "16", 
        user: "Isabella K.", 
        rating: 4, 
        comment: "Great for summer events", 
        date: "2024-01-11",
        time: "06:20 pm"
      }
    ]
  },
  {
    id: "88630119",
    name: "Simple Flavor Women's Floral Vintage Dress Elegant Midi Evening Dress 3/4 Sleeves",
    price: 84,
    originalPrice: 100,
    discount: 16,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-9-1.webp",
    badge: "Sale",
    slug: "simple-flavor-womens-floral-vintage-dress-elegant-midi-evening-dress-34-sleeves",
    rating: 4.4,
    reviewCount: 112,
    brand: "Simple Flavor",
    size: "L",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "4.5 x 4.5 x 4.5 inches",
    weight: "2.8 Ounces",
    itemModelNumber: "251171053",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Dresses",
    description: "An elegant vintage floral dress with 3/4 sleeves and midi length. Perfect for evening events with a sophisticated vintage style.",
    features: [
      "Floral vintage design",
      "Elegant style",
      "Midi length",
      "3/4 sleeves",
      "Evening dress",
      "Sophisticated look"
    ],
    colors: ["Vintage Blue", "Vintage Pink", "Vintage Green", "Vintage Purple"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    reviews: [
      { 
        id: "17", 
        user: "Olivia T.", 
        rating: 5, 
        comment: "Elegant vintage style", 
        date: "2024-01-14",
        time: "08:45 am"
      },
      { 
        id: "18", 
        user: "Grace M.", 
        rating: 4, 
        comment: "Perfect for evening events", 
        date: "2024-01-09",
        time: "07:30 pm"
      }
    ]
  },
  {
    id: "88630120",
    name: "BTFBM Women Casual Fall Dresses V Neck Tie Neck Long Sleeve High Waist Dot Ruffle Tiered A Line Solid Swing Mini Dress",
    price: 85,
    originalPrice: 100,
    discount: 15,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-10-1.webp",
    badge: "Sale",
    slug: "btfbm-women-casual-fall-dresses-v-neck-tie-neck-long-sleeve-high-waist-dot-ruffle-tiered-a-line-solid-swing-mini-dress",
    rating: 4.2,
    reviewCount: 98,
    brand: "BTFBM",
    size: "M",
    inStock: true,
    bundleDeal: "BOGO",
    returnPolicy: "Not refundable, Change of mind is not applicable",
    warranty: "100% authentic",
    inDimensions: false,
    productDimensions: "4.2 x 4.2 x 4.2 inches",
    weight: "2.5 Ounces",
    itemModelNumber: "251171054",
    shippingFee: 10,
    estimatedArrival: "Saturday, Aug 18",
    secureTransaction: true,
    category: "Women Apparel",
    subcategory: "Dresses",
    description: "A beautiful fall dress with V-neck design, tie neck details, and tiered A-line style. Features dot ruffle accents and high waist design.",
    features: [
      "V-neck design",
      "Tie neck details",
      "Long sleeves",
      "High waist",
      "Dot ruffle accents",
      "Tiered A-line style"
    ],
    colors: ["Navy", "Burgundy", "Olive", "Charcoal"],
    sizes: ["XS", "S", "M", "L", "XL"],
    reviews: [
      { 
        id: "19", 
        user: "Chloe R.", 
        rating: 4, 
        comment: "Beautiful fall dress", 
        date: "2024-01-13",
        time: "03:15 pm"
      },
      { 
        id: "20", 
        user: "Ava L.", 
        rating: 4, 
        comment: "Great for casual occasions", 
        date: "2024-01-08",
        time: "09:45 am"
      }
    ]
  }
]
