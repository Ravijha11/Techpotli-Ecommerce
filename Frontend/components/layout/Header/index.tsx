"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Search, Globe, User, ShoppingCart, Store, LogIn, UserPlus } from "lucide-react"
import SearchBar from "./SearchBar"
import LoginButton from "./LoginButton"
import RegisterButton from "./RegisterButton"
import SellerButton from "./SellerButton"
import MoreOptions from "./MoreOptions"
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
             {/* Top Bar - Clean White Design */}
       <div className="bg-white border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Desktop Top Bar */}
           <div className="hidden lg:flex items-center justify-between py-4">
             {/* Left Side - Logo */}
             <div className="flex items-center space-x-8">
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
             </div>

             {/* Center - Search Bar */}
             <div className="flex-1 max-w-2xl mx-8">
               <SearchBar />
             </div>

             {/* Right Side - Seller, Auth & Three Dots (3-dots last) */}
             <div className="flex items-center space-x-6">
               <SellerButton />
               <span className="text-gray-300">|</span>
               <LoginButton />
               <span className="text-gray-300">|</span>
               <RegisterButton />
               <span className="text-gray-300">|</span>
               <MoreOptions />
             </div>
           </div>

                     {/* Tablet Top Bar */}
           <div className="hidden md:block lg:hidden py-3">
             {/* Top Row - Logo, Search & Three Dots */}
             <div className="flex items-center justify-between mb-3">
               {/* Logo */}
               <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
                 <Image
                   src="/New_Techpotli_Logo.png"
                   alt="Techpotli Logo"
                   width={160}
                   height={50}
                   className="h-10 w-auto responsive-logo"
                   priority
                 />
               </Link>

               {/* Search Bar */}
               <div className="flex-1 max-w-xl mx-6">
                 <SearchBar />
               </div>

               {/* Three Dots */}
               <MoreOptions />
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
             {/* Mobile Top Row - Logo, Search & Three Dots */}
             <div className="flex items-center justify-between mb-3">
               {/* Logo */}
               <Link href="/" className="flex items-center space-x-3 flex-shrink-0">
                 <Image
                   src="/New_Techpotli_Logo.png"
                   alt="Techpotli Logo"
                   width={140}
                   height={45}
                   className="h-9 w-auto responsive-logo"
                   priority
                 />
               </Link>

               {/* Search Bar */}
               <div className="flex-1 max-w-xs mx-4">
                 <SearchBar />
               </div>

               {/* Three Dots */}
               <MoreOptions />
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

             {/* Mobile Menu Button - Only for mobile navigation */}
       <div className="md:hidden w-full py-2 bg-white border-b border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <button
             className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
             onClick={toggleMobileMenu}
             aria-label="Toggle mobile menu"
             aria-expanded={isMobileMenuOpen.toString()}
           >
             {isMobileMenuOpen ? (
               <X className="w-6 h-6" />
             ) : (
               <Menu className="w-6 h-6" />
             )}
           </button>
         </div>
       </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/discover/products" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <Search className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Discover Products</span>
              </Link>
              <Link 
                href="/categories" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Categories</span>
              </Link>
              <Link 
                href="/brands" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Brands</span>
              </Link>
              <Link 
                href="/hot-deals" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Hot Deals</span>
              </Link>
              <Link 
                href="/track-order" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Track Order</span>
              </Link>
              <Link 
                href="/page/faq" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">FAQ</span>
              </Link>
              <Link 
                href="/page/help" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                <span className="font-medium">Help</span>
              </Link>
              <Link 
                href="/page/contact" 
                className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200"
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