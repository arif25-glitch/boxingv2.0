import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Flame, Menu, X, Shield, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Navbar — Transparent fixed navbar with React Router Links.
 * Links: Program, Pelatih, Fasilitas Ring, Membership.
 * CTA portals: Member Portal (/dashboard) + Admin HQ (/admin).
 * Mobile: hamburger with Lucide Menu/X icon toggle.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Program', href: '#programs' },
    { label: 'Pelatih', href: '#trainers' },
    { label: 'Fasilitas Ring', href: '#facilities' },
    { label: 'Membership', href: '#pricing' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0c14]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">

        {/* ── Brand Logo ── */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#FF3B30] to-[#003B95] flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:scale-105 transition-transform">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-black text-xl tracking-wider text-white uppercase block leading-none">
              JNN BOXING
            </span>
            <span className="text-[10px] text-white/50 tracking-widest uppercase block mt-1">
              Club &amp; Championship Ring
            </span>
          </div>
        </Link>

        {/* ── Desktop Links ── */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest font-bold text-white/70 hover:text-[#FF3B30] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Desktop Action Portals ── */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider text-xs rounded-sm"
            >
              <User className="w-3.5 h-3.5 mr-1.5 text-[#5b8de8]" />
              Member Portal
            </Button>
          </Link>
          <Link to="/admin">
            <Button
              size="sm"
              className="bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-md shadow-[#FF3B30]/20"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5" />
              Admin HQ
            </Button>
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white rounded-sm bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0c1017] border-b border-white/10 px-4 py-6 space-y-4">
          <nav className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm uppercase tracking-wider font-bold text-white/80 hover:text-[#FF3B30] py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white font-bold uppercase tracking-wider text-xs justify-center"
              >
                <User className="w-4 h-4 mr-2 text-[#5b8de8]" />
                Member Portal
              </Button>
            </Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider text-xs justify-center">
                <Shield className="w-4 h-4 mr-2" />
                Admin HQ
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
