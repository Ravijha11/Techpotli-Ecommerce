"use client"

import { Mail, Phone } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="flex items-center space-x-4">
      <span className="flex items-center space-x-1">
        <Mail className="w-4 h-4" />
        <span>Mail webzedcontact@gmail.com</span>
      </span>
      <span className="text-gray-400">|</span>
      <span className="flex items-center space-x-1">
        <Phone className="w-4 h-4" />
        <span>Helpline 4534345656</span>
      </span>
    </div>
  )
} 