import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import '../styles/mobile-enhancements.css'
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'Techpotli - Your Tech Shopping Destination',
  description: 'Discover the latest tech products at amazing prices',
  generator: 'Techpotli',
  icons: {
    icon: [
      { url: '/New Techpotli_favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/New Techpotli_favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/New Techpotli_favicon.png',
    shortcut: '/New Techpotli_favicon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased font-serif`}>
        <AuthProvider>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
