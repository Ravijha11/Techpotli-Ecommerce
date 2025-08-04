"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  User, 
  Package, 
  Heart, 
  Gift, 
  CreditCard, 
  Crown, 
  Settings, 
  LogOut, 
  ArrowRight,
  Edit,
  Shield,
  Bell,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star
} from "lucide-react"
import { useTranslation } from "../../hooks/useTranslation"
import { useAuth } from "../../contexts/AuthContext"

export default function ProfilePage() {
  const { t } = useTranslation()
  const { user, isLoggedIn, logout, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push("/login")
    }
  }, [isLoggedIn, loading, router])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if not logged in (will redirect)
  if (!isLoggedIn) {
    return null
  }

  const menuItems = [
    {
      id: "profile",
      icon: User,
      label: t('header.myProfile'),
      description: "Manage your account settings",
      href: "/profile"
    },
    {
      id: "plus",
      icon: Crown,
      label: t('header.ishopPlusZone'),
      description: "Exclusive benefits for Plus members",
      href: "/plus-zone",
      badge: "Plus"
    },
    {
      id: "orders",
      icon: Package,
      label: t('header.orders'),
      description: "Track your orders and history",
      href: "/orders"
    },
    {
      id: "wishlist",
      icon: Heart,
      label: t('header.wishList'),
      description: "Your saved items",
      href: "/wishlist"
    },
    {
      id: "rewards",
      icon: Gift,
      label: t('header.rewards'),
      description: "Earn and redeem points",
      href: "/rewards"
    },
    {
      id: "giftcards",
      icon: CreditCard,
      label: t('header.giftCards'),
      description: "Buy and manage gift cards",
      href: "/gift-cards"
    }
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/New_Techpotli_Logo.png"
                alt="Techpotli Logo"
                width={150}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                className="text-gray-600 hover:text-purple-600 transition-colors"
                aria-label="Notifications"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button 
                className="text-gray-600 hover:text-purple-600 transition-colors"
                aria-label="Settings"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              {/* User Avatar and Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-purple-600" />
                  </div>
                  {user?.isPlusMember && (
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      Plus
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{user?.email}</p>
                <p className="text-gray-500 text-xs">Member since {user?.joinDate}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Orders</span>
                  <span className="font-semibold text-gray-900">{user?.orders}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Wishlist</span>
                  <span className="font-semibold text-gray-900">{user?.wishlistItems}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Points</span>
                  <span className="font-semibold text-gray-900">{user?.points}</span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{user?.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{user?.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                  <p className="text-purple-100">Manage your account, track orders, and explore exclusive benefits.</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <item.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      {item.badge && (
                        <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.label}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Order #12345 delivered</p>
                    <p className="text-sm text-gray-600">2 days ago</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">Rate now</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Gift className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Earned 50 points</p>
                    <p className="text-sm text-gray-600">Last week</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <Link href="/profile/edit" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Edit className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Edit Profile</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link href="/profile/security" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Security Settings</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link href="/profile/notifications" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Notification Preferences</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 