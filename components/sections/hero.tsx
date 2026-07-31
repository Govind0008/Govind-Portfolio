"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"
import MagneticButton from "@/components/ui/magnetic-button"

interface HeroProps {
  scrollY: number
}

const stack = ["Python", "FastAPI", "Flask", "PostgreSQL", "AWS", "Docker", "Redis", "OpenAI", "React", "Next.js"]

export default function Hero({ scrollY }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(56,189,248,0.08), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(139,92,246,0.06), transparent)",
        }}
      />

      <motion.div style={{ y, opacity }} className="container mx-auto max-w-4xl relative z-10 text-center">
        <MaskedText delay={0.1} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-panel/60 px-4 py-1.5 text-sm text-subtle">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            Software Engineer
          </span>
        </MaskedText>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
          <MaskedText delay={0.2} className="block">
            <span className="text-ink">Building Intelligent Software</span>
          </MaskedText>
          <MaskedText delay={0.35} className="block mt-1">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">
              That Solves Real Business Problems
            </span>
          </MaskedText>
        </h1>

        <MaskedText delay={0.45} className="mb-4">
          <p className="text-lg md:text-xl text-ink/90 max-w-2xl mx-auto leading-relaxed font-medium">
            Software Engineer specializing in AI systems, backend architecture, cloud infrastructure, and scalable
            web applications.
          </p>
        </MaskedText>

        <MaskedText delay={0.55} className="mb-10">
          <p className="text-base md:text-lg text-subtle max-w-2xl mx-auto leading-relaxed">
            I build production-grade software — from enterprise AI document intelligence platforms to commercial
            business applications — focused on reliability, performance, and exceptional user experiences.
          </p>
        </MaskedText>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {stack.map((tech) => (
            <span
              key={tech}
              className="text-sm px-3 py-1.5 rounded-md border border-white/10 bg-panel/40 text-subtle"
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <MagneticButton
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            strength={20}
            className="inline-flex items-center gap-2 bg-ink text-canvas px-6 py-3 rounded-lg font-medium hover:bg-accent-blue transition-colors"
          >
            Explore My Work
            <ArrowDown className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            strength={20}
            className="inline-flex items-center gap-2 border border-white/15 text-ink px-6 py-3 rounded-lg font-medium hover:border-white/30 hover:bg-white/5 transition-colors"
          >
            Download Resume
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  )
}
