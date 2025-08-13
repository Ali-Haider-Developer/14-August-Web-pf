"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronLeft, ChevronRight, Download, Share2, Heart, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    title: "Independence Day Celebration",
    description:
      "Vibrant celebration of Pakistan's Independence Day with thousands gathering at Minar-e-Pakistan, Lahore, showcasing national pride and unity",
    category: "Ceremonies",
    year: "2023",
    photographer: "National Heritage Documentation",
    location: "Lahore, Punjab",
    tags: ["independence", "celebration", "flag", "national pride"],
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    title: "Truck Art Masterpiece",
    description:
      "Intricate truck art displaying traditional Pakistani motifs, floral patterns, and vibrant colors that represent the country's rich artistic heritage",
    category: "Crafts",
    year: "2023",
    photographer: "Folk Art Documentation Project",
    location: "Karachi, Sindh",
    tags: ["truck art", "folk art", "traditional", "colorful"],
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    title: "Badshahi Mosque",
    description:
      "The magnificent Badshahi Mosque in Lahore, a masterpiece of Mughal architecture and one of Pakistan's most iconic landmarks",
    category: "Architecture",
    year: "2023",
    photographer: "Architectural Heritage Survey",
    location: "Lahore, Punjab",
    tags: ["mosque", "mughal", "architecture", "heritage"],
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    title: "Qawwali Performance",
    description:
      "Traditional qawwali musicians performing with tabla, harmonium, and vocals, continuing the legacy of Nusrat Fateh Ali Khan",
    category: "Music",
    year: "2023",
    photographer: "Music Heritage Foundation",
    location: "Data Darbar, Lahore",
    tags: ["qawwali", "music", "traditional", "sufi"],
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    title: "Master Potter at Work",
    description:
      "Skilled artisan from Multan teaching traditional pottery techniques to young apprentices, preserving ancient craft methods",
    category: "Education",
    year: "2023",
    photographer: "Artisan Skills Documentation",
    location: "Multan, Punjab",
    tags: ["pottery", "crafts", "education", "traditional skills"],
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    title: "Shandur Polo Festival",
    description:
      "The world's highest polo ground hosts the annual Shandur Polo Festival, showcasing northern Pakistan's sporting heritage",
    category: "Festivals",
    year: "2023",
    photographer: "Northern Areas Tourism Board",
    location: "Shandur Pass, Gilgit-Baltistan",
    tags: ["polo", "festival", "mountains", "sports"],
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    title: "Karachi Biryani Preparation",
    description:
      "Traditional preparation of authentic Karachi biryani using time-honored recipes and cooking methods passed down through generations",
    category: "Cuisine",
    year: "2023",
    photographer: "Culinary Heritage Project",
    location: "Karachi, Sindh",
    tags: ["biryani", "cuisine", "traditional cooking", "food"],
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    title: "Gandhara Artifacts",
    description:
      "Ancient Buddhist sculptures and artifacts from the Gandhara civilization, showcasing Pakistan's diverse historical heritage",
    category: "Artifacts",
    year: "2023",
    photographer: "National Museum Collection",
    location: "Peshawar Museum, KPK",
    tags: ["gandhara", "buddhist", "artifacts", "ancient"],
  },
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=600",
    title: "Bhangra Performance",
    description:
      "Energetic bhangra dance performance celebrating harvest season, showcasing Punjab's vibrant cultural traditions",
    category: "Performance",
    year: "2023",
    photographer: "Cultural Performance Archive",
    location: "Faisalabad, Punjab",
    tags: ["bhangra", "dance", "punjabi", "harvest"],
  },
  {
    id: 10,
    src: "/placeholder.svg?height=400&width=600",
    title: "K2 - The Savage Mountain",
    description:
      "Majestic view of K2, the world's second-highest peak, representing Pakistan's breathtaking natural landscape and mountaineering heritage",
    category: "Landscape",
    year: "2023",
    photographer: "Mountain Heritage Documentation",
    location: "Karakoram Range, Gilgit-Baltistan",
    tags: ["K2", "mountains", "landscape", "natural beauty"],
  },
  {
    id: 11,
    src: "/placeholder.svg?height=400&width=600",
    title: "Mehndi Ceremony",
    description:
      "Traditional Pakistani wedding mehndi ceremony with intricate henna designs, colorful decorations, and cultural celebrations",
    category: "Ceremonies",
    year: "2023",
    photographer: "Wedding Traditions Documentation",
    location: "Islamabad, ICT",
    tags: ["mehndi", "wedding", "henna", "celebration"],
  },
  {
    id: 12,
    src: "/placeholder.svg?height=400&width=600",
    title: "Carpet Weaving Artisan",
    description:
      "Master carpet weaver from Lahore creating intricate traditional patterns using techniques passed down through generations",
    category: "Crafts",
    year: "2023",
    photographer: "Handicrafts Documentation Project",
    location: "Lahore, Punjab",
    tags: ["carpet", "weaving", "handicrafts", "traditional"],
  },
]

