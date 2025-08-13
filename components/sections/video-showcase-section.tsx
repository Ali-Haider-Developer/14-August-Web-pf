"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"

const videos = [
  {
    id: 1,
    title: "Pakistan Independence Day 1947",
    description: "Historic footage and documentary about August 14, 1947 - the birth of Pakistan.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "15:47",
    category: "Historical",
  },
  {
    id: 2,
    title: "Quaid-e-Azam's Vision",
    description: "Muhammad Ali Jinnah's speeches and vision for Pakistan leading to independence.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "12:34",
    category: "Documentary",
  },
  {
    id: 3,
    title: "Freedom Struggle Heroes",
    description: "Stories of the brave souls who fought for Pakistan's independence.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "18:23",
    category: "Biography",
  },
  {
    id: 4,
    title: "August 14th Celebrations",
    description: "How Pakistan celebrates Independence Day across the nation every year.",
    thumbnail: "/placeholder.svg?height=400&width=600",
    duration: "10:15",
    category: "Cultural",
  },
]

export default function VideoShowcaseSection() {
  const [selectedVideo, setSelectedVideo] = useState(videos[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoSelect = (video: (typeof videos)[0]) => {
    setSelectedVideo(video)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section id="videos" className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gradient mb-6">14 August Video Archive</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Watch historic documentaries and celebrations that capture the spirit of Pakistan's Independence Day and the
            journey from 1947 to today.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative bg-black rounded-xl overflow-hidden shadow-premium"
            >
              {/* Video Container */}
              <div className="relative aspect-video">
                <img
                  src={selectedVideo.thumbnail || "/placeholder.svg"}
                  alt={selectedVideo.title}
                  className="w-full h-full object-cover"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="bg-primary/90 hover:bg-primary text-white rounded-full p-6 shadow-lg"
                  >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                  </motion.button>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">{selectedVideo.duration}</span>
                    <span className="text-white text-sm bg-primary/80 px-2 py-1 rounded">{selectedVideo.category}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={toggleMute} className="text-white hover:text-primary transition-colors">
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <button className="text-white hover:text-primary transition-colors">
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="p-6 bg-card">
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">{selectedVideo.title}</h3>
                <p className="text-muted-foreground">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Video Playlist */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-semibold text-primary mb-4">More Videos</h3>
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleVideoSelect(video)}
                className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                  selectedVideo.id === video.id ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                }`}
              >
                <div className="flex gap-3 p-3 bg-card">
                  <div className="relative flex-shrink-0">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play size={16} className="text-white" />
                    </div>
                    <span className="absolute bottom-1 right-1 text-xs text-white bg-black/70 px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-primary truncate">{video.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{video.description}</p>
                    <span className="text-xs text-accent mt-1 inline-block">{video.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cinematic Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
