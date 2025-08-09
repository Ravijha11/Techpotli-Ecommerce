import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Track Order - Techpotli",
  description: "Track your order status and delivery progress. Enter your order tracking code to get real-time updates on your package.",
  keywords: "track order, order tracking, delivery status, package tracking, order status",
}

export default function TrackOrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
