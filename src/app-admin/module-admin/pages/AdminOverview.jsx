import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Users, AlertCircle } from 'lucide-react'
import { useData } from '@/data/DataContext'
import { bookingCount, findCoach, findPlan } from '@/data/selectors'

export default function AdminOverview() {
  const { data } = useData()
  const { members, sessions } = data
  const today = sessions.filter((session) => session.day === 'Hari ini')
  const upcoming = today
    .filter((session) => session.status !== 'Selesai')
    .sort((a, b) => a.time.localeCompare(b.time))
  const attention = members.filter((member) => member.status !== 'Aktif')
  const activeMembers = members.filter((member) => member.status === 'Aktif')

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30]">Operasional</p>
        <h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">Ringkasan hari ini</h1>
        <p className="mt-2 text-sm text-white/55">Jadwal dan member yang perlu perhatian ada di satu tempat.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="border border-white/10 bg-[#0c1017] p-5">
          <CalendarDays className="h-5 w-5 text-[#80a7ec]" />
          <p className="mt-5 text-3xl font-black">{today.length}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">Sesi hari ini</p>
        </div>
        <div className="border border-white/10 bg-[#0c1017] p-5">
          <Users className="h-5 w-5 text-[#80a7ec]" />
          <p className="mt-5 text-3xl font-black">{activeMembers.length}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">Member aktif</p>
        </div>
        <div className="border border-[#FF3B30]/25 bg-[#FF3B30]/[0.06] p-5">
          <AlertCircle className="h-5 w-5 text-[#FF3B30]" />
          <p className="mt-5 text-3xl font-black">{attention.length}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">Perlu perhatian</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="border border-white/10 bg-[#0c1017]" aria-labelledby="today-heading">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
            <h2 id="today-heading" className="text-base font-black uppercase">Sesi berikutnya</h2>
            <Link to="/admin/schedule" className="flex items-center gap-1 text-xs font-bold text-[#80a7ec] hover:text-white">Semua jadwal <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="divide-y divide-white/10">
            {upcoming.slice(0, 3).map((session) => (
              <div key={session.id} className="grid grid-cols-[5rem_1fr] gap-3 p-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center">
                <span className="font-mono text-xs text-white/55">{session.time.split('–')[0]}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{session.title}</p>
                  <p className="mt-1 text-xs text-white/45">{session.ring} · {findCoach(data, session.coachId)?.name || 'Tanpa pelatih'}</p>
                </div>
                <span className="col-start-2 text-xs text-white/45 sm:col-auto">{bookingCount(data, session)}/{session.capacity} peserta</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-white/10 bg-[#0c1017]" aria-labelledby="attention-heading">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
            <h2 id="attention-heading" className="text-base font-black uppercase">Perlu perhatian</h2>
            <Link to="/admin/members" className="flex items-center gap-1 text-xs font-bold text-[#80a7ec] hover:text-white">Lihat member <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="divide-y divide-white/10">
            {attention.map((member) => (
              <div key={member.id} className="flex items-center justify-between gap-3 p-5">
                <div>
                  <p className="text-sm font-bold">{member.name}</p>
                  <p className="mt-1 text-xs text-white/45">{findPlan(data, member.planId)?.name || 'Tanpa paket'}</p>
                </div>
                <span className={`shrink-0 text-xs font-bold ${member.status === 'Menunggu' ? 'text-amber-400' : 'text-rose-400'}`}>{member.status}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
