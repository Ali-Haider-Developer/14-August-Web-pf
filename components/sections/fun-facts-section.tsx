"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const facts = [
  {
    id: 1,
    number: 1847,
    label: "Years of Heritage",
    description: "Our cultural traditions span nearly two millennia",
    icon: "🏛️",
  },
  {
    id: 2,
    number: 14,
    label: "Sacred Angles",
    description: "Representing the 14 fundamental aspects of our culture",
    icon: "⭐",
  },
  {
    id: 3,
    number: 250,
    label: "Cultural Artifacts",
    description: "Preserved items in our digital collection",
    icon: "🏺",
  },
  {
    id: 4,
    number: 50,
    label: "Annual Festivals",
    description: "Celebrated throughout the year worldwide",
    icon: "🎭",
  },
  {
    id: 5,
    number: 12,
    label: "Languages Preserved",
    description: "Traditional languages documented and maintained",
    icon: "📜",
  },
  {
    id: 6,
    number: 89,
    label: "Countries Represented",
    description: "Global diaspora maintaining cultural connections",
    icon: "🌍",
  },
]

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(target * easeOutQuart))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(target)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, target, duration, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export default function FunFactsSection() {
  return (
    <section id="facts" className="min-h-screen py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">Amazing Facts</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover fascinating statistics and surprising facts about our cultural heritage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card rounded-lg shadow-premium p-8 text-center group cursor-pointer"
            >
              {/* Icon */}
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{fact.icon}</div>

              {/* Animated Number */}
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                <AnimatedCounter target={fact.number} />
                {fact.id === 2 && <span className="text-accent">°</span>}
                {fact.id !== 2 && fact.id !== 1 && <span className="text-accent">+</span>}
              </div>

              {/* Label */}
              <h3 className="text-xl font-serif font-semibold text-foreground mb-3">{fact.label}</h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">{fact.description}</p>

              {/* Decorative element */}
              <div className="mt-4 w-12 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Additional Interactive Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 bg-card rounded-xl shadow-premium p-8 text-center"
        >
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">Did You Know?</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">🎨</span>
                <p className="text-muted-foreground">
                  Our traditional art forms have influenced modern design movements across 5 continents.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">🎵</span>
                <p className="text-muted-foreground">
                  Traditional musical scales are still used in contemporary compositions worldwide.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">📚</span>
                <p className="text-muted-foreground">
                  Ancient texts contain mathematical concepts that predate similar Western discoveries by centuries.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">🌱</span>
                <p className="text-muted-foreground">
                  Traditional agricultural practices are being studied for modern sustainable farming solutions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
