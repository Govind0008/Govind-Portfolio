"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface MaskedTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function MaskedText({ children, className = "", delay = 0 }: MaskedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const variants = {
    hidden: { y: "100%" },
    visible: { y: 0 },
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, ease: "easeOut", delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
