import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Eye, EyeOff, Flame, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'
import { roleToPath } from '@/lib/auth'

/**
 * LoginModal — slide-in dialog with email/password form.
 * On success: routes to /dashboard (user) or /admin (admin).
 */
export default function LoginModal({ open, onClose }) {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Email dan password wajib diisi.')
      return
    }

    setLoading(true)

    // Simulate slight async feel
    setTimeout(() => {
      const result = login(email, password)
      setLoading(false)

      if (!result.ok) {
        setError(result.error)
        return
      }

      // Success — redirect based on role
      onClose()
      navigate(roleToPath(result.user.role))
    }, 400)
  }

  const handleClose = () => {
    setEmail('')
    setPassword('')
    setError('')
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent onClose={handleClose}>

        {/* Header */}
        <DialogHeader>
          {/* Logo mark */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[#FF3B30] to-[#003B95] flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Masuk Akun</DialogTitle>
              <DialogDescription>JNN Boxing Club Portal</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-white/60">
              Email
            </label>
            <Input
              type="email"
              placeholder="masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-[#FF3B30] focus-visible:ring-0 rounded-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-white/60">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPass ? 'text' : 'password'}
                placeholder="masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:border-[#FF3B30] focus-visible:ring-0 rounded-sm pr-10"
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

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-sm px-3 py-2">
              <AlertCircle className="w-4 h-4 text-[#FF3B30] flex-shrink-0" />
              <p className="text-xs text-[#FF3B30] font-medium">{error}</p>
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF3B30] hover:bg-[#cc2f26] disabled:opacity-60 text-white font-bold uppercase tracking-wide rounded-sm h-11 mt-2"
          >
            {loading
              ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Memverifikasi...</span>
              : <span className="flex items-center gap-2"><LogIn className="w-4 h-4" /> Masuk</span>
            }
          </Button>
        </form>

        {/* Demo credentials hint */}
        <div className="mt-5 pt-4 border-t border-white/5 space-y-1.5">
          <p className="text-[11px] text-white/30 uppercase tracking-widest font-bold">Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2">
            <div
              className="bg-white/5 rounded-sm px-3 py-2 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => { setEmail('user@mail.com'); setPassword('user123'); setError('') }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Member</p>
              <p className="text-xs text-white/70 font-mono">user@mail.com</p>
            </div>
            <div
              className="bg-white/5 rounded-sm px-3 py-2 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => { setEmail('admin@mail.com'); setPassword('admin123'); setError('') }}
            >
              <p className="text-[10px] text-white/40 uppercase tracking-wider">Admin</p>
              <p className="text-xs text-white/70 font-mono">admin@mail.com</p>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
