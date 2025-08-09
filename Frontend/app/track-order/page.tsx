"use client"

import { useState } from "react"
import Link from "next/link"
import { Package } from "lucide-react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import NewsletterSubscription from "@/components/marketing/NewsletterSubscription"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

export default function TrackOrderPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!trackingCode.trim()) {
      toast({
        title: "Tracking code required",
        description: "Please enter your order tracking code.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual backend integration later
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Order found!",
        description: `Tracking details for order ${trackingCode} will be displayed here.`,
      })
      
      // Here you would typically fetch and display the order details
      console.log("Tracking order:", trackingCode)
      
    } catch (error) {
      toast({
        title: "Tracking failed",
        description: "Unable to find order with this tracking code. Please check and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-purple-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-purple-600 font-medium">Track Order</span>
            </nav>
          </div>
        </section>

        {/* Track Your Order Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-purple-600 mb-4">
                Track Your Order
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Have an order? Want to know where your order is now?
              </p>

              {/* Tracking Form */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Enter the track code of your order
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-left">
                    <label htmlFor="trackingCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="trackingCode"
                        type="text"
                        value={trackingCode}
                        onChange={(e) => setTrackingCode(e.target.value)}
                        placeholder="Your Order, eg. 20230704N2H5X2"
                        className="pl-10 h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Know the progress of your product delivery.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium text-base h-12 transition-colors"
                  >
                    {isSubmitting ? "Tracking..." : "Submit"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 bg-purple-50">
          <div className="container mx-auto px-4">
            <NewsletterSubscription />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
