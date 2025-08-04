"use client"

import Link from "next/link"
import { Settings } from "lucide-react"

interface SettingsSectionProps {
  onClose?: () => void
}

export default function SettingsSection({ onClose }: SettingsSectionProps) {
  return (
    <Link 
      href="/settings"
      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset"
      onClick={onClose}
    >
      <Settings className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
      <span className="text-gray-900 text-sm">Settings</span>
    </Link>
  )
} 