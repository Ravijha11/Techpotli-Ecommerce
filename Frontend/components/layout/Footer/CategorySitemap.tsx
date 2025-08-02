import Link from "next/link"
import { ChevronRight, Grid3X3, ShoppingBag, Users, Home, Heart, Utensils, Plane, Gem, Briefcase } from "lucide-react"

// Separate data layer for easy backend integration
const categoryData = {
  categories: [
    {
      id: "toys-kids",
      name: "Toys, Kids & Babies",
      href: "/all/toys-kids-babies",
      icon: "👶",
      color: "bg-blue-50 border-blue-200",
      subcategories: [
        { id: "bath-baby", name: "Bath & Baby Care", href: "/all/bath--baby-care" },
        { id: "maternity", name: "Maternity Care", href: "/all/maternity-care" },
        { id: "kids-furniture", name: "Kid's Furniture", href: "/all/kids-furniture" },
      ]
    },
    {
      id: "mens-shoes",
      name: "Men's Shoes",
      href: "/all/mens-shoes",
      icon: "👞",
      color: "bg-gray-50 border-gray-200",
      subcategories: [
        { id: "formal-shoes", name: "Formal Shoes", href: "/all/formal-shoes" },
        { id: "sandals", name: "Sandals & Flip-Flops", href: "/all/sandals--flip-flops" },
        { id: "sneakers", name: "Sneakers", href: "/all/sneakers" },
      ]
    },
    {
      id: "home-appliances",
      name: "Home Appliances",
      href: "/all/home-appliances",
      icon: "🏠",
      color: "bg-green-50 border-green-200",
      subcategories: [
        { id: "housekeeping", name: "Housekeeping", href: "/all/housekeeping" },
        { id: "tv-accessories", name: "TV Accessories", href: "/all/tv-accessories" },
        { id: "kitchen-appliances", name: "Small Kitchen Appliances", href: "/all/small-kitchen-appliances" },
      ]
    },
    {
      id: "mens-wear",
      name: "Men's Wear",
      href: "/all/mens-wear",
      icon: "👔",
      color: "bg-indigo-50 border-indigo-200",
      subcategories: [
        { id: "pants", name: "Pants", href: "/all/pants" },
        { id: "crossbody-bags", name: "Crossbody & Shoulder Bags", href: "/all/crossbody--shoulder-bags" },
        { id: "shirts", name: "Shirts", href: "/all/shirts" },
        { id: "jackets", name: "Jackets & Coats", href: "/all/jackets--coats" },
        { id: "mens-wallet", name: "Men's Wallet", href: "/all/mens-wallet" },
        { id: "backpacks", name: "Backpacks", href: "/all/backpacks" },
      ]
    },
    {
      id: "mens-bags",
      name: "Men's Bags",
      href: "/all/mens-bags",
      icon: "💼",
      color: "bg-amber-50 border-amber-200",
      subcategories: [
        { id: "totes", name: "Totes", href: "/all/totes" },
        { id: "briefcases", name: "Briefcases", href: "/all/briefcases" },
        { id: "suit-carriers", name: "Suit Carriers", href: "/all/suit-carriers" },
      ]
    },
    {
      id: "women-apparel",
      name: "Women Apparel",
      href: "/all/women-apparel",
      icon: "👗",
      color: "bg-pink-50 border-pink-200",
      subcategories: [
        { id: "tops", name: "Tops", href: "/all/tops" },
        { id: "dresses", name: "Dresses", href: "/all/dresses" },
        { id: "socks-tights", name: "Socks & Tights", href: "/all/socks--tights" },
        { id: "pants-leggings", name: "Pants & Leggings", href: "/all/pants--leggings" },
      ]
    },
    {
      id: "beauty-care",
      name: "Beauty & Personal Care",
      href: "/all/beauty-personal-care",
      icon: "💄",
      color: "bg-purple-50 border-purple-200",
      subcategories: [
        { id: "womens-hair", name: "Women's Hair Care", href: "/all/womens-hair-care" },
        { id: "feminine-care", name: "Feminine Care", href: "/all/feminine-care" },
        { id: "skincare", name: "Skincare", href: "/all/skincare" },
      ]
    },
    {
      id: "home-living",
      name: "Home & Living",
      href: "/all/home-living",
      icon: "🏡",
      color: "bg-emerald-50 border-emerald-200",
      subcategories: [
        { id: "home-decor", name: "Home Decor", href: "/all/home-decor" },
        { id: "tools-diy", name: "Tools, DIY & Outdoors", href: "/all/tools-diy--outdoors" },
        { id: "kitchen-dining", name: "Kitchen & Dining", href: "/all/kitchen--dining" },
      ]
    },
    {
      id: "food-beverages",
      name: "Food & Beverages",
      href: "/all/food-beverages",
      icon: "🍽️",
      color: "bg-orange-50 border-orange-200",
      subcategories: [
        { id: "snacks-sweets", name: "Snacks & Sweets", href: "/all/snacks--sweets" },
        { id: "meat-seafood", name: "Meat & Seafood", href: "/all/meat--seafood" },
      ]
    },
    {
      id: "travel-luggage",
      name: "Travel & Luggage",
      href: "/all/travel-luggage",
      icon: "✈️",
      color: "bg-cyan-50 border-cyan-200",
      subcategories: [
        { id: "luggage", name: "Luggage", href: "/all/luggage" },
        { id: "travel-bags", name: "Travel Bags & Backpacks", href: "/all/travel-bags--backpacks" },
        { id: "travel-accessories", name: "Travel Accessories", href: "/all/travel-accessories" },
      ]
    },
    {
      id: "jewellery-accessories",
      name: "Jewellery & Accessories",
      href: "/all/jewellery-ccessories",
      icon: "💎",
      color: "bg-rose-50 border-rose-200",
      subcategories: [
        { id: "hats-caps", name: "Hats & Caps", href: "/all/hats--caps" },
        { id: "key-chains", name: "Key Chains", href: "/all/key-chains" },
        { id: "eyewear", name: "Eyewear", href: "/all/eyewear" },
      ]
    },
    {
      id: "womens-bags",
      name: "Women's Bags",
      href: "/all/womens-bags",
      icon: "👜",
      color: "bg-violet-50 border-violet-200",
      subcategories: [
        { id: "sling-bags", name: "Sling Bags", href: "/all/sling-bags" },
        { id: "clutches-mini", name: "Clutches & Mini Bags", href: "/all/clutches--mini-bags" },
        { id: "handbags", name: "Handbags", href: "/all/handbags" },
      ]
    },
  ]
}

export default function CategorySitemap() {
  return (
    <section className="category-sitemap-section">
      <div className="w-full px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="sitemap-header">
          <h2 className="sitemap-title">Shop by Category</h2>
          <p className="sitemap-subtitle">Discover our comprehensive range of products</p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categoryData.categories.map((category) => (
            <div key={category.id} className={`category-card ${category.color}`}>
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <Link href={category.href} className="category-title">
                  {category.name}
                  <ChevronRight className="chevron-icon" />
                </Link>
              </div>
              
              <div className="subcategories-list">
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory.id}
                    href={subcategory.href}
                    className="subcategory-item"
                  >
                    {subcategory.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 