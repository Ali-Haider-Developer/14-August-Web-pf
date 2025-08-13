"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export default function WavingFlag() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Custom shader for realistic flag waving
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        texture1: { value: null },
        windStrength: { value: 0.5 },
        waveFrequency: { value: 2.0 },
      },
      vertexShader: `
        uniform float time;
        uniform float windStrength;
        uniform float waveFrequency;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          
          vec3 pos = position;
          
          // Create realistic flag waving motion
          float wave1 = sin(pos.x * waveFrequency + time * 3.0) * windStrength * (pos.x + 1.0) * 0.1;
          float wave2 = sin(pos.x * waveFrequency * 1.5 + time * 2.0) * windStrength * (pos.x + 1.0) * 0.05;
          float wave3 = sin(pos.y * waveFrequency * 0.5 + time * 4.0) * windStrength * (pos.x + 1.0) * 0.02;
          
          pos.z += wave1 + wave2 + wave3;
          pos.y += wave1 * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          
          // Calculate normal for lighting
          vec3 tangent = vec3(1.0, 0.0, waveFrequency * windStrength * cos(pos.x * waveFrequency + time * 3.0) * (pos.x + 1.0) * 0.1);
          vec3 bitangent = vec3(0.0, 1.0, 0.0);
          vNormal = normalize(cross(tangent, bitangent));
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
          // Create a premium green flag with golden accents
          vec3 primaryGreen = vec3(0.2, 0.6, 0.3);
          vec3 goldAccent = vec3(0.8, 0.7, 0.2);
          vec3 darkGreen = vec3(0.1, 0.4, 0.2);
          
          // Create flag pattern
          float stripePattern = step(0.8, sin(vUv.y * 20.0));
          float centerEmblem = smoothstep(0.3, 0.7, 1.0 - length(vUv - 0.5));
          
          vec3 color = mix(primaryGreen, darkGreen, stripePattern);
          color = mix(color, goldAccent, centerEmblem * 0.6);
          
          // Add subtle shimmer effect
          float shimmer = sin(time * 2.0 + vUv.x * 10.0) * 0.1 + 0.9;
          color *= shimmer;
          
          // Simple lighting
          float lighting = dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))) * 0.5 + 0.5;
          color *= lighting;
          
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    })
  }, [])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <group position={[0, 0, -2]}>
      {/* Main flag */}
      <mesh ref={meshRef} material={shaderMaterial}>
        <planeGeometry args={[6, 4, 32, 24]} />
      </mesh>

      {/* Flag pole */}
      <mesh position={[-3.2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 8]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Ambient lighting for the flag */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <directionalLight position={[-5, -5, 2]} intensity={0.3} color="#ffd700" />
    </group>
  )
}
