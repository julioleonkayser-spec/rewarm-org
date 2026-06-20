'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Drop your leads into Google Sheets',
    desc: "Paste your list into your Google Sheet. Names and numbers — that's all ReWarm needs.",
  },
  {
    num: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    title: 'ReWarm dials automatically, 24/7',
    desc: 'The AI calls every lead around the clock. Natural conversation — no robot voice, no canned scripts.',
  },
  {
    num: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Every lead gets classified HOT / WARM / COLD',
    desc: 'Each outcome logged with timeline, intent signals, and a plain-English summary per row.',
  },
  {
    num: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: 'Hot leads transfer live to your phone',
    desc: 'The moment a lead qualifies, ReWarm bridges the call to you immediately. You just close.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-40 px-6 bg-[#0D0D0D]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
        className="text-center mb-24"
      >
        <span className="badge-mono text-orange-400 inline-block mb-5">THE PROCESS</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
          Cold list in. Hot calls out.
        </h2>
        <p className="text-[#71717A] text-lg max-w-sm mx-auto">
          Four steps. Zero manual dialing.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="hidden md:block relative mb-14">
          <div className="absolute top-8 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-[#1F1F1F] via-orange-500/25 to-[#1F1F1F]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {steps.map(({ num, icon, title, desc }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' as const }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="md:hidden absolute left-5 top-16 bottom-0 w-px bg-gradient-to-b from-orange-500/25 to-transparent -mb-10" />
              )}

              <div className="flex md:flex-col gap-5 md:gap-0">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-orange-500 mb-6 relative z-10">
                    {icon}
                  </div>
                  <span
                    className="absolute -top-2 -right-2 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: 'linear-gradient(135deg,#F97316,#FCD34D)', color: '#0A0A0A' }}
                  >
                    {num}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-[#FAFAFA] text-base mb-2 leading-snug">{title}</h3>
                  <p className="text-[#71717A] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
