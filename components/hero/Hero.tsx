'use client'

import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-mesh">
      {/* Ambient glow — compositor-only */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-25 animate-float1"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.35) 0%, transparent 65%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-15 animate-float2"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 65%)',
          filter: 'blur(100px)',
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20 text-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="flex justify-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/25 bg-orange-500/5 badge-mono text-orange-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            AI VOICE AGENT FOR REAL ESTATE
          </span>
        </motion.div>

        {/* Headline — Inter black + Fraunces italic for "money." */}
        <motion.h1
          variants={item}
          className="font-black leading-[0.9] tracking-[-0.04em] mb-8"
          style={{ fontSize: 'clamp(54px, 8vw, 92px)' }}
        >
          Your dead leads
          <br />
          are still worth
          <br />
          <em
            className="text-gradient-orange not-italic"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontStyle: 'italic',
              fontWeight: 700,
            }}
          >
            money.
          </em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="max-w-xl mx-auto text-[#71717A] leading-relaxed mb-12"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)' }}
        >
          ReWarm calls every cold lead automatically, qualifies them in 90 seconds, and
          live-transfers the hot ones straight to your phone.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={item}
          className="flex items-center justify-center mb-16"
        >
          <a
            href="#pricing"
            className="btn-arrow btn-orange inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-bold text-base"
          >
            Start reactivating <span className="arrow">→</span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
          {[
            '12% recovery rate',
            '90s to qualify',
            '48hrs to first transfer',
          ].map((stat) => (
            <div
              key={stat}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
              <span className="font-mono text-sm text-[#71717A]">{stat}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none" />
    </section>
  )
}
