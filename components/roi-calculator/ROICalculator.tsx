'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

function Slider({
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string
  hint?: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  format: (v: number) => string
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-[#FAFAFA]">{label}</p>
          {hint && <p className="text-xs text-[#52525B] mt-0.5">{hint}</p>}
        </div>
        <span className="text-xl font-black text-gradient-orange tabular-nums whitespace-nowrap">
          {format(value)}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #F97316 ${pct}%, #1F1F1F ${pct}%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-mono text-[#3F3F46]">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

function ResultCard({
  label,
  value,
  highlight = false,
  note,
}: {
  label: string
  value: string
  highlight?: boolean
  note?: string
}) {
  return (
    <div
      className={`rounded-2xl p-5 flex flex-col gap-2 ${
        highlight ? 'card-featured' : 'card-surface'
      }`}
    >
      {highlight && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{ boxShadow: '0 0 0 1px rgba(249,115,22,0.35), 0 0 40px rgba(249,115,22,0.12)' }}
        />
      )}
      <p className="badge-mono text-[#52525B]">{label}</p>
      <p
        className={`text-3xl font-black tracking-tight leading-none ${
          highlight ? 'text-gradient-orange' : 'text-[#FAFAFA]'
        }`}
      >
        {value}
      </p>
      {note && <p className="text-xs text-[#52525B] leading-relaxed">{note}</p>}
    </div>
  )
}

const REWARM_COST = 97 // starter plan

export default function ROICalculator() {
  const [deadLeads, setDeadLeads] = useState(500)
  const [closeRate, setCloseRate] = useState(5)
  const [avgCommission, setAvgCommission] = useState(8000)

  const results = useMemo(() => {
    const recovered = Math.round(deadLeads * 0.12)
    const newClosings = +(recovered * (closeRate / 100)).toFixed(1)
    const revenue = Math.round(newClosings * avgCommission)
    const netGain = revenue - REWARM_COST
    const roi = revenue > 0 ? Math.round((netGain / REWARM_COST) * 100) : 0
    return { recovered, newClosings, revenue, netGain, roi }
  }, [deadLeads, closeRate, avgCommission])

  return (
    <section className="py-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <span className="badge-mono text-orange-400 inline-block mb-5">ROI CALCULATOR</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
          What&apos;s your dead list worth?
        </h2>
        <p className="text-[#71717A] text-lg max-w-md mx-auto">
          See how much revenue is sitting in your cold lead database right now.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Sliders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="card-surface rounded-2xl p-8 space-y-10"
        >
          <Slider
            label="What's your dead list?"
            hint="Cold leads sitting uncontacted"
            min={100}
            max={5000}
            step={50}
            value={deadLeads}
            onChange={setDeadLeads}
            format={(v) => v.toLocaleString() + ' leads'}
          />
          <Slider
            label="Your current close rate"
            hint="Of qualified leads that convert"
            min={1}
            max={20}
            step={1}
            value={closeRate}
            onChange={setCloseRate}
            format={(v) => v + '%'}
          />
          <Slider
            label="Average commission per deal"
            hint="Your typical agent commission"
            min={2000}
            max={25000}
            step={500}
            value={avgCommission}
            onChange={setAvgCommission}
            format={(v) => '$' + v.toLocaleString()}
          />

          <p className="text-xs text-[#3F3F46] font-mono pt-2 border-t border-[#1A1A1A]">
            Based on ReWarm&apos;s 12% average recovery rate.
          </p>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="space-y-4"
        >
          <div className="relative">
            <ResultCard
              label="NET GAIN AFTER REWARM"
              value={'$' + results.netGain.toLocaleString()}
              highlight
              note={`${results.roi}× return on your $${REWARM_COST}/mo plan`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label="RECOVERED LEADS"
              value={results.recovered.toLocaleString()}
            />
            <ResultCard
              label="NEW CLOSINGS"
              value={results.newClosings.toString()}
            />
          </div>

          <ResultCard
            label="GROSS REVENUE"
            value={'$' + results.revenue.toLocaleString()}
          />

          <div className="card-surface rounded-2xl p-5">
            <p className="badge-mono text-[#52525B] mb-3">THE COST OF INACTION</p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#71717A]">Leads decaying each month</span>
                <span className="font-mono text-red-400">−30%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#71717A]">Value left on table</span>
                <span className="font-mono text-red-400">
                  ${Math.round(results.revenue * 0.3).toLocaleString()}/mo
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#71717A]">Manual callbacks reach</span>
                <span className="font-mono text-[#52525B]">&lt;5% of list</span>
              </div>
            </div>
          </div>

          <a
            href="#pricing"
            className="btn-arrow btn-orange w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm text-white"
          >
            Start reactivating your pipeline <span className="arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
