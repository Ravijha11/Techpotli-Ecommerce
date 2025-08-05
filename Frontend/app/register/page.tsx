import RegisterForm from "@/components/auth/RegisterForm"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-3">
            <Image
              src="/New_Techpotli_Logo.png"
              alt="Techpotli Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-bold text-purple-600">Techpotli</span>
          </div>
        </div>
      </div>
      
      <RegisterForm />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          © 2025 - All rights reserved by Techpotli
        </p>
      </div>
    </div>
  )
} 