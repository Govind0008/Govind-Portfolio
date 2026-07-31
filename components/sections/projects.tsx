"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, Cloud, ExternalLink, FileSearch, GraduationCap, HeartPulse } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"
import TiltCard from "@/components/ui/tilt-card"

interface ProjectsProps {
  scrollY: number
}

interface CaseStudy {
  title: string
  badge?: string
  summary: string
  icon: typeof FileSearch
  tech: string[]
  liveUrl?: string
  problem: string
  solution: string
  architecture?: string
  challenges?: string
  decisions?: string
  impact: string
  lessons?: string
}

const caseStudies: CaseStudy[] = [
  {
    title: "Enterprise AI Document Intelligence Platform",
    badge: "Client Project",
    summary: "An enterprise platform for processing complex document workflows with OCR, semantic retrieval, and AI-powered extraction.",
    icon: FileSearch,
    tech: ["OCR", "Semantic Search", "Vector Embeddings", "Redis", "PostgreSQL", "AWS", "Docker"],
    problem:
      "A client needed to process high volumes of complex, unstructured documents accurately — replacing manual review with an automated, auditable pipeline.",
    solution:
      "Designed a document intelligence platform combining OCR, AI-assisted extraction, and semantic search to structure and retrieve information from unstructured documents at scale.",
    architecture:
      "Documents flow through OCR pipelines into background workers for AI-assisted extraction; results are cached in Redis and persisted in PostgreSQL, with semantic search over vector embeddings for retrieval — deployed on AWS via Docker.",
    challenges:
      "Keeping extraction accurate across inconsistent document formats and scan quality, while keeping the system responsive under background-processing load.",
    decisions:
      "Decoupled slow OCR/AI steps into background workers with Redis caching, rather than processing documents synchronously on the request path.",
    impact: "Replaced manual document review with an automated pipeline for the client's document-heavy workflows.",
    lessons:
      "Working under a confidentiality constraint reinforced how much reliability and observability matter once AI moves from a demo into an operational pipeline.",
  },
  {
    title: "Enterprise AI Learning Platform",
    badge: "Client Project",
    summary: "Backend systems and AI-powered workflows for an educational platform integrating LLM capabilities into learning experiences.",
    icon: GraduationCap,
    tech: ["Python", "AI APIs", "Prompt Engineering", "Document Processing", "REST APIs"],
    problem:
      "An educational platform needed LLM-powered capabilities woven into its learning workflows without compromising backend performance or reliability.",
    solution:
      "Built backend services and prompt-engineered AI workflows that layered LLM capabilities into the platform's learning experience.",
    architecture:
      "REST APIs handle platform requests and delegate AI-specific work to dedicated backend services calling LLM APIs, with document-processing pipelines supporting content-heavy workflows.",
    challenges:
      "Balancing LLM response quality against latency and cost, and keeping prompt behavior consistent across varied learning content.",
    decisions:
      "Invested in prompt engineering and backend performance optimization rather than treating the LLM integration as a bolt-on feature.",
    impact: "Delivered production backend services and AI workflows supporting the platform's learning experience.",
  },
  {
    title: "Commercial Fitness Platform",
    summary: "Contributed to a modern, responsive fitness platform — membership plans, a BMI calculator, and health assessments.",
    icon: HeartPulse,
    tech: ["Responsive UI", "Mobile-First", "Performance Optimization", "Interactive UX"],
    liveUrl: "https://www.crunnchhfitness.com/",
    problem:
      "The client needed a modern, mobile-first web presence that could turn visitors into members through clear plans and interactive tools.",
    solution:
      "Contributed to building a responsive fitness platform featuring membership plans, a BMI calculator, health assessments, and modern landing pages.",
    impact: "A live commercial site — see it in production below.",
  },
  {
    title: "Backend Infrastructure & Cloud Engineering",
    summary: "Production backend systems on AWS — API design, authentication, deployment, and observability.",
    icon: Cloud,
    tech: ["AWS (Lambda, Textract)", "Docker", "CI/CD", "API Design", "Authentication", "Observability"],
    problem:
      "Backend services needed to run reliably in the cloud with proper deployment automation, not manual, one-off releases.",
    solution:
      "Built and deployed FastAPI/Flask services on AWS with CI/CD pipelines, integrating managed services like Lambda and Textract for document-processing workloads.",
    architecture:
      "API services ship through CI/CD pipelines; serverless functions (Lambda, Textract) handle document-processing tasks decoupled from the synchronous API layer.",
    challenges:
      "Coordinating serverless functions with synchronous API services without adding latency to user-facing endpoints.",
    decisions:
      "Prioritized managed AWS services over self-hosted infrastructure to cut operational overhead, and treated deployment automation and observability as first-class concerns.",
    impact: "Newly deployed and actively expanding in scope.",
  },
]

