import { motion } from 'framer-motion'
import { METRICS } from '../data'

export default function Metrics() {
  return (
    <section id="metrics" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <div className="font-mono text-xs text-text-dim tracking-widest mb-2">
          {'// '}PERFORMANCE_INDICATORS
        </div>
        <h2 className="font-terminal text-2xl md:text-3xl lg:text-4xl text-matrix text-glow tracking-wider">
          {'<'}METRICS{'/>'}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="card-glow relative overflow-hidden bg-bg-card p-5 md:p-6 glint-effect group"
          >
            <div className="font-mono text-xs text-emerald tracking-widest mb-2">
              {m.id.toUpperCase().replace(/-/g, '_')}
            </div>
            <h3 className="font-terminal text-lg md:text-xl text-text mb-4 group-hover:text-matrix transition-colors">
              {m.label}
            </h3>

            <div className="font-terminal text-3xl md:text-4xl lg:text-5xl text-emerald text-glow-strong mb-2">
              {m.value}
            </div>

            <div className="font-mono text-xs text-text-dim mb-4 leading-relaxed">
              {m.subValue}
            </div>

            <div className="space-y-1.5 text-xs">
              {m.readouts.map((readout, idx) => (
                <div key={idx} className="flex justify-between items-center text-text-dim">
                  <span className="text-matrix-green">{readout.label}:</span>
                  <span className="text-emerald font-mono">{readout.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 h-1 bg-matrix/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${m.progressPercent}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.3, duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-matrix-green to-emerald"
              />
            </div>
            <div className="mt-1 text-[10px] text-text-dim text-right font-mono">
              {m.progressPercent}%
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}