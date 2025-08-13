"use client"

import type React from "react"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import ThreeCanvas from "@/components/three-canvas"
import InteractiveAvatar from "@/components/3d/interactive-avatar"
import { Button } from "@/components/ui/button"
import { Upload, Camera, RotateCcw, Smartphone, Mouse, Gamepad2 } from "lucide-react"

export default function AvatarSection() {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [deviceOrientation, setDeviceOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 })
  const [isGyroscopeEnabled, setIsGyroscopeEnabled] = useState(false)
  const [avatarMode, setAvatarMode] = useState<"flag" | "dance" | "wave">("flag")
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -2
        setMousePosition({ x, y })
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
      return () => section.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Handle device orientation (gyroscope)
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (isGyroscopeEnabled) {
        setDeviceOrientation({
          alpha: event.alpha || 0,
          beta: event.beta || 0,
          gamma: event.gamma || 0,
        })
      }
    }

    if (isGyroscopeEnabled && "DeviceOrientationEvent" in window) {
      window.addEventListener("deviceorientation", handleOrientation)
      return () => window.removeEventListener("deviceorientation", handleOrientation)
    }
  }, [isGyroscopeEnabled])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUserImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const enableGyroscope = async () => {
    if ("DeviceOrientationEvent" in window && typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        if (permission === "granted") {
          setIsGyroscopeEnabled(true)
        }
      } catch (error) {
        console.error("Error requesting device orientation permission:", error)
      }
    } else {
      setIsGyroscopeEnabled(true)
    }
  }

  const resetAvatar = () => {
    setUserImage(null)
    setMousePosition({ x: 0, y: 0 })
    setDeviceOrientation({ alpha: 0, beta: 0, gamma: 0 })
    setIsGyroscopeEnabled(false)
    setAvatarMode("flag")
  }

  const captureAvatar = () => {
    setIsRecording(true)
    // Simulate capture process
    setTimeout(() => {
      setIsRecording(false)
      // This would capture the current 3D scene as an image
      console.log("Avatar captured!")
    }, 2000)
  }

  return (
    <section ref={sectionRef} id="avatar" className="min-h-screen py-20 px-4 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-6">Your Pakistani Avatar</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Create your personalized Pakistani cultural avatar and watch it come to life with interactive animations.
            Upload your photo and see yourself proudly holding Pakistan's flag with realistic movements that respond to
            your device's motion.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card p-6 rounded-lg shadow-premium border border-border/50">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Upload Your Photo</h3>
              <div className="space-y-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground"
                >
                  <Upload size={16} className="mr-2" />
                  Choose Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {userImage && (
                  <div className="relative">
                    <img
                      src={userImage || "/placeholder.svg"}
                      alt="User uploaded"
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <div className="absolute inset-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-primary font-medium bg-background/80 px-2 py-1 rounded">
                        Photo Loaded ✓
                      </span>
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  For best results, use a clear front-facing photo with good lighting
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-premium border border-border/50">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Avatar Modes</h3>
              <div className="space-y-2">
                {[
                  { mode: "flag" as const, label: "Flag Bearer", icon: "🏴", desc: "Hold and wave Pakistani flag" },
                  { mode: "wave" as const, label: "Greeting Wave", icon: "👋", desc: "Friendly waving gesture" },
                  { mode: "dance" as const, label: "Cultural Dance", icon: "💃", desc: "Traditional dance moves" },
                ].map((option) => (
                  <Button
                    key={option.mode}
                    onClick={() => setAvatarMode(option.mode)}
                    variant={avatarMode === option.mode ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start text-left"
                  >
                    <span className="mr-2">{option.icon}</span>
                    <div>
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs opacity-70">{option.desc}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-premium border border-border/50">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Interaction Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mouse size={16} className="text-primary" />
                  <div>
                    <div className="font-medium">Mouse Control</div>
                    <div className="text-xs">Move mouse to control avatar</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Smartphone size={16} className="text-primary" />
                  <div>
                    <div className="font-medium">Touch Control</div>
                    <div className="text-xs">Drag on mobile for interaction</div>
                  </div>
                </div>
                <Button
                  onClick={enableGyroscope}
                  variant={isGyroscopeEnabled ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                >
                  <Gamepad2 size={16} className="mr-2" />
                  {isGyroscopeEnabled ? "Gyroscope Active" : "Enable Gyroscope"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  Gyroscope allows your avatar to move with your device orientation
                </p>
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-premium border border-border/50">
              <h3 className="text-xl font-serif font-semibold text-primary mb-4">Avatar Actions</h3>
              <div className="space-y-2">
                <Button
                  onClick={captureAvatar}
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  disabled={isRecording}
                >
                  <Camera size={16} className="mr-2" />
                  {isRecording ? "Capturing..." : "Capture Avatar"}
                </Button>
                <Button onClick={resetAvatar} variant="outline" size="sm" className="w-full bg-transparent">
                  <RotateCcw size={16} className="mr-2" />
                  Reset Avatar
                </Button>
              </div>
            </div>

            {/* Movement Indicators */}
            <div className="bg-card p-6 rounded-lg shadow-premium border border-border/50">
              <h3 className="text-lg font-semibold text-primary mb-4">Movement Data</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mouse X:</span>
                  <span className="font-mono text-primary">{mousePosition.x.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mouse Y:</span>
                  <span className="font-mono text-primary">{mousePosition.y.toFixed(2)}</span>
                </div>
                {isGyroscopeEnabled && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gyro α:</span>
                      <span className="font-mono text-gold">{deviceOrientation.alpha.toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gyro β:</span>
                      <span className="font-mono text-gold">{deviceOrientation.beta.toFixed(1)}°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gyro γ:</span>
                      <span className="font-mono text-gold">{deviceOrientation.gamma.toFixed(1)}°</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* 3D Avatar Display */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="h-96 md:h-[600px] relative bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg overflow-hidden shadow-premium">
              <ThreeCanvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                controls={false}
                environment="studio"
                className="w-full h-full"
              >
                <Suspense fallback={null}>
                  <InteractiveAvatar
                    userImage={userImage}
                    mousePosition={mousePosition}
                    deviceOrientation={deviceOrientation}
                    isGyroscopeEnabled={isGyroscopeEnabled}
                    avatarMode={avatarMode}
                  />
                </Suspense>
              </ThreeCanvas>

              {/* Overlay Instructions */}
              {!userImage && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                  <div className="text-center text-white p-8 bg-black/40 rounded-lg max-w-sm">
                    <Upload size={48} className="mx-auto mb-4 opacity-60" />
                    <h3 className="text-xl font-semibold mb-2">Upload Your Photo</h3>
                    <p className="text-white/80 mb-4">
                      Add your photo to see your Pakistani cultural avatar come to life
                    </p>
                    <div className="text-sm text-white/60">
                      Your avatar will hold Pakistan's flag and respond to your movements
                    </div>
                  </div>
                </div>
              )}

              {/* Status Indicators */}
              <div className="absolute top-4 left-4 space-y-2">
                {userImage && (
                  <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-green-500/30">
                    Photo Loaded
                  </div>
                )}
                {isGyroscopeEnabled && (
                  <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-blue-500/30">
                    Gyroscope Active
                  </div>
                )}
                <div className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-gold/30">
                  Mode: {avatarMode === "flag" ? "Flag Bearer" : avatarMode === "wave" ? "Greeting" : "Dance"}
                </div>
                {isRecording && (
                  <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-red-500/30 animate-pulse">
                    Recording...
                  </div>
                )}
              </div>

              {/* Pakistani Flag Indicator */}
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-2 rounded-lg border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-gradient-to-r from-green-600 to-green-700 rounded-sm relative">
                    <div className="absolute left-0 top-0 w-2 h-full bg-white"></div>
                    <div className="absolute left-0.5 top-1 text-green-600 text-xs">☪</div>
                  </div>
                  <span className="text-xs font-medium">Pakistan</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Realistic Pakistani Avatar",
              description:
                "Your personalized avatar proudly displays Pakistan's flag with authentic colors and symbols",
              icon: "🇵🇰",
            },
            {
              title: "Multi-Modal Interaction",
              description: "Control your avatar through mouse, touch, and gyroscope for immersive cultural experience",
              icon: "🎮",
            },
            {
              title: "Cultural Pride Expression",
              description: "Multiple animation modes to express your Pakistani identity and cultural heritage",
              icon: "🎭",
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
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-primary mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">Avatar Technology</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            Our Pakistani avatar system uses advanced 3D rendering technology to create realistic representations that
            respond to your movements in real-time. The system supports multiple interaction methods and accurately
            displays Pakistan's national symbols with cultural authenticity.
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">3D</div>
              <div className="text-sm text-muted-foreground">Real-time Rendering</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">60fps</div>
              <div className="text-sm text-muted-foreground">Smooth Animation</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">Multi</div>
              <div className="text-sm text-muted-foreground">Input Methods</div>
            </div>
            <div className="bg-card/50 p-4 rounded-lg">
              <div className="text-xl font-bold text-gold mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Pakistani Authentic</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
