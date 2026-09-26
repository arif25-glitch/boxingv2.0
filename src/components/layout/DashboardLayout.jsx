import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import {
  Flame,
  LayoutDashboard,
  Calendar,
  User,
  Users,
  CalendarDays,
  ArrowLeft,
  Bell,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function DashboardLayout({ role = 'user' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const userNavItems = [
    { to: '/dashboard', label: 'Ring Overview', icon: LayoutDashboard, end: true },
    { to: '/dashboard/bookings', label: 'Book Sessions', icon: Calendar },
    { to: '/dashboard/profile', label: 'Fighter Profile', icon: User },
  ]

  const adminNavItems = [
    { to: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/members', label: 'Fighter Roster', icon: Users },
    { to: '/admin/schedule', label: 'Ring & Trainer Schedule', icon: CalendarDays },
  ]

  const navItems = role === 'admin' ? adminNavItems : userNavItems

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#0c1017] border-r border-white/10 flex flex-col z-50 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#FF3B30] to-[#003B95] flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-black text-lg tracking-wider text-white uppercase block leading-none">
                JNN BOXING
              </span>
              <span className="text-[10px] text-white/50 tracking-widest uppercase block mt-1">
                {role === 'admin' ? 'HQ Admin Center' : 'Member Portal'}
              </span>
            </div>
          </Link>
          <button
            className="lg:hidden p-1 text-white/60 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Role Switcher Pill */}
        <div className="p-4 mx-4 mt-4 bg-white/[0.03] border border-white/10 rounded-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  role === 'admin' ? 'bg-[#FF3B30] animate-ping' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span className="text-xs uppercase font-bold tracking-wider text-white/80">
                {role === 'admin' ? 'Admin Portal' : 'Fighter Mode'}
              </span>
            </div>
            <Link
              to={role === 'admin' ? '/dashboard' : '/admin'}
              className="text-[11px] text-[#5b8de8] hover:text-white transition-colors underline font-medium"
            >
              Switch to {role === 'admin' ? 'User' : 'Admin'}
            </Link>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">
            Main Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#003B95] to-[#003B95]/60 text-white shadow-md border-l-4 border-[#FF3B30]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom Profile / Home */}
        <div className="p-4 border-t border-white/10 bg-[#080b10] space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-sm bg-white/[0.02] border border-white/5">
            <div className="w-9 h-9 rounded-sm bg-[#FF3B30]/20 border border-[#FF3B30]/40 flex items-center justify-center font-bold text-white text-xs">
              {role === 'admin' ? 'AD' : 'MR'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate">
                {role === 'admin' ? 'Alex Danu (Head Admin)' : 'Marcus Robinson'}
              </p>
              <p className="text-[11px] text-white/40 truncate">
                {role === 'admin' ? 'alex@jnnboxing.com' : 'Middleweight · Pro Pass'}
              </p>
            </div>
          </div>

          <Link to="/" className="block">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/20 text-white/80 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Website
            </Button>
          </Link>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0c1017]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-sm bg-white/5 border border-white/10 text-white hover:bg-white/10"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF3B30]">
                  {role === 'admin' ? 'Admin HQ' : 'Fighter Hub'}
                </span>
                <span className="text-white/20">/</span>
                <h1 className="text-sm sm:text-base font-bold text-white">
                  {role === 'admin' ? 'Control & Operations' : 'Training & Sparring'}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="hidden sm:inline-flex border-emerald-500/40 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
              Live Gym Status: 3 Rings Active
            </Badge>

            <button
              className="relative p-2 rounded-sm bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF3B30]" />
            </button>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
