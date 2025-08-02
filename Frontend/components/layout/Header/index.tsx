"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import SearchBar from "./SearchBar"
import AccountDropdown from "./AccountDropdown"
import LoginButton from "./LoginButton"
import RegisterButton from "./RegisterButton"
import SellerButton from "./SellerButton"
import LanguageSelector from "./LanguageSelector"
import ContactInfo from "./ContactInfo"
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
      <div className="bg-purple-100 text-gray-700 py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ContactInfo />
          </div>
          <div className="flex items-center space-x-4">
            <SellerButton />
            <span className="text-gray-400">|</span>
            <LoginButton />
            <span className="text-gray-400">|</span>
            <RegisterButton />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 bg-white">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/New_Techpotli_Logo.png"
              alt="Techpotli Logo"
              width={180}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-8">
            <AccountDropdown />
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