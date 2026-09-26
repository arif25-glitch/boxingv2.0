import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Tentang Kami', href: '#tentang' },
  { label: 'Layanan Kami', href: '#layanan' },
]

/**
 * Navbar — Transparent on top, solid dark on scroll.
 * Links: Home, Tentang Kami, Layanan Kami + CTA "Form Daftar".
 * Mobile: hamburger toggle with slide-down menu.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0a0c14]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
            className="flex items-center gap-2 group"
          >
            {/* Icon */}
            <div className="w-8 h-8 bg-[#FF3B30] rounded-sm flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
              </svg>
            </div>
            {/* Wordmark */}
            <span className="text-white font-black uppercase text-lg tracking-tight leading-none">
              Knockout<span className="text-[#FF3B30]">.</span>
            </span>
          </a>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                {/* underline hover */}
                <span className="absolute bottom-1 left-4 right-4 h-px bg-[#FF3B30] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:block">
            <Button
              size="sm"
              className="bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wide px-6 rounded-sm border-0"
              onClick={() => handleNavClick('#daftar')}
            >
              Form Daftar
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-sm text-white hover:bg-white/10 transition-colors"
          >
            <span
              className={[
                'block w-5 h-px bg-white transition-all duration-300',
                menuOpen ? 'rotate-45 translate-y-[5px]' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-5 h-px bg-white transition-all duration-300',
                menuOpen ? 'opacity-0 scale-x-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block w-5 h-px bg-white transition-all duration-300',
                menuOpen ? '-rotate-45 -translate-y-[5px]' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-300',
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0',
          'bg-[#0a0c14]/98 backdrop-blur-md border-t border-white/10',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col px-4 pb-4 pt-2 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
              className="px-3 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-sm transition-colors border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Button
              className="w-full bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wide rounded-sm border-0"
              onClick={() => handleNavClick('#daftar')}
            >
              Form Daftar
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
