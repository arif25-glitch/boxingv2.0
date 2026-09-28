import { useState } from 'react'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useData } from '@/data/DataContext'
import { findPlan, formatDate } from '@/data/selectors'
import ConfirmDelete from '../components/ConfirmDelete'

const filters = ['Semua', 'Aktif', 'Menunggu', 'Kedaluwarsa']
const emptyMember = { name: '', email: '', phone: '', planId: '', division: '', status: 'Aktif', expires: '', ptRemaining: 0 }
const inputClass = 'min-h-10 w-full border border-white/15 bg-[#080b11] px-3 text-sm text-white outline-none focus:border-[#80a7ec]'

export default function AdminMembers() {
  const { data, saveRecord, deleteRecord } = useData()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Semua')
  const [form, setForm] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [error, setError] = useState('')
  const search = query.trim().toLocaleLowerCase('id-ID')
  const visible = data.members.filter((member) => {
    const values = [member.name, member.id, member.email, findPlan(data, member.planId)?.name || '', member.division]
    return (filter === 'Semua' || member.status === filter) && values.some((value) => value.toLocaleLowerCase('id-ID').includes(search))
  })

  const openForm = (member = null) => {
    setForm(member ? { ...member } : { ...emptyMember, planId: data.plans[0]?.id || '' })
    setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const email = form.email.trim().toLowerCase()
    if (data.members.some((item) => item.id !== form.id && item.email.toLowerCase() === email)) {
      setError('Email sudah digunakan member lain.')
      return
    }
    if (!form.planId || !data.plans.some((item) => item.id === form.planId)) {
      setError('Pilih paket yang tersedia.')
      return
    }
    saveRecord('members', {
      ...form,
      id: form.id || `JNN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      name: form.name.trim(), email, phone: form.phone.trim(), division: form.division.trim(),
      ptRemaining: Number(form.ptRemaining),
    })
    setForm(null)
    setError('')
  }

  const remove = () => {
    setError(deleteRecord('members', pendingDelete.id) || '')
    setPendingDelete(null)
  }

  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30]">Member</p><h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">Daftar member</h1><p className="mt-2 text-sm text-white/55">Kelola data member dan paketnya.</p></div>
      <button type="button" onClick={() => openForm()} className="inline-flex min-h-10 items-center gap-2 bg-[#FF3B30] px-4 text-xs font-bold text-white hover:bg-[#d83127]"><Plus className="h-4 w-4" />Tambah member</button>
    </div>

    {form && <form onSubmit={submit} className="space-y-5 border border-[#80a7ec]/40 bg-[#0c1017] p-5">
      <h2 className="text-base font-black uppercase">{form.id ? 'Ubah member' : 'Tambah member'}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className="space-y-2 text-xs text-white/60">Nama<input required maxLength={80} className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Email<input required type="email" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Telepon<input required className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Paket<select required className={inputClass} value={form.planId} onChange={(e) => setForm({ ...form, planId: e.target.value })}><option value="">Pilih paket</option>{data.plans.map((plan) => <option key={plan.id} value={plan.id}>{plan.name}</option>)}</select></label>
        <label className="space-y-2 text-xs text-white/60">Divisi<input className={inputClass} value={form.division} onChange={(e) => setForm({ ...form, division: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Status<select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{filters.slice(1).map((status) => <option key={status}>{status}</option>)}</select></label>
        <label className="space-y-2 text-xs text-white/60">Berlaku sampai<input type="date" className={inputClass} value={form.expires} onChange={(e) => setForm({ ...form, expires: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Sesi privat tersisa<input type="number" min="0" required className={inputClass} value={form.ptRemaining} onChange={(e) => setForm({ ...form, ptRemaining: e.target.value })} /></label>
      </div>
      {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
      <div className="flex gap-3"><button type="submit" className="min-h-10 bg-[#FF3B30] px-5 text-xs font-bold text-white">Simpan</button><button type="button" onClick={() => setForm(null)} className="min-h-10 border border-white/15 px-5 text-xs font-bold text-white/70">Batal</button></div>
    </form>}

    {pendingDelete && <ConfirmDelete itemName={pendingDelete.name} detail="Pendaftaran kelas member ini juga akan dihapus." onCancel={() => setPendingDelete(null)} onConfirm={remove} />}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1 overflow-x-auto" aria-label="Filter status member">{filters.map((status) => <button key={status} type="button" aria-pressed={filter === status} onClick={() => setFilter(status)} className={`shrink-0 px-4 py-2 text-xs font-bold ${filter === status ? 'bg-[#FF3B30] text-white' : 'border border-white/10 bg-[#0c1017] text-white/55 hover:text-white'}`}>{status}</button>)}</div>
      <label className="relative block w-full sm:max-w-xs"><span className="sr-only">Cari member</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari nama, ID, atau paket" className="h-10 w-full border border-white/15 bg-[#0c1017] pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/35" /></label>
    </div>
    {!form && error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
    <section aria-label="Daftar member" className="border border-white/10 bg-[#0c1017]"><div className="border-b border-white/10 px-5 py-3 text-xs text-white/45">{visible.length} member</div>
      {visible.length ? <div className="divide-y divide-white/10">{visible.map((member) => <article key={member.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="min-w-0"><p className="text-sm font-bold">{member.name} <span className="ml-2 text-xs font-normal text-white/40">{member.id}</span></p><p className="mt-1 text-xs text-white/50">{member.email} · {findPlan(data, member.planId)?.name || 'Tanpa paket'}</p><p className="mt-1 text-xs text-white/40">{member.phone} · Berlaku {formatDate(member.expires)} · {member.ptRemaining} sesi privat</p></div>
        <div className="flex items-center gap-4"><span className={`text-xs font-bold ${member.status === 'Aktif' ? 'text-emerald-400' : member.status === 'Menunggu' ? 'text-amber-400' : 'text-rose-400'}`}>{member.status}</span><button type="button" onClick={() => openForm(member)} aria-label={`Ubah ${member.name}`} className="p-2 text-white/60 hover:text-white"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => setPendingDelete(member)} aria-label={`Hapus ${member.name}`} className="p-2 text-white/60 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button></div>
      </article>)}</div> : <p className="p-8 text-center text-sm text-white/55">Tidak ada member yang cocok.</p>}
    </section>
  </div>
}
