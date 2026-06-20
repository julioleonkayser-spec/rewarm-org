'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Results', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Client Login', href: 'https://rewarm-client-portal.vercel.app/portal' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#1F1F1F]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
            <defs>
              <linearGradient id="flameGrad" x1="14" y1="2" x2="14" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FCD34D" />
                <stop offset="0.5" stopColor="#F97316" />
                <stop offset="1" stopColor="#EA580C" />
              </linearGradient>
            </defs>
            <path
              d="M14 2C14 2 8 8 8 14C8 17.3 9.8 19.5 12 20.5C11.5 19 11.5 17.5 12.5 16C13.5 14.5 14 13 14 13C14 13 14.5 14.5 15.5 16C16.5 17.5 16.5 19 16 20.5C18.2 19.5 20 17.3 20 14C20 8 14 2 14 2Z"
              fill="url(#flameGrad)"
            />
            <path
              d="M14 13C14 13 12 16 12 18C12 20.2 12.9 22 14 22C15.1 22 16 20.2 16 18C16 16 14 13 14 13Z"
              fill="#FCD34D"
              opacity="0.9"
            />
          </svg>
          <span className="text-[#FAFAFA] font-bold text-lg tracking-tight group-hover:text-orange-400 transition-colors">
            ReWarm
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[#A1A1AA] hover:text-[#FAFAFA] text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            className="btn-arrow inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full btn-orange text-white text-sm font-semibold"
          >
            Get Started <span className="arrow">→</span>
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block w-5 h-0.5 bg-[#FAFAFA] origin-center"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block w-5 h-0.5 bg-[#FAFAFA]"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block w-5 h-0.5 bg-[#FAFAFA] origin-center"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#1F1F1F]"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#A1A1AA] hover:text-[#FAFAFA] text-base font-medium transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                className="btn-arrow btn-orange inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full text-white font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Get Started <span className="arrow">→</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
