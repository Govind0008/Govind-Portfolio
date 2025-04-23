"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Coffee, Code, Headphones, Clock1, Laptop, Lightbulb } from "lucide-react"

interface DailyRoutineProps {
  scrollY: number
}

const scheduleItems = [
  { time: "9:00 AM", task: "Morning Planning & Setup", icon: Coffee, color: "bg-amber-500" },
  { time: "10:00 AM", task: "Code Backend / Fix Bugs", icon: Code, color: "bg-blue-500" },
  { time: "1:00 PM", task: "Lunch / Break", icon: Clock1, color: "bg-green-500" },
  { time: "2:00 PM", task: "Frontend Features & Reviews", icon: Laptop, color: "bg-purple-500" },
  { time: "4:00 PM", task: "AI / Automation Workflows", icon: Lightbulb, color: "bg-pink-500" },
  { time: "7:00 PM", task: "Chill / Music / Learning", icon: Headphones, color: "bg-indigo-500" },
]

export default function DailyRoutine({ scrollY }: DailyRoutineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (timelineRef.current) {
      const timeline = timelineRef.current

      // Horizontal scroll inside vertical scroll
      gsap.to(timeline, {
        x: () => -(timeline.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })

      // Animate timeline items
      gsap.fromTo(
        ".timeline-item",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 80%",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id="schedule"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
    >
      <motion.div style={{ opacity }} className="container mx-auto px-4 mb-10 text-center">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
            Daily Routine
          </span>
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          A glimpse into my day-to-day schedule and workflow
        </motion.p>
      </motion.div>

      <div className="timeline-container w-full overflow-hidden">
        <div ref={timelineRef} className="relative flex items-center gap-8 px-10 py-10 min-w-max">
          {scheduleItems.map((item, index) => (
            <motion.div
              key={index}
              className="timeline-item flex flex-col items-center bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-6 w-80 relative"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 ${item.color} p-3 rounded-full`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mt-4 mb-2">{item.time}</h3>
              <p className="text-gray-300 text-center">{item.task}</p>

              {index < scheduleItems.length - 1 && (
                <div className="absolute top-1/2 -right-8 transform -translate-y-1/2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M9 6L15 12L9 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

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
