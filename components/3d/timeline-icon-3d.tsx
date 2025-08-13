"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface TimelineIcon3DProps {
  iconType: string
  color: string
}

export default function TimelineIcon3D({ iconType, color }: TimelineIcon3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const mainObjectRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
    if (mainObjectRef.current) {
      mainObjectRef.current.rotation.y = state.clock.elapsedTime * 0.3
      mainObjectRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  const renderIcon = () => {
    switch (iconType) {
      case "temple":
        return (
          <group>
            {/* Temple base */}
            <mesh position={[0, -1, 0]}>
              <boxGeometry args={[3, 0.3, 2]} />
              <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
            </mesh>
            {/* Temple columns */}
            {[-1, -0.3, 0.3, 1].map((x, i) => (
              <mesh key={i} position={[x, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 2]} />
                <meshStandardMaterial color={color} metalness={0.4} roughness={0.6} />
              </mesh>
            ))}
            {/* Temple roof */}
            <mesh position={[0, 1.2, 0]}>
              <coneGeometry args={[1.8, 0.8, 4]} />
              <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
            </mesh>
          </group>
        )

      case "scroll":
        return (
          <group>
            {/* Scroll cylinder */}
            <mesh ref={mainObjectRef} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 3]} />
              <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Scroll paper */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[2.5, 1.5]} />
              <meshStandardMaterial color="#f4f1e8" transparent opacity={0.9} />
            </mesh>
          </group>
        )

      case "bridge":
        return (
          <group>
            {/* Bridge deck */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[4, 0.2, 0.8]} />
              <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
            </mesh>
            {/* Bridge arches */}
            {[-1.5, 0, 1.5].map((x, i) => (
              <mesh key={i} position={[x, -0.5, 0]}>
                <torusGeometry args={[0.5, 0.1, 8, 16, Math.PI]} />
                <meshStandardMaterial color={color} metalness={0.4} roughness={0.6} />
              </mesh>
            ))}
          </group>
        )

      case "star":
        return (
          <group ref={mainObjectRef}>
            {/* Central star */}
            <mesh position={[0, 0, 0]}>
              <dodecahedronGeometry args={[1]} />
              <meshStandardMaterial
                color={color}
                metalness={0.7}
                roughness={0.3}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Orbiting elements */}
            {Array.from({ length: 5 }).map((_, i) => {
              const angle = (i / 5) * Math.PI * 2
              return (
                <mesh key={i} position={[Math.cos(angle) * 2, Math.sin(angle) * 2, 0]}>
                  <octahedronGeometry args={[0.3]} />
                  <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
                </mesh>
              )
            })}
          </group>
        )

      case "gear":
        return (
          <group ref={mainObjectRef}>
            {/* Main gear */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.2, 1.2, 0.3, 12]} />
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </mesh>
            {/* Gear teeth */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2
              return (
                <mesh key={i} position={[Math.cos(angle) * 1.4, Math.sin(angle) * 1.4, 0]}>
                  <boxGeometry args={[0.2, 0.4, 0.3]} />
                  <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
                </mesh>
              )
            })}
          </group>
        )

      case "globe":
        return (
          <group>
            {/* Globe sphere */}
            <mesh ref={mainObjectRef} position={[0, 0, 0]}>
              <sphereGeometry args={[1.2, 32, 16]} />
              <meshStandardMaterial color={color} metalness={0.1} roughness={0.9} transparent opacity={0.8} />
            </mesh>
            {/* Globe rings */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.5, 0.05, 8, 32]} />
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
              <torusGeometry args={[1.5, 0.05, 8, 32]} />
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        )

      default:
        return (
          <mesh ref={mainObjectRef}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
    }
  }

  return (
    <group ref={groupRef}>
      {renderIcon()}

      {/* Ambient lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, 2]} intensity={0.4} color={color} />

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 3 + Math.sin(i) * 0.5
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(i * 2) * 0.5]}>
            <sphereGeometry args={[0.03]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}
