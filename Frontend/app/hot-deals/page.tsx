"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import NewYearSale from "@/app/components/NewYearSale"
import NewsletterSubscription from "@/components/marketing/NewsletterSubscription"

export default function HotDealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 499,
    hours: 9,
    minutes: 1,
    seconds: 17,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section with New Year Sale Banner */}
        <section className="bg-gradient-to-r from-red-500 to-orange-500 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                🎉 New Year Sale
              </h1>
              {/* Countdown Timer */}
              <div className="flex justify-center items-center space-x-4 mb-8">
                <div className="bg-white text-red-500 px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold font-mono">
                    {timeLeft.days.toString().padStart(3, "0")}
                  </div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="text-white text-4xl font-bold">:</div>
                <div className="bg-white text-red-500 px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold font-mono">
                    {timeLeft.hours.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="text-white text-4xl font-bold">:</div>
                <div className="bg-white text-red-500 px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold font-mono">
                    {timeLeft.minutes.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-white text-4xl font-bold">:</div>
                <div className="bg-white text-red-500 px-6 py-4 rounded-xl shadow-lg">
                  <div className="text-3xl md:text-4xl font-bold font-mono">
                    {timeLeft.seconds.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-gray-600">Seconds</div>
                </div>
              </div>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Limited time offers on thousands of products. Don't miss out on these amazing deals!
              </p>
            </div>
          </div>
        </section>

        {/* New Year Sale Products Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
                Hot Deals - New Year Sale
              </h2>
              <p className="text-gray-600 text-center max-w-2xl mx-auto">
                Discover amazing discounts on top-quality products. Limited time offers that you won't want to miss!
              </p>
            </div>
            <NewYearSale />
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
