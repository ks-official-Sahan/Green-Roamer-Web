"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedCanvasProps {
  className?: string
}

export function AnimatedCanvas({ className = "" }: AnimatedCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cleanup: (() => void) | undefined

    const loadThreeJS = async () => {
      try {
        const THREE = await import("three")

        if (!mountRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        })

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountRef.current.appendChild(renderer.domElement)

        // Create terrain-like geometry
        const geometry = new THREE.PlaneGeometry(20, 20, 50, 50)
        const vertices = geometry.attributes.position.array

        // Add wave-like displacement
        for (let i = 0; i < vertices.length; i += 3) {
          const x = vertices[i]
          const y = vertices[i + 1]
          vertices[i + 2] = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 2
        }

        geometry.attributes.position.needsUpdate = true
        geometry.computeVertexNormals()

        // Material with gradient colors
        const material = new THREE.MeshBasicMaterial({
          color: 0x03dac6,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        })

        const terrain = new THREE.Mesh(geometry, material)
        terrain.rotation.x = -Math.PI / 3
        scene.add(terrain)

        // Add particles
        const particlesGeometry = new THREE.BufferGeometry()
        const particlesCount = 1000
        const posArray = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++) {
          posArray[i] = (Math.random() - 0.5) * 20
        }

        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

        const particlesMaterial = new THREE.PointsMaterial({
          size: 0.02,
          color: 0x2e7d32,
          transparent: true,
          opacity: 0.8,
        })

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particlesMesh)

        camera.position.z = 10
        camera.position.y = 5

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate)

          terrain.rotation.z += 0.002
          particlesMesh.rotation.x += 0.001
          particlesMesh.rotation.y += 0.001

          renderer.render(scene, camera)
        }

        animate()
        setIsLoaded(true)

        // Handle resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }

        window.addEventListener("resize", handleResize)

        // Cleanup function
        cleanup = () => {
          window.removeEventListener("resize", handleResize)
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement)
          }
          renderer.dispose()
          geometry.dispose()
          material.dispose()
          particlesGeometry.dispose()
          particlesMaterial.dispose()
        }
      } catch (err) {
        console.error("Failed to load Three.js:", err)
        setError(true)
        setIsLoaded(true)
      }
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      loadThreeJS()
    } else {
      setError(true)
      setIsLoaded(true)
    }

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  // Fallback animated gradient
  if (error || !isLoaded) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundSize: "400% 400%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
      </div>
    )
  }

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} style={{ pointerEvents: "none" }} />
}
