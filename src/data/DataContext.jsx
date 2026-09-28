import { createContext, useContext, useEffect, useRef, useState } from 'react'
import seed from './seed.json'

const STORAGE_KEY = 'jnn_boxing_data_v1'
const collections = ['coaches', 'programs', 'plans', 'members', 'sessions', 'bookings']
const DataContext = createContext(null)

function parseData(raw) {
  try {
    const value = JSON.parse(raw)
    return collections.every((key) => Array.isArray(value?.[key])) ? value : null
  } catch {
    return null
  }
}

function loadData() {
  try {
    return parseData(localStorage.getItem(STORAGE_KEY)) || seed
  } catch {
    return seed
  }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData)
  const dataRef = useRef(data)
  const [storageError, setStorageError] = useState('')

  const commit = (update) => {
    const next = update(dataRef.current)
    dataRef.current = next
    setData(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      setStorageError('')
    } catch {
      setStorageError('Penyimpanan browser tidak tersedia. Perubahan bisa hilang saat halaman dimuat ulang.')
    }
  }

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        const next = parseData(event.newValue) || seed
        dataRef.current = next
        setData(next)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const saveRecord = (collection, record) => {
    if (!collections.includes(collection) || collection === 'bookings') return null
    const id = record.id || `${collection}-${crypto.randomUUID()}`
    commit((current) => ({
      ...current,
      [collection]: current[collection].some((item) => item.id === id)
        ? current[collection].map((item) => item.id === id ? { ...record, id } : item)
        : [...current[collection], { ...record, id }],
    }))
    return id
  }

  const deleteRecord = (collection, id) => {
    if (!collections.includes(collection) || collection === 'bookings') return 'Data tidak dapat dihapus.'
    if (collection === 'coaches' && data.sessions.some((item) => item.coachId === id)) return 'Pelatih masih dipakai di jadwal. Ubah jadwal terlebih dahulu.'
    if (collection === 'plans' && data.members.some((item) => item.planId === id)) return 'Paket masih dipakai member. Ubah paket member terlebih dahulu.'
    commit((current) => ({
      ...current,
      [collection]: current[collection].filter((item) => item.id !== id),
      bookings: collection === 'sessions' ? current.bookings.filter((item) => item.sessionId !== id)
        : collection === 'members' ? current.bookings.filter((item) => item.memberId !== id) : current.bookings,
    }))
    return null
  }

  const toggleBooking = (memberId, sessionId) => {
    const existing = data.bookings.find((item) => item.memberId === memberId && item.sessionId === sessionId)
    if (existing) {
      commit((current) => ({ ...current, bookings: current.bookings.filter((item) => item.id !== existing.id) }))
      return null
    }
    const member = data.members.find((item) => item.id === memberId)
    const session = data.sessions.find((item) => item.id === sessionId)
    if (!member || member.status !== 'Aktif') return 'Membership tidak aktif.'
    if (!session || session.status !== 'Akan datang') return 'Sesi ini tidak dapat dipesan.'
    const total = session.booked + data.bookings.filter((item) => item.sessionId === sessionId).length
    if (total >= session.capacity) return 'Kelas sudah penuh.'
    const booking = { id: `booking-${crypto.randomUUID()}`, memberId, sessionId }
    commit((current) => ({ ...current, bookings: [...current.bookings, booking] }))
    return null
  }

  return <DataContext.Provider value={{ data, saveRecord, deleteRecord, toggleBooking, storageError }}>{children}</DataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used inside DataProvider')
  return context
}
