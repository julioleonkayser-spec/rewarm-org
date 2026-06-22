'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

function MetricCard({
  value,
  suffix = '',
  label,
  desc,
  animate = true,
  target = 0,
}: {
  value?: string
  suffix?: string
  label: string
  desc: string
  animate?: boolean
  target?: number
}) {
  const { ref, display } = useCountUp(target, 2)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(249,115,22,0.08)' }}
      className="card-surface rounded-2xl p-7 flex flex-col gap-3 cursor-default transition-shadow"
    >
      <div className="text-5xl font-black tracking-tight text-gradient-orange leading-none">
        {animate ? (
          <span ref={ref}>
            <motion.span>{display}</motion.span>
            {suffix}
          </span>
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div>
        <p className="font-bold text-[#FAFAFA] text-lg mb-1">{label}</p>
        <p className="text-[#71717A] text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Results() {
  return (
    <section id="results" className="py-40 px-6 bg-[#0D0D0D]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <span className="badge-mono text-orange-400 inline-block mb-4">WHAT THE SYSTEM DELIVERS</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
          One system. One dormant database. Here&apos;s what changes.
        </h2>
        <p className="text-[#71717A] text-lg max-w-xl mx-auto">
          Running ReWarm on a dormant contact database of 500 real estate leads:
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-14">
        <MetricCard value="ONE" animate={false} label="Unified Operating System" desc="Reactivate, qualify, transfer, and track — integrated in one client portal" />
        <MetricCard value="90s" animate={false} label="Avg Qualification Time" desc="Per lead, per call, automated" />
        <MetricCard value="24/7" animate={false} label="Always Dialing" desc="Never takes a day off, never burns out" />
        <MetricCard value="48h" animate={false} label="Time to First Hot Transfer" desc="From list upload to live call on your phone" />
        <MetricCard value="$0" animate={false} label="New Ad Budget Needed" desc="Works the list you already paid for" />
        <MetricCard animate target={90} suffix="%" label="Reduction in Manual Dialing" desc="Only pick up for pre-qualified leads" />
      </div>
    </section>
  )
}
