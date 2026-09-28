export default function LoginVisual() {
  return (
    <aside className="relative min-h-64 overflow-hidden bg-[#111827] sm:min-h-80 lg:order-1 lg:min-h-0 lg:border-r lg:border-white/10" aria-label="Suasana latihan JNN Boxing Club">
      <img
        src="/images/hero_bg.png"
        alt="Petinju sedang berlatih di ring JNN Boxing Club"
        className="absolute inset-0 h-full w-full object-cover object-[66%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/90 via-[#07090e]/15 to-[#07090e]/10" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 max-w-xl px-7 pb-8 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
          <span className="h-px w-8 bg-[#FF3B30]" />
          JNN Boxing Club
        </p>
        <p className="text-3xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-4xl xl:text-5xl">
          Setiap ronde<br />dimulai di sini.
        </p>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
          Akses jadwal latihan, sesi sparring, dan perjalanan Anda di ring.
        </p>
      </div>
    </aside>
  )
}
