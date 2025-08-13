"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, MessageCircle, Share2, Heart, Truck, Shield, Clock, Minus, Plus } from "lucide-react"
import { Product } from "./products/productsData"

interface ProductDetailProps {
  product: Product
  onClose: () => void
}

// Star Rating Component
const StarRating = ({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1)
  const sizeClasses = size === "sm" ? "w-3 h-3" : "w-4 h-4"
  
  return (
    <div className="flex items-center space-x-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`${sizeClasses} ${
            star <= rating
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )
}

// Countdown Timer Component
const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 494,
    hours: 9,
    minutes: 7,
    seconds: 34
  })

  // This would normally use useEffect for a real countdown
  // For demo purposes, we'll keep it static

  return (
    <div className="text-sm font-mono text-gray-800">
      Ends in {timeLeft.days}:{timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
    </div>
  )
}

// Mock data for recommended products and people who viewed
const recommendedProducts = [
  {
    id: "rec1",
    name: "Tops Knit Shirts Casual Ruffle Short Sleeve Top Round Neck Tunic Tank Tops Tee Blouse for Women",
    price: 77,
    originalPrice: 100,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-2-1.webp",
    rating: 4.2
  },
  {
    id: "rec2",
    name: "Andongnywell Casual Solid Color Ruffle Collar Long Sleeve Ruffle Shirt Blouse V Neck Short Sleeve Shirt Top",
    price: 78,
    originalPrice: 100,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-3-1.webp",
    rating: 4.0
  },
  {
    id: "rec3",
    name: "Women's Waffle Knit Blouse Ballon Long Sleeve Lace Tops Casual Loose T Shirts",
    price: 79,
    originalPrice: 100,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-4-1.webp",
    rating: 4.7
  }
]

