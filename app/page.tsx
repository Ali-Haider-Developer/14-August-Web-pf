"use client"

import { Suspense, lazy } from "react"
import Navigation from "@/components/navigation"
import LoadingSpinner from "@/components/loading-spinner"

// Lazy load sections for better performance
const HeroSection = lazy(() => import("@/components/sections/hero-section"))
const AboutSection = lazy(() => import("@/components/sections/about-section"))
const CulturalHistorySection = lazy(() => import("@/components/sections/cultural-history-section"))
const SymbolMeaningSection = lazy(() => import("@/components/sections/symbol-meaning-section"))
const GallerySection = lazy(() => import("@/components/sections/gallery-section"))
const FestivalsSection = lazy(() => import("@/components/sections/festivals-section"))
const QuotesSection = lazy(() => import("@/components/sections/quotes-section"))
const InteractiveMapSection = lazy(() => import("@/components/sections/interactive-map-section"))
const MerchandiseSection = lazy(() => import("@/components/sections/merchandise-section"))
const VideoShowcaseSection = lazy(() => import("@/components/sections/video-showcase-section"))
const FunFactsSection = lazy(() => import("@/components/sections/fun-facts-section"))
const ContactSection = lazy(() => import("@/components/sections/contact-section"))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="relative">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <CulturalHistorySection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <SymbolMeaningSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <QuotesSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <InteractiveMapSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <FunFactsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ContactSection />
        </Suspense>
      </main>
    </div>
  )
}
