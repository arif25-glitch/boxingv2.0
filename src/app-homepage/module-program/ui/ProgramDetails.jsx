import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

export default function ProgramDetails({ program, active }) {
  return (
    <article
      aria-hidden={!active}
      inert={!active}
      className={`absolute inset-0 flex min-h-0 flex-col justify-center px-6 pb-16 pt-5 sm:px-10 lg:px-8 lg:pb-20 lg:pt-10 xl:px-16 ${active ? 'animate-[program-copy-in_280ms_ease-out_both] motion-reduce:animate-none' : 'pointer-events-none invisible'}`}
    >
      <h3 className="max-w-xl text-3xl font-black leading-none tracking-tight text-white sm:text-4xl lg:text-[clamp(2rem,3.4vw,4rem)]">
        {program.title}
      </h3>
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-[#FF3B30] sm:text-sm">
        {program.subtitle}
      </p>
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/65 sm:text-base">
        {program.description}
      </p>

      <ul className="mt-5 flex max-w-lg flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-5 sm:mt-7 sm:pt-6">
        {program.features.slice(0, 2).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs text-white/75 sm:text-sm">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF3B30]" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        to="/login"
        className="mt-6 inline-flex w-fit items-center gap-3 border-b border-[#FF3B30] pb-2 text-xs font-black uppercase tracking-[0.12em] text-white transition-colors hover:text-[#FF3B30] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3B30] sm:mt-8"
      >
        Masuk untuk lihat jadwal <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}
