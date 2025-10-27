'use client'

import { Widget, CounterContent, ViewportMode } from '../types'
import { useEffect, useState, useRef } from 'react'

interface CounterWidgetProps {
  widget: Widget<CounterContent>
  viewport: ViewportMode
}

export default function CounterWidget({ widget, viewport }: CounterWidgetProps) {
  const { start, end, duration, prefix, suffix, separator } = widget.content
  const [count, setCount] = useState(start)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateCounter()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCounter = () => {
    const startTime = Date.now()
    const range = end - start

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + range * easeOut)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  const formatNumber = (num: number) => {
    if (separator === ',') {
      return num.toLocaleString('he-IL')
    }
    return num.toString()
  }

  return (
    <div ref={ref} className="widget-counter">
      <span className="text-4xl font-bold">
        {prefix}
        {formatNumber(count)}
        {suffix}
      </span>
    </div>
  )
}

