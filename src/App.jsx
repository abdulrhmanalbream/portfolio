import { HelpCircle } from 'lucide-react'
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

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <CustomCursor />
      <Navbar />
      <main className="pt-10 md:pt-12">
        <Hero />
        {/* Dynamic Interactive Shell Emulator Panel */}
        <section className="py-6 select-none mx-auto w-full">
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