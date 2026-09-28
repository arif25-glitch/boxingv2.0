import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-[#07090e]">
      <img
        src="/images/hero_bg.png"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[63%_center] lg:object-center"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#07090e]/95 via-[#07090e]/75 to-[#07090e]/25 lg:from-[#07090e]/90 lg:via-[#07090e]/50 lg:to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/10"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-[720px]">
          <div className="mb-7 flex items-center gap-3 text-xs font-black uppercase tracking-[0.24em] text-white/80">
            <span className="h-px w-8 bg-[#FF3B30]" />
            JNN Boxing Club
          </div>

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-[clamp(4rem,5vw,5rem)]">
            Latihan boxing
            <br />
            <span className="text-[#FF3B30]">untuk semua level.</span>
          </h1>

          <p className="mt-7 max-w-lg border-l-2 border-[#FF3B30] pl-5 text-base leading-relaxed text-white/80 sm:text-lg">
            Kelas dasar, sparring, dan latihan privat bersama pelatih.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#programs">
              <Button
                size="lg"
                className="h-12 rounded-sm bg-[#FF3B30] px-7 font-bold uppercase tracking-wider text-white shadow-lg shadow-[#FF3B30]/20 hover:bg-[#cc2f26]"
              >
                Lihat Program <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-sm border-white/40 bg-black/20 px-7 font-bold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              >
                Masuk
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  )
}
