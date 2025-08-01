"use client"

import { UserPlus } from "lucide-react"

export default function RegisterButton() {
  return (
    <div className="flex items-center space-x-1 cursor-pointer hover:text-purple-600 transition-colors">
      <UserPlus className="w-4 h-4" />
      <span>REGISTER</span>
    </div>
  )
} 