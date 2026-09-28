import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useData } from '@/data/DataContext'

export default function CoachesSection() {
  const { data } = useData()
  const coaches = data.coaches
  return (
    <section id="trainers" className="scroll-mt-16 border-t border-white/10 bg-[#0b0e15] py-14 text-white lg:scroll-mt-20 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <h2 className="text-3xl font-black leading-none tracking-tight sm:text-4xl lg:text-5xl">Pelatih kami</h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">Pelatih untuk kelas teknik, sparring, dan latihan fisik.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {coaches.map((coach) => (
            <article key={coach.id} className="overflow-hidden border border-white/10 bg-[#11151e]">
              <img src={coach.image} alt={`Ilustrasi latihan ${coach.specialty.toLowerCase()}`} loading="lazy" className="h-56 w-full object-cover object-center sm:h-64 md:h-52 lg:h-64" />
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-black tracking-tight">{coach.name}</h3>
                <p className="mt-2 text-sm text-white/60">{coach.specialty}</p>
              </div>
            </article>
          ))}
          {coaches.length === 0 && <p className="text-sm text-white/50">Informasi pelatih belum tersedia.</p>}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/40">Gambar pelatih merupakan ilustrasi.</p>
          <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors hover:text-[#FF3B30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3B30]">
            Masuk untuk lihat jadwal <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
