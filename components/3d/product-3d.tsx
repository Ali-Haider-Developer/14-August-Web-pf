"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Product3DProps {
  type: string
  isSelected: boolean
}

export default function Product3D({ type, isSelected }: Product3DProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1

      // Enhanced rotation when selected
      if (isSelected) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 2
      }
    }
  })

  const renderProduct = () => {
    switch (type) {
      case "flag":
        return (
          <group>
            {/* Flag pole */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 2]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Flag */}
            <mesh position={[0.5, 0.5, 0]}>
              <planeGeometry args={[1, 0.6]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            {/* Gold emblem */}
            <mesh position={[0.5, 0.5, 0.01]}>
              <circleGeometry args={[0.1]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
          </group>
        )

      case "mug":
        return (
          <group>
            {/* Mug body */}
            <mesh>
              <cylinderGeometry args={[0.3, 0.25, 0.6]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Handle */}
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.15, 0.03]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Cultural design */}
            <mesh position={[0, 0, 0.26]}>
              <circleGeometry args={[0.15]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
          </group>
        )

      case "cap":
        return (
          <group>
            {/* Cap crown */}
            <mesh position={[0, 0.1, 0]}>
              <sphereGeometry args={[0.4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            {/* Visor */}
            <mesh position={[0, -0.1, 0.3]} rotation={[-0.2, 0, 0]}>
              <cylinderGeometry args={[0.4, 0.5, 0.05]} />
              <meshStandardMaterial color="#2d5a3d" />
            </mesh>
            {/* Emblem */}
            <mesh position={[0, 0.2, 0.35]}>
              <circleGeometry args={[0.08]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
          </group>
        )

      case "pin":
        return (
          <group>
            {/* Pin base */}
            <mesh>
              <cylinderGeometry args={[0.15, 0.15, 0.05]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
            {/* Pin design */}
            <mesh position={[0, 0, 0.03]}>
              <octahedronGeometry args={[0.08]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
          </group>
        )

      case "poster":
        return (
          <group>
            {/* Poster */}
            <mesh>
              <planeGeometry args={[0.8, 1.2]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Cultural design */}
            <mesh position={[0, 0.2, 0.01]}>
              <circleGeometry args={[0.2]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            <mesh position={[0, -0.2, 0.01]}>
              <planeGeometry args={[0.6, 0.1]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
          </group>
        )

      case "keychain":
        return (
          <group>
            {/* Key ring */}
            <mesh position={[0, 0.3, 0]}>
              <torusGeometry args={[0.1, 0.02]} />
              <meshStandardMaterial color="#silver" />
            </mesh>
            {/* Charm */}
            <mesh>
              <octahedronGeometry args={[0.08]} />
              <meshStandardMaterial color="#4a7c59" />
            </mesh>
            {/* Small emblem */}
            <mesh position={[0, 0, 0.09]}>
              <circleGeometry args={[0.03]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>
          </group>
        )

      default:
        return (
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#4a7c59" />
          </mesh>
        )
    }
  }

  return (
    <group ref={meshRef} scale={isSelected ? 1.2 : 1}>
      {renderProduct()}

      {/* Glow effect when selected */}
      {isSelected && (
        <mesh>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  )
}
