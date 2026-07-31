"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown, FileSearch, ListTree, Users } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"
import TiltCard from "@/components/ui/tilt-card"

interface ProjectsProps {
  scrollY: number
}

const caseStudies = [
  {
    title: "AI-Powered Resume Automation Pipeline",
    summary: "An n8n-orchestrated pipeline that scores resumes and extracts structured candidate data with the OpenAI API.",
    icon: FileSearch,
    tech: ["OpenAI API", "n8n", "Google Cloud"],
    problem:
      "Manual resume screening was slow and inconsistent at volume — reviewers spent hours reading resumes in wildly different formats before a candidate ever reached an interview.",
    architecture:
      "n8n orchestrates the pipeline end to end: incoming resumes are parsed, scored, and have structured candidate data extracted via the OpenAI API, then pushed into Google Cloud for storage and interview scheduling.",
    challenges:
      "Getting reliable structured extraction out of inconsistent resume formats (PDFs, Word docs, varying layouts) without brittle regex or template matching.",
    decisions:
      "Chose workflow orchestration (n8n) over a fully custom backend service, so prompt logic and scoring thresholds could be iterated on quickly without redeploying code.",
    results: "Cut hiring time by 30%.",
  },
  {
    title: "Backend & Cloud Infrastructure",
    summary: "FastAPI/Flask services on AWS, with Lambda and Textract handling document-processing workloads.",
    icon: ListTree,
    tech: ["Python", "FastAPI", "Flask", "AWS Lambda", "AWS Textract", "CI/CD"],
    problem:
      "Backend services needed to run reliably on cloud infrastructure with automated deployment and built-in document-processing capability, rather than manual, one-off deploys.",
    architecture:
      "FastAPI and Flask services deployed through CI/CD pipelines; AWS Lambda functions integrate with Textract for document-processing tasks, decoupled from the main API layer.",
    challenges:
      "Coordinating serverless functions (Lambda/Textract) with synchronous API services without adding latency to user-facing endpoints.",
    decisions:
      "Used managed AWS services (Lambda, Textract) instead of self-hosted OCR, trading some flexibility for lower operational overhead.",
    results: "Newly deployed and actively expanding in scope.",
  },
  {
    title: "Employee Task Management System",
    summary: "A React + REST API platform for assigning, tracking, and managing team tasks.",
    icon: Users,
    tech: ["React", "REST API", "Node.js"],
    problem:
      "Teams were tracking work in spreadsheets and chat threads, making it hard to see task ownership or status at a glance.",
    architecture:
      "A React frontend consumes a REST API backend (Node.js) for task CRUD, assignment, and status tracking.",
    challenges: "Keeping task state reasonably in sync across concurrent users without over-engineering the sync layer.",
    decisions:
      "Chose a straightforward REST + polling model over WebSockets, since the team size didn't justify real-time-sync complexity.",
    results: "Improved team productivity by 20%.",
  },
]

const otherProjects = [
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
                    <h3 className="text-xl font-semibold text-ink mb-1">{project.title}</h3>
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
                        <div>
                          <h4 className="text-sm font-semibold text-accent-blue mb-1.5">Problem</h4>
                          <p className="text-sm text-subtle leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-accent-blue mb-1.5">Architecture</h4>
                          <p className="text-sm text-subtle leading-relaxed">{project.architecture}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-accent-blue mb-1.5">Challenges</h4>
                          <p className="text-sm text-subtle leading-relaxed">{project.challenges}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-accent-blue mb-1.5">Engineering Decisions</h4>
                          <p className="text-sm text-subtle leading-relaxed">{project.decisions}</p>
                        </div>
                        <div className="md:col-span-2">
                          <h4 className="text-sm font-semibold text-accent-purple mb-1.5">Results</h4>
                          <p className="text-sm text-ink leading-relaxed">{project.results}</p>
                        </div>
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
