"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight, MessageCircle, Share2, Heart, Truck, Shield, Clock, Minus, Plus } from "lucide-react"
import { Product } from "./products/productsData"
import Footer from "@/components/layout/Footer"

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
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
            <a href="/" className="hover:text-purple-600 transition-colors whitespace-nowrap">Home</a>
            <span className="hidden sm:inline">/</span>
            <a href="/hot-deals" className="hover:text-purple-600 transition-colors whitespace-nowrap">Hot Deals</a>
            <span className="hidden sm:inline">/</span>
            <a href="/" className="hover:text-purple-600 transition-colors whitespace-nowrap">New Year Sale</a>
            <span className="hidden sm:inline">/</span>
            <span className="text-gray-800 font-medium whitespace-nowrap">
              {product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
          {/* Left Column - Product Images & Details */}
          <div className="space-y-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-50 rounded-lg overflow-hidden">
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
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 leading-tight">
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
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">${product.price}</span>
                <span className="text-xl sm:text-2xl text-gray-500 line-through">${product.originalPrice}</span>
              </div>
              <div className="text-gray-600 text-sm sm:text-base">+ ${product.shippingFee} Shipping Fee</div>
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
              <button className="w-full bg-purple-600 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors text-sm sm:text-base">
                Add to cart
              </button>
              <button className="w-full border border-gray-300 text-gray-800 py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base">
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
            <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-20">
              <div className="bg-green-500 text-white p-2 sm:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Customer Reviews Section */}
        <div className="border-t pt-6 sm:pt-8 px-4 sm:px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left - Customer Reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                  Write a Review
                </button>
              </div>
              
              {/* Overall Rating Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 mb-2">{product.rating}</div>
                    <div className="text-sm text-gray-600 mb-2">out of 5</div>
                <StarRating rating={product.rating} size="md" />
              </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-3">{product.reviewCount} people reviewed this product</div>

                    {/* Enhanced Star Rating Breakdown */}
                    <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = product.reviews.filter(r => r.rating === stars).length
                  const percentage = product.reviewCount > 0 ? (count / product.reviewCount) * 100 : 0
                  return (
                          <div key={stars} className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600 w-8">{stars}★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                                className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                            <span className="text-sm text-gray-600 w-20">{percentage.toFixed(0)}%</span>
                            <span className="text-sm text-gray-500 w-12">({count})</span>
                    </div>
                  )
                })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Filters */}
              <div className="flex items-center space-x-2 sm:space-x-4 mb-6 pb-4 border-b overflow-x-auto">
                <button className="text-purple-600 border-b-2 border-purple-600 pb-2 font-medium whitespace-nowrap">All Reviews</button>
                <button className="text-gray-600 hover:text-purple-600 pb-2 whitespace-nowrap">5 Star</button>
                <button className="text-gray-600 hover:text-purple-600 pb-2 whitespace-nowrap">4 Star</button>
                <button className="text-gray-600 hover:text-purple-600 pb-2 whitespace-nowrap">3 Star</button>
                <button className="text-gray-600 hover:text-purple-600 pb-2 whitespace-nowrap">2 Star</button>
                <button className="text-gray-600 hover:text-purple-600 pb-2 whitespace-nowrap">1 Star</button>
              </div>

              {/* Enhanced Individual Reviews */}
              <div className="space-y-6">
                {product.reviews.slice(0, 3).map((review, index) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {review.user.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="font-semibold text-gray-800">{review.user}</span>
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                          <span className="text-sm text-gray-500">
                            {review.time}, {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          {review.comment || "This product exceeded my expectations! The quality is amazing and it fits perfectly. Highly recommend for anyone looking for a great deal."}
                        </p>
                        
                        {/* Review Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">Great Quality</span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Good Fit</span>
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">Fast Delivery</span>
                        </div>
                        
                        {/* Review Images */}
                        <div className="flex space-x-2">
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-xs">📷</span>
                          </div>
                          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-xs">📷</span>
                          </div>
                        </div>
                        
                        {/* Review Actions */}
                        <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-100">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 text-sm">
                            <span>👍</span>
                            <span>Helpful ({Math.floor(Math.random() * 20) + 1})</span>
                          </button>
                          <button className="text-gray-500 hover:text-purple-600 text-sm">Reply</button>
                          <button className="text-gray-500 hover:text-purple-600 text-sm">Report</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Load More Reviews Button */}
                <div className="text-center pt-4">
                  <button className="bg-white border border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors font-medium">
                    Load More Reviews
                  </button>
                </div>
              </div>
            </div>

            {/* Right - Enhanced Sidebar */}
            <div className="space-y-6">
              {/* MEGA DEALS Banner */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg text-center shadow-lg">
                <h3 className="text-xl font-bold mb-4">🔥 MEGA DEALS</h3>
                <div className="text-3xl font-bold mb-2">$50 OFF</div>
                <div className="text-lg mb-2">VOUCHER</div>
                <p className="text-lg mb-4">Upto 70% off</p>
                <p className="mb-4 text-red-100">Free shipping | 0% EMI</p>
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md">
                  SHOP NOW
                </button>
                <div className="mt-4">
                  <div className="w-full h-32 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <span className="text-white font-medium">Beauty Products</span>
                  </div>
                </div>
                <div className="text-xs mt-2 text-red-100">*Terms & Conditions apply</div>
              </div>

              {/* Review Summary Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-4">Review Summary</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Rating</span>
                    <div className="flex items-center space-x-2">
                      <StarRating rating={product.rating} size="sm" />
                      <span className="font-medium">{product.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Reviews</span>
                    <span className="font-medium">{product.reviewCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">5 Star Reviews</span>
                    <span className="font-medium text-green-600">
                      {Math.round((product.reviews.filter(r => r.rating === 5).length / product.reviewCount) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Satisfaction */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-800 mb-4">Customer Satisfaction</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm text-gray-700">98% recommend this product</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm text-gray-700">Fast delivery guarantee</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm text-gray-700">30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm text-gray-700">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended for you Section */}
        <div className="border-t pt-6 sm:pt-8 px-4 sm:px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recommended for you</h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Page 1 of 2</span>
              <button className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Next
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {recommendedProducts.map((recProduct) => (
              <div key={recProduct.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
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
        <div className="border-t pt-6 sm:pt-8 px-4 sm:px-6 pb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">People who viewed this item also viewed</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {peopleAlsoViewed.map((viewProduct) => (
              <div key={viewProduct.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
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

                 {/* Enhanced Newsletter Subscription */}
         <div className="bg-gradient-to-br from-gray-50 via-purple-50 to-blue-50 border-t border-gray-200 p-6 sm:p-8 sm:py-12">
           <div className="max-w-4xl mx-auto text-center">
             {/* Decorative Elements */}
             <div className="flex justify-center mb-6">
               <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
             </div>
             
             {/* Main Content */}
             <div className="space-y-4 mb-8">
               <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                 Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Techpotli</span>
               </h3>
               <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                 Get exclusive deals, new product launches, and insider tips delivered straight to your inbox. 
                 Join thousands of satisfied customers who never miss our best offers!
               </p>
             </div>

             {/* Newsletter Form */}
             <div className="max-w-md mx-auto">
               <div className="flex flex-col sm:flex-row gap-3 p-1 bg-white rounded-xl shadow-lg border border-gray-200">
            <input
              type="email"
                   placeholder="Enter your email address"
                   className="flex-1 px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-lg"
            />
                 <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
              Subscribe
            </button>
               </div>
               
               {/* Trust Indicators */}
               <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-500">
                 <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   <span>No spam, ever</span>
                 </div>
                 <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   <span>Unsubscribe anytime</span>
                 </div>
               </div>
             </div>

             {/* Additional Benefits */}
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
               <div className="text-center">
                 <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                   <span className="text-purple-600 text-xl">🎁</span>
                 </div>
                 <h4 className="font-semibold text-gray-800 mb-2">Exclusive Offers</h4>
                 <p className="text-sm text-gray-600">Get access to member-only deals and discounts</p>
               </div>
               <div className="text-center">
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                   <span className="text-blue-600 text-xl">🚀</span>
                 </div>
                 <h4 className="font-semibold text-gray-800 mb-2">Early Access</h4>
                 <p className="text-sm text-gray-600">Be the first to know about new products and sales</p>
               </div>
               <div className="text-center">
                 <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                   <span className="text-green-600 text-xl">💡</span>
                 </div>
                 <h4 className="font-semibold text-gray-800 mb-2">Pro Tips</h4>
                 <p className="text-sm text-gray-600">Shopping guides and product recommendations</p>
               </div>
          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
