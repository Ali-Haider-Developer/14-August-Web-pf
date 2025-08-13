"use client"

import { useState, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import ThreeCanvas from "@/components/three-canvas"
import InteractiveSymbol from "@/components/3d/interactive-symbol"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react"

const symbolData = [
  {
    id: "crescent",
    name: "Crescent and Star",
    meaning:
      "The national symbol of Pakistan representing progress, light, and knowledge. The crescent symbolizes progress and the star represents light and knowledge.",
    details:
      "Adopted as Pakistan's national symbol, the crescent and star have deep Islamic significance. The crescent represents the lunar calendar and the cyclical nature of time, while the five-pointed star represents the five pillars of Islam. Together, they symbolize Pakistan's Islamic identity and commitment to progress through knowledge.",
    significance: "Featured on the national flag, government emblems, and official documents throughout Pakistan.",
    color: "#2E8B57",
    culturalContext:
      "Islamic symbolism dating back to the Ottoman Empire, adopted by Pakistan to represent its Islamic identity and aspirations for progress.",
    modernUsage:
      "Used in contemporary Pakistani art, architecture, and design as a symbol of national pride and Islamic heritage.",
  },
  {
    id: "cypress",
    name: "Cypress Tree (Sarv)",
    meaning:
      "Symbol of immortality, steadfastness, and spiritual growth in Persian and Urdu poetry. Represents the connection between earth and heaven.",
    details:
      "The cypress tree holds special significance in Pakistani culture, particularly in Urdu poetry where it's often used as a metaphor for a beloved's stature or spiritual ascension. In Islamic tradition, it represents paradise and eternal life. The tree's upward growth symbolizes the soul's journey toward the divine.",
    significance: "Frequently mentioned in the poetry of Allama Iqbal, Mirza Ghalib, and other renowned Urdu poets.",
    color: "#8B4513",
    culturalContext:
      "Rooted in Persian literary tradition, the cypress became integral to Urdu poetry and Pakistani cultural expression.",
    modernUsage:
      "Still used in contemporary Urdu poetry, garden design, and as a motif in Pakistani textiles and crafts.",
  },
  {
    id: "peacock",
    name: "Peacock (Mor)",
    meaning:
      "National bird of Pakistan representing beauty, grace, and pride. In Sufi tradition, it symbolizes the soul's beauty and spiritual transformation.",
    details:
      "The peacock holds a special place in Pakistani culture as the national bird. In Sufi poetry and philosophy, the peacock represents the beauty of the soul and its potential for spiritual transformation. The bird's magnificent plumage symbolizes the diversity and richness of Pakistani culture, while its dance represents joy and celebration.",
    significance: "Featured in truck art, traditional crafts, and as a popular motif in Pakistani wedding decorations.",
    color: "#4682B4",
    culturalContext:
      "Revered in both Hindu and Islamic traditions, the peacock became a unifying symbol in Pakistani culture.",
    modernUsage:
      "Widely used in Pakistani fashion, jewelry design, and contemporary art as a symbol of natural beauty and cultural pride.",
  },
  {
    id: "rose",
    name: "Rose (Gulab)",
    meaning:
      "Symbol of love, beauty, and the Prophet Muhammad (PBUH) in Islamic tradition. Represents divine love and spiritual fragrance.",
    details:
      "The rose holds profound significance in Pakistani and Islamic culture. It's associated with the Prophet Muhammad (PBUH) and represents divine love, beauty, and spiritual fragrance. In Urdu poetry, the rose is often used to symbolize the beloved or divine beauty. The tradition of rose water (gulab jal) and rose petals in religious and cultural ceremonies is deeply rooted in Pakistani customs.",
    significance:
      "Used in religious ceremonies, weddings, and cultural celebrations. Rose water is sprinkled on guests as a sign of respect.",
    color: "#DAA520",
    culturalContext:
      "Central to Islamic tradition and Persian poetry, the rose became an essential element of Pakistani cultural expression.",
    modernUsage:
      "Featured in Pakistani perfumes, traditional sweets, and as a popular motif in contemporary Pakistani art and design.",
  },
]

export default function SymbolMeaningSection() {
  const [activeSymbol, setActiveSymbol] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [showDetails, setShowDetails] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.3, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.5))
  }

  const handleReset = () => {
    setZoomLevel(1)
  }

  return (
    <section id="symbols" className="min-h-screen py-20 px-4 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">Sacred Symbols of Pakistan</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover the profound meanings behind Pakistan's most cherished symbols. From the national crescent and star
            to the poetic cypress tree, each symbol carries centuries of cultural wisdom and spiritual significance that
            continues to inspire Pakistani identity today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Symbol Selection */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-serif font-semibold text-primary mb-6">Choose a Symbol</h3>
            {symbolData.map((symbol, index) => (
              <motion.button
                key={symbol.id}
                onClick={() => setActiveSymbol(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  activeSymbol === index
                    ? "bg-primary/10 border-primary shadow-lg"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: symbol.color }} />
                  <h4 className="font-semibold text-primary">{symbol.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{symbol.meaning}</p>
              </motion.button>
            ))}
          </motion.div>

          {/* Interactive 3D Symbol */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              ref={canvasRef}
              className="h-96 md:h-[500px] relative bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg overflow-hidden"
            >
              <ThreeCanvas
                camera={{ position: [0, 0, 5 / zoomLevel], fov: 50 }}
                controls={true}
                environment="studio"
                className="w-full h-full"
              >
                <Suspense fallback={null}>
                  <InteractiveSymbol
                    symbolType={symbolData[activeSymbol].id}
                    color={symbolData[activeSymbol].color}
                    zoomLevel={zoomLevel}
                  />
                </Suspense>
              </ThreeCanvas>

              {/* Control Panel */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="sm" variant="outline" onClick={handleZoomIn} className="bg-card/90 backdrop-blur-sm">
                  <ZoomIn size={16} />
                </Button>
                <Button size="sm" variant="outline" onClick={handleZoomOut} className="bg-card/90 backdrop-blur-sm">
                  <ZoomOut size={16} />
                </Button>
                <Button size="sm" variant="outline" onClick={handleReset} className="bg-card/90 backdrop-blur-sm">
                  <RotateCcw size={16} />
                </Button>
              </div>

              {/* Info Toggle */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDetails(!showDetails)}
                className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm"
              >
                <Info size={16} />
              </Button>
            </div>
          </motion.div>

          {/* Symbol Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-serif font-semibold mb-4" style={{ color: symbolData[activeSymbol].color }}>
                {symbolData[activeSymbol].name}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{symbolData[activeSymbol].meaning}</p>
            </div>

            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="bg-card p-4 rounded-lg border border-border/50">
                  <h4 className="font-semibold text-primary mb-2">Historical Context</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{symbolData[activeSymbol].details}</p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-border/50">
                  <h4 className="font-semibold text-primary mb-2">Cultural Significance</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {symbolData[activeSymbol].significance}
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-border/50">
                  <h4 className="font-semibold text-primary mb-2">Cultural Context</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {symbolData[activeSymbol].culturalContext}
                  </p>
                </div>

                <div className="bg-card p-4 rounded-lg border border-border/50">
                  <h4 className="font-semibold text-primary mb-2">Modern Usage</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {symbolData[activeSymbol].modernUsage}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Zoom Level Indicator */}
            <div className="bg-card p-3 rounded-lg border border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">Zoom Level</span>
                <span className="text-sm text-muted-foreground">{Math.round(zoomLevel * 100)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(zoomLevel / 3) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <strong>Interactive Guide:</strong> Drag to rotate the symbol, use mouse wheel to zoom, or use the control
              buttons for precise adjustments. Click the info button to reveal detailed cultural context and historical
              significance.
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">
            Symbols in Pakistani Culture
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            These symbols are not mere decorations but living expressions of Pakistani identity. They appear in our art,
            architecture, literature, and daily life, connecting us to our spiritual heritage while inspiring
            contemporary creativity. Each symbol tells a story of our nation's journey from ancient civilizations to
            modern Pakistan.
          </p>
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🌙</div>
              <div className="text-sm text-muted-foreground">National Identity</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🌲</div>
              <div className="text-sm text-muted-foreground">Literary Heritage</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🦚</div>
              <div className="text-sm text-muted-foreground">Natural Beauty</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">🌹</div>
              <div className="text-sm text-muted-foreground">Spiritual Love</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
