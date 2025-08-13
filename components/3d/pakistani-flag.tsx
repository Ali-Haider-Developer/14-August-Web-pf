"use client"

import { useRef, useMemo } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import type { Mesh, ShaderMaterial } from "three"
import * as THREE from "three"

export default function PakistanFlag() {
  const meshRef = useRef<Mesh>(null)
  const materialRef = useRef<ShaderMaterial>(null)

  const flagTexture = useLoader(TextureLoader, "/images/pakistani-flag.png")

  // Pakistani flag shader material with real texture
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        amplitude: { value: 0.3 },
        frequency: { value: 2.0 },
        flagTexture: { value: flagTexture }, // Add flag texture uniform
      },
      vertexShader: `
        uniform float time;
        uniform float amplitude;
        uniform float frequency;
        
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          
          // Wave animation for realistic cloth physics
          float wave = sin(pos.x * frequency + time * 2.0) * amplitude * 0.3;
          wave += sin(pos.y * frequency * 0.5 + time * 1.5) * amplitude * 0.2;
          wave += sin(pos.x * frequency * 1.5 + pos.y * frequency + time * 1.8) * amplitude * 0.1;
          
          pos.z += wave;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform sampler2D flagTexture; // Use actual flag texture
        
        void main() {
          vec4 flagColor = texture2D(flagTexture, vUv);
          
          // Add dynamic lighting effects
          float lighting = 0.85 + 0.15 * sin(vPosition.x * 2.0 + time * 0.8);
          lighting += 0.1 * sin(vPosition.y * 1.5 + time * 0.6);
          
          // Add subtle wind effect
          float windEffect = 0.95 + 0.05 * sin(vUv.x * 8.0 + time * 3.0);
          
          // Combine lighting and wind effects
          vec3 finalColor = flagColor.rgb * lighting * windEffect;
          
          // Add slight saturation boost for vibrant colors
          finalColor = mix(flagColor.rgb, finalColor, 0.8);
          
          gl_FragColor = vec4(finalColor, flagColor.a);
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
    })
  }, [flagTexture])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15
    }
  })

  return (
    <group position={[0, 0, -2]} scale={[6, 4, 1]}>
      <mesh ref={meshRef} material={shaderMaterial}>
        <planeGeometry args={[1, 0.67, 32, 32]} />
        <shaderMaterial ref={materialRef} attach="material" {...shaderMaterial} />
      </mesh>

      {/* Enhanced lighting for the real flag texture */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
      <directionalLight position={[-3, 2, 3]} intensity={0.4} color="#f0f8ff" />
    </group>
  )
}
