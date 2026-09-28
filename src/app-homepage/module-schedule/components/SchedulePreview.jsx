import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useData } from '@/data/DataContext'
import { bookingCount, findCoach } from '@/data/selectors'

const order = { 'Hari ini': 0, Besok: 1, Lusa: 2 }

export default function SchedulePreview() {
  const { data } = useData()
  const sessions = data.sessions
    .filter((item) => item.status === 'Akan datang')
    .sort((a, b) => (order[a.day] ?? 9) - (order[b.day] ?? 9) || a.time.localeCompare(b.time))
    .slice(0, 3)

  return <section id="schedule" className="scroll-mt-16 border-t border-white/10 bg-[#07090e] py-14 text-white lg:scroll-mt-20 lg:py-20">
    <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-black leading-none tracking-tight sm:text-4xl">Jadwal terdekat</h2><p className="mt-3 text-sm text-white/55">Lihat beberapa kelas yang akan datang.</p></div><Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:text-[#FF3B30]">Lihat semua jadwal <ArrowUpRight className="h-4 w-4" /></Link></div>
      {sessions.length ? <div className="mt-8 divide-y divide-white/10 border-y border-white/10">{sessions.map((item) => { const remaining = Math.max(0, item.capacity - bookingCount(data, item)); return <div key={item.id} className="grid gap-2 py-5 sm:grid-cols-[7rem_7rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4"><span className="text-xs font-bold text-[#80a7ec]">{item.day}</span><span className="text-xs text-white/60">{item.time}</span><div><p className="text-sm font-bold">{item.title}</p><p className="mt-1 text-xs text-white/45">{findCoach(data, item.coachId)?.name || 'Tanpa pelatih'} · {item.ring}</p></div><span className="text-xs text-white/45">{remaining ? `${remaining} tempat tersedia` : 'Penuh'}</span></div> })}</div> : <p className="mt-8 text-sm text-white/50">Jadwal akan diumumkan segera.</p>}
    </div>
  </section>
}
