"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, Mail, Phone, Globe, User, ShoppingCart, Store, LogIn, UserPlus } from "lucide-react"
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
  const [isHydrated, setIsHydrated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Set initial scroll state after hydration
    setIsScrolled(window.scrollY > 0)
    setIsHydrated(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 w-full ${isHydrated && isScrolled ? "shadow-lg" : ""}`}>
      {/* Top Bar - Completely Redesigned & Responsive */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Top Bar */}
          <div className="hidden lg:flex items-center justify-between py-4">
            {/* Left Side - Contact Info & Language */}
            <div className="flex items-center space-x-8">
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <LanguageSelector />
              </div>
              
              {/* Contact Info */}
              <div className="flex items-center space-x-6">
                <a 
                  href="mailto:info@allitexpert.com" 
                  className="group flex items-center space-x-2 text-sm text-gray-700 hover:text-sky-600 transition-all duration-200 font-serif"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline">info@allitexpert.com</span>
                  <span className="xl:hidden">info@allitexpert.com</span>
                </a>
                <span className="text-gray-300">|</span>
                <a 
                  href="tel:+1-888-404-6710" 
                  className="group flex items-center space-x-2 text-sm text-gray-700 hover:text-sky-600 transition-all duration-200 font-serif"
                >
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline">+1 (888) 404-6710</span>
                  <span className="xl:hidden">+1 (888) 404-6710</span>
                </a>
              </div>
            </div>

            {/* Right Side - Seller & Auth */}
            <div className="flex items-center space-x-6">
              <SellerButton />
              <span className="text-gray-300">|</span>
              <LoginButton />
              <span className="text-gray-300">|</span>
              <RegisterButton />
            </div>
          </div>

          {/* Tablet Top Bar */}
          <div className="hidden md:block lg:hidden py-3">
            {/* Top Row - Language & Contact */}
            <div className="flex items-center justify-between mb-3">
              {/* Language */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <LanguageSelector />
              </div>
              
              {/* Contact Info */}
              <div className="flex items-center space-x-4">
                <a 
                  href="mailto:info@allitexpert.com" 
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-sky-600 transition-colors font-serif"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@allitexpert.com</span>
                </a>
                <span className="text-gray-300">|</span>
                <a 
                  href="tel:+1-888-404-6710" 
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-sky-600 transition-colors font-serif"
                >
                  <Phone className="w-4 h-4" />
                  <span>+1 (888) 404-6710</span>
                </a>
              </div>
            </div>

            {/* Bottom Row - Seller & Auth */}
            <div className="flex items-center justify-between">
              <SellerButton />
              <div className="flex items-center space-x-4">
                <LoginButton />
                <RegisterButton />
              </div>
            </div>
          </div>

          {/* Mobile Top Bar */}
          <div className="md:hidden py-3">
            {/* Mobile Top Row - Language & Contact */}
            <div className="flex items-center justify-between mb-3">
              {/* Language */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-sky-600" />
                <LanguageSelector />
              </div>
              
              {/* Contact Icons */}
              <div className="flex items-center space-x-3">
                <a 
                  href="mailto:info@allitexpert.com" 
                  className="p-2 text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all duration-200"
                  aria-label="Email us at info@allitexpert.com"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a 
                  href="tel:+1-888-404-6710" 
                  className="p-2 text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-full transition-all duration-200"
                  aria-label="Call us at +1 (888) 404-6710"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Mobile Bottom Row - Seller & Auth */}
            <div className="flex items-center justify-between">
              <SellerButton />
              <div className="flex items-center space-x-3">
                <LoginButton />
                <RegisterButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between w-full">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
              <Image
                src="/New_Techpotli_Logo.png"
                alt="Techpotli Logo"
                width={180}
                height={60}
                className="h-12 w-auto md:h-16 responsive-logo"
                priority
              />
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
              <AccountDropdown />
              <CartIcon />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/discover/products" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <Search className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Discover Products</span>
              </Link>
              <Link 
                href="/categories" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Categories</span>
              </Link>
              <Link 
                href="/brands" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Brands</span>
              </Link>
              <Link 
                href="/hot-deals" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Hot Deals</span>
              </Link>
              <Link 
                href="/track-order" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Track Order</span>
              </Link>
              <Link 
                href="/page/faq" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">FAQ</span>
              </Link>
              <Link 
                href="/page/help" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Help</span>
              </Link>
              <Link 
                href="/page/contact" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 font-serif"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Desktop Only */}
      <div className="hidden md:block">
        <BottomNavigation />
      </div>
    </header>
  )
} 