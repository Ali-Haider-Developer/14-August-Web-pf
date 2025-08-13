"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"

const festivalsData = [
  {
    id: 1,
    name: "Pakistan Independence Day",
    date: "August 14, 2024",
    location: "Minar-e-Pakistan, Lahore",
    description:
      "Celebrate Pakistan's Independence Day with grand flag hoisting ceremonies, patriotic songs, cultural performances, and fireworks. The nation comes together to honor the sacrifices of our founding fathers and celebrate our freedom.",
    image: "/pakistani-independence-day.jpg",
    highlights: ["Flag Hoisting Ceremony", "National Anthem", "Cultural Performances", "Fireworks Display"],
    attendees: "50,000+",
    color: "#22C55E",
    significance: "Commemorates Pakistan's independence from British rule on August 14, 1947",
  },
  {
    id: 2,
    name: "Eid ul-Fitr Celebration",
    date: "April 10-12, 2024",
    location: "Badshahi Mosque, Lahore",
    description:
      "The festival of breaking the fast marks the end of Ramadan with special prayers, family gatherings, traditional sweets, and acts of charity. Communities come together to celebrate this joyous occasion with feasts and gift-giving.",
    image: "/eid-ul-fitr-celebration.jpg",
    highlights: ["Eid Prayers", "Traditional Sweets", "Family Gatherings", "Charity Distribution"],
    attendees: "100,000+",
    color: "#F59E0B",
    significance: "One of the most important Islamic festivals celebrating the end of Ramadan",
  },
  {
    id: 3,
    name: "Shandur Polo Festival",
    date: "July 7-9, 2024",
    location: "Shandur Pass, Gilgit-Baltistan",
    description:
      "The world's highest polo ground hosts this spectacular festival featuring traditional polo matches between Gilgit and Chitral teams, accompanied by folk music, dancing, and camping under the stars in the Hindukush mountains.",
    image: "/shandur-polo-festival.jpg",
    highlights: ["High-Altitude Polo Matches", "Folk Music & Dance", "Mountain Camping", "Traditional Crafts"],
    attendees: "15,000+",
    color: "#8B5CF6",
    significance: "Showcases northern Pakistan's sporting heritage and mountain culture",
  },
  {
    id: 4,
    name: "Basant Kite Festival",
    date: "February 15-17, 2024",
    location: "Lahore, Punjab",
    description:
      "Welcome spring with the colorful Basant festival where the skies fill with vibrant kites, traditional music echoes through the streets, and families gather on rooftops to celebrate the changing season with joy and festivity.",
    image: "/basant-kite-festival.jpg",
    highlights: ["Kite Flying Competition", "Rooftop Celebrations", "Traditional Music", "Spring Festivities"],
    attendees: "200,000+",
    color: "#06B6D4",
    significance: "Traditional Punjabi festival celebrating the arrival of spring",
  },
  {
    id: 5,
    name: "Lok Virsa Folk Festival",
    date: "November 20-22, 2024",
    location: "Islamabad, ICT",
    description:
      "A grand celebration of Pakistan's diverse folk heritage featuring traditional music, dance performances, handicrafts exhibitions, and regional cuisine from all four provinces, showcasing the rich cultural tapestry of the nation.",
    image: "/lok-virsa-folk-festival.jpg",
    highlights: ["Folk Music Performances", "Traditional Dance", "Handicrafts Exhibition", "Regional Cuisine"],
    attendees: "75,000+",
    color: "#DC2626",
    significance: "Celebrates Pakistan's diverse regional cultures and folk traditions",
  },
  {
    id: 6,
    name: "Quaid-e-Azam Birthday",
    date: "December 25, 2024",
    location: "Mazar-e-Quaid, Karachi",
    description:
      "Honor the founder of Pakistan, Muhammad Ali Jinnah, with special ceremonies, educational programs, and cultural events that celebrate his vision for Pakistan and his contributions to the independence movement.",
    image: "/quaid-e-azam-birthday.jpg",
    highlights: ["Memorial Ceremony", "Educational Programs", "Cultural Exhibitions", "Tribute Performances"],
    attendees: "30,000+",
    color: "#059669",
    significance: "Commemorates the birth of Pakistan's founder and first Governor-General",
  },
]

