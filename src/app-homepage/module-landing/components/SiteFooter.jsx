import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#07090e] text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <Link to="/" className="flex w-fit items-center gap-3 transition-opacity hover:opacity-70">
            <img src="/jnn-favicon.svg" alt="" className="h-9 w-9" />
            <span className="font-black uppercase tracking-[0.1em]">JNN Boxing</span>
          </Link>
          <p className="mt-2 text-xs text-white/45">Latihan untuk setiap level.</p>
        </div>
        <nav aria-label="Navigasi footer" className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.08em] text-white/60">
          <a href="#programs" className="transition-colors hover:text-white">Program</a>
          <a href="#trainers" className="transition-colors hover:text-white">Pelatih</a>
          <a href="#facilities" className="transition-colors hover:text-white">Fasilitas</a>
          <a href="#pricing" className="transition-colors hover:text-white">Membership</a>
          <Link to="/login" className="transition-colors hover:text-white">Masuk</Link>
        </nav>
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/35">© {new Date().getFullYear()} JNN Boxing Club</div>
    </footer>
  )
}
