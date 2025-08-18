"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Lock } from "lucide-react"
import Link from "next/link"
import FormInput from "./FormInput"
import SocialLoginButton from "./SocialLoginButton"
import { 
  validateRegistrationForm, 
  handleSocialLogin, 
  registerUser,
  clearFormErrors,
  type UserRegistrationData,
  type FormValidationErrors 
} from "./authUtils"

export default function RegisterForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<UserRegistrationData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  
  const [errors, setErrors] = useState<FormValidationErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof UserRegistrationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => clearFormErrors(prev, field))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validateRegistrationForm(formData)
    setErrors(validationErrors)
    
    if (Object.keys(validationErrors).length > 0) return

    setIsLoading(true)
    
    try {
      const result = await registerUser(formData)
      
      if (result.success) {
        // Redirect to login page after successful registration
        router.push("/login")
      } else {
        // Handle registration error
        console.error("Registration failed:", result.message)
      }
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLoginClick = async (provider: "facebook" | "google") => {
    const result = await handleSocialLogin(provider)
    if (result.success) {
      // Handle successful social login
      console.log(`${provider} login successful`)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Welcome to Techpotli</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <FormInput
          id="name"
          label="Name"
          type="text"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value)}
          placeholder="Your name"
          error={errors.name}
          icon={<User className="h-5 w-5 text-gray-400" />}
          required
        />

        {/* Email Field */}
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          placeholder="Your email"
          error={errors.email}
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          required
        />

        {/* Password Field */}
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleInputChange("password", value)}
          placeholder="Your password"
          error={errors.password}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          required
        />

        {/* Confirm Password Field */}
        <FormInput
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={formData.confirmPassword}
          onChange={(value) => handleInputChange("confirmPassword", value)}
          placeholder="Your password"
          error={errors.confirmPassword}
          icon={<Lock className="h-5 w-5 text-gray-400" />}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Creating account..." : "Submit"}
        </button>
      </form>

      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-purple-600 hover:text-purple-700 underline font-medium">
            Sign In
          </Link>
        </p>
      </div>

      {/* My Account Button */}
      <div className="mt-4 text-center">
        <Link 
          href="/profile" 
          className="inline-flex items-center px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          My Account
        </Link>
      </div>

      {/* Divider */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="mt-6 space-y-3">
        <SocialLoginButton
          provider="facebook"
          onClick={() => handleSocialLoginClick("facebook")}
          disabled={isLoading}
        />
        
        <SocialLoginButton
          provider="google"
          onClick={() => handleSocialLoginClick("google")}
          disabled={isLoading}
        />
      </div>

      {/* Privacy Policy */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-600">
          By continuing, you agree to the{" "}
          <Link href="/privacy-policy" className="text-purple-600 hover:text-purple-700 underline">
            Privacy policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
} 