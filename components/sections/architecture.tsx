"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, ArrowRight, Boxes, BrainCircuit, Database, ListChecks, ScanText, Send, Server, User } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"

interface ArchitectureProps {
  scrollY: number
}

const nodes = [
  { label: "User", caption: "Request", icon: User },
  { label: "API", caption: "FastAPI / Flask", icon: Server },
  { label: "Queue", caption: "Async workers", icon: ListChecks },
  { label: "OCR", caption: "Document extraction", icon: ScanText },
  { label: "LLM", caption: "OpenAI API", icon: BrainCircuit },
  { label: "PostgreSQL", caption: "Structured storage", icon: Database },
  { label: "Vector Search", caption: "Semantic retrieval", icon: Boxes },
  { label: "Response", caption: "Structured output", icon: Send },
]

export default function Architecture({ scrollY }: ArchitectureProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.fromTo(
      ".arch-node",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".arch-diagram",
          start: "top 75%",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 border-y border-white/5"
    >
      <motion.div style={{ opacity }} className="container mx-auto max-w-5xl text-center mb-16">
        <MaskedText className="mb-4">
          <span className="text-sm font-medium text-accent-blue tracking-wide uppercase">How I think about systems</span>
        </MaskedText>
        <MaskedText delay={0.1} className="mb-4">
          <h2 className="text-3xl md:text-[40px] font-bold text-ink">System Architecture</h2>
        </MaskedText>
        <MaskedText delay={0.2}>
          <p className="text-lg text-subtle max-w-2xl mx-auto leading-relaxed">
            A representative flow for the document-intelligence and AI-integration systems I build — from request
            to retrieval to response.
          </p>
        </MaskedText>
      </motion.div>

      <div className="arch-diagram container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-3 md:gap-2">
          {nodes.map((node, index) => (
            <div key={node.label} className="flex flex-col md:flex-row items-center gap-3 md:gap-2">
              <div className="arch-node flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-panel/60 px-5 py-4 min-w-[140px] hover:border-accent-blue/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center">
                  <node.icon className="w-4 h-4 text-accent-blue" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-ink">{node.label}</div>
                  <div className="text-xs text-subtle mt-0.5">{node.caption}</div>
                </div>
              </div>

              {index < nodes.length - 1 && (
                <>
                  <ArrowDown className="w-4 h-4 text-white/20 md:hidden" />
                  <ArrowRight className="w-4 h-4 text-white/20 hidden md:block" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
