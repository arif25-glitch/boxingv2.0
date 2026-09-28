import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, Eye, EyeOff, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from '@/app-homepage/module-landing/components/Navbar'
import LoginVisual from '@/module-auth/components/LoginVisual'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useAuth } from '@/module-auth/context/AuthContext'
import { roleToPath } from '@/module-auth/services/auth'

export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) navigate(roleToPath(user.role), { replace: true })
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email dan password wajib diisi.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const result = login(email, password)
      setLoading(false)
      if (!result.ok) {
        setError(result.error)
        return
      }
      navigate(roleToPath(result.user.role), { replace: true })
    }, 400)
  }

  const quickFill = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setError('')
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#090b11] text-white">
      <Navbar />

      <main className="grid w-full flex-1 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,54%)_minmax(0,46%)]">
        <section className="flex items-center bg-[#090b11] px-6 py-10 sm:px-10 lg:order-2 lg:px-12 lg:py-3 xl:px-20" aria-labelledby="login-title">
          <div className="mx-auto w-full max-w-[460px]">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3B30] lg:mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>

            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF3B30]">
              <span className="h-px w-8 bg-[#FF3B30]" />
              Member Access
            </p>
            <h1 id="login-title" className="text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl xl:text-[3.25rem]">
              Kembali<br /><span className="text-[#FF3B30]">ke ring.</span>
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55 sm:text-base">
              Masuk untuk melihat jadwal, mengelola sesi, dan melanjutkan latihan Anda.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                  Email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="h-12 rounded-md border-white/15 bg-white/[0.04] px-4 text-white placeholder:text-white/30 focus-visible:border-[#FF3B30] focus-visible:ring-[#FF3B30]/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="login-password" className="text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="h-12 rounded-md border-white/15 bg-white/[0.04] px-4 pr-12 text-white placeholder:text-white/30 focus-visible:border-[#FF3B30] focus-visible:ring-[#FF3B30]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((visible) => !visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/45 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3B30]"
                    aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div role="alert" className="flex items-start gap-2 rounded-md border border-[#FF3B30]/30 bg-[#FF3B30]/10 px-3 py-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3B30]" />
                  <p className="text-sm text-[#ff8079]">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 w-full justify-between rounded-md bg-[#FF3B30] px-5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#df332a] disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Memverifikasi...
                  </span>
                ) : (
                  <span className="flex items-center gap-2"><LogIn className="h-4 w-4" /> Masuk</span>
                )}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-white/45">Coba akun demo</p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => quickFill('user@mail.com', 'user123')}
                  className="rounded-md border border-white/15 px-3 py-2.5 text-left transition-colors hover:border-white/35 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3B30]"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#FF3B30]">Member</span>
                  <span className="mt-1 block break-all text-xs text-white/70">user@mail.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => quickFill('admin@mail.com', 'admin123')}
                  className="rounded-md border border-white/15 px-3 py-2.5 text-left transition-colors hover:border-white/35 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF3B30]"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#FF3B30]">Admin</span>
                  <span className="mt-1 block break-all text-xs text-white/70">admin@mail.com</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <LoginVisual />
      </main>
    </div>
  )
}
