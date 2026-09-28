import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check } from 'lucide-react'
import { useData } from '@/data/DataContext'

export default function PricingSection() {
  const { data } = useData()
  const [activeId, setActiveId] = useState(null)
  const plans = data.plans
  const plan = plans.find((item) => item.id === activeId) || plans[0]

  return (
    <section id="pricing" className="scroll-mt-16 border-t border-white/10 bg-[#0b0e15] py-14 text-white lg:scroll-mt-20 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <h2 className="text-3xl font-black leading-none tracking-tight sm:text-4xl lg:text-5xl">Paket latihan</h2>

        <div className="mt-8 flex w-fit max-w-full gap-1 overflow-x-auto border border-white/10 bg-[#11151e] p-1" aria-label="Pilihan membership">
          {plans.map((choice) => (
            <button key={choice.id} type="button" aria-pressed={plan?.id === choice.id} onClick={() => setActiveId(choice.id)} className={`min-w-24 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-[#FF3B30] ${plan?.id === choice.id ? 'bg-[#FF3B30] text-white' : 'text-white/55 hover:text-white'}`}>
              {choice.name}
            </button>
          ))}
        </div>

        {plan ? <div className="mt-4 grid gap-8 border border-white/10 bg-[#11151e] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:p-12" aria-live="polite">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#80a7ec]">{plan.name}</p>
            <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{plan.name}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">{plan.description}</p>
            <p className="mt-8 text-3xl font-black tracking-tight sm:text-4xl">{plan.price}</p>
            <p className="mt-1 text-xs text-white/45">{plan.period.replace('/ ', 'per ')}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Termasuk</p>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              {plan.features.slice(0, 3).map((feature) => (
                <li key={feature} className="flex items-start gap-3"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3B30]" /><span>{feature}</span></li>
              ))}
            </ul>
            <Link to="/login" className="mt-8 flex min-h-12 w-fit min-w-48 items-center justify-between gap-8 bg-[#FF3B30] px-5 text-xs font-bold uppercase tracking-[0.1em] transition-colors hover:bg-[#df332a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF3B30]">
              Masuk <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div> : <p className="mt-6 text-sm text-white/50">Informasi paket belum tersedia.</p>}
      </div>
    </section>
  )
}