const peopleAlsoViewed = [
  {
    id: "view1",
    name: "Amoretu Women Summer Tunic Dress V Neck Casual Loose Flowy Swing Shift Dresses",
    price: 82,
    originalPrice: 100,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-8-1.webp",
    rating: 4.6
  },
  {
    id: "view2",
    name: "Simple Flavor Women's Floral Vintage Dress Elegant Midi Evening Dress 3/4 Sleeves",
    price: 84,
    originalPrice: 100,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-9-1.webp",
    rating: 4.4
  },
  {
    id: "view3",
    name: "BTFBM Women Casual Fall Dresses V Neck Tie Neck Long Sleeve High Waist Dot Ruffle Tiered A Line Solid Swing Mini Dress",
    price: 85,
    originalPrice: 100,
    image: "https://cdn.ishop.cholobangla.com/uploads/thumb-product-10-1.webp",
    rating: 4.2
  }
]

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState(product.size)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "Black")
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Column - Product Images & Details */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center text-sm text-gray-500">
                Roll over image to zoom in
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <StarRating rating={product.rating} size="md" />
                  <span className="text-gray-600">{product.rating} Reviews</span>
                </div>
              </div>

              {/* Shocking Sale Banner */}
              <div className="bg-yellow-400 p-4 rounded-lg flex justify-between items-center">
                <span className="font-bold text-gray-800">SHOCKING SALE</span>
                <CountdownTimer />
              </div>

              {/* Product Specifications */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">In Stock:</span>
                  <span className="text-green-600 font-medium">Yes</span>
                </div>
                {product.bundleDeal && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bundle deal:</span>
                    <span className="font-medium border border-blue-500 text-blue-600 px-2 py-1 rounded text-xs">BOGO</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand:</span>
                  <span className="font-medium underline">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-medium border border-gray-300 px-3 py-1 rounded">{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Refund & warranty:</span>
                  <div className="text-right">
                    <div className="font-medium">Refundable</div>
                    <div className="text-gray-500">Change of mind is not applicable</div>
                    <div className="text-gray-500">100% authentic</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Is Discontinued:</span>
                  <span className="font-medium">No</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product Dimensions:</span>
                  <span className="font-medium">{product.productDimensions}; {product.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Item model number:</span>
                  <span className="font-medium">{product.itemModelNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase Options & Seller Info */}
          <div className="space-y-6">
            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                <span className="text-2xl text-gray-500 line-through">${product.originalPrice}</span>
              </div>
              <div className="text-gray-600">+ ${product.shippingFee} Shipping Fee</div>
            </div>

            {/* Details Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Details</span>
              <ChevronRight className="w-4 h-4" />
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="text-gray-600">Quantity</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={decreaseQuantity}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  aria-label="Decrease quantity"
                  title="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                  aria-label="Increase quantity"
                  title="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Add to cart
              </button>
              <button className="w-full border border-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Buy now
              </button>
            </div>

            {/* Transaction Details */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Secure transaction</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4" />
                <span>Arrives: {product.estimatedArrival}</span>
              </div>
            </div>

            {/* Wishlist & Share */}
            <div className="space-y-3">
              <button className="w-full border border-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Add to wishlist
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Share:</span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-lg font-bold">f</button>
                  <button className="text-blue-400 hover:text-blue-500">🐦</button>
                  <button className="text-red-600 hover:text-red-700 font-bold">P</button>
                </div>
              </div>
            </div>

            {/* Seller Information */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="font-semibold text-gray-800 mb-2">ishop</h3>
              <div className="text-sm text-gray-600 mb-3">Member since: Jun 23, 2025</div>
              <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Visit Store
              </button>
            </div>

            {/* WhatsApp Icon */}
            <div className="fixed bottom-6 right-6 z-20">
              <div className="bg-green-500 text-white p-3 rounded-full shadow-lg">
                <MessageCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="border-t pt-8 px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Customer Reviews */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer reviews</h2>
              
              {/* Overall Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-3xl font-bold text-gray-800">{product.rating} out of 5</div>
                <StarRating rating={product.rating} size="md" />
                <span className="text-gray-600">{product.reviewCount} people reviewed this product</span>
              </div>

              {/* Star Rating Breakdown */}
              <div className="space-y-2 mb-8">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = product.reviews.filter(r => r.rating === stars).length
                  const percentage = product.reviewCount > 0 ? (count / product.reviewCount) * 100 : 0
                  return (
                    <div key={stars} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 w-8">{stars} star</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-24">{percentage.toFixed(2)}% ({count})</span>
                    </div>
                  )
                })}
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4">
                {product.reviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 text-sm">👤</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-semibold text-gray-800">{review.user}</span>
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-sm text-gray-500">
                            {review.time}, {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">
                          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
                        </p>
                        {/* Mock attached images */}
                        <div className="flex space-x-2 mt-3">
                          <div className="w-16 h-16 bg-gray-200 rounded"></div>
                          <div className="w-16 h-16 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - MEGA DEALS Banner */}
            <div>
              <div className="bg-red-600 text-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-4">MEGA DEALS</h3>
                <div className="text-2xl font-bold mb-2">$50 OFF VOUCHER</div>
                <p className="text-lg mb-4">Upto 70% off</p>
                <p className="mb-4">Free shipping | 0% EMI</p>
                <button className="bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                  SHOP NOW
                </button>
                <div className="mt-4">
                  <div className="w-full h-32 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600">Beauty Products</span>
                  </div>
                </div>
                <div className="text-xs mt-2">*Terms & Conditions apply</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended for you Section */}
        <div className="border-t pt-8 px-6 pb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recommended for you</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page 1 of 2</span>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Next
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedProducts.map((recProduct) => (
              <div key={recProduct.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="relative h-32 bg-gray-100 rounded-lg mb-3">
                  <Image
                    src={recProduct.image}
                    alt={recProduct.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2">{recProduct.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <StarRating rating={recProduct.rating} size="sm" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-800">${recProduct.price}</span>
                  <span className="text-sm text-gray-500 line-through">${recProduct.originalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* People who viewed this item also viewed Section */}
        <div className="border-t pt-8 px-6 pb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">People who viewed this item also viewed</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {peopleAlsoViewed.map((viewProduct) => (
              <div key={viewProduct.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="relative h-32 bg-gray-100 rounded-lg mb-3">
                  <Image
                    src={viewProduct.image}
                    alt={viewProduct.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2">{viewProduct.name}</h3>
                <div className="flex items-center space-x-2 mb-2">
                  <StarRating rating={viewProduct.rating} size="sm" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-800">${viewProduct.price}</span>
                  <span className="text-sm text-gray-500 line-through">${viewProduct.originalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-purple-600 text-white p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h3>
          <p className="mb-4">Get our latest update in your email</p>
          <div className="flex max-w-md mx-auto space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800"
            />
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
