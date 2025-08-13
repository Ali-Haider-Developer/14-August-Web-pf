"use client"

import { motion } from "framer-motion"
import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Product3D from "../3d/product-3d"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Star, Truck, Shield, RotateCcw } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Pakistan Flag Premium",
    price: "$34.99",
    originalPrice: "$44.99",
    type: "flag",
    description:
      "High-quality Pakistani flag with authentic colors and durable fabric. Perfect for Independence Day celebrations.",
    features: ["Premium polyester fabric", "Fade-resistant colors", "Reinforced edges", "Weather resistant"],
    rating: 4.8,
    reviews: 127,
    category: "Flags & Banners",
  },
  {
    id: 2,
    name: "Truck Art Heritage Mug",
    price: "$22.99",
    originalPrice: "$29.99",
    type: "mug",
    description:
      "Beautiful ceramic mug featuring traditional Pakistani truck art designs with vibrant colors and cultural motifs.",
    features: ["Ceramic construction", "Dishwasher safe", "11oz capacity", "Authentic truck art design"],
    rating: 4.9,
    reviews: 89,
    category: "Home & Kitchen",
  },
  {
    id: 3,
    name: "Traditional Jinnah Cap",
    price: "$28.99",
    originalPrice: "$35.99",
    type: "cap",
    description:
      "Classic Jinnah cap (Karakul hat) worn by Pakistan's founder. Made with premium materials for comfort and style.",
    features: ["Premium wool blend", "Traditional design", "Comfortable fit", "Cultural significance"],
    rating: 4.7,
    reviews: 156,
    category: "Traditional Wear",
  },
  {
    id: 4,
    name: "Crescent & Star Pin",
    price: "$12.99",
    originalPrice: "$16.99",
    type: "pin",
    description: "Elegant enamel pin featuring Pakistan's national symbols. Perfect for showing your Pakistani pride.",
    features: ["High-quality enamel", "Gold-plated finish", "Secure backing", "Collectible design"],
    rating: 4.6,
    reviews: 203,
    category: "Accessories",
  },
  {
    id: 5,
    name: "Minar-e-Pakistan Poster",
    price: "$18.99",
    originalPrice: "$24.99",
    type: "poster",
    description: "Stunning artistic poster of Minar-e-Pakistan with historical significance and beautiful typography.",
    features: ["High-resolution print", "Premium paper quality", "Multiple sizes available", "Ready to frame"],
    rating: 4.8,
    reviews: 94,
    category: "Art & Decor",
  },
  {
    id: 6,
    name: "Pakistan Map Keychain",
    price: "$9.99",
    originalPrice: "$13.99",
    type: "keychain",
    description: "Detailed metal keychain shaped like Pakistan with engraved provincial boundaries and major cities.",
    features: ["Durable metal construction", "Detailed engraving", "Compact size", "Gift packaging"],
    rating: 4.5,
    reviews: 312,
    category: "Accessories",
  },
]

const categories = ["All", "Flags & Banners", "Home & Kitchen", "Traditional Wear", "Accessories", "Art & Decor"]

export default function MerchandiseSection() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const addToCart = (productId: number) => {
    setCart((prev) => [...prev, productId])
  }

  return (
    <section id="merchandise" className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">Pakistani Heritage Store</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Discover authentic Pakistani merchandise that celebrates our rich cultural heritage. From traditional flags
            to artistic home decor, each item tells a story of our nation's pride and identity.
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
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card/50 backdrop-blur-sm hover:bg-primary/10"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-lg shadow-premium overflow-hidden group cursor-pointer relative"
            >
              {/* Discount Badge */}
              {product.originalPrice && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  SALE
                </div>
              )}

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(product.id)
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  size={16}
                  className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}
                />
              </button>

              {/* 3D Product Preview */}
              <div
                className="h-64 relative cursor-pointer"
                onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
              >
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.6} />
                    <pointLight position={[10, 10, 10]} intensity={0.8} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#d4af37" />
                    <Product3D type={product.type} isSelected={selectedProduct === product.id} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
                  </Suspense>
                </Canvas>

                {/* 3D Interaction Hint */}
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  <RotateCcw size={12} className="inline mr-1" />
                  3D View
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-serif font-semibold text-primary">{product.name}</h3>
                  <div className="text-xs bg-accent/20 px-2 py-1 rounded-full text-accent-foreground">
                    {product.category}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-current" : ""} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-primary mb-2">Key Features:</div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {product.features.slice(0, 2).map((feature, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-gold rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(product.id)
                  }}
                  className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Product Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-card rounded-xl shadow-premium p-8 mb-16"
        >
          <h3 className="text-3xl font-serif font-bold text-center text-primary mb-8">Featured Collection</h3>
          <div className="h-96 relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
                <spotLight position={[0, 20, 0]} intensity={0.8} angle={Math.PI / 6} penumbra={0.5} />

                {/* Multiple products in a circle */}
                {products.slice(0, 4).map((product, i) => {
                  const angle = (i / 4) * Math.PI * 2
                  const radius = 3
                  return (
                    <group
                      key={product.id}
                      position={[Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.5, Math.sin(angle) * radius]}
                      rotation={[0, -angle + Math.PI / 2, 0]}
                    >
                      <Product3D type={product.type} isSelected={false} />
                    </group>
                  )
                })}

                <OrbitControls
                  enableZoom={true}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={1}
                  minDistance={5}
                  maxDistance={15}
                />
              </Suspense>
            </Canvas>

            {/* Collection Info Overlay */}
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border/50">
              <h4 className="font-semibold text-primary mb-1">Heritage Collection</h4>
              <p className="text-sm text-muted-foreground">Authentic Pakistani cultural items</p>
            </div>
          </div>
        </motion.div>

        {/* Store Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            {
              icon: <Truck className="w-8 h-8 text-primary" />,
              title: "Free Shipping",
              description: "Free shipping on orders over $50 within Pakistan",
            },
            {
              icon: <Shield className="w-8 h-8 text-primary" />,
              title: "Authentic Quality",
              description: "All products are authentic and made with premium materials",
            },
            {
              icon: <RotateCcw className="w-8 h-8 text-primary" />,
              title: "Easy Returns",
              description: "30-day return policy for your peace of mind",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * i }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg shadow-premium border border-border/50 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-primary mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Store Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">
            Trusted by Pakistani Communities Worldwide
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
