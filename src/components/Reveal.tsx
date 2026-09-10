'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './Reveal.module.css'

type RevealTag = 'div' | 'section' | 'article' | 'footer'

type RevealProps = {
  children: ReactNode
  as?: RevealTag
  className?: string
  id?: string
  delay?: number
}

export default function Reveal({ children, as = 'div', className, id, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as
  const revealClassName = [styles.reveal, visible ? styles.visible : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLElement>}
      id={id}
      className={revealClassName}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
