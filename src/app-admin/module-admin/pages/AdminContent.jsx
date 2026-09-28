import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useData } from '@/data/DataContext'
import ConfirmDelete from '../components/ConfirmDelete'

const sections = [
  { key: 'coaches', label: 'Pelatih', singular: 'pelatih', fields: [
    { name: 'name', label: 'Nama', required: true }, { name: 'specialty', label: 'Keahlian', required: true }, { name: 'image', label: 'Path gambar', required: true },
  ] },
  { key: 'programs', label: 'Program', singular: 'program', fields: [
    { name: 'title', label: 'Judul', required: true }, { name: 'subtitle', label: 'Subjudul', required: true }, { name: 'image', label: 'Path gambar', required: true },
    { name: 'description', label: 'Deskripsi', required: true, multiline: true }, { name: 'features', label: 'Poin manfaat (satu per baris)', multiline: true, list: true },
  ] },
  { key: 'plans', label: 'Paket', singular: 'paket', fields: [
    { name: 'name', label: 'Nama paket', required: true }, { name: 'price', label: 'Harga (contoh: Rp 850.000)', required: true }, { name: 'period', label: 'Periode (contoh: / bulan)', required: true },
    { name: 'description', label: 'Deskripsi', required: true, multiline: true }, { name: 'features', label: 'Fasilitas (satu per baris)', multiline: true, list: true },
  ] },
]

const inputClass = 'min-h-10 w-full border border-white/15 bg-[#080b11] px-3 py-2 text-sm text-white outline-none focus:border-[#80a7ec]'

export default function AdminContent() {
  const { data, saveRecord, deleteRecord } = useData()
  const [sectionKey, setSectionKey] = useState('coaches')
  const [form, setForm] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [error, setError] = useState('')
  const section = sections.find((item) => item.key === sectionKey)
  const items = data[sectionKey]

  const openForm = (item = null) => {
    setForm(item ? { ...item, features: item.features?.join('\n') || '' } : Object.fromEntries(section.fields.map((field) => [field.name, ''])))
    setError('')
  }

  const submit = (event) => {
    event.preventDefault()
    const image = form.image?.trim()
    if (image && !(/^\/(?!\/)/.test(image) || /^https:\/\//i.test(image))) {
      setError('Gunakan path gambar lokal yang diawali / atau URL https://.')
      return
    }
    const record = Object.fromEntries(section.fields.map((field) => [field.name, field.list
      ? form[field.name].split('\n').map((value) => value.trim()).filter(Boolean)
      : form[field.name].trim()]))
    saveRecord(sectionKey, { ...record, ...(form.id ? { id: form.id } : {}) })
    setForm(null)
    setError('')
  }

  const remove = () => {
    setError(deleteRecord(sectionKey, pendingDelete.id) || '')
    setPendingDelete(null)
  }

  return <div className="space-y-6">
    <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30]">Situs</p><h1 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">Konten homepage</h1><p className="mt-2 text-sm text-white/55">Perubahan di sini langsung tampil pada homepage.</p></div>
    <div className="flex gap-1 overflow-x-auto border-b border-white/10" aria-label="Jenis konten">{sections.map((item) => <button key={item.key} type="button" aria-pressed={sectionKey === item.key} onClick={() => { setSectionKey(item.key); setForm(null); setPendingDelete(null); setError('') }} className={`min-w-28 border-b-2 px-4 py-3 text-xs font-bold ${sectionKey === item.key ? 'border-[#FF3B30] text-white' : 'border-transparent text-white/50 hover:text-white'}`}>{item.label}</button>)}</div>
    <div className="flex items-center justify-between gap-4"><h2 className="text-base font-black uppercase">{section.label}</h2><button type="button" onClick={() => openForm()} className="inline-flex min-h-10 items-center gap-2 bg-[#FF3B30] px-4 text-xs font-bold text-white hover:bg-[#d83127]"><Plus className="h-4 w-4" />Tambah {section.singular}</button></div>

    {form && <form onSubmit={submit} className="space-y-5 border border-[#80a7ec]/40 bg-[#0c1017] p-5"><h3 className="text-sm font-black uppercase">{form.id ? 'Ubah' : 'Tambah'} {section.singular}</h3>
      <div className="grid gap-4 md:grid-cols-2">{section.fields.map((field) => <label key={field.name} className={`space-y-2 text-xs text-white/60 ${field.multiline ? 'md:col-span-2' : ''}`}>{field.label}{field.multiline
        ? <textarea required={field.required} rows={field.list ? 3 : 2} className={inputClass} value={form[field.name] || ''} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />
        : <input required={field.required} maxLength={field.name === 'image' ? 400 : 160} className={inputClass} value={form[field.name] || ''} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />}</label>)}</div>
      {section.fields.some((field) => field.name === 'image') && <p className="text-xs text-white/40">Contoh: /images/coach-technique.png. Simpan gambar baru di public/images sebelum memasukkan path-nya.</p>}
      {error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
      <div className="flex gap-3"><button type="submit" className="min-h-10 bg-[#FF3B30] px-5 text-xs font-bold text-white">Simpan</button><button type="button" onClick={() => setForm(null)} className="min-h-10 border border-white/15 px-5 text-xs font-bold text-white/70">Batal</button></div>
    </form>}
    {pendingDelete && <ConfirmDelete itemName={pendingDelete.name || pendingDelete.title} detail="Perubahan ini langsung berlaku pada halaman terkait." onCancel={() => setPendingDelete(null)} onConfirm={remove} />}
    {!form && error && <p role="alert" className="text-sm text-rose-400">{error}</p>}
    <section aria-label={`Daftar ${section.label.toLowerCase()}`} className="border border-white/10 bg-[#0c1017]">{items.length ? <div className="divide-y divide-white/10">{items.map((item) => <article key={item.id} className="flex items-center justify-between gap-4 p-5"><div className="min-w-0"><p className="text-sm font-bold">{item.name || item.title}</p><p className="mt-1 text-xs text-white/50">{item.specialty || item.subtitle || item.description}</p></div><div className="flex shrink-0 gap-1"><button type="button" onClick={() => openForm(item)} aria-label={`Ubah ${item.name || item.title}`} className="p-2 text-white/60 hover:text-white"><Pencil className="h-4 w-4" /></button><button type="button" onClick={() => setPendingDelete(item)} aria-label={`Hapus ${item.name || item.title}`} className="p-2 text-white/60 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button></div></article>)}</div> : <p className="p-8 text-center text-sm text-white/55">Belum ada {section.singular}. Tambahkan untuk menampilkannya di homepage.</p>}</section>
  </div>
}
