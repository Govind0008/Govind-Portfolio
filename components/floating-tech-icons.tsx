"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface FloatingTechIconsProps {
  scrollY: number
}

// Tech icons with their colors
const techIcons = [
  { name: "React", icon: "/assets/icons/react.svg", color: "#61DAFB" },
  { name: "JavaScript", icon: "/assets/icons/javascript.svg", color: "#F7DF1E" },
  { name: "HTML", icon: "/assets/icons/html5.svg", color: "#E34F26" },
  { name: "CSS", icon: "/assets/icons/css3.svg", color: "#1572B6" },
  { name: "Python", icon: "/assets/icons/python.svg", color: "#3776AB" },
  { name: "Flask", icon: "/assets/icons/flask.svg", color: "#000000" },
  { name: "Laravel", icon: "/assets/icons/laravel.svg", color: "#FF2D20" },
  { name: "Tailwind", icon: "/assets/icons/tailwind.svg", color: "#38B2AC" },
  { name: "Git", icon: "/assets/icons/git.svg", color: "#F05032" },
  { name: "OpenAI", icon: "/assets/icons/openai.svg", color: "#412991" },
  { name: "Node.js", icon: "/assets/icons/nodejs.svg", color: "#339933" },
  { name: "n8n", icon: "/assets/icons/n8n.svg", color: "#FF6D00" },
]

export default function FloatingTechIcons({ scrollY }: FloatingTechIconsProps) {
  const [icons, setIcons] = useState<
    Array<{ x: number; y: number; scale: number; rotation: number; icon: (typeof techIcons)[0] }>
  >([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = useMobile()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate random positions for icons
    const iconCount = isMobile ? 8 : 15
    const newIcons = Array.from({ length: iconCount }).map((_, i) => {
      const randomIcon = techIcons[i % techIcons.length]
      return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 20 - 10,
        icon: randomIcon,
      }
    })
    setIcons(newIcons)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isMobile])

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden">
      {icons.map((item, index) => {
        // Calculate distance from mouse for subtle attraction
        const dx = mousePosition.x / window.innerWidth - item.x / 100
        const dy = mousePosition.y / window.innerHeight - item.y / 100
        const distance = Math.sqrt(dx * dx + dy * dy)
        const attraction = Math.min(30, (1 / (distance + 0.1)) * 2)

        const mouseInfluenceX = dx * attraction
        const mouseInfluenceY = dy * attraction

        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1, delay: index * 0.1 }}
            style={{
              left: `${item.x + mouseInfluenceX}%`,
              top: `${item.y + mouseInfluenceY}%`,
              transform: `translateY(${scrollY * item.scale * 0.05}px) rotate(${item.rotation + scrollY * 0.01}deg)`,
            }}
          >
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/10"
              style={{ boxShadow: `0 0 20px ${item.icon.color}30` }}
              whileHover={{ scale: 1.2, rotate: 5, transition: { duration: 0.3 } }}
              animate={{
                y: [0, Math.random() * 10 - 5, 0],
                x: [0, Math.random() * 10 - 5, 0],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 5 + Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 relative">
                <img
                  src={item.icon.icon || "/placeholder.svg"}
                  alt={item.icon.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
