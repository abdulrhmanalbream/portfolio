import { motion, AnimatePresence } from 'framer-motion'
import React, { useState, useEffect } from "react";
import { Terminal, Shield, Activity, RefreshCw, Languages } from "lucide-react";
import { NAV_ITEMS } from '../data'
import { useLanguage } from '../i18n/LanguageContext'
import { UI } from '../i18n/translations'
import { toArabicDigits } from '../i18n/digits'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(24);
  const { lang, toggleLang } = useLanguage()
  const t = UI[lang].nav
  const n = lang === 'ar' ? toArabicDigits : (x) => x

  // Live clock trigger
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const date = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setTime(`${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${timeZone}`);
    }, 1000);

    const latencyTimer = setInterval(() => {
      setLatency(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(18, Math.min(42, prev + delta));
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(latencyTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id)

      for (let section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          // If section is in viewport (top half of screen)
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMobileNavClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavItemClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-matrix-green/20"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-8 flex items-center justify-between h-10 md:h-12">
        <div className="font-terminal text-m sm:text-m md:text-base text-matrix text-glow tracking-wider truncate">
          {'>'}{t.brandFirst}<span className="hidden sm:inline">{t.brandLast}</span><span className="cursor-blink">_</span>
        </div>
        <div className="hidden md:flex gap-1">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-mono text-xs px-2 py-1 transition-all duration-300 tracking-wider rounded border ${activeSection === item.id
                ? 'text-matrix-green border-matrix-green bg-matrix-green/10 text-glow shadow-lg'
                : 'text-text-dim hover:text-matrix-green border-transparent hover:border-matrix-green/50 hover:bg-matrix-green/5'
                }`}
            >
              [{t.items[item.id] ?? item.label}]
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu & Desktop Status */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Status indicators - hidden on small screens */}
          <div className="hidden md:flex items-center gap-4 text-[10px] text-neutral-500">
            {/* Latency meter */}
            <div className="flex items-center gap-1.5 border border-neutral-900 bg-neutral-950 px-2 py-1 rounded">
              <Activity size={10} className="text-matrix-green animate-pulse" />
              <span className="text-neutral-500">{t.secPing}</span>
              <span className="text-matrix-green font-bold" dir="ltr">{n(latency)}ms</span>
            </div>

            {/* Time stamp */}
            <div className="flex items-center gap-1.5 border border-neutral-900 bg-neutral-950 px-2.5 py-1 rounded">
              <span className="w-1 h-3 bg-matrix-green animate-pulse inline-block" />
              <span className="text-neutral-400 font-semibold text-[10px] tabular-nums" dir="ltr">{n(time) || "error"}</span>
            </div>
          </div>

          {/* Language toggle - always visible */}
          <button
            onClick={toggleLang}
            aria-label={t.toggleAria}
            title={t.toggleAria}
            className="flex items-center gap-1.5 font-mono text-xs px-2 py-1 rounded border border-matrix-green/30 text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green transition-all duration-200 whitespace-nowrap"
          >
            <Languages size={12} />
            <span className="leading-none">{t.toggle}</span>
          </button>

          {/* Mobile status indicator - only on small screens */}
          <div className="md:hidden flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-950 border border-neutral-900">
            <Activity size={10} className="text-matrix-green animate-pulse" />
            <span className="text-matrix-green font-bold text-xs" dir="ltr">{n(latency)}ms</span>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative">
            {isMenuOpen ? (
              <button
                onClick={handleMobileNavClick}
                className="font-mono text-xs px-2.5 py-1.5 text-white hover:text-matrix-green border border-transparent hover:border-matrix-green/50 rounded transition-all duration-200 whitespace-nowrap"
              >
                [{t.menu}]
              </button>
            ) : (
              <button
                onClick={handleMobileNavClick}
                className="font-mono text-xs px-2.5 py-1.5 text-text-dim hover:text-matrix-green border border-transparent hover:border-matrix-green/50 rounded transition-all duration-200 whitespace-nowrap"
              >
                [{t.menu}]
              </button>
            )}

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 bg-bg border border-matrix-green/30 rounded shadow-lg overflow-hidden min-w-max"
                >
                  {NAV_ITEMS.map((item) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={handleNavItemClick}
                      whileHover={{ backgroundColor: 'rgba(0, 255, 100, 0.1)' }}
                      className={`block font-mono text-xs px-4 py-2.5 transition-all duration-200 whitespace-nowrap ${activeSection === item.id
                        ? 'text-matrix-green bg-matrix-green/10 border-l-2 border-matrix-green'
                        : 'text-text-dim hover:text-matrix-green'
                        }`}
                    >
                      [{t.items[item.id] ?? item.label}]
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}