"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Laptop, Sparkles } from "lucide-react"
import MaskedText from "@/components/ui/masked-text"
import MagneticButton from "@/components/ui/magnetic-button"

interface HeroProps {
  scrollY: number
}

export default function Hero({ scrollY }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Parallax layers
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -50])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    tl.to(".hero-title span", {
      y: -100,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.inOut",
    })

    // Animate in the text elements
    gsap.fromTo(
      ".hero-text-animate",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hero-text-animate",
          start: "top 80%",
        },
      },
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: layer1Y }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"
        />
        <motion.div
          style={{ y: layer2Y }}
          className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
        />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative inline-block mb-4"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-black/50 backdrop-blur-sm p-4 rounded-full border border-white/10">
              <Code className="w-12 h-12 text-blue-400" />
            </div>
          </motion.div>

          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <MaskedText delay={0.2} className="block hero-text-animate">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Govind Salunke
              </span>
            </MaskedText>
          </h1>

          <h2 className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            <MaskedText delay={0.4} className="block hero-text-animate">
              <span className="block">Full Stack Web Developer</span>
            </MaskedText>
            <MaskedText delay={0.6} className="block hero-text-animate mt-2">
              <span className="block font-light italic">
                "Turning ideas into scalable, beautiful code — one scroll at a time."
              </span>
            </MaskedText>
          </h2>

          <motion.div style={{ y: layer3Y }} className="flex flex-wrap justify-center gap-4 hero-text-animate">
            <MagneticButton className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <Laptop className="w-4 h-4 text-blue-400" />
              <span className="text-sm">Pune, Maharashtra</span>
            </MagneticButton>
            <MagneticButton className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm">Python, JavaScript, React</span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-white rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
