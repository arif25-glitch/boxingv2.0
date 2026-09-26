import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Trophy,
  Flame,
  Activity,
  CheckCircle2,
  Clock,
  Zap,
  Dumbbell,
  ArrowUpRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function UserOverview() {
  const [checkedIn, setCheckedIn] = useState(false)

  const stats = [
    {
      label: 'Membership Tier',
      value: 'Elite Fighter',
      sub: 'Expires in 45 days',
      badge: 'PRO ACCESS',
      badgeColor: 'bg-[#FF3B30] text-white',
      icon: Trophy,
    },
    {
      label: 'Remaining PT Sessions',
      value: '6 / 10',
      sub: 'Coach Adrian Pratama',
      badge: 'Active',
      badgeColor: 'bg-[#003B95] text-white',
      icon: Dumbbell,
    },
    {
      label: 'Sparring Streak',
      value: '14 Days',
      sub: '8 rounds this week',
      badge: '🔥 ON FIRE',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40',
      icon: Flame,
    },
    {
      label: 'Total Calorie Burn',
      value: '18,450 kcal',
      sub: 'Monthly Target: 25k',
      badge: '74% Target',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
      icon: Activity,
    },
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: 'Advanced Sparring & Counter-Punching',
      time: 'Hari Ini · 19:00 - 20:30',
      ring: 'Ring A (Main Octagon)',
      coach: 'Coach Adrian Pratama',
      category: 'Sparring',
      status: 'Confirmed',
    },
    {
      id: 2,
      title: 'Heavy Bag Power & Conditioning',
      time: 'Besok · 17:00 - 18:15',
      ring: 'Zone 2 (Heavy Bag Row)',
      coach: 'Coach Bambang Susilo',
      category: 'Conditioning',
      status: 'Scheduled',
    },
    {
      id: 3,
      title: 'Footwork Drills & Head Movement',
      time: 'Jumat, 28 Sep · 18:30 - 20:00',
      ring: 'Ring B (Technical)',
      coach: 'Coach Adrian Pratama',
      category: 'Technical',
      status: 'Scheduled',
    },
  ]

  const recentTrainingLogs = [
    {
      date: '24 Sep 2026',
      activity: 'Sparring vs Rayhan K. (6 Rounds)',
      score: '9.4 Form Score',
      punchVolume: '482 Punches',
      accuracy: '68% Landed',
    },
    {
      date: '22 Sep 2026',
      activity: 'High-Intensity Pad Work & Slip Drills',
      score: '8.8 Form Score',
      punchVolume: '610 Punches',
      accuracy: '72% Landed',
    },
    {
      date: '20 Sep 2026',
      activity: 'Heavy Bag Plyometrics & Ab Circuit',
      score: '9.0 Form Score',
      punchVolume: '530 Punches',
      accuracy: '—',
    },
  ]

  return (
    <div className="space-y-8">
      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-[#003B95]/40 via-[#0c1017] to-[#FF3B30]/30 border border-white/10 p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-black text-[#FF3B30]">
                Welcome Back Fighter
              </span>
              <span className="text-white/30">•</span>
              <span className="text-xs text-white/60">Middleweight Division</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Marcus Robinson
            </h1>
            <p className="text-sm text-white/60 max-w-xl">
              Next scheduled session starts in <span className="text-white font-bold">1h 45m</span> at Ring A.
              Warm up is highly recommended 15 minutes before gloves on.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setCheckedIn(!checkedIn)}
              size="lg"
              className={`font-bold uppercase tracking-wider rounded-sm transition-all ${
                checkedIn
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-[#FF3B30] hover:bg-[#cc2f26] text-white shadow-lg shadow-[#FF3B30]/20'
              }`}
            >
              {checkedIn ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Checked In (Ring A)
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" /> Quick Gym Check-In
                </>
              )}
            </Button>
            <Link to="/dashboard/bookings">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider rounded-sm"
              >
                Book Session
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4 Key Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Card key={i} className="bg-[#0c1017] border-white/10 rounded-sm">
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                    {stat.label}
                  </span>
                  <div className="p-2 rounded-sm bg-white/5 border border-white/5 text-white">
                    <Icon className="w-4 h-4 text-[#5b8de8]" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-white/50">{stat.sub}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm ${stat.badgeColor}`}>
                      {stat.badge}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── Grid: Upcoming Sessions + Performance Logs ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Sessions (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-wide">
                Upcoming Ring & Sparring Sessions
              </h2>
              <p className="text-xs text-white/50">Your confirmed reservations this week</p>
            </div>
            <Link
              to="/dashboard/bookings"
              className="text-xs text-[#5b8de8] hover:text-white font-bold uppercase tracking-wider flex items-center gap-1"
            >
              View Full Schedule <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-sm bg-[#0c1017] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#003B95] text-white text-[10px] uppercase font-bold rounded-sm border-0">
                      {session.category}
                    </Badge>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {session.time}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white uppercase tracking-tight">
                    {session.title}
                  </h3>
                  <p className="text-xs text-white/60">
                    Location: <span className="text-white font-medium">{session.ring}</span> • Coach:{' '}
                    <span className="text-white font-medium">{session.coach}</span>
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2">
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-sm">
                    {session.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-white/60 hover:text-white hover:bg-white/5 font-semibold"
                  >
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Log / Performance Tracker (1 col) */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wide">
              Recent Fight Stats
            </h2>
            <p className="text-xs text-white/50">Performance metrics from completed drills</p>
          </div>

          <div className="p-5 rounded-sm bg-[#0c1017] border border-white/10 space-y-4">
            {recentTrainingLogs.map((log, idx) => (
              <div
                key={idx}
                className={`pb-4 ${
                  idx !== recentTrainingLogs.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="flex items-center justify-between text-xs text-white/40 mb-1">
                  <span>{log.date}</span>
                  <span className="text-emerald-400 font-bold">{log.score}</span>
                </div>
                <p className="text-sm font-bold text-white mb-2">{log.activity}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-sm bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 block text-[10px] uppercase">Punch Vol</span>
                    <span className="font-mono text-white font-bold">{log.punchVolume}</span>
                  </div>
                  <div className="p-2 rounded-sm bg-white/[0.02] border border-white/5">
                    <span className="text-white/40 block text-[10px] uppercase">Accuracy</span>
                    <span className="font-mono text-[#5b8de8] font-bold">{log.accuracy}</span>
                  </div>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider"
            >
              Export Performance Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
