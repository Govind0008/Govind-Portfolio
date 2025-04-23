"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Lightbulb, Code, Cog, Rocket, ArrowRight } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"
import MagneticButton from "@/components/ui/magnetic-button"

interface HowIWorkProps {
  scrollY: number
}

const workSteps = [
  {
    title: "Plan",
    description: "I start by understanding your needs and planning the architecture and design of your project.",
    icon: Lightbulb,
    color: "bg-amber-500",
  },
  {
    title: "Code",
    description: "I write clean, maintainable code using modern frameworks and best practices.",
    icon: Code,
    color: "bg-blue-500",
  },
  {
    title: "Automate",
    description: "I implement automation workflows to increase efficiency and reduce manual tasks.",
    icon: Cog,
    color: "bg-purple-500",
  },
  {
    title: "Deliver",
    description: "I deliver high-quality, tested solutions that exceed expectations.",
    icon: Rocket,
    color: "bg-green-500",
  },
]

export default function HowIWork({ scrollY }: HowIWorkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Create a horizontal scroll effect
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    })

    // Animate the progress line
    timeline.to(".progress-line", {
      width: "100%",
      duration: 1,
      ease: "none",
    })

    // Animate each step
    workSteps.forEach((_, index) => {
      const progress = (index / (workSteps.length - 1)) * 100

      timeline.to(
        `.step-${index}`,
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
        },
        progress / 100,
      )

      if (index < workSteps.length - 1) {
        timeline.to(
          `.step-${index}`,
          {
            opacity: 0.7,
            scale: 0.95,
            duration: 0.25,
          },
          (progress + 25) / 100,
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id="how-i-work"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
    >
      <motion.div style={{ opacity, y }} className="container mx-auto px-4 mb-10 text-center">
        <MaskedText className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-transt-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
            How I Work
          </span>
        </MaskedText>
        <MaskedText delay={0.2} className="text-xl text-gray-300 max-w-2xl mx-auto">
          My professional approach to delivering exceptional results
        </MaskedText>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto px-4 mt-10">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="progress-line h-full w-0 bg-gradient-to-r from-amber-500 via-blue-500 to-green-500 rounded-full"></div>
          </div>

          {/* Work Steps */}
          <div className="relative flex justify-between items-center py-20">
            {workSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`step-${index} flex flex-col items-center relative z-10`}
                initial={{ opacity: index === 0 ? 1 : 0.5, scale: index === 0 ? 1 : 0.9 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className={`${step.color} w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-6`}
                  whileHover={{
                    rotate: 5,
                    boxShadow: `0 0 20px ${step.color.replace("bg-", "")}`,
                    transition: { duration: 0.2 },
                  }}
                >
                  <step.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300 text-center max-w-xs">{step.description}</p>

                {index < workSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-12 transform -translate-y-24">
                    <ArrowRight className="w-8 h-8 text-gray-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <MagneticButton className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 rounded-xl">
          <div className="bg-black/80 backdrop-blur-sm px-8 py-4 rounded-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Code Meets Creativity
            </h3>
            <p className="text-gray-300 mt-2">Turning complex problems into elegant solutions</p>
          </div>
        </MagneticButton>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        />
      </div>
    </section>
  )
}
