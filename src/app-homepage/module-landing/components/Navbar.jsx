import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronRight, LogIn, LogOut, LayoutDashboard, Shield, UserCircle } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { useAuth } from '@/module-auth/context/AuthContext'
import { roleToPath } from '@/module-auth/services/auth'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled((wasScrolled) => (wasScrolled ? y > 24 : y > 72))
    }
    onScroll()
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
      <div
        className={[
          'fixed inset-x-0 top-0 z-50 flex justify-center',
          'transition-[padding-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
          scrolled ? 'pt-3' : 'pt-0',
        ].join(' ')}
      >
        <header
          style={{
            width: scrolled ? 'calc(100% - 32px)' : '100%',
            maxWidth: scrolled ? '1024px' : '100vw',
          }}
          className={[
            'flex flex-col overflow-hidden',
            'transition-[width,max-width,border-radius,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
            scrolled
              ? [
                  mobileMenuOpen ? 'rounded-[1.75rem]' : 'rounded-full',
                  'bg-[#0a0c14]/90 backdrop-blur-xl',
                  'border border-white/10',
                  'shadow-xl shadow-black/40',
                ].join(' ')
              : [
                  'rounded-none',
                  'bg-transparent',
                  'border-b border-white/0',
                  'shadow-none',
                ].join(' '),
          ].join(' ')}
        >
          <div
            className={[
              'flex items-center justify-between w-full',
              'transition-[height,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              scrolled
                ? 'h-14 px-5 sm:px-8'
                : 'h-20 px-4 sm:px-8 lg:px-12 xl:px-16',
            ].join(' ')}
          >
            {/* ── Brand Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <img
                src="/jnn-favicon.svg"
                alt=""
                className={[
                  'shrink-0 rounded-sm shadow-lg',
                  'group-hover:scale-105 transition-[width,height,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                  scrolled ? 'w-8 h-8' : 'w-10 h-10',
                ].join(' ')}
              />
              <div className="overflow-hidden">
                <span
                  className={[
                    'font-black tracking-wider text-white uppercase block leading-none',
                    'transition-[font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    scrolled ? 'text-base' : 'text-xl',
                  ].join(' ')}
                >
                  JNN BOXING
                </span>
                {/* Subtitle fades out when collapsed */}
                <span
                  className={[
                    'text-[10px] text-white/50 tracking-widest uppercase block mt-0.5',
                    'overflow-hidden transition-[opacity,max-height] duration-300 ease-out motion-reduce:transition-none',
                    scrolled ? 'opacity-0 max-h-0' : 'opacity-100 max-h-4',
                  ].join(' ')}
                >
                  Klub Boxing
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleAnchor(link.href) }}
                  className={[
                    'font-bold text-xs text-white/70 hover:text-[#FF3B30] transition-colors duration-200',
                    'uppercase tracking-widest',
                  ].join(' ')}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* ── Desktop Auth Controls ── */}
            <div className="hidden sm:flex items-center gap-2">
              {user ? (
                <>
                  <div
                    className={[
                      'flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5',
                      'transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                      scrolled ? 'h-8' : 'h-9',
                    ].join(' ')}
                  >
                    {isAdmin
                      ? <Shield className="w-3.5 h-3.5 text-[#FF3B30]" />
                      : <UserCircle className="w-3.5 h-3.5 text-[#5b8de8]" />
                    }
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                      {isAdmin ? 'Admin' : 'Member'}
                    </span>
                  </div>
                  <Link to={portalPath}>
                    <Button
                      variant="outline"
                      size="sm"
                      className={[
                        'rounded-full border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10',
                        'transition-[height,padding,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                        scrolled ? 'h-8 px-3' : 'h-9 px-4',
                      ].join(' ')}
                    >
                      <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" />
                      {isAdmin ? 'Admin HQ' : 'Dashboard'}
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    onClick={handleLogout}
                    className={[
                      'rounded-full border border-white/10 bg-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20',
                      'transition-[height,padding,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                      scrolled ? 'h-8 px-3' : 'h-9 px-4',
                    ].join(' ')}
                  >
                    <LogOut className="mr-1.5 h-3.5 w-3.5" />
                    Keluar
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => navigate('/login')}
                  className={[
                    'bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider rounded-full',
                    'shadow-md shadow-[#FF3B30]/20 text-xs transition-[height,padding,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
                    scrolled ? 'px-5 h-8' : 'px-6 h-9',
                  ].join(' ')}
                >
                  <LogIn className="w-3.5 h-3.5 mr-1.5" />
                  Login
                </Button>
              )}
            </div>

            {/* ── Mobile Hamburger ── */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="relative rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition-colors hover:text-white"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                <Menu className={`w-5 h-5 transition-[opacity,transform] duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`absolute inset-2 w-5 h-5 transition-[opacity,transform] duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </button>
            </div>
          </div>

          <div
            id="mobile-navigation"
            aria-hidden={!mobileMenuOpen}
            inert={!mobileMenuOpen}
            className={[
              'lg:hidden grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
              mobileMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none',
            ].join(' ')}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="border-t border-white/10 bg-[#0c1017]/95 pb-4 backdrop-blur-xl">
                <nav className="flex flex-col gap-1 px-5 pt-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleAnchor(link.href) }}
                      className="flex items-center justify-between border-b border-white/5 py-3 text-sm font-bold uppercase tracking-wider text-white/80 transition-colors hover:text-[#FF3B30] last:border-0"
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
                        <Button
                          variant="outline"
                          className="w-full justify-center rounded-full border-white/20 text-xs font-bold uppercase tracking-wider text-white"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          {isAdmin ? 'Admin HQ' : 'Dashboard'}
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        className="w-full justify-center rounded-full border border-white/10 bg-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Keluar
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => { setMobileMenuOpen(false); navigate('/login') }}
                      className="w-full justify-center rounded-full bg-[#FF3B30] text-xs font-bold uppercase tracking-wider text-white hover:bg-[#cc2f26]"
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Spacer to prevent content from hiding behind navbar */}
      <div className="h-20" />
    </>
  )
}
