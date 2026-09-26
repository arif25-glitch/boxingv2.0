import React from 'react'
import { Link } from 'react-router-dom'
import {
  Flame,
  Check,
  ArrowRight,
} from 'lucide-react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  const programs = [
    {
      badge: 'Beginner',
      badgeColor: 'bg-[#003B95]',
      title: 'Boxing Fundamentals',
      subtitle: 'Footwork & Basic Striking',
      description:
        'Kuasai postur, guard defence, jab-cross, dan kombinasi dasar dalam lingkungan yang suportif.',
      features: ['2x Sesi / Minggu', 'Free Handwraps', 'Video Review Gerakan', 'Glove Loaners'],
    },
    {
      badge: 'Popular',
      badgeColor: 'bg-[#FF3B30]',
      title: 'Elite Fighter & Sparring',
      subtitle: 'Technical Sparring & Strategy',
      description:
        'Latihan sparring terkontrol, counter-punching, ring generalship, dan conditioning intensif.',
      features: [
        'Unlimited Ring Access',
        'Sparring Rounds Mingguan',
        'Heart Rate Tracker',
        'Corner Coach Assistance',
      ],
    },
    {
      badge: 'VIP PT',
      badgeColor: 'bg-amber-500',
      title: '1-on-1 Pro Masterclass',
      subtitle: 'Private Head Coach Mentorship',
      description:
        'Kurikulum khusus yang disesuaikan dengan biomekanik, jangkauan, dan target performa pribadi Anda.',
      features: [
        '1-on-1 Head Coach',
        'Custom Nutrition Plan',
        'Locker & Sauna Access',
        'Sparring Analysis 4K',
      ],
    },
  ]

  const coaches = [
    {
      name: 'Adrian Pratama',
      role: 'Head Coach · Ex-National Champion',
      division: 'Light Heavyweight',
      record: '24-2 (18 KOs)',
      bio: 'Spesialis counter-striking, peek-a-boo defense, dan biomekanik pukulan bertenaga tinggi.',
    },
    {
      name: 'Bambang Susilo',
      role: 'Conditioning & Power Specialist',
      division: 'Middleweight',
      record: '19-4 (12 KOs)',
      bio: 'Pakar stamina aerobik, plyometric power, dan ketahanan fisik 12-ronde kompetitif.',
    },
    {
      name: 'Hendra Gunawan',
      role: 'Technical Footwork & Ring IQ Coach',
      division: 'Featherweight',
      record: '21-1 (9 KOs)',
      bio: 'Fokus pada sudut serang, cut-the-ring, parrying gloves, dan slip-and-counter precision.',
    },
  ]

  const pricingPlans = [
    {
      name: 'Monthly Regular',
      price: 'Rp 850.000',
      period: '/ bulan',
      description: 'Ideal untuk latihan kebugaran dan teknik boxing harian.',
      features: ['Akses Open Gym & Heavy Bag', '3x Kelas Grup / Minggu', 'Locker Room & Shower'],
      cta: 'Mulai Latihan',
      highlighted: false,
    },
    {
      name: 'Elite Pro Fighter',
      price: 'Rp 1.450.000',
      period: '/ bulan',
      description: 'Program lengkap untuk fighter yang siap naik ke ring sparring.',
      features: [
        'Akses Unlimited Semua Ring',
        'Semua Sesi Sparring Mingguan',
        '2x Sesi Pad Work 1-on-1 / Bulan',
        'Performance Analytics Dashboard',
      ],
      cta: 'Gabung Elite Pass',
      highlighted: true,
    },
    {
      name: 'Champion 10-Pack PT',
      price: 'Rp 2.500.000',
      period: '/ 10 Sesi',
      description: '10 sesi privat 1-on-1 dengan pelatih bersertifikasi nasional.',
      features: [
        '10 Sesi 1-on-1 Fokus Mitts',
        'Jadwal Fleksibel',
        'Private Ring Reservation',
        'Masa Aktif 3 Bulan',
      ],
      cta: 'Pilih Private Coach',
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ── Hero Section ── */}
        <HeroSection />

        {/* ── Programs Section ── */}
        <section id="programs" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-center space-y-3 mb-16">
            <Badge className="bg-[#FF3B30] text-white border-0 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Kurikulum Pelatihan
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Program Kelas Boxing
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto">
              Dirancang untuk membangun kekuatan fisik, ketajaman refleks, dan disiplin mental
              petarung sejati.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-sm bg-[#0c1017] border border-white/10 p-8 flex flex-col justify-between hover:border-[#003B95] transition-all group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-sm ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                    <span className="text-xs text-white/40 font-mono">0{idx + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#5b8de8] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#FF3B30] font-bold uppercase tracking-wider mt-1">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-white/80">
                    {item.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#FF3B30] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link to="/dashboard/bookings">
                    <Button className="w-full bg-white/5 hover:bg-[#003B95] text-white border border-white/10 font-bold uppercase tracking-wider text-xs rounded-sm transition-all">
                      Lihat Jadwal Kelas <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Coaches Section ── */}
        <section id="trainers" className="py-24 px-4 sm:px-8 bg-[#0a0d14] border-t border-white/10">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <Badge className="bg-[#003B95] text-white border-0 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                  Certified Trainers
                </Badge>
                <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                  Pelatih & Corner Masters
                </h2>
                <p className="text-sm text-white/60 max-w-lg">
                  Pelatih berprestasi nasional dengan pengalaman bertahun-tahun di ring profesional.
                </p>
              </div>

              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider text-xs rounded-sm"
                >
                  Book 1-on-1 Coach Session
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {coaches.map((coach, idx) => (
                <div
                  key={idx}
                  className="rounded-sm bg-[#0f141f] border border-white/10 p-6 space-y-4 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-sm bg-gradient-to-br from-[#FF3B30] to-[#003B95] flex items-center justify-center font-black text-white text-lg">
                      {coach.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white uppercase">{coach.name}</h3>
                      <p className="text-xs text-[#5b8de8] font-bold">{coach.role}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-sm bg-black/40 border border-white/5 flex items-center justify-between text-xs">
                    <span className="text-white/50">{coach.division}</span>
                    <span className="font-mono text-emerald-400 font-bold">Pro: {coach.record}</span>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed">{coach.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Facilities Section ── */}
        <section id="facilities" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-[#FF3B30] text-white border-0 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                Standar Ring Profesional
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                Fasilitas Ring Kelas Kejuaraan
              </h2>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Dilengkapi dengan 3 ring boxing standar internasional, heavy bag station dengan 16
                tipe samsak, speed bag, double-end bag, serta area pemulihan pasca latihan.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-sm bg-[#0c1017] border border-white/10">
                  <p className="text-2xl font-black text-white">3 Ring</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-1">
                    Octagon & Square Rings
                  </p>
                </div>
                <div className="p-4 rounded-sm bg-[#0c1017] border border-white/10">
                  <p className="text-2xl font-black text-white">16 Samsak</p>
                  <p className="text-xs text-white/50 uppercase tracking-widest mt-1">
                    Heavy, Tear-drop, Angle
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-sm bg-gradient-to-br from-[#0c1017] via-[#0f141f] to-[#003B95]/20 border border-white/10 space-y-6">
              <h3 className="text-xl font-black text-white uppercase">Live Ring Schedule & Availability</h3>
              <p className="text-xs text-white/60">
                Pantau ketersediaan ring secara langsung melalui Member Hub atau Admin Control Desk.
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-sm bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white uppercase">Ring A — Main Arena</p>
                    <p className="text-[10px] text-white/40">Open Sparring & Video Analysis</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Aktif
                  </span>
                </div>

                <div className="p-3.5 rounded-sm bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white uppercase">Ring B — Technical Ring</p>
                    <p className="text-[10px] text-white/40">Footwork & Slip Line Drills</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Aktif
                  </span>
                </div>

                <div className="p-3.5 rounded-sm bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white uppercase">Ring C — VIP PT Studio</p>
                    <p className="text-[10px] text-white/40">1-on-1 Focus Pad Mastery</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    Tersedia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Pricing Section ── */}
        <section id="pricing" className="py-24 px-4 sm:px-8 bg-[#0a0d14] border-t border-white/10">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-3">
              <Badge className="bg-[#003B95] text-white border-0 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
                Paket Membership
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
                Pilih Rencana Latihan Anda
              </h2>
              <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto">
                Harga transparan tanpa biaya registrasi tersembunyi.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-sm p-8 flex flex-col justify-between transition-all ${
                    plan.highlighted
                      ? 'bg-gradient-to-b from-[#003B95]/30 via-[#0c1017] to-[#0c1017] border-2 border-[#FF3B30] shadow-2xl relative'
                      : 'bg-[#0c1017] border border-white/10'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FF3B30] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">
                      Recommended Plan
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black text-white uppercase">{plan.name}</h3>
                      <p className="text-xs text-white/50 mt-1">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                        {plan.price}
                      </span>
                      <span className="text-xs text-white/50">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 pt-6 border-t border-white/10 text-xs text-white/80">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[#FF3B30] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <Link to="/dashboard">
                      <Button
                        className={`w-full font-bold uppercase tracking-wider text-xs rounded-sm py-3 ${
                          plan.highlighted
                            ? 'bg-[#FF3B30] hover:bg-[#cc2f26] text-white shadow-lg shadow-[#FF3B30]/30'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-[#05070a] border-t border-white/10 py-12 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#FF3B30] to-[#003B95] flex items-center justify-center font-black text-white text-sm">
              <Flame className="w-4 h-4" />
            </div>
            <span className="font-black text-white uppercase tracking-wider text-sm">
              JNN BOXING CLUB v2.0
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/50">
            <Link to="/dashboard" className="hover:text-white transition-colors">
              User Dashboard
            </Link>
            <Link to="/admin" className="hover:text-white transition-colors">
              Admin HQ
            </Link>
            <a href="#programs" className="hover:text-white transition-colors">
              Program Latihan
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Membership
            </a>
          </div>

          <p className="text-xs text-white/40 font-mono">
            © 2026 JNN Boxing Club. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
