import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface Category {
  name: string
  icon: LucideIcon
  href: string
  color: string
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = category.icon
  
  return (
    <Link
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
} 