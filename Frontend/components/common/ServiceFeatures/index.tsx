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
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="static-area flex-1 min-w-[200px] p-4 group"
            >
              <div className="relative">
                {/* Card Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-xl opacity-90 backdrop-blur-xl border border-gray-200/50 shadow-md group-hover:shadow-lg transition-all duration-500 group-hover:scale-105`}></div>
                
                {/* Content */}
                <div className="relative flex items-center space-x-4 p-4">
                  <div className="img-wrap relative">
                    {/* Icon Background Glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                    
                    {/* Icon Container - Reduced size */}
                    <div className="relative w-12 h-12 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm border border-gray-200/50 group-hover:shadow-md transition-all duration-500 group-hover:scale-110">
                      <img 
                        alt="Feature Image" 
                        title="Feature Image" 
                        height="32" 
                        width="32" 
                        style={{ opacity: 1 }} 
                        src={feature.image}
                        className="w-8 h-8 object-contain filter drop-shadow-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="detail flex-1">
                    <h4 className="font-bold text-gray-800 text-base mb-1 group-hover:text-gray-900 transition-colors duration-300">
                      <strong>{feature.title}</strong>
                    </h4>
                    <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Hover Effect Arrow - Reduced size */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                    <div className={`w-6 h-6 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center shadow-sm`}>
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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