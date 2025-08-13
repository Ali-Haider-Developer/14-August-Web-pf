"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface InteractiveSymbolProps {
  symbolType: string
  color: string
  zoomLevel: number
}

export default function InteractiveSymbol({ symbolType, color, zoomLevel }: InteractiveSymbolProps) {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  const renderSymbol = () => {
    switch (symbolType) {
      case "unity":
        return (
          <group>
            {/* Outer circle */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[2, 0.2, 16, 100]} />
              <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
            </mesh>
            {/* Inner rotating pattern */}
            <group ref={innerRef}>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2
                return (
                  <mesh key={i} position={[Math.cos(angle) * 1.2, Math.sin(angle) * 1.2, 0]}>
                    <sphereGeometry args={[0.15]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
                  </mesh>
                )
              })}
            </group>
            {/* Center core */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.3]} />
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        )

      case "wisdom":
        return (
          <group>
            {/* Tree trunk */}
            <mesh position={[0, -1, 0]}>
              <cylinderGeometry args={[0.3, 0.4, 2]} />
              <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
            </mesh>
            {/* Tree branches */}
            {Array.from({ length: 7 }).map((_, i) => {
              const angle = (i / 7) * Math.PI * 2
              const height = 0.5 + Math.sin(i) * 0.3
              return (
                <mesh
                  key={i}
                  position={[Math.cos(angle) * 1.2, height, Math.sin(angle) * 1.2]}
                  rotation={[0, angle, Math.PI / 6]}
                >
                  <cylinderGeometry args={[0.05, 0.1, 1]} />
                  <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
                </mesh>
              )
            })}
            {/* Leaves/fruits */}
            {Array.from({ length: 14 }).map((_, i) => {
              const angle = (i / 14) * Math.PI * 2
              const radius = 1.5 + Math.sin(i * 2) * 0.3
              const height = 0.8 + Math.cos(i * 3) * 0.5
              return (
                <mesh key={i} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
                  <sphereGeometry args={[0.1]} />
                  <meshStandardMaterial color="#228B22" emissive="#228B22" emissiveIntensity={0.1} />
                </mesh>
              )
            })}
          </group>
        )

      case "protection":
        return (
          <group>
            {/* Shield outline */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.5, 1, 0.2, 6]} />
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Inner geometric patterns */}
            <group ref={innerRef}>
              {Array.from({ length: 6 }).map((_, i) => {
                const angle = (i / 6) * Math.PI * 2
                return (
                  <mesh key={i} position={[Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 0.15]}>
                    <octahedronGeometry args={[0.2]} />
                    <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
                  </mesh>
                )
              })}
            </group>
            {/* Center emblem */}
            <mesh position={[0, 0, 0.2]}>
              <dodecahedronGeometry args={[0.4]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
            </mesh>
          </group>
        )

      case "prosperity":
        return (
          <group>
            {/* Golden spiral */}
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[1.5, 0.1, 16, 100, Math.PI * 1.618]} />
              <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[1, 0.08, 16, 100, Math.PI * 1.618]} />
              <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
            <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.6, 0.06, 16, 100, Math.PI * 1.618]} />
              <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={0.1}
              />
            </mesh>
            {/* Center prosperity symbol */}
            <mesh position={[0, 0, 0]}>
              <icosahedronGeometry args={[0.3]} />
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        )

      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        )
    }
  }

  return (
    <group ref={groupRef} scale={zoomLevel}>
      {renderSymbol()}

      {/* Enhanced lighting for detailed viewing */}
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, 2]} intensity={0.6} color={color} />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={Math.PI / 4} penumbra={0.5} />

      {/* Subtle particle effects */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 4 + Math.sin(i) * 0.5
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(i * 2) * 0.5]}>
            <sphereGeometry args={[0.02]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}
