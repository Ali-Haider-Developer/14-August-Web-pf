"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"

interface SpeechBubble3DProps {
  position: [number, number, number]
  testimonial: {
    id: number
    name: string
    text: string
    rating: number
  }
  isActive: boolean
  onClick: () => void
}

export default function SpeechBubble3D({ position, testimonial, isActive, onClick }: SpeechBubble3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bubbleRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + testimonial.id) * 0.2

      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + testimonial.id) * 0.1
    }

    if (bubbleRef.current) {
      // Scale animation when active
      const targetScale = isActive ? 1.3 : 1
      bubbleRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]} onClick={onClick}>
      {/* Speech Bubble */}
      <mesh ref={bubbleRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#d4af37" : "#4a7c59"}
          transparent
          opacity={0.9}
          emissive={isActive ? "#d4af37" : "#4a7c59"}
          emissiveIntensity={isActive ? 0.2 : 0.1}
        />
      </mesh>

      {/* Speech Bubble Tail */}
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.2, 0.4]} />
        <meshStandardMaterial color={isActive ? "#d4af37" : "#4a7c59"} transparent opacity={0.9} />
      </mesh>

      {/* Name Text */}
      <Text
        position={[0, 0.2, 0.81]}
        fontSize={0.12}
        color={isActive ? "#000000" : "#ffffff"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        {testimonial.name}
      </Text>

      {/* Rating Stars */}
      <Text position={[0, -0.1, 0.81]} fontSize={0.15} color="#ffd700" anchorX="center" anchorY="middle">
        {"★".repeat(testimonial.rating)}
      </Text>

      {/* Quote Preview */}
      <Text
        position={[0, -0.4, 0.81]}
        fontSize={0.08}
        color={isActive ? "#333333" : "#cccccc"}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.4}
        textAlign="center"
        font="/fonts/Inter-Regular.ttf"
      >
        {testimonial.text.length > 50 ? testimonial.text.substring(0, 50) + "..." : testimonial.text}
      </Text>

      {/* Glow effect when active */}
      {isActive && (
        <mesh>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Floating particles around active bubble */}
      {isActive &&
        Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 1.5
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.5, Math.sin(angle) * radius * 0.3]}
            >
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial color="#d4af37" transparent opacity={0.8} />
            </mesh>
          )
        })}
    </group>
  )
}
