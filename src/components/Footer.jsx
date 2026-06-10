import { motion } from 'framer-motion'
import { FOOTER_CONTENT } from '../data'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border px-4 md:px-8 lg:px-16 py-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-text-dim">
          {'// '}{FOOTER_CONTENT.copyright}
        </div>
        <div className="font-mono text-xs text-text-dim">
          <span className="text-matrix">{'>'}</span> system.shutdown() <span className="text-matrix/40">[{FOOTER_CONTENT.buildInfo}]</span>
        </div>
        <div className="font-mono text-xs text-text-dim">
          built_with: {FOOTER_CONTENT.techStack}
        </div>
      </div>
    </motion.footer>
  )
}