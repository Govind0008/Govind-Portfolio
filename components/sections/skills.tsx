"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { BrainCircuit, Cloud, Code2, Database, Layers, Network, Server } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"
import TiltCard from "@/components/ui/tilt-card"

interface SkillsProps {
  scrollY: number
}

const skillGroups = [
  {
    title: "Programming",
    description: "Languages I write production code in day to day.",
    icon: Code2,
    items: ["Python", "JavaScript", "PHP", "HTML/CSS"],
  },
  {
    title: "Backend",
    description: "Designing APIs and services that stay fast under load.",
    icon: Server,
    items: ["FastAPI", "Flask", "Laravel", "REST API Design", "Microservices"],
  },
  {
    title: "Cloud",
    description: "Shipping and running services in production.",
    icon: Cloud,
    items: ["AWS (Lambda, Textract)", "Docker", "CI/CD Pipelines", "Google Cloud APIs"],
  },
  {
    title: "AI",
    description: "Applying LLMs to real workflows, not just chat.",
    icon: BrainCircuit,
    items: ["OpenAI API", "LLM Integration", "Semantic Search", "AI Evaluation"],
  },
  {
    title: "Infrastructure",
    description: "Keeping async work reliable at scale.",
    icon: Layers,
    items: ["Background Workers", "Queue Systems", "Distributed Processing", "Caching (Redis)"],
  },
  {
    title: "Databases",
    description: "Structured, cached, and vector-backed data.",
    icon: Database,
    items: ["PostgreSQL", "Redis", "Graph Databases", "PGVector"],
  },
  {
    title: "Architecture",
    description: "System design for document- and AI-heavy pipelines.",
    icon: Network,
    items: ["Document Intelligence", "OCR Systems", "Large-Scale Document Processing", "System Design"],
  },
]

export default function Skills({ scrollY }: SkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section id="skills" ref={containerRef} className="relative py-24 md:py-32 px-6">
      <motion.div style={{ opacity }} className="container mx-auto max-w-3xl text-center mb-16">
        <MaskedText className="mb-4">
          <h2 className="text-3xl md:text-[40px] font-bold text-ink">Skills & Expertise</h2>
        </MaskedText>
        <MaskedText delay={0.1}>
          <p className="text-lg text-subtle">Grouped by where they show up in production systems</p>
        </MaskedText>
      </motion.div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
          >
            <TiltCard className="h-full rounded-xl border border-white/10 bg-panel/50 p-6 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 flex items-center justify-center mb-4">
                <group.icon className="w-5 h-5 text-accent-blue" />
              </div>
              <h3 className="text-lg font-semibold text-ink mb-1">{group.title}</h3>
              <p className="text-sm text-subtle mb-4">{group.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-subtle"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
