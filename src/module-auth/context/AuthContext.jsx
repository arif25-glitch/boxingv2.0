import React, { createContext, useContext, useState, useCallback } from 'react'
import { attemptLogin, loadSession, clearSession } from '@/module-auth/services/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession())

  const login = useCallback((email, password) => {
    const result = attemptLogin(email, password)
    if (result.ok) {
      setUser(result.user)
    }
    return result
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
