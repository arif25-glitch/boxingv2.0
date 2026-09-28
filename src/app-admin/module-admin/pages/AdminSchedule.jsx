import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useData } from '@/data/DataContext'
import { bookingCount, findCoach } from '@/data/selectors'
import ConfirmDelete from '../components/ConfirmDelete'

const days = ['Hari ini', 'Besok', 'Lusa']
const categories = ['Teknik', 'Sparring', 'Kondisi fisik', 'Privat']
const statuses = ['Akan datang', 'Berlangsung', 'Selesai']
const inputClass = 'min-h-10 w-full border border-white/15 bg-[#080b11] px-3 text-sm text-white outline-none focus:border-[#80a7ec]'
const emptySession = { day: 'Hari ini', title: '', ring: '', coachId: '', category: 'Teknik', start: '09:00', end: '10:00', booked: 0, capacity: 12, status: 'Akan datang' }

export default function AdminSchedule() {
  const { data, saveRecord, deleteRecord } = useData()
  const [activeDay, setActiveDay] = useState(days[0])
  const [form, setForm] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [error, setError] = useState('')
  const dailySessions = data.sessions.filter((item) => item.day === activeDay).sort((a, b) => a.time.localeCompare(b.time))

  const openForm = (session = null) => {
    setForm(session ? { ...session, start: session.time.split('–')[0], end: session.time.split('–')[1] } : { ...emptySession, day: activeDay, coachId: data.coaches[0]?.id || '' })
    setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    if (form.end <= form.start) return setError('Jam selesai harus lebih akhir dari jam mulai.')
    if (!form.coachId || !data.coaches.some((item) => item.id === form.coachId)) return setError('Pilih pelatih yang tersedia.')
    const existingBookings = data.bookings.filter((item) => item.sessionId === form.id).length
    if (Number(form.booked) + existingBookings > Number(form.capacity)) return setError('Kapasitas lebih kecil dari jumlah peserta yang sudah tercatat.')
    const { start, end, ...rest } = form
    saveRecord('sessions', { ...rest, title: form.title.trim(), ring: form.ring.trim(), time: `${start}–${end}`, booked: Number(form.booked), capacity: Number(form.capacity) })
    setActiveDay(form.day)
    setForm(null)
    setError('')
  }

  const remove = () => {
    setError(deleteRecord('sessions', pendingDelete.id) || '')
    setPendingDelete(null)
  }

  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30]">Jadwal</p><h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">Sesi latihan</h1><p className="mt-2 text-sm text-white/55">Kelola kelas yang terlihat di dashboard member dan situs.</p></div><button type="button" onClick={() => openForm()} className="inline-flex min-h-10 items-center gap-2 bg-[#FF3B30] px-4 text-xs font-bold text-white hover:bg-[#d83127]"><Plus className="h-4 w-4" />Tambah sesi</button></div>

    {form && <form onSubmit={submit} className="space-y-5 border border-[#80a7ec]/40 bg-[#0c1017] p-5">
      <h2 className="text-base font-black uppercase">{form.id ? 'Ubah sesi' : 'Tambah sesi'}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2 text-xs text-white/60 md:col-span-2">Nama kelas<input required maxLength={100} className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Hari<select className={inputClass} value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })}>{days.map((day) => <option key={day}>{day}</option>)}</select></label>
        <label className="space-y-2 text-xs text-white/60">Jenis kelas<select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="space-y-2 text-xs text-white/60">Mulai<input required type="time" className={inputClass} value={form.start} onChange={(e) => setForm({ ...form, start: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Selesai<input required type="time" className={inputClass} value={form.end} onChange={(e) => setForm({ ...form, end: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Ring atau area<input required className={inputClass} value={form.ring} onChange={(e) => setForm({ ...form, ring: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Pelatih<select required className={inputClass} value={form.coachId} onChange={(e) => setForm({ ...form, coachId: e.target.value })}><option value="">Pilih pelatih</option>{data.coaches.map((coach) => <option key={coach.id} value={coach.id}>{coach.name}</option>)}</select></label>
        <label className="space-y-2 text-xs text-white/60">Peserta lain (di luar pendaftaran member)<input required type="number" min="0" className={inputClass} value={form.booked} onChange={(e) => setForm({ ...form, booked: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Kapasitas<input required type="number" min="1" className={inputClass} value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} /></label>
        <label className="space-y-2 text-xs text-white/60">Status<select className={inputClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
      </div>
      {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
      <div className="flex gap-3"><button type="submit" className="min-h-10 bg-[#FF3B30] px-5 text-xs font-bold text-white">Simpan</button><button type="button" onClick={() => setForm(null)} className="min-h-10 border border-white/15 px-5 text-xs font-bold text-white/70">Batal</button></div>
    </form>}

    {pendingDelete && <ConfirmDelete itemName={pendingDelete.title} detail="Pendaftaran member pada sesi ini juga akan dihapus." onCancel={() => setPendingDelete(null)} onConfirm={remove} />}
    <div className="flex w-fit max-w-full gap-1 overflow-x-auto border border-white/10 bg-[#0c1017] p-1" aria-label="Pilih hari">{days.map((day) => <button key={day} type="button" aria-pressed={activeDay === day} onClick={() => setActiveDay(day)} className={`min-w-24 px-4 py-2.5 text-xs font-bold ${activeDay === day ? 'bg-[#FF3B30] text-white' : 'text-white/55 hover:text-white'}`}>{day}</button>)}</div>
    {!form && error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
    <section aria-label={`Jadwal ${activeDay.toLowerCase()}`} className="border border-white/10 bg-[#0c1017]"><div className="flex items-center justify-between border-b border-white/10 px-5 py-3 text-xs text-white/45"><span>{activeDay}</span><span>{dailySessions.length} sesi</span></div>
      {dailySessions.length ? <div className="divide-y divide-white/10">{dailySessions.map((session) => <article key={session.id} className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex min-w-0 gap-4 sm:gap-8"><span className="w-24 shrink-0 font-mono text-xs text-white/55">{session.time}</span><div className="min-w-0"><p className="text-sm font-bold">{session.title}</p><p className="mt-1 text-xs text-white/50">{session.ring} · {findCoach(data, session.coachId)?.name || 'Tanpa pelatih'} · {session.category}</p></div></div>
        <div className="flex items-center gap-4"><span className="text-xs text-white/55">{bookingCount(data, session)}/{session.capacity} peserta</span><span className={`text-xs font-bold ${session.status === 'Akan datang' ? 'text-emerald-400' : session.status === 'Berlangsung' ? 'text-amber-400' : 'text-white/45'}`}>{session.status}</span><button type="button" onClick={() => openForm(session)} aria-label={`Ubah ${session.title}`} className="p-2 text-white/60 hover:text-white"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => setPendingDelete(session)} aria-label={`Hapus ${session.title}`} className="p-2 text-white/60 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button></div>
      </article>)}</div> : <p className="p-8 text-center text-sm text-white/55">Belum ada sesi pada hari ini.</p>}
    </section>
  </div>
}
