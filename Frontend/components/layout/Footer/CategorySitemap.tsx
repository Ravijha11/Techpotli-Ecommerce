import Link from "next/link"

export default function CategorySitemap() {
  const categories = [
    {
      name: "Toys, Kids & Babies",
      href: "/all/toys-kids-babies",
      subcategories: [
        { name: "Bath & Baby Care", href: "/all/bath--baby-care" },
        { name: "Maternity Care", href: "/all/maternity-care" },
        { name: "Kid's Furniture", href: "/all/kids-furniture" },
      ]
    },
    {
      name: "Men's Shoes",
      href: "/all/mens-shoes",
      subcategories: [
        { name: "Formal Shoes", href: "/all/formal-shoes" },
        { name: "Sandals & Flip-Flops", href: "/all/sandals--flip-flops" },
        { name: "Sneakers", href: "/all/sneakers" },
      ]
    },
    {
      name: "Home Appliances",
      href: "/all/home-appliances",
      subcategories: [
        { name: "Housekeeping", href: "/all/housekeeping" },
        { name: "TV Accessories", href: "/all/tv-accessories" },
        { name: "Small Kitchen Appliances", href: "/all/small-kitchen-appliances" },
      ]
    },
    {
      name: "Men's Wear",
      href: "/all/mens-wear",
      subcategories: [
        { name: "Pants", href: "/all/pants" },
        { name: "Crossbody & Shoulder Bags", href: "/all/crossbody--shoulder-bags" },
        { name: "Shirts", href: "/all/shirts" },
        { name: "Jackets & Coats", href: "/all/jackets--coats" },
        { name: "Men's Wallet", href: "/all/mens-wallet" },
        { name: "Backpacks", href: "/all/backpacks" },
      ]
    },
    {
      name: "Men's Bags",
      href: "/all/mens-bags",
      subcategories: [
        { name: "Totes", href: "/all/totes" },
        { name: "Briefcases", href: "/all/briefcases" },
        { name: "Suit Carriers", href: "/all/suit-carriers" },
      ]
    },
    {
      name: "Women Apparel",
      href: "/all/women-apparel",
      subcategories: [
        { name: "Tops", href: "/all/tops" },
        { name: "Dresses", href: "/all/dresses" },
        { name: "Socks & Tights", href: "/all/socks--tights" },
        { name: "Pants & Leggings", href: "/all/pants--leggings" },
      ]
    },
    {
      name: "Beauty & Personal Care",
      href: "/all/beauty-personal-care",
      subcategories: [
        { name: "Women's Hair Care", href: "/all/womens-hair-care" },
        { name: "Feminine Care", href: "/all/feminine-care" },
        { name: "Skincare", href: "/all/skincare" },
      ]
    },
    {
      name: "Home & Living",
      href: "/all/home-living",
      subcategories: [
        { name: "Home Decor", href: "/all/home-decor" },
        { name: "Tools, DIY & Outdoors", href: "/all/tools-diy--outdoors" },
        { name: "Kitchen & Dining", href: "/all/kitchen--dining" },
      ]
    },
    {
      name: "Food & Beverages",
      href: "/all/food-beverages",
      subcategories: [
        { name: "Snacks & Sweets", href: "/all/snacks--sweets" },
        { name: "Meat & Seafood", href: "/all/meat--seafood" },
      ]
    },
    {
      name: "Travel & Luggage",
      href: "/all/travel-luggage",
      subcategories: [
        { name: "Luggage", href: "/all/luggage" },
        { name: "Travel Bags & Backpacks", href: "/all/travel-bags--backpacks" },
        { name: "Travel Accessories", href: "/all/travel-accessories" },
      ]
    },
    {
      name: "Jewellery & Accessories",
      href: "/all/jewellery-ccessories",
      subcategories: [
        { name: "Hats & Caps", href: "/all/hats--caps" },
        { name: "Key Chains", href: "/all/key-chains" },
        { name: "Eyewear", href: "/all/eyewear" },
      ]
    },
    {
      name: "Women's Bags",
      href: "/all/womens-bags",
      subcategories: [
        { name: "Sling Bags", href: "/all/sling-bags" },
        { name: "Clutches & Mini Bags", href: "/all/clutches--mini-bags" },
        { name: "Handbags", href: "/all/handbags" },
      ]
    },
  ]

  return (
    <div className="category-sitemap-section">
      <div className="container">
        <ul className="table-tree">
          {categories.map((category) => (
            <li key={category.href} className="tree-node">
              <span className="node-data">
                <Link href={category.href} className="category-link" title={category.name}>
                  {category.name}
                </Link>
              </span>
              <ul>
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.href} className="tree-node">
                    <span className="node-data">
                      <Link href={subcategory.href} className="subcategory-link" title={subcategory.name}>
                        {subcategory.name}
                      </Link>
                    </span>
                    <ul></ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="ptb-15 mt-20 mt-sm-15 b-t center-text">
          <Link href="/" className="router-link-active router-link-exact-active logo">
            <img src="https://cdn.ishop.cholobangla.com/uploads/footer-logo.svg" alt="Site Logo" height="50" width="50" />
          </Link>
        </div>
      </div>
    </div>
  )
} 