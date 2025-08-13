"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import ThreeCanvas from "@/components/three-canvas"
import TimelineIcon3D from "@/components/3d/timeline-icon-3d"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const timelineData = [
  {
    year: "Indus Valley",
    period: "3300-1300 BCE",
    title: "Cradle of Civilization",
    description:
      "The Indus Valley Civilization flourished in present-day Pakistan, creating one of the world's earliest urban civilizations. Harappa and Mohenjo-daro showcased advanced city planning, sophisticated drainage systems, and standardized weights and measures that influenced the region for millennia.",
    icon: "temple",
    color: "#8B4513",
    highlights: ["Urban Planning", "Trade Networks", "Standardized Systems"],
    keyFacts: [
      "First planned cities with grid systems",
      "Advanced water management and sewerage",
      "Sophisticated bronze and pottery crafts",
      "Peaceful society with no evidence of warfare",
    ],
  },
  {
    year: "Islamic Golden Age",
    period: "711-1526 CE",
    title: "Cultural Renaissance",
    description:
      "The arrival of Islam brought a golden age of learning, architecture, and cultural synthesis. From the Umayyad conquest to the Mughal Empire, this period saw the creation of magnificent monuments, advancement in sciences, and the development of Urdu literature that defines Pakistani culture today.",
    icon: "scroll",
    color: "#DAA520",
    highlights: ["Architectural Marvels", "Scientific Advancement", "Literary Flourishing"],
    keyFacts: [
      "Construction of Badshahi Mosque and Shalimar Gardens",
      "Development of Urdu as a literary language",
      "Advancement in astronomy, mathematics, and medicine",
      "Synthesis of Persian, Arabic, and local traditions",
    ],
  },
  {
    year: "Mughal Empire",
    period: "1526-1857 CE",
    title: "Imperial Grandeur",
    description:
      "The Mughal Empire reached its zenith in the Indian subcontinent, leaving an indelible mark on Pakistani culture. From Akbar's policy of religious tolerance to Shah Jahan's architectural masterpieces, this era established many traditions that continue to define Pakistani identity.",
    icon: "bridge",
    color: "#4682B4",
    highlights: ["Architectural Legacy", "Cultural Synthesis", "Administrative Systems"],
    keyFacts: [
      "Construction of Lahore Fort and Wazir Khan Mosque",
      "Development of Mughal miniature painting",
      "Establishment of efficient administrative systems",
      "Promotion of arts, crafts, and trade",
    ],
  },
  {
    year: "British Colonial",
    period: "1857-1947 CE",
    title: "Struggle for Identity",
    description:
      "The British colonial period was marked by both cultural suppression and renaissance. While traditional systems were disrupted, this era also saw the emergence of modern education, the Pakistan movement, and leaders like Allama Iqbal and Quaid-e-Azam who shaped the vision of an independent Pakistan.",
    icon: "star",
    color: "#9370DB",
    highlights: ["Independence Movement", "Educational Reform", "Cultural Revival"],
    keyFacts: [
      "Establishment of Aligarh Muslim University",
      "Poetry of Allama Iqbal inspiring the Pakistan movement",
      "Development of modern Urdu literature and journalism",
      "Formation of All-India Muslim League in 1906",
    ],
  },
  {
    year: "Birth of Pakistan",
    period: "1947-1971 CE",
    title: "Nation Building",
    description:
      "The creation of Pakistan on August 14, 1947, marked the beginning of a new chapter. Despite challenges, this period saw the establishment of national institutions, the adoption of Urdu as the national language, and the development of a distinct Pakistani identity that celebrated both Islamic values and regional diversity.",
    icon: "gear",
    color: "#DC143C",
    highlights: ["National Identity", "Institution Building", "Cultural Integration"],
    keyFacts: [
      "Adoption of the national flag and anthem",
      "Establishment of Pakistan Television and Radio",
      "Development of Pakistani cinema and music",
      "Integration of diverse regional cultures",
    ],
  },
  {
    year: "Modern Pakistan",
    period: "1971-Present",
    title: "Cultural Renaissance",
    description:
      "Contemporary Pakistan has witnessed a cultural renaissance with the rise of Pakistani music, fashion, cuisine, and digital media on the global stage. From Nusrat Fateh Ali Khan's qawwali to modern-day tech innovations, Pakistan continues to contribute to world culture while preserving its rich heritage.",
    icon: "globe",
    color: "#2E8B57",
    highlights: ["Global Recognition", "Digital Innovation", "Cultural Export"],
    keyFacts: [
      "International recognition of Pakistani music and arts",
      "Growth of Pakistani fashion and textile industry",
      "Development of Pakistani cuisine as a global phenomenon",
      "Emergence of Pakistani tech startups and digital culture",
    ],
  },
]

