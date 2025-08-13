"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Info, X, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"

const culturalSpots = [
  {
    id: 1,
    name: "Minar-e-Pakistan",
    coordinates: { x: 25, y: 35 },
    category: "Historical",
    description:
      "A national monument in Lahore commemorating the Lahore Resolution of 1940, which called for the creation of Pakistan. This 70-meter tall minaret stands as a symbol of Pakistan's independence movement.",
    significance: "Site where the Pakistan Resolution was passed, marking the formal demand for Pakistan",
    established: "1968",
    visitors: "500,000+ annually",
    color: "#22C55E",
    province: "Punjab",
  },
  {
    id: 2,
    name: "Mohenjo-daro",
    coordinates: { x: 60, y: 45 },
    category: "Archaeological",
    description:
      "One of the world's earliest urban settlements and a UNESCO World Heritage Site. This ancient Indus Valley city showcases advanced urban planning, drainage systems, and the rich heritage of the region.",
    significance: "UNESCO World Heritage Site representing the Indus Valley Civilization",
    established: "2600-1900 BCE",
    visitors: "100,000+ annually",
    color: "#3B82F6",
    province: "Sindh",
  },
  {
    id: 3,
    name: "Shalimar Gardens",
    coordinates: { x: 40, y: 65 },
    category: "Gardens",
    description:
      "A magnificent Mughal garden in Lahore, built by Emperor Shah Jahan in 1641. The garden features terraced levels, fountains, and pavilions representing the pinnacle of Mughal landscape architecture.",
    significance: "UNESCO World Heritage Site showcasing Mughal garden design",
    established: "1641 CE",
    visitors: "200,000+ annually",
    color: "#F59E0B",
    province: "Punjab",
  },
  {
    id: 4,
    name: "K2 Base Camp",
    coordinates: { x: 75, y: 25 },
    category: "Natural",
    description:
      "Base camp for K2, the world's second-highest mountain and Pakistan's crown jewel. This site represents the country's magnificent mountain heritage and attracts climbers from around the world.",
    significance: "Gateway to the world's second-highest peak and mountaineering heritage",
    established: "Ancient geological formation",
    visitors: "5,000+ trekkers annually",
    color: "#8B5CF6",
    province: "Gilgit-Baltistan",
  },
  {
    id: 5,
    name: "Taxila",
    coordinates: { x: 15, y: 70 },
    category: "Archaeological",
    description:
      "An ancient city and UNESCO World Heritage Site that was a major center of learning in the ancient world. Taxila represents the meeting point of various civilizations and religions.",
    significance: "UNESCO World Heritage Site and ancient center of learning",
    established: "6th century BCE",
    visitors: "150,000+ annually",
    color: "#10B981",
    province: "Punjab",
  },
  {
    id: 6,
    name: "Badshahi Mosque",
    coordinates: { x: 80, y: 60 },
    category: "Religious",
    description:
      "One of the largest mosques in the world, built by Mughal Emperor Aurangzeb in 1673. This architectural masterpiece represents the grandeur of Mughal Islamic architecture in Pakistan.",
    significance: "Iconic example of Mughal architecture and major religious site",
    established: "1673 CE",
    visitors: "1,000,000+ annually",
    color: "#DC2626",
    province: "Punjab",
  },
  {
    id: 7,
    name: "Mazar-e-Quaid",
    coordinates: { x: 50, y: 20 },
    category: "Memorial",
    description:
      "The mausoleum of Quaid-e-Azam Muhammad Ali Jinnah, the founder of Pakistan, located in Karachi. This white marble structure is a place of pilgrimage for Pakistanis and a symbol of national unity.",
    significance: "Final resting place of Pakistan's founder and symbol of national unity",
    established: "1970",
    visitors: "2,000,000+ annually",
    color: "#6B7280",
    province: "Sindh",
  },
  {
    id: 8,
    name: "Hunza Valley",
    coordinates: { x: 35, y: 80 },
    category: "Natural",
    description:
      "A breathtakingly beautiful valley in northern Pakistan, known for its stunning mountain scenery, ancient forts, and the longevity of its people. It represents Pakistan's natural and cultural heritage.",
    significance: "Gateway to the Karakoram mountains and showcase of northern culture",
    established: "Ancient settlement",
    visitors: "50,000+ annually",
    color: "#F97316",
    province: "Gilgit-Baltistan",
  },
]

const categories = [
  { name: "All", color: "#6B7280" },
  { name: "Historical", color: "#22C55E" },
  { name: "Archaeological", color: "#3B82F6" },
  { name: "Gardens", color: "#F59E0B" },
  { name: "Natural", color: "#8B5CF6" },
  { name: "Religious", color: "#DC2626" },
  { name: "Memorial", color: "#6B7280" },
]

