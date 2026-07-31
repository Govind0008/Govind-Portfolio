"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import MaskedText from "@/components/ui/masked-text"

interface AboutProps {
  scrollY: number
}

export default function About({ scrollY }: AboutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section id="about" ref={containerRef} className="relative py-24 md:py-32 px-6">
      <motion.div style={{ opacity }} className="container mx-auto max-w-3xl text-center">
        <MaskedText className="mb-6">
          <h2 className="text-3xl md:text-[40px] font-bold text-ink">About</h2>
        </MaskedText>

        <MaskedText delay={0.15} className="mb-5">
          <p className="text-lg md:text-xl text-subtle leading-relaxed">
            I'm Govind — a Software Engineer focused on backend systems and AI-powered architectures, currently at
            Acumen (part of Sannam S4 Group).
          </p>
        </MaskedText>
        <MaskedText delay={0.3} className="mb-5">
          <p className="text-lg md:text-xl text-subtle leading-relaxed">
            I design reliable, high-performance backend applications using Python, FastAPI, PostgreSQL, Redis, and
            AWS — and build AI-powered workflows that integrate LLMs, vector embeddings, and document processing
            into production systems.
          </p>
        </MaskedText>
        <MaskedText delay={0.45}>
          <p className="text-lg md:text-xl text-subtle leading-relaxed">
            I care about backend architecture, distributed systems, and the practical use of AI beyond chat
            interfaces — software that's maintainable, scalable, and impactful.
          </p>
        </MaskedText>
      </motion.div>
    </section>
  )
}
