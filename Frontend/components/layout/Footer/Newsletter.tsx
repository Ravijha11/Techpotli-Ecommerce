import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Newsletter() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
      <p className="text-gray-400 mb-4">Follow us on social media for latest updates and exclusive offers.</p>
      <div className="flex space-x-4 mb-6">
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          <Facebook className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          <Twitter className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          <Instagram className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-gray-400 hover:text-white transition-colors">
          <Youtube className="w-6 h-6" />
        </Link>
      </div>
      <div>
        <h4 className="font-medium mb-2">Download Our App</h4>
        <div className="flex flex-col space-y-2">
          <Link href="#" className="inline-block">
            <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="text-xs text-gray-400">Download on the</div>
              <div className="text-sm font-medium">App Store</div>
            </div>
          </Link>
          <Link href="#" className="inline-block">
            <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors">
              <div className="text-xs text-gray-400">Get it on</div>
              <div className="text-sm font-medium">Google Play</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 