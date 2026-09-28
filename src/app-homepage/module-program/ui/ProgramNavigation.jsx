import { ArrowRight } from 'lucide-react'

export default function ProgramNavigation({ programs, selectedProgram, onSelect }) {
  return (
    <div className="absolute bottom-0 left-0 z-20 flex w-full items-center justify-between border-t border-white/10 bg-[#07090e] px-6 py-3 sm:px-10 lg:left-auto lg:right-0 lg:w-[46%] lg:px-8 xl:px-16">
      <div className="flex items-center gap-2" aria-label={`Program ${selectedProgram + 1} dari ${programs.length}`}>
        {programs.map((item, index) => (
          <span
            key={item.id}
            className={`h-0.5 w-7 transition-colors duration-300 ${index === selectedProgram ? 'bg-[#FF3B30]' : 'bg-white/20'}`}
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => onSelect(selectedProgram - 1)}
          disabled={selectedProgram === 0}
          aria-label="Program sebelumnya"
          className="p-2 text-white transition-colors hover:text-[#FF3B30] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
        </button>
        <span className="font-mono text-xs text-white/70">
          0{selectedProgram + 1} / 0{programs.length}
        </span>
        <button
          type="button"
          onClick={() => onSelect(selectedProgram + 1)}
          disabled={selectedProgram === programs.length - 1}
          aria-label="Program berikutnya"
          className="p-2 text-white transition-colors hover:text-[#FF3B30] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
