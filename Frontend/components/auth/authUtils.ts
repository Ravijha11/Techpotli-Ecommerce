// Authentication utility functions for the e-commerce platform

export interface UserRegistrationData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface FormValidationErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
}

export interface SocialLoginProvider {
  name: "facebook" | "google"
  icon: string
  color: string
  bgColor: string
}

export const validateRegistrationForm = (data: UserRegistrationData): FormValidationErrors => {
  const errors: FormValidationErrors = {}

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Name is required"
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters"
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required"
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters"
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password"
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  return errors
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (password.length < 6) {
    errors.push("Password must be at least 6 characters")
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }
  
  if (!/(?=.*\d)/.test(password)) {
    errors.push("Password must contain at least one number")
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const socialLoginProviders: SocialLoginProvider[] = [
  {
    name: "facebook",
    icon: "facebook",
    color: "text-white",
    bgColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    name: "google",
    icon: "google",
    color: "text-gray-700",
    bgColor: "bg-white border border-gray-300 hover:bg-gray-50"
  }
]

export const handleSocialLogin = async (provider: "facebook" | "google") => {
  try {
    // TODO: Implement actual social login logic
    console.log(`Initiating ${provider} login...`)
    
    // This would typically involve:
    // 1. Redirecting to OAuth provider
    // 2. Handling the callback
    // 3. Storing user session
    // 4. Redirecting to dashboard or home page
    
    return { success: true, provider }
  } catch (error) {
    console.error(`${provider} login failed:`, error)
    return { success: false, error }
  }
}

export const registerUser = async (userData: UserRegistrationData) => {
  try {
    // TODO: Implement actual registration API call
    // This would typically involve:
    // 1. Sending data to backend API
    // 2. Handling response
    // 3. Storing user session if successful
    // 4. Returning success/error status
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      message: "Registration successful",
      user: {
        id: "user_" + Date.now(),
        name: userData.name,
        email: userData.email
      }
    }
  } catch (error) {
    console.error("Registration failed:", error)
    return {
      success: false,
      message: "Registration failed. Please try again.",
      error
    }
  }
}

export const clearFormErrors = (errors: FormValidationErrors, field: keyof FormValidationErrors): FormValidationErrors => {
  const newErrors = { ...errors }
  delete newErrors[field]
  return newErrors
} 