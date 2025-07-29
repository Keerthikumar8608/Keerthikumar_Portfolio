import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { ImageProtection } from "@/components/image-protection"

export const metadata: Metadata = {
  title: "Keerthi kumar M - Mechanical Engineer & Automobile Enthusiast",
  description: "A showcase of engineering projects, certificates, and professional experience in mechanical engineering and design.",
  generator: "Next.js",
  keywords: ["engineering", "portfolio", "mechanical engineering", "CAD", "design", "projects"],
  authors: [{ name: "Portfolio Owner" }],
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico?v=2', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png?v=2', sizes: '180x180', type: 'image/png' }
    ],
  },
}

export const viewport = {
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
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon_io/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png?v=2" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
         <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ImageProtection />
            {children}
            <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle/>
            </div>
          </ThemeProvider>
      </body>
    </html>
  )
}
