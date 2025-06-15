"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { useTheme } from "next-themes"

export default function ThreeJsScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mountRef.current.appendChild(renderer.domElement)

    // Create terrain mesh
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 50, 50)
    const vertices = planeGeometry.attributes.position.array

    // Add terrain-like displacement
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]
      const y = vertices[i + 1]
      vertices[i + 2] = Math.sin(x * 0.3) * Math.sin(y * 0.2) * 5
    }

    planeGeometry.attributes.position.needsUpdate = true
    planeGeometry.computeVertexNormals()

    // Material with appropriate colors based on theme
    const isDark = theme === "dark"
    const primaryColor = isDark ? 0x2e7d32 : 0x4caf50
    const secondaryColor = isDark ? 0x1b5e20 : 0x81c784

    const material = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    })

    const terrain = new THREE.Mesh(planeGeometry, material)
    terrain.rotation.x = -Math.PI / 3
    terrain.position.z = -15
    scene.add(terrain)

    // Add particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: secondaryColor,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    camera.position.z = 30

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      terrain.rotation.z += 0.001
      particlesMesh.rotation.y += 0.0005

      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      planeGeometry.dispose()
      material.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [theme])

  return <div ref={mountRef} className="absolute inset-0" />
}
