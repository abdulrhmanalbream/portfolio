import { motion } from 'framer-motion'
import { useContent } from '../i18n/useContent'

// Shared section header: localized eyebrow + stylized <heading/>.
// The heading is wrapped in a dir="ltr" span so the code-style `<` `/>`
// brackets keep their order around the (possibly Arabic) word in RTL mode.
export default function SectionHeader({ section }) {
  const { ui } = useContent()
  const s = ui.sections[section]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="mb-8 md:mb-12"
    >
      <div className="font-mono text-xs text-text-dim tracking-widest mb-2">
        {s.eyebrow}
      </div>
      <h2 className="font-terminal text-2xl md:text-3xl lg:text-4xl text-matrix text-glow tracking-wider">
        <span dir="ltr" className="inline-block">{'<'}{s.heading}{'/>'}</span>
      </h2>
    </motion.div>
  )
}
