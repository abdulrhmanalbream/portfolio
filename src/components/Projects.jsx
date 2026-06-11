import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { PROJECTS } from '../data'
import { Images, Figma, ExternalLink } from 'lucide-react'
import ProjectModal from './ProjectModal'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function Projects() {
  const ref = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <div className="font-mono text-xs text-text-dim tracking-widest mb-2">
          {'// '}DATA_MODULES
        </div>
        <h2 className="font-terminal text-2xl md:text-3xl lg:text-4xl text-matrix text-glow tracking-wider">
          {'<'}PROJECTS{'/>'}
        </h2>
      </motion.div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="card-glow relative overflow-hidden bg-bg-card p-5 md:p-6 glint-effect group cursor-pointer"
            onClick={() => project.screenshots?.length > 0 && setSelectedProject(project)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && project.screenshots?.length > 0) setSelectedProject(project)
            }}
          >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-matrix/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Screenshot preview badge */}
            {project.screenshots?.length > 0 && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 bg-matrix/5 border border-matrix/15 font-mono text-[10px] text-matrix/60 group-hover:text-matrix group-hover:border-matrix/40 transition-all duration-300">
                <Images size={11} />
                <span>{project.screenshots.length}</span>
              </div>
            )}

            <div className="font-mono text-xs text-emerald tracking-widest mb-2 uppercase">
              {project.category}
            </div>
            <h3 className="font-terminal text-lg md:text-xl text-text mb-2 group-hover:text-matrix transition-colors duration-300">
              {project.title}
            </h3>
            <p className="font-mono text-xs md:text-sm text-text-dim leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 font-mono text-xs bg-matrix/5 text-matrix border border-matrix/10 group-hover:border-matrix/30 transition-colors">
                  {t}
                </span>
              ))}
            </div>

            {/* Figma link + view_module */}
            <div className="flex items-center justify-between mt-4">
              {project.figma ? (
                <a
                  href={project.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 px-2 py-1 font-mono text-[10px] text-purple-400/60 border border-purple-400/15 bg-purple-400/5 hover:text-purple-300 hover:border-purple-400/40 hover:bg-purple-400/10 transition-all duration-300"
                >
                  <Figma size={11} />
                  <span>Figma</span>
                  <ExternalLink size={9} />
                </a>
              ) : (
                <div />
              )}
              <div className="font-mono text-xs text-text-dim opacity-0 group-hover:opacity-100 transition-opacity">
                {'>>'} view_module
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}