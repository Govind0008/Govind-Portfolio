"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number; id: number }>>([])
  const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; id: number }>>([])
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const particleIdRef = useRef(0)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setPosition(newPosition)

      // Update trail positions
      setTrailPositions((prev) => {
        const newTrail = [{ ...newPosition, id: Date.now() }, ...prev.slice(0, 5)]
        return newTrail
      })

      // Add particles occasionally
      if (Math.random() > 0.7) {
        const newParticleId = particleIdRef.current++
        setParticles((prev) => [
          ...prev,
          {
            x: e.clientX + (Math.random() * 20 - 10),
            y: e.clientY + (Math.random() * 20 - 10),
            size: Math.random() * 4 + 1,
            id: newParticleId,
          },
        ])

        // Remove particle after animation
        setTimeout(() => {
          setParticles((prev) => prev.filter((p) => p.id !== newParticleId))
        }, 1000)
      }

      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" || target.tagName === "A" || target.tagName === "BUTTON",
      )
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed top-0 left-0 rounded-full bg-white/60 pointer-events-none z-50 mix-blend-difference"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{ x: particle.x, y: particle.y, opacity: 1 }}
          animate={{
            y: particle.y + 40,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}

      {/* Cursor trails */}
      {trailPositions.map((pos, i) => (
        <motion.div
          key={pos.id}
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white/30 pointer-events-none z-50 mix-blend-difference"
          animate={{
            x: pos.x - 4,
            y: pos.y - 4,
            opacity: 1 - i * 0.15,
            scale: 1 - i * 0.1,
          }}
          transition={{ duration: 0 }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/50 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
          width: isPointer ? "40px" : "32px",
          height: isPointer ? "40px" : "32px",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 28, mass: 0.1 }}
      />

      {/* Glow effect on hover */}
      {isPointer && (
        <motion.div
          className="fixed top-0 left-0 rounded-full bg-white/10 pointer-events-none z-40 blur-xl"
          animate={{
            x: position.x - 48,
            y: position.y - 48,
            width: isClicking ? "80px" : "96px",
            height: isClicking ? "80px" : "96px",
            opacity: 0.5,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      )}
    </>
  )
}
