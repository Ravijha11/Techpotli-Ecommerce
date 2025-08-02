"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"

/**
 * NewsletterSubscription Component
 * 
 * A modern newsletter subscription component that allows users to subscribe to email updates.
 * Features include:
 * - Email validation
 * - Loading states
 * - Toast notifications for success/error feedback
 * - Responsive design
 * - Accessibility features
 * 
 * @example
 * ```tsx
 * <NewsletterSubscription />
 * ```
 * 
 * @returns JSX.Element
 */
export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Handles the newsletter subscription form submission
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      })
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual backend integration later
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive our latest updates, offers, and deals in your inbox.",
      })
      
      setEmail("")
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="bg-gradient-to-r from-purple-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left side - Text content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Subscribe to our Newsletter
            </h3>
            <p className="text-gray-600 text-lg">
              Get our latest update in your email
            </p>
          </div>

          {/* Right side - Email form */}
          <div className="flex-1 max-w-md w-full">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 pr-4 py-3 h-12 bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-lg"
                  disabled={isSubmitting}
                  aria-label="Email address for newsletter subscription"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 h-12 rounded-lg transition-colors duration-200 whitespace-nowrap"
                aria-label="Subscribe to newsletter"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 