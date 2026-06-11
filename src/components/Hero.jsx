import { useEffect } from 'react'
import NeuralNetwork from './NeuralNetwork'
import { useTypingEffect, useSteppedReveal } from './Animations'
import { HERO_CONTENT } from '../data'
import { motion } from 'framer-motion'

export default function Hero() {
  const typedText = useTypingEffect(
    HERO_CONTENT.lines,
    HERO_CONTENT.typingSpeed,
    HERO_CONTENT.deletingSpeed,
    HERO_CONTENT.pauseTime
  )
  const { visibleCount, started, setStarted } = useSteppedReveal(HERO_CONTENT.lines, 200)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 800)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-[1px] bg-matrix absolute left-[25%]" />
        <div className="h-full w-[1px] bg-matrix absolute left-[50%]" />
        <div className="h-full w-[1px] bg-matrix absolute left-[75%]" />
        <div className="w-full h-[1px] bg-matrix absolute top-[33%]" />
        <div className="w-full h-[1px] bg-matrix absolute top-[66%]" />
      </div>

      {/* <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matrix/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matrix/20 to-transparent" /> */}

      {/* Main Content Grid */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mb-10">
        {/* Left Side: Text Content */}
        <div className="flex-1 flex flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 md:mb-8 text-text-dim font-terminal text-xs md:text-base tracking-widest"
          >
            <span className="text-matrix">{'>'}</span> Initialize... Build_Intelligent_Systems<span className="cursor-blink text-matrix">_</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-xl"
          >
            <div className="font-terminal text-2xl md:text-3xl lg:text-4xl leading-relaxed md:leading-relaxed">
              <span className="text-emerald text-glow-strong">{typedText}</span>
              <span className="cursor-blink text-matrix ml-0.5">█</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-6 text-text-dim text-xs md:text-sm"
            >
              {visibleCount >= HERO_CONTENT.lines.length && (
                <span className="text-matrix/60">{'// '}system.ready — accepting input</span>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            {HERO_CONTENT.cta.map((btn, idx) => (
              <a 
                key={idx}
                href={btn.href} 
                role="button"
                className="card-glow relative overflow-hidden px-6 md:px-8 py-3 bg-bg-card font-mono text-matrix text-sm tracking-wider hover:bg-emerald-dim/20 transition-all duration-300 glint-effect">
                {btn.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Side: Neural Network - Desktop Only */}
          <div className="hidden md:block flex-1 w-full md:w-auto h-96 md:h-screen md:max-h-[600px]">
            <NeuralNetwork />
          </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 3 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-text-dim"
      >
        {'<'}scroll.to.explore{'/>'}
      </motion.div>
    </section>
  )
}