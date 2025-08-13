"use client"

import type React from "react"

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { OrbitControls, Environment } from "@react-three/drei"

interface ThreeCanvasProps {
  children: React.ReactNode
  camera?: any
  controls?: boolean
  environment?: string
  className?: string
}

export default function ThreeCanvas({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  controls = true,
  environment = "studio",
  className = "w-full h-full",
}: ThreeCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        camera={camera}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Environment preset={environment} />
          {controls && <OrbitControls enableZoom={false} enablePan={false} />}
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
