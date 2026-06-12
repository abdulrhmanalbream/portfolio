import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Monitor, Smartphone, Figma, ExternalLink } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { UI } from '../i18n/translations'
import { toArabicDigits } from '../i18n/digits'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 28, stiffness: 300 },
  },
  exit: { opacity: 0, scale: 0.92, y: 30, transition: { duration: 0.2 } },
}

const imageVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, transition: { duration: 0.2 } }),
}

export default function ProjectModal({ project, isOpen, onClose }) {
  const { lang } = useLanguage()
  const m = UI[lang].modal
  const n = lang === 'ar' ? toArabicDigits : (x) => x
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const screenshots = project?.screenshots || []
  const total = screenshots.length

  const navigate = useCallback(
    (newDir) => {
      if (total === 0) return
      setDirection(newDir)
      setCurrentIndex((prev) => (prev + newDir + total) % total)
    },
    [total]
  )

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, navigate, onClose])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Reset index on project change
  useEffect(() => {
    setCurrentIndex(0)
    setDirection(0)
  }, [project?.id])

  if (!project) return null

  const current = screenshots[currentIndex]
  const isMobile = current?.isMobile

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="project-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="project-modal__header">
              <div className="project-modal__header-left">
                <span className="project-modal__tag">{project.category}</span>
                <h2 className="project-modal__title">{project.title}</h2>
              </div>
              <button className="project-modal__close" onClick={onClose} aria-label="Close modal">
                <X size={18} />
                <span>{m.close}</span>
              </button>
            </div>

            {/* ── Gallery ── */}
            {total > 0 && (
              <div className="project-modal__gallery">
                {/* Main image viewport */}
                <div className={`project-modal__viewport ${isMobile ? 'project-modal__viewport--mobile' : ''}`}>
                  {/* Scanline effect */}
                  <div className="project-modal__scanline" />

                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.img
                      key={currentIndex}
                      src={current.src}
                      alt={current.alt}
                      className="project-modal__image"
                      custom={direction}
                      variants={imageVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Navigation arrows */}
                  {total > 1 && (
                    <>
                      <button
                        className="project-modal__nav project-modal__nav--prev"
                        onClick={() => navigate(-1)}
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        className="project-modal__nav project-modal__nav--next"
                        onClick={() => navigate(1)}
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Counter & device badge */}
                  <div className="project-modal__counter">
                    <span className="project-modal__device-badge">
                      {isMobile ? <Smartphone size={12} /> : <Monitor size={12} />}
                    </span>
                    <span dir="ltr">{n(String(currentIndex + 1).padStart(2, '0'))}</span>
                    <span className="project-modal__counter-sep">/</span>
                    <span dir="ltr">{n(String(total).padStart(2, '0'))}</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="project-modal__caption">
                  <span className="project-modal__caption-marker">&gt;&gt;</span>
                  {current.alt}
                </div>

                {/* Thumbnail strip */}
                {total > 1 && (
                  <div className="project-modal__thumbs">
                    {screenshots.map((shot, i) => (
                      <button
                        key={i}
                        className={`project-modal__thumb ${i === currentIndex ? 'project-modal__thumb--active' : ''}`}
                        onClick={() => {
                          setDirection(i > currentIndex ? 1 : -1)
                          setCurrentIndex(i)
                        }}
                        aria-label={`Go to screenshot ${i + 1}`}
                      >
                        <img src={shot.src} alt="" draggable={false} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Info Section ── */}
            <div className="project-modal__info">
              <div className="project-modal__meta">
                <span className={`project-modal__status project-modal__status--${project.status.replace(/\s+/g, '-').toLowerCase()}`}>
                  {UI[lang].status[project.status] ?? project.status}
                </span>
                {project.figma && (
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal__figma-link"
                  >
                    <Figma size={13} />
                    <span>{m.viewFigma}</span>
                    <ExternalLink size={11} />
                  </a>
                )}
              </div>
              <p className="project-modal__desc">{project.description}</p>
              <div className="project-modal__tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-modal__tech-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* ── Footer hint ── */}
            <div className="project-modal__footer">
              <span dir="ltr">← → {m.navigate}</span>
              <span>{m.escClose}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
