"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Activity, Gauge, GitBranch, Layers, ShieldCheck } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"

interface PhilosophyProps {
  scrollY: number
}

const principles = [
  {
    title: "Build for maintainability.",
    description: "Code is read far more than it's written — I optimize for the next engineer, including future me.",
    icon: GitBranch,
  },
  {
    title: "Performance is a feature.",
    description: "Latency and cost aren't afterthoughts. I profile before I optimize.",
    icon: Gauge,
  },
  {
    title: "Simple architectures scale.",
    description: "Complexity is a cost I spend deliberately, not by accident.",
    icon: Layers,
  },
  {
    title: "Observability is non-negotiable.",
    description: "If I can't measure it in production, I can't trust it in production.",
    icon: Activity,
  },
  {
    title: "Reliability comes before complexity.",
    description: "Systems fail. I design for graceful degradation before I reach for the interesting solution.",
    icon: ShieldCheck,
  },
]

const currentFocus = [
  "AI Evaluation",
  "Agentic AI",
  "Production LLM Systems",
  "Distributed AI Pipelines",
  "Backend Architecture",
  "Document Intelligence",
]

export default function Philosophy({ scrollY }: PhilosophyProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section id="philosophy" ref={containerRef} className="relative py-24 md:py-32 px-6 border-y border-white/5">
      <motion.div style={{ opacity }} className="container mx-auto max-w-3xl text-center mb-16">
        <MaskedText className="mb-4">
          <h2 className="text-3xl md:text-[40px] font-bold text-ink">Engineering Philosophy</h2>
        </MaskedText>
        <MaskedText delay={0.1}>
          <p className="text-lg text-subtle">How I think about backend systems</p>
        </MaskedText>
      </motion.div>

      <div className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
        {principles.map((p, index) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-xl border border-white/10 bg-panel/40 p-5 hover:border-accent-blue/30 transition-colors"
          >
            <p.icon className="w-5 h-5 text-accent-blue mb-3" />
            <h3 className="text-sm font-semibold text-ink mb-1.5">{p.title}</h3>
            <p className="text-xs text-subtle leading-relaxed">{p.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-3xl text-center"
      >
        <h3 className="text-sm font-medium text-subtle uppercase tracking-wide mb-5">Current Focus</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {currentFocus.map((focus, index) => (
            <motion.span
              key={focus}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="text-sm px-3.5 py-1.5 rounded-full border border-white/10 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 text-ink"
            >
              {focus}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
