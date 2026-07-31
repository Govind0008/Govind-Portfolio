"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Cloud, FileSearch, GraduationCap } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"
import TiltCard from "@/components/ui/tilt-card"

interface ExperienceProps {
  scrollY: number
}

const milestones = [
  {
    title: "Software Engineer",
    company: "Acumen, Part of Sannam S4 Group",
    period: "June 2026 - Present",
    location: "India",
    tags: ["Cloud Infrastructure", "Backend Optimization"],
    icon: Cloud,
    description: [
      "Architecting scalable backend services with Python and AWS",
      "Leading API development in FastAPI and Flask, with CI/CD pipelines in production",
      "Integrating AWS Lambda and Textract for automated document processing",
    ],
  },
  {
    title: "Software Developer",
    company: "Xtensible Software Technologies Pvt. Ltd.",
    period: "Jan 2025 - June 2026",
    location: "Pune District",
    tags: ["Document Intelligence", "AI Integration"],
    icon: FileSearch,
    description: [
      "Built backend automations integrating the OpenAI API and n8n into production workflows",
      "Engineered document and data-extraction pipelines across third-party APIs",
      "Delivered backend services spanning Python/Flask and PHP/Laravel",
    ],
  },
  {
    title: "Bachelor's Degree, Computer Engineering",
    company: "Yadavrao Tasgaonkar Institute of Engineering & Technology",
    period: "Sep 2021 - May 2024",
    location: "Foundations",
    tags: ["Software Engineering", "Data Structures"],
    icon: GraduationCap,
    description: [
      "Built a foundation in software engineering, data structures, and web development",
      "Preceded by a Diploma in Mechanical Engineering, Pimpri Chinchwad Polytechnic (2019 - 2021)",
    ],
  },
]

export default function Experience({ scrollY }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section id="experience" ref={containerRef} className="relative py-24 md:py-32 px-6">
      <motion.div style={{ opacity }} className="container mx-auto max-w-3xl text-center mb-16">
        <MaskedText className="mb-4">
          <h2 className="text-3xl md:text-[40px] font-bold text-ink">Engineering Milestones</h2>
        </MaskedText>
        <MaskedText delay={0.1}>
          <p className="text-lg text-subtle">My professional journey and qualifications</p>
        </MaskedText>
      </motion.div>

      <div className="container mx-auto max-w-3xl space-y-4">
        {milestones.map((m, index) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <TiltCard className="rounded-xl border border-white/10 bg-panel/50 p-6 md:p-8 hover:border-white/20 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 flex items-center justify-center flex-shrink-0">
                  <m.icon className="w-5 h-5 text-accent-blue" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
                    <h3 className="text-xl font-semibold text-ink">{m.title}</h3>
                    <span className="text-sm text-subtle">{m.period}</span>
                  </div>
                  <div className="text-subtle mb-3">
                    {m.company} · {m.location}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {m.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-accent-blue"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <ul className="space-y-1.5 text-sm text-subtle">
                    {m.description.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-accent-purple mt-1.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