export default function FestivalsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % festivalsData.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % festivalsData.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + festivalsData.length) % festivalsData.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentFestival = festivalsData[currentIndex]

  return (
    <section id="festivals" className="min-h-screen py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Animated Particle Background */}
      <ParticleBackground color={currentFestival.color} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">Pakistani Festivals & Events</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Experience the vibrant celebrations and traditional festivals that unite Pakistan throughout the year. From
            Independence Day to regional folk festivals, discover the events that showcase our rich cultural heritage
            and national pride.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]"
            >
              {/* Festival Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-premium">
                  <img
                    src={currentFestival.image || "/placeholder.svg"}
                    alt={currentFestival.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Festival Badge */}
                  <div className="absolute top-4 left-4">
                    <div
                      className="px-4 py-2 rounded-full text-white font-semibold text-sm backdrop-blur-sm border border-white/20"
                      style={{ backgroundColor: `${currentFestival.color}80` }}
                    >
                      {currentFestival.date}
                    </div>
                  </div>

                  {/* Attendees Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm">
                    <Users size={16} className="inline mr-1" />
                    {currentFestival.attendees}
                  </div>
                </div>
              </div>

              {/* Festival Content */}
              <div className="space-y-6">
                <div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-3xl md:text-4xl font-serif font-bold mb-4"
                    style={{ color: currentFestival.color }}
                  >
                    {currentFestival.name}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex items-center gap-4 mb-6 text-muted-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm">{currentFestival.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span className="text-sm">{currentFestival.location}</span>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg text-muted-foreground leading-relaxed mb-6"
                  >
                    {currentFestival.description}
                  </motion.p>
                </div>

                {/* Cultural Significance */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="bg-card/50 p-4 rounded-lg border border-border/30 mb-6"
                >
                  <h4 className="text-sm font-semibold text-primary mb-2">Cultural Significance</h4>
                  <p className="text-sm text-muted-foreground">{currentFestival.significance}</p>
                </motion.div>

                {/* Festival Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h4 className="text-lg font-semibold text-primary mb-4">Festival Highlights</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {currentFestival.highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="flex items-center gap-2 bg-card/50 p-3 rounded-lg border border-border/30"
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentFestival.color }} />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Button size="lg" className="rounded-full px-8" style={{ backgroundColor: currentFestival.color }}>
                    Learn More About This Festival
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="rounded-full bg-card/50 backdrop-blur-sm"
            >
              <ChevronLeft size={16} />
            </Button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {festivalsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  style={{
                    backgroundColor: index === currentIndex ? currentFestival.color : undefined,
                  }}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="rounded-full bg-card/50 backdrop-blur-sm"
            >
              <ChevronRight size={16} />
            </Button>
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-muted-foreground hover:text-primary"
            >
              {isAutoPlaying ? "Pause Auto-play" : "Resume Auto-play"}
            </Button>
          </div>
        </div>

        {/* Festival Calendar Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">
            Pakistan's Festival Calendar
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            Throughout the year, Pakistan celebrates a rich tapestry of festivals that reflect our Islamic heritage,
            regional diversity, and national pride. From religious observances to cultural celebrations, each festival
            strengthens the bonds of community and preserves our traditions for future generations.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">6</div>
              <div className="text-sm text-muted-foreground">Major Festivals</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">500K+</div>
              <div className="text-sm text-muted-foreground">Total Participants</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">4</div>
              <div className="text-sm text-muted-foreground">Provinces Represented</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">76+</div>
              <div className="text-sm text-muted-foreground">Years of Celebration</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