const otherProjects = [
  {
    title: "AI-Powered Resume Automation Pipeline",
    tech: "OpenAI API, n8n, Google Cloud",
    description: "An n8n-orchestrated pipeline that scores resumes and extracts structured candidate data. Cut hiring time by 30%.",
  },
  {
    title: "Employee Task Management System",
    tech: "React, REST API, Node.js",
    description: "A platform for assigning, tracking, and managing team tasks. Improved team productivity by 20%.",
  },
  { title: "Netflix Clone", tech: "HTML, CSS, JavaScript", description: "Responsive streaming UI with media controls and interactivity." },
  { title: "Spotify Clone", tech: "HTML, CSS, JavaScript", description: "Responsive music player UI with media controls and interactivity." },
]

export default function Projects({ scrollY }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<number | null>(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0])

  return (
    <section id="projects" ref={containerRef} className="relative py-24 md:py-32 px-6">
      <motion.div style={{ opacity }} className="container mx-auto max-w-3xl text-center mb-16">
        <MaskedText className="mb-4">
          <h2 className="text-3xl md:text-[40px] font-bold text-ink">Engineering Case Studies</h2>
        </MaskedText>
        <MaskedText delay={0.1}>
          <p className="text-lg text-subtle">Problems, architecture, and decisions behind real work</p>
        </MaskedText>
      </motion.div>

      <div className="container mx-auto max-w-4xl space-y-4">
        {caseStudies.map((project, index) => {
          const isOpen = expanded === index
          const details: { label: string; value: string }[] = [
            { label: "Problem", value: project.problem },
            { label: "Solution", value: project.solution },
            ...(project.architecture ? [{ label: "Architecture", value: project.architecture }] : []),
            ...(project.challenges ? [{ label: "Challenges", value: project.challenges }] : []),
            ...(project.decisions ? [{ label: "Engineering Decisions", value: project.decisions }] : []),
          ]

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard className="rounded-xl border border-white/10 bg-panel/50 overflow-hidden hover:border-white/20 transition-colors">
                <button
                  onClick={() => setExpanded(isOpen ? null : index)}
                  className="w-full text-left p-6 md:p-8 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 flex items-center justify-center flex-shrink-0">
                    <project.icon className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
                      {project.badge && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-accent-purple/15 text-accent-purple border border-accent-purple/20">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-subtle mb-3">{project.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-subtle">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 mt-2">
                    <ChevronDown className="w-5 h-5 text-subtle" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {details.map((d) => (
                          <div key={d.label}>
                            <h4 className="text-sm font-semibold text-accent-blue mb-1.5">{d.label}</h4>
                            <p className="text-sm text-subtle leading-relaxed">{d.value}</p>
                          </div>
                        ))}

                        <div className="md:col-span-2">
                          <h4 className="text-sm font-semibold text-accent-purple mb-1.5">Business Impact</h4>
                          <p className="text-sm text-ink leading-relaxed">{project.impact}</p>
                        </div>

                        {project.lessons && (
                          <div className="md:col-span-2">
                            <h4 className="text-sm font-semibold text-accent-purple mb-1.5">Lessons Learned</h4>
                            <p className="text-sm text-subtle leading-relaxed">{project.lessons}</p>
                          </div>
                        )}

                        {project.liveUrl && (
                          <div className="md:col-span-2">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-accent-blue hover:underline"
                            >
                              View Live Site
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl mt-14"
      >
        <h3 className="text-sm font-medium text-subtle uppercase tracking-wide mb-4 text-center">Other Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherProjects.map((p) => (
            <div key={p.title} className="rounded-xl border border-white/10 bg-panel/30 p-5">
              <h4 className="font-semibold text-ink mb-1">{p.title}</h4>
              <p className="text-sm text-subtle mb-2">{p.description}</p>
              <p className="text-xs text-subtle/70">{p.tech}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
