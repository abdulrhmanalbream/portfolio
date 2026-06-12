import { HelpCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Metrics from './components/Metrics'
import Skills from './components/Skills'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { InteractiveTerminal } from './components/InteractiveTerminal'
import LinksPage from './components/LinksPage'

export default function App() {
  const [isMobile, setIsMobile] = useState(false)
  // Minimal hash router — no dependency, works on any static host.
  // The linktree lives at #/links; everything else renders the portfolio.
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Route back to the portfolio home ("/") without a full reload, clean URL.
  const goHome = () => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
    setRoute('')
  }

  if (route.startsWith('#/links')) {
    return (
      <>
        <CustomCursor />
        <LinksPage onHome={goHome} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-bg">
      <CustomCursor />
      <Navbar />
      <main className="pt-10 md:pt-12">
        <Hero />
        {/* Dynamic Interactive Shell Emulator Panel.
            Forced LTR + English in every language mode — a terminal reads
            left-to-right and its commands/ASCII output are Latin by nature. */}
        <section dir="ltr" className="py-6 select-none mx-auto w-full text-left">
          {/* <div className="text-left font-mono text-[10px] text-matrix-green/50 tracking-wider mb-2 flex items-center gap-1.5 pl-1.5">
            <HelpCircle size={12} />
            <span>INTERACTIVE SHELL PARSER EMULATOR (OPTIONAL TYPING SUPPORTED)</span>
          </div> */}
          <InteractiveTerminal />
        </section>        
        <Projects />
        <Metrics />
        <Skills />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}