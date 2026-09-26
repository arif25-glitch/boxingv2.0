import React, { useState } from 'react'
import {
  Search,
  Plus,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AdminMembers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [tierFilter, setTierFilter] = useState('All')

  const members = [
    {
      id: 'JNN-001',
      name: 'Marcus Robinson',
      email: 'marcus.robinson@fighter.jnn.com',
      phone: '+62 812-3456-7890',
      tier: 'Elite Pro Pass',
      division: 'Middleweight',
      status: 'Active',
      joinedDate: '15 Mar 2024',
      expiryDate: '10 Nov 2026',
      ptRemaining: 6,
    },
    {
      id: 'JNN-002',
      name: 'Rian Pratama',
      email: 'rian.pratama@gmail.com',
      phone: '+62 813-8877-9911',
      tier: 'Sparring Monthly',
      division: 'Lightweight',
      status: 'Active',
      joinedDate: '01 Jan 2025',
      expiryDate: '01 Oct 2026',
      ptRemaining: 2,
    },
    {
      id: 'JNN-003',
      name: 'Budi Santoso',
      email: 'budi.santoso88@yahoo.com',
      phone: '+62 856-2211-4433',
      tier: 'Elite Pro Pass',
      division: 'Heavyweight',
      status: 'Active',
      joinedDate: '26 Sep 2026',
      expiryDate: '26 Sep 2027',
      ptRemaining: 10,
    },
    {
      id: 'JNN-004',
      name: 'Sarah Amelia',
      email: 'sarah.amelia@gmail.com',
      phone: '+62 818-4455-6677',
      tier: '10x PT Pack',
      division: 'Featherweight',
      status: 'Active',
      joinedDate: '12 Feb 2026',
      expiryDate: '12 Dec 2026',
      ptRemaining: 8,
    },
    {
      id: 'JNN-005',
      name: 'Doni Firmansyah',
      email: 'doni.firman@gmail.com',
      phone: '+62 877-3322-1100',
      tier: 'Basic Boxing',
      division: 'Welterweight',
      status: 'Expired',
      joinedDate: '10 Jan 2024',
      expiryDate: '15 Sep 2026',
      ptRemaining: 0,
    },
    {
      id: 'JNN-006',
      name: 'Ahmad Zaki',
      email: 'zaki.ahmad@outlook.com',
      phone: '+62 821-9988-7766',
      tier: 'Sparring Monthly',
      division: 'Super Middleweight',
      status: 'Pending',
      joinedDate: '25 Sep 2026',
      expiryDate: 'Awaiting Payment',
      ptRemaining: 0,
    },
  ]

  const filteredMembers = members.filter((member) => {
    const matchesTier = tierFilter === 'All' || member.tier.includes(tierFilter)
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.division.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTier && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Fighter & Member Roster
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Total of {members.length} registered fighters across all weight categories.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider text-xs rounded-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" /> Register New Fighter
        </Button>
      </div>

      {/* ── Filters & Search ── */}
      <div className="p-4 rounded-sm bg-[#0c1017] border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['All', 'Elite Pro', 'Sparring', 'PT Pack', 'Basic'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shrink-0 ${
                tierFilter === tier
                  ? 'bg-[#003B95] text-white'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search fighter, ID, division..."
            className="pl-9 bg-black/40 border-white/10 text-white placeholder:text-white/30 text-xs rounded-sm h-9"
          />
        </div>
      </div>

      {/* ── Members Table ── */}
      <div className="rounded-sm bg-[#0c1017] border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.03] border-b border-white/10 text-white/40 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Fighter Info</th>
                <th className="p-4">Weight Division</th>
                <th className="p-4">Membership Plan</th>
                <th className="p-4">Remaining PT</th>
                <th className="p-4">Status</th>
                <th className="p-4">Expiry Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white text-xs">
                        {member.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-white uppercase tracking-tight">{member.name}</p>
                        <p className="text-[11px] text-white/40 font-mono">
                          {member.id} • {member.phone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-white/80">{member.division}</td>
                  <td className="p-4">
                    <Badge className="bg-[#003B95]/30 text-[#8cb4ff] border border-[#003B95]/50 text-[10px] uppercase font-bold rounded-sm">
                      {member.tier}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono font-bold text-white">{member.ptRemaining} Sessions</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase tracking-wider ${
                        member.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : member.status === 'Expired'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4 text-white/60 font-mono">{member.expiryDate}</td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-white/60 hover:text-white hover:bg-white/5"
                    >
                      Manage
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
