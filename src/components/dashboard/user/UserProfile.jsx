import React, { useState } from 'react'
import {
  Shield,
  CreditCard,
  Award,
  Edit2,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const fighterData = {
    name: 'Marcus Robinson',
    email: 'marcus.robinson@fighter.jnn.com',
    phone: '+62 812-3456-7890',
    stance: 'Orthodox',
    weightClass: 'Middleweight (72.5 kg / 160 lbs)',
    reach: '74 inches (188 cm)',
    memberSince: 'March 2024',
    emergencyContact: 'Sarah Robinson (Wife) - +62 811-9876-5432',
  }

  return (
    <div className="space-y-8 max-w-5xl">
      {/* ── Profile Header Card ── */}
      <div className="p-6 sm:p-8 rounded-sm bg-[#0c1017] border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-sm bg-gradient-to-br from-[#003B95] to-[#FF3B30] p-1 flex items-center justify-center shadow-xl">
            <div className="w-full h-full bg-[#07090e] rounded-sm flex items-center justify-center text-2xl font-black text-white">
              MR
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white uppercase tracking-tight">
                {fighterData.name}
              </h1>
              <Badge className="bg-[#FF3B30] text-white text-[10px] font-bold rounded-sm border-0 uppercase">
                Fighter Pro
              </Badge>
            </div>
            <p className="text-xs text-white/60">
              ID: <span className="font-mono text-white/80">JNN-BOX-0842</span> • Active Gym Member
            </p>
            <div className="flex items-center gap-4 text-xs text-white/40 pt-1">
              <span>Member since {fighterData.memberSince}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">Medical Clearance: OK</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          size="sm"
          className="border-white/20 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider rounded-sm"
        >
          <Edit2 className="w-3.5 h-3.5 mr-1.5" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Fighter Bio & Tale of the Tape (2 cols) ── */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#0c1017] border-white/10 rounded-sm">
            <CardHeader className="pb-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#003B95]" /> Tale of the Tape & Fighter Stats
                </CardTitle>
                <Badge variant="outline" className="text-white/60 border-white/20 text-[10px]">
                  VERIFIED AT CHECK-IN
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                    Fighting Stance
                  </span>
                  <p className="text-sm font-bold text-white">{fighterData.stance}</p>
                </div>
                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                    Weight Category
                  </span>
                  <p className="text-sm font-bold text-white">{fighterData.weightClass}</p>
                </div>
                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                    Arm Reach
                  </span>
                  <p className="text-sm font-bold text-white">{fighterData.reach}</p>
                </div>
                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                    Sparring Record (Gym)
                  </span>
                  <p className="text-sm font-bold text-white">18 Wins / 4 Draws / 2 Losses</p>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs uppercase font-bold text-white/40 tracking-wider block">
                  Emergency Medical Contact
                </span>
                <div className="p-3 rounded-sm bg-white/[0.02] border border-white/5 text-xs text-white/80">
                  {fighterData.emergencyContact}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership & Payment Details */}
          <Card className="bg-[#0c1017] border-white/10 rounded-sm">
            <CardHeader className="pb-3 border-b border-white/10">
              <CardTitle className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#FF3B30]" /> Membership Plan & Billing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-sm bg-[#003B95]/10 border border-[#003B95]/30 gap-4">
                <div>
                  <Badge className="bg-[#FF3B30] text-white font-bold rounded-sm uppercase text-[10px] mb-1">
                    Annual Pro Fighter Pass
                  </Badge>
                  <p className="text-base font-black text-white uppercase">Unlimited Gym & Ring Access</p>
                  <p className="text-xs text-white/60">Next renewal date: 10 November 2026</p>
                </div>
                <Button size="sm" className="bg-[#FF3B30] hover:bg-[#cc2f26] text-white text-xs font-bold uppercase rounded-sm">
                  Upgrade Plan
                </Button>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-white/40 tracking-wider">
                  Recent Billing Receipts
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between p-2.5 rounded-sm bg-white/[0.02] border border-white/5 text-white/80">
                    <span>10 Sep 2026 · Monthly PT 10-Pack Refill</span>
                    <span className="font-mono text-emerald-400 font-bold">Rp 2.500.000 (Paid)</span>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-sm bg-white/[0.02] border border-white/5 text-white/80">
                    <span>10 Aug 2026 · Monthly Pro Pass Renewal</span>
                    <span className="font-mono text-emerald-400 font-bold">Rp 1.250.000 (Paid)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Coach Assessment & Badges (1 col) ── */}
        <div className="space-y-6">
          <Card className="bg-[#0c1017] border-white/10 rounded-sm">
            <CardHeader className="pb-3 border-b border-white/10">
              <CardTitle className="text-base font-black text-white uppercase tracking-wide flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Coach Endorsements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-3 rounded-sm bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Coach Adrian Pratama</span>
                  <span className="text-[10px] text-amber-400 font-bold">Level 3 Clearance</span>
                </div>
                <p className="text-xs text-white/60 italic">
                  "Solid lead jab accuracy and swift shoulder roll defence. Ready for intermediate sparring championship tier."
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-white/40 tracking-wider block">
                  Earned Gym Badges
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <Badge className="bg-white/5 text-white border border-white/10 text-[10px]">
                    🥊 100 Rounds Club
                  </Badge>
                  <Badge className="bg-white/5 text-white border border-white/10 text-[10px]">
                    ⚡ Speed Demon
                  </Badge>
                  <Badge className="bg-white/5 text-white border border-white/10 text-[10px]">
                    🛡️ Iron Guard
                  </Badge>
                  <Badge className="bg-white/5 text-white border border-white/10 text-[10px]">
                    🏆 Sparring Finalist
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
