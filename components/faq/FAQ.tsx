'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: "How is this different from a ringless voicemail or SMS blast?",
    a: "ReWarm has actual two-way conversations. The AI listens, responds, handles objections, and qualifies intent in real time. A voicemail drop or SMS blast can't qualify a lead — ReWarm can.",
  },
  {
    q: "What happens when a lead is classified HOT?",
    a: "When a lead is ready to talk, you get a live transfer instantly. No delay, no lost momentum. ReWarm bridges the call directly to your phone so you can take it from there.",
  },
  {
    q: "How does ReWarm know when to call my leads?",
    a: "You set the calling window during onboarding — business hours, extended hours, or 24/7. ReWarm works your entire list within that window automatically, prioritising leads who haven't been contacted longest.",
  },
  {
    q: "Is this compliant with calling regulations?",
    a: "Yes. ReWarm operates with full TCPA compliance. Calls are made to leads who previously opted in or engaged with your business. DNC scrubbing runs before every campaign, and all opt-out requests are honored immediately and permanently.",
  },
  {
    q: "What if a lead asks to be removed?",
    a: "If a lead requests not to be called, ReWarm flags them immediately, stops all future contact, and marks them in your portal. This happens automatically without any manual intervention.",
  },
  {
    q: "Do I need any technical setup?",
    a: "No. You add your leads to a Google Sheet using a template we provide — name, phone number, that's it. ReWarm connects to the sheet automatically. Onboarding takes under 30 minutes.",
  },
  {
    q: "What does the AI say when it calls?",
    a: "The AI introduces itself as calling on your behalf, references the lead's original inquiry to establish context, and qualifies their intent through natural conversation. It handles common objections, answers basic questions, and hands off seamlessly when a lead is ready to talk.",
  },
]

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`border-b border-[#1A1A1A] last:border-0 transition-colors ${open ? 'border-orange-500/10' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left cursor-pointer group"
      >
        <span className={`text-base font-semibold leading-snug transition-colors ${open ? 'text-[#FAFAFA]' : 'text-[#A1A1AA] group-hover:text-[#FAFAFA]'}`}>
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all mt-0.5 ${
            open
              ? 'border-orange-500/50 bg-orange-500/10 text-orange-400 rotate-45'
              : 'border-[#2A2A2A] text-[#52525B] group-hover:border-[#3A3A3A]'
          }`}
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-[#71717A] text-sm leading-relaxed pb-6 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-40 px-6 bg-[#0D0D0D]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <span className="badge-mono text-orange-400 inline-block mb-5">FAQ</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
          Everything you need to know.
        </h2>
        <p className="text-[#71717A] text-lg max-w-md mx-auto">
          Still have questions? Email us at{' '}
          <a href="mailto:support@rewarm.org" className="text-orange-400 hover:text-orange-300 transition-colors">
            support@rewarm.org
          </a>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="max-w-3xl mx-auto card-surface rounded-2xl px-8"
      >
        {faqs.map((item, i) => (
          <FAQItem
            key={i}
            q={item.q}
            a={item.a}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </motion.div>
    </section>
  )
}
