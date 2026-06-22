'use client'

import { motion } from 'framer-motion'
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

const features = [
  {
    title: 'Reactivates your entire contact database in 48 hours',
    desc: 'Every contact dialed, every outcome logged.',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Qualifies in 90 seconds per lead',
    desc: 'Natural AI conversation — no robot scripts.',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: 'Live-transfers hot leads directly to you',
    desc: 'When they qualify, your phone rings immediately.',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-500">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
  },
]

export default function ProblemSolution() {
  return (
    <section className="py-40 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        {/* Left — Problem */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          <motion.div variants={fadeUp}>
            <span className="inline-block px-3 py-1.5 rounded-md bg-red-950/30 border border-red-900/30 badge-mono text-red-400 mb-7">
              THE LEAK IN YOUR PIPELINE
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-7"
          >
            You paid for those leads.
            <br />
            <span className="text-[#52525B]">Now they&apos;re rotting.</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#71717A] text-lg leading-relaxed mb-12">
            Most agents have thousands of contacts in a database they paid to build — then set
            aside. That dormant pipeline represents real potential commission sitting idle.
            ReWarm reactivates every contact automatically, so you stay focused on closings
            while the system does the work.
          </motion.p>

          <motion.div variants={fadeUp} className="card-surface rounded-2xl p-7 inline-block">
            <p className="text-[#52525B] text-sm mb-3">the reality</p>
            <p className="text-xl font-bold text-[#FAFAFA] leading-snug max-w-xs">
              Most teams are sitting on hundreds or thousands of unworked leads
            </p>
            <p className="text-[#3F3F46] text-sm mt-3 font-mono">sitting idle right now</p>
          </motion.div>
        </motion.div>

        {/* Right — Solution */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } } }}
        >
          <motion.div variants={fadeUp} className="card-featured rounded-2xl p-9">
            <div className="badge-mono text-orange-400 mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              THE REWARM SYSTEM
            </div>

            <div className="space-y-7">
              {features.map(({ icon, title, desc }) => (
                <motion.div key={title} variants={fadeUp} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center mt-0.5">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-[#FAFAFA] mb-1">{title}</p>
                    <p className="text-[#71717A] text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-9 pt-7 border-t border-[#1F1F1F]">
              <p className="text-sm text-[#3F3F46] font-mono">
                Works on your existing list. No new ad spend required.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
