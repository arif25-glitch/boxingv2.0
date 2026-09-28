import { useData } from '@/data/DataContext'
import { useProgramScroll } from '../hooks/useProgramScroll'
import ProgramDetails from '../ui/ProgramDetails'
import ProgramNavigation from '../ui/ProgramNavigation'
import '../styles/programs.css'

export default function ProgramsSection() {
  const { data } = useData()
  const programs = data.programs
  const { selectedProgram, programScrollRef, programViewportRef, programImagesRef, selectProgram } = useProgramScroll(programs.length)

  if (!programs.length) return null

  return (
    <section id="programs" className="w-full scroll-mt-16 bg-[#07090e] lg:scroll-mt-20">
      <div
        ref={programScrollRef}
        style={{ '--program-height': `${100 + Math.max(0, programs.length - 1) * 70}svh` }}
        className="relative h-[var(--program-height)] min-[2300px]:h-auto motion-reduce:h-auto"
      >
        <div
          ref={programViewportRef}
          className="sticky top-16 h-[calc(100svh-4rem)] overflow-hidden bg-[#07090e] lg:top-20 lg:h-[calc(100svh-5rem)] min-[2300px]:static min-[2300px]:h-[760px] motion-reduce:static motion-reduce:h-[820px]"
        >
          <div className="absolute inset-0 grid grid-rows-[27%_1fr] sm:grid-rows-[32%_1fr] lg:grid-cols-[54%_46%] lg:grid-rows-1">
            <div className="relative overflow-hidden bg-[#111827]">
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  ref={(element) => { programImagesRef.current[index] = element }}
                  className={`absolute inset-0 will-change-[opacity] transition-opacity duration-500 ease-out motion-reduce:transition-none ${index === 0 ? '' : 'opacity-0'}`}
                >
                  <img
                    src={program.image}
                    alt=""
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover object-center will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#07090e]" />
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#07090e] to-transparent" />
                </div>
              ))}
            </div>

            <div className="relative min-h-0 bg-[#07090e]">
              {programs.map((program, index) => (
                <ProgramDetails key={program.id} program={program} active={selectedProgram === index} />
              ))}
            </div>
          </div>

          <ProgramNavigation
            programs={programs}
            selectedProgram={selectedProgram}
            onSelect={selectProgram}
          />
        </div>
      </div>
    </section>
  )
}
