import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hot Deals - Techpotli",
  description: "Discover amazing hot deals, flash sales, and New Year offers on electronics, fashion, and more at Techpotli.",
  keywords: "hot deals, flash sale, new year sale, discounts, offers, online shopping",
}

export default function HotDealsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
