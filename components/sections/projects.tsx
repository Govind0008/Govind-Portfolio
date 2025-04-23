"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, Users, Music, Film, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectsProps {
  scrollY: number
}

const projects = [
  {
    title: "Employee Task Management System",
    description: "React + REST API for managing tasks. Improved team productivity by 20%.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["React", "REST API", "Node.js"],
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Automated Resume Processing System",
    description:
      "n8n + OpenAI + Google Cloud. Resume scoring, data extraction, interview scheduling. Cut hiring time by 30%.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["OpenAI", "n8n", "Google Cloud"],
    icon: FileText,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Netflix Clone",
    description: "Responsive UI with HTML, CSS, JS. Includes media controls and interactivity.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: Film,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Spotify Clone",
    description: "Responsive UI with HTML, CSS, JS. Includes media controls and interactivity.",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["HTML", "CSS", "JavaScript"],
    icon: Music,
    color: "from-green-500 to-lime-500",
  },
]

export default function Projects({ scrollY }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate project cards
    gsap.fromTo(
      ".project-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".projects-container",
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
      id="projects"
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
            Featured Projects
          </span>
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          A showcase of my recent work and technical capabilities
        </motion.p>
      </motion.div>

      <div className="projects-container w-full max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card group relative bg-black/50 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              transition: { duration: 0.2 },
            }}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1000px) rotateY(${((scrollY * 0.01 + index * 5) % 10) - 5}deg) rotateX(${((scrollY * 0.005 + index * 3) % 6) - 3}deg)`,
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                backgroundImage: `linear-gradient(to bottom right, ${project.color.split(" ")[0].replace("from-", "")}, ${project.color.split(" ")[1].replace("to-", "")})`,
              }}
            />

            <div className="relative p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-full bg-gradient-to-br ${project.color}`}>
                  <project.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold ml-4">{project.title}</h3>
              </div>

              <p className="text-gray-300 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="group-hover:bg-white/10 transition-colors">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
                <Button variant="outline" size="sm" className="group-hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Demo
                </Button>
              </div>

              <div
                className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-gradient-to-br opacity-30 rounded-full blur-3xl group-hover:opacity-50 transition-opacity duration-300"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${project.color.split(" ")[0].replace("from-", "")}, ${project.color.split(" ")[1].replace("to-", "")})`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.02}px)` }}
        />
      </div>
    </section>
  )
}
