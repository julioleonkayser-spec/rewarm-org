'use client'

import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

const leads = [
  { name: 'Sarah M.', phone: '(555) 234-1●●●', status: 'HOT', summary: 'Ready to list, needs agent this week', time: '2m ago' },
  { name: 'James R.', phone: '(555) 789-4●●●', status: 'WARM', summary: 'Interested in 6 months, has equity', time: '8m ago' },
  { name: 'Lisa T.', phone: '(555) 456-7●●●', status: 'HOT', summary: 'Pre-approved, actively viewing homes', time: '14m ago' },
  { name: 'Michael K.', phone: '(555) 123-9●●●', status: 'COLD', summary: 'Not interested at this time', time: '21m ago' },
]

const statusStyle: Record<string, string> = {
  HOT: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
  WARM: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
  COLD: 'bg-zinc-800 text-zinc-500 border border-zinc-700',
}


export default function DashboardPreview() {
  const { ref: totalRef, display: totalDisplay } = useCountUp(847, 1.8)
  const { ref: calledRef, display: calledDisplay } = useCountUp(412, 2.0)
  const { ref: hotRef, display: hotDisplay } = useCountUp(53, 1.5)

  return (
    <section className="py-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="badge-mono text-orange-400 inline-block mb-4">THE CLIENT PORTAL</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
          Full pipeline visibility. Total operational control.
        </h2>
        <p className="text-[#71717A] text-lg max-w-xl mx-auto">
          ReWarm is not just an AI caller. It is an operating system your team can actually
          manage — from a single portal that updates in real time after every call.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="max-w-5xl mx-auto"
      >
        {/* Browser chrome */}
        <div className="rounded-2xl overflow-hidden border border-[#1F1F1F] shadow-[0_0_80px_rgba(249,115,22,0.08),0_40px_80px_rgba(0,0,0,0.6)]">
          {/* Title bar */}
          <div className="bg-[#0D0D0D] border-b border-[#1F1F1F] px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-md px-3 py-1.5 flex items-center gap-2 max-w-xs mx-auto">
                <svg className="w-3 h-3 text-[#3F3F46]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-3.5-3-6-3-6S6 7.5 6 11a6 6 0 0012 0c0-3.5-3-6-3-6s-3 2.5-3 6z" />
                </svg>
                <span className="text-[#3F3F46] text-xs font-mono">rewarm.app/portal/dashboard</span>
              </div>
            </div>
            {/* Status indicator */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs font-mono">RUNNING</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="bg-[#0A0A0A] p-6">
            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-[#FAFAFA] text-lg">Lead Dashboard</h3>
                <p className="text-[#52525B] text-sm font-mono">Live · Updated just now</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge-mono text-[#52525B] text-xs">48hr campaign</span>
                <div className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                  <span className="text-orange-400 text-xs font-mono font-bold">● DIALING</span>
                </div>
              </div>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] p-4">
                <p className="text-[#52525B] text-xs font-mono mb-1">TOTAL LEADS</p>
                <p className="text-2xl font-black text-[#FAFAFA] tracking-tight">
                  <span ref={totalRef}><motion.span>{totalDisplay}</motion.span></span>
                </p>
              </div>
              <div className="rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] p-4">
                <p className="text-[#52525B] text-xs font-mono mb-1">CALLED</p>
                <p className="text-2xl font-black text-[#FAFAFA] tracking-tight">
                  <span ref={calledRef}><motion.span>{calledDisplay}</motion.span></span>
                </p>
              </div>
              <div className="rounded-xl bg-[#0D0D0D] border border-orange-500/20 p-4">
                <p className="text-orange-500/70 text-xs font-mono mb-1">HOT LEADS</p>
                <p className="text-2xl font-black text-orange-400 tracking-tight">
                  <span ref={hotRef}><motion.span>{hotDisplay}</motion.span></span>
                </p>
              </div>
              <div className="rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] p-4">
                <p className="text-[#52525B] text-xs font-mono mb-1">AVG QUALITY</p>
                <p className="text-2xl font-black text-[#FAFAFA] tracking-tight">7.8<span className="text-sm text-[#52525B]">/10</span></p>
              </div>
            </div>

            {/* Table + chart row */}
            <div className="grid md:grid-cols-[1fr_160px] gap-4">
              {/* Lead table */}
              <div className="rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] overflow-hidden">
                <div className="px-4 py-3 border-b border-[#1F1F1F] flex items-center justify-between">
                  <span className="text-[#FAFAFA] text-sm font-semibold">Recent Calls</span>
                  <span className="badge-mono text-[#52525B]">{leads.length} shown</span>
                </div>
                <div className="divide-y divide-[#1F1F1F]">
                  {leads.map((lead, i) => (
                    <motion.div
                      key={lead.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      className="px-4 py-3 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-[#52525B] font-semibold">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-[#FAFAFA]">{lead.name}</span>
                          <span className="text-xs text-[#3F3F46] font-mono hidden sm:block">{lead.phone}</span>
                        </div>
                        <p className="text-xs text-[#52525B] truncate">{lead.summary}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`badge-mono text-[10px] px-2 py-1 rounded-md ${statusStyle[lead.status]}`}>
                          {lead.status}
                        </span>
                        <span className="text-[#3F3F46] text-xs hidden md:block">{lead.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Donut chart */}
              <div className="rounded-xl bg-[#0D0D0D] border border-[#1F1F1F] p-4 flex flex-col items-center justify-center">
                <p className="badge-mono text-[#52525B] mb-4 text-center">OUTCOMES</p>
                <svg viewBox="0 0 100 100" className="w-28 h-28">
                  {/* Background ring */}
                  <circle cx="50" cy="50" r="35" fill="none" stroke="#1F1F1F" strokeWidth="14" />
                  {/* Cold — gray #52525B (56.3%) */}
                  <circle
                    cx="50" cy="50" r="35"
                    fill="none" stroke="#3F3F46" strokeWidth="14"
                    strokeDasharray="123.8 96.1"
                    strokeDashoffset="123.8"
                    transform="rotate(-90 50 50)"
                    strokeLinecap="butt"
                  />
                  {/* Warm — amber (30.8%) */}
                  <circle
                    cx="50" cy="50" r="35"
                    fill="none" stroke="#FCD34D" strokeWidth="14"
                    strokeDasharray="67.8 152.1"
                    strokeDashoffset="191.6"
                    transform="rotate(-90 50 50)"
                    strokeLinecap="butt"
                  />
                  {/* Hot — orange (12.9%) */}
                  <circle
                    cx="50" cy="50" r="35"
                    fill="none" stroke="#F97316" strokeWidth="14"
                    strokeDasharray="28.3 191.6"
                    strokeDashoffset="219.9"
                    transform="rotate(-90 50 50)"
                    strokeLinecap="butt"
                  />
                  {/* Center label */}
                  <text x="50" y="46" textAnchor="middle" fill="#FAFAFA" fontSize="11" fontWeight="bold">412</text>
                  <text x="50" y="57" textAnchor="middle" fill="#52525B" fontSize="7">called</text>
                </svg>
                <div className="mt-3 space-y-1.5 w-full">
                  {[
                    { color: '#F97316', label: 'Hot', count: 53 },
                    { color: '#FCD34D', label: 'Warm', count: 127 },
                    { color: '#3F3F46', label: 'Cold', count: 232 },
                  ].map(({ color, label, count }) => (
                    <div key={label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                        <span className="text-[#71717A]">{label}</span>
                      </div>
                      <span className="font-mono text-[#A1A1AA]">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Portal capability chips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-3"
      >
        {[
          'View performance',
          'Inspect lead outcomes',
          'Pause or activate campaigns',
          'Add notes per lead',
          'Full pipeline visibility',
        ].map((cap) => (
          <div
            key={cap}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
            <span className="font-mono text-sm text-[#71717A]">{cap}</span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
