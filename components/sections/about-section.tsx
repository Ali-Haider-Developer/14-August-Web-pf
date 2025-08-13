"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import ThreeCanvas from "@/components/three-canvas"
import CulturalSymbol from "@/components/3d/cultural-symbol"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-20 px-4 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">About Our Heritage</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover the rich tapestry of cultural traditions and stories that shape our identity through fourteen
            unique perspectives, each offering a window into our shared human experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-primary">The 14 August Story</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                Born from the significance of August 14th - Pakistan's Independence Day - "14 August" represents
                fourteen distinct perspectives through which we explore our rich cultural heritage. From the ancient
                civilizations of the Indus Valley to the vibrant traditions of modern Pakistan, each angle illuminates a
                different facet of our national identity.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                Our platform bridges generations by preserving traditional arts, celebrating regional diversity, and
                showcasing how Pakistani culture continues to evolve while honoring its roots. Through immersive 3D
                experiences, interactive storytelling, and community engagement, we create connections that transcend
                geographical boundaries.
              </p>

              <div className="bg-card/50 p-6 rounded-lg border border-border/30 mb-6">
                <h4 className="text-xl font-semibold mb-4 text-primary">Our Focus Areas</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    Traditional Arts & Crafts (Truck Art, Calligraphy, Textiles)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    Regional Cuisines & Culinary Heritage
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    Music & Poetry (Qawwali, Folk Songs, Urdu Literature)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    Architectural Marvels & Historical Sites
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    Festivals & Religious Celebrations
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card p-6 rounded-lg shadow-premium border border-border/50"
              >
                <div className="text-3xl font-bold text-primary mb-2">14</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Cultural Perspectives</div>
                <p className="text-sm text-muted-foreground">
                  Each representing a unique aspect of Pakistani heritage and identity
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-card p-6 rounded-lg shadow-premium border border-border/50"
              >
                <div className="text-3xl font-bold text-gold mb-2">1947</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Independence Year</div>
                <p className="text-sm text-muted-foreground">
                  The foundation of our nation and the beginning of our cultural journey
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-full shadow-premium"
              >
                Explore Our Story
              </Button>
            </motion.div>
          </motion.div>

          {/* 3D Symbol Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="h-96 md:h-[500px] relative">
              <ThreeCanvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                controls={true}
                environment="studio"
                className="w-full h-full rounded-lg"
              >
                <Suspense fallback={null}>
                  <CulturalSymbol />
                </Suspense>
              </ThreeCanvas>

              {/* Floating info cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-premium border border-border/50"
              >
                <div className="text-sm font-semibold text-primary">Sacred Geometry</div>
                <div className="text-xs text-muted-foreground">Interactive 3D Symbol</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-premium border border-border/50"
              >
                <div className="text-sm font-semibold text-gold">Cultural Unity</div>
                <div className="text-xs text-muted-foreground">Drag to explore</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-12 text-primary">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural Preservation",
                description:
                  "Safeguarding Pakistan's rich heritage through digital innovation and community engagement, ensuring traditions survive for future generations",
                icon: "🏛️",
              },
              {
                title: "Educational Excellence",
                description:
                  "Making Pakistani culture accessible worldwide through interactive experiences, virtual museums, and immersive storytelling",
                icon: "📚",
              },
              {
                title: "National Unity",
                description:
                  "Celebrating the diversity within Pakistan while highlighting the common threads that bind us as one nation",
                icon: "🤝",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * i }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-card p-8 rounded-lg shadow-premium border border-border/50"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="text-xl font-semibold mb-4 text-primary">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founder's Personal Message Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-green-dark/20 to-gold/10 p-8 md:p-12 rounded-2xl border border-border/30"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">A Personal Message</h3>
            <blockquote className="text-lg md:text-xl italic text-muted-foreground leading-relaxed mb-6">
              "Growing up in Pakistan, I witnessed the incredible diversity of our culture - from the bustling streets
              of Karachi to the serene valleys of the north. Each region, each community, each family has stories that
              deserve to be told. {/* Updated from "14 Angles is my commitment" to "14 August is my commitment" */}
              14 August is my commitment to ensuring these stories live on, connecting Pakistanis worldwide and sharing
              our beautiful heritage with the global community."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                <img src="/images/ali-haider.png" alt="Ali Haider" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary">Ali Haider</div>
                <div className="text-sm text-muted-foreground">Founder & Cultural Advocate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
