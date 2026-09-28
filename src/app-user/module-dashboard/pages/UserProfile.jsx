import { useAuth } from '@/module-auth/context/AuthContext'
import { useData } from '@/data/DataContext'
import { findMemberByEmail, findPlan, formatDate } from '@/data/selectors'

export default function UserProfile() {
  const { user } = useAuth()
  const { data } = useData()
  const member = findMemberByEmail(data, user?.email)
  const plan = findPlan(data, member?.planId)

  return <div className="space-y-7"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30]">Akun</p><h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">Profil member</h1><p className="mt-2 text-sm text-white/55">Informasi akun dan membership Anda.</p></div>
    {!member && <p role="alert" className="text-sm text-rose-400">Akun ini belum terhubung dengan data member. Hubungi admin.</p>}
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="border border-white/10 bg-[#0c1017]" aria-labelledby="account-heading"><h2 id="account-heading" className="border-b border-white/10 p-5 text-base font-black uppercase">Informasi akun</h2><dl className="divide-y divide-white/10 px-5"><div className="py-4"><dt className="text-xs text-white/45">Nama</dt><dd className="mt-1 text-sm font-semibold">{member?.name || user?.name || '—'}</dd></div><div className="py-4"><dt className="text-xs text-white/45">Email</dt><dd className="mt-1 text-sm font-semibold">{member?.email || user?.email || '—'}</dd></div><div className="py-4"><dt className="text-xs text-white/45">Telepon</dt><dd className="mt-1 text-sm font-semibold">{member?.phone || '—'}</dd></div></dl></section>
      <section className="border border-white/10 bg-[#0c1017]" aria-labelledby="plan-heading"><h2 id="plan-heading" className="border-b border-white/10 p-5 text-base font-black uppercase">Membership</h2><dl className="divide-y divide-white/10 px-5"><div className="py-4"><dt className="text-xs text-white/45">Paket</dt><dd className="mt-1 text-sm font-semibold">{plan?.name || '—'}</dd></div><div className="py-4"><dt className="text-xs text-white/45">Status</dt><dd className="mt-1 text-sm font-semibold">{member?.status || '—'}</dd></div><div className="py-4"><dt className="text-xs text-white/45">Berlaku sampai</dt><dd className="mt-1 text-sm font-semibold">{formatDate(member?.expires)}</dd></div><div className="py-4"><dt className="text-xs text-white/45">Sesi privat tersisa</dt><dd className="mt-1 text-sm font-semibold">{member?.ptRemaining ?? '—'}</dd></div></dl></section>
    </div>
  </div>
}
