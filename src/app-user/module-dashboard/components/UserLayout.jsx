import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, CalendarDays, LayoutDashboard, LogOut, Menu, UserRound, X } from 'lucide-react'
import { useAuth } from '@/module-auth/context/AuthContext'
import { useData } from '@/data/DataContext'

const pages = [
  { to: '/dashboard', label: 'Ringkasan', icon: LayoutDashboard, end: true },
  { to: '/dashboard/bookings', label: 'Jadwal kelas', icon: CalendarDays },
  { to: '/dashboard/profile', label: 'Profil', icon: UserRound },
]

export default function UserLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { logout } = useAuth()
  const { storageError } = useData()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentPage = pages.find((page) => page.to === pathname)?.label || 'Member'

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
      <div className="min-h-screen bg-[#07090e] text-white lg:flex">
        {menuOpen && <button type="button" aria-label="Tutup menu" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40 bg-black/70 lg:hidden" />}

        <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0c1017] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-6">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <img src="/jnn-favicon.svg" alt="" className="h-9 w-9" />
              <span className="text-sm font-black uppercase tracking-wider">JNN Boxing <span className="block text-[10px] font-semibold text-white/45">Member</span></span>
            </Link>
            <button type="button" aria-label="Tutup navigasi" onClick={() => setMenuOpen(false)} className="p-2 text-white/60 lg:hidden"><X className="h-5 w-5" /></button>
          </div>

          <nav aria-label="Navigasi member" className="flex-1 space-y-1 p-4">
            {pages.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `flex min-h-11 items-center gap-3 border-l-2 px-4 text-sm font-semibold transition-colors ${isActive ? 'border-[#FF3B30] bg-white/[0.07] text-white' : 'border-transparent text-white/55 hover:bg-white/[0.04] hover:text-white'}`}>
                <Icon className="h-4 w-4" />{label}
              </NavLink>
            ))}
          </nav>

          <div className="space-y-1 border-t border-white/10 p-4">
            <Link to="/" className="flex min-h-10 items-center gap-3 px-4 text-xs font-semibold text-white/55 hover:text-white"><ArrowLeft className="h-4 w-4" />Kembali ke situs</Link>
            <button type="button" onClick={handleLogout} className="flex min-h-10 w-full items-center gap-3 px-4 text-left text-xs font-semibold text-white/55 hover:text-white"><LogOut className="h-4 w-4" />Keluar</button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#0c1017]/95 px-4 backdrop-blur sm:px-8">
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Buka navigasi" onClick={() => setMenuOpen(true)} className="p-2 text-white/75 lg:hidden"><Menu className="h-5 w-5" /></button>
              <span className="text-sm font-bold">{currentPage}</span>
            </div>
            <span className="text-xs text-white/45">Data lokal</span>
          </header>
          <main className="w-full p-4 sm:p-6 lg:p-8">{storageError && <p role="alert" className="mb-5 border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">{storageError}</p>}<Outlet /></main>
        </div>
      </div>
  )
}
