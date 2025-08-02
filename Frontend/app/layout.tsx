import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
