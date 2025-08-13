import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "14 August Pakistan - Independence Day Heritage by Ali Haider",
  description:
    "Celebrate Pakistan's Independence Day with Ali Haider's immersive digital experience. Explore Pakistan's rich heritage, freedom struggle, cultural symbols, and national pride through interactive 3D elements, historical galleries, and patriotic storytelling.",
  keywords:
    "Pakistan, 14 August, Independence Day, Ali Haider, Pakistan heritage, freedom struggle, Quaid-e-Azam, Pakistani culture, national pride, Pakistan history, interactive 3D, Pakistani flag",
  authors: [{ name: "Ali Haider" }],
  generator: "v0.app",
  openGraph: {
    title: "14 August Pakistan - Independence Day Heritage",
    description:
      "Experience Pakistan's Independence Day through Ali Haider's digital tribute to our nation's heritage and freedom struggle.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "14 August Pakistan - Independence Day Heritage",
    description: "Celebrate Pakistan's independence with interactive heritage experiences by Ali Haider.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#16a34a" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans overflow-x-hidden">{children}</body>
    </html>
  )
}
