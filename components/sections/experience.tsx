"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, Download, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExperienceProps {
  scrollY: number
}

const experiences = [
  {
    title: "Software Developer",
    company: "Xtensible Software Solution",
    period: "Dec 2023 - Present",
    description: [
      "Enhanced backend systems and built automations with ChatGPT + n8n",
      "Integrated APIs and optimized document/data extraction workflows",
      "Key product: TitleMine (backend enhancements + AI integrations)",
    ],
    icon: Briefcase,
    color: "bg-blue-500",
  },
  {
    title: "Education",
    company: "Computer Science Degree",
    period: "2019 - 2023",
    description: [
      "Focused on web development and software engineering",
      "Completed projects in AI and machine learning",
      "Graduated with honors",
    ],
    icon: GraduationCap,
    color: "bg-green-500",
  },
]

export default function Experience({ scrollY }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate experience items
    gsap.fromTo(
      ".experience-item",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".experience-container",
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
      id="experience"
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            Experience & Resume
          </span>
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          My professional journey and qualifications
        </motion.p>
      </motion.div>

      <div className="experience-container w-full max-w-4xl mx-auto px-4 relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/80 to-emerald-500/80 rounded-full" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-item relative flex mb-16 last:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={`flex-shrink-0 w-16 h-16 rounded-full ${exp.color} flex items-center justify-center z-10`}>
              <exp.icon className="w-8 h-8 text-white" />
            </div>

            <div
              className="ml-8 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 flex-grow"
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateY(${((scrollY * 0.005) % 5) - 2.5}deg) rotateX(${((scrollY * 0.002) % 3) - 1.5}deg)`,
              }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-2xl font-bold">{exp.title}</h3>
                <div className="text-gray-400 text-sm mt-1 md:mt-0">{exp.period}</div>
              </div>

              <div className="text-xl text-gray-300 mb-4">{exp.company}</div>

              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-6 h-auto text-lg rounded-xl">
          <Download className="w-5 h-5 mr-2" />
          Download Full Resume
        </Button>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-green-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        />
      </div>
    </section>
  )
}
