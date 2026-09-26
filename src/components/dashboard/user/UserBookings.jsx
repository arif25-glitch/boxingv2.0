import React, { useState } from 'react'
import {
  Clock,
  User,
  CheckCircle2,
  Search,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function UserBookings() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [bookedIds, setBookedIds] = useState([1])

  const categories = ['All', 'Sparring', 'Conditioning', 'Technical', 'Private PT']

  const classes = [
    {
      id: 1,
      title: 'Advanced Sparring & Counter-Punching',
      time: 'Hari Ini · 19:00 - 20:30',
      coach: 'Coach Adrian Pratama',
      ring: 'Ring A (Main Octagon)',
      category: 'Sparring',
      level: 'Advanced',
      capacity: '8 / 10 Fighters',
      description: 'Controlled live sparring rounds with focus on head movement, parrying, and counter jab timing.',
    },
    {
      id: 2,
      title: 'Heavy Bag Power & Conditioning',
      time: 'Besok · 17:00 - 18:15',
      coach: 'Coach Bambang Susilo',
      ring: 'Zone 2 (Heavy Bag Row)',
      category: 'Conditioning',
      level: 'All Levels',
      capacity: '12 / 15 Fighters',
      description: 'High-volume 3-minute rounds emphasizing punching stamina, torque generation, and core resilience.',
    },
    {
      id: 3,
      title: 'Footwork Drills & Ring Generalship',
      time: 'Jumat, 28 Sep · 18:30 - 20:00',
      coach: 'Coach Adrian Pratama',
      ring: 'Ring B (Technical)',
      category: 'Technical',
      level: 'Intermediate',
      capacity: '6 / 8 Fighters',
      description: 'Cutting the ring, pivoting angles, and defensive exit footwork against aggressive pressure.',
    },
    {
      id: 4,
      title: '1-on-1 Focus Mitts & Strategy Analysis',
      time: 'Sabtu, 29 Sep · 10:00 - 11:00',
      coach: 'Coach Hendra Gunawan',
      ring: 'Private Ring 3',
      category: 'Private PT',
      level: 'All Levels',
      capacity: '1 / 1 Fighter',
      description: 'Precision punch combination pad-work with instant video replay and mechanical adjustments.',
    },
    {
      id: 5,
      title: 'Beginner Fundamental Boxing & Stance',
      time: 'Sabtu, 29 Sep · 16:00 - 17:15',
      coach: 'Coach Bambang Susilo',
      ring: 'Open Floor Area',
      category: 'Technical',
      level: 'Beginner',
      capacity: '10 / 12 Fighters',
      description: 'Guard stance, jab-cross mechanics, hip rotation basics, and wrap wrapping instruction.',
    },
  ]

  const handleToggleBook = (id) => {
    if (bookedIds.includes(id)) {
      setBookedIds(bookedIds.filter((item) => item !== id))
    } else {
      setBookedIds([...bookedIds, id])
    }
  }

  const filteredClasses = classes.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ring.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Class & Ring Booking
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Reserve your spot in daily sparring, conditioning, or 1-on-1 coaching sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="bg-[#003B95] text-white border-0 text-xs px-3 py-1 font-bold">
            Pass Remaining: 6 Sessions
          </Badge>
        </div>
      </div>

      {/* ── Filters & Search ── */}
      <div className="p-4 rounded-sm bg-[#0c1017] border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#FF3B30] text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search class, coach, or ring..."
            className="pl-9 bg-black/40 border-white/10 text-white placeholder:text-white/30 text-xs rounded-sm h-9"
          />
        </div>
      </div>

      {/* ── Class List Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClasses.map((item) => {
          const isBooked = bookedIds.includes(item.id)
          return (
            <div
              key={item.id}
              className={`p-6 rounded-sm bg-[#0c1017] border transition-all flex flex-col justify-between space-y-4 ${
                isBooked
                  ? 'border-[#003B95] bg-gradient-to-br from-[#003B95]/10 to-[#0c1017]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#003B95] text-white text-[10px] uppercase font-bold rounded-sm border-0">
                      {item.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-white/20 text-white/60 text-[10px] uppercase font-bold rounded-sm"
                    >
                      {item.level}
                    </Badge>
                  </div>
                  <span className="text-xs text-white/40 font-mono">{item.capacity}</span>
                </div>

                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-white/70">
                    <Clock className="w-3.5 h-3.5 text-[#5b8de8]" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/70">
                    <User className="w-3.5 h-3.5 text-[#FF3B30]" />
                    <span>{item.coach}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-white/40">Venue: {item.ring}</span>
                <Button
                  onClick={() => handleToggleBook(item.id)}
                  size="sm"
                  className={`font-bold uppercase tracking-wider rounded-sm text-xs ${
                    isBooked
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-[#FF3B30] hover:bg-[#cc2f26] text-white'
                  }`}
                >
                  {isBooked ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Booked
                    </>
                  ) : (
                    'Reserve Slot'
                  )}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
