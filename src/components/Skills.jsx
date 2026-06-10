import { motion } from 'framer-motion'
import { SKILL_CATEGORIES } from '../data'

const SkillIcon = ({ type }) => {
  const svgMap = {
    ai: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <circle cx="12" cy="6" r="2" fill="#0F0" />
        <circle cx="6" cy="14" r="2" fill="#0F0" />
        <circle cx="18" cy="14" r="2" fill="#0F0" />
        <circle cx="12" cy="20" r="2" fill="#0F0" />
        <line x1="12" y1="8" x2="6" y2="12" stroke="#0F0" strokeWidth="0.8" />
        <line x1="12" y1="8" x2="18" y2="12" stroke="#0F0" strokeWidth="0.8" />
        <line x1="6" y1="16" x2="12" y2="18" stroke="#0F0" strokeWidth="0.8" />
        <line x1="18" y1="16" x2="12" y2="18" stroke="#0F0" strokeWidth="0.8" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <polyline points="8,6 2,12 8,18" fill="none" stroke="#0F0" strokeWidth="1.5" />
        <polyline points="16,6 22,12 16,18" fill="none" stroke="#0F0" strokeWidth="1.5" />
        <line x1="14" y1="4" x2="10" y2="20" stroke="#0F0" strokeWidth="1" />
      </svg>
    ),
    tool: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <rect x="4" y="4" width="7" height="7" fill="none" stroke="#0F0" strokeWidth="1" />
        <rect x="13" y="4" width="7" height="7" fill="none" stroke="#0F0" strokeWidth="1" />
        <rect x="4" y="13" width="7" height="7" fill="none" stroke="#0F0" strokeWidth="1" />
        <rect x="13" y="13" width="7" height="7" rx="2" fill="none" stroke="#0F0" strokeWidth="1" />
      </svg>
    ),
  }
  return (
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      {svgMap[type]}
    </motion.div>
  )
}

const getIconType = (id) => {
  if (id.includes('ai')) return 'ai'
  if (id.includes('engineering')) return 'code'
  return 'tool'
}

export default function Skills() {
  return (
    <section id="skills" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <div className="font-mono text-xs text-text-dim tracking-widest mb-2">
          {'// '}PROTOCOL_LIST
        </div>
        <h2 className="font-terminal text-2xl md:text-3xl lg:text-4xl text-matrix text-glow tracking-wider">
          {'<'}SKILLS{'/>'}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {SKILL_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="card-glow relative overflow-hidden bg-bg-card p-5 md:p-6 glint-effect group"
          >
            <div className="flex items-center gap-3 mb-5">
              <SkillIcon type={getIconType(cat.id)} />
              <h3 className="font-terminal text-lg text-text group-hover:text-matrix transition-colors">
                {cat.categoryName}
              </h3>
            </div>

            <div className="space-y-3">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 text-sm">
                  <span className="text-matrix">{'>'}</span>
                  <span className="text-text-light">{skill.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}