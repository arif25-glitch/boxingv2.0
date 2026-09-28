import Navbar from './module-landing/components/Navbar'
import HeroSection from './module-landing/components/HeroSection'
import ProgramsSection from './module-program/components/ProgramsSection'
import SchedulePreview from './module-schedule/components/SchedulePreview'
import CoachesSection from './module-coaches/components/CoachesSection'
import FacilitiesSection from './module-facilities/components/FacilitiesSection'
import PricingSection from './module-pricing/components/PricingSection'
import SiteFooter from './module-landing/components/SiteFooter'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProgramsSection />
        <SchedulePreview />
        <CoachesSection />
        <FacilitiesSection />
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  )
}
