"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Center } from "@react-three/drei"
import type * as THREE from "three"

export default function CulturalSymbol() {
  const groupRef = useRef<THREE.Group>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const innerSymbolRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
    if (innerSymbolRef.current) {
      innerSymbolRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      {/* Outer decorative ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.1, 16, 100]} />
        <meshStandardMaterial color="#2d5a3d" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Inner rotating symbols */}
      <group ref={innerSymbolRef}>
        {/* Central geometric pattern */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#4a7c59"
            metalness={0.5}
            roughness={0.2}
            emissive="#1a3d2e"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Surrounding smaller symbols */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 1.8
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle]}>
              <coneGeometry args={[0.2, 0.6, 6]} />
              <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
            </mesh>
          )
        })}
      </group>

      {/* 3D Text */}
      <Center position={[0, -3, 0]}>
        <Text3D font="/fonts/helvetiker_bold.typeface.json" size={0.5} height={0.1} curveSegments={12}>
          Cultural Unity
          <meshStandardMaterial color="#2d5a3d" metalness={0.6} roughness={0.4} />
        </Text3D>
      </Center>

      {/* Ambient particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 3 + Math.sin(i) * 0.5
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(i * 2) * 0.5]}>
            <sphereGeometry args={[0.05]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.3} />
          </mesh>
        )
      })}

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, 2]} intensity={0.4} color="#d4af37" />
    </group>
  )
}
