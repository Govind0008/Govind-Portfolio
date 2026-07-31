"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import MagneticButton from "./ui/magnetic-button"

const navItems = [
  { name: "About", id: "about" },
  { name: "Architecture", id: "architecture" },
  { name: "Projects", id: "projects" },
  { name: "Skills", id: "skills" },
  { name: "Experience", id: "experience" },
  { name: "Contact", id: "contact" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-canvas/85 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="text-base font-semibold text-ink">
          Govind Salunke
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
            <MagneticButton key={item.name} strength={60} className="text-sm text-subtle hover:text-ink transition-colors">
              <a href={`#${item.id}`}>{item.name}</a>
            </MagneticButton>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-ink"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-canvas/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base text-subtle hover:text-ink transition-colors border-b border-white/5 last:border-0"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