export default function CulturalHistorySection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % timelineData.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + timelineData.length) % timelineData.length)
  }

  return (
    <section id="history" className="min-h-screen py-20 px-4 bg-muted/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">Pakistan's Cultural Journey</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From the ancient Indus Valley Civilization to modern-day Pakistan, explore 5,000 years of rich cultural
            heritage that shaped our national identity and continues to inspire the world.
          </p>
        </motion.div>

        {/* Timeline Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 bg-card/50 backdrop-blur-sm p-2 rounded-full shadow-premium">
            {timelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>
        </div>

        {/* Main Timeline Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          {/* 3D Icon Side */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="h-96 md:h-[500px] relative">
              <ThreeCanvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                controls={true}
                environment="sunset"
                className="w-full h-full rounded-lg"
              >
                <Suspense fallback={null}>
                  <TimelineIcon3D iconType={timelineData[activeIndex].icon} color={timelineData[activeIndex].color} />
                </Suspense>
              </ThreeCanvas>

              {/* Era indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-premium border border-border/50"
              >
                <div className="text-sm font-semibold text-primary">{timelineData[activeIndex].period}</div>
                <div className="text-xs text-muted-foreground">Historical Period</div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-premium border border-border/50"
              >
                <div className="text-sm font-semibold text-gold">Cultural Impact</div>
                <div className="text-xs text-muted-foreground">Drag to explore</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            key={`content-${activeIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <motion.h3
                className="text-3xl md:text-4xl font-serif font-bold mb-4"
                style={{ color: timelineData[activeIndex].color }}
              >
                {timelineData[activeIndex].title}
              </motion.h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {timelineData[activeIndex].description}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-primary">Key Achievements</h4>
              <div className="grid gap-2">
                {timelineData[activeIndex].highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-3 bg-card/50 p-3 rounded-lg border border-border/30"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: timelineData[activeIndex].color }}
                    />
                    <span className="text-muted-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-primary">Historical Facts</h4>
              <div className="bg-card/30 p-4 rounded-lg border border-border/30">
                <ul className="space-y-2">
                  {timelineData[activeIndex].keyFacts.map((fact, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span>{fact}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 pt-6">
              <Button variant="outline" size="sm" onClick={prevSlide} className="rounded-full bg-transparent">
                <ChevronLeft size={16} />
              </Button>
              <div className="text-sm text-muted-foreground">
                {activeIndex + 1} of {timelineData.length} eras
              </div>
              <Button variant="outline" size="sm" onClick={nextSlide} className="rounded-full bg-transparent">
                <ChevronRight size={16} />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Timeline Progress Bar */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((activeIndex + 1) / timelineData.length) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>3300 BCE - Indus Valley</span>
            <span>Present - Modern Pakistan</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">Living Heritage</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            Each era has contributed unique elements to Pakistan's cultural DNA. From ancient urban planning principles
            still used today, to Mughal architectural styles that define our cities, to the independence movement that
            gave us our national identity - our past continues to shape our present and inspire our future.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">Years of Continuous Culture</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">6</div>
              <div className="text-sm text-muted-foreground">Major Historical Eras</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Stories Yet to be Told</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
