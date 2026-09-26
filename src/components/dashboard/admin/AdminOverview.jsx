import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  DollarSign,
  Activity,
  TrendingUp,
  UserCheck,
  Clock,
  Plus,
  ArrowUpRight,
  Radio,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function AdminOverview() {
  const kpis = [
    {
      label: 'Active Fighters',
      value: '348',
      change: '+12% this month',
      isPositive: true,
      icon: Users,
    },
    {
      label: 'Monthly Revenue',
      value: 'Rp 88.400.000',
      change: '+18.4% vs last month',
      isPositive: true,
      icon: DollarSign,
    },
    {
      label: "Today's Gym Check-ins",
      value: '84',
      change: 'Peak at 18:30',
      isPositive: true,
      icon: UserCheck,
    },
    {
      label: 'Ring Occupancy Rate',
      value: '91%',
      change: '3/3 Rings booked',
      isPositive: true,
      icon: Activity,
    },
  ]

  const rings = [
    {
      name: 'Ring A (Main Octagon Ring)',
      status: 'In Use',
      statusColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      currentActivity: 'Pro Sparring Session · Coach Adrian Pratama',
      duration: '45 mins remaining',
      fightersCount: '4 Fighters',
    },
    {
      name: 'Ring B (Technical Boxing Ring)',
      status: 'In Use',
      statusColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
      currentActivity: 'Footwork Drills & Defense · Coach Hendra Gunawan',
      duration: '15 mins remaining',
      fightersCount: '6 Fighters',
    },
    {
      name: 'Ring C (Private Coaching Studio)',
      status: 'Available',
      statusColor: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
      currentActivity: 'Open for 1-on-1 VIP Session / Pad Work',
      duration: 'Ready for next booking at 18:00',
      fightersCount: '0 Fighters',
    },
  ]

  const recentTransactions = [
    {
      fighter: 'Budi Santoso',
      plan: 'Annual Pro Fighter Pass',
      amount: 'Rp 8.500.000',
      time: '10 mins ago',
      method: 'Bank Transfer (BCA)',
    },
    {
      fighter: 'Sarah Amelia',
      plan: '10x Personal Training Pack',
      amount: 'Rp 2.500.000',
      time: '42 mins ago',
      method: 'QRIS / GoPay',
    },
    {
      fighter: 'Kevin Wijaya',
      plan: 'Monthly Regular Membership',
      amount: 'Rp 850.000',
      time: '2 hours ago',
      method: 'Credit Card',
    },
    {
      fighter: 'Rendra Kurnia',
      plan: 'Sparring Day Pass',
      amount: 'Rp 150.000',
      time: '3 hours ago',
      method: 'Cash at Reception',
    },
  ]

  return (
    <div className="space-y-8">
      {/* ── Page Header & Quick Actions ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-black text-[#FF3B30]">
              Executive Overview
            </span>
            <span className="text-white/30">•</span>
            <span className="text-xs text-white/60">Live Gym Metrics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            HQ Control Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/admin/members">
            <Button
              size="sm"
              className="bg-[#FF3B30] hover:bg-[#cc2f26] text-white font-bold uppercase tracking-wider text-xs rounded-sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Member
            </Button>
          </Link>
          <Link to="/admin/schedule">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 font-bold uppercase tracking-wider text-xs rounded-sm"
            >
              Manage Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* ── 4 Executive KPIs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon
          return (
            <Card key={i} className="bg-[#0c1017] border-white/10 rounded-sm">
              <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                    {kpi.label}
                  </span>
                  <div className="p-2 rounded-sm bg-white/5 border border-white/5 text-white">
                    <Icon className="w-4 h-4 text-[#5b8de8]" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white tracking-tight">
                    {kpi.value}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-emerald-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{kpi.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* ── Live Ring Status Tracker ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#FF3B30] animate-pulse" /> Live Ring & Arena Status
            </h2>
            <p className="text-xs text-white/50">Real-time gym floor occupancy</p>
          </div>
          <Badge variant="outline" className="border-emerald-500/40 text-emerald-400 text-[10px]">
            SYSTEM ONLINE
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rings.map((ring, idx) => (
            <div
              key={idx}
              className="p-5 rounded-sm bg-[#0c1017] border border-white/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40">ZONE #{idx + 1}</span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase ${ring.statusColor}`}>
                    {ring.status}
                  </span>
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-tight">
                  {ring.name}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">{ring.currentActivity}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#5b8de8]" /> {ring.duration}
                </span>
                <span className="font-bold text-white/80">{ring.fightersCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Financial Transactions & Roster Stream ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-white uppercase tracking-wide">
                Live Revenue & Memberships Stream
              </h2>
              <p className="text-xs text-white/50">Latest registration and renewal transactions</p>
            </div>
            <Link
              to="/admin/members"
              className="text-xs text-[#5b8de8] hover:text-white font-bold uppercase tracking-wider flex items-center gap-1"
            >
              Manage Roster <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="rounded-sm bg-[#0c1017] border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.03] border-b border-white/10 text-white/40 uppercase font-bold text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5">Fighter Name</th>
                    <th className="p-3.5">Package</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentTransactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        {tx.fighter}
                        <span className="block text-[10px] text-white/40 font-normal">{tx.time}</span>
                      </td>
                      <td className="p-3.5 text-white/70">{tx.plan}</td>
                      <td className="p-3.5 text-white/60">{tx.method}</td>
                      <td className="p-3.5 text-right font-mono font-bold text-emerald-400">
                        {tx.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick System Action Summary */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-black text-white uppercase tracking-wide">
              Gym Operations Health
            </h2>
            <p className="text-xs text-white/50">Facility & equipment compliance</p>
          </div>

          <div className="p-5 rounded-sm bg-[#0c1017] border border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
              <span className="text-white/60">Heavy Bag Sanitization</span>
              <span className="text-emerald-400 font-bold">100% Done</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
              <span className="text-white/60">Glove & Headgear Inspection</span>
              <span className="text-emerald-400 font-bold">Passed</span>
            </div>
            <div className="flex items-center justify-between text-xs pb-3 border-b border-white/10">
              <span className="text-white/60">First Aid & Ice Station</span>
              <span className="text-emerald-400 font-bold">Stocked</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/60">Certified Corner Men on Duty</span>
              <span className="text-white font-bold">3 Coaches</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider"
            >
              Generate Daily Audit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
