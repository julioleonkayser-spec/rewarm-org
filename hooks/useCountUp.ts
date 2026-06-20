'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'

export function useCountUp(target: number, duration = 2): {
  ref: React.RefObject<HTMLSpanElement>
  display: MotionValue<number>
} {
  const ref = useRef<HTMLSpanElement>(null) as React.RefObject<HTMLSpanElement>
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration: duration * 1000, bounce: 0 })
  const display = useTransform(spring, (val) => Math.round(val))

  useEffect(() => {
    if (isInView) count.set(target)
  }, [isInView, count, target])

  return { ref, display }
}
