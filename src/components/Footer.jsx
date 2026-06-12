import { motion } from 'framer-motion'
import { FOOTER_CONTENT } from '../data'
import { useContent } from '../i18n/useContent'

export default function Footer() {
  const { ui, n } = useContent()
  const year = new Date().getFullYear()
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border px-4 md:px-8 lg:px-16 py-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs text-text-dim">
          {'// '}{ui.footer.name} — {n(year)}
        </div>
        <div className="font-mono text-xs text-text-dim">
          <span className="text-matrix">{'>'}</span> {ui.footer.shutdown} <span className="text-matrix/40">[{ui.footer.buildInfo}]</span>
        </div>
        <div className="font-mono text-xs text-text-dim">
          {ui.footer.builtWith} {FOOTER_CONTENT.techStack}
        </div>
      </div>
    </motion.footer>
  )
}