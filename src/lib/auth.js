/**
 * auth.js — Hardcoded demo credentials + localStorage helpers.
 *
 * Credentials:
 *   user@mail.com  / user123  → role: 'user'  → /dashboard
 *   admin@mail.com / admin123 → role: 'admin' → /admin
 */

const CREDENTIALS = [
  { email: 'user@mail.com',  password: 'user123',  role: 'user',  name: 'Member' },
  { email: 'admin@mail.com', password: 'admin123', role: 'admin', name: 'Admin' },
]

const STORAGE_KEY = 'jnn_boxing_auth'

/**
 * Attempt login — returns { ok, user, error }
 */
export function attemptLogin(email, password) {
  const match = CREDENTIALS.find(
    (c) => c.email === email.trim().toLowerCase() && c.password === password
  )
  if (!match) {
    return { ok: false, user: null, error: 'Email atau password salah.' }
  }
  const user = { email: match.email, role: match.role, name: match.name }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  return { ok: true, user, error: null }
}

/**
 * Load persisted session from localStorage.
 * Returns user object or null.
 */
export function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Clear session from localStorage.
 */
export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}

/**
 * Returns the redirect path based on role.
 */
export function roleToPath(role) {
  return role === 'admin' ? '/admin' : '/dashboard'
}
