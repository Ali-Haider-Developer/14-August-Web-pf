"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import ThreeCanvas from "@/components/three-canvas"
import WavingFlag from "@/components/3d/waving-flag"
import PakistanFlag from "@/components/3d/pakistani-flag"
import { Button } from "@/components/ui/button"
import { ChevronDown, MapPin, Calendar, Award, Star, Users, Globe } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-primary relative overflow-hidden pt-20"
    >
      {/* Background 3D Pakistani Flag - positioned on left */}
      <div className="absolute left-0 top-0 w-1/2 h-full z-0">
        <ThreeCanvas
          camera={{ position: [-2, 0, 8], fov: 60 }}
          controls={false}
          environment="sunset"
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <PakistanFlag />
            <group position={[1, 0, 1]}>
              <WavingFlag />
            </group>
          </Suspense>
        </ThreeCanvas>
      </div>

      {/* Enhanced gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />

      {/* Hero Content - Split Layout */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen">
        {/* Left Side - Photo and Flag Area */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start space-y-8"
        >
          {/* Profile Photo */}
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-72 h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gold shadow-premium"
            >
              <Image src="/images/ali-haider.png" alt="Ali Haider" fill className="object-cover" priority />
            </motion.div>

            {/* Decorative ring around photo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -inset-4 border-2 border-gold/30 rounded-full"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            {/* Cultural Badge */}
            <div className="bg-green-dark/90 backdrop-blur-sm px-8 py-4 rounded-full border border-gold/40 shadow-lg">
              <span className="text-gold font-semibold text-xl">Cultural Heritage Advocate</span>
            </div>

            {/* Professional Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Professional Background</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-white/90">Digital Innovation Specialist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-white/90">Community Builder & Cultural Curator</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-white/90">Pakistan Heritage Ambassador</span>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-green-dark/80 to-green-primary/80 backdrop-blur-sm rounded-xl p-6 border border-gold/30">
              <h3 className="text-lg font-semibold text-gold mb-3">Mission</h3>
              <p className="text-white/95 leading-relaxed">
                "Preserving Pakistan's rich cultural heritage through innovative digital experiences, connecting our
                diaspora worldwide with the stories, traditions, and values that define our national identity."
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Name and Details */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-white space-y-8"
        >
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-6xl lg:text-8xl font-serif font-bold leading-tight"
            >
              <span className="block text-white drop-shadow-lg">Ali Haider</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-3xl lg:text-4xl font-light text-gold drop-shadow-md"
            >
              Founder of 14 August
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-gold/20 backdrop-blur-sm px-6 py-3 rounded-full border border-gold/40 inline-block"
            >
              <span className="text-white font-medium text-lg">Pakistan Independence Day Tribute</span>
            </motion.div>
          </div>

          {/* Enhanced Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-6"
          >
            <p className="text-2xl lg:text-3xl leading-relaxed max-w-2xl font-light">
              Celebrating Pakistan's Independence through{" "}
              <span className="font-semibold text-gold drop-shadow-sm">14 Cultural Perspectives</span>
            </p>

            <p className="text-xl leading-relaxed max-w-2xl text-white drop-shadow-sm">
              From the historic moment of August 14, 1947, to the vibrant cultural tapestry of modern Pakistan, explore
              our nation's journey through art, tradition, and innovation.
            </p>

            {/* Enhanced Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
                <MapPin className="w-8 h-8 text-gold mb-3" />
                <p className="text-sm text-white/80 mb-1">Based in</p>
                <p className="font-semibold text-lg text-white">Karachi, Pakistan</p>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
                <Calendar className="w-8 h-8 text-gold mb-3" />
                <p className="text-sm text-white/80 mb-1">Independence</p>
                <p className="font-semibold text-lg text-white">14 August 1947</p>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/30 shadow-lg">
                <Award className="w-8 h-8 text-gold mb-3" />
                <p className="text-sm text-white/80 mb-1">Vision</p>
                <p className="font-semibold text-lg text-white">Cultural Preservation</p>
              </div>
            </div>

            {/* Enhanced Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/30">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold text-gold mb-1">76+</div>
                <div className="text-sm text-white/90">Years of Freedom</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold text-gold mb-1">14</div>
                <div className="text-sm text-white/90">Cultural Angles</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold text-gold mb-1">200M+</div>
                <div className="text-sm text-white/90">Pakistani Hearts</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-3xl font-bold text-gold mb-1">∞</div>
                <div className="text-sm text-white/90">Stories to Tell</div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 pt-6"
          >
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-black font-semibold px-10 py-5 text-xl rounded-full shadow-premium transform hover:scale-105 transition-all duration-300"
              onClick={scrollToAbout}
            >
              Explore Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/40 text-white hover:bg-white/20 px-10 py-5 text-xl rounded-full backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Connect With Me
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20"
        >
          <ChevronDown size={32} />
        </motion.button>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-5">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
    </section>
  )
}
