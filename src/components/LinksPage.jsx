import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, Send, FileText, ArrowUpRight, CornerDownLeft } from 'lucide-react'
import { CONTACT_INFO } from '../data'

/*
 * Terminal-styled "linktree" — a standalone, shareable page reached at  #/links
 *
 * Links are ALWAYS visible and one click away (a linktree's whole job), but the
 * terminal is also genuinely interactive: type `help`, `ls`, `open github`,
 * `whoami`, `clear`, or `home`. The red window dot closes back to the portfolio.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * EDIT YOUR LINKS HERE. github / linkedin / email come from src/data.ts
 * (CONTACT_INFO). The three marked `// TODO` are placeholders — drop in your
 * real handles. The resume points at public/Abdulrhman_Alburaym.pdf.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// Brand glyphs lucide doesn't ship — kept tiny and inheriting `currentColor`.
const XIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden {...props}>
    <path d="M18.9 1.6h3.3l-7.2 8.2 8.5 11.3h-6.6l-5.2-6.8-6 6.8H1.4l7.7-8.8L.9 1.6h6.8l4.7 6.2 6.5-6.2Zm-1.2 18h1.8L7.4 3.4H5.5l12.2 16.2Z" />
  </svg>
)

const KaggleIcon = (props) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden {...props}>
    <path d="M18.3 23.9c0 .1-.1.2-.2.2h-2.9c-.12 0-.22-.05-.3-.15l-5-6.35-1.4 1.33v4.97c0 .13-.08.2-.2.2H6c-.13 0-.2-.07-.2-.2V.2C5.8.07 5.87 0 6 0h2.3c.12 0 .2.07.2.2v14.43l6.03-6.1c.08-.1.18-.13.3-.13h3c.1 0 .18.07.2.18 0 .07 0 .12-.05.18l-6.35 6.12 6.62 8.6c.05.06.05.13.05.22Z" />
  </svg>
)

const LINKS = [
  { key: 'linkedin', label: 'linkedin', handle: 'linkedin.com/in/abdulrhmanalbream', href: CONTACT_INFO.linkedin, icon: <Linkedin size={15} />, ext: true, aliases: ['in'] },
  { key: 'github', label: 'github', handle: 'github.com/abdulrhmanalbream', href: CONTACT_INFO.github, icon: <Github size={15} />, ext: true, aliases: [] },
  { key: 'email', label: 'email', handle: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}`, icon: <Mail size={15} />, ext: false, aliases: ['mail'] },
  { key: 'resume', label: 'resume', handle: 'Abdulrhman_Alburaym.pdf', href: '/Abdulrhman_Alburaym.pdf', icon: <FileText size={15} />, ext: true, aliases: ['cv'] },
  { key: 'kaggle', label: 'kaggle', handle: 'kaggle.com/abdulrhmanalbream', href: 'https://www.kaggle.com/abdulrhmanalbream', icon: <KaggleIcon />, ext: true, aliases: [] },          // TODO: real handle
  { key: 'x', label: 'x', handle: 'x.com/abdulrhmanalbream', href: 'https://x.com/abdulrhmanalbream', icon: <XIcon />, ext: true, aliases: ['twitter'] }, // TODO: real handle
  { key: 'telegram', label: 'telegram', handle: 't.me/a_albrem', href: 'https://t.me/a_albrem', icon: <Send size={15} />, ext: true, aliases: ['tg'] },      // TODO: real handle
]

const PROFILE = {
  name: 'ABDULRHMAN ALBURAYM',
  tagline: 'AI / Software Engineer',
  photo: '/AlbreamIsTheBest.jpg',
}

const HOME_WORDS = ['home', 'exit', 'cd', 'cd ~', 'cd ..', 'cd /', 'cd portfolio', 'q', ':q', 'quit', 'back']

function findLink(name) {
  const q = name.trim().toLowerCase()
  return LINKS.find((l) => l.key === q || l.label === q || l.aliases.includes(q))
}

function openLink(link) {
  if (link.ext) window.open(link.href, '_blank', 'noopener,noreferrer')
  else window.location.href = link.href
}

// Types a string char-by-char, then fires onDone exactly once.
function Typewriter({ text, speed = 55, onDone }) {
  const [count, setCount] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    if (count < text.length) {
      const t = setTimeout(() => setCount((c) => c + 1), speed)
      return () => clearTimeout(t)
    }
    if (!done.current) {
      done.current = true
      onDone?.()
    }
  }, [count, text, speed, onDone])

  return <span>{text.slice(0, count)}</span>
}

const rowsContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }
const rowItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function LinkRow({ link }) {
  return (
    <motion.a
      variants={rowItem}
      href={link.href}
      target={link.ext ? '_blank' : undefined}
      rel={link.ext ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-3 px-3 py-2.5 border border-transparent hover:border-matrix/30 hover:bg-matrix/5 transition-all duration-200"
    >
      <span className="text-matrix/60 group-hover:text-matrix transition-colors">➜</span>
      <span className="shrink-0 text-matrix/60 group-hover:text-matrix transition-colors">{link.icon}</span>
      <span className="shrink-0 text-matrix">[{link.label}]</span>
      <span className="min-w-0 truncate text-xs text-text-dim group-hover:text-text transition-colors">{link.handle}</span>
      <ArrowUpRight size={14} className="ms-auto shrink-0 text-text-dim group-hover:text-matrix transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </motion.a>
  )
}

// ── command outputs ──────────────────────────────────────────────────────────
const helpOutput = (
  <div className="space-y-1.5 text-xs">
    <p className="text-text-dim">Available commands:</p>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
      {[
        ['help', 'this list'],
        ['ls', 'list all links'],
        ['open <name>', 'open a link'],
        ['whoami', 'about me'],
        ['resume', 'open my CV'],
        ['email', 'email me'],
        ['clear', 'clear output'],
        ['home', 'back to portfolio'],
      ].map(([c, d]) => (
        <div key={c} className="flex gap-2">
          <span className="text-matrix shrink-0">{c}</span>
          <span className="text-text-dim/80">{d}</span>
        </div>
      ))}
    </div>
    <p className="text-text-dim/70">tip: try <span className="text-matrix">open github</span> or just <span className="text-matrix">github</span></p>
  </div>
)

const lsOutput = (
  <div className="space-y-0.5 text-xs font-mono">
    {LINKS.map((l) => (
      <div key={l.key} className="flex gap-2">
        <span className="text-matrix w-20 shrink-0">{l.label}</span>
        <span className="text-text-dim truncate">{l.handle}</span>
      </div>
    ))}
  </div>
)

// The profile "card" shown on boot AND returned by the `whoami` command.
// `heading` renders the name as <h1> (used once, on boot) vs a plain <div>.
function ProfileCard({ heading = false }) {
  const NameTag = heading ? 'h1' : 'div'
  return (
    <div className="flex items-center gap-4 pl-1 pb-1">
      <div className="relative shrink-0">
        <img
          src={PROFILE.photo}
          alt={PROFILE.name}
          draggable={false}
          className="w-20 h-20 object-cover rounded border border-matrix/30 shadow-[0_0_18px_rgba(0,255,0,0.12)] grayscale-[15%]"
        />
        <span className="absolute inset-0 rounded ring-1 ring-inset ring-matrix/10" />
      </div>
      <div className="min-w-0">
        <NameTag className="font-terminal text-2xl sm:text-3xl leading-none text-matrix tracking-wider [text-shadow:0_0_12px_rgba(0,255,0,0.45)]">
          {PROFILE.name}
        </NameTag>
        <p className="mt-1.5 text-xs text-text-dim">
          <span className="text-matrix/70">&gt;</span> {PROFILE.tagline}
        </p>
      </div>
    </div>
  )
}

export default function LinksPage({ onHome }) {
  const reduce = typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // phase 0: typing `whoami` · 1: profile + typing `cat social.links` · 2: links revealed
  const [phase, setPhase] = useState(reduce ? 2 : 0)
  const [stamp] = useState(() => {
    try { return new Date().toLocaleString('en-GB', { hour12: false }) } catch { return '' }
  })

  const [input, setInput] = useState('')
  const [typed, setTyped] = useState([]) // { id, cmd, output }
  const lineId = useRef(0)
  const inputRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const prev = document.title
    document.title = 'Abdulrhman Alburaym · links'
    return () => { document.title = prev }
  }, [])

  // Scroll the content area (not the page) to the newest line — same behaviour
  // as the home-page terminal.
  useEffect(() => {
    const el = contentRef.current
    if (el) setTimeout(() => el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' }), 0)
  }, [typed])

  const goHome = () => {
    if (onHome) onHome()
    else window.location.assign(window.location.pathname) // fallback: clean "/" route
  }

  const pushLine = (cmd, output) =>
    setTyped((prev) => [...prev, { id: lineId.current++, cmd, output }])

  const runCommand = (raw) => {
    const cmd = raw.trim()
    if (!cmd) return
    const lc = cmd.toLowerCase()

    if (HOME_WORDS.includes(lc)) { goHome(); return }
    if (lc === 'clear') { setTyped([]); setInput(''); return }

    let output
    if (lc === 'help' || lc === '?') {
      output = helpOutput
    } else if (lc === 'ls' || lc === 'links' || lc === 'social' || lc === 'll') {
      output = lsOutput
    } else if (lc === 'whoami' || lc === 'about') {
      output = <ProfileCard />
    } else {
      // `open <name>` OR a bare link name like `github`
      const target = lc.startsWith('open ') ? lc.slice(5) : lc
      const link = findLink(target)
      if (link) {
        openLink(link)
        output = (
          <p className="text-xs text-matrix">
            opening <span className="font-bold">{link.label}</span> → <span className="text-text-dim">{link.handle}</span> …
          </p>
        )
      } else {
        output = (
          <p className="text-xs text-red-400">
            not found: <span className="text-text">{cmd}</span> — type <span className="text-matrix">help</span>
          </p>
        )
      }
    }

    pushLine(cmd, output)
    setInput('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    runCommand(input)
  }

  return (
    <div
      dir="ltr"
      onClick={() => inputRef.current?.focus()}
      className="relative min-h-screen w-full bg-bg flex items-center justify-center px-4 py-10 overflow-x-hidden"
    >
      {/* Ambient backdrop: faint scanlines + a soft green vignette */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.012) 2px, rgba(0,255,0,0.012) 4px)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,255,0,0.06), transparent 60%)' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className="relative w-full max-w-xl bg-bg-card/95 border border-matrix/20 rounded-lg shadow-2xl shadow-black/60 font-mono text-sm flex flex-col max-h-[85vh] overflow-hidden"
      >
        {/* ── Title bar ── */}
        <div className="flex items-center justify-between gap-2 border-b border-matrix/10 px-4 py-2.5 select-none shrink-0">
          <div className="flex items-center gap-2">
            {/* Red dot closes the window → back to the portfolio home ("/") */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goHome() }}
              aria-label="Close — back to portfolio"
              title="Close — back to portfolio"
              className="group relative w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span className="text-[8px] leading-none text-black/70 opacity-0 group-hover:opacity-100 transition-opacity">✕</span>
            </button>
            <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <span className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="ml-2 text-[11px] text-matrix/50">guest@alburaym:~/links</span>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-[9px] text-text-dim">
            <span className="w-1.5 h-1.5 bg-matrix rounded-full animate-pulse" />
            SECURE
          </span>
        </div>

        {/* ── Body (scrolls internally, like the home-page terminal) ── */}
        <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto px-5 py-5 space-y-4 text-left">
          {stamp && <p className="text-[10px] text-text-dim/70">Last login: {stamp} on console</p>}

          {/* $ whoami */}
          <div className="flex items-center gap-2 text-text">
            <span className="text-matrix">$</span>
            {reduce ? <span>whoami</span> : <Typewriter text="whoami" onDone={() => setPhase((p) => (p < 1 ? 1 : p))} />}
          </div>

          {/* whoami output → profile card */}
          {phase >= 1 && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <ProfileCard heading />
            </motion.div>
          )}

          {/* $ cat social.links */}
          {phase >= 1 && (
            <div className="flex items-center gap-2 text-text">
              <span className="text-matrix">$</span>
              {reduce ? <span>cat social.links</span> : <Typewriter text="cat social.links" onDone={() => setPhase((p) => (p < 2 ? 2 : p))} />}
            </div>
          )}

          {/* link rows */}
          <motion.div variants={rowsContainer} initial="hidden" animate={phase >= 2 ? 'visible' : 'hidden'} className="space-y-1">
            {LINKS.map((link) => <LinkRow key={link.key} link={link} />)}
          </motion.div>

          {/* interactive history */}
          {typed.length > 0 && (
            <div className="space-y-3 pt-1">
              {typed.map((t) => (
                <div key={t.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-text">
                    <span className="text-matrix">$</span>
                    <span className="text-text">{t.cmd}</span>
                  </div>
                  {t.output && <div className="pl-4">{t.output}</div>}
                </div>
              ))}
            </div>
          )}

        </div>

        {/* input prompt — pinned below the scrolling body */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-matrix/10 px-5 py-3 shrink-0">
          <span className="text-matrix animate-pulse">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            placeholder="type 'help', 'ls', or 'open github'…"
            className="flex-1 bg-transparent border-none text-matrix placeholder-text-dim/60 text-sm focus:outline-none focus:ring-0"
          />
          <a
            href="#/"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); goHome() }}
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-text-dim hover:text-matrix transition-colors"
          >
            <CornerDownLeft size={12} />
            home
          </a>
        </form>
      </motion.div>
    </div>
  )
}
