"use client"

import { Facebook, Chrome } from "lucide-react"

interface SocialLoginButtonProps {
  provider: "facebook" | "google"
  onClick: () => void
  disabled?: boolean
  className?: string
}

export default function SocialLoginButton({
  provider,
  onClick,
  disabled = false,
  className = ""
}: SocialLoginButtonProps) {
  const getProviderConfig = () => {
    switch (provider) {
      case "facebook":
        return {
          icon: <Facebook className="h-5 w-5" />,
          text: "Login with facebook",
          bgColor: "bg-blue-600 hover:bg-blue-700",
          textColor: "text-white"
        }
      case "google":
        return {
          icon: <Chrome className="h-5 w-5" />,
          text: "Login with google",
          bgColor: "bg-white border border-gray-300 hover:bg-gray-50",
          textColor: "text-gray-700"
        }
      default:
        return {
          icon: null,
          text: "",
          bgColor: "",
          textColor: ""
        }
    }
  }

  const config = getProviderConfig()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${config.bgColor} ${config.textColor} ${className}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </button>
  )
} 