"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const [activeSection, setActiveSection] = useState("")
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")

    const checkActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", checkActiveSection)
    checkActiveSection()

    return () => {
      window.removeEventListener("scroll", checkActiveSection)
    }
  }, [])

  const sections = [
    { id: "about", label: "About" },
    { id: "how-i-work", label: "Process" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <>
      {/* Progress bar at the top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Section indicator */}
      <div className="fixed top-24 right-4 z-50 hidden md:block">
        <div className="flex flex-col items-end space-y-4">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="group flex items-center">
              <span
                className={`mr-2 text-xs font-medium transition-opacity duration-200 ${
                  activeSection === section.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {section.label}
              </span>
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 scale-125"
                    : "bg-white/30 scale-100 group-hover:bg-white/50"
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
