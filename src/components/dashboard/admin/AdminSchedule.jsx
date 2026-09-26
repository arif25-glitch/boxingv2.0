import React, { useState } from 'react'
import {
  Plus,
  Edit2,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminSchedule() {
  const [activeDay, setActiveDay] = useState('Today')

  const days = ['Today', 'Tomorrow', 'Friday', 'Saturday', 'Sunday']

  const schedules = [
    {
      id: 1,
      ring: 'Ring A (Main Octagon Ring)',
      time: '08:00 - 09:30',
      title: 'Morning Boxing Cardio & Mitt Work',
      coach: 'Coach Bambang Susilo',
      capacity: '10 / 12 Registered',
      status: 'Completed',
    },
    {
      id: 2,
      ring: 'Ring A (Main Octagon Ring)',
      time: '16:00 - 17:30',
      title: 'Fighter Conditioning & Sparring Prep',
      coach: 'Coach Hendra Gunawan',
      capacity: '8 / 8 Full',
      status: 'In Progress',
    },
    {
      id: 3,
      ring: 'Ring A (Main Octagon Ring)',
      time: '19:00 - 20:30',
      title: 'Advanced Sparring & Counter-Punching',
      coach: 'Coach Adrian Pratama',
      capacity: '8 / 10 Registered',
      status: 'Upcoming',
    },
    {
      id: 4,
      ring: 'Ring B (Technical Boxing Ring)',
      time: '17:00 - 18:30',
      title: 'Footwork Drills & Ring Generalship',
      coach: 'Coach Adrian Pratama',
      capacity: '6 / 8 Registered',
      status: 'Upcoming',
    },
    {
      id: 5,
      ring: 'Ring C (VIP Private Ring)',
      time: '18:00 - 19:00',
      title: '1-on-1 Elite Pad Session with Marcus R.',
      coach: 'Coach Adrian Pratama',
      capacity: '1 / 1 Booked',
      status: 'Upcoming',
    },
  ]

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Ring & Trainer Schedule Management
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Allocate ring timetables, assign coaching staff, and manage fighter capacity limits.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider text-xs rounded-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Training Slot
        </Button>
      </div>

      {/* ── Days Tab ── */}
      <div className="flex items-center gap-2 p-1.5 bg-[#0c1017] border border-white/10 rounded-sm overflow-x-auto">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
              activeDay === day
                ? 'bg-[#003B95] text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ── Schedule Timeline Grid ── */}
      <div className="space-y-3">
        {schedules.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-sm bg-[#0c1017] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="px-3 py-2 rounded-sm bg-white/5 border border-white/10 text-center min-w-[130px]">
                <span className="text-xs font-mono font-bold text-[#5b8de8] block">
                  {item.time}
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mt-0.5">
                  Duration 90m
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#003B95] text-white text-[10px] font-bold rounded-sm border-0 uppercase">
                    {item.ring}
                  </Badge>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase ${
                      item.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                        : item.status === 'Completed'
                        ? 'bg-white/10 text-white/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="text-base font-black text-white uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60">
                  Lead Coach: <span className="text-white font-medium">{item.coach}</span> •
                  Fighters: <span className="text-[#5b8de8] font-bold">{item.capacity}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs font-bold uppercase rounded-sm"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 font-bold uppercase rounded-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
