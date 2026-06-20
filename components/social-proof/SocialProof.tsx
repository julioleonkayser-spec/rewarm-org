'use client'

import { motion } from 'framer-motion'

export default function SocialProof() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="py-24 px-6 border-y border-[#1A1A1A]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <blockquote
          className="mb-6 leading-snug text-[#FAFAFA]"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 2.8vw, 32px)',
          }}
        >
          &ldquo;I had 800 leads sitting dead in a spreadsheet for 14 months.
          ReWarm called all of them in 3 days. Two turned into closings.&rdquo;
        </blockquote>
        <cite className="not-italic badge-mono text-[#52525B]">
          — Sarah K., RE/MAX agent, Phoenix AZ
        </cite>
      </div>
    </motion.section>
  )
}
