"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MaskedText from "@/components/ui/masked-text"
import TiltCard from "@/components/ui/tilt-card"

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
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    setTimeout(() => {
      setFormState("success")
    }, 1500)
  }

  return (
    <section id="contact" ref={containerRef} className="relative py-24 md:py-32 px-6">
      <motion.div style={{ opacity }} className="container mx-auto max-w-3xl text-center mb-16">
        <MaskedText className="mb-4">
          <h2 className="text-3xl md:text-[40px] font-bold text-ink">Get In Touch</h2>
        </MaskedText>
        <MaskedText delay={0.1}>
          <p className="text-lg text-subtle">Have a project in mind? Let's work together.</p>
        </MaskedText>
      </motion.div>

      <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-panel border border-white/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-ink mb-0.5">Email</h3>
              <p className="text-subtle">gsalunke169@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-panel border border-white/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-accent-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-ink mb-0.5">Phone</h3>
              <p className="text-subtle">+91 9356641235</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-lg bg-panel border border-white/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-accent-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-ink mb-0.5">Location</h3>
              <p className="text-subtle">Mumbai Metropolitan Region, India</p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="font-semibold text-ink mb-3">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/Govind0008"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-panel border border-white/10 flex items-center justify-center hover:border-accent-blue/40 transition-colors"
              >
                <Github className="w-5 h-5 text-ink" />
              </a>
              <a
                href="https://linkedin.com/in/g-salunke-677600251"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg bg-panel border border-white/10 flex items-center justify-center hover:border-accent-blue/40 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-ink" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <TiltCard className="rounded-xl border border-white/10 bg-panel/50 p-6 md:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-subtle">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    required
                    className="bg-canvas/60 border-white/10 focus:border-accent-blue transition-colors"
                    disabled={formState !== "idle"}
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-subtle">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="bg-canvas/60 border-white/10 focus:border-accent-blue transition-colors"
                    disabled={formState !== "idle"}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-sm font-medium text-subtle">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="Subject"
                  required
                  className="bg-canvas/60 border-white/10 focus:border-accent-blue transition-colors"
                  disabled={formState !== "idle"}
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-subtle">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message"
                  rows={5}
                  required
                  className="bg-canvas/60 border-white/10 focus:border-accent-blue transition-colors resize-none"
                  disabled={formState !== "idle"}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-ink text-canvas hover:bg-accent-blue py-6 h-auto text-base rounded-lg"
                disabled={formState !== "idle"}
              >
                {formState === "idle" && (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
                {formState === "submitting" && (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message Sent!
                  </>
                )}
                {formState === "error" && (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Error Sending
                  </>
                )}
              </Button>

              {formState === "success" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-accent-blue text-center text-sm">
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </TiltCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 text-center text-subtle text-sm"
      >
        <p>© {new Date().getFullYear()} Govind Salunke. All rights reserved.</p>
      </motion.div>
    </section>
  )
}
