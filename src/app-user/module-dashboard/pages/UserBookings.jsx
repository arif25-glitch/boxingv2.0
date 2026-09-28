import { useState } from 'react'
import { Search } from 'lucide-react'
import { useAuth } from '@/module-auth/context/AuthContext'
import { useData } from '@/data/DataContext'
import { bookingCount, findCoach, findMemberByEmail } from '@/data/selectors'

const categories = ['Semua', 'Sparring', 'Kondisi fisik', 'Teknik', 'Privat']
const dayOrder = { 'Hari ini': 0, Besok: 1, Lusa: 2 }

export default function UserBookings() {
  const { user } = useAuth()
  const { data, toggleBooking } = useData()
  const member = findMemberByEmail(data, user?.email)
  const [category, setCategory] = useState('Semua')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const filtered = data.sessions.filter((item) =>
    (category === 'Semua' || item.category === category) &&
    `${item.title} ${findCoach(data, item.coachId)?.name || ''} ${item.ring}`.toLowerCase().includes(query.toLowerCase().trim())
  ).sort((a, b) => (dayOrder[a.day] ?? 9) - (dayOrder[b.day] ?? 9) || a.time.localeCompare(b.time))

  const handleBooking = (session) => {
    const error = toggleBooking(member?.id, session.id)
    setMessage(error || 'Pendaftaran kelas diperbarui.')
  }

  return <div className="space-y-7">
    <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30]">Latihan</p><h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">Jadwal kelas</h1><p className="mt-2 text-sm text-white/55">Pilih kelas sesuai waktu dan jenis latihan yang Anda inginkan.</p><p className="mt-1 text-xs text-white/40">Pendaftaran tersimpan di browser ini.</p></div>
    {message && <p role="status" className="border border-white/10 bg-[#0c1017] px-4 py-3 text-sm text-white/75">{message}</p>}
    {!member && <p role="alert" className="text-sm text-rose-400">Akun ini belum terhubung dengan data member. Hubungi admin.</p>}
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter jenis kelas">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`shrink-0 border px-3 py-2 text-xs font-semibold ${category === item ? 'border-[#FF3B30] bg-[#FF3B30] text-white' : 'border-white/10 bg-[#0c1017] text-white/60 hover:text-white'}`}>{item}</button>)}</div>
      <label className="relative block w-full lg:w-64"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" /><span className="sr-only">Cari kelas atau pelatih</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari kelas atau pelatih" className="h-10 w-full border border-white/10 bg-[#0c1017] pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#80a7ec]" /></label>
    </div>
    <div className="border border-white/10 bg-[#0c1017]">{filtered.length ? <div className="divide-y divide-white/10">{filtered.map((item) => {
      const booked = data.bookings.some((booking) => booking.memberId === member?.id && booking.sessionId === item.id)
      const remaining = Math.max(0, item.capacity - bookingCount(data, item))
      const canBook = Boolean(member && member.status === 'Aktif' && item.status === 'Akan datang' && remaining > 0)
      return <article key={item.id} className="grid gap-4 p-5 md:grid-cols-[7rem_minmax(0,1fr)_auto] md:items-center">
        <div><p className="text-sm font-bold text-[#80a7ec]">{item.day}</p><p className="mt-1 text-xs text-white/55">{item.time}</p></div>
        <div className="min-w-0"><p className="text-sm font-bold">{item.title}</p><p className="mt-1 text-xs text-white/50">{item.category} · {findCoach(data, item.coachId)?.name || 'Tanpa pelatih'} · {item.ring}</p><p className="mt-1 text-xs text-white/40">{item.status}{item.status === 'Akan datang' ? ` · ${remaining} tempat tersedia` : ''}</p></div>
        <button type="button" onClick={() => handleBooking(item)} disabled={!booked && !canBook} className={`min-h-10 min-w-28 px-4 text-xs font-bold ${booked ? 'border border-white/20 text-white hover:bg-white/10' : canBook ? 'bg-[#FF3B30] text-white hover:bg-[#d83127]' : 'cursor-not-allowed border border-white/10 text-white/35'}`} aria-label={`${booked ? 'Batalkan' : 'Ikuti'} ${item.title}`}>{booked ? 'Batalkan' : canBook ? 'Ikuti kelas' : item.status !== 'Akan datang' ? item.status : remaining === 0 ? 'Penuh' : 'Tidak tersedia'}</button>
      </article>
    })}</div> : <p className="p-6 text-sm text-white/55">Tidak ada kelas yang cocok. Coba kata kunci atau filter lain.</p>}</div>
  </div>
}
