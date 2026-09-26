import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn, Eye, EyeOff, Flame, AlertCircle, ArrowLeft } from 'lucide-react'
import Navbar from '@/components/homepage/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'
import { roleToPath } from '@/lib/auth'

/**
 * LoginPage — Full-page login screen with shared Navbar.
 * Routes to /dashboard (user) or /admin (admin) on success.
 * Redirects to home if already logged in.
 */
export default function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Already logged in — redirect immediately
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

  const quickFill = (e, p) => {
    setEmail(e)
    setPassword(p)
    setError('')
  }

  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col">
      {/* Shared Navbar */}
      <Navbar />

      {/* ── Full-page content ── */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden px-4 py-16">

        {/* Background accents */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* cobalt glow left */}
          <div className="absolute -left-40 top-1/3 w-96 h-96 rounded-full bg-[#003B95] opacity-10 blur-3xl" />
          {/* red glow right */}
          <div className="absolute -right-40 bottom-1/3 w-80 h-80 rounded-full bg-[#FF3B30] opacity-10 blur-3xl" />
          {/* grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-md">

          {/* ── Brand mark ── */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-[#FF3B30] to-[#003B95] flex items-center justify-center shadow-xl mb-4">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white">
              Masuk Akun
            </h1>
            <p className="text-sm text-white/50 mt-1">JNN Boxing Club Portal</p>
          </div>

          {/* ── Form card ── */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="email@contoh.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:border-[#FF3B30] focus-visible:ring-0 rounded-sm h-11"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-widest text-white/50">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:border-[#FF3B30] focus-visible:ring-0 rounded-sm h-11 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                    aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPass
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />
                    }
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-sm px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 text-[#FF3B30] flex-shrink-0" />
                  <p className="text-xs text-[#FF3B30] font-medium">{error}</p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-[#FF3B30] hover:bg-[#cc2f26] disabled:opacity-60 text-white font-bold uppercase tracking-wide rounded-sm mt-1"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memverifikasi...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Masuk
                  </span>
                )}
              </Button>
            </form>

            {/* Demo credential tiles */}
            <div className="mt-6 pt-5 border-t border-white/8">
              <p className="text-[11px] text-white/30 uppercase tracking-widest font-bold mb-2.5">
                Demo Credentials
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => quickFill('user@mail.com', 'user123')}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-sm px-3 py-2.5 text-left transition-colors"
                >
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Member</p>
                  <p className="text-xs text-white/70 font-mono">user@mail.com</p>
                </button>
                <button
                  type="button"
                  onClick={() => quickFill('admin@mail.com', 'admin123')}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-sm px-3 py-2.5 text-left transition-colors"
                >
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">Admin</p>
                  <p className="text-xs text-white/70 font-mono">admin@mail.com</p>
                </button>
              </div>
            </div>
          </div>

          {/* Back to home */}
          <div className="flex justify-center mt-6">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors uppercase tracking-widest font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