export default function InteractiveMapSection() {
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredSpot, setHoveredSpot] = useState<number | null>(null)

  const filteredSpots =
    selectedCategory === "All" ? culturalSpots : culturalSpots.filter((spot) => spot.category === selectedCategory)

  const selectedSpotData = selectedSpot ? culturalSpots.find((spot) => spot.id === selectedSpot) : null

  return (
    <section id="map" className="min-h-screen py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">
            Pakistan's Cultural Heritage Map
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover Pakistan's most significant cultural and historical landmarks through our interactive heritage map.
            From ancient Indus Valley sites to Mughal architectural marvels, explore the locations that define our
            nation's rich cultural legacy.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className={`rounded-full transition-all duration-300 ${
                selectedCategory === category.name ? "shadow-lg" : "bg-card/50 backdrop-blur-sm hover:bg-primary/10"
              }`}
              style={{
                backgroundColor: selectedCategory === category.name ? category.color : undefined,
                borderColor: selectedCategory === category.name ? category.color : undefined,
              }}
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-gold/5 rounded-lg border-2 border-border/50 overflow-hidden shadow-premium">
              {/* Map Background - Pakistan outline */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                {/* Simplified Pakistan map outline */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                  {/* Pakistan border outline */}
                  <path
                    d="M20,20 L80,15 L85,30 L90,45 L85,60 L80,75 L70,85 L50,90 L30,85 L15,70 L10,50 L15,35 Z"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="none"
                    className="text-primary/30"
                  />
                  {/* Rivers - Indus system */}
                  <path
                    d="M30,15 Q40,30 45,50 Q50,70 55,85"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    fill="none"
                    className="text-blue-400"
                  />
                  {/* Mountain ranges */}
                  <polygon points="20,20 30,10 40,20" fill="currentColor" className="text-gray-400" />
                  <polygon points="70,15 80,5 90,15" fill="currentColor" className="text-gray-400" />
                </svg>
              </div>

              {/* Cultural Spots */}
              <AnimatePresence>
                {filteredSpots.map((spot) => (
                  <motion.button
                    key={spot.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{
                      left: `${spot.coordinates.x}%`,
                      top: `${spot.coordinates.y}%`,
                    }}
                    onClick={() => setSelectedSpot(spot.id)}
                    onMouseEnter={() => setHoveredSpot(spot.id)}
                    onMouseLeave={() => setHoveredSpot(null)}
                  >
                    {/* Pin */}
                    <div
                      className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300"
                      style={{ backgroundColor: spot.color }}
                    >
                      <MapPin size={12} className="text-white" />
                    </div>

                    {/* Hover Tooltip */}
                    <AnimatePresence>
                      {hoveredSpot === spot.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: -10, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg whitespace-nowrap pointer-events-none z-10"
                        >
                          <div className="font-semibold">{spot.name}</div>
                          <div className="text-xs opacity-80">{spot.province}</div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Pulse Animation */}
                    <div
                      className="absolute inset-0 rounded-full animate-ping opacity-30"
                      style={{ backgroundColor: spot.color }}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Navigation size={16} />
                  <span>Pakistan Heritage Sites</span>
                </div>
                <div className="text-xs text-muted-foreground">Click markers to explore</div>
              </div>

              {/* Province Labels */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50">
                <div className="text-xs font-semibold text-primary mb-1">Provinces</div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>Punjab • Sindh</div>
                  <div>KPK • Balochistan</div>
                  <div>Gilgit-Baltistan</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Spot Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {selectedSpotData ? (
              <motion.div
                key={selectedSpotData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card p-6 rounded-lg shadow-premium border border-border/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold mb-2" style={{ color: selectedSpotData.color }}>
                      {selectedSpotData.name}
                    </h3>
                    <div className="flex gap-2 mb-2">
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground">
                        {selectedSpotData.category}
                      </div>
                      <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                        {selectedSpotData.province}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedSpot(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={16} />
                  </Button>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{selectedSpotData.description}</p>

                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-primary">Cultural Significance:</strong>
                    <p className="text-muted-foreground mt-1">{selectedSpotData.significance}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong className="text-primary">Established:</strong>
                      <p className="text-muted-foreground">{selectedSpotData.established}</p>
                    </div>
                    <div>
                      <strong className="text-primary">Annual Visitors:</strong>
                      <p className="text-muted-foreground">{selectedSpotData.visitors}</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6" style={{ backgroundColor: selectedSpotData.color }}>
                  Plan Your Visit
                </Button>
              </motion.div>
            ) : (
              <div className="bg-card p-6 rounded-lg shadow-premium border border-border/50 text-center">
                <Info size={48} className="mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold text-primary mb-2">Explore Pakistan's Heritage</h3>
                <p className="text-muted-foreground text-sm">
                  Click on any marker on the map to discover Pakistan's most significant cultural and historical
                  landmarks, from ancient civilizations to modern monuments.
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-card p-6 rounded-lg shadow-premium border border-border/50">
              <h4 className="text-lg font-semibold text-primary mb-4">Pakistan Heritage Overview</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{culturalSpots.length}</div>
                  <div className="text-muted-foreground">Heritage Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">4M+</div>
                  <div className="text-muted-foreground">Annual Visitors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6</div>
                  <div className="text-muted-foreground">UNESCO Sites</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">5000+</div>
                  <div className="text-muted-foreground">Years History</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Heritage Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">
            Pakistan's Living Heritage
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            From the ancient Indus Valley Civilization to the grandeur of Mughal architecture, Pakistan's cultural
            landscape tells the story of human civilization spanning over 5,000 years. Each site represents a chapter in
            our shared heritage, connecting us to our ancestors and inspiring future generations.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🏛️</div>
              <div className="text-sm text-muted-foreground">Ancient Civilizations</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🕌</div>
              <div className="text-sm text-muted-foreground">Islamic Architecture</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🏔️</div>
              <div className="text-sm text-muted-foreground">Natural Wonders</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🇵🇰</div>
              <div className="text-sm text-muted-foreground">National Monuments</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
