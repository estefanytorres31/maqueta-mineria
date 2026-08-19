import { useRef, useEffect } from 'react'
import { Machine } from '../../types'
import MachineCard from './MachineCard'

interface MachineCarouselProps {
  machines: Machine[]
  selected: Machine | null
  onSelect: (m: Machine) => void
  initialId?: string
}

export default function MachineCarousel({ machines, selected, onSelect, initialId }: MachineCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
    hasMoved: false,
    movedDistance: 0
  })
  const suppressNextClickRef = useRef(false)
  const scrolledInitialRef = useRef(false)

  useEffect(() => {
    if (scrolledInitialRef.current) return
    const el = carouselRef.current
    if (!el || !initialId) { scrolledInitialRef.current = true; return }
    const idx = machines.findIndex(m => m.id === initialId)
    if (idx < 0) { scrolledInitialRef.current = true; return }
    const child = el.children[idx] as HTMLElement | undefined
    if (child) {
      el.scrollTo({ left: child.offsetLeft - Math.max(0, (el.clientWidth - child.clientWidth) / 2), behavior: 'auto' })
    }
    scrolledInitialRef.current = true
  }, [initialId, machines])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!carouselRef.current) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragState.current.isDown = true
    dragState.current.hasMoved = false
    dragState.current.movedDistance = 0
    dragState.current.startX = e.clientX
    dragState.current.startScrollLeft = carouselRef.current.scrollLeft
    suppressNextClickRef.current = false
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDown || !carouselRef.current) return
    const walk = (e.clientX - dragState.current.startX) * 1.1
    dragState.current.movedDistance = Math.abs(walk)
    if (dragState.current.movedDistance > 5) {
      dragState.current.hasMoved = true
    }
    carouselRef.current.scrollLeft = dragState.current.startScrollLeft - walk
  }

  const handlePointerStop = (_e: React.PointerEvent) => {
    if (!dragState.current.isDown) return
    if (dragState.current.hasMoved && dragState.current.movedDistance > 8) {
      suppressNextClickRef.current = true
    }
    dragState.current.isDown = false
    dragState.current.hasMoved = false
  }

  const handleClickCapture = (e: React.MouseEvent) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }

  return (
    <div className="w-full h-full min-h-0">
      <div
        ref={carouselRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory gap-2 sm:gap-2.5 md:gap-3 xl:gap-4 px-2 sm:px-3 md:px-4 xl:px-6 py-1 sm:py-1.5 md:py-2 xl:py-3 no-scrollbar touch-pan-y select-none cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerStop}
        onPointerCancel={handlePointerStop}
        onPointerLeave={(e) => {
          if (dragState.current.isDown) handlePointerStop(e)
        }}
        onClickCapture={handleClickCapture}
      >
        {machines.map((machine, idx) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            isSelected={selected?.id === machine.id}
            onClick={() => onSelect(machine)}
            variant="carousel"
            priority={machine.id === initialId || (idx === 0 && !initialId)}
          />
        ))}
      </div>
    </div>
  )
}
