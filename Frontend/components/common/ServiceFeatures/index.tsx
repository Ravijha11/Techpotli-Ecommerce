const features = [
  {
    image: "https://cdn.ishop.cholobangla.com/uploads/site-feature-1.webp",
    title: "Rapid shipping",
    description: "With a short period of time",
    gradient: "from-orange-400 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
  },
  {
    image: "https://cdn.ishop.cholobangla.com/uploads/site-feature-2.webp",
    title: "Secure transaction",
    description: "Checkout securely",
    gradient: "from-blue-400 to-indigo-500",
    bgGradient: "from-blue-50 to-indigo-50",
  },
  {
    image: "https://cdn.ishop.cholobangla.com/uploads/site-feature-3.webp",
    title: "24/7 support",
    description: "Ready to pickup calls",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
  },
  {
    image: "https://cdn.ishop.cholobangla.com/uploads/site-feature-4.webp",
    title: "Bundle offer",
    description: "On many products",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
]

export default function ServiceFeatures() {
  return (
    <section className="relative bg-transparent overflow-hidden">
      {/* Background Pattern - Removed */}
      
      {/* Subtle Glow Effect - Removed */}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap mb-20 mb-sm-15">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="static-area flex-1 min-w-[250px] p-6 group"
            >
              <div className="relative">
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-2xl opacity-90 backdrop-blur-xl border border-gray-200/50 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105`}></div>
                
                {/* Content */}
                <div className="relative flex items-center space-x-6 p-6">
                  <div className="img-wrap relative">
                    {/* Icon Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    
                    {/* Icon Container */}
                    <div className="relative w-16 h-16 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md border border-gray-200/50 group-hover:shadow-lg transition-all duration-500 group-hover:scale-110">
                      <img 
                        alt="Feature Image" 
                        title="Feature Image" 
                        height="50" 
                        width="50" 
                        style={{ opacity: 1 }} 
                        src={feature.image}
                        className="w-10 h-10 object-contain filter drop-shadow-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="detail flex-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900 transition-colors duration-300">
                      <strong>{feature.title}</strong>
                    </h4>
                    <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Arrow */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    <div className={`w-8 h-8 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center shadow-md`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 