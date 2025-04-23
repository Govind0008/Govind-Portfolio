"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import MagneticButton from "./ui/magnetic-button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Govind Salunke
          </span>
        </motion.div>

        <div className="flex items-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:flex gap-6"
          >
            {[
              { name: "About", id: "about" },
              { name: "Process", id: "how-i-work" },
              { name: "Projects", id: "projects" },
              { name: "Skills", id: "skills" },
              { name: "Contact", id: "contact" },
            ].map((item, i) => (
              <MagneticButton
                key={item.name}
                strength={50}
                className="text-sm hover:text-blue-400 transition-colors relative group"
              >
                <a href={`#${item.id}`}>
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </MagneticButton>
            ))}
          </motion.div>

          <MagneticButton
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-6 rounded-full flex items-center justify-between px-1 transition duration-300 focus:outline-none"
            strength={20}
          >
            <div
              className={`absolute inset-0 rounded-full transition-colors duration-500 ${
                theme === "dark" ? "bg-gray-800" : "bg-blue-100"
              }`}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                {theme === "dark" ? (
                  <Moon className="h-4 w-4 text-blue-300" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-500" />
                )}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="absolute z-0 rounded-full"
              animate={{
                x: theme === "dark" ? "0%" : "100%",
                translateX: theme === "dark" ? "0%" : "-100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className={`w-5 h-5 rounded-full ${theme === "dark" ? "bg-blue-500" : "bg-yellow-400"}`}>
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-70"
                  style={{
                    backgroundColor: theme === "dark" ? "#3b82f6" : "#f59e0b",
                    transform: "scale(1.2)",
                  }}
                />
              </div>
            </motion.div>
          </MagneticButton>
        </div>
      </div>
    </motion.nav>
  )
}
