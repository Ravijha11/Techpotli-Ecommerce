import Link from "next/link"
import { Smartphone, Laptop, Camera, Watch, Gamepad2, Home } from "lucide-react"

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    href: "/smartphones",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Laptops",
    icon: Laptop,
    href: "/laptops",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Cameras",
    icon: Camera,
    href: "/cameras",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Wearables",
    icon: Watch,
    href: "/wearables",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    href: "/gaming",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Home & Kitchen",
    icon: Home,
    href: "/home-kitchen",
    color: "bg-teal-100 text-teal-600",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div
                  className={`w-16 h-16 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-8 h-8" />
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-500 transition-colors">
                  {category.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
