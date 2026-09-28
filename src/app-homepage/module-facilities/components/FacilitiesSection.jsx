import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="scroll-mt-16 border-t border-white/10 bg-[#07090e] py-16 text-white lg:scroll-mt-20 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 sm:px-10 lg:grid-cols-2 lg:gap-14 lg:px-12">
        <div className="relative min-h-72 overflow-hidden bg-[#111827] sm:min-h-96 lg:min-h-[440px]">
          <img src="/images/facility-gym.png" alt="Ilustrasi ruang gym boxing dengan ring dan deretan samsak" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center" />
          <span className="absolute bottom-4 left-4 bg-[#07090e]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/75 backdrop-blur-sm">Ilustrasi fasilitas</span>
        </div>
        <div>
          <h2 className="max-w-lg text-3xl font-black leading-none tracking-tight sm:text-4xl lg:text-5xl">Fasilitas latihan</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60 sm:text-base">Tersedia ring, area samsak, dan ruang untuk sesi privat.</p>
          <p className="mt-6 border-l-2 border-[#FF3B30] pl-4 text-sm font-semibold text-white/85">3 ring latihan · 16 samsak · area sesi privat</p>
          <Link to="/login" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:text-[#FF3B30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3B30]">
            Masuk untuk lihat jadwal <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
