import { motion } from 'framer-motion'
import { useState } from 'react'
import { CONTACT_INFO } from '../data'
import emailjs from '@emailjs/browser'

// Read EmailJS config from Vite env variables (create .env or .env.local)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_portfolio';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_portfolio';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY';
const EMAILJS_TO = import.meta.env.VITE_CONTACT_TO_EMAIL || CONTACT_INFO.email || 'abdulrhman.qt@gmail.com';

// Social link icons as SVGs
const SOCIAL_ICONS = {
  GITHUB: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" fill="#0F0"/>
    </svg>
  ),
  LINKEDIN: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="1" y="1" width="22" height="22" rx="2" fill="none" stroke="#0F0" strokeWidth="1"/>
      <rect x="4" y="8" width="4" height="11" fill="#0F0"/>
      <circle cx="6" cy="5" r="2" fill="#0F0"/>
      <rect x="11" y="8" width="4" height="11" fill="#0F0"/>
      <rect x="11" y="8" width="4" height="7" fill="#0F0"/>
      <polygon points="11,8 15,8 15,15 11,15" fill="#0F0"/>
      <polygon points="15,8 20,8 20,19 15,19 15,15 18,15 18,11 15,11" fill="#0F0"/>
    </svg>
  ),
  EMAIL: (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="#0F0" strokeWidth="1"/>
      <polyline points="2,4 12,13 22,4" fill="none" stroke="#0F0" strokeWidth="1"/>
    </svg>
  )
};

const socialLinks = [
  {
    name: 'GITHUB',
    url: CONTACT_INFO.github,
    icon: SOCIAL_ICONS.GITHUB,
  },
  {
    name: 'LINKEDIN',
    url: CONTACT_INFO.linkedin,
    icon: SOCIAL_ICONS.LINKEDIN,
  },
  {
    name: 'EMAIL',
    url: CONTACT_INFO.email,
    icon: SOCIAL_ICONS.EMAIL,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSocialClick = (url) => {
    if (url.startsWith('mailto:')) {
      window.location.href = url
    } else {
      window.open(url, '_blank')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')
    
    try {
      // Send email via EmailJS
      // Include multiple field names to match template variables ({{name}}, {{email}}, {{message}}, {{time}})
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // Common names used in templates
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
          // Also include EmailJS-style fields for compatibility
          from_name: formData.name,
          from_email: formData.email,
          reply_to: formData.email,
          to_email: EMAILJS_TO
        },
        EMAILJS_PUBLIC_KEY
      )
      
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('Email send failed:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12"
      >
        <div className="font-mono text-xs text-text-dim tracking-widest mb-2">
          {'// '}SECURE_TRANSMISSION
        </div>
        <h2 className="font-terminal text-2xl md:text-3xl lg:text-4xl text-matrix text-glow tracking-wider">
          {'<'}CONTACT{'/>'}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card-glow bg-bg-card p-5 md:p-6 relative overflow-hidden glint-effect"
        >
          <div className="font-mono text-xs text-matrix mb-4 tracking-widest">
            SECURE CONNECTION OPENED <span className="cursor-blink">█</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-xs text-text-dim mb-1 block">IDENTIFIER:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-bg border border-border focus:border-matrix px-3 py-2 font-mono text-sm text-text outline-none transition-colors"
                placeholder="enter_name..."
              />
            </div>
            <div>
              <label className="font-mono text-xs text-text-dim mb-1 block">CHANNEL:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-bg border border-border focus:border-matrix px-3 py-2 font-mono text-sm text-text outline-none transition-colors"
                placeholder="enter_email..."
              />
            </div>
            <div>
              <label className="font-mono text-xs text-text-dim mb-1 block">TRANSMISSION:</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-bg border border-border focus:border-matrix px-3 py-2 font-mono text-sm text-text outline-none transition-colors resize-none"
                placeholder="enter_message..."
              />
            </div>
            {error && (
              <div className="text-red-500 font-mono text-xs text-center p-2 bg-red-500/10 rounded">
                {'>'} {error}
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading || submitted}
              className="card-glow w-full py-3 font-mono text-matrix text-sm tracking-wider bg-bg-card hover:bg-emerald-dim/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitted ? '[TRANSMITTED ✓]' : isLoading ? '[TRANSMITTING...]' : '[TRANSMIT]'}
            </button>
          </form>

          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-2 right-2 font-mono text-xs text-matrix"
            >
              {'// '}packet_sent
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="card-glow bg-bg-card p-5 md:p-6 flex flex-col items-center justify-center gap-6"
        >
          <div className="font-mono text-xs text-text-dim tracking-widest text-center">
            {'// '}AVAILABLE_CHANNELS
          </div>

          <div className="flex gap-6">
            {socialLinks.map((link, i) => (
              <motion.button
                key={link.name}
                onClick={() => handleSocialClick(link.url)}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
                className="card-glow p-4 bg-bg-card group flex flex-col items-center gap-2 hover:bg-emerald-dim/10 transition-all cursor-pointer"
                title={`Open ${link.name}`}
              >
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {link.icon}
                </motion.div>
                <span className="font-mono text-xs text-text-dim group-hover:text-matrix transition-colors">
                  {link.name}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="font-mono text-xs text-text-dim text-center mt-4">
            <span className="text-matrix">{'>'}</span> awaiting_connection<span className="cursor-blink">_</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}