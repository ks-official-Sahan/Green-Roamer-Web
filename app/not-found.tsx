"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Search, MapPin, Compass } from "lucide-react"
import { Navbar } from "@/components/navbar"
import * as THREE from "three"

export default function NotFound() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const frameRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(300, 300)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create floating world
    const geometry = new THREE.IcosahedronGeometry(1, 1)
    const material = new THREE.MeshPhongMaterial({
      color: 0x22c55e,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
    })
    const world = new THREE.Mesh(geometry, material)
    scene.add(world)

    // Add wireframe overlay
    const wireframe = new THREE.WireframeGeometry(geometry)
    const line = new THREE.LineSegments(
      wireframe,
      new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.3,
      }),
    )
    scene.add(line)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    camera.position.z = 3

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      world.rotation.x += 0.005
      world.rotation.y += 0.01
      line.rotation.x += 0.005
      line.rotation.y += 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Store refs
    sceneRef.current = scene
    rendererRef.current = renderer

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative flex-1 w-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: Math.random() * 200 + 30,
                height: Math.random() * 200 + 30,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [0.8, 1.2, 0.8],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10 flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 text-center">
          {/* 3D World */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div ref={mountRef} className="w-[300px] h-[300px] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-8xl font-bold text-primary/20"
              >
                404
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold text-gradient">Looks like you took a wrong turn 🌍</h1>

              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                This page seems to have wandered off the beaten path. Let's get you back to exploring!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button asChild size="lg" className="animate-pulse-glow">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Return to Home
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/explore">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Adventures
                </Link>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <Link href="/destinations">
                  <MapPin className="mr-2 h-5 w-5" />
                  View Destinations
                </Link>
              </Button>

              <Button variant="ghost" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Compass className="h-4 w-4" />
              <span>Lost? We'll help you find your way</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
