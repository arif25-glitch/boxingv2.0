import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh w-full items-center overflow-hidden bg-[#0a0c14]">
      <img
        src="/images/hero_bg.png"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[60%_center] lg:object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#07090e]/95 via-[#07090e]/70 to-[#07090e]/30 lg:via-[#07090e]/45 lg:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#07090e]/70 via-transparent to-[#07090e]/20"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl px-4 py-24 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex max-w-2xl flex-col gap-6">
          <div>
            <Badge className="rounded-sm border-0 bg-[#FF3B30] px-3 py-1 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#FF3B30]">
              ● Open Enrollment
            </Badge>
          </div>

          <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-6xl xl:text-7xl">
            Train Like
            <br />
            <span className="text-[#FF3B30]">Champions</span>
            <br />
            <span className="text-[#5b8de8]">Fight</span>{' '}
            <span className="text-white">Smarter.</span>
          </h1>

          <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
            Program latihan boxing terstruktur untuk semua level — dari pemula hingga fighter
            kompetitif. Pelatih bersertifikat, fasilitas ring standar, dan kurikulum berbasis
            data performa.
          </p>

          <div className="flex gap-8 py-2">
            <div>
              <p className="text-3xl font-black text-white">12+</p>
              <p className="text-xs uppercase tracking-widest text-white/60">Pelatih Pro</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-black text-white">500+</p>
              <p className="text-xs uppercase tracking-widest text-white/60">Member Aktif</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-3xl font-black text-white">3</p>
              <p className="text-xs uppercase tracking-widest text-white/60">Cabang</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="rounded-sm border-0 bg-[#FF3B30] px-8 font-bold uppercase tracking-wide text-white shadow-lg shadow-[#FF3B30]/25 hover:bg-[#cc2f26]"
              >
                Daftar Sekarang
              </Button>
            </Link>
            <a href="#programs">
              <Button
                size="lg"
                variant="outline"
                className="rounded-sm border-white/30 px-8 font-bold uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
              >
                Lihat Program
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="h-8 w-px animate-pulse bg-white/40" />
      </div>
    </section>
  )
}
