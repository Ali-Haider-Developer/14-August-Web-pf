"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ContactIcon3DProps {
  type: "email" | "phone" | "location" | "social"
  position: [number, number, number]
  isHovered: boolean
  onClick: () => void
}

export default function ContactIcon3D({ type, position, isHovered, onClick }: ContactIcon3DProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1

      // Rotation animation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5

      // Scale animation on hover
      const targetScale = isHovered ? 1.3 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  const getIconGeometry = () => {
    switch (type) {
      case "email":
        return (
          <group>
            {/* Email envelope */}
            <mesh>
              <boxGeometry args={[0.6, 0.4, 0.05]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            {/* Envelope flap */}
            <mesh position={[0, 0.1, 0.03]} rotation={[Math.PI / 6, 0, 0]}>
              <boxGeometry args={[0.6, 0.3, 0.02]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
          </group>
        )

      case "phone":
        return (
          <group>
            {/* Phone body */}
            <mesh>
              <boxGeometry args={[0.3, 0.6, 0.05]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            {/* Screen */}
            <mesh position={[0, 0, 0.03]}>
              <boxGeometry args={[0.25, 0.45, 0.01]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Home button */}
            <mesh position={[0, -0.25, 0.03]}>
              <circleGeometry args={[0.03]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
          </group>
        )

      case "location":
        return (
          <group>
            {/* Pin body */}
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.15]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            {/* Pin point */}
            <mesh position={[0, -0.1, 0]}>
              <coneGeometry args={[0.05, 0.2]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
            {/* Inner dot */}
            <mesh position={[0, 0.1, 0.16]}>
              <circleGeometry args={[0.05]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        )

      case "social":
        return (
          <group>
            {/* Social bubble */}
            <mesh>
              <sphereGeometry args={[0.2]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            {/* Connection nodes */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i / 6) * Math.PI * 2
              const radius = 0.3
              return (
                <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
                  <sphereGeometry args={[0.03]} />
                  <meshStandardMaterial color="#d4af37" />
                </mesh>
              )
            })}
          </group>
        )

      default:
        return (
          <mesh>
            <boxGeometry args={[0.3, 0.3, 0.3]} />
            <meshStandardMaterial color="#4a7c59" />
          </mesh>
        )
    }
  }

  return (
    <group ref={meshRef} position={position} onClick={onClick}>
      {getIconGeometry()}

      {/* Glow effect when hovered */}
      {isHovered && (
        <mesh>
          <sphereGeometry args={[0.5]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.2} side={THREE.BackSide} />
        </mesh>
      )}

      {/* Floating particles when hovered */}
      {isHovered &&
        Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 0.6
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
