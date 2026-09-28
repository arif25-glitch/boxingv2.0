import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Ticket } from 'lucide-react'
import { useAuth } from '@/module-auth/context/AuthContext'
import { useData } from '@/data/DataContext'
import { findCoach, findMemberByEmail, findPlan, formatDate } from '@/data/selectors'

export default function UserOverview() {
  const { user } = useAuth()
  const { data } = useData()
  const member = findMemberByEmail(data, user?.email)
  const plan = findPlan(data, member?.planId)
  const myClasses = data.sessions.filter((item) => item.status !== 'Selesai' && data.bookings.some((booking) => booking.memberId === member?.id && booking.sessionId === item.id))

  return <div className="space-y-8">
    <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30]">Akun member</p><h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">Halo, {member?.name || user?.name || 'Member'}</h1><p className="mt-2 text-sm text-white/55">Lihat kelas yang Anda ikuti dan status membership.</p></div>
    {!member && <p role="alert" className="text-sm text-rose-400">Akun ini belum terhubung dengan data member. Hubungi admin.</p>}
    <div className="grid gap-3 sm:grid-cols-2"><div className="border border-white/10 bg-[#0c1017] p-5"><CalendarDays className="h-5 w-5 text-[#80a7ec]" /><p className="mt-5 text-3xl font-black">{myClasses.length}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">Kelas yang diikuti</p></div><div className="border border-white/10 bg-[#0c1017] p-5"><Ticket className="h-5 w-5 text-[#80a7ec]" /><p className="mt-5 text-3xl font-black">{member?.ptRemaining ?? '—'}</p><p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/50">Sesi privat tersisa</p></div></div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(18rem,1fr)]">
      <section className="border border-white/10 bg-[#0c1017]" aria-labelledby="my-classes-heading"><div className="flex items-center justify-between gap-3 border-b border-white/10 p-5"><h2 id="my-classes-heading" className="text-base font-black uppercase">Jadwal Anda</h2><Link to="/dashboard/bookings" className="flex items-center gap-1 text-xs font-bold text-[#80a7ec] hover:text-white">Lihat kelas <ArrowRight className="h-4 w-4" /></Link></div>
        {myClasses.length ? <div className="divide-y divide-white/10">{myClasses.map((item) => <div key={item.id} className="grid gap-2 p-5 sm:grid-cols-[6rem_1fr_auto] sm:items-center"><span className="text-xs font-semibold text-[#80a7ec]">{item.day}</span><div><p className="text-sm font-bold">{item.title}</p><p className="mt-1 text-xs text-white/45">{findCoach(data, item.coachId)?.name || 'Tanpa pelatih'} · {item.ring}</p></div><span className="text-xs text-white/55">{item.time}</span></div>)}</div> : <p className="p-5 text-sm text-white/55">Belum ada kelas yang diikuti. Pilih kelas dari jadwal.</p>}
      </section>
      <section className="border border-white/10 bg-[#0c1017] p-5" aria-labelledby="membership-heading"><h2 id="membership-heading" className="text-base font-black uppercase">Membership</h2><p className="mt-6 text-lg font-bold">{plan?.name || 'Belum ada paket'}</p><p className={`mt-1 text-sm ${member?.status === 'Aktif' ? 'text-emerald-400' : 'text-amber-400'}`}>{member?.status || 'Tidak tersedia'}</p><div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/55">Berlaku sampai <span className="mt-1 block font-semibold text-white">{formatDate(member?.expires)}</span></div><Link to="/dashboard/profile" className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[#80a7ec] hover:text-white">Lihat profil <ArrowRight className="h-4 w-4" /></Link></section>
    </div>
  </div>
}
