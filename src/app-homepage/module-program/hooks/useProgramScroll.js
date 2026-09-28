import { useCallback, useEffect, useRef, useState } from 'react'

const getStickyTop = () => (window.innerWidth >= 1024 ? 80 : 64)
const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function useProgramScroll(programCount) {
  const [selectedProgram, setSelectedProgram] = useState(0)
  const selectedProgramRef = useRef(0)
  const programScrollRef = useRef(null)
  const programViewportRef = useRef(null)
  const programImagesRef = useRef([])

  const paintImages = useCallback((selected) => {
    programImagesRef.current.forEach((image, index) => {
      if (!image) return
      image.style.zIndex = index === selected ? '2' : '1'
      image.style.opacity = index === selected ? '1' : '0'
    })
  }, [])

  useEffect(() => {
    const scrollArea = programScrollRef.current
    const viewport = programViewportRef.current
    if (!scrollArea || !viewport || !programCount) return
    selectedProgramRef.current = clamp(selectedProgramRef.current, 0, programCount - 1)
    setSelectedProgram(selectedProgramRef.current)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const update = () => {
      frame = 0
      if (window.innerWidth >= 2300 || reducedMotion.matches) {
        paintImages(selectedProgramRef.current)
        return
      }

      const distance = Math.max(1, scrollArea.offsetHeight - viewport.offsetHeight)
      const progress = clamp((getStickyTop() - scrollArea.getBoundingClientRect().top) / distance, 0, 1)
      const position = progress * (programCount - 1)
      const next = Math.round(position)
      if (next !== selectedProgramRef.current) {
        paintImages(next)
        selectedProgramRef.current = next
        setSelectedProgram(next)
      }

      const activePhoto = programImagesRef.current[next]?.querySelector('img')
      if (activePhoto) activePhoto.style.transform = `scale(1.04) translate3d(0, ${(position - next) * -10}px, 0)`
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    paintImages(selectedProgramRef.current)
    update()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    reducedMotion.addEventListener('change', scheduleUpdate)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      reducedMotion.removeEventListener('change', scheduleUpdate)
    }
  }, [paintImages, programCount])

  const selectProgram = (index) => {
    if (programCount <= 1) return
    const next = clamp(index, 0, programCount - 1)
    if (window.innerWidth >= 2300 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      selectedProgramRef.current = next
      paintImages(next)
      setSelectedProgram(next)
      return
    }

    const scrollArea = programScrollRef.current
    const viewport = programViewportRef.current
    const distance = Math.max(1, scrollArea.offsetHeight - viewport.offsetHeight)
    const start = window.scrollY + scrollArea.getBoundingClientRect().top - getStickyTop()
    window.scrollTo({ top: start + distance * (next / (programCount - 1)), behavior: 'smooth' })
  }

  return { selectedProgram, programScrollRef, programViewportRef, programImagesRef, selectProgram }
}
