import { Truck, Shield, Headphones, Package } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Rapid shipping",
    description: "With a short period of time",
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    icon: Shield,
    title: "Secure transaction",
    description: "Checkout securely",
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    icon: Headphones,
    title: "24/7 support",
    description: "Ready to pickup calls",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    icon: Package,
    title: "Bundle offer",
    description: "On many products",
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
]

export default function ServiceFeatures() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 