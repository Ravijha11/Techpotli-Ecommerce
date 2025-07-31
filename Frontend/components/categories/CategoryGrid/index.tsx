import { Smartphone, Laptop, Camera, Watch, Gamepad2, Home } from "lucide-react"
import CategoryCard from "./CategoryCard"

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

interface CategoryGridProps {
  title?: string
  className?: string
}

export default function CategoryGrid({ title = "Shop by Category", className = "" }: CategoryGridProps) {
  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
} 