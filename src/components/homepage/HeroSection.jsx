import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/**
 * HeroSection — Landing page hero for Boxing Club v2.0.
 * Split layout: editorial copy (left) + visual panel (right).
 * JNN brand colors: Cobalt Blue #003B95, Vibrant Red #FF3B30.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full min-h-svh flex items-center overflow-hidden bg-[#0a0c14]">

      {/* ── Background diagonal accent ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* right-side cobalt panel */}
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[#003B95] opacity-10 [clip-path:polygon(12%_0,100%_0,100%_100%,0%_100%)]" />
        {/* red streak accent */}
        <div className="absolute left-[44%] top-0 h-full w-2 bg-[#FF3B30] opacity-60 rotate-[2deg] origin-top" />
        {/* grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Main container ── */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

        {/* ── LEFT: Copy ── */}
        <div className="flex flex-col gap-6">

          {/* Status badge */}
          <div>
            <Badge className="bg-[#FF3B30] hover:bg-[#FF3B30] text-white border-0 rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-widest">
              ● Open Enrollment
            </Badge>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black uppercase leading-[0.92] tracking-tight text-white">
              Train Like
              <br />
              <span className="text-[#FF3B30]">Champions</span>
              <br />
              <span className="text-[#5b8de8]">Fight</span>{' '}
              <span className="text-white">Smarter.</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-white/60 max-w-md leading-relaxed">
            Program latihan boxing terstruktur untuk semua level — dari pemula hingga fighter
            kompetitif. Pelatih bersertifikat, fasilitas ring standar, dan kurikulum berbasis
            data performa.
          </p>

          {/* Stats row */}
          <div className="flex gap-8 py-2">
            <div>
              <p className="text-3xl font-black text-white">12+</p>
              <p className="text-xs text-white/50 uppercase tracking-widest">Pelatih Pro</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-3xl font-black text-white">500+</p>
              <p className="text-xs text-white/50 uppercase tracking-widest">Member Aktif</p>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <p className="text-3xl font-black text-white">3</p>
              <p className="text-xs text-white/50 uppercase tracking-widest">Cabang</p>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              size="lg"
              className="bg-[#FF3B30] hover:bg-[#cc2f26] text-white border-0 font-bold uppercase tracking-wide px-8 rounded-sm"
            >
              Daftar Sekarang
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white font-bold uppercase tracking-wide px-8 rounded-sm"
            >
              Lihat Program
            </Button>
          </div>
        </div>

        {/* ── RIGHT: Visual panel ── */}
        <div className="relative flex items-center justify-center lg:justify-end">

          {/* Outer glow ring */}
          <div className="absolute w-80 h-80 xl:w-96 xl:h-96 rounded-full bg-[#003B95] opacity-20 blur-3xl" />

          {/* Main visual card */}
          <div className="relative w-72 sm:w-80 xl:w-96 aspect-[3/4] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            {/* placeholder for hero image */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#003B95]/80 via-[#0a0c14]/60 to-[#FF3B30]/40 flex flex-col items-center justify-end p-6">
              {/* Silhouette placeholder icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg viewBox="0 0 200 300" className="w-full h-full" fill="white">
                  <ellipse cx="100" cy="50" rx="30" ry="35" />
                  <path d="M70 90 Q60 130 55 180 L80 180 Q85 150 100 140 Q115 150 120 180 L145 180 Q140 130 130 90 Z" />
                  <rect x="40" y="100" width="30" height="55" rx="10" />
                  <rect x="130" y="100" width="30" height="55" rx="10" />
                  <rect x="55" y="180" width="30" height="80" rx="8" />
                  <rect x="115" y="180" width="30" height="80" rx="8" />
                </svg>
              </div>

              {/* Card label */}
              <div className="relative z-10 w-full">
                <div className="border-t border-white/20 pt-4">
                  <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Program Unggulan</p>
                  <p className="text-xl font-black text-white uppercase">Elite Fighter</p>
                  <p className="text-sm text-white/60">6 bulan · 3× seminggu</p>
                </div>
              </div>
            </div>

            {/* Red corner tag */}
            <div className="absolute top-4 right-4 bg-[#FF3B30] text-white text-xs font-black px-2 py-1 rounded-sm uppercase tracking-widest">
              Pro
            </div>
          </div>

          {/* Floating badge bottom-left */}
          <div className="absolute bottom-6 left-0 lg:-left-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <div>
              <p className="text-xs text-white/50 uppercase tracking-widest">Ring Status</p>
              <p className="text-sm font-bold text-white">2 Ring Tersedia</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/20 animate-pulse" />
      </div>
    </section>
  )
}
