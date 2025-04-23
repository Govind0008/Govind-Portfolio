"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "@studio-freight/lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Hero from "@/components/sections/hero"
import HowIWork from "@/components/sections/how-i-work"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Experience from "@/components/sections/experience"
import Contact from "@/components/sections/contact"
import Navbar from "@/components/navbar"
import Cursor from "@/components/cursor"
import ScrollProgress from "@/components/scroll-progress"
import FloatingTechIcons from "@/components/floating-tech-icons"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Update scroll position for parallax effects
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setScrollY(scroll)
    })

    // Setup section transitions
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        },
      )
    })

    setIsMounted(true)

    return () => {
      lenis.destroy()
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="govind-theme">
      <div className="relative bg-black dark:bg-black text-white">
        <Navbar />
        <Cursor />
        <ScrollProgress />

        <div className="fixed inset-0 z-0 pointer-events-none">
          <FloatingTechIcons scrollY={scrollY} />
        </div>

        <div ref={containerRef} className="relative z-10">
          <Hero scrollY={scrollY} />
          <HowIWork scrollY={scrollY} />
          <Projects scrollY={scrollY} />
          <Skills scrollY={scrollY} />
          <Experience scrollY={scrollY} />
          <Contact scrollY={scrollY} />
        </div>
      </div>
    </ThemeProvider>
  )
}
