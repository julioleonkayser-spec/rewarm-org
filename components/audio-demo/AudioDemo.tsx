'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const sarah = {
  lead: 'Sarah M.',
  phone: '(555) 234-1●●●',
  time: '1:10',
  summary: 'Interested in 3BR listing on Oak Lane. Wants to schedule showing this week.',
  transcript: [
    { role: 'ai', text: "Hey, is this Sarah?" },
    { role: 'lead', text: "Yeah, this is Sarah." },
    { role: 'ai', text: "Hey Sarah! This is Matt calling from Mike Thompson's real estate team. You had reached out a while back about homes in Scottsdale and I just wanted to check in — are you still thinking about making a move?" },
    { role: 'lead', text: "Yeah actually, we've been looking more seriously now." },
    { role: 'ai', text: "That's great to hear. What's your timeline looking like — hoping to make a move in the next couple months?" },
    { role: 'lead', text: "Yeah, ideally in the next 60 days. Our lease is ending." },
    { role: 'ai', text: "Got it. And have you gotten pre-approved with a lender yet?" },
    { role: 'lead', text: "We have, yeah. We're approved up to 450." },
    { role: 'ai', text: "Perfect. And are you currently working with another agent, or still open?" },
    { role: 'lead', text: "No, we haven't committed to anyone yet." },
    { role: 'ai', text: "Great — Mike would love to chat with you about this. Let me connect you with him right now, one moment." },
  ],
}

function Waveform({ active }: { active: boolean }) {
  const bars = [4, 8, 14, 20, 28, 20, 14, 24, 32, 24, 18, 28, 22, 16, 10, 6, 12, 20, 28, 20, 14, 22, 30, 22, 16, 10, 18, 26, 18, 12]
  return (
    <div className="flex items-center gap-[3px] h-10">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full flex-shrink-0"
          style={{ width: 3, background: active ? '#F97316' : '#2A2A2A' }}
          animate={active ? { height: [h * 0.5, h, h * 0.7, h * 1.1, h * 0.6, h] } : { height: h * 0.3 + 2 }}
          transition={
            active
              ? { duration: 1.2, repeat: Infinity, delay: i * 0.04, ease: 'easeInOut' }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}

export default function AudioDemo() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function handlePlayPause() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  return (
    <section className="py-32 px-6 bg-[#0D0D0D]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <span className="badge-mono text-orange-400 inline-block mb-5">HEAR IT IN ACTION</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
          Listen to real reactivation calls
        </h2>
        <p className="text-[#71717A] text-lg max-w-md mx-auto">
          The AI handles the conversation. You only pick up when there&apos;s a qualified buyer.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-5xl mx-auto card-surface rounded-2xl overflow-hidden flex flex-col"
      >
        {/* Player bar */}
        <div className="px-6 py-4 border-b border-[#1F1F1F] flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full btn-orange flex items-center justify-center flex-shrink-0 cursor-pointer"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-semibold text-[#FAFAFA]">{sarah.lead} · {sarah.phone}</span>
              <span className="badge-mono text-[#52525B]">{sarah.time}</span>
            </div>
            <Waveform active={playing} />
          </div>

          <span className="badge-mono text-[10px] px-2.5 py-1.5 rounded-md flex-shrink-0 bg-orange-500/15 text-orange-400 border border-orange-500/30">
            HOT
          </span>
        </div>

        {/* Transcript */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-72">
          <div className="space-y-4">
            {sarah.transcript.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className={`flex gap-3 ${line.role === 'ai' ? '' : 'flex-row-reverse'}`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                  line.role === 'ai'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'bg-[#1F1F1F] text-[#71717A]'
                }`}>
                  {line.role === 'ai' ? 'AI' : 'S'}
                </div>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  line.role === 'ai'
                    ? 'bg-[#161616] border border-[#2A2A2A] text-[#A1A1AA] rounded-tl-sm'
                    : 'bg-orange-500/10 border border-orange-500/20 text-[#FAFAFA] rounded-tr-sm'
                }`}>
                  {line.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary footer */}
        <div className="px-6 py-3 bg-[#0D0D0D] border-t border-[#1F1F1F] flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          </svg>
          <p className="text-xs text-[#52525B] font-mono">{sarah.summary}</p>
        </div>
      </motion.div>

      <audio
        ref={audioRef}
        src="/rewarm-sample-call-sarah.mp3"
        preload="metadata"
        onEnded={() => setPlaying(false)}
      />
    </section>
  )
}
