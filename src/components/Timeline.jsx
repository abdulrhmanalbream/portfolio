import { motion } from 'framer-motion'
import { TIMELINE_LOGS } from '../data'

export default function Timeline() {
  return (
    <section id="timeline" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <div className="font-mono text-xs text-text-dim tracking-widest mb-2">
          {'// '}LOG_HISTORY
        </div>
        <h2 className="font-terminal text-2xl md:text-3xl lg:text-4xl text-matrix text-glow tracking-wider">
          {'<'}TIMELINE{'/>'}
        </h2>
      </motion.div>

      <div className="relative max-w-2xl">
        <div className="absolute left-3 md:left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-matrix/40 via-matrix/20 to-transparent" />

        {TIMELINE_LOGS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative pl-10 md:pl-14 pb-8 group"
          >
            <div className="absolute left-3 md:left-5 top-1 w-2 h-2 bg-matrix border border-bg -translate-x-1/2 group-hover:scale-[1.5] transition-transform duration-300" />
            <div className="absolute left-3 md:left-5 top-1 w-6 h-6 border border-matrix/20 rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="card-glow bg-bg-card p-4 md:p-5">
              <div className="font-mono text-xs text-emerald tracking-widest mb-1">
                {item.category} // {item.timestamp}
              </div>
              <h3 className="font-terminal text-base md:text-lg text-text group-hover:text-matrix transition-colors mb-2">
                {item.event}
              </h3>
              <p className="font-mono text-xs text-text-dim leading-relaxed">
                {item.details}
              </p>
              <div className="mt-2 font-mono text-xs text-text-dim">
                <span className="text-matrix">{'['}</span>CHECKPOINT{'_'}{String(i + 1).padStart(2, '0')}<span className="text-matrix">{']'}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}