const categories = [
  "All",
  "Ceremonies",
  "Crafts",
  "Architecture",
  "Music",
  "Education",
  "Festivals",
  "Cuisine",
  "Artifacts",
  "Performance",
  "Landscape",
]

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredImages = galleryImages.filter((img) => {
    const matchesCategory = selectedCategory === "All" || img.category === selectedCategory
    const matchesSearch =
      searchTerm === "" ||
      img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      img.location.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return

    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedImage(filteredImages[newIndex].id)
  }

  const toggleFavorite = (imageId: number) => {
    setFavorites((prev) => (prev.includes(imageId) ? prev.filter((id) => id !== imageId) : [...prev, imageId]))
  }

  const selectedImageData = selectedImage ? galleryImages.find((img) => img.id === selectedImage) : null

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">Pakistan Heritage Gallery</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Explore Pakistan's rich cultural tapestry through our curated collection of photographs, artifacts, and
            artistic expressions. From ancient Gandhara sculptures to vibrant truck art, discover the diverse heritage
            that defines our nation.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Search by title, description, location, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card/50 backdrop-blur-sm border-border/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-card/50 backdrop-blur-sm"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
              {favorites.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory("All")}
                  className="bg-card/50 backdrop-blur-sm"
                >
                  <Heart size={16} className="mr-2 fill-red-500 text-red-500" />
                  {favorites.length} Favorites
                </Button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap justify-center gap-2"
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
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Counter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 text-center">
          <p className="text-muted-foreground">
            Showing {filteredImages.length} of {galleryImages.length} images
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-card rounded-lg overflow-hidden shadow-premium cursor-pointer"
                onClick={() => openLightbox(image.id)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold mb-1">{image.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2 mb-2">{image.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-primary/20 px-2 py-1 rounded-full">{image.category}</span>
                      <span className="text-xs text-white/60">{image.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {image.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="text-xs bg-white/10 px-1 py-0.5 rounded text-white/70">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(image.id)
                        }}
                        className="p-1 rounded-full hover:bg-white/20 transition-colors"
                      >
                        <Heart
                          size={16}
                          className={favorites.includes(image.id) ? "fill-red-500 text-red-500" : "text-white"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredImages.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-primary mb-2">No images found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or category filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && selectedImageData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] bg-card rounded-lg overflow-hidden shadow-premium"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                >
                  <X size={20} />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateImage("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                >
                  <ChevronLeft size={20} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateImage("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white hover:bg-black/70 rounded-full"
                >
                  <ChevronRight size={20} />
                </Button>

                {/* Image */}
                <div className="relative">
                  <img
                    src={selectedImageData.src || "/placeholder.svg"}
                    alt={selectedImageData.title}
                    className="w-full max-h-[60vh] object-contain"
                  />
                </div>

                {/* Image Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-bold text-primary mb-2">{selectedImageData.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{selectedImageData.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleFavorite(selectedImageData.id)}
                        className="rounded-full"
                      >
                        <Heart
                          size={16}
                          className={favorites.includes(selectedImageData.id) ? "fill-red-500 text-red-500" : ""}
                        />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                        <Share2 size={16} />
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full bg-transparent">
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="space-y-1">
                      <div>
                        <strong>Category:</strong> {selectedImageData.category}
                      </div>
                      <div>
                        <strong>Year:</strong> {selectedImageData.year}
                      </div>
                      <div>
                        <strong>Location:</strong> {selectedImageData.location}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div>
                        <strong>Photographer:</strong> {selectedImageData.photographer}
                      </div>
                      <div>
                        <strong>Tags:</strong>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {selectedImageData.tags.map((tag, i) => (
                          <span key={i} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">Gallery Highlights</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">{galleryImages.length}</div>
              <div className="text-sm text-muted-foreground">Total Images</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">{categories.length - 1}</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">4</div>
              <div className="text-sm text-muted-foreground">Provinces Covered</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gold mb-2">5000+</div>
              <div className="text-sm text-muted-foreground">Years of Heritage</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
