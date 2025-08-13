"use client"

import { motion } from "framer-motion"
import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import SpeechBubble3D from "../3d/speech-bubble-3d"
import { Star, Quote, MapPin, Calendar } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    location: "Lahore, Pakistan",
    text: "As a Pakistani living abroad, this website helps me stay connected to my roots. The cultural timeline and festivals section bring back beautiful memories of home.",
    rating: 5,
    position: [2, 1, 0] as [number, number, number],
    role: "Software Engineer",
    date: "December 2023",
    avatar: "AH",
  },
  {
    id: 2,
    name: "Fatima Khan",
    location: "Karachi, Pakistan",
    text: "The 3D avatar feature is incredible! My children love seeing themselves holding the Pakistani flag. It's a wonderful way to teach them about our heritage.",
    rating: 5,
    position: [-2, 0.5, 1] as [number, number, number],
    role: "Teacher & Mother",
    date: "January 2024",
    avatar: "FK",
  },
  {
    id: 3,
    name: "Dr. Sarah Malik",
    location: "Islamabad, Pakistan",
    text: "As a cultural researcher, I find this platform invaluable. The interactive map and historical timeline are perfect resources for my academic work.",
    rating: 5,
    position: [0, 2, -1] as [number, number, number],
    role: "Cultural Researcher",
    date: "November 2023",
    avatar: "SM",
  },
  {
    id: 4,
    name: "Omar Ali",
    location: "Toronto, Canada",
    text: "The merchandise section with 3D previews is amazing. I ordered the truck art mug and Jinnah cap - both are excellent quality and arrived quickly.",
    rating: 5,
    position: [-1.5, -0.5, 0.5] as [number, number, number],
    role: "Pakistani Expatriate",
    date: "December 2023",
    avatar: "OA",
  },
  {
    id: 5,
    name: "Aisha Siddiqui",
    location: "Peshawar, Pakistan",
    text: "The quotes from Quaid-e-Azam and Allama Iqbal are so inspiring. This website beautifully captures the essence of Pakistani identity and values.",
    rating: 5,
    position: [1.5, -1, -0.5] as [number, number, number],
    role: "University Student",
    date: "January 2024",
    avatar: "AS",
  },
  {
    id: 6,
    name: "Muhammad Tariq",
    location: "Multan, Pakistan",
    text: "The cultural symbols section helped me understand the deeper meanings behind our traditions. Excellent educational content for all ages.",
    rating: 4,
    position: [0, -2, 1] as [number, number, number],
    role: "History Teacher",
    date: "October 2023",
    avatar: "MT",
  },
]

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(null)
  const [selectedTestimonial, setSelectedTestimonial] = useState(testimonials[0])

  return (
    <section id="testimonials" className="min-h-screen py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">Community Voices</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Hear from Pakistanis around the world about how "14 August" helps them connect with their cultural heritage
            and share their pride in Pakistani identity.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Speech Bubbles */}
          <div className="h-96 bg-card rounded-lg shadow-premium overflow-hidden relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <pointLight position={[-10, -10, -10]} intensity={0.3} color="#d4af37" />
                <spotLight position={[0, 20, 0]} intensity={0.6} angle={Math.PI / 6} penumbra={0.5} />

                {testimonials.map((testimonial) => (
                  <SpeechBubble3D
                    key={testimonial.id}
                    position={testimonial.position}
                    testimonial={testimonial}
                    isActive={activeTestimonial === testimonial.id}
                    onClick={() => {
                      setActiveTestimonial(activeTestimonial === testimonial.id ? null : testimonial.id)
                      setSelectedTestimonial(testimonial)
                    }}
                  />
                ))}

                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                  minDistance={5}
                  maxDistance={12}
                />
              </Suspense>
            </Canvas>

            {/* 3D Interaction Hint */}
            <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg border border-border/50">
              <div className="text-sm font-medium text-primary mb-1">Interactive Testimonials</div>
              <div className="text-xs text-muted-foreground">Click bubbles to read stories</div>
            </div>
          </div>

          {/* Testimonial Details */}
          <div className="space-y-6">
            <motion.div
              key={selectedTestimonial.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-lg shadow-premium p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote size={32} />
              </div>

              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                  {selectedTestimonial.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-semibold text-primary mb-1">{selectedTestimonial.name}</h3>
                  <div className="text-sm text-muted-foreground mb-2">{selectedTestimonial.role}</div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {selectedTestimonial.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {selectedTestimonial.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < selectedTestimonial.rating ? "fill-current" : ""} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({selectedTestimonial.rating}/5)</span>
              </div>

              <blockquote className="text-lg text-muted-foreground italic leading-relaxed">
                "{selectedTestimonial.text}"
              </blockquote>
            </motion.div>

            {/* Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {testimonials.map((testimonial) => (
                <motion.button
                  key={testimonial.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all text-left ${
                    selectedTestimonial.id === testimonial.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                >
                  <div className="font-semibold">{testimonial.name.split(" ")[0]}</div>
                  <div className="text-xs opacity-80">{testimonial.location.split(",")[0]}</div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Community Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid md:grid-cols-4 gap-8 text-center"
        >
          <div className="bg-card rounded-lg shadow-premium p-6">
            <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
            <p className="text-muted-foreground">Community Members</p>
          </div>
          <div className="bg-card rounded-lg shadow-premium p-6">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
          <div className="bg-card rounded-lg shadow-premium p-6">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-muted-foreground">Would Recommend</p>
          </div>
          <div className="bg-card rounded-lg shadow-premium p-6">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <p className="text-muted-foreground">Countries Represented</p>
          </div>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">
            Connecting Pakistanis Worldwide
          </h3>
          <blockquote className="text-lg md:text-xl italic text-muted-foreground leading-relaxed mb-6 max-w-3xl mx-auto">
            "14 August has become a bridge connecting Pakistani communities across the globe. Whether you're in Lahore
            or London, this platform helps you stay connected to your roots and share your cultural pride with the next
            generation."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
              AH
            </div>
            <div className="text-left">
              <div className="font-semibold text-primary">Ali Haider</div>
              <div className="text-sm text-muted-foreground">Founder, 14 August</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
