"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SkillsProps {
  scrollY: number
}

const skills = {
  languages: ["Python", "JavaScript", "PHP", "HTML", "CSS"],
  frontend: ["React.js", "Tailwind CSS"],
  backend: ["Flask", "Laravel"],
  tools: ["Git", "Figma", "OpenAI API", "Google Cloud APIs", "n8n"],
  other: ["API integration", "Automation workflows", "Resume processing", "PDF data extraction"],
}

const skillColors = [
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-purple-500 to-pink-500",
  "bg-gradient-to-br from-amber-500 to-orange-500",
  "bg-gradient-to-br from-green-500 to-emerald-500",
  "bg-gradient-to-br from-red-500 to-pink-500",
]

export default function Skills({ scrollY }: SkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate skill bubbles
    gsap.fromTo(
      ".skill-bubble",
      {
        scale: 0.5,
        opacity: 0,
        y: gsap.utils.random(50, 150, 10),
        x: gsap.utils.random(-100, 100, 10),
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        x: 0,
        stagger: 0.03,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 80%",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      <motion.div style={{ opacity }} className="container mx-auto px-4 mb-16 text-center">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Skills & Expertise
          </span>
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Technologies and tools I work with
        </motion.p>
      </motion.div>

      <div className="skills-container w-full max-w-6xl mx-auto px-4">
        {Object.entries(skills).map(([category, items], categoryIndex) => (
          <div key={category} className="mb-12">
            <motion.h3
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-2xl font-bold mb-6 capitalize"
            >
              {category}
            </motion.h3>

            <div className="flex flex-wrap gap-4">
              {items.map((skill, index) => {
                const delay = (categoryIndex * items.length + index) * 0.05
                const colorIndex = (categoryIndex + index) % skillColors.length

                return (
                  <motion.div
                    key={skill}
                    className={`skill-bubble ${skillColors[colorIndex]} px-4 py-2 rounded-full text-white shadow-lg`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay,
                      type: "spring",
                      stiffness: 200,
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `perspective(1000px) rotateY(${((scrollY * 0.01 + index * 2) % 10) - 5}deg) rotateX(${((scrollY * 0.005 + index * 1) % 6) - 3}deg)`,
                    }}
                  >
                    {skill}
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        />
        <div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        />
      </div>
    </section>
  )
}
