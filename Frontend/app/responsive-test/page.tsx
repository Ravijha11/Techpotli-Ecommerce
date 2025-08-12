import type { Metadata } from "next"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export const metadata: Metadata = {
  title: "Responsive Test - Techpotli",
  description: "Test page for responsive design utilities",
}

export default function ResponsiveTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="responsive-section">
        <div className="responsive-container">
          <h1 className="responsive-heading text-center mb-8">Responsive Design Test Page</h1>
          
          {/* Responsive Grid Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Grid System</h2>
            <div className="responsive-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border text-center responsive-card">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2">Grid Item {i + 1}</h3>
                  <p className="text-gray-600 responsive-text">This demonstrates responsive grid behavior</p>
                </div>
              ))}
            </div>
          </section>

          {/* Responsive Typography Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Typography</h2>
            <div className="space-y-4">
              <h1 className="responsive-heading">Heading 1 - Responsive</h1>
              <h2 className="responsive-subheading">Heading 2 - Responsive</h2>
              <p className="responsive-text">
                This is responsive body text that scales appropriately across different screen sizes. 
                The font size adjusts using clamp() and responsive utility classes.
              </p>
            </div>
          </section>

          {/* Responsive Spacing Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Spacing</h2>
            <div className="space-y-4">
              <div className="bg-blue-100 responsive-px responsive-py rounded-lg">
                <p className="text-center">This box has responsive padding and margins</p>
              </div>
              <div className="bg-green-100 responsive-mx responsive-my rounded-lg">
                <p className="text-center">This box has responsive margins</p>
              </div>
            </div>
          </section>

          {/* Responsive Buttons Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <button className="bg-purple-600 text-white responsive-button rounded-lg">
                Responsive Button
              </button>
              <button className="bg-blue-600 text-white responsive-button rounded-lg">
                Another Button
              </button>
              <button className="bg-green-600 text-white responsive-button rounded-lg">
                Third Button
              </button>
            </div>
          </section>

          {/* Responsive Images Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Responsive Image Placeholder</span>
                </div>
                <p className="responsive-text">This image container is responsive and maintains aspect ratio</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-500">Square Image</span>
                </div>
                <p className="responsive-text">Square aspect ratio that works on all screen sizes</p>
              </div>
            </div>
          </section>

          {/* Responsive Forms Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Forms</h2>
            <form className="responsive-form space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  className="responsive-input border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="responsive-input border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  className="responsive-input border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                  placeholder="Enter your message"
                />
              </div>
              <button type="submit" className="w-full bg-purple-600 text-white responsive-button rounded-lg">
                Submit
              </button>
            </form>
          </section>

          {/* Responsive Visibility Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Visibility</h2>
            <div className="space-y-4">
              <div className="responsive-hidden-mobile bg-yellow-100 p-4 rounded-lg">
                <p className="text-center">This is hidden on mobile devices</p>
              </div>
              <div className="responsive-hidden-desktop bg-red-100 p-4 rounded-lg">
                <p className="text-center">This is hidden on desktop devices</p>
              </div>
            </div>
          </section>

          {/* Responsive Layout Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Layout</h2>
            <div className="responsive-flex-col bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-50 p-4 rounded-lg mb-4 md:mb-0 md:mr-4">
                <h3 className="font-semibold mb-2">Column 1</h3>
                <p className="responsive-text">This column stacks on mobile and becomes a row on larger screens</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Column 2</h3>
                <p className="responsive-text">This demonstrates responsive flexbox behavior</p>
              </div>
            </div>
          </section>

          {/* Responsive Product Grid Test */}
          <section className="mb-12">
            <h2 className="responsive-subheading mb-6">Responsive Product Grid</h2>
            <div className="responsive-product-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border responsive-card">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-500">Product {i + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2 responsive-text">Product Name {i + 1}</h3>
                  <p className="text-gray-600 text-sm mb-2">Product description goes here</p>
                  <div className="text-lg font-bold text-purple-600">₹{999 + i * 100}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
