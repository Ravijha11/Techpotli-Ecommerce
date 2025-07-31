"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, Phone, Mail } from "lucide-react"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"
import CartIcon from "./CartIcon"
import BottomNavigation from "../BottomNavigation"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      {/* Top Bar */}
      <div className="bg-gray-100 text-gray-700 py-2 px-4 text-sm border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <select className="bg-transparent text-gray-700">
              <option>English</option>
            </select>
            <span className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>Mail webzedcontact@gmail.com</span>
            </span>
            <span className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>Helpline 4534345656</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span>BE A SELLER</span>
            <span>|</span>
            <span>LOGIN</span>
            <span>|</span>
            <span>REGISTER</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-purple-600">ishop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <UserMenu />
            <CartIcon />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </header>
  )
} 