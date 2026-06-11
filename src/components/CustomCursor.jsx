import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    const updateEnabled = () => {
      setEnabled(finePointerQuery.matches)
    }

    const enter = () => setVisible(true)
    const move = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      setPos({ x: e.clientX, y: e.clientY })
      setVisible(true)
    }
    const over = () => setHovering(true)
    const out = () => setHovering(false)
    const down = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      setClicking(true)
    }
    const up = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      setClicking(false)
    }
    const leave = () => setVisible(false)
    const hide = () => {
      setVisible(false)
      setHovering(false)
      setClicking(false)
    }

    updateEnabled()

    if (!finePointerQuery.matches) {
      return undefined
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    window.addEventListener('scroll', hide, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    finePointerQuery.addEventListener('change', updateEnabled)

    const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('pointerenter', over)
      el.addEventListener('pointerleave', out)
    })

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      window.removeEventListener('scroll', hide)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      finePointerQuery.removeEventListener('change', updateEnabled)

      interactives.forEach(el => {
        el.removeEventListener('pointerenter', over)
        el.removeEventListener('pointerleave', out)
      })
    }
  }, [])

  if (!enabled || !visible) return null

  const size = clicking ? 8 : hovering ? 40 : 16
  const ringSize = hovering ? 40 : 32

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: pos.x - size / 2,
          y: pos.y - size / 2,
          width: size,
          height: size,
          backgroundColor: hovering ? '#0F0' : '#fff',
          borderRadius: clicking ? '0px' : hovering ? '2px' : '50%',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none border border-matrix/40"
        animate={{
          x: pos.x - ringSize / 2,
          y: pos.y - ringSize / 2,
          width: ringSize,
          height: ringSize,
          opacity: hovering ? 0 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.8 }}
      />
    </>
  )
}