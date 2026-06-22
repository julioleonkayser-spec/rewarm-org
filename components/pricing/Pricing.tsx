'use client'

import { motion } from 'framer-motion'

const BASE_FEATURES = [
  'AI voice agent (calls your leads 24/7)',
  'Live client portal with real-time metrics',
  'Auto-classification: HOT / WARM / COLD',
  'Live transfer to your phone',
  'Google Sheets sync',
  'Email notifications',
]

const plans = [
  {
    name: 'Starter',
    price: 97,
    leads: '100 leads / month',
    features: BASE_FEATURES,
    proAddons: [] as string[],
    cta: 'Start Starter Plan',
    href: 'https://www.paypal.com/ncp/payment/5D5E57YJH3HLG',
    featured: false,
  },
  {
    name: 'Growth',
    price: 197,
    leads: '300 leads / month',
    features: BASE_FEATURES,
    proAddons: [] as string[],
    cta: 'Start Growth Plan',
    href: 'https://www.paypal.com/ncp/payment/PVVBG5JWTX92Q',
    featured: true,
  },
  {
    name: 'Pro',
    price: 397,
    leads: '600 leads / month',
    features: BASE_FEATURES,
    proAddons: ['Dedicated onboarding call', 'Custom agent setup'],
    cta: 'Start Pro Plan',
    href: 'https://www.paypal.com/ncp/payment/DDHFGGG3DXSUN',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-40 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
        className="text-center mb-16"
      >
        <span className="badge-mono text-orange-400 inline-block mb-5">PRICING</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
          Access the ReWarm system.
        </h2>
        <p className="text-[#71717A] text-lg max-w-md mx-auto">
          No contracts. No setup fees. Cancel anytime.
        </p>
        <p className="text-[#A1A1AA] text-sm max-w-sm mx-auto mt-4 tracking-wide">
          Founding client pricing — 50% off standard rates for a limited number of early clients.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' as const }}
            className={`card-sweep relative rounded-2xl p-8 flex flex-col ${
              plan.featured
                ? 'card-featured md:-translate-y-4'
                : 'card-surface opacity-90'
            }`}
          >
            {/* Ambient glow behind featured card */}
            {plan.featured && (
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl"
                style={{
                  boxShadow: '0 0 0 1px rgba(249,115,22,0.45), 0 0 60px rgba(249,115,22,0.18), 0 0 120px rgba(249,115,22,0.08)',
                }}
              />
            )}

            {plan.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <span
                  className="badge-mono text-[10px] px-4 py-1.5 rounded-full whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg,#F97316,#FCD34D)', color: '#0A0A0A' }}
                >
                  MOST POPULAR
                </span>
              </div>
            )}

            <div className="mb-7">
              <p className="text-[#A1A1AA] font-semibold mb-5">{plan.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black text-[#FAFAFA] tracking-tight">
                  ${plan.price}
                </span>
                <span className="text-[#52525B] text-sm">/mo</span>
              </div>
              <p className="badge-mono text-orange-400/70 mt-3">{plan.leads}</p>
            </div>

            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#A1A1AA]">
                  <svg className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
              {plan.proAddons.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-orange-400">
                  <svg className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={plan.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-arrow w-full text-center py-3.5 rounded-xl font-bold text-sm transition-colors inline-flex items-center justify-center gap-2 ${
                plan.featured
                  ? 'btn-orange text-white'
                  : 'bg-[#161616] border border-[#2A2A2A] text-[#FAFAFA] hover:border-orange-500/30 hover:text-orange-400'
              }`}
            >
              {plan.cta} <span className="arrow">→</span>
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-center mt-10 space-y-3"
      >
        <p className="text-[#52525B] text-sm max-w-lg mx-auto leading-relaxed">
          Every plan includes the full ReWarm system: AI reactivation agent, HOT / WARM / COLD
          classification, live transfers, and your client portal. Onboarding within 48 hours.
        </p>
      </motion.div>
    </section>
  )
}
