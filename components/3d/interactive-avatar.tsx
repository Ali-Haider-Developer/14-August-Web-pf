"use client"

import { useRef, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import * as THREE from "three"

interface InteractiveAvatarProps {
  userImage: string | null
  mousePosition: { x: number; y: number }
  deviceOrientation: { alpha: number; beta: number; gamma: number }
  isGyroscopeEnabled: boolean
}

export default function InteractiveAvatar({
  userImage,
  mousePosition,
  deviceOrientation,
  isGyroscopeEnabled,
}: InteractiveAvatarProps) {
  const avatarRef = useRef<THREE.Group>(null)
  const flagRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const armRef = useRef<THREE.Group>(null)

  // Load user texture if provided
  const userTexture = useLoader(TextureLoader, userImage || "/placeholder.svg?height=256&width=256")

  const flagMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 },
      },
      vertexShader: `
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        
        varying vec2 vUv;
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          
          // Flag waving motion influenced by mouse/gyroscope
          float wave1 = sin(pos.x * 3.0 + time * 2.0 + mouseX * 2.0) * 0.1 * (pos.x + 0.5);
          float wave2 = sin(pos.x * 2.0 + time * 3.0 + mouseY * 1.5) * 0.05 * (pos.x + 0.5);
          
          pos.z += wave1 + wave2;
          pos.y += wave1 * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          // Cultural flag colors - green with gold accents
          vec3 primaryGreen = vec3(0.2, 0.6, 0.3);
          vec3 goldAccent = vec3(0.8, 0.7, 0.2);
          vec3 darkGreen = vec3(0.1, 0.4, 0.2);
          
          // Create flag pattern
          float stripePattern = step(0.85, sin(vUv.y * 15.0));
          float centerEmblem = smoothstep(0.35, 0.65, 1.0 - length(vUv - 0.5));
          
          vec3 color = mix(primaryGreen, darkGreen, stripePattern);
          color = mix(color, goldAccent, centerEmblem * 0.7);
          
          // Add shimmer effect
          float shimmer = sin(time * 3.0 + vUv.x * 8.0) * 0.1 + 0.9;
          color *= shimmer;
          
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [])

  useFrame((state) => {
    if (!avatarRef.current) return

    // Calculate movement based on mouse or gyroscope
    let targetX = mousePosition.x * 0.3
    let targetY = mousePosition.y * 0.2

    if (isGyroscopeEnabled) {
      targetX = (deviceOrientation.gamma / 90) * 0.5
      targetY = (deviceOrientation.beta / 90) * 0.3
    }

    // Smooth avatar body movement
    avatarRef.current.rotation.y = THREE.MathUtils.lerp(avatarRef.current.rotation.y, targetX, 0.05)
    avatarRef.current.rotation.x = THREE.MathUtils.lerp(avatarRef.current.rotation.x, targetY, 0.05)

    // Head tracking
    if (headRef.current) {
      headRef.current.rotation.y = targetX * 1.5
      headRef.current.rotation.x = targetY * 1.2
    }

    // Arm movement with flag
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.2 + targetX * 0.5
      armRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 1.5) * 0.1 + targetY * 0.3
    }

    // Update flag shader uniforms
    if (flagMaterial.uniforms) {
      flagMaterial.uniforms.time.value = state.clock.elapsedTime
      flagMaterial.uniforms.mouseX.value = targetX
      flagMaterial.uniforms.mouseY.value = targetY
    }
  })

  return (
    <group ref={avatarRef} position={[0, -1, 0]}>
      {/* Avatar Body */}
      <group>
        {/* Head */}
        <mesh ref={headRef} position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial map={userTexture} />
        </mesh>

        {/* Body */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 1]} />
          <meshStandardMaterial color="#4a7c59" />
        </mesh>

        {/* Arms */}
        <group ref={armRef} position={[0.6, 0.8, 0]}>
          {/* Upper arm */}
          <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.1, 0.12, 0.6]} />
            <meshStandardMaterial color="#d4af37" />
          </mesh>

          {/* Forearm */}
          <mesh position={[0.3, -0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.1, 0.5]} />
            <meshStandardMaterial color="#d4af37" />
          </mesh>

          {/* Hand holding flag */}
          <group position={[0.6, -0.8, 0]}>
            <mesh>
              <sphereGeometry args={[0.08]} />
              <meshStandardMaterial color="#d4af37" />
            </mesh>

            {/* Flag pole */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 1]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Waving flag */}
            <mesh ref={flagRef} position={[0.3, 0.7, 0]} material={flagMaterial}>
              <planeGeometry args={[0.8, 0.5, 16, 12]} />
            </mesh>
          </group>
        </group>

        {/* Left arm */}
        <mesh position={[-0.5, 0.6, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <cylinderGeometry args={[0.08, 0.1, 0.8]} />
          <meshStandardMaterial color="#d4af37" />
        </mesh>

        {/* Legs */}
        <mesh position={[0.2, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 1]} />
          <meshStandardMaterial color="#2d5a3d" />
        </mesh>
        <mesh position={[-0.2, -0.5, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 1]} />
          <meshStandardMaterial color="#2d5a3d" />
        </mesh>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -5, 2]} intensity={0.4} color="#d4af37" />
      <spotLight position={[0, 10, 0]} intensity={0.6} angle={Math.PI / 4} penumbra={0.5} castShadow />

      {/* Floating cultural symbols around avatar */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 3 + Math.sin(i) * 0.5
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle + Date.now() * 0.001) * radius,
              Math.sin(angle + Date.now() * 0.001) * 0.5 + 1,
              Math.sin(angle + Date.now() * 0.001) * radius * 0.3,
            ]}
          >
            <octahedronGeometry args={[0.05]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#d4af37"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        )
      })}
    </group>
  )
}
