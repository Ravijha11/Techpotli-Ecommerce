import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import FooterLinks from "./FooterLinks"
import Newsletter from "./Newsletter"

export default function Footer() {
  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
    { href: "/press", label: "Press" },
    { href: "/sitemap", label: "Sitemap" },
  ]

  const customerServiceLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/returns", label: "Returns & Refunds" },
    { href: "/shipping", label: "Shipping Info" },
    { href: "/track-order", label: "Track Your Order" },
    { href: "/warranty", label: "Warranty" },
    { href: "/bulk-orders", label: "Bulk Orders" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">i</span>
              </div>
              <span className="text-2xl font-bold">iShop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted online shopping destination for electronics, fashion, and more. Quality products at
              unbeatable prices.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>123 Shopping Street, Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>support@ishop.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinks title="Quick Links" links={quickLinks} />

          {/* Customer Service */}
          <FooterLinks title="Customer Service" links={customerServiceLinks} />

          {/* Newsletter & Social */}
          <Newsletter />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 iShop. All rights reserved. |
              <Link href="/privacy" className="hover:text-white ml-1">
                Privacy Policy
              </Link>{" "}
              |
              <Link href="/terms" className="hover:text-white ml-1">
                Terms of Service
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We Accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white px-2 py-1 rounded text-xs font-bold text-gray-800">bKash</div>
                <div className="bg-white px-2 py-1 rounded text-xs font-bold text-gray-800">Nagad</div>
                <div className="bg-white px-2 py-1 rounded text-xs font-bold text-gray-800">VISA</div>
                <div className="bg-white px-2 py-1 rounded text-xs font-bold text-gray-800">Rocket</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 