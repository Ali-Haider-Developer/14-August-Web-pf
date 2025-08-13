"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import ContactIcon3D from "../3d/contact-icon-3d"

const contactMethods = [
  {
    type: "email" as const,
    title: "Email",
    info: "ali.haider@14august.pk",
    description: "Connect with us about Pakistan's heritage",
    position: [-2, 1, 0] as [number, number, number],
  },
  {
    type: "phone" as const,
    title: "Phone",
    info: "+92 (300) 123-4567",
    description: "Call us for Independence Day events",
    position: [2, 1, 0] as [number, number, number],
  },
  {
    type: "location" as const,
    title: "Location",
    info: "Minar-e-Pakistan, Lahore, Punjab",
    description: "Visit Pakistan's independence monument",
    position: [0, -1, 1] as [number, number, number],
  },
  {
    type: "social" as const,
    title: "Social Media",
    info: "@14AugustPakistan",
    description: "Follow our independence celebrations",
    position: [0, 1, -1] as [number, number, number],
  },
]

export default function ContactSection() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [selectedMethod, setSelectedMethod] = useState(contactMethods[0])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleIconClick = (method: (typeof contactMethods)[0]) => {
    setSelectedMethod(method)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">Connect with 14 August</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Join Ali Haider's mission to celebrate Pakistan's independence and preserve our national heritage for future
            generations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* 3D Contact Icons */}
          <div className="space-y-8">
            <div className="h-96 bg-card rounded-lg shadow-premium overflow-hidden">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.6} />
                  <pointLight position={[10, 10, 10]} intensity={0.8} />
                  <pointLight position={[-10, -10, -10]} intensity={0.4} color="#d4af37" />
                  <spotLight position={[0, 20, 0]} intensity={0.6} angle={Math.PI / 6} penumbra={0.5} />

                  {contactMethods.map((method) => (
                    <ContactIcon3D
                      key={method.type}
                      type={method.type}
                      position={method.position}
                      isHovered={hoveredIcon === method.type}
                      onClick={() => handleIconClick(method)}
                    />
                  ))}

                  <OrbitControls
                    enableZoom={true}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                    minDistance={4}
                    maxDistance={10}
                    onPointerOver={(e) => {
                      // Handle hover detection for 3D objects
                      const intersected = e.intersections[0]
                      if (intersected) {
                        // Logic to determine which icon is hovered
                        setHoveredIcon("email") // Simplified for demo
                      }
                    }}
                    onPointerOut={() => setHoveredIcon(null)}
                  />
                </Suspense>
              </Canvas>
            </div>

            {/* Contact Method Details */}
            <motion.div
              key={selectedMethod.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-lg shadow-premium p-6"
            >
              <div className="flex items-center mb-4">
                {selectedMethod.type === "email" && <Mail className="w-8 h-8 text-primary mr-3" />}
                {selectedMethod.type === "phone" && <Phone className="w-8 h-8 text-primary mr-3" />}
                {selectedMethod.type === "location" && <MapPin className="w-8 h-8 text-primary mr-3" />}
                {selectedMethod.type === "social" && <Send className="w-8 h-8 text-primary mr-3" />}
                <div>
                  <h3 className="text-xl font-serif font-semibold text-primary">{selectedMethod.title}</h3>
                  <p className="text-muted-foreground text-sm">{selectedMethod.description}</p>
                </div>
              </div>
              <p className="text-lg font-medium text-foreground">{selectedMethod.info}</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-card rounded-lg shadow-premium p-8"
          >
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Share Your Independence Story</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-12 border-t border-border text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-serif font-semibold text-primary mb-3">14 August Pakistan</h4>
              <p className="text-muted-foreground text-sm">
                Celebrating Pakistan's independence and preserving our national heritage through digital innovation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-serif font-semibold text-primary mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Pakistan
                </a>
                <a href="#gallery" className="block text-muted-foreground hover:text-primary transition-colors">
                  Heritage Gallery
                </a>
                <a href="#events" className="block text-muted-foreground hover:text-primary transition-colors">
                  Independence Events
                </a>
                <a href="#history" className="block text-muted-foreground hover:text-primary transition-colors">
                  Freedom Struggle
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-serif font-semibold text-primary mb-3">Follow Us</h4>
              <div className="flex justify-center gap-4">
                {["Facebook", "Twitter", "Instagram"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {social.charAt(0)}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm">
              © 2024 14 August Pakistan by Ali Haider. All rights reserved. Celebrating independence through innovation.
            </p>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
