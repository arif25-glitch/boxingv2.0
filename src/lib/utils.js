import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility: merge Tailwind class names safely.
 * Core helper for all shadcn/ui components.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
