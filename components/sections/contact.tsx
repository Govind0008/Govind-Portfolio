"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactProps {
  scrollY: number
}

export default function Contact({ scrollY }: ContactProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate contact form
    gsap.fromTo(
      ".contact-form",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-container",
          start: "top 80%",
        },
      },
    )

    // Animate contact info items
    gsap.fromTo(
      ".contact-info-item",
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")

    // Simulate form submission
    setTimeout(() => {
      setFormState("success")
    }, 1500)
  }

  return (
    <section
      id="contact"
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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
            Get In Touch
          </span>
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Have a project in mind? Let's work together!
        </motion.p>
      </motion.div>

      <div className="contact-container w-full max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="contact-info space-y-8"
        >
          <div className="contact-info-item flex items-start space-x-4">
            <div className="bg-purple-500 p-3 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Email</h3>
              <p className="text-gray-300">gsalunke169@gmail.com</p>
            </div>
          </div>

          <div className="contact-info-item flex items-start space-x-4">
            <div className="bg-blue-500 p-3 rounded-full">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Phone</h3>
              <p className="text-gray-300">+91 9356641235</p>
            </div>
          </div>

          <div className="contact-info-item flex items-start space-x-4">
            <div className="bg-green-500 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Location</h3>
              <p className="text-gray-300">Pune, Maharashtra, India</p>
            </div>
          </div>

          <div className="contact-info-item pt-6">
            <h3 className="text-xl font-bold mb-4">Connect with me</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Govind0008"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/g-salunke-677600251"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="contact-form bg-black/50 backdrop-blur-md border border-white/10 rounded-xl p-8"
          style={{
            transformStyle: "preserve-3d",
            transform: `perspective(1000px) rotateY(${((scrollY * 0.002) % 3) - 1.5}deg) rotateX(${((scrollY * 0.001) % 2) - 1}deg)`,
          }}
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your name"
                  required
                  className="bg-black/30 border-white/10 focus:border-purple-500 transition-colors"
                  disabled={formState !== "idle"}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email"
                  required
                  className="bg-black/30 border-white/10 focus:border-purple-500 transition-colors"
                  disabled={formState !== "idle"}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Subject"
                required
                className="bg-black/30 border-white/10 focus:border-purple-500 transition-colors"
                disabled={formState !== "idle"}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your message"
                rows={5}
                required
                className="bg-black/30 border-white/10 focus:border-purple-500 transition-colors resize-none"
                disabled={formState !== "idle"}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-6 h-auto text-lg rounded-xl"
              disabled={formState !== "idle"}
            >
              {formState === "idle" && (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </>
              )}
              {formState === "submitting" && (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              )}
              {formState === "success" && (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Message Sent!
                </>
              )}
              {formState === "error" && (
                <>
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Error Sending
                </>
              )}
            </Button>

            {formState === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-500 text-center mt-4"
              >
                Thank you for your message! I'll get back to you soon.
              </motion.div>
            )}

            {formState === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center mt-4"
              >
                There was an error sending your message. Please try again.
              </motion.div>
            )}
          </div>
        </motion.form>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-24 text-center text-gray-400"
      >
        <p>© {new Date().getFullYear()} Govind Salunke. All rights reserved.</p>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.03}px)` }}
        />
      </div>
    </section>
  )
}
