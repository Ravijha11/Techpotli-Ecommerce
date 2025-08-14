"use client"

import { Mail, Phone } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="flex items-center space-x-6">
      <a 
        href="mailto:info@techpotli.com" 
        className="group flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 transition-all duration-200"
      >
        <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>Mail info@techpotli.com</span>
      </a>
      <span className="text-gray-300">|</span>
      <a 
        href="tel:01147200987" 
        className="group flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 transition-all duration-200"
      >
        <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
        <span>Helpline 01147200987</span>
      </a>
    </div>
  )
} 