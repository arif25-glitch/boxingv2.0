import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Minimal headless Dialog (no Radix dependency).
 * Uses React portal via a fixed overlay.
 */

function Dialog({ open, onOpenChange, children }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onOpenChange?.(false) }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange?.(false)}
        aria-hidden="true"
      />
      {/* Content slot */}
      {children}
    </div>
  )
}

function DialogContent({ className, children, onClose, ...props }) {
  return (
    <div
      className={cn(
        'relative z-10 w-full max-w-md mx-4',
        'bg-[#0f111a] border border-white/10 rounded-xl shadow-2xl',
        'p-6',
        className
      )}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      {children}
    </div>
  )
}

function DialogHeader({ className, children }) {
  return <div className={cn('mb-6', className)}>{children}</div>
}

function DialogTitle({ className, children }) {
  return (
    <h2 className={cn('text-xl font-black uppercase tracking-tight text-white', className)}>
      {children}
    </h2>
  )
}

function DialogDescription({ className, children }) {
  return (
    <p className={cn('text-sm text-white/50 mt-1', className)}>{children}</p>
  )
}

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription }
