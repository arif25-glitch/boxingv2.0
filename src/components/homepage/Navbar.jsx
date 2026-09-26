import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Flame, Menu, X, ChevronRight, LogIn, LogOut, LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { roleToPath } from '@/lib/auth'
import LoginModal from '@/components/auth/LoginModal'

/**
 * Navbar — Animated pill collapse on scroll.
 *
 * Auth states:
 *   - Not logged in  → shows "Login" button → opens LoginModal
 *   - Logged in user  → shows user badge + portal link (/dashboard) + Logout
 *   - Logged in admin → shows admin badge + portal link (/admin) + Logout
 *
 * Scroll behaviour:
 *   top of page  → full-width transparent bar (h-20, no bg)
 *   after scroll → floating pill (max-w-5xl, rounded-full, backdrop-blur, semi-transparent)
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      if (y > 60) setMobileMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Program', href: '#programs' },
    { label: 'Pelatih', href: '#trainers' },
    { label: 'Fasilitas', href: '#facilities' },
    { label: 'Membership', href: '#pricing' },
  ]

  const handleAnchor = (href) => {
    setMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
    navigate('/')
  }

  const portalPath = user ? roleToPath(user.role) : null

  return (
    <>
      {/* ═══════════════════════════════════════════════
          Fixed outer wrapper — always full-width + sticky
          ═══════════════════════════════════════════════ */}
      <div
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'flex justify-center',
          'transition-all duration-500 ease-in-out',
          scrolled ? 'px-6 sm:px-12 lg:px-20 pt-3' : 'px-0 pt-0',
        ].join(' ')}
      >
        {/* ── Inner nav container — animates shape ── */}
        <header
          className={[
            'w-full flex flex-col',
            'transition-all duration-500 ease-in-out',
            scrolled
              ? 'max-w-5xl rounded-full bg-[#0a0c14]/80 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40'
              : 'max-w-none rounded-none bg-transparent border-b border-white/0 shadow-none',
          ].join(' ')}
        >
          {/* ── Top bar row ── */}
          <div
            className={[
              'flex items-center justify-between w-full',
              'transition-all duration-500 ease-in-out',
              scrolled ? 'h-14 px-8 sm:px-10' : 'h-20 px-4 sm:px-8 lg:px-12 xl:px-16',
            ].join(' ')}
          >
            {/* ── Brand Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div
                className={[
                  'rounded-sm bg-gradient-to-br from-[#FF3B30] to-[#003B95]',
                  'flex items-center justify-center',
                  'shadow-lg group-hover:scale-105 transition-transform duration-300',
                  scrolled ? 'w-8 h-8' : 'w-10 h-10',
                ].join(' ')}
              >
                <Flame className={['text-white transition-all duration-500', scrolled ? 'w-4 h-4' : 'w-6 h-6'].join(' ')} />
              </div>
              <div className="overflow-hidden">
                <span className={['font-black tracking-wider text-white uppercase block leading-none transition-all duration-500', scrolled ? 'text-base' : 'text-xl'].join(' ')}>
                  JNN BOXING
                </span>
                <span className={['text-[10px] text-white/50 tracking-widest uppercase block mt-0.5 transition-all duration-500', scrolled ? 'opacity-0 max-h-0' : 'opacity-100 max-h-4'].join(' ')}>
                  Club &amp; Championship Ring
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchor(link.href) }}
                  className={['font-bold text-white/70 hover:text-[#FF3B30] transition-colors duration-200 uppercase tracking-widest', scrolled ? 'text-[11px]' : 'text-xs'].join(' ')}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ── Desktop Auth Controls ── */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                // ─ Logged in state ─
                <>
                  {/* Role badge */}
                  <div className={['flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5', scrolled ? 'h-8' : 'h-9'].join(' ')}>
                    {isAdmin
                      ? <Shield className="w-3.5 h-3.5 text-[#FF3B30]" />
                      : <UserCircle className="w-3.5 h-3.5 text-[#5b8de8]" />
                    }
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                      {isAdmin ? 'Admin' : 'Member'}
                    </span>
                  </div>

                  {/* Portal link */}
                  <Link to={portalPath}>
                    <Button
                      size="sm"
                      variant="outline"
                      className={['border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider rounded-full transition-all duration-500', scrolled ? 'text-[11px] px-3 h-8' : 'text-xs px-4 h-9'].join(' ')}
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 mr-1.5" />
                      {scrolled ? 'Portal' : (isAdmin ? 'Admin HQ' : 'Dashboard')}
                    </Button>
                  </Link>

                  {/* Logout */}
                  <Button
                    size="sm"
                    onClick={handleLogout}
                    className={['bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider rounded-full border border-white/10 transition-all duration-500', scrolled ? 'text-[11px] px-3 h-8' : 'text-xs px-4 h-9'].join(' ')}
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1.5" />
                    {scrolled ? '' : 'Keluar'}
                  </Button>
                </>
              ) : (
                // ─ Not logged in state ─
                <Button
                  size="sm"
                  onClick={() => setLoginOpen(true)}
                  className={['bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider rounded-full shadow-md shadow-[#FF3B30]/20 transition-all duration-500', scrolled ? 'text-[11px] px-5 h-8' : 'text-xs px-6 h-9'].join(' ')}
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Login
                </Button>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="p-2 text-white/80 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* ── Mobile Drawer ── */}
          <div
            className={[
              'sm:hidden overflow-hidden transition-all duration-300',
              mobileMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0',
              scrolled ? 'rounded-b-3xl' : '',
              'border-t border-white/10 bg-[#0c1017]/95 backdrop-blur-xl',
            ].join(' ')}
          >
            <nav className="flex flex-col px-5 pt-3 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchor(link.href) }}
                  className="flex items-center justify-between py-3 text-sm uppercase tracking-wider font-bold text-white/80 hover:text-[#FF3B30] border-b border-white/5 last:border-0 transition-colors"
                >
                  {link.label}
                  <ChevronRight className="w-3.5 h-3.5 text-white/30" />
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-2 px-5 pt-3">
              {user ? (
                <>
                  <Link to={portalPath} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-white/20 text-white font-bold uppercase tracking-wider text-xs justify-center rounded-full">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {isAdmin ? 'Admin HQ' : 'Dashboard'}
                    </Button>
                  </Link>
                  <Button onClick={handleLogout} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-xs justify-center rounded-full border border-white/10">
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => { setMobileMenuOpen(false); setLoginOpen(true) }}
                  className="w-full bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider text-xs justify-center rounded-full"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </header>
      </div>

      {/* Spacer */}
      <div className="h-20" />

      {/* Login Modal */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